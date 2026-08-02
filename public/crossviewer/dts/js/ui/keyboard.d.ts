export declare const isElementDisabled: (element: Element | null) => boolean;
/**
 * 포커스 가능 요소 목록을 반환한다.
 * container에 대한 MutationObserver를 통해 [tabindex] 속성 변경 또는
 * 자식 DOM 변경이 감지될 때만 재계산하고, 그 외에는 캐시를 반환한다.
 */
export declare const getFocusableElements: (container: HTMLElement) => HTMLElement[];
/**
 * container에 연결된 MutationObserver를 해제하고 캐시를 제거한다.
 * CrossViewer 인스턴스의 destroy() 시 반드시 호출해야 메모리 누수를 방지할 수 있다.
 */
export declare const destroyFocusableCache: (container: HTMLElement) => void;
type InfoMenuContext = {
    active: Element | null;
    infoMenu: HTMLElement | null;
    infoMenuContent: HTMLElement | null;
    header: HTMLElement | null;
    container: HTMLElement;
    isMenuOpen: boolean;
};
export declare const handleInfoMenuKeydown: (e: KeyboardEvent, ctx: InfoMenuContext) => boolean;
type CloseDocumentContext = {
    active: Element | null;
    closeDocument: HTMLElement | null;
    infoMenu: HTMLElement | null;
    infoMenuContent: HTMLElement | null;
    isMenuOpen: boolean;
};
export declare const handleCloseDocumentKeydown: (e: KeyboardEvent, ctx: CloseDocumentContext) => boolean;
type CtrlShortcutContext = {
    isDocumentOpen: boolean;
    config: {
        downloadEnabled?: boolean;
        printEnabled?: boolean;
        panel?: {
            useThumbnailPanel?: boolean;
        };
    };
    elements: {
        fitToggle?: HTMLElement | null;
        findText?: HTMLElement | null;
        download?: HTMLElement | null;
        print?: HTMLElement | null;
        fileInput?: HTMLElement | null;
        thumbnailMenu?: HTMLElement | null;
    };
    viewer: {
        zoomIn?: () => void;
        zoomOut?: () => void;
    } | null;
    filePathFlag: boolean;
    getUrlSearchParams: () => URLSearchParams;
    showError?: (args: {
        message: string;
    }) => void;
    noDownloadPage: string;
    noPrintPage: string;
};
export declare const handleCtrlShortcuts: (e: KeyboardEvent, ctx: CtrlShortcutContext) => boolean;
type ArrowNavigationContext = {
    active: Element | null;
    viewer: {
        prevPage?: () => void;
        nextPage?: () => void;
        getCurrentPage?: () => number;
        getTotalPages?: () => number;
    } | null;
    prevPageButton: HTMLButtonElement | null;
    nextPageButton: HTMLButtonElement | null;
    updatePageInfo?: (payload: {
        page?: number;
        totalPages?: number;
    }) => void;
    thumbnailsSection?: HTMLElement | null;
};
export declare const handleArrowNavigation: (e: KeyboardEvent, ctx: ArrowNavigationContext) => boolean;
type EnterKeyContext = {
    active: Element | null;
    isDocumentOpen: boolean;
    config: {
        downloadEnabled?: boolean;
        printEnabled?: boolean;
    };
    elements: {
        pageInput?: HTMLInputElement | null;
        scale?: HTMLElement | null;
        thumbnailMenu?: HTMLElement | null;
        prevPage?: HTMLElement | null;
        nextPage?: HTMLElement | null;
        zoomOut?: HTMLElement | null;
        zoomIn?: HTMLElement | null;
        fitHeightIcon?: HTMLElement | null;
        fitWidthIcon?: HTMLElement | null;
        fitToggle?: HTMLElement | null;
        findText?: HTMLElement | null;
        findTextBtn?: HTMLElement | null;
        searchPrev?: HTMLElement | null;
        searchNext?: HTMLElement | null;
        download?: HTMLElement | null;
        print?: HTMLElement | null;
        closeDocument?: HTMLElement | null;
        /** 파일 탐색창 트리거 input[type=file] */
        fileInput?: HTMLElement | null;
    };
    /** 뷰어 영역 요소 (.cv-viewer). Enter 시 파일 탐색창 열기에 사용 */
    viewerElement?: HTMLElement | null;
    /** URL/embed filePath 지정 여부. true이면 파일 탐색창을 열지 않는다 */
    filePathFlag?: boolean;
    /** URL 파라미터 조회. filePath 파라미터 존재 여부 확인에 사용 */
    getUrlSearchParams?: () => URLSearchParams;
    infoMenu: HTMLElement | null;
    viewer: {
        getCurrentPage?: () => number;
        getTotalPages?: () => number;
        goToPage?: (page: number) => void;
    } | null;
    isElementDisabled: (el: Element | null) => boolean;
    adjustPageIndex?: (page: number) => number;
    removeAllThumbnailHighlight?: () => void;
    highlightThumbnail?: (page: number) => void;
    handlePageNavigation?: (page: number) => Promise<void> | void;
    checkThumbnailVisibility?: () => Promise<void> | void;
    adjustZoom?: () => void;
    performSearch?: () => void;
    showError?: (args: {
        message: string;
    }) => void;
    noDownloadPage: string;
    noPrintPage: string;
    blurActiveElement?: () => void;
    resetViewer?: () => void;
};
export declare const handleEnterKeydown: (e: KeyboardEvent, ctx: EnterKeyContext) => boolean;
/**
 * INPUT 포커스 중 Ctrl/Meta 조합: 앱 단축키(CTRL_SHORTCUT_KEYS)는 허용, 나머지만 차단.
 * 브라우저 기본 동작(Ctrl+A 등)만 막고, Ctrl+F / Ctrl+D 등은 동작하도록 한다.
 */
export declare const handleInputCtrlBlock: (e: KeyboardEvent, active: Element | null) => boolean;
type ViewerTabToInsertContext = {
    isViewerElement: boolean;
    insertFile: HTMLElement | null;
    /** .canvas-container 요소. viewer에서 포커스가 떠날 때 in-focus 클래스를 제거하는 데 사용 */
    canvasWrapDiv?: HTMLElement | null;
};
export declare const handleViewerTabToInsert: (e: KeyboardEvent, ctx: ViewerTabToInsertContext) => boolean;
type EscapeKeyContext = {
    versionInfo: HTMLElement | null;
    versionMask: HTMLElement | null;
    infoMenu: HTMLElement | null;
    infoMenuContent: HTMLElement | null;
};
export declare const handleEscapeKeydown: (e: KeyboardEvent, ctx: EscapeKeyContext) => boolean;
type TabNavigationContext = {
    active: Element | null;
    container: HTMLElement;
    isMenuOpen: boolean;
    infoMenu: HTMLElement | null;
    infoMenuContent: HTMLElement | null;
    thumbnailMenu: HTMLElement | null;
    canvasWrapDiv: HTMLElement | null;
    fileInput: HTMLElement | null;
    filePathFlag: boolean;
    viewerElement: HTMLElement | null;
    viewerContainer: HTMLElement | null;
    closeDocument: HTMLElement | null;
};
export declare const handleTabNavigation: (e: KeyboardEvent, ctx: TabNavigationContext) => boolean;
export {};
