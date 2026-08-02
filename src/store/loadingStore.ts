import  { create } from "zustand";

/**
 * 메뉴 상태 관리
 */
interface LoadingState {
    isLoading: boolean;
    activeRequests: number; // 동시에 여러 API가 돌 때를 대비한 카운터
    showLoading: () => void;
    hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    activeRequests: 0,
    showLoading: () => set((state) => ({
        activeRequests: state.activeRequests + 1,
        isLoading: true
    })),
    hideLoading: () => set((state) => {
        const nextCount = Math.max(0, state.activeRequests - 1);
        return {
            activeRequests: nextCount,
            isLoading: nextCount > 0
        };
    }),
}));