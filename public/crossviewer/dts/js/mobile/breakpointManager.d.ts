import type { BreakpointManagerContext } from '../../types/context';
export declare class BreakpointManager {
    private ctx;
    private breakpoints;
    private currentBreakpoint;
    private listeners;
    private resizeHandler;
    private _viewportCleanup;
    constructor(ctx?: BreakpointManagerContext);
    private init;
    private checkBreakpoint;
    private debounce;
    on(event: string, callback: (data: unknown) => void): void;
    private emit;
    removeAllListeners(): void;
    destroy(): void;
    getCurrentBreakpoint(): 'mobile' | 'desktop';
    private getViewportWidth;
}
