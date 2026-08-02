import { DocumentType } from './enums';
import { BreakpointType } from './index';
/**
 * 뷰어 이벤트 맵
 */
export interface ViewerEvents {
    pageChange: {
        current: number;
        total: number;
    };
    documentOpen: {
        type: DocumentType;
        url: string;
    };
    documentClose: void;
    error: {
        message: string;
        code?: number;
    };
    zoomChange: {
        level: number;
    };
    breakpointChange: {
        breakpoint: BreakpointType;
        previousBreakpoint: BreakpointType;
    };
    orientationChange: 'portrait' | 'landscape';
    screenSizeChange: {
        width: number;
        height: number;
    };
}
/**
 * 제스처 타입
 */
export type GestureType = 'swipeLeft' | 'swipeRight' | 'swipeUp' | 'swipeDown' | 'pinchIn' | 'pinchOut' | 'doubleTap';
/**
 * 제스처 콜백 맵
 */
export interface GestureCallbacks {
    swipeLeft: Array<() => void>;
    swipeRight: Array<() => void>;
    swipeUp: Array<() => void>;
    swipeDown: Array<() => void>;
    pinchIn: Array<() => void>;
    pinchOut: Array<() => void>;
    doubleTap: Array<() => void>;
}
