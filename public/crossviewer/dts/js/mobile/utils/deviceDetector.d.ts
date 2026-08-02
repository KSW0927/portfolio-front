import type { DeviceInfo, ViewportSize, CleanupFunction } from '../../../types';
import type { DeviceDetectorContext } from '../../../types/context';
export declare class DeviceDetector {
    private ctx;
    private deviceInfo;
    private screenSizeCallbacks;
    private resizeHandler;
    private isListening;
    private _viewportCleanup;
    constructor(ctx?: DeviceDetectorContext);
    isMobile(): boolean;
    isTouchDevice(): boolean;
    isIOS(): boolean;
    isAndroid(): boolean;
    getOrientation(): 'portrait' | 'landscape';
    getDeviceInfo(): DeviceInfo;
    onScreenSizeChange(callback: (info: DeviceInfo) => void): CleanupFunction;
    removeScreenSizeCallback(callback: (info: DeviceInfo) => void): void;
    stopListening(): void;
    destroy(): void;
    getViewportSize(): ViewportSize;
    getUserAgent(): string;
    hasTouch(): boolean;
    getOptimizationSettings(): {
        thumbnailSize: {
            width: number;
            height: number;
        };
        enableAnimations: boolean;
        enableGestures: boolean;
        enablePinchZoom: boolean;
    };
    getUISettings(): {
        showThumbnails: boolean;
        toolbarPosition: 'top' | 'bottom';
        menuStyle: 'overlay' | 'dropdown';
    };
    debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void;
}
