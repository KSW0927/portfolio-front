import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";
import * as W from "@/pages/main/widgets";
import type { WidgetSize, WidgetData } from "@/types/types";

/**
 * 제공 위젯 목록
 */
export const INITIAL_WIDGETS: Record<string, WidgetData> = {
    approval:     { component: W.ApprovalWidget,     id: "w1",  type: "approval",     size: "sm", title: "옵션 설정",        iconEdit: "bank" },
    leave:        { component: W.LeaveWidget,        id: "w2",  type: "leave",        size: "sm", title: "처리 현황",        iconEdit: "leave-line" },
    profile:      { component: W.ProfileWidget,      id: "w3",  type: "profile",      size: "md", title: "알림",            iconEdit: "user" },
    oil:          { component: W.OilWidget,          id: "w5",  type: "oil",          size: "sm", title: "응답시간",         iconEdit: "oil-prices", icon: "oil" },
    exchange:     { component: W.ExchangeWidget,     id: "w17", type: "exchange",     size: "sm", title: "처리량",           iconEdit: "global",     icon: "exchange" },
    // interestRate: { component: W.InterestRateWidget, id: "w18", type: "interestRate", size: "sm", title: "실패율",           iconEdit: "bank_line",  icon: "interest-rate" },
}

/**
 * 저장소에서 관리할 위젯 정보 타입
 */
export interface WidgetStateItem {
    id: string;
    visible: boolean;
    size: WidgetSize;
    order: number;
}

/**
 * 위젯 상태 관리
 */
interface WidgetState {
    widgets: WidgetStateItem[]; // 위젯 상태 정보 목록
    toggleVisibility: (id: string) => void;
    updateOrder: (draggedId: string, targetId: string) => void;
    setWidgetState: (newStates: WidgetStateItem[]) => void;
    resetToDefault: () => void; // 초기화(전체 위젯 사용)
    getWidgetById: (id: string) => WidgetStateItem | undefined;
    getWidgetDetailById: (id: string) => WidgetData | undefined;
}

// 초기 기본 사용자 상태 생성 함수(모든 위젯 기본 노출, 배열 순서대로 정렬)
const createDefaultStates = (): WidgetStateItem[] =>
    Object.values(INITIAL_WIDGETS).map((widget, index) => ({
        id: widget.id,
        visible: true,
        size: widget.size,
        order: index,
    }));

export const useWidgetStore = create<WidgetState>() (
    persist (
        (set, get) => ({
            // 초기 상태 값
            widgets: createDefaultStates(),
            // 특정 위젯 ON/OFF
            toggleVisibility: (id) => set((state) => ({
                widgets: state.widgets.map((w) => w.id === id ? { ...w, visible: !w.visible } : w)
            })),
            // 위젯 순서 변경
            updateOrder: (draggedId, targetId) => set((state) => {
                const newStates = [...state.widgets];
                const draggedIndex = newStates.findIndex((w) => w.id === draggedId);
                const targetIndex = newStates.findIndex((w) => w.id === targetId);

                if(draggedIndex !== -1 && targetIndex !== -1) {
                    const tempOrder = newStates[draggedIndex].order;
                    newStates[draggedIndex].order = newStates[targetIndex].order;
                    newStates[targetIndex].order = tempOrder;
                }

                return { widgets: newStates.sort((a, b) => a.order - b.order) };
            }),
            // 위젯 설정 팝업 닫힐 때 변경 사항 적용 시 사용
            setWidgetState: (newStates) => set({ widgets: newStates }),
            // 초기 기본 값으로 리셋
            resetToDefault: () => set({ widgets: createDefaultStates() }),
            // 위젯 정보 조회
            getWidgetById: (id) => get().widgets.find((w) => w.id === id),
            getWidgetDetailById: (id) => Object.values(INITIAL_WIDGETS).find((w) => w.id === id),
        }),
        {
            name: 'widget-storage-portal', // localStorage에 저장될 키 이름
            storage: createJSONStorage(() => localStorage),
        }
    )
);
