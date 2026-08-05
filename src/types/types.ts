/**
 * 인증 사용자 정보
 */
export interface AuthUser {
    id: string;
    name: string;
    emplyeeNo: string; // 사원번호
    telNo: string;
    mobile: string;
    email: string;
    deptCd: string; // 부서코드
    jbpsCd: string; // 직위코드
    state: string;
    taskNm: string;
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
 * 메뉴 정보 정의
 */
export interface MenuItem {
    menuNo: string;
    menuNm: string;
    menuKornNm: string | null;
    menuEngNm: string | null;
    menuUrlAddr: string;
    upMenuNo: string | number;
    menuLevel: number;
    sortSeq: number;
    menuIconNm: string | null;
    menuTypeSeCd: string | null;
    menuTypeCd: string | null;
    menuNpagYn: string | null;
    lnbN1ExpsrYn: string | null;
    lnbN2ExpsrYn: string | null;
    smapExpsrYn: string | null;
    submenus: MenuItem[] | null;
}

/**
 * 회사 소속(본부, 부서) 정의
 */
export interface CompGroupItem {
    value: string;
    text: string;
    parentValue?: string;
    deptLevel?: number;
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
