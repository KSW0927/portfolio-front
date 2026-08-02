export type SearchEventBindings = {
    findTextBtn?: HTMLElement | null;
    findText?: HTMLInputElement | null;
    searchPrev?: HTMLButtonElement | null;
    searchNext?: HTMLButtonElement | null;
};
type SearchEventHandlers = {
    onSearch: () => void;
    onBlur: () => void;
    onSearchNavigation: (direction: number) => void;
    onUpdateSearchButtons: () => void;
    getCurrentPage: () => number;
    focusThumbnail?: (payload: {
        mode: 'input';
        currentPage: number;
    }) => Promise<void> | void;
};
export declare const bindSearchEvents: (elements: SearchEventBindings, handlers: SearchEventHandlers) => void;
export {};
