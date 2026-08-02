import { create } from 'zustand';
import { fetchProducts, placeOrder, resetStock, randomBuyerUserNo, type ProductItem } from '@/api/order';

/**
 * 주문 시뮬레이션 공용 상태
 * @description Main.tsx의 그리드와 위젯(처리 현황/주문 테스트/응답시간/처리량 등)이
 * 동일한 시뮬레이션 데이터를 공유해서 보여줘야 하므로 zustand 스토어로 끌어올림.
 * 위젯 컴포넌트는 WidgetRenderer가 넘겨주는 고정된 props만 받기 때문에
 * Main.tsx의 로컬 state를 그대로 넘길 방법이 없어서, 대신 이 스토어를 각자 구독함.
 */

export type OrderStatus = '대기' | '처리중' | '성공' | '실패';

export interface OrderRow {
    orderNo: string;
    item: string;
    detailId: number;
    buyerUserNo: number;
    status: OrderStatus;
    latencyMs: number | null;
}

export interface OrderStats {
    total: number;
    processed: number;
    success: number;
    fail: number;
    avgLatency: number;
    p50Latency: number;
    p95Latency: number;
    p99Latency: number;
    tps: number; // 초당 처리 건수
}

export type StatusFilter = '전체' | '성공' | '실패';

/**
 * 재고 정합성 체크 결과
 * @description "화면 재고 = DB 재고"는 배치 종료 후 화면이 DB를 다시 읽어오는 순간 항상 참이 되는
 * 동어반복이라 경합 여부를 증명하지 못한다. 진짜 확인해야 할 건 "성공 건수만큼 실제로 줄었는가":
 * expectedTotal(배치 시작 시점 재고 총합 - 성공 건수) 과 actualTotal(배치 종료 후 DB에서 다시 읽은 재고 총합)을
 * 비교한다. lostUnits(=actualTotal - expectedTotal)가 0보다 크면, 그만큼의 감소분이 유실된 것 - 락 없이 동시
 * 요청이 몰려 lost-update(오버셀)가 실제로 발생했다는 증거.
 */
export interface StockIntegrity {
    lockEnabled: boolean;
    initialTotal: number;
    expectedTotal: number;
    actualTotal: number;
    lostUnits: number;
}

const EMPTY_STATS: OrderStats = {
    total: 0, processed: 0, success: 0, fail: 0,
    avgLatency: 0, p50Latency: 0, p95Latency: 0, p99Latency: 0, tps: 0,
};
const PUBLISH_INTERVAL_MS = 120;
const CONCURRENCY = 20; // 동시에 진행할 요청 수(워커풀 크기)

function calcPercentile(sortedLatencies: number[], percentile: number): number {
    if (sortedLatencies.length === 0) return 0;
    const index = Math.min(sortedLatencies.length - 1, Math.ceil((percentile / 100) * sortedLatencies.length) - 1);
    return sortedLatencies[Math.max(0, index)];
}

interface OrderSimulationState {
    orderRows: OrderRow[];
    orderStats: OrderStats;
    isRunning: boolean;
    isResetting: boolean;
    productStocks: ProductItem[];
    statusFilter: StatusFilter;
    /** Pessimistic Lock 적용 여부 - false면 락 없이 처리해서 동시성 이슈(오버셀)를 의도적으로 재현 */
    lockEnabled: boolean;
    /** 마지막 배치의 재고 정합성 체크 결과 (배치 시작 전엔 null) */
    stockIntegrity: StockIntegrity | null;
    setStatusFilter: (filter: StatusFilter) => void;
    setLockEnabled: (enabled: boolean) => void;
    runSimulation: (count: number) => Promise<void>;
    handleReset: () => Promise<void>;
}

