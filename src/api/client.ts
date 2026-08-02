import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useLoadingStore } from '@/store/loadingStore';

export const baseURL = import.meta.env.VITE_API_PREFIX || '';
export const isSuccess = (code: unknown) => String(code) === '200';

const ACCESS_TOKEN_KEY = 'access_token';

// 리다이렉트 중복 방지 플래그
let isRedirecting = false;

declare module 'axios' {
    export interface AxiosRequestConfig {
        showLoading?: boolean; // 기본값은 true
    }
    export interface InternalAxiosRequestConfig {
        showLoading?: boolean; // 기본값은 true
    }
}

function getAccessToken(): string {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) || '';
}

function clearAccessToken(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Axios의 RequestConfig 타입을 확장하여 커스텀 옵션 추가
declare module 'axios' {
    export interface InternalAxiosRequestConfig {
        showLoading?: boolean; // 기본값은 true
    }
}

export const apiClient = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 요청 시작 시 로딩 Show
        if(config.showLoading !== false) useLoadingStore.getState().showLoading();

        // 토큰 가져오기
        const token = getAccessToken();

        // config.headers가 없는 경우에 대한 방어코드 및 세팅
        if(config.headers) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                delete config.headers.Authorization;
            }
        }

        return config;
    },
    (error) => {
        // 요청 에러 시 로딩 Hide
        useLoadingStore.getState().hideLoading();
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        // 응답 성공 시 로딩 Hide
        if(response.config.showLoading !== false) useLoadingStore.getState().hideLoading();
        return response;
    },
    (error: AxiosError) => {
        // 응답 에러 시 로딩 Hide
        if(error.config?.showLoading !== false) useLoadingStore.getState().hideLoading();

        const isLoginPage = window.location.pathname === '/login';
        if (error.response?.status === 401 && !isLoginPage && !isRedirecting) {
            isRedirecting = true; // 플래그 차단
            clearAccessToken();

            // 알림을 보여주고 이동
            alert('인증이 만료되었습니다. 다시 로그인해주세요.');
            window.location.replace('/login');
        }

        return Promise.reject(error);
    }
);

export default apiClient;

