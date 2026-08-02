/**
 * 전역 뷰포트 이벤트 매니저
 * - resize/orientationchange 리스너를 단일화
 * - 인스턴스별로 이벤트 라우팅
 */
interface ViewportEventOptions {
    scopeRoot?: HTMLElement | null;
    filter?: ((event: Event) => boolean) | null;
    priority?: number;
    label?: string;
}
declare function enable(): void;
declare function disable(): void;
export declare function subscribe(instanceId: string, handler: (event: Event) => void, options?: ViewportEventOptions): () => void;
export declare function unsubscribe(instanceId: string, handler?: (event: Event) => void): void;
export declare function getSubscribers(): Array<{
    instanceId: string;
    count: number;
}>;
export declare const viewportEventManager: {
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    enable: typeof enable;
    disable: typeof disable;
    getSubscribers: typeof getSubscribers;
};
export {};
