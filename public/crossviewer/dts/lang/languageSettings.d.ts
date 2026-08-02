/**
 * 다국어 설정 인터페이스
 */
export interface LanguageTexts {
    menuTitle: string;
    zoomOutTitle: string;
    zoomInTitle: string;
    printTitle: string;
    download: string;
    nextPageTitle: string;
    prevPageTitle: string;
    findTextTitle: string;
    findTextPlaceholder: string;
    searchFail: string;
    searchSuccess: string;
    mobileSearchSuccess?: string;
    noPrintPage: string;
    failLoadImage: string;
    failUrlParsing: string;
    loadPrintText: string;
    loadProcessText: string;
    defaultLoadText: string;
    findTextBtnTitle: string;
    findTextBtnValue: string;
    initViewerFail: string;
    failLoadConfig: string;
    failLoadFilePath: string;
    openDocumentFail: string;
    noCanvasProvided: string;
    noDownloadPage: string;
    invalidFileTpye: string;
    loadFileFail: string;
    viewerDependencyCheckFail?: string;
    prevTextTitle: string;
    nextTextTitle: string;
    infoIconTitle: string;
    closeDocumentIconTitle: string;
    fitWidthIconTitle: string;
    fitHeightIconTitle: string;
    dropZoneText: string;
    dropZoneSubText: string;
    dropZoneOverlayText: string;
    versionInfo: string;
    infoTitle: string;
    confirmButton: string;
    downloadTitle?: string;
    fileUrlOpenNotAllowed: string;
    mobileDefaultIntroduceText: string;
    excelBottomSheetTitle: string;
    searchInputPlaceholder: string;
    closeButton: string;
}
/**
 * 다국어 설정 맵
 */
export type LanguageSettings = Record<string, LanguageTexts>;
export declare const languageSettings: LanguageSettings;
