import React, { useMemo, useRef, useImperativeHandle, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import type {
    RowSelectionOptions,
    ColDef,
    GridApi,
    RowModelType,
    ICellRendererParams,
    IHeaderParams,
    RowClassParams,
    ExcelExportParams,
    CsvExportParams,
    GridReadyEvent,
    ModelUpdatedEvent,
    CellValueChangedEvent,
    PaginationChangedEvent,
    GetRowIdParams,
    RowClickedEvent,
} from "ag-grid-community";
import { Button, Checkbox, Divider, Dropdown, Icon, Layout, Space, Typography } from "@/components";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AlertService } from "@/utils/AlertService";
import { apiClient } from '@/api/client';
import type { BaseApiResponse } from "@/types/types.ts";
import { CheckboxCellRenderer } from "./DataGridCellRenderer";

const baseURL = import.meta.env.VITE_API_PREFIX || '';

export interface DataGridHandle {
    getGrid: () => AgGridReact | null;
    getApi: () => GridApi | undefined;
}

interface DataGridTotalExtra {
    title?: string;
    value: React.ReactNode;
    unit?: string;
}

interface DataGridProps {
    tref?: React.Ref<DataGridHandle>;
    modelType?: RowModelType, // clientSide, serverSide, infinite, viewport
    columns: ColDef[];
    rowData?: unknown[];
    isRowSelection?: boolean;
    isPaging?: boolean;
    pageSize?: number;
    isRowNumber?: boolean;
    rowNumberReverse?: boolean;
    totalCount?: number;
    totalLabel?: string;
    totalExtras?: DataGridTotalExtra[];
    topRightButtons?: React.ReactNode;
    rowDragManaged?: boolean;
    gridLabel?: string;
    getRowClass?: (params: RowClassParams) => string | string[] | undefined;
    initialSort?: { column: string; dir: "asc" | "desc" }[];
    infiniteScroll?: boolean;
    showHeader?: boolean;
    footerData?: unknown[];
    maxRows?: number;
    title?: string;
    onRowDragEnd?: (rows: unknown[]) => void;
    onRowClick?: (event: RowClickedEvent) => void;
    onCellValueChanged?: (event: CellValueChangedEvent) => void;
    onGridReady?: (params: GridReadyEvent) => void;
}

const DESKTOP_ROW_HEIGHT_REM = 5.5;
const MOBILE_ROW_HEIGHT_REM = 4.8;
const DESKTOP_MAX_DATA_ROWS = 10;
const MOBILE_MAX_DATA_ROWS = 5;
const BORDER_TOP_REM = 0.3;

const MODULES = [ AllCommunityModule ];

const PAGE_GROUP_SIZE = 10;
const PAGE_SIZE_OPTIONS = [
    { label: "10개", value: "10" },
    { label: "20개", value: "20" },
    { label: "50개", value: "50" },
];
const PAGE_SIZE_OPTIONS_MOBILE = [
    { label: "5개", value: "5" },
    ...PAGE_SIZE_OPTIONS,
];

