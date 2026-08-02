import '../css/main.css';
import '../css/mobile.css';
import type { ViewerConfig } from '../types';
import type { CrossViewerPublicInstanceApi } from './publicApi';
type LibViewerConfig = Partial<ViewerConfig> & {
    instanceName?: string;
};
/**
 * 사용자에게 노출되는 안전한 API 표면.
 * 내부 메서드, config, DOM 접근을 차단한다.
 */
type CrossViewerProxy = {
    open: {
        url: (url: string) => Promise<boolean>;
        stream: (fileId: string) => Promise<boolean>;
        streamURL: (url: string) => Promise<boolean>;
    };
    /** 뷰어 이벤트를 구독한다. 반환된 함수로 구독 해제. */
    on: (event: string, callback: (...args: unknown[]) => void) => () => void;
    instanceName: string;
    containerId: string;
    destroy: () => void;
};
/**
 * 외부에 노출되는 API 객체 (window.CrossViewer).
 *
 * - CrossViewer(containerId, options): 추가 인스턴스 생성 (인쇄/다운로드 강제 비활성)
 * - CrossViewer.init(containerId, options, key): 신뢰된 래퍼 전용 인스턴스 생성 (key 검증 필요)
 * - CrossViewer.get(instanceName): 등록된 인스턴스의 open API 조회
 * - CrossViewer.instances: 전체 인스턴스 맵 (읽기 전용)
 */
declare function createInstance(containerId: string, options?: LibViewerConfig): CrossViewerProxy;
declare namespace createInstance {
    var init: (containerId: string, options?: LibViewerConfig, key?: symbol) => CrossViewerProxy;
    var get: (instanceName: string) => CrossViewerPublicInstanceApi | undefined;
}
export default createInstance;
