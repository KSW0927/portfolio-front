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
 * 알림 정보 정의
 */
export interface NotificationItem {
    ntchNo: number;
    ntcnSeCd: string;
    ntcnCn: string;
    regDt: string;
}

/**
 * 쪽지 정보 정의
 */
export interface NoteItem {
    noteRcptnNo: number;
    noteDsptchNo: number;
    noteRcvrId: string;
    noteIdntyYn?: string;
    noteRcptnDt: string;
    noteDsptchCn: string;
    noteDsptchNm: string;
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
 * 선택박스 옵션 정의
 */
export interface OptionItem {
    label: string;
    value: string;
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

/**
 * 첨부파일 정보 정의
 */
export interface AttachFileInfo {
    atchFileNo?: string; // 첨부파일번호
    atchFileSeq?: number; // 첨부파일순서
    atchFileActlNm?: string; // 첨부파일실제명
    atchFileSz?: number; // 파일 크기 (바이트 단위)
    dwnldMtryYmd?: string; // 다운로드만기일자
    dwnldLmtCnt?: number; // 다운로드제한수
    dwnldCnt?: number; // 다운로드수'
    atchFilePath?: string; // 첨부파일경로
    atchFileExtnCd?: string; // 첨부파일확장자코드
    thmbVrNm?: string; // 썸네일가상명(옵션)
}
