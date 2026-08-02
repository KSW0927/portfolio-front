import { apiClient, isSuccess } from './client';
import type { BaseApiResponse } from "@/types/types.ts";


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

export async function login({ id, password }: LoginParams): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(`/api/users/login`, {
    userId: id,
    password,
  });

  return data;
}

/**
 * 세션 API
 * @description 백엔드에 아직 구현된 엔드포인트 없음 (user-auth-service에 /api/users/session 없음). 호출 시 404.
 */
export async function fetchSession(): Promise<AuthResponse> {
  const { data } = await apiClient.get<AuthResponse>(`/auth/session`);
  return data;
}

/**
 * 로그아웃 API
 * @description user-auth-service: POST /api/users/logout/{userNo}
 */
export async function logout(userNo: string | number): Promise<void> {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('auth-store');
  await apiClient.post(`/api/users/logout/${userNo}`);
}

/**
 * 권한 API
 */
type CodeListItem = Record<string, unknown>;
export interface SelectCodeListResult {
  codeList: CodeListItem[];
  codeCnt: number;
}
export const authApi = {

  /**
   * (GET) 페이지 권한 목록 조회
   * @param params
   */
  getListPageAuth: async (params: Record<string, unknown>): Promise<SelectCodeListResult> => {
    const {data} = await apiClient.get<BaseApiResponse<SelectCodeListResult>>(
        `/com/code/list/forselect`,
        { params }
    )

    if (!isSuccess(data.resultCode)) {
      throw new Error(data.resultMessage || '목록 조회 실패');
    }

    return {
      codeList: data.result?.codeList ?? [],
      codeCnt: data.result?.codeCnt ?? 0,
    };
  },

}
