import { create } from "zustand";

/**
 * 권한 상태 관리
 */
interface PermissionState {
    // 경로별 권한 정보 저장
    permissions: Record<string, any>;
    setPermission: (path: string, data: any) => void;
    clearPermissions: () => void;
}

export const usePermissionStore = create<PermissionState>()((set) => ({
    permissions: {},
    setPermission: (path: string, data: any) => set((state: PermissionState) => ({
        permissions: { ...state.permissions, [path]: data }
    })),
    clearPermissions: () => set({ permissions: {} }),
}));