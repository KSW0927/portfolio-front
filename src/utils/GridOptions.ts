
/**
 * 공통 그리드(Tabulator) - 페이징 옵션
 */
export const PagingOptions = (perPage: number, initPage?: number): any => {
    return {
        pagination: true, // 페이징 여부
        paginationMode: "local", // 페이징 모델(remote, local, custom)
        paginationSize: perPage? perPage : 10, // 기본 페이징 수
        paginationSizeSelector: [10, 20, 50, 100], // 페이징 수 선택 목록
        paginationCounter: "rows", // 페이징에 행 수 표시
        paginationInitialPage: initPage? initPage : 1, // 기본 페이징 페이지
    }
};

/**
 * 공통 그리드(Tabulator) - 페이징(URL) 옵션
 */
export const PagingUrlOptions = (url: string, param: any, perPage: number, initPage?: number): any => {
    return {
        pagination: true, // 페이징 여부
        paginationMode: "remote", // 페이징 모델(remote, local, custom)
        paginationSize: perPage? perPage : 10, // 기본 페이징 수
        paginationSizeSelector: [10, 20, 50, 100], // 페이징 수 선택 목록
        paginationCounter: "rows", // 페이징에 행 수 표시
        ajaxURL: url, // 요청 주소
        ajaxParams: param, // 요청 시 전달 파라메타
        ajaxConfig: {
            method: "GET",
            headers: {
                "Accept" : "application/json", // 서버에 JSON 응답이 필요함을 알림
                "Content-type" : "application/json; charset=utf-8",
                "X-Requested-With" : "XMLHttpRequest", // 일부 프레임워크가 요청에 올바르게 응답하도록 수정
                "Access-Control-Allow-Origin" : import.meta.env.VITE_WEB_SITE_URL, // 요청을 보내는 사이트의 URL 출처
                "Authorization" : `Bearer ${sessionStorage.getItem('access_token')}`//토큰 보내는 경우 추가
            },
            credentials: "same-origin", //일치하는 출처에서 요청과 함께 쿠키 전송
        },
        //ajaxContentType: "json", // 매개변수를 JSON 인코딩된 문자열로 서버 전송(POST로 송신 시 이용??)
        progressiveLoad: "load", //점진적 로딩 활성화(load, scroll)
        //progressiveLoadDelay: 200, // 각 요청 사이에 200밀리초 대기
        //progressiveLoadScrollMargin: 300, // 스크롤바가 테이블 하단에서 300px 이하일 때 다음 페이지 트리거
        //dataSendParams: param, // 요청 시 전달 파라메타
        paginationInitialPage: initPage? initPage : 1, // 기본 페이징 페이지
    }
};

/**
 * 공통 그리드(Tabulator) - 행번호 Column
 */
export const RowNumColumn = {
    title: "NO.", width: 50, // 헤더 크기
    frozen: true, headerHozAlign: "center", hozAlign: "right", headerSort: false, resizable: false, // 헤더 크기 변경가능 여부
    formatter: "rownum", // 번호 헤더
    //cssClass: "", // 헤더 css클래스
};

/**
 * 공통 그리드(Tabulator) - 체크박스 옵션 & Column
 */
export const CheckBoxOptions = {
    selectableRows: true, // Row 선택가능 여부(false: 비활성화, true: 활성화, integer: 선택할 수 있는 최대 행 수, "highlight": 클릭 시
    //selectableRowsRangeMode: "click", 범위 선택(시프트 누른 상태에서 드래그)
    //selectableRowsRollingSelection: false, // 롤링 선택 여부(제한된 선택 개수를 넘어가면 처음 행 제외)
    //selectableRowsPersistence: false, //선택 지속성 여부
};
export const CheckBoxColumn = {
    width: 30,
    frozen: true, headerHozAlign: "center", hozAlign: "center", headerSort: false, resizable: false,
    titleFormatter: "rowSelection", titleFormatterParams :{ rowRange : "active" }, // 활성화된 필터링된 행의 값만 토글
    formatter: "rowSelection",
};

/**
 * 공통 그리드(Tabulator) - Grouping 옵션
 */
export const GroupingOptions = (groupCol: string): any => {
    return {
        groupBy: groupCol,
        //groupBy: function(data: any) { return data.gender + "-" + data.age },
        groupStartOpen: false, // 초기 오픈 상태
        groupToggleElement: "header", // 헤더 클릭 영역(arrow, header, false)
        groupHeader: function(value: any, count: number) { //value, count, data, group
            return value + `<span style='color:#D00; margin-left:10px;'>(${count} item)</span>`;
        },
        groupHeaderDownload: function(value: any) {
            return value + `<span style='color:#D00; margin-left:10px;'></span>`;
        },
        groupHeaderPrint: function(value: any) {
            return value + `<span style='color:#D00; margin-left:10px;'></span>`;
        },
    }
};

/**
 * 공통 그리드(Tabulator) - Nested(트리형) 옵션
 */
export const NestedTablatorOptions = {
    dataTree: true, //데이터 트리형 여부
    dataTreeStartExpended: false, //데이터 트리형 시작 시 확장 여부
    dataTreeChildField: "_children", //자식 데이터 필드명(기본값: _children)
    //dataTreeCollapseElement: "-", //자식 데이터 접힘 아이콘(기본값: -, HTML/문자열 가능)
    //dataTreeExpandElement: "+", //자식 데이터 펼침 아이콘(기본값: +, HTML/문자열 가능)
    //dataTreeChildIndent: 20, //자식 데이터 인덱트(px)
};

/**
 * 공통 그리드(Tabulator) - Movable(Row이동) 옵션 & Column
 */
export const MovableOptions = {
    movableRows: true, //이동형 여부
    movableRowsConnectedTables: false, // 다른 테이블로 보낼지 여부
    //movableRowsConnectedElements: false, // 테이블이 아닌 Element로 보낼지 여부
};
export const MovableColumn = {
    rowHandle: true, minWidth:30, width:30, headerSort: false, resizable: false, formatter:"handle"
};

/**
 * 공통 그리드(Tabulator) - No Header 옵션
 */
export const NoHeaderOptions = {
    headerVisible: false, //헤더 표시 여부
};

