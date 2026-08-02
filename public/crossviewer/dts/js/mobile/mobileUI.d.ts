import { OrientationHandler } from './orientationHandler';
import { TouchHandler } from './touchHandler';
import type { MobileContext } from '../../types/context';
import type { ViewerConfigLike, ViewerInstance } from '../../types/viewerTypes';
declare global {
    const Module: {
        _getMinZoomLevel?: () => number;
        _getMaxZoomLevel?: () => number;
        _setZoom?: (value: number) => void;
    } | undefined;
}
interface MobileUIElements {
    header: HTMLElement | null;
    container: HTMLElement | null;
    thumbnailsSection: HTMLElement | null;
    viewerContainer: HTMLElement | null;
    loadPage: HTMLElement | null;
    viewer: HTMLElement | null;
    title: HTMLElement | null;
    pageInput: HTMLElement | null;
    pageLength: HTMLElement | null;
    prevPage: HTMLElement | null;
    nextPage: HTMLElement | null;
    zoomIn: HTMLElement | null;
    zoomOut: HTMLElement | null;
    findText: HTMLElement | null;
    download: HTMLElement | null;
    print: HTMLElement | null;
    thumbnailMenu: HTMLElement | null;
    search: HTMLElement | null;
    infoMenu: HTMLElement | null;
    closeDocument: HTMLElement | null;
    fitToggle: HTMLElement | null;
    scale: HTMLElement | null;
    sectionDivider: NodeListOf<HTMLElement> | HTMLElement[];
    pagination: HTMLElement | null;
    start: HTMLElement | null;
    end: HTMLElement | null;
    center?: HTMLElement | null;
    dropZone: HTMLElement | null;
    dropZoneText: HTMLElement | null;
    dropZoneSubText?: HTMLElement | null;
    thumbnails: HTMLElement | null;
    toolbar?: HTMLElement | null;
    mobileIcons: {
        header: {
            backIcon: string;
            titleTooltipIcon: string;
            searchIcon: string;
            downloadIcon: string;
        };
        search: {
            searchIcon: string;
            prevIcon: string;
            nextIcon: string;
        };
        footer: {
            thumbnailsIcon: string;
            closeThumbnailsIcon: string;
            fitContentIcon: string;
            excelThumbnailsIcon: string;
        };
        content: {
            thumbnailsIcon: string;
            closeThumbnailsIcon: string;
        };
        excelBottomSheet: {
            closeIcon: string;
        };
    };
}
export declare class MobileUI {
    private static _instanceCounter;
    private viewer;
    config: ViewerConfigLike;
    ctx: MobileContext;
    instanceId: string;
    private lang;
    elements: MobileUIElements;
    private eventHandlers;
    private _viewportCleanup;
    private _keyboardDismissCleanup;
    private _isDestroyed;
    private _activeTimers;
    orientationHandler: OrientationHandler;
    touchHandler: TouchHandler;
    private currentActiveSheetIndex;
    private thumbnailsLoaded;
    private lastNavDirection;
    private _navDirectionTimer;
    private originalMinZoomLevel;
    constructor(viewer: ViewerInstance, config: ViewerConfigLike, ctx?: MobileContext);
    getRoot(): HTMLElement | null;
    /** 문서 열기 후 실제 뷰어(CrepasViewer) 참조로 교체할 때 호출 */
    setViewer(viewer: ViewerInstance): void;
    /** TouchHandler 등에서 현재 뷰어 참조를 가져올 때 사용 (문서 열림 후 CrepasViewer 반환) */
    getViewer(): ViewerInstance | undefined;
    /**
     * 문서 미오픈 시 본문 탭으로 파일 선택 창을 열 때 호출 (handleViewerClick → insertFile.click).
     * 원본 이벤트를 전달하여 iOS Safari의 user activation 체인을 유지합니다.
     * 합성 MouseEvent를 사용하면 iOS에서 user gesture 컨텍스트가 끊어져 파일 다이얼로그가 열리지 않습니다.
     * @param originalEvent 사용자 제스처의 원본 이벤트 (touchend / click 등)
     */
    triggerFilePicker(originalEvent?: Event): void;
    getGlobalRoot(): HTMLElement | null;
    getView(): Window | null;
    getDocument(): Document | null;
    createElement(tagName: string): HTMLElement | null;
    getRoleSelector(role: string): string;
    /**
     * 인스턴스 루트 스코프에서 role 기반 요소 조회
     */
    queryRole(role: string, root?: HTMLElement | null): HTMLElement | null;
    /**
     * 인스턴스 루트 스코프에서 role 기반 요소들 조회
     */
    queryRoleAll(role: string, root?: HTMLElement | null): NodeListOf<Element> | Element[];
    setRole(element: HTMLElement | null, role: string): void;
    closestRole(target: HTMLElement | null, role: string): Element | null;
    private mergeConfigWithUrlParams;
    private getUserLang;
    private getFilePathFlag;
    private controlIcons;
    private getElements;
    private applyBaseRoles;
    updateLayout(breakpoint: 'mobile' | 'desktop'): void;
    private applyMobileLayout;
    setMobileExcelMinZoom(): void;
    restoreOriginalMinZoom(): void;
    disableDownloadIcon(filePathFlag?: boolean): void;
    private applyInitialText;
    createMobileFooter(): void;
    private addFooterTouchEventHandlers;
    private adjustContainerHeight;
    adjustContentHeight(_uiState?: 'default' | 'visible' | 'hidden' | 'search'): void;
    private adjustContentThumbnailIconPosition;
    manageExcelClass(): void;
    private _getCurrentUIState;
    private showMobileElements;
    showTitleAfterMobileUIReady(): void;
    private hideDesktopElements;
    private applyHeaderMobileIcons;
    private applyHeaderIconClasses;
    private _applyContentThumbnailsIcon;
    private applyFooterMobileIcons;
    private ensureContentThumbnailsIcon;
    private ensureFooterThumbnailsIcon;
    private ensureFooterCloseThumbnailsIcon;
    private resetThumbnailToggleState;
    applyExcelFooterMobileIcons(): void;
    excelHandleThumbnailsButton(): Promise<void>;
    private closeBottomSheet;
    private createThumbnailBottomSheet;
    private handleSheetItemClick;
    applyPageCount(page: number, totalPages: number): void;
    applySheetInfo(sheetIndex: number, totalSheets: number): void;
    resetPageCount(): void;
    createMobileIcon(container: HTMLElement | null, id: string, className: string | null, iconSvg: string, title: string, clickHandler: (e: Event) => void, appendPos?: 'start' | 'after' | 'end'): void;
    private toggleIconActive;
    private removeAllIconActive;
    private toggleSearchIconActive;
    private removeAllSearchIconActive;
    createTitleTooltipIfNeeded(titleElement: HTMLElement | null, iconSvg: string): void;
    private isTextTruncated;
    private calculateAvailableTitleWidth;
    private setTitleMaxWidth;
    handleOrientationTitleUpdate(): void;
    private applyTitleTruncationState;
    private removeTitleTooltipSmoothly;
    private adjustTitleWidth;
    private setupMobileEventHandlers;
    private setupBackgroundTouchHandler;
    private setupHeaderTouchHandler;
    /**
     * Android 키보드 dismiss 감지 글로벌 핸들러
     * Android에서 네비게이션 바로 키보드를 내리면 blur 이벤트가 발생하지 않아
     * document.activeElement에 포커스가 남아있고, 이후 DOM 조작 시 키보드가 재등장한다.
     * visualViewport의 높이 증가를 감지하여 키보드가 내려간 시점에 즉시 blur 처리한다.
     */
    private setupKeyboardDismissDetector;
    /**
     * 검색 입력창 포커스 해제 (Android 키보드 재표시 방지)
     * DOM 조작으로 인한 layout reflow 시 Android가 activeElement로 포커스를
     * 복원하는 현상을 방지합니다. 여러 시점에 blur를 호출하여 비동기 DOM 조작
     * 이후에도 포커스가 유지되지 않도록 합니다.
     */
    blurSearchInput(): void;
    closeTitleTooltip(): void;
    reevaluateTitleTooltip(): void;
    private removeTitleTooltip;
    handleBackgroundClick(e: Event): void;
    private handleHeaderClick;
    private toggleThumbnailMenu;
    private handleBackButton;
    private handleSearchButton;
    private createSearchComponent;
    private closeSearchComponent;
    private handleSearchInput;
    private performSearch;
    private navigateSearchResult;
    private toggleSearchClearButton;
    private clearSearchInput;
    private handleTitleTooltip;
    private handleDownloadButton;
    handleThumbnailsButton(_e: Event): Promise<void>;
    private handleFitContentButton;
    showUIAfterThumbnailSelection(): void;
    handleDirectAccess(): void;
    private showTitleTooltip;
    updateNavDirection(dir: 'prev' | 'next' | 'jump'): void;
    scrollToCurrentThumbnail(direction?: 'prev' | 'next' | 'jump'): void;
    private scrollToCurrentExcelSheet;
    private highlightCurrentThumbnail;
    setupResizeHandler(): void;
    destroy(): void;
    removeMobileElements(): void;
}
export {};
