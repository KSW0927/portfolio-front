import { apiClient, isSuccess } from './client';
import type { BaseApiResponse, NoteItem, NotificationItem } from '@/types/types';

export interface ResultList<T> {
    list: T[];
}

export interface ResultData<T> {
    data: T;
}

/**
 * 포털 쪽지 API
 */
export interface ResultNoteCount {
    count: number;
}
export interface ResultNoteList {
    list: NoteItem[];
}
export const PtlNoteApi = {
    /**
     * (GET) 새로 수신된 쪽지 목록 조회
     * @param params ( noteRcvrId )
     */
    getNewNoteList: async (params: Record<string, unknown>): Promise<NoteItem[]> => {
        const { data } = await apiClient.get<BaseApiResponse<ResultList<NoteItem>>>(
            `/ptl/note/rcptn/list/newnote`,
            { params },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '새로운 쪽지 수 목록 실패');
        return data.result?.list ?? [];
    },


}

/**
 * 포털 알림 API
 */
export const PtlNotiApi = {
    /**
     * (GET) 새로 수신된 알림 목록 조회
     * @param params ( ntcnRcvrId )
     */
    getNewNotiList: async (params: Record<string, unknown>): Promise<NotificationItem[]> => {
        const { data } = await apiClient.get<BaseApiResponse<ResultList<NotificationItem>>>(
            `/ptl/ntcn/list/newnoti`,
            { params },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '새로운 알림 목록 실패');
        return data.result?.list ?? [];
    },


}



