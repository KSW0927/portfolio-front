import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * 메뉴 상태 관리
 */

interface MenuState {
    currentServiceId: string; // 선택된 서비스ID
    nowMenuId: string; // 선택된 메뉴ID
    nowMenuTitle: string; // 선택된 메뉴 제목
    expandedGroups: string[]; // 펼쳐진 그룹ID 배열(그룹ID를 계층으로 표현, ID lv1/ID lv2/Id lv3)
    setCurrentServiceId: (id: string) => void;
    setNowMenuId: (id: string) => void;
    setNowMenuTitle: (title: string) => void;
    toggleGroups: (groupId: string, level: number) => void;
    reset: () => void;
    resetNowMenu: () => void;
}

export const useMenuStore = create<MenuState>() (
    persist (
        (set) => ({
            currentServiceId: "1",
            nowMenuId: '',
            nowMenuTitle: '',
            expandedGroups: [],
            setCurrentServiceId: (id: string) => set({ currentServiceId: id }),
            setNowMenuId: (id: string) => set({ nowMenuId: id }),
            setNowMenuTitle: (title: string) => set({ nowMenuTitle: title }),
            toggleGroups: (groupId: string, level: number) => set((state: MenuState) => {
                const isOpening = !state.expandedGroups.includes(groupId); // 해당 메뉴가 포함되어 있으면 닫힘으로

                if(isOpening) {
                    // 펼칠 때: 동일 레벨의 다른 그룹은 제거하고 해당 그룹 추가
                    const filtered = state.expandedGroups.filter((id: string) => {
                        const glvl = id.split("/").length + 1;
                        return glvl < level; // 다른 레벨의 상태는 유지, 같은 레벨은 일단 비움
                    });
                    return { expandedGroups: [ ...filtered, groupId ] };
                } else {
                    // 닫을 때: 현재 그룹 및 현재 그룹 하위 그룹 제거
                    const filtered = state.expandedGroups.filter((id: string) => !id.startsWith(groupId));
                    return { expandedGroups: filtered };
                }
            }),
            reset: () => set({ currentServiceId: "1", nowMenuId: '', nowMenuTitle: '', expandedGroups: [] }),
            resetNowMenu: () => set({ nowMenuId: '', nowMenuTitle: '', expandedGroups: [] })
        }),
        {
            name: 'menu-storage-portal', // localStorage에 저장될 키 이름
            storage: createJSONStorage(() => localStorage),
        }
    )
);
