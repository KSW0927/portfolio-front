import { DocumentType, Orientation, Language, Theme, PageTransitionDirection } from './enums';
/**
 * 뷰어 설정 인터페이스
 */
export interface ViewerConfig {
    lang: Language | 'kor' | 'enu' | 'jpn' | 'chs' | 'cht' | 'vit' | 'ind' | 'fra' | 'auto';
    theme?: Theme | 'light' | 'dark';
    documentType?: DocumentType;
    panel?: {
        useThumbnailPanel?: boolean;
        initialThumbailPanel?: boolean;
    };
    searchEnabled?: boolean;
    downloadEnabled?: boolean;
    printEnabled?: boolean;
    initialScaleValue?: Record<string, string>;
    scaleIncrement?: number;
    allowedFileExtensions?: string[];
    allowFileUrlOpen?: boolean;
    fileStreamUrl?: string;
    configUrl?: string;
    instanceConfigUrl?: string;
    mobileConfigUrl?: string;
    mobileInstanceConfigUrl?: string;
    viewerInfoUrl?: string;
    urlParams?: Record<string, string>;
    pageTransitionDirection?: PageTransitionDirection | 'vertical' | 'horizontal';
}
/**
 * 디바이스 정보 인터페이스
 */
export interface DeviceInfo {
    isMobile: boolean;
    isTouch: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    orientation: Orientation | 'portrait' | 'landscape';
    screenWidth: number;
    screenHeight: number;
    userAgent: string;
}
/**
 * 뷰포트 크기 인터페이스
 */
export interface ViewportSize {
    width: number;
    height: number;
}
/**
 * 뷰포트 이벤트 인터페이스
 */
export interface ViewportEvent {
    type: 'resize' | 'orientationchange';
    target?: Window;
}
/**
 * 최적화 설정 인터페이스
 */
export interface OptimizationSettings {
    thumbnailSize: {
        width: number;
        height: number;
    };
    enableAnimations: boolean;
    enableGestures: boolean;
    enablePinchZoom: boolean;
}
/**
 * UI 설정 인터페이스
 */
export interface UISettings {
    showThumbnails: boolean;
    toolbarPosition: 'top' | 'bottom';
    menuStyle: 'overlay' | 'dropdown';
}
/**
 * 터치 이벤트 핸들러 세트 인터페이스
 */
export interface HandlerSet {
    onTouchEnd: (e: TouchEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    onGesture: (e: Event) => void;
}
/**
 * 반응형 설정 인터페이스
 */
export interface ResponsiveConfig {
    breakpoint: string;
    characteristics: DeviceCharacteristics;
    settings: BreakpointSettings;
}
/**
 * 디바이스 특성 인터페이스
 */
export interface DeviceCharacteristics {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
    isLandscape: boolean;
    isTouch: boolean;
    isNoTouch: boolean;
    prefersDarkMode: boolean;
    prefersLightMode: boolean;
}
/**
 * 브레이크포인트별 설정 인터페이스
 */
export interface BreakpointSettings {
    layout: string;
    showThumbnails: boolean;
    enableGestures: boolean;
    enableAnimations: boolean;
    toolbarPosition: 'top' | 'bottom';
    menuStyle: 'overlay' | 'dropdown';
    thumbnailSize: {
        width: number;
        height: number;
    };
    maxThumbnails: number;
}
/**
 * 에러 페이로드 인터페이스
 */
export interface ErrorPayload {
    message: string;
    code?: number;
}
/**
 * 페이지 전환 옵션 인터페이스
 */
export interface PageTransitionOptions {
    enabled: boolean;
    direction: PageTransitionDirection | 'vertical' | 'horizontal';
    duration: number;
}
/**
 * 이벤트 콜백 타입
 */
export type EventCallback<T = void> = (data: T) => void;
/**
 * 클린업 함수 타입
 */
export type CleanupFunction = () => void;
/**
 * Breakpoint 타입 (문자열 유니온)
 */
export type BreakpointType = 'mobile' | 'tablet' | 'desktop';
export * from './enums';
