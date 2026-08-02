import { ViewportSize, ViewportEvent, CleanupFunction, ErrorPayload } from './index';
import type { ElementMap, ViewerConfigLike, ViewerInstance } from './viewerTypes';
/**
 * 디바이스 디텍터 컨텍스트 인터페이스
 */
export interface DeviceDetectorContext {
    getViewportSize?: () => ViewportSize;
    getUserAgent?: () => string;
    hasTouch?: () => boolean;
    onViewportChange?: (callback: (event: ViewportEvent) => void) => CleanupFunction;
}
/**
 * 브레이크포인트 매니저 컨텍스트 인터페이스
 */
export interface BreakpointManagerContext {
    getViewportSize?: () => ViewportSize;
    onViewportChange?: (callback: (event: ViewportEvent) => void) => CleanupFunction;
}
/**
 * 오리엔테이션 핸들러 컨텍스트 인터페이스
 */
export interface OrientationHandlerContext {
    getViewportSize?: () => ViewportSize;
    onViewportChange?: (callback: (event: ViewportEvent) => void) => CleanupFunction;
    getWindow?: () => Window;
}
/**
 * 미디어 쿼리 컨텍스트 인터페이스
 */
export interface MediaQueryContext {
    getWindow?: () => Window;
}
/**
 * 모바일 컨텍스트 인터페이스
 */
export interface MobileContext {
    viewer?: ViewerInstance;
    config?: ViewerConfigLike;
    root?: HTMLElement;
    instanceId?: string;
    deviceDetector?: unknown;
    mobileUI?: unknown;
    elements?: ElementMap;
    sectionDivider?: NodeListOf<HTMLElement> | HTMLElement[];
    isMobile?: boolean;
    showError?: (payload: ErrorPayload) => void;
    showLoading?: (show: boolean) => void;
    initOpenDocument?: (url: string, fileId?: string) => Promise<boolean | undefined>;
    applyLanguageSettings?: (lang: string) => void;
    handleViewerClick?: ((e: Event) => void) | null;
    paramsUserLang?: string;
    filePathFlag?: () => boolean;
    getViewportSize?: () => ViewportSize;
    getUserAgent?: () => string;
    hasTouch?: () => boolean;
    onViewportChange?: (callback: (event: ViewportEvent) => void) => CleanupFunction;
    getWindow?: () => Window;
    getUrlSearchParams?: () => URLSearchParams;
    loadMobileThumbnailsExport?: () => unknown;
    checkThumbnailVisibilityExport?: () => unknown;
    setIsDocumentOpen?: (isOpen: boolean) => void;
    restoreViewerClickListener?: () => void;
    setLastSearchButtonClicked?: (button: string) => void;
    getUrlHref?: () => string;
    cleanup?: () => void;
    registerCleanup?: (fn: () => void) => void;
    resetViewer?: () => void;
    performSearch?: (keyword: string) => void;
}
