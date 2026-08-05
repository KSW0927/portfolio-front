import { create } from 'zustand';
import { fetchProducts, placeOrder, resetStock, reportBatchResult, randomBuyerUserNo, type ProductItem, type LockStrategy } from '@/api/order';
import { AlertService } from '@/utils/AlertService';
import { useNotifyStore } from '@/store/notifyStore';

/**
 * 주문 시뮬레이션 공용 상태
 * Main.tsx의 그리드와 위젯(처리 현황/응답시간 등)이
 * 동일한 시뮬레이션 데이터를 공유해서 보여줘야 하므로 zustand 스토어로 끌어올림.
 * 위젯 컴포넌트는 WidgetRenderer가 넘겨주는 고정된 props만 받기 때문에
 * Main.tsx의 로컬 state를 그대로 넘길 방법이 없어서, 대신 이 스토어를 각자 구독함.
 */

// 재고 차감(주문/품절)은 주문 시점에 즉시 확정되고, 그 뒤에 결제 확정(비동기, 구매자별 랜덤 지연) 처리
// 주문 건은 '결제대기'로 시작해서 서버가 나중에 WebSocket으로 알려주면 '결제완료'로 바뀜.
// '결제취소'는 오버셀 사후 취소 대상으로 뽑힌 건 - 결제대기/결제완료 어느 상태에 있었든 상관없이 덮어써서 전환됨.
export type OrderStatus = '대기' | '처리중' | '결제대기' | '결제완료' | '품절' | '결제취소';

export interface OrderRow {
    orderId: number;
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
    /** 결제까지 확정된 건수(실시간 WebSocket 갱신) - success 중 아직 진행 중인 건은 제외 */
    paymentCompleted: number;
    /** 오버셀 사후 취소된 건수(실시간 WebSocket 갱신) */
    cancelled: number;
    avgLatency: number;
    p50Latency: number;
    p95Latency: number;
    p99Latency: number;
    tps: number; // 초당 처리 건수
}

export type StatusFilter = '전체' | '주문' | '품절' | '결제대기' | '결제완료' | '결제취소';

/**
 * 재고 정합성 체크 결과
 * "화면 재고 = DB 재고"는 배치 종료 후 화면이 DB를 다시 읽어오는 순간 항상 참이 되는
 * 동어반복이라 경합 여부를 증명하지 못한다. 진짜 확인해야 할 건 "성공 건수만큼 실제로 줄었는가":
 * expectedTotal(배치 시작 시점 재고 총합 - 성공 건수) 과 actualTotal(배치 종료 후 DB에서 다시 읽은 재고 총합)을
 * 비교한다. lostUnits(=actualTotal - expectedTotal)가 0보다 크면, 그만큼의 감소분이 유실된 것 - 락 없이 동시
 * 요청이 몰려 lost-update(오버셀)가 실제로 발생했다는 증거.
 */
export interface StockIntegrity {
    lockStrategy: LockStrategy;
    initialTotal: number;
    expectedTotal: number;
    actualTotal: number;
    lostUnits: number;
}

const EMPTY_STATS: OrderStats = {
    total: 0, processed: 0, success: 0, fail: 0, paymentCompleted: 0, cancelled: 0,
    avgLatency: 0, p50Latency: 0, p95Latency: 0, p99Latency: 0, tps: 0,
};
const PUBLISH_INTERVAL_MS = 120;
const CONCURRENCY = 20;

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
    /** 동시성 제어 전략 - NONE이면 락 없이 처리해서 동시성 이슈(오버셀)를 의도적으로 재현 */
    lockStrategy: LockStrategy;
    /** 마지막 배치의 재고 정합성 체크 결과 (배치 시작 전엔 null) */
    stockIntegrity: StockIntegrity | null;
    setStatusFilter: (filter: StatusFilter) => void;
    setLockStrategy: (strategy: LockStrategy) => void;
    runSimulation: (count: number) => Promise<void>;
    handleReset: () => Promise<void>;
    /** notifyStore가 "결제" 카테고리 WebSocket 알림을 받았을 때 orderId로 매칭해서 호출 */
    markPaymentCompleted: (orderId: number) => void;
    /** notifyStore가 "결제취소" 카테고리 WebSocket 알림을 받았을 때 orderId로 매칭해서 호출 */
    markOrderCancelled: (orderId: number) => void;
}

