import { describe, expect, it } from 'vitest';
import { calcOversoldProducts, calcPercentile, calcStockIntegrity } from './orderSimulationStore';
import type { ProductItem } from '@/api/order';

/**
 * calcPercentile / calcStockIntegrity / calcOversoldProducts 단위 테스트
 * 이 세 함수는 "동시성 데모가 실제로 뭘 측정하고 있는지"를 증명하는 핵심 계산 로직.
 * - calcPercentile: 응답시간 위젯(P50/P95/P99)이 쓰는 백분위수 계산
 * - calcStockIntegrity / calcOversoldProducts: 배치 종료 후 "성공 건수만큼 실제로 재고가
 *   줄었는가"를 검증해서 오버셀(lost-update) 발생 여부와 상품별 수량을 산출
 * API 호출이나 zustand 스토어 상태와 무관한 순수 함수라 별도 mock 없이 바로 검증 가능하다.
 */

function makeProduct(overrides: Partial<ProductItem> = {}): ProductItem {
    return {
        detailId: 1,
        model: 'Galaxy Z Flip8',
        storage: '256GB',
        color: 'Black',
        stock: 0,
        ...overrides,
    };
}

describe('calcPercentile - 응답시간 백분위수(P50/P95/P99) 계산', () => {
    it('빈 배열이면 0을 반환한다', () => {
        expect(calcPercentile([], 50)).toBe(0);
        expect(calcPercentile([], 99)).toBe(0);
    });

    it('원소가 1개면 percentile과 무관하게 그 값을 반환한다', () => {
        expect(calcPercentile([42], 1)).toBe(42);
        expect(calcPercentile([42], 50)).toBe(42);
        expect(calcPercentile([42], 99)).toBe(42);
    });

    it('정렬된 10개 배열에서 P50/P95/P99를 nearest-rank 방식으로 계산한다', () => {
        const sorted = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

        expect(calcPercentile(sorted, 50)).toBe(50);
        expect(calcPercentile(sorted, 95)).toBe(100);
        expect(calcPercentile(sorted, 99)).toBe(100);
        expect(calcPercentile(sorted, 10)).toBe(10);
    });

    it('배열 크기가 작아도(3개) 같은 방식으로 계산된다', () => {
        const sorted = [5, 15, 25];

        expect(calcPercentile(sorted, 50)).toBe(15);
        expect(calcPercentile(sorted, 95)).toBe(25);
        expect(calcPercentile(sorted, 1)).toBe(5);
    });
});

describe('calcStockIntegrity - 재고 정합성(오버셀 발생 여부) 계산', () => {
    it('성공 건수만큼 정확히 줄었으면 유실(lostUnits)이 0이다', () => {
        const result = calcStockIntegrity(100, 30, 70);

        expect(result.expectedTotal).toBe(70);
        expect(result.lostUnits).toBe(0);
    });

    it('실제 재고가 기대치보다 많이 남아있으면 그 차이만큼 오버셀로 잡힌다', () => {
        // 100개에서 30건 성공했으면 70개가 기대치인데, 실제로는 75개가 남음 = 5개 유실(오버셀)
        const result = calcStockIntegrity(100, 30, 75);

        expect(result.expectedTotal).toBe(70);
        expect(result.lostUnits).toBe(5);
    });

    it('성공 건수가 0이면 기대치는 초기 재고와 같다', () => {
        const result = calcStockIntegrity(50, 0, 50);

        expect(result.expectedTotal).toBe(50);
        expect(result.lostUnits).toBe(0);
    });
});

describe('calcOversoldProducts - 상품별 오버셀 수량 계산', () => {
    it('오버셀이 발생한 상품만 결과에 포함한다', () => {
        const products = [
            makeProduct({ detailId: 1, stock: 17 }), // 오버셀 발생
            makeProduct({ detailId: 2, stock: 7 }),  // 정상
        ];
        const initialStockByDetail = new Map([[1, 20], [2, 10]]);
        const successCountByDetail = new Map([[1, 5], [2, 3]]);

        const result = calcOversoldProducts(products, initialStockByDetail, successCountByDetail);

        // 상품1: 기대치 20-5=15, 실제 17 > 2개 오버셀
        // 상품2: 기대치 10-3=7, 실제 7 > 0개(정상, 결과에서 제외)
        expect(result).toEqual([{ detailId: 1, lostUnits: 2 }]);
    });

    it('오버셀이 하나도 없으면 빈 배열을 반환한다', () => {
        const products = [makeProduct({ detailId: 1, stock: 15 })];
        const initialStockByDetail = new Map([[1, 20]]);
        const successCountByDetail = new Map([[1, 5]]);

        const result = calcOversoldProducts(products, initialStockByDetail, successCountByDetail);

        expect(result).toEqual([]);
    });

    it('배치 시작 시점 맵에 없는 상품은 초기재고/성공건수를 0으로 취급한다', () => {
        const products = [makeProduct({ detailId: 99, stock: 5 })];

        const result = calcOversoldProducts(products, new Map(), new Map());

        // initial=0, success=0 > 기대치 0, 실제 5 > 5개 오버셀로 잡힘(방어적 기본값 동작 확인)
        expect(result).toEqual([{ detailId: 99, lostUnits: 5 }]);
    });
});
