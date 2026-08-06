/**
 * 인증 사용자 정보
 */
export interface AuthUser {
    id: string;
    name: string;
    userSe: string;
    language: string;
}

/**
 * 공통 응답 구조 정의
 */
export type BaseApiResponse<T> = {
    resultCode: string;
    resultMessage?: string;
    result?: T;
}

/**
 * 대시보드 위젯의 크기 타입
 */
export type WidgetSize = "sm" | "md" | "lg";

/**
 * 대시보드에서 지원하는 위젯의 종류
 */
export type WidgetType = "option" | "status" | "notify" | "latency";

/**
 * 위젯의 메타데이터 인터페이스
 */
export interface WidgetData {
    component: React.ComponentType<any>;
    id: string;
    type: WidgetType;
    size: WidgetSize;
    title: string;
    iconEdit?: string;
    icon?: string;
    expandable?: boolean;
    hasAction?: boolean;
    actionTitle?: string;
    action?: () => void;
}

/**
 * 위젯 카드 컴포넌트 Props
 */
export interface WidgetCardProps {
    activeKebabId: string | null;
    widget: WidgetData;
    changeActiveKebab: (id: string | null) => void;
    changeHide: (id: string) => void;
    changeExpand: (id: string) => void;
}
