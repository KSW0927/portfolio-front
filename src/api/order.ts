import axios from 'axios';

/**
 * 주문 API 클라이언트
 * @description order-coupon-service는 아직 게이트웨이/프록시 대상이 아니라
 * 다른 서비스와 별도로 직접 baseURL을 지정해서 호출합니다.
 * order-coupon-service는 JWT로 "요청이 인증된 세션에서 왔는지"를 검증하므로
 * user-auth-service 로그인 때 발급받은 accessToken을 그대로 실어 보냅니다.
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
  const { data } = await orderApiClient.get<ApiResponse<ProductItem[]>>('/api/orders/products');
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
}

export async function placeOrder(detailId: number, buyerUserNo: number, useLock: boolean = true): Promise<OrderResult> {
  const { data } = await orderApiClient.post<ApiResponse<OrderResult>>('/api/orders', {
    productDetailId: detailId,
    buyerUserNo,
    useLock,
  });
  return data.data;
}

export async function resetStock(): Promise<void> {
  await orderApiClient.post<ApiResponse<null>>('/api/orders/reset');
}
