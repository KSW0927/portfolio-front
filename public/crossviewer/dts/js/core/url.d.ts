export declare const resolveUrl: (pathOrUrl: string, baseUrl: string) => string | null;
export declare const appendNoCache: (url: string, baseUrl: string) => string;
export declare const isAlreadyEncoded: (str: string) => boolean;
export declare const safeEncodeFileName: (fileName: string) => string;
export declare const joinUrlPath: (base: string, path: string) => string;
export declare const decodeUrlFileName: (filePath: string) => string;
