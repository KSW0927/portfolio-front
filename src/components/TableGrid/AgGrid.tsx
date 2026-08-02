import React, { useMemo, useRef, useImperativeHandle } from "react";
import { AgGridProvider, AgGridReact} from "ag-grid-react";
import { AllCommunityModule, type RowSelectionOptions } from "ag-grid-community";

/**
 * 공통 그리드 컴포넌트 - AG Grid 이용
 * 기능 추가한 버전으로 참고용
 */
interface AgGridProps {
    tref?: React.Ref<any>;
    columns: any[];
    rowData?: any[];
    height?: string;
    isRowSelection?: boolean;
    isPaging?: boolean;
    pageSize?: number;
    isRowNumber?: boolean;
}
export const AgGrid = (props: AgGridProps) => {
    const { tref, columns, rowData = [], height = "300px", isRowSelection = false, isPaging = false, pageSize = 20, isRowNumber = false } = props;
    const gridRef = useRef<any>(null);

    // 부모 컴포넌트에서 인스턴스 메서드에 접근할 수 있도록 노출
    useImperativeHandle(tref, () => ({
        getGrid: () => { console.log(gridRef.current); return gridRef.current; }, // Tabulator 원본 인스턴스 반환
    }));

    const modules = [ AllCommunityModule ];

    const defaultColDef = useMemo(() => ({
        flex: 1, // 컬럼의 너비를 균등하게 나누어 갖도록 설정
        minWidth: 100, // 컬럼의 최소 너비
        resizable: false, // 사용자가 컬럼 크기를 조절할 수 있도록 허용
        sortable: false, // 컬럼 헤더 클릭 시 정렬 기능
        filter: false // 기본 텍스트 필터 유무
    }), []);

    const defaultRowSelection = useMemo<RowSelectionOptions>(() => ({
        mode: "multiRow", // 선택 종류(singleRow, multiRow)
        headerCheckbox: true, //체크박스 유무
    }), []);

    const defaultPaging = useMemo(() => ({
        pagination: isPaging, // 페이징 유무
        paginationPageSize: pageSize, // 페이지당 사이즈
        paginationPageSizeSelector: [10, 20, 50, 100], // 선택 가능한 페이지당 사이즈
    }), []);

    const defaultRowNumber = useMemo(() => ({
        rowNumbers: isRowNumber, // 행번호 유무
        cellSelection: false, // 열선택 유무
    }), []);


    return (
        <AgGridProvider modules={ modules }>
            <div style={{ width: "100%", height: height }}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columns}
                    rowData={rowData}
                    rowSelection={isRowSelection ? defaultRowSelection : undefined}
                    pagination={defaultPaging.pagination}
                    paginationPageSize={defaultPaging.paginationPageSize}
                    paginationPageSizeSelector={defaultPaging.paginationPageSizeSelector}
                    rowNumbers={defaultRowNumber.rowNumbers}
                    cellSelection={defaultRowNumber.cellSelection}
                    animateRows={true} // 데이터 정렬 시 애니메이션 효과 추가
                />
            </div>
        </AgGridProvider>
    )
}
AgGrid.displayName = 'AgGrid';




