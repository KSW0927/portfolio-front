import { apiClient, isSuccess } from '@/api/client';
import type { BaseApiResponse } from '@/types/types';
import { DEFAULT_PAGING } from '@/constants/paging';

import type { BscsVslItem, BgtVslItem, ShipItem } from '@/pages/bizBgt/dataUtlz/DataUtlzType';

const baseURL = import.meta.env.VITE_API_PREFIX || '';

type ApiEnvelope<T> = {
    resultCode?: string | number;
    resultMessage?: string;
    result?: T;
};

// ---------------------------------------------------------------------------
// 사업예산 일정관리 (BgtFndgSchdl) API
// ---------------------------------------------------------------------------
import type {
    BgtFndgSchdlItem,
    BgtFndgSchdlSubItem,
    BgtFndgSchdlUpsertRequest,
    BgtFndgSchdlConfirmRequest,
    BgtFndgBizPlanSearchParam,
    BgtFndgPrstOpnnSaveRequest,
    BgtFndgPrstPlanSaveRequest,
} from '@/pages/bizBgt/bgtFndg/types';

// 백엔드 응답 본문
type BgtFndgSchdlListApiResult = {
    list?: BgtFndgSchdlItem[];
    listCnt?: number;
};

type BgtFndgSchdlDetailApiResult = {
    detail?: BgtFndgSchdlItem;
};

type BgtFndgSchdlSubListApiResult = {
    list?: BgtFndgSchdlSubItem[];
    listCnt?: number;
};

type BgtFndgSchdlMutateApiResult = {
    data?: BgtFndgSchdlItem;
    message?: string;
};

// 클라이언트 사용
export interface BgtFndgSchdlListResult {
    items: BgtFndgSchdlItem[];
    totalCount: number;
}

export interface BgtFndgSchdlDetailResult {
    item: BgtFndgSchdlItem;
}

export interface BgtFndgSchdlSubListResult {
    items: BgtFndgSchdlSubItem[];
    totalCount: number;
}

export interface BgtFndgSchdlMutateResult {
    data?: BgtFndgSchdlItem;
    message?: string;
}

