import type CrossViewer from './main';
export type CrossViewerPublicInstanceApi = {
    open: {
        url: (url: string) => Promise<boolean>;
        stream: (fileId: string) => Promise<boolean>;
        streamURL: (url: string) => Promise<boolean>;
    };
};
type CrossViewerPublicApi = {
    instances: Record<string, CrossViewerPublicInstanceApi>;
    get: (instanceName: string) => CrossViewerPublicInstanceApi | undefined;
    register: (instanceName: string, viewer: CrossViewer) => CrossViewerPublicInstanceApi;
    unregister: (instanceName: string) => void;
};
export declare function getCrossViewerPublicApi(): CrossViewerPublicApi;
export declare function registerCrossViewerInstance(instanceName: string, viewer: CrossViewer): CrossViewerPublicInstanceApi;
export declare function unregisterCrossViewerInstance(instanceName: string): void;
export {};
