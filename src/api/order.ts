import axios from 'axios';

/**
 * 주문 API 클라이언트
 * order-service는 아직 게이트웨이/프록시 대상이 아니라
 * 다른 서비스와 별도로 직접 baseURL을 지정해서 호출합니다.
 */
const ORDER_API_BASE = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:8082';
const ACCESS_TOKEN_KEY = 'access_token';

// 시뮬레이션용 테스트 구매자 풀 크기 (TestBuyerSeeder와 동일하게 맞춤)
export const BUYER_POOL_SIZE = 2000;

/** 2000명 풀 중 하나를 랜덤으로 골라 buyerUserNo로 사용 - "여러 명이 동시에 주문한 것"을 재현하기 위함 */
export function randomBuyerUserNo(): number {
  return Math.floor(Math.random() * BUYER_POOL_SIZE) + 1;
}

const orderApiClient = axios.create({
  baseURL: ORDER_API_BASE,
  timeout: 10000,
});

orderApiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ProductItem {
  detailId: number;
  model: string;
  storage: string;
  color: string;
  stock: number;
}

export async function fetchProducts(): Promise<ProductItem[]> {
  const { data } = await orderApiClient.get<ApiResponse<ProductItem[]>>('/api/products');
  return data.data;
}

export interface OrderResult {
  orderId: number;
  detailId: number;
  model: string;
  storage: string;
  color: string;
  buyerUserNo: number;
  success: boolean;
  status: 'SUCCESS' | 'OUT_OF_STOCK';
  /** 서버가 이 요청을 처리하는 데 걸린 시간(ms, 락 획득 대기시간 포함) - 응답시간 위젯이 이 값을 사용 */
  processingMs?: number;
}

/**
 * 동시성 제어
 * NONE(락 없음)
 * PESSIMISTIC(DB 락)
 * DISTRIBUTED(분산락)
 */
export type LockStrategy = 'NONE' | 'PESSIMISTIC' | 'DISTRIBUTED';

export async function placeOrder(detailId: number, buyerUserNo: number, lockStrategy: LockStrategy = 'PESSIMISTIC'): Promise<OrderResult> {
  const { data } = await orderApiClient.post<ApiResponse<OrderResult>>('/api/orders', {
    productDetailId: detailId,
    buyerUserNo,
    lockStrategy,
  });
  return data.data;
}

export async function resetStock(): Promise<void> {
  await orderApiClient.post<ApiResponse<null>>('/api/orders/reset');
}

export interface OversoldProduct {
  detailId: number;
  lostUnits: number;
}

export interface StockIntegrityReport {
  expectedTotal: number;
  actualTotal: number;
  lostUnits: number;
  lockStrategy: LockStrategy;
  /** 오버셀(예상보다 재고가 덜 줄어든) 것으로 감지된 상품별 수량 - 알림 노출 + 사후 취소 기준값 */
  oversoldProducts: OversoldProduct[];
}

/**
 * 배치(시뮬레이션 1회 실행) 종료 후 재고 정합성 결과를 서버로 전송
 * 서버는 이 값을 믿고 Kafka(stock-integrity-events)로 알림을 발행하는 것과 별개로
 * oversoldProducts에 담긴 상품별 오버셀 수량만큼 최근 성공 주문을 직접 찾아 사후 취소(재고 복구 + 결제 취소 알림)까지 처리.
 */
export async function reportBatchResult(payload: StockIntegrityReport): Promise<void> {
  await orderApiClient.post<ApiResponse<null>>('/api/orders/batch-result', payload);
}
