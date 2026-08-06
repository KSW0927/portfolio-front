import type { AxiosRequestConfig } from 'axios';
import { apiClient } from './client';

/**
 * 로그인 API
 * @description user-auth-service: POST /api/users/login (LoginRequestDTO: userId, password)
 */
export interface LoginParams {
  id: string;
  password: string;
  userSe?: string;
  language?: string;
  siteNo?: string;
}

/** user-auth-service LoginResponseDTO */
export interface LoginResultData {
  userNo: number;
  username: string;
  accessToken: string;
  refreshToken: string;
}

/** user-auth-service ApiResponse<T> (code / message / data) */
export interface AuthResponse {
  code: number;
  message: string;
  data: LoginResultData;
}

export async function login({ id, password }: LoginParams, config?: AxiosRequestConfig): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(`/api/users/login`, {
    userId: id,
    password,
  }, config);

  return data;
}

/**
 * 로그아웃 API
 * @description user-auth-service: POST /api/users/logout/{userNo}
 */
export async function logout(userNo: string | number): Promise<void> {
  try {
    await apiClient.post(`/api/users/logout/${userNo}`);
  } finally {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('auth-store');
  }
}