export const useOrderSimulationStore = create<OrderSimulationState>((set, get) => {
    let ordersRef: OrderRow[] = [];
    let totalRef = 0;
    let processedRef = 0;
    let successRef = 0;
    let failRef = 0;
    let paymentCompletedRef = 0;
    let cancelledRef = 0;
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
                paymentCompleted: paymentCompletedRef,
                cancelled: cancelledRef,
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
        lockStrategy: 'PESSIMISTIC',
        stockIntegrity: null,

        setStatusFilter: (filter) => set({ statusFilter: filter }),
        setLockStrategy: (strategy) => set({ lockStrategy: strategy }),

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
                    alert('상품 목록을 불러오지 못했습니다. order-service가 떠있는지 확인해주세요.');
                    return;
                }
            }
            if (products.length === 0) {
                alert('등록된 상품이 없습니다.');
                return;
            }

            if (publishIntervalId) window.clearInterval(publishIntervalId);

            // 배치 도중 스위치를 바꿔도 결과가 섞이지 않도록, 시작 시점의 락 설정을 고정해서 사용
            const lockStrategy = get().lockStrategy;
            // 정합성 체크의 기준값 - 이 배치가 시작되기 직전의 재고 총합(=DB에 실제로 있던 값)
            const initialTotalStock = products.reduce((sum, p) => sum + p.stock, 0);
            // 상품별 오버셀 여부 판별용 - 배치 시작 시점 재고와, 상품별 성공 건수를 따로 추적해서
            // "그 상품만 놓고 봤을 때 예상보다 재고가 덜 줄었는지"를 배치 종료 후 계산한다.
            const initialStockByDetail = new Map(products.map((p) => [p.detailId, p.stock]));
            const successCountByDetail = new Map<number, number>();

            const initialRows: OrderRow[] = Array.from({ length: count }, (_, i) => {
                const product = products[Math.floor(Math.random() * products.length)];
                return {
                    orderId: 0, // API 응답을 받기 전까지는 아직 모름 - 결제 완료 매칭 전용이라 UI엔 안 씀
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
            paymentCompletedRef = 0;
            cancelledRef = 0;
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
                    const result = await placeOrder(row.detailId, row.buyerUserNo, lockStrategy);
                    const latency = Math.round(performance.now() - start);
                    ordersRef[idx] = {
                        ...ordersRef[idx],
                        orderId: result.orderId,
                        // 재고 차감(성공/실패)은 여기서 이미 확정됨. 성공 건은 결제가 아직 안 끝났으니
                        // '결제대기'로 표시하고, 이후 결제 확정 WebSocket 알림이 오면 '결제완료'로 갱신됨.
                        status: result.success ? '결제대기' : '품절',
                        latencyMs: latency,
                    };
                    latenciesRef.push(latency);
                    processedRef += 1;
                    if (result.success) {
                        successRef += 1;
                        successCountByDetail.set(row.detailId, (successCountByDetail.get(row.detailId) ?? 0) + 1);
                        const p = productsRef.find((item) => item.detailId === row.detailId);
                        if (p) p.stock = Math.max(0, p.stock - 1);
                    } else {
                        failRef += 1;
                    }
                } catch (err) {
                    const latency = Math.round(performance.now() - start);
                    ordersRef[idx] = { ...ordersRef[idx], status: '품절', latencyMs: latency };
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

            // 배치 단위 결과 요약 - 개별 주문 알림(알림 위젯)과 별개로, "이번 실행이 어떻게 끝났는지"를
            // 우측 상단 토스트 한 번으로 알려준다. Kafka/WebSocket을 거치지 않는 순수 프론트 집계값.
            AlertService.toast(
                `${count}건 중 주문 ${successRef} · 품절 ${failRef}`,
                failRef > 0 ? 'warning' : 'success',
            );

            try {
                const freshProducts = await fetchProducts();
                productsRef = freshProducts;
                const actualTotalStock = freshProducts.reduce((sum, p) => sum + p.stock, 0);
                const expectedTotalStock = initialTotalStock - successRef;
                const lostUnits = actualTotalStock - expectedTotalStock;
                set({
                    stockIntegrity: {
                        lockStrategy,
                        initialTotal: initialTotalStock,
                        expectedTotal: expectedTotalStock,
                        actualTotal: actualTotalStock,
                        lostUnits,
                    },
                });

                // 오버셀은 개별 주문 이벤트로는 알 수 없고 배치가 다 끝나야 계산되는 값이지만,
                // 다른 알림과 동일하게 Kafka(stock-integrity-events)→notify-service→WebSocket
                // 경로를 태워서 알림 목록에 반영한다(우선순위 알림이라 최상단 고정 정렬됨).
                if (lostUnits > 0) {
                    // 전체 합계와 별개로, 상품 단위로 "예상보다 재고가 몇 개나 덜 줄었는지"를 따져서
                    // 오버셀이 발생한 상품마다 정확한 수량을 실어보낸다 - 서버가 이 수량만큼
                    // 해당 상품의 최근 성공 주문을 사후 취소하는 기준값으로 쓴다.
                    const oversoldProducts = freshProducts
                        .map((p) => {
                            const initial = initialStockByDetail.get(p.detailId) ?? 0;
                            const success = successCountByDetail.get(p.detailId) ?? 0;
                            const expected = initial - success;
                            const productLostUnits = p.stock - expected;
                            return { detailId: p.detailId, lostUnits: productLostUnits };
                        })
                        .filter((p) => p.lostUnits > 0);

                    reportBatchResult({
                        expectedTotal: expectedTotalStock,
                        actualTotal: actualTotalStock,
                        lostUnits,
                        lockStrategy,
                        oversoldProducts,
                    }).catch((err) => console.error('재고 정합성 보고 실패:', err));
                }
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
                paymentCompletedRef = 0;
                cancelledRef = 0;
                latenciesRef = [];

                set({ orderRows: [], orderStats: EMPTY_STATS, statusFilter: '전체', stockIntegrity: null });
                // 재고가 초기화되면 이전 주문에 대한 알림은 더 이상 의미가 없으므로 알림 위젯도 같이 비움
                useNotifyStore.getState().clear();
            } catch (err) {
                console.error('재고 초기화 실패:', err);
                alert('재고 초기화에 실패했습니다. order-service가 떠있는지 확인해주세요.');
            } finally {
                set({ isResetting: false });
            }
        },

        markPaymentCompleted: (orderId) => {
            const idx = ordersRef.findIndex((o) => o.orderId === orderId && o.status === '결제대기');
            if (idx === -1) return; // 배치 사이 재고초기화로 이미 지워졌거나, 중복 알림인 경우

            ordersRef[idx] = { ...ordersRef[idx], status: '결제완료' };
            paymentCompletedRef += 1;

            // 결제 확정은 배치가 이미 다 끝난 뒤(publishIntervalId가 정리된 뒤)에도 한 건씩 트리클로
            // 들어오므로, 주기적 갱신에 기대지 않고 즉시 반영한다.
            set((state) => ({
                orderRows: [...ordersRef],
                orderStats: { ...state.orderStats, paymentCompleted: paymentCompletedRef },
            }));
        },

        markOrderCancelled: (orderId) => {
            const idx = ordersRef.findIndex((o) => o.orderId === orderId && (o.status === '결제대기' || o.status === '결제완료'));
            if (idx === -1) return; // 배치 사이 재고초기화로 이미 지워졌거나, 중복 알림인 경우

            // 이미 '결제완료' 카운트에 반영돼있던 건이라면, 취소로 넘어가면서 그 카운트를 되돌려서
            // 결제대기+결제완료+취소 세 값의 합이 항상 주문(success) 건수와 맞도록 유지한다.
            if (ordersRef[idx].status === '결제완료') {
                paymentCompletedRef = Math.max(0, paymentCompletedRef - 1);
            }

            ordersRef[idx] = { ...ordersRef[idx], status: '결제취소' };
            cancelledRef += 1;

            set((state) => ({
                orderRows: [...ordersRef],
                orderStats: { ...state.orderStats, paymentCompleted: paymentCompletedRef, cancelled: cancelledRef },
            }));
        },
    };
});
