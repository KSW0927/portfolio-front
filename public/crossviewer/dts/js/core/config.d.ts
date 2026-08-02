import type { RuntimeOptions, ViewerConfigLike } from '../../types/viewerTypes';
type LoadInfoContext = {
    runtimeOptions?: RuntimeOptions | null;
    /** Resolves paths relative to the library bundle (for built-in defaults). */
    resolveUrl: (pathOrUrl: string) => string | null;
    /** Resolves paths relative to the host HTML page (for user-specified URLs). */
    resolvePageUrl: (pathOrUrl: string) => string | null;
    appendNoCache: (url: string) => string;
    failUrlParsing?: string;
    failLoadConfig?: string;
    showError: (args: {
        message: string;
    }) => void;
};
export declare const loadInfo: (ctx: LoadInfoContext) => Promise<unknown | null>;
type LoadConfigContext = {
    isMobile: boolean;
    runtimeOptions?: RuntimeOptions | null;
    configOptions?: ViewerConfigLike | null;
    /** Resolves paths relative to the library bundle (for built-in defaults). */
    resolveUrl: (pathOrUrl: string) => string | null;
    /** Resolves paths relative to the host HTML page (for user-specified URLs). */
    resolvePageUrl: (pathOrUrl: string) => string | null;
    appendNoCache: (url: string) => string;
    getDefaultConfig: () => ViewerConfigLike;
    getDefaultMobileConfig: () => ViewerConfigLike;
    failUrlParsing?: string;
    failLoadConfig?: string;
    showError: (args: {
        message: string;
    }) => void;
};
export declare const loadConfig: (ctx: LoadConfigContext) => Promise<ViewerConfigLike | null>;
export {};