export const useOrderSimulationStore = create<OrderSimulationState>((set, get) => {
    // 매 요청마다 리렌더링을 유발하지 않도록, 진행 중 누적 데이터는 스토어 밖 변수(ref 역할)에 모아뒀다가
    // 일정 주기(PUBLISH_INTERVAL_MS)로만 set()해서 화면에 반영함.
    let ordersRef: OrderRow[] = [];
    let totalRef = 0;
    let processedRef = 0;
    let successRef = 0;
    let failRef = 0;
    let latenciesRef: number[] = [];
    let productsRef: ProductItem[] = [];
    let publishIntervalId: number | null = null;
    let batchStartTime = 0;

    const publishSnapshot = (forceDone = false) => {
        const sorted = [...latenciesRef].sort((a, b) => a - b);
        const sum = sorted.reduce((acc, v) => acc + v, 0);
        const avg = sorted.length > 0 ? Math.round(sum / sorted.length) : 0;
        const elapsedSec = (performance.now() - batchStartTime) / 1000;
        const tps = elapsedSec > 0 && processedRef > 0 ? Math.round((processedRef / elapsedSec) * 10) / 10 : 0;

        set({
            orderRows: [...ordersRef],
            productStocks: [...productsRef].sort((a, b) => a.detailId - b.detailId),
            orderStats: {
                total: totalRef,
                processed: processedRef,
                success: successRef,
                fail: failRef,
                avgLatency: avg,
                p50Latency: calcPercentile(sorted, 50),
                p95Latency: calcPercentile(sorted, 95),
                p99Latency: calcPercentile(sorted, 99),
                tps,
            },
        });

        if (forceDone || (totalRef > 0 && processedRef >= totalRef)) {
            set({ isRunning: false });
            if (publishIntervalId) {
                window.clearInterval(publishIntervalId);
                publishIntervalId = null;
            }
        }
    };

    return {
        orderRows: [],
        orderStats: EMPTY_STATS,
        isRunning: false,
        isResetting: false,
        productStocks: [],
        statusFilter: '전체',
        lockEnabled: true,
        stockIntegrity: null,

        setStatusFilter: (filter) => set({ statusFilter: filter }),
        setLockEnabled: (enabled) => set({ lockEnabled: enabled }),

        runSimulation: async (count: number) => {
            if (get().isRunning) return;

            // 상품 목록은 최초 1회만 조회해서 캐시
            let products = productsRef;
            if (products.length === 0) {
                try {
                    products = await fetchProducts();
                    productsRef = products;
                    set({ productStocks: [...products].sort((a, b) => a.detailId - b.detailId) });
                } catch (err) {
                    console.error('상품 목록 조회 실패:', err);
                    alert('상품 목록을 불러오지 못했습니다. order-coupon-service가 떠있는지 확인해주세요.');
                    return;
                }
            }
            if (products.length === 0) {
                alert('등록된 상품이 없습니다.');
                return;
            }

            if (publishIntervalId) window.clearInterval(publishIntervalId);

            // 배치 도중 스위치를 바꿔도 결과가 섞이지 않도록, 시작 시점의 락 설정을 고정해서 사용
            const useLock = get().lockEnabled;
            // 정합성 체크의 기준값 - 이 배치가 시작되기 직전의 재고 총합(=DB에 실제로 있던 값)
            const initialTotalStock = products.reduce((sum, p) => sum + p.stock, 0);

            const initialRows: OrderRow[] = Array.from({ length: count }, (_, i) => {
                const product = products[Math.floor(Math.random() * products.length)];
                return {
                    orderNo: `ORD_${String(i + 1).padStart(5, '0')}`,
                    item: `${product.model} ${product.storage} ${product.color}`,
                    detailId: product.detailId,
                    buyerUserNo: randomBuyerUserNo(),
                    status: '대기' as OrderStatus,
                    latencyMs: null,
                };
            });

            ordersRef = initialRows;
            totalRef = count;
            processedRef = 0;
            successRef = 0;
            failRef = 0;
            latenciesRef = [];
            batchStartTime = performance.now();

            set({
                orderRows: initialRows,
                orderStats: { ...EMPTY_STATS, total: count },
                statusFilter: '전체',
                isRunning: true,
            });

            // 진행률/통계는 일정 주기로만 갱신(리렌더 폭주 방지)
            publishIntervalId = window.setInterval(() => publishSnapshot(), PUBLISH_INTERVAL_MS);

            // 개별 주문 1건 처리: 실제 API 호출 + 왕복시간 측정
            const processOne = async (idx: number) => {
                ordersRef[idx] = { ...ordersRef[idx], status: '처리중' };
                const start = performance.now();
                try {
                    const row = ordersRef[idx];
                    const result = await placeOrder(row.detailId, row.buyerUserNo, useLock);
                    const latency = Math.round(performance.now() - start);
                    ordersRef[idx] = {
                        ...ordersRef[idx],
                        status: result.success ? '성공' : '실패',
                        latencyMs: latency,
                    };
                    latenciesRef.push(latency);
                    processedRef += 1;
                    if (result.success) {
                        successRef += 1;
                        const p = productsRef.find((item) => item.detailId === row.detailId);
                        if (p) p.stock = Math.max(0, p.stock - 1);
                    } else {
                        failRef += 1;
                    }
                } catch (err) {
                    const latency = Math.round(performance.now() - start);
                    ordersRef[idx] = { ...ordersRef[idx], status: '실패', latencyMs: latency };
                    latenciesRef.push(latency);
                    processedRef += 1;
                    failRef += 1;
                    console.error(err);
                }
            };

            // 동시성 제한 워커풀: 한 번에 CONCURRENCY개씩만 실제로 진행 중인 요청으로 유지
            let cursor = 0;
            const worker = async () => {
                while (cursor < initialRows.length) {
                    const idx = cursor++;
                    await processOne(idx);
                }
            };
            await Promise.all(Array.from({ length: Math.min(CONCURRENCY, count) }, () => worker()));

            // 배치가 끝나면 그동안 프론트에서 낙관적으로(-1씩) 셌던 재고 대신,
            // DB에 실제로 반영된 재고를 다시 조회해서 보여준다.
            // 주의: 화면 재고가 이제 DB를 그대로 반영하므로 "화면=DB"는 항상 참(동어반복)이라 정합성 증거가 되지 않는다.
            // 진짜 확인할 값은 stockIntegrity(예상 재고 vs 실제 재고)임.
            try {
                const freshProducts = await fetchProducts();
                productsRef = freshProducts;
                const actualTotalStock = freshProducts.reduce((sum, p) => sum + p.stock, 0);
                const expectedTotalStock = initialTotalStock - successRef;
                set({
                    stockIntegrity: {
                        lockEnabled: useLock,
                        initialTotal: initialTotalStock,
                        expectedTotal: expectedTotalStock,
                        actualTotal: actualTotalStock,
                        lostUnits: actualTotalStock - expectedTotalStock,
                    },
                });
            } catch (err) {
                console.error('배치 종료 후 재고 재조회 실패:', err);
            }

            publishSnapshot(true);
        },

        handleReset: async () => {
            if (get().isRunning || get().isResetting) return;

            set({ isResetting: true });
            try {
                await resetStock();
                const products = await fetchProducts();
                productsRef = products;
                set({ productStocks: [...products].sort((a, b) => a.detailId - b.detailId) });

                ordersRef = [];
                totalRef = 0;
                processedRef = 0;
                successRef = 0;
                failRef = 0;
                latenciesRef = [];

                set({ orderRows: [], orderStats: EMPTY_STATS, statusFilter: '전체', stockIntegrity: null });
            } catch (err) {
                console.error('재고 초기화 실패:', err);
                alert('재고 초기화에 실패했습니다. order-coupon-service가 떠있는지 확인해주세요.');
            } finally {
                set({ isResetting: false });
            }
        },
    };
});
