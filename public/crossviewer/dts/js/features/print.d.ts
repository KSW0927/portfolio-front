import type { ElementMap, ViewerInstance } from '../../types/viewerTypes';
import type { LanguageTexts } from '../../lang/languageSettings';
type PrintDocumentContext = {
    viewer: ViewerInstance | null;
    container: HTMLElement;
    elements: ElementMap;
    setPrintState: (value: boolean) => void;
    showLoading: (value: boolean) => void;
    showError: (args: {
        message: string;
    }) => void;
    blurActiveElement: () => void;
    texts: LanguageTexts;
};
export declare const printDocument: (ctx: PrintDocumentContext) => void;
export {};
