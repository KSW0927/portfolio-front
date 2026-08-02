import type { ElementMap, ViewerConfigLike, ViewerInstance } from '../../types/viewerTypes';
import type { LanguageTexts } from '../../lang/languageSettings';
export declare const collectVisibleThumbnailPages: (section: HTMLElement, thumbnails: HTMLElement) => number[];
export declare const loadThumbnailPages: (viewer: ViewerInstance, pages: number[], width?: number, height?: number) => Promise<void>;
/**
 * 빠른 네비게이션 후 WASM 콜백 누락으로 로딩 이미지가 잔류하는 썸네일을 강제 재요청한다.
 * 기존 큐 상태(pendingSet/inFlight)와 무관하게 canvas 미생성 썸네일에 대해
 * getPageThumbnail을 직접 호출하고, 렌더 완료될 때까지 반복한다.
 */
export declare const settlePendingThumbnails: (viewer: ViewerInstance, section: HTMLElement, thumbnails: HTMLElement, signal?: {
    cancelled: boolean;
}, width?: number, height?: number) => Promise<void>;
type ThumbnailContext = {
    container: HTMLElement;
    elements: ElementMap;
    viewer: ViewerInstance | null;
};
type MobileUiLike = {
    applyPageCount?: (currentPage: number, totalPages: number) => void;
    showUIAfterThumbnailSelection?: () => void;
    createMobileIcon: (container: HTMLElement | null, id: string, className: string | null, iconSvg: string, title: string, clickHandler: (e: Event) => void, appendPos?: 'start' | 'end' | 'after') => void;
    handleThumbnailsButton?: (e: Event) => void;
    elements: {
        mobileIcons: {
            content: {
                thumbnailsIcon: string;
            };
        };
    };
};
type PageUiContext = ThumbnailContext & {
    isMobile: boolean;
    getMobileUI?: (viewer: ViewerInstance | null, config?: ViewerConfigLike) => {
        applySheetInfo?: (currentPage: number, totalPages: number) => void;
        applyPageCount?: (currentPage: number, totalPages: number) => void;
    } | null;
    config?: ViewerConfigLike;
    removeAllThumbnailHighlight: () => void;
    highlightThumbnail: (page: number) => void;
    handlePageNavigation?: (page: number) => Promise<void> | void;
    checkThumbnailVisibility?: () => Promise<void> | void;
};
export declare const checkThumbnailVisibility: (ctx: ThumbnailContext) => Promise<void>;
export declare const focusThumbnail: (ctx: ThumbnailContext, params: {
    mode: "prev" | "next" | "input";
    currentPage: number;
}) => Promise<void>;
export declare const moveToScrollTop: (ctx: ThumbnailContext, size: number) => void;
export declare const resetThumbnailSection: (ctx: ThumbnailContext) => void;
export declare const removeAllThumbnailHighlight: (ctx: ThumbnailContext) => void;
export declare const highlightThumbnail: (ctx: ThumbnailContext, page: number) => void;
export declare const updatePageInfo: (ctx: PageUiContext, params: {
    page?: number;
    totalPages?: number;
}) => Promise<void>;
export declare const updateUIState: (ctx: ThumbnailContext & {
    viewer: ViewerInstance | null;
    removeAllThumbnailHighlight: () => void;
    highlightThumbnail: (page: number) => void;
}, params: {
    currentPage: number;
    totalPages: number;
}) => void;
type ViewerThumbnailContext = ThumbnailContext & {
    config: ViewerConfigLike;
    isMobile: boolean;
    getMobileUI?: (viewer: ViewerInstance | null, config?: ViewerConfigLike) => MobileUiLike | null;
    setExcelFitModeClass?: (docType: string, fitMode: string) => void;
    highlightThumbnail: (page: number) => void;
    getFooterStartElement?: () => Element | null;
};
export declare const createViewerThumbnail: (ctx: ViewerThumbnailContext, params: {
    page: number;
    canvas: CanvasImageSource | null;
    width: number;
    height: number;
}) => void;
type PrintThumbnailContext = ThumbnailContext;
export declare const createPrintThumbnail: (ctx: PrintThumbnailContext, params: {
    page: number;
    canvas: CanvasImageSource | null;
    width: number;
    height: number;
}) => void;
type UpdatePageThumbnailContext = ThumbnailContext & {
    printState: boolean;
    noCanvasProvided: string;
    showError: (args: {
        message: string;
    }) => void;
    createPrintThumbnail: (params: {
        page: number;
        canvas: CanvasImageSource | null;
        width: number;
        height: number;
    }) => void;
    createViewerThumbnail: (params: {
        page: number;
        canvas: CanvasImageSource | null;
        width: number;
        height: number;
    }) => void;
};
export declare const updatePageThumbnail: (ctx: UpdatePageThumbnailContext, params: {
    page: number;
    canvas: CanvasImageSource | null;
    width: number;
    height: number;
}) => void;
type ThumbnailSetupContext = ThumbnailContext & {
    isMobile: boolean;
    showError: (args: {
        message: string;
    }) => void;
    normalizeErrorMessage: (err: unknown) => string;
    highlightThumbnail: (page: number) => void;
    setExcelFitModeClass?: (docType: string, fitMode: string) => void;
    getMobileUI?: (viewer: ViewerInstance | null, config?: ViewerConfigLike) => MobileUiLike | null;
    getFooterStartElement?: () => Element | null;
    config: ViewerConfigLike;
    setThumbnailObserver: (observer: IntersectionObserver | null) => void;
    getThumbnailObserver: () => IntersectionObserver | null;
    loadPagesInBatch: (startPage: number, endPage: number) => Promise<void>;
    checkThumbnailVisibility: () => Promise<void>;
};
export declare const checkCanvasRendered: (ctx: ThumbnailSetupContext, stableThreshold?: number, checkInterval?: number, singlePageGraceMs?: number, maxWaitMs?: number) => Promise<number>;
export declare const setupThumbnailContainer: (ctx: ThumbnailSetupContext, totalPages: number) => Promise<void>;
export declare const setupThumbnailContainerOnDemand: (ctx: ThumbnailSetupContext, totalPages: number) => Promise<void>;
export declare const setupThumbnailObserver: (ctx: ThumbnailSetupContext) => Promise<void>;
export declare const loadMobileThumbnails: (ctx: ThumbnailSetupContext) => Promise<void>;
type PageNavigationContext = ThumbnailContext;
export declare const handlePageNavigation: (ctx: PageNavigationContext, targetPage: number) => void;
type ViewerUiContext = {
    viewer: ViewerInstance | null;
    elements: ElementMap;
    container: HTMLElement;
};
export declare const updateScaleInfo: (ctx: ViewerUiContext, scale: number) => void;
export declare const checkScreenResize: (ctx: ViewerUiContext) => void;
type UiVisibilityContext = {
    container: HTMLElement;
    elements: ElementMap;
    config: ViewerConfigLike;
};
export declare const initHideUI: (ctx: UiVisibilityContext) => void;
export declare const initShowUI: (ctx: UiVisibilityContext) => void;
export declare const displayFileTypeLabel: (ctx: UiVisibilityContext) => void;
export declare const checkDependencies: (getViewer: () => ViewerInstance | null, timeoutMs?: number, // 단일 인스턴스 기본값; 멀티 인스턴스 환경에서는 main.ts의 checkDependencies()가 동적으로 계산해 전달
pollIntervalMs?: number) => Promise<void>;
type VersionInfoContext = {
    container: HTMLElement;
    elements: ElementMap;
    info?: {
        version?: string;
        serialNumber?: string;
    } | null;
    config: ViewerConfigLike;
    infoTitle?: string;
    infoConfirmButton?: string;
    versionInfoLabel?: string;
    versionInfoRef: {
        value: HTMLElement | null;
    };
    versionMaskRef: {
        value: HTMLElement | null;
    };
    registerCleanup?: (fn: () => void) => void;
};
export declare const showVersionInfo: (ctx: VersionInfoContext, infoMenuContent?: HTMLElement | null, _infoTitle?: string, infoConfirmButton?: string) => void;
type UploadContext = {
    container: HTMLElement;
    elements: ElementMap;
    config: ViewerConfigLike;
    viewer: ViewerInstance | null;
    isUploadBlocked: boolean;
    filePathFlag: boolean;
    invalidFileTypeMessage: string;
    openDocumentFailMessage: string;
    showError: (args: {
        message: string;
    }) => void;
    loadDocument: (file: File) => Promise<void>;
    isValidFileExtension: (fileName: string) => boolean;
};
export declare const handleDrop: (ctx: UploadContext, event: DragEvent) => Promise<void>;
export declare const isValidFileExtension: (config: ViewerConfigLike, fileName: string) => boolean;
export declare const failLoadAsUrlPath: (message: string, ctx: {
    showError: (args: {
        message: string;
    }) => void;
    setUploadBlocked: (value: boolean) => void;
    setFilePathFlag: (value: boolean) => void;
    detachUploadEventListeners: () => void;
    disableUploadControls: () => void;
}) => void;
export declare const disableUploadControls: (elements: ElementMap) => void;
export declare const detachUploadEventListeners: (elements: ElementMap, handlers: {
    onViewerClick?: (e: Event) => void;
    onViewerContainerClick?: (e: Event) => void;
    onViewerContainerKeyDown?: (e: KeyboardEvent) => void;
    onViewerContainerDrop?: (e: DragEvent) => Promise<void>;
    onViewerContainerDragOver?: (e: DragEvent) => void;
    onViewerContainerDragLeave?: (e: DragEvent) => void;
    onDropZoneClick?: (e: Event) => void;
    onFileInputChange?: (e: Event) => Promise<void>;
}) => void;
export declare const handleViewerClick: (e: Event, ctx: {
    isUploadBlocked: boolean;
    isDocumentOpen: boolean;
    filePathFlag: boolean;
    isOpeningDocument?: boolean;
    insertFile: HTMLElement | null;
}) => void;
type ViewerContainerHandlersContext = {
    container: HTMLElement;
    elements: ElementMap;
    isUploadBlocked: boolean;
    isDocumentOpen: boolean;
    filePathFlag: boolean;
    isOpeningDocument: boolean;
    handleViewerClick: (e: Event) => void;
    handleDrop: (e: DragEvent) => Promise<void>;
    loadDocument: (file: File) => Promise<void>;
};
export declare const createViewerContainerHandlers: (ctx: ViewerContainerHandlersContext) => {
    onViewerContainerClick: (e: Event) => void;
    onViewerContainerKeyDown: (e: KeyboardEvent) => void;
    onViewerContainerDrop: (e: DragEvent) => Promise<void>;
    onViewerContainerDragOver: (e: DragEvent) => void;
    onViewerContainerDragLeave: (e: DragEvent) => void;
    onDropZoneClick: (e: Event) => void;
    onFileInputChange: (e: Event) => Promise<void>;
};
export declare const setDownloadHref: (params: {
    downloadEl: HTMLAnchorElement | null;
    languageTexts?: LanguageTexts;
}, fileOrString: File | string, optionalFileName?: string) => void;
export {};
