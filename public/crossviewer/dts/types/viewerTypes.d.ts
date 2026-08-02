import type { PageTransitionOptions, ViewerConfig } from './index';
export type ViewerConfigLike = Partial<ViewerConfig> & Record<string, unknown>;
export type RuntimeOptions = {
    url?: string;
    urlHref?: string;
    urlSearch?: string;
    urlParams?: string | URLSearchParams | Record<string, string>;
    baseUrl?: string;
    configBaseUrl?: string;
    configUrl?: string;
    instanceConfigUrl?: string;
    mobileConfigUrl?: string;
    mobileInstanceConfigUrl?: string;
    viewerInfoUrl?: string;
    isMobileDevice?: boolean;
} & Record<string, unknown>;
export type UrlOpenScope = {
    token: symbol;
    active: boolean;
    handled: boolean;
    reject?: (value?: unknown) => void;
    failMessage?: string;
};
export type OpenApi = {
    url: (url: string) => Promise<boolean>;
    stream: (fileId: string) => Promise<boolean>;
    streamURL: (url: string) => Promise<boolean>;
};
export type DomElement = HTMLElement & {
    [key: string]: any;
};
export type ElementMap = Record<string, any> & {
    sectionDivider?: NodeListOf<HTMLElement> | HTMLElement[];
};
export interface ViewerInstance {
    init: () => Promise<boolean>;
    on: (event: string, handler: (...args: unknown[]) => void) => void;
    off?: (event: string, handler: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
    removeEventListener?: (event: string, handler: (...args: unknown[]) => void) => void;
    openDocumentFromUrl: (url: string) => Promise<void>;
    closeDocument: () => void;
    getCurrentPage: () => number;
    getTotalPages: () => number;
    getDocumentType: () => string;
    getFitMode: () => string;
    setZoom?: (level: number) => void;
    getState: () => {
        zoom: number;
        isProcessing?: boolean;
        currentPage?: number;
        totalPages?: number;
        page?: number;
    };
    prevPage: () => void;
    nextPage: () => void;
    goToPage: (page: number) => void;
    resize?: () => void;
    changeScreenSize?: (width: number, height: number) => void;
    updatePageTransitionOptions?: (options: PageTransitionOptions) => void;
    updateState?: (state: unknown) => void;
    isMaxScale: () => boolean;
    isMinScale: () => boolean;
    stopFindText: () => void;
    findText: (keyword: string, options?: {
        matchCase?: boolean;
        wholeWord?: boolean;
    } | number) => void;
    isSearching?: () => boolean;
    fitContent: () => void;
    fitWidth: () => void;
    fitHeight: () => void;
    getSheetNames: () => string[];
    isOpened?: () => boolean;
    getModule?: () => {
        _getMinZoomLevel?: () => number;
        _getMaxZoomLevel?: () => number;
        setZoom?: (level: number) => void;
    } | null;
    engine?: {
        getZoomLevels?: () => {
            current: number;
            min?: number;
            max?: number;
        };
        module?: {
            _getMinZoomLevel?: () => number;
            _getMaxZoomLevel?: () => number;
            setZoom?: (level: number) => void;
        };
    };
    container?: HTMLElement;
    _isOpened?: boolean;
    instanceId?: string;
    getMobileContext?: (viewer: ViewerInstance, config: ViewerConfigLike) => unknown;
    openDocumentFromFile: (file: File) => Promise<void>;
    openDocument: (pathOrUrl: string | ArrayBuffer, fileId?: string) => Promise<void> | void;
    getPageThumbnail: (pageIndex: number, width?: number, height?: number) => Promise<void> | void;
    zoomIn: () => void;
    zoomOut: () => void;
    options?: Record<string, unknown>;
}
export type CrossViewerLike = ViewerInstance & {
    showError?: (payload: {
        message: string;
    }) => void;
    showLoading?: (show: boolean) => void;
    getUrlHref?: () => string;
    getUrlSearchParams?: () => URLSearchParams;
};