export const DataGrid = (props: DataGridProps) => {
    const {
        tref,
        modelType = "clientSide",
        columns,
        rowData = [],
        isRowSelection = false,
        isRowNumber = false,
        isPaging = false,
        rowNumberReverse = false,
        pageSize = 10,
        totalCount,
        totalLabel,
        totalExtras,
        topRightButtons,
        rowDragManaged = false,
        gridLabel = "데이터 그리드",
        getRowClass,
        initialSort,
        //infiniteScroll = false,
        showHeader = true,
        footerData,
        maxRows,
        title,
        onRowDragEnd,
        onRowClick,
        onCellValueChanged,
        onGridReady,
    } = props;

    const isMobile = useIsMobile();
    const { t } = useTranslation();
    const gridRef = useRef<AgGridReact>(null);
    //const isPaging = (type === "serverSide");
    const isInfiniteScroll = (modelType === "infinite");
    const [currentPageSize, setCurrentPageSize] = useState(isMobile ? 5 : pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Edit
    const [changeRows, setChangeRows] = useState({ created: [], updated: [], deleted: [] });

    useImperativeHandle(tref, () => ({
        getGrid: () => gridRef.current,
        getApi: () => gridRef.current?.api,
        //getCurrentPage: () => currentPage,
        //getCurrentPageSize: () => currentPageSize,
        addRow: (newRow: any) => {
            if(!gridRef.current?.api) return false;

            // 그리드에 행 상위에 추가
            gridRef.current?.api.applyServerSideTransaction({ add: [newRow], addIndex: 0 });
            // 스크롤을 상위로 고정
            gridRef.current?.api.ensureIndexVisible(0);
            // Edit 정보의 created 배열에 추가
            setChangeRows((prev: any) => ({ ...prev, created: [ ...prev.created, newRow ] }));

            return true;
        },
        deleteRow: () => {
            if(!gridRef.current?.api) return false;

            const selectedRows = gridRef.current?.api.getSelectedRows();
            if(selectedRows === undefined || selectedRows?.length === 0) {
                AlertService.warning("선택된 행이 없습니다.", "정보 삭제");
                return false;
            }

            // 화면에서 선택된 행 숨기기/지우기
            gridRef.current?.api.applyServerSideTransaction({ remove: selectedRows });
            // 삭제 행 정보 저장
            selectedRows.forEach(row => {
                if(row.isTmpNew) {
                    // DB에 저장되지 않은 신규 행이면 created 저장소에서 제거만
                    setChangeRows(prev => ({ ...prev, created: prev.created.filter((item: any) => item.id !== row.id) }));
                } else {
                    // DB에 저장되어 있는 기존 행이면 deleted 저장소에 추가
                    setChangeRows((prev: any) => ({ ...prev, deleted: [...prev.deleted, row] }));
                }
            });

            return true;
        },
        save: async (url: string) => {
            const isOk = await AlertService.confirm("정보 변경", "변경된 정보를 저장하시겠습니까?")
            if(isOk) {
                const response = await apiClient.post<BaseApiResponse<string>> (
                    baseURL + url,
                    changeRows
                )
                if(response) {
                    AlertService.success("정보가 변경되었습니다.", "정보 수정");

                    // 임시 변경 저장소 초기화
                    setChangeRows({ created: [], updated: [], deleted: [] });
                    // 그리드 새로고침
                    gridRef.current?.api.refreshServerSide({ purge: true });

                    return true;
                } else {
                    console.error("게시판 그리드 저장 실패.");
                    return false;
                }
            } else {
                return false;
            }
        },
        cancel: async () => {
            // 변경된 내용이 없으면 패스
            if(changeRows.created.length === 0 && changeRows.updated.length === 0 && changeRows.deleted.length === 0) return;

            const isOk = await AlertService.confirm("정보변경", "작업 중인 모든 내용이 사라집니다. 취소하시겠습니까?")
            if(isOk) {
                // 임시 저장소에 변경 데이터 초기화
                setChangeRows({ created: [], updated: [], deleted: [] });
                // 그리드 재로드
                gridRef.current?.api.refreshServerSide({ purge: true });

                return true;
            } else {
                return false;
            }
        },
        exportToExcel: (params: ExcelExportParams) => gridRef.current?.api?.exportDataAsExcel(params),
        exportToCsv: (params: CsvExportParams) => gridRef.current?.api?.exportDataAsCsv(params),
    }));

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        resizable: true,
        sortable: false,
        suppressMovable: true,
        filter: false,
        suppressHeaderMenuButton: true,
        //suppressColumnsToolPanel: true,
        //suppressNavigable: true,
    }), []);

    const defaultRowSelection = useMemo<RowSelectionOptions>(() => ({
        mode: isRowSelection ? "multiRow" : "singleRow",
        headerCheckbox: isRowSelection,
        checkboxes: isRowSelection,
        enableClickSelection: !isRowSelection,
    }), []);

    const defaultExcelExportParams = useMemo<ExcelExportParams>(() => ({
        exportAsExcelTable: true,
    }), []);

    const defaultCsvExportParams = useMemo<CsvExportParams>(() => ({
        columnSeparator: ",",
    }), []);

    // Row 번호 추가인 경우 columns에 추가하여 표시
    let tmpColumns = columns;
    if(isRowNumber) {
        tmpColumns = [
            {
                headerName: t('no'), width: 100, minWidth: 100, flex: 0, sortable: false, filter: false,
                cellRenderer: (params: ICellRendererParams) => {
                    // params.node가 없거나 인덱스가 없는 예외 상황 방어코드
                    if (!params.node || params.node.rowIndex === null) return '';

                    if(rowNumberReverse) {
                        // 역순으로 표시 시
                        // 그리드 API를 통해 현재 화면에 표시된 전체 행 개수를 가져와 역순 번호 계산(전체 개수 - 현재 인덱스)
                        const totalRows = params.api.getDisplayedRowCount();
                        return totalRows - params.node.rowIndex;
                    } else {
                        return params.node.rowIndex + 1;
                    }
                },
            },
            ...columns
        ]
    }

    const displayCount = totalCount ?? rowData.length;

    const currentDataLength = Math.max(0, Math.min(currentPageSize, rowData.length - (currentPage - 1) * currentPageSize));

    const rowHeightRem = isMobile ? MOBILE_ROW_HEIGHT_REM : DESKTOP_ROW_HEIGHT_REM;
    const maxDataRows = maxRows ?? (isMobile ? MOBILE_MAX_DATA_ROWS : DESKTOP_MAX_DATA_ROWS);
    const headerRowCount = ( columns && columns.some(col => "children" in col)) ? 2 : 1;
    const footerRowCount = footerData?.length ?? 0;
    const maxHeightRem = (maxDataRows + headerRowCount + footerRowCount) * rowHeightRem + BORDER_TOP_REM;
    const rowCount = isInfiniteScroll ? rowData.length : currentDataLength;
    const tmpGridHeight = isInfiniteScroll && rowData.length >= maxDataRows
        ? `${maxHeightRem}rem`
        : `${Math.min((Math.max(rowCount, 1) + headerRowCount + footerRowCount) * rowHeightRem + BORDER_TOP_REM, maxHeightRem)}rem`
    const groupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
    const [gridHeight, setGridHeight] = useState(tmpGridHeight);

    // 헤더 전체체크박스 랜더링 정의
    const CheckboxHeaderRenderer = ({ api }: IHeaderParams) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [checked, setChecked] = useState(false);

        useEffect(() => {
            const update = () => {
                // 현재 그리드에 로드된 전체 행 수(스크롤 이동 시 증가)
                const totalDisplayed = api.getDisplayedRowCount();
                // 현재 선택된 행의 총 수
                const totalSelected = api.getSelectedRows().length;

                if(isPaging) {
                    // 페이징 모드인 경우 현재 눈에 보이는 렌더링된 노드들 기준으로만 계산
                    const validNodes = api.getRenderedNodes().filter(node => node && node.data);
                    let displayedCount = validNodes.length;
                    let selectedCount = validNodes.filter(node => node.isSelected()).length;

                    setChecked(displayedCount > 0 && selectedCount === displayedCount);
                    // 중간 상태(일부 선택) 처리
                    if (inputRef.current) {
                        inputRef.current.indeterminate = displayedCount > 0 && selectedCount < displayedCount;
                    }
                } else {
                    // 무한스크롤 모드인 경우 전체 로드된 누적 카운트 기준으로 계산(스크롤 이동 시 변경)
                    setChecked(totalDisplayed > 0 && totalSelected === totalDisplayed);
                    // 중간 상태(일부 선택) 처리
                    if (inputRef.current) {
                        inputRef.current.indeterminate = totalSelected > 0 && totalSelected < totalDisplayed;
                    }

                }
            };

            api.addEventListener('selectionChanged', update);
            // SSRM은 데이터가 로드되어 모델이 업데이트될 때도 상태를 다시 계산
            api.addEventListener("modelUpdated", update);
            update();
            return () => {
                api.removeEventListener('selectionChanged', update);
                api.removeEventListener("modelUpdated", update);
            }
        }, [api, isPaging]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const isCurrentlyChecked = e.target.checked;
            // 그리드가 대규모 데이터를 일괄 처리할 때 발생하는 리렌더링 성능 저하를 막기 위해 비동기 트랜잭션 처리
            //api.startToBatch();
            //api.startBatchEdit();
            if(isPaging) {
                // 페이징 모드인 경우 보이는 것만 통제
                const validNodes = api.getRenderedNodes().filter(node => node && node.data);
                validNodes.forEach((node) => {
                    node.setSelected(isCurrentlyChecked);
                });
            } else {
                // 무한스크롤 모드인 경우 현재까지 스크롤하여 내려온 모든 노드를 통제
                api.forEachNode((node) => {
                   if(node) node.setSelected(isCurrentlyChecked);
                });
            }
            //api.endOfBatch();
            //api.commitBatchEdit();
        };

        return (
            <Checkbox
                ref={inputRef}
                checked={checked}
                onChange={handleChange}
                aria-label="전체 선택"
            />
        );
    };

    // 컬럼 정의에서 PK 필드를 찾아 Row ID로 매핑
    const getRowId = useCallback((params: GetRowIdParams) => {
        // 데이터 자체가 없거나 아직 로딩 중인 상태이면 임시 랜덤 ID 부여
        if(!params.data) return `loading-${Math.random()}`;

        // 풋터 데이터(pinned row)인 경우 전용 식별자 부여(중복 방지)
        if(params.data.rowPinned === "bottom") return `pinned-${params.data.rowIndex}`;

        // 현재 그리드에 적용된 컬럼 정보를 가져오기
        //const columnDefs = params.api.getColumnDefs();
        const pkColumn = columns.find(col => col.context?.isPrimaryKey);
        const pkField = (pkColumn as any)?.field || "id"; // 없으면 기본값 ID로
        // 최종 데이터 값 추출
        const actualId = params.data[pkField];

        // 만약 데이터 객체에 해당 필드가 진짜로 없다면 그리드 내부 rowId로 대체
        if(actualId === undefined || actualId === null) {
            return `row-${params.data.rowIndex ?? Math.random()}`;
        } else {
            return String(actualId);
        }
    }, [columns]);

    // 페이징 변경 이벤트
    const onPaginationChanged = useCallback((params: PaginationChangedEvent) => {
        if (gridRef.current?.api) {
            setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
            setTotalPages(gridRef.current.api.paginationGetTotalPages() || 1);

            if(params.newPage) {
                // 페이지가 바뀌면 이전 페잊의 선택 상태를 모두 해제
                params.api.deselectAll();
            }
        }
    }, []);
    // 커스텀페이징 페이지 변경 이벤트
    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page); // 페이징 UI 업데이트
        gridRef.current?.api.paginationGoToPage(page - 1);  // 그리드 페이지 이동
    }, [currentPage, totalPages]);
    // 커스텀페이징 페이지사이즈 변경 이벤트
    const handlePageSizeChange = (val: string) => {
        const newSize = Number(val);
        setCurrentPageSize(newSize);
        gridRef.current?.api?.updateGridOptions({ paginationPageSize: newSize });
    };

    // 행 드롭 다운 이벤트
    const handleRowDragEnd = useCallback(() => {
        if (!onRowDragEnd) return;
        const reordered: unknown[] = [];
        gridRef.current?.api?.forEachNode(node => reordered.push(node.data));
        const start = (currentPage - 1) * currentPageSize;
        onRowDragEnd([
            ...rowData.slice(0, start),
            ...reordered,
            ...rowData.slice(start + currentPageSize),
        ]);
    }, [onRowDragEnd, rowData, currentPage, currentPageSize]);

    // 행 클릭 이벤트
    const handleRowClick = useCallback((event: RowClickedEvent) => {
        const nativeEvent = event.event;
        if(nativeEvent && (nativeEvent as any).isButtonClicked) {
            return;
        }

        if(onRowClick) onRowClick(event);
    }, []);

    // 셀 값 변경 이벤트
    const handleCellValueChanged = useCallback((event: CellValueChangedEvent) => {
        const rowData = event.data;

        if(rowData.isTempNew) {
            // 만약 신규 행을 수정한 것이라면 created 업데이트
            setChangeRows((prev: any) => ({
                ...prev,
                created: prev.created.map((item: any) => item.id === rowData.id ? rowData : item)
            }));
        } else {
            // 기존 데이터 수정인 경우
            setChangeRows((prev: any) => {
                //const isAlreadyUpdated = prev.updated.some(item => item.pstNo === rowData.pstNo);
                const filteredUpdated = prev.updated.filter((item: any) => item.id !== rowData.id);

                return {
                    ...prev,
                    updated: [ ...filteredUpdated, rowData ]
                };
            });
        }

        onCellValueChanged?.(event);
    }, []);

    // 그리드 준비완료 이벤트
    const handleGridReady = useCallback((params: GridReadyEvent) => {
        onGridReady?.(params);
    }, []);
    // 그리드 모델 업데이트 이벤트
    const handleModelUpdated = useCallback((params: ModelUpdatedEvent) => {
        const tmpRowCount = params.api.getDisplayedRowCount();
        const tmpGridHeight = isInfiniteScroll && tmpRowCount >= maxDataRows
            ? `${maxHeightRem}rem`
            : `${Math.min((Math.max(tmpRowCount, 1) + headerRowCount + footerRowCount) * rowHeightRem + BORDER_TOP_REM, maxHeightRem)}rem`

        setGridHeight(tmpGridHeight);
    }, []);

    return (
        <div className="data-grid-wrapper" role="region" aria-label={gridLabel}>
            {(showHeader || !!topRightButtons || !!title) && (
                <Layout.Row layout={isMobile ? "vertical" : "horizontal"} justify="space-between" align={isMobile ? "start" : "end"} gap={isMobile ? 8 : 20} className="data-grid-header">
                    {(showHeader || title) && (
                        <Layout.Col layout={(isMobile || !!title) ? "vertical" : "horizontal"} gap={isMobile ? 8 : 14}>
                            {title && <Typography variant="heading-sm">{title}</Typography>}

                            {(showHeader) && (
                                <Space size={isMobile ? 8 : 14}>
                                    <Space separator="/" size={4} className="data-grid-total" aria-live="polite" aria-atomic="true">
                                        {totalLabel && <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">{totalLabel} </Typography>}
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">
                                            총
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="strong" weight="semibold" primary> {displayCount.toLocaleString()}</Typography>
                                            건
                                        </Typography>
                                        {totalExtras?.map((extra, i) => (
                                            <Typography key={i} variant={isMobile ? "body-md" : "body-lg"} as="span">
                                                {extra.title}
                                                <Typography variant={isMobile ? "body-md" : "body-lg"} as="strong" weight="semibold" primary> {extra.value}</Typography>
                                                {extra.unit}
                                            </Typography>
                                        ))}
                                    </Space>
                                    {!isInfiniteScroll && isPaging && !isMobile && <Divider layout="vertical" size={10} />}
                                    {!isInfiniteScroll && isPaging && (
                                        <Dropdown
                                            variant="text"
                                            label="목록 표시 개수"
                                            layout="horizontal"
                                            options={isMobile ? PAGE_SIZE_OPTIONS_MOBILE : PAGE_SIZE_OPTIONS}
                                            value={String(currentPageSize)}
                                            onChange={handlePageSizeChange}
                                        />
                                    )}
                                </Space>
                            )}
                        </Layout.Col>
                    )}
                    {topRightButtons && (
                        <Layout.Col layout="horizontal" justify="end" gap={8}>
                            {topRightButtons}
                        </Layout.Col>
                    )}
                </Layout.Row>
            )}

            <AgGridProvider modules={MODULES}>
                <div className="ag-theme-alpine custom-ag-theme" style={{ width: "100%", height: gridHeight }}>
                    <AgGridReact
                        ref={gridRef}
                        defaultColDef={defaultColDef}
                        defaultExcelExportParams={defaultExcelExportParams}
                        defaultCsvExportParams={defaultCsvExportParams}
                        columnDefs={tmpColumns}
                        getRowId={getRowId}
                        rowData={modelType === "clientSide" ? rowData : undefined}
                        rowHeight={isMobile ? 48 : 55}
                        initialState={initialSort ? { sort: { sortModel: initialSort.map(s => ({ colId: s.column, sort: s.dir })) } } : undefined}
                        rowModelType={modelType}
                        pagination={isPaging}
                        paginationPageSize={currentPageSize}
                        paginationPageSizeSelector={[10, 20, 50]}
                        suppressPaginationPanel={true} // 자체 페이징 숨김
                        suppressContextMenu={true} // 우클릭 시 생성되는 컨텍스트 박스 활성화 유무
                        //preventDefaultOnContextMenu={false}
                        //allowContextMenuWithControlKey={false}
                        //suppressMenuHide={true}
                        suppressExcelExport={false} // 엑셀 Export 차단(true인 경우)
                        suppressCsvExport={false} // CSV Export 차단(true인 경우)
                        pinnedBottomRowData={footerData}
                        cacheBlockSize={isInfiniteScroll ? currentPageSize : undefined}
                        rowSelection={defaultRowSelection}
                        //rowNumbers={isRowNumber}
                        animateRows={true}
                        cellSelection={false}
                        rowDragManaged={rowDragManaged}
                        rowDragEntireRow={rowDragManaged}
                        getRowClass={getRowClass}
                        suppressCellFocus={true}
                        domLayout="normal"
                        icons={{
                            sortAscending: '<i class="ico -x18 ico-up -colored" aria-hidden="true" style="color: #666; --icon-size: 1.8rem;"></i>',
                            sortDescending: '<i class="ico -x18 ico-down -colored" aria-hidden="true" style="color: #666; --icon-size: 1.8rem;"></i>',
                            rowDrag: '<span></span>',
                        }}
                        selectionColumnDef={{
                            cellRenderer: CheckboxCellRenderer,
                            headerComponent: CheckboxHeaderRenderer,
                            width: 48,
                            minWidth: 48,
                            maxWidth: 48,
                        }}
                        overlayNoRowsTemplate={"조회된 정보가 없습니다."}
                        onPaginationChanged={onPaginationChanged}
                        onRowDragEnd={handleRowDragEnd}
                        onRowClicked={handleRowClick}
                        onCellValueChanged={handleCellValueChanged}
                        onGridReady={handleGridReady}
                        onModelUpdated={handleModelUpdated}
                    />
                </div>
            </AgGridProvider>

            {(!isInfiniteScroll && isPaging) && (
                <nav className="data-grid-pagination" aria-label="페이지 탐색">
                    <span
                        aria-live="polite"
                        aria-atomic="true"
                        style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
                    >
                        {`${currentPage} / ${totalPages} 페이지`}
                    </span>
                    <Button
                        variant="text"
                        className="pagination-arrow"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label={`이전 페이지${currentPage === 1 ? " (첫 페이지)" : ""}`}
                        leftIcon={<Icon name="arrow-left" size={18} color={currentPage === 1 ? "#D2D2D2" : "#666"} />}
                    >
                    </Button>
                    {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i).map(page => (
                        <Button
                            variant="text"
                            key={page}
                            className={`pagination-page${currentPage === page ? ' active' : ''}`}
                            onClick={() => handlePageChange(page)}
                            aria-label={`${page} 페이지`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button
                        variant="text"
                        className="pagination-arrow"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label={`다음 페이지${currentPage === totalPages ? " (마지막 페이지)" : ""}`}
                        leftIcon={<Icon name="arrow-right" size={18} color={currentPage === totalPages ? "#D2D2D2" : "#666"} />}
                    >
                    </Button>
                </nav>
            )}
        </div>
    );
};

DataGrid.displayName = 'DataGrid';