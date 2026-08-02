import type { ElementMap, ViewerInstance } from '../../types/viewerTypes';
type SearchContext = {
    viewer: ViewerInstance | null;
    elements: ElementMap;
    updateSearchButtonStates?: () => void;
    pageBeforeSearch?: number;
};
export declare const handleSearchNavigation: (ctx: SearchContext, direction?: number) => void;
export declare const performSearch: (ctx: SearchContext) => void;
export declare const updateSearchButtonStates: (ctx: SearchContext) => void;
type FindTextStatusContext = SearchContext & {
    container: HTMLElement;
    isMobile: boolean;
    mobileUI: {
        getRoot?: () => HTMLElement | null;
        queryRole?: (role: string, root: HTMLElement) => HTMLElement | null;
    } | null;
    lastSearchButtonClicked: string;
    setLastSearchButtonClicked?: (value: string) => void;
    removeAllThumbnailHighlight?: () => void;
    highlightThumbnail?: (page: number) => void;
    handlePageNavigation?: (page: number) => Promise<void> | void;
    checkThumbnailVisibility?: () => Promise<void> | void;
    showError: (args: {
        message: string;
    }) => void;
    searchFail: string;
    pageBeforeSearch?: number;
};
export declare const handleFindTextStatus: (ctx: FindTextStatusContext, status: number) => void;
export {};