export const bgtFndgSchdlApi = {
    /** 사업예산 일정 목록 조회 */
    getList: async (params: object): Promise<BgtFndgSchdlListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<BgtFndgSchdlListApiResult>>(
            `/api/bgt/bizschdl/list`,
            {
                params: {
                    ...DEFAULT_PAGING,
                    ...params,
                },
            },
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정 목록 조회 실패');
        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /** 사업예산 일정 상세 조회 */
    getDetail: async (bizSchdlNo: string): Promise<BgtFndgSchdlDetailResult> => {
        const { data } = await apiClient.get<ApiEnvelope<BgtFndgSchdlDetailApiResult>>(
            `/api/bgt/bizschdl/detail`, { params: { bizSchdlNo } },
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정 상세 조회 실패');
        const detail = data.result?.detail;
        if (!detail) throw new Error('예산일정 상세 데이터가 비어 있습니다.');
        return { item: detail };
    },

    /** 사업예산 일정 수정 (확정/삭제 부분 업데이트 포함) */
    update: async (
        params: BgtFndgSchdlUpsertRequest | BgtFndgSchdlConfirmRequest | Partial<BgtFndgSchdlItem>,
    ): Promise<BgtFndgSchdlMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<BgtFndgSchdlMutateApiResult>>(
            `/api/bgt/bizschdl/update`, params,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정 수정 실패');
        return data.result ?? {};
    },

    /** 사업예산 일정 등록 */
    insert: async (params: BgtFndgSchdlUpsertRequest): Promise<BgtFndgSchdlMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<BgtFndgSchdlMutateApiResult>>(
            `/api/bgt/bizschdl/insert`, params,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정 등록 실패');
        return data.result ?? {};
    },

    /** 사업예산 일정 삭제 */
    delete: async (bizSchdlNo: string): Promise<BgtFndgSchdlMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<BgtFndgSchdlMutateApiResult>>(
            `/api/bgt/bizschdl/delete`, { bizSchdlNo },
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정 삭제 실패');
        return data.result ?? {};
    },

    /** 예산일정별 월별 금액 조회 */
    getMonthlyBgt: async (params: object): Promise<BgtFndgSchdlSubListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<BgtFndgSchdlSubListApiResult>>(
            `/api/bgt/bizschdl/monthlyBgt`, { params, showLoading: false },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정별 월별 금액 조회 실패');
        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /** 검토의견 저장 */
    saveOpnn: async (params: BgtFndgPrstOpnnSaveRequest): Promise<BgtFndgSchdlMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<BgtFndgSchdlMutateApiResult>>(
            `/api/bgt/bizschdl/dept/saveOppn`, params,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산편성 검토의견 등록 실패');
        return data.result ?? {};
    },

    /** 계획 입력 완료일 저장 */
    savePlan: async (params: BgtFndgPrstPlanSaveRequest): Promise<BgtFndgSchdlMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<BgtFndgSchdlMutateApiResult>>(
            `/api/bgt/bizschdl/dept/savePlan`, params,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산편성 계획 입력 완료일 등록 실패');
        return data.result ?? {};
    },

    /** 영업계획 비교 목록 조회 */
    getBgtBizPlnList: async (params: Partial<BgtFndgBizPlanSearchParam>): Promise<BgtFndgSchdlSubListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<BgtFndgSchdlSubListApiResult>>(
            `/api/bgt/bizschdl/bgtBizPlnList`, { params },
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '영업계획 비교 목록 조회 실패');
        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /** 영업계획 비교 월별 금액 조회 */
    getCmprList: async (params: object): Promise<BgtFndgSchdlSubListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<BgtFndgSchdlSubListApiResult>>(
            `/api/bgt/bizschdl/cmprList`, { params, showLoading: false },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정별 월별 금액 조회 실패');
        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },
}

// ---------------------------------------------------------------------------
// 예산기준 정보 (CrtrInfo / BgtArtcl) API
// ---------------------------------------------------------------------------
import type {
    CrtrInfoItem,
    CrtrInfoTeamItem,
    CrtrInfoUpsertRequest,
    CrtrInfoTeamUpsertRequest,
} from '@/pages/bizBgt/crtrInfo/types';

/** 백엔드 `/api/bgtArtcl/list` 응답 본문 */
type CrtrInfoListApiResult = {
    list?: CrtrInfoItem[];
    listCnt?: number;
};

/** 백엔드 `/api/bgtArtcl/detail` 응답 본문 (detail 안에 teamList 포함) */
type CrtrInfoDetailApiResult = {
    detail?: CrtrInfoItem;
};

/** 백엔드 `/api/bgtArtcl/teamList` 응답 본문 */
type CrtrInfoTeamListApiResult = {
    list?: CrtrInfoTeamItem[];
    listCnt?: number;
};

/** 등록/수정 응답 본문 */
type CrtrInfoMutateApiResult = {
    data?: CrtrInfoItem;
    /** 백엔드 메시지 (선택) */
    message?: string;
    /** insert 시 생성된 PK가 별도로 내려오는 경우 */
    id?: string;
    bgtArtclNo?: string;
};

/** 클라이언트 사용 - 목록 결과 */
export interface CrtrInfoListResult {
    items: CrtrInfoItem[];
    totalCount: number;
}

/** 클라이언트 사용 - 상세 결과 (detail + 내부 teamList 분리 노출) */
export interface CrtrInfoDetailResult {
    item: CrtrInfoItem;
    items: CrtrInfoTeamItem[];
}

/** 클라이언트 사용 - 담당팀 목록 결과 */
export interface CrtrInfoTeamListResult {
    items: CrtrInfoTeamItem[];
    totalCount: number;
}

/** 클라이언트 사용 - 등록/수정 결과 */
export interface CrtrInfoMutateResult {
    /** 응답 본문 data (있을 경우) */
    data?: CrtrInfoItem;
    message?: string;
    id?: string;
    bgtArtclNo?: string;
}

/** 선박별 항차정보 interface start **/
import type { SearchParam, VslVygItem, VslVygFormParam } from '@/pages/bizBgt/crtrInfo/types/CrtrInfoVslType.ts';
/** 선박별 항차정보 목록 결과 */
export interface CrtrInfoVslListResult {
    items: VslVygItem[];
    totalCount: number;
}

type CrtrInfoVslListApiResult = {
    list?: VslVygItem[];
    listCnt?: number;
};

/** 선박별 항차정보 등록 결과 */
export interface CrtrInfoVslSaveResult {
    data?: VslVygItem;
    message?: string;
}

type CrtrInfoVslSaveApiResult = {
    data?: VslVygItem;
    message?: string;
};

/**
 * 예산기준 정보 API
 */
export const crtrInfoApi = {
    /**
     * 예산기준 정보 트리 조회(GET)
     * @param params   검색 조건 등
     */
    getTree: async (params: object): Promise<CrtrInfoListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoListApiResult>>(
            `/api/bgt/artcl/tree`,
            {
                params: {
                    ...DEFAULT_PAGING,
                    ...params,
                },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산기준 정보 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /**
     * 예산기준 정보 체크리스트 조회(GET)
     * @param params   검색 조건 등
     */
    getList: async (params: object): Promise<CrtrInfoListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoListApiResult>>(
            `/api/bgt/artcl/list`,
            {
                params: {
                    ...DEFAULT_PAGING,
                    ...params,
                },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산기준 정보 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /**
     * 예산편성 관리 모니터링 목록 조회(GET)
     * @param params   검색 조건 등
     */
    getMonitoring: async (params: object): Promise<CrtrInfoListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoListApiResult>>(
            `/api/bgt/artcl/monitoring`, {params}
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산기준 정보 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /**
     * 예산기준 정보 상세 조회(GET)
     * 백엔드는 `{ detail: BgtArtclDTO }` 로 응답하며, DTO 안에 `teamList`가 포함된다.
     * 클라이언트 편의를 위해 detail 본체(`item`)와 teamList(`items`)를 분리해 반환한다.
     */
    getDetail: async (bgtArtclNo: string): Promise<CrtrInfoDetailResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoDetailApiResult>>(
            `/api/bgt/artcl/detail`,
            {
                params: { bgtArtclNo },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산기준 정보 상세 조회 실패');

        const detail = data.result?.detail;
        if (!detail) throw new Error('예산기준 정보 상세 데이터가 비어 있습니다.');

        return {
            item: detail,
            items: detail.teamList ?? [],
        };
    },

    /**
     * 예산기준 정보 등록(POST)
     */
    insert: async (params: CrtrInfoUpsertRequest): Promise<CrtrInfoMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<CrtrInfoMutateApiResult>>(
            `/api/bgt/artcl/insert`,
            params,
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산기준 정보 등록 실패');

        return data.result ?? {};
    },

    /**
     * 예산기준 정보 수정(POST)
     */
    update: async (params: CrtrInfoUpsertRequest): Promise<CrtrInfoMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<CrtrInfoMutateApiResult>>(
            `/api/bgt/artcl/update`,
            params,
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산기준 정보 수정 실패');

        return data.result ?? {};
    },

    /**
     * 예산기준 정보 코드 중복확인(GET)
     */
    exists: async (bgtCd: string): Promise<{ isExists: boolean }> => {
        const { data } = await apiClient.get<ApiEnvelope<{ isExists: boolean }>>(
            `/api/bgt/artcl/exists`,
            {
                params: { bgtCd },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '중복 확인 실패');

        return data.result ?? { isExists: false };
    },

    /**
     * 예산 항목별 담당팀 목록 조회(GET)
     * @param id     부모 예산항목번호
     * @param params 부서 검색 파라미터
     */
    getTeamList: async (
        id: string,
        params: Record<string, unknown>,
    ): Promise<CrtrInfoTeamListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoTeamListApiResult>>(
            `/api/bgt/artcl/dept/list`,
            {
                params: { ...params, bgtArtclNo: id },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산 항목별 담당팀 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /**
     * 예산 항목별 담당팀 등록(POST)
     */
    insertTeam: async (id: string, params: CrtrInfoTeamUpsertRequest): Promise<CrtrInfoMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<CrtrInfoMutateApiResult>>(
            `/api/bgt/artcl/dept/insert`,
            { ...params, bgtArtclNo: id },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산 항목별 담당팀 등록 실패');

        return data.result ?? {};
    },

    /**
     * 예산 항목별 담당팀 수정(POST)
     */
    updateTeam: async (id: string, params: CrtrInfoTeamUpsertRequest, ): Promise<CrtrInfoMutateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<CrtrInfoMutateApiResult>>(
            `/api/bgt/artcl/dept/update`,
            { ...params, bgtArtclNo: id },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산 항목별 담당팀 수정 실패');

        return data.result ?? {};
    },

    /**
     * 예산 항목별 담당팀 삭제(DELETE)
     * @param id      부모 예산항목번호
     * @param deptCds 삭제할 부서코드 배열
     */
    deleteTeam: async (id: string, deptCds: string[]): Promise<CrtrInfoMutateResult> => {
        const { data } = await apiClient.delete<ApiEnvelope<CrtrInfoMutateApiResult>>(
            `/api/bgt/artcl/dept/delete`,
            {
                data: {
                    bgtArtclNo: id,
                    deptCds,
                },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산 항목별 담당팀 삭제 실패');

        return data.result ?? {};
    },

    /**
     * 예산편성 관리 > 팀별 제출 관리 목록 조회(GET)
     * @param params   검색 조건 등
     */
    getBgtSbmtDeptList: async (params: object): Promise<CrtrInfoListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoListApiResult>>(
            `/api/bgt/bizschdl/dept/bgtSbmtDeptList`, {params}
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '팀별 제출 관리 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /**
     * 예산편성 관리 > 예산 특이사항 조회 목록 (예산항목 × 팀 단위)
     * @param params 검색 조건 (bizSchdlNo, upDeptNo, deptNo)
     */
    getBgtRmrkList: async (params: object): Promise<CrtrInfoListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoListApiResult>>(
            `/api/bgt/bizschdl/dept/bgtRmrkList`, { params },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산 특이사항 조회 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },



    /**
     * ----------------------
     * 선박별 항차정보 Api start
     * ----------------------
    **/

    /**
     * 선박별 항차정보 목록 조회(GET)
     * @param params 검색 조건 등
     */
    getVslVygList: async (params: SearchParam): Promise<CrtrInfoVslListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<CrtrInfoVslListApiResult>>(
            `/api/bgt/vslvyg/list`, {params}
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박별 항차정보 목록 조회 실패');

        return {
            items: data.result?.list ?? [],
            totalCount: data.result?.listCnt ?? 0,
        };
    },

    /**
     * 선박별 항차정보 등록 (POST)
     * @param params VslVygFormParam
     */
    insertVslVyg: async (params: VslVygFormParam): Promise<CrtrInfoVslSaveResult> => {
        const { data } = await apiClient.post<ApiEnvelope<CrtrInfoVslSaveApiResult>>(
            `/api/bgt/vslvyg/insert`, params,
        );
        if (!isSuccess(data.resultCode)) {
            throw new Error(data.resultMessage || '선박별 항차정보 등록 실패');
        }
        return data.result ?? {};
    },

    /**
     * 선박별 항차정보 수정 (POST)
     * @param params VslVygFormParam
     */
    updateVslVyg: async (params: VslVygFormParam): Promise<CrtrInfoVslSaveResult> => {
        const { data } = await apiClient.post<ApiEnvelope<CrtrInfoVslSaveApiResult>>(
            `/api/bgt/vslvyg/update`, params,
        );

        if (!isSuccess(data.resultCode)) {
            throw new Error(data.resultMessage || '선박별 항차정보 수정 실패');
        }
        return data.result ?? {};
    },

    /**
     * 선박별 항차정보 삭제 (DELETE)
     * @param params vygNo
     */
    deleteVslVyg: async (params: VslVygFormParam): Promise<CrtrInfoVslSaveResult> => {
        const { data } = await apiClient.delete<ApiEnvelope<CrtrInfoVslSaveApiResult>>(
            `/api/bgt/vslvyg/delete`,
            { params: { vygNo: params.vygNo } },
        );
        if (!isSuccess(data.resultCode)) {
            throw new Error(data.resultMessage || '선박별 항차정보 삭제 실패');
        }
        return data.result ?? {};
    },

};

// ---------------------------------------------------------------------------
// 자료등록 (DataReg / VslArtcl) API
// ---------------------------------------------------------------------------
import type {
    CopyParam,
    VslArtclItem,
    VslArtclYearItem,
    VslArtclBgtItem,
    VslArtclSaveRequest,
} from '@/pages/bizBgt/dataReg/types/DataRegBgtMngType';

type VslArtclListApiResult = { list?: VslArtclItem[] };
type VslArtclCountApiResult = { listCnt?: number };
type VslArtclYearListApiResult = { list?: VslArtclYearItem[] };
type VslArtclBgtListApiResult = {
    list?: VslArtclBgtItem[];
    /** 로그인 사용자의 팀 코드 (필터 기본값) */
    loginTeamCd?: string;
};
type VslArtclSaveApiResult = { data?: VslArtclSaveRequest };
type VslValidateApiResult = { list?: string[] };

type VslArtclCopyApiResult = {
    result?: Record<string, unknown>;
    resultCode?: string;
    resultMessage?: string;
};

/** 클라이언트 사용 */
export interface VslArtclListResult {
    items: VslArtclItem[];
}
export interface VslArtclCountResult {
    totalCount: number;
}
export interface VslArtclYearListResult {
    items: VslArtclYearItem[];
}
export interface VslArtclBgtListResult {
    items: VslArtclBgtItem[];
    loginTeamCd?: string;
}
export interface VslArtclSaveResult {
    data?: VslArtclSaveRequest;
    message?: string;
}

export interface VslArtclCopyResult {
    message?: string;
}

export interface VslValidateResult {
    /** DB 에 존재하는 vslCd 목록 */
    items: string[];
}

export const dataRegApi = {
    /** 예산일정 연도 목록 조회 */
    getYearList: async (): Promise<VslArtclYearListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslArtclYearListApiResult>>(
            `/api/vslArtcl/yearList`,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산일정 연도 목록 조회 실패');
        return { items: data.result?.list ?? [] };
    },

    /** 예산항목 목록 조회 (+ 로그인 팀 코드) */
    getBgtList: async (): Promise<VslArtclBgtListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslArtclBgtListApiResult>>(
            `/api/vslArtcl/bgtList`,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '예산항목 목록 조회 실패');
        return {
            items: data.result?.list ?? [],
            loginTeamCd: data.result?.loginTeamCd,
        };
    },

    /** 선박별 데이터 목록 조회 */
    getList: async (params: object): Promise<VslArtclListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslArtclListApiResult>>(
            `/api/vslArtcl/list`, { params }
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박별 예산/계획/실적 목록 조회 실패');
        return { items: data.result?.list ?? [] };
    },

    /** 선박별 데이터 목록 개수 조회 */
    getCount: async (params: object): Promise<VslArtclCountResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslArtclCountApiResult>>(
            `/api/vslArtcl/count`, { params }
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박별 예산/계획/실적 개수 조회 실패');
        return { totalCount: data.result?.listCnt ?? 0 };
    },

    /** 선박별 데이터 일괄 저장 */
    save: async (params: VslArtclSaveRequest): Promise<VslArtclSaveResult> => {
        const { data } = await apiClient.post<ApiEnvelope<VslArtclSaveApiResult>>(
            `/api/vslArtcl/save`, params,
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박별 예산/계획/실적 저장 실패');

        return data.result ?? {};
    },

    /** 선박별 데이터 복사 */
    copy: async (params: CopyParam): Promise<VslArtclCopyApiResult > => {
        const { data } = await apiClient.post<ApiEnvelope<VslArtclCopyApiResult>>(
            `/api/vslArtcl/copy`, params,
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박별 예산/계획/실적 복사 실패');

        return {
            result: data.result ?? {},
            resultCode: data.resultCode ?? '',
            resultMessage: data.resultMessage ?? '',
        };
    },

    /** 예산 데이터 복사 이력 목록 조회 **/
    getBgtCopyHistory: async (params: object): Promise<VslArtclListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslArtclListApiResult>>(
            `/api/vslArtcl/bgtCopyHistory`, { params }
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박별 예산/계획/실적 목록 조회 실패');
        return { items: data.result?.list ?? [] };
    },

    /** 선박별 데이터 업로드 > 선박코드 존재 여부 확인 */
    validateVsl: async (vslCds: string[]): Promise<VslValidateResult> => {
        const { data } = await apiClient.post<ApiEnvelope<VslValidateApiResult>>(
            `/api/vslArtcl/validVslCd`, vslCds
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박코드 존재 여부 확인 실패');
        return { items: data.result?.list ?? [] };
    },
}

/**
 * 자료활용 API 타입
 */
type DataUtlzVslListResult = {
    list?: unknown[];
};

type DataUtlzVslBscsListResult = {
    list?: unknown[];
};

type DataUtlzVslBgtListResult = {
    list?: unknown[];
};

/**
 * 자료활용 API
 */
export const dataUtlzApi = {

    /**
     * (GET) 선박별 자료활용 - 선박 목록 조회
     */
    getVslList: async (params?: Record<string, unknown>): Promise<ShipItem[]> => {
        const { data } = await apiClient.get<BaseApiResponse<DataUtlzVslListResult>>(
            `${baseURL}/api/bgt/statis/vsl/list`,
            { params }
        );

        if (!isSuccess(data.resultCode)) {
            throw new Error(data.resultMessage || '선박 목록 조회 실패');
        }

        return (data.result?.list ?? []) as ShipItem[];
    },

    /**
     * (GET) 선박별 기초예산내역 목록 조회
     * @param params 검색 조건
     */
    getVslBscsList: async (params: Record<string, unknown>): Promise<BscsVslItem[]> => {
        const { data } = await apiClient.get<BaseApiResponse<DataUtlzVslBscsListResult>>(
            `${baseURL}/api/bgt/statis/vslBscs/list`,
            { params }
        );

        if (!isSuccess(data.resultCode)) {
            throw new Error(data.resultMessage || '선박별 기초예산내역 목록 조회 실패');
        }

        return (data.result?.list ?? []) as BscsVslItem[];
    },

    /**
     * (GET) 선박별 예산상세내역 목록 조회
     * @param params 검색 조건
     */
    getVslBgtList: async (params: Record<string, unknown>): Promise<BgtVslItem[]> => {
        const { data } = await apiClient.get<BaseApiResponse<DataUtlzVslBgtListResult>>(
            `${baseURL}/api/bgt/statis/vslBgt/list`,
            { params }
        );

        if (!isSuccess(data.resultCode)) {
            throw new Error(data.resultMessage || '선박별 예산상세내역 목록 조회 실패');
        }

        return (data.result?.list ?? []) as BgtVslItem[];
    },
}

// ---------------------------------------------------------------------------
// 환율정보 관리 (CrtrInfoExchrt) API
// ---------------------------------------------------------------------------

/**
 * 환율정보 조회 & 수정
*/
type crtrInfoExchrtDetailApiResult = {
    details?: Record<string, unknown>[];
}
export interface crtrInfoExchrtDetailResult {
    items?: Record<string, unknown>[];
}

type crtrInfoExchrtListApiResult = {
    list?: Record<string, unknown>[];
}

export interface crtrInfoExchrtDetailResult {
    items?: Record<string, unknown>[];
}

export const crtrInfoExchrtApi = {

    getList: async (param: Record<string, unknown>): Promise<crtrInfoExchrtDetailResult> => {
        const { data } = await apiClient.get<ApiEnvelope<crtrInfoExchrtListApiResult>>(
            `/api/bgtExchrt/list`,
            {
                params: param
            }
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '환율 정보 조회 실패');

        const apiResult = data.result?.list ?? [];
        return {
            items: apiResult
        }
    },

    /**
     * 환율정보 상세 조회(GET)
     * @param params
     */
    getDetail: async (param: Record<string, unknown>): Promise<crtrInfoExchrtDetailResult> => {
        const { data } = await apiClient.get<ApiEnvelope<crtrInfoExchrtDetailApiResult>>(
            `/api/bgtExchrt/detail`,
            {
                params: param
            }
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '환율 정보 조회 실패');

        const apiResult = data.result?.details ?? [];

        return {
            items: apiResult
        }
    },

    update: async (params: FormData | Record<string, unknown>): Promise<Record<string, unknown>> => {
        const { data } = await apiClient.post<ApiEnvelope<Record<string, unknown>>>(
            `/api/bgtExchrt/update`,
            {
                params
            }
        )

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '환율 정보 수정 실패');

        return data.result ?? {};
    },

    insert: async (params: FormData | Record<string, unknown>): Promise<Record<string, unknown>> => {
        const { data } = await apiClient.post<ApiEnvelope<Record<string, unknown>>>(
            `/api/bgtExchrt/insert`,
            {
                params
            }
        )

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '환율 정보 등록 실패');

        return data.result ?? {};
    }
}

// ---------------------------------------------------------------------------
// 선박정보관리 (vslInfo) API
// ---------------------------------------------------------------------------
import type {
    ComVslChildren,
    ComVslItem,
    ComVslSavePayload,
} from '@/pages/bizBgt/crtrInfo/types';

export interface VslListResult {
    items: ComVslItem[];
}

interface ComVslDetailWire {
    parent: ComVslItem | null;
    children: ComVslChildren | null;
}

export interface VslDetailResult {
    parent: ComVslItem | null;
    children: ComVslChildren;
}

type VslListApiResult = { list?: ComVslItem[] };

const EMPTY_CHILDREN: ComVslChildren = { dailyFuel: [], dailyLubr: [] };

export const vslInfoApi = {
    /** 선박 목록 조회(검색 조건용) */
    getSearchVslList: async (): Promise<VslListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslListApiResult>>(
            `/com/vsl/searchVslList`,
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박 목록(검색 조건) 조회 실패');
        return { items: data.result?.list ?? [] };
    },

    /** 선박 목록 조회 */
    getList: async (params: object): Promise<VslListResult> => {
        const { data } = await apiClient.get<ApiEnvelope<VslListApiResult>>(
            `/com/vsl/list`,
            {
                params: {
                    ...DEFAULT_PAGING,
                    ...params,
                },
            },
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박 목록 조회 실패');
        return { items: data.result?.list ?? [] };
    },

    /** 선박 상세 조회 */
    getDetail: async (vslCd: string): Promise<VslDetailResult> => {
        const { data } = await apiClient.get<ApiEnvelope<{ detail?: ComVslDetailWire }>>(
            `/com/vsl/detail`, { params: { vslCd } },
        );
        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박 상세 조회 실패');

        const detail = data.result?.detail;
        return {
            parent: detail?.parent ?? null,
            children: detail?.children ?? EMPTY_CHILDREN,
        };
    },

    /** 선박 저장/수정 (MERGE)
     *  - 연료(입력 1행) → DB 2행 저장 (사용연료유(원해) / 사용연료유(원해))
     *  - 윤활유(입력 3행) → DB 3행 저장
     */
    save: async (payload: ComVslSavePayload): Promise<{ data?: ComVslItem }> => {
        // 연료
        const fuelFlat = (payload.children?.dailyFuel ?? []).flatMap(r => ([
            // 원해: 항해 소모량만
            {
                fuelSeCd: 'FUL',
                fuelPrdctCd: r.fuelTypeNm,        // MF380 / LSFO
                nvgtLoadCons: r.nvgtLoadCons ?? null,
                nvgtBlstCons: r.nvgtBlstCons ?? null,
                anchWtngCons: null,
                anchOpsCons: null,
            },
            // 근해: 정박 소모량만
            {
                fuelSeCd: 'FUL',
                fuelPrdctCd: r.fuelPrdctCd,      // LSMGO
                nvgtLoadCons: null,
                nvgtBlstCons: null,
                anchWtngCons: r.anchWtngCons ?? null,
                anchOpsCons: r.anchOpsCons ?? null,
            },
        ]));

        // 윤활유
        const lubrFlat = (payload.children?.dailyLubr ?? []).map(r => ({
            fuelSeCd: 'LUB',
            fuelPrdctCd: r.fuelPrdctCd,
            nvgtLoadCons: r.nvgtLoadCons ?? null,
            nvgtBlstCons: r.nvgtBlstCons ?? null,
            anchWtngCons: r.anchWtngCons ?? null,
            anchOpsCons: r.anchOpsCons ?? null,
        }));

        const params = {
            parent: payload.parent,
            children: [...fuelFlat, ...lubrFlat],
        };

        const { data } = await apiClient.post<ApiEnvelope<{ data?: ComVslItem }>>(
            `/com/vsl/save`, params,
        );

        if (!isSuccess(data.resultCode)) throw new Error(data.resultMessage || '선박 등록 실패');
        return data.result ?? {};
    },
}