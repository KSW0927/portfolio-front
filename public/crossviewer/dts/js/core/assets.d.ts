/**
 * Resolves a bundled asset path (e.g. "images/ce-loading.gif") against the
 * library bundle's directory, so the asset loads correctly regardless of
 * where the host HTML page is located.
 */
export declare const assetUrl: (relativePath: string) => string;
