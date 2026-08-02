import type { LanguageTexts } from '../lang/languageSettings';
import { MobileUI } from './mobile/mobileUI';
import type { ViewerConfig } from '../types';
import type { MobileContext } from '../types/context';
import type { ElementMap, OpenApi, RuntimeOptions, ViewerConfigLike, ViewerInstance } from '../types/viewerTypes';
declare global {
    const CrepasViewer: {
        create: (target: HTMLElement | null, options: unknown) => ViewerInstance;
    };
}
export default class CrossViewer {
    private static activeKeyboardInstanceId;
    private static _engineInitChain;
    private static _activeInstanceCount;
    private static readonly _depCheckBaseMs;
    private static readonly _depCheckMaxMs;
    private static readonly _depCheckMobileFactor;
    private static _engineScriptReady;
    container: HTMLElement;
    instanceId: string;
    private _options;
    private runtimeOptions;
    private configOptions;
    private _urlContext;
    private _urlSearchParams;
    config: ViewerConfigLike;
    private viewer;
    private elements;
    private isDocumentOpen;
    private filePathFlag;
    private _pendingOpenExt;
    private isUploadBlocked;
    private _viewerInitPromise;
    private _viewerInitialized;
    private _isInitRunning;
    private urlOpenScope;
    private _isApplePlatform;
    private _onOpenHandlerPromise;
    private _onOpenHandlerResolve;
    private _onViewerClick;
    private _onViewerContainerClick;
    private _onViewerContainerKeyDown;
    private _onViewerContainerDrop;
    private _onViewerContainerDragOver;
    private _onViewerContainerDragLeave;
    private _onDropZoneClick;
    private _onFileInputChange;
    private _isDestroyed;
    private _windowResizeBound;
    private _onWindowResize;
    private _cleanupFns;
    private _externalListeners;
    private _thumbnailSettleTimer;
    private _thumbnailSettleSignal;
    private _documentListenersBound;
    private _onDocumentKeyDown;
    private _onDocumentMouseDown;
    private _onDocumentClick;
    private versionInfo;
    private versionMask;
    private infoTitle;
    private infoConfirmButton;
    private isMobile;
    private mobileUI;
    private mobile;
    private deviceDetector;
    private _windowResizeUnsubscribe;
    private PARSING;
    private params;
    private paramsUserLang;
    private printState;
    private lastSearchButtonClicked;
    private _pageBeforeSearch;
    private currentLength;
    private loadPrintText;
    private loadProcessText;
    private loadProcessNode;
    private searchFail;
    private searchSuccess;
    private mobileSearchSuccess;
    private noPrintPage;
    private failLoadImage;
    private initViewerFail;
    private failLoadConfig;
    private failLoadFilePath;
    private openDocumentFail;
    private noCanvasProvided;
    private noDownloadPage;
    private invalidFileTpye;
    private loadFileFail;
    private viewerDependencyCheckFail;
    private fileUrlOpenNotAllowed;
    private failUrlParsing;
    private mobileDefaultIntroduceText;
    private info;
    open: OpenApi;
    private _streamUrl;
    private _isOpeningDocument;
    private initPromise;
    private previousScaleValue;
    private versionInfoLabel;
    private thumbnailObserver;
    constructor(containerId: string, options?: Partial<ViewerConfig>);
    getDefaultConfig(): ViewerConfigLike;
    getDefaultMobileConfig(): ViewerConfigLike;
    init(): Promise<void>;
    /**
     * 뷰어가 초기화되지 않은 경우 초기화를 진행합니다.
     * @private
     */
    private initViewerIfNeeded;
    /**
     * 뷰어 초기화 완료 보장
     * @private
     */
    private ensureViewerInitialized;
    render(): void;
    cacheElements(): void;
    initViewer(): Promise<void>;
    /**
     * 외부에서 뷰어 이벤트를 구독한다.
     * 반환된 함수를 호출하면 구독이 해제된다.
     *
     * @example
     * const unsubscribe = viewer.on('pageChanged', (info) => console.log(info));
     * // 정리 시
     * unsubscribe();
     */
    on(event: string, callback: (...args: unknown[]) => void): () => void;
    /**
     * 등록된 외부 리스너들에게 이벤트를 전달한다.
     * setupViewerEvents() 내부의 각 v.on() 핸들러에서 호출된다.
     */
    private _emit;
    setupViewerEvents(): void;
    private bindUploadEventListeners;
    setupUIEventListeners(): void;
    handleDrop(e: DragEvent): Promise<void>;
    loadDocument(file: File): Promise<boolean | void>;
    setDocumentTitle(fileOrString: File | string): void;
    setDownloadHref(fileOrString: File | string, optionalFileName?: string): void;
    isAlreadyEncoded(str: string): boolean;
    handleViewerClick(e: Event): void;
    loadInfo(): Promise<void>;
    loadConfig(): Promise<void>;
    initOpenDocument(filePath: string, fileId?: string, prefetchedBuffer?: Promise<ArrayBuffer>): Promise<boolean | undefined>;
    /**
     * 문서 열기 API 객체 생성
     * @private
     * @returns {Object} open API 객체
     */
    _createOpenApi(): OpenApi;
    /**
     * URL 파라미터 검증
     * @private
     * @param {*} value - 검증할 값
     * @param {string} paramName - 파라미터 이름 (에러 메시지용)
     * @returns {boolean} 유효성 여부
     */
    _validateStringParam(value: unknown, paramName: string): boolean;
    /**
     * 뷰어 준비 상태 확인 및 대기
     * @private
     * @returns {Promise<boolean>} 뷰어 준비 여부
     */
    _validateViewerReady(): Promise<boolean>;
    /**
     * 일반 파일 URL로 문서 열기 (내부 구현)
     * @private
     * @param {string} url - 문서 URL 또는 파일 경로
     * @returns {Promise<boolean>} 문서 열기 성공 여부
     */
    _openDocumentByUrl(url: string): Promise<boolean>;
    /**
     * 스트림 방식으로 문서 열기 (내부 구현)
     * @private
     * @param {string} fileId - 파일 ID
     * @returns {Promise<boolean>} 문서 열기 성공 여부
     */
    _openDocumentByStream(fileId: string): Promise<boolean>;
    /**
     * 스트림 URL 설정
     * @private
     * @param {string} url - 스트림 서버 URL 또는 경로
     * @returns {Promise<boolean>} 설정 성공 여부
     */
    _setStreamURL(url: string): Promise<boolean>;
    openDocumentFromUrlScope(fileUrl: string, { failMessage, timeoutMs, }?: {
        failMessage?: string;
        timeoutMs?: number;
    }): Promise<boolean>;
    checkDocument(stableThreshold?: number, checkInterval?: number): Promise<void>;
    _bindWindowResizeListener(): void;
    _unbindWindowResizeListener(): void;
    _registerCleanup(fn: () => void): void;
    _runCleanup(): void;
    _bindDocumentListeners(): void;
    _unbindDocumentListeners(): void;
    _getFooterStartElement(): HTMLElement | null;
    _onMobileDocumentOpened(): void;
    _onMobileDocumentClosed(): void;
    resetViewer(): void;
    destroy(): void;
    showLoading(show: boolean): void;
    private setFileParamOpenLoadingState;
    private blurActiveElement;
    /**
     * 뷰어가 visible 상태가 되면 포커스를 설정하여 방향키 네비게이션이 즉시 동작하도록 한다.
     * CrepasViewer 엔진이 렌더링 완료 전에는 visibility:hidden을 설정하므로,
     * 렌더링이 끝나 visible 상태가 될 때까지 requestAnimationFrame으로 대기한다.
     */
    private focusViewerWhenReady;
    createLoadProcessElement(): void;
    showError({ message }: {
        message: string;
    }): void;
    applyViewerTheme(theme: string): void;
    adjustPageIndex(page: number): number;
    adjustZoom(): void;
    parseScaleValue(scaleValue: unknown): number;
    private getViewerModule;
    private getZoomScaleBounds;
    private applyPageTransitionOptions;
    applySettings(cfgInput?: ViewerConfigLike): Promise<ViewerConfigLike>;
    focusMenuItem(menuItem: HTMLElement | null): void;
    setupInfoMenu(menuItems?: Array<{
        text: string;
        action: () => void;
    }>): void;
    initHideUI(): void;
    initShowUI(): void;
    /**
     * CrepasViewer 엔진 스크립트(`<script async>`)의 로드 완료를 대기.
     * 스크립트가 아직 다운로드 중이면 load 이벤트를 기다리고,
     * timeoutMs 이내에 완료되지 않으면 resolve하여 checkDependencies에 위임.
     */
    private static _waitForEngineScript;
    checkDependencies(): Promise<void>;
    displayFileTypeLabel(): void;
    handlePageNavigation(targetPage: number): Promise<void>;
    /**
     * 빠른 네비게이션(키보드/마우스) 종료 후 보이는 영역의
     * 미완료 썸네일을 강제 재요청하는 디바운스 스케줄러.
     */
    private _scheduleThumbnailSettle;
    disableUploadControls(): void;
    detachUploadEventListeners(): void;
    handleKeyDownEvent(e: KeyboardEvent): void;
    setLastSearchButtonClicked(value: string): void;
    setExcelFitModeClass(docType: string, fitMode: string, _index?: number): void;
    printDocument(): void;
    isValidFileExtension(fileName: string): boolean;
    getMobileContext(viewer?: ViewerInstance, config?: ViewerConfigLike): MobileContext;
    getMobileUI(viewer?: ViewerInstance, config?: ViewerConfigLike): MobileUI | null;
    replaceIcon(target: HTMLElement | null, newIcon: string): void;
    applyLightThemeIcon(): void;
    getQueryParams(): Record<string, string>;
    _createUrlContext(options?: RuntimeOptions): {
        searchParams: URLSearchParams;
        href: string;
        urlObj?: URL | null;
    };
    _safeCreateUrl(href: string): URL | null;
    _normalizeSearchParams(options: RuntimeOptions, urlObj: URL | null): URLSearchParams;
    _extractRuntimeOptions(options?: RuntimeOptions): RuntimeOptions;
    _stripRuntimeOptions(options?: ViewerConfigLike): ViewerConfigLike;
    _getUrlObject(): URL | null;
    getUrlSearchParams(): URLSearchParams;
    getUrlHref(): string;
    getBaseUrl(): string;
    /**
     * favicon을 라이브러리 base 기준으로 동적 설정.
     * HTML이 임의 폴더에 위치해도 올바른 아이콘 경로를 가리킨다.
     * 이미 존재하는 favicon 링크가 있으면 href만 갱신한다.
     */
    _ensureFavicon(): void;
    /**
     * HTML 페이지 위치 기준 base URL.
     * 사용자가 생성자에서 지정한 상대 경로(configUrl, instanceConfigUrl 등)는
     * HTML 페이지 기준으로 해석되어야 한다.
     */
    getPageBaseUrl(): string;
    resolvePageUrl(pathOrUrl: string): string | null;
    getOrigin(): string;
    getBasePath(): string;
    resolveUrl(pathOrUrl: string): string | null;
    appendNoCache(url: string): string;
    initializeSettings(): Promise<ViewerConfigLike>;
    applyLanguageSettings(lang: string): LanguageTexts | void;
    showVersionInfo(infoMenuContent?: any, config?: ViewerConfigLike, _infoTitle?: string, infoConfirmButton?: string): void;
    handleSearchNavigation(direction?: number): void;
    performSearch(): Promise<void>;
    updateSearchButtonStates(): void;
    createViewerThumbnail({ page, canvas, width, height, }: {
        page: number;
        canvas: CanvasImageSource | null;
        width: number;
        height: number;
    }): void;
    createPrintThumbnail({ page, canvas, width, height, }: {
        page: number;
        canvas: CanvasImageSource | null;
        width: number;
        height: number;
    }): void;
    _buildThumbnailContext(): {
        container: HTMLElement;
        elements: ElementMap;
        viewer: ViewerInstance;
        isMobile: boolean;
        showError: (args: {
            message: string;
        }) => void;
        normalizeErrorMessage: (error: unknown, fallback?: string) => string;
        highlightThumbnail: (page: number) => void;
        getMobileUI: any;
        getFooterStartElement: any;
        config: ViewerConfigLike;
        setThumbnailObserver: (observer: IntersectionObserver | null) => void;
        getThumbnailObserver: () => IntersectionObserver;
        loadPagesInBatch: any;
        checkThumbnailVisibility: any;
    };
    getPageThumbnail(): Promise<void>;
    checkCanvasRendered(stableThreshold?: number, checkInterval?: number): Promise<number>;
    setupThumbnailContainer(totalPages: number): Promise<void>;
    setupThumbnailContainerOnDemand(totalPages: number): Promise<void>;
    setupThumbnailObserver(): Promise<void>;
    loadPagesInBatch(startPage: number, endPage: number): Promise<void>;
    loadMobileThumbnails(): Promise<void>;
    loadMobileThumbnailsExport(): Promise<void>;
    checkThumbnailVisibility(): Promise<void>;
    checkThumbnailVisibilityExport(): Promise<void>;
    focusThumbnail({ mode, currentPage, }: {
        mode: 'prev' | 'next' | 'input';
        currentPage: number;
    }): Promise<void>;
    moveToScrollTop(size: number): void;
    resetThumbnailSection(): Promise<void>;
    removeAllThumbnailHighlight(): void;
    highlightThumbnail(page: number): void;
    failLoadAsUrlPath(message: string): void;
    updateSizeInfo(_size: {
        width: number;
        height: number;
    }): void;
    updatePageInfo({ page, totalPages }: {
        page?: number;
        totalPages?: number;
    }): Promise<void>;
    updateScaleInfo(scale: number): void;
    checkScreenResize(): void;
    updateUIState({ currentPage, totalPages }: {
        currentPage: number;
        totalPages: number;
    }): void;
    handleFindTextStatus(status: number): void;
    updatePageThumbnail({ page, canvas, width, height, }: {
        page: number;
        canvas: CanvasImageSource | null;
        width: number;
        height: number;
    }): void;
}
