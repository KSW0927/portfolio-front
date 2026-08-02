import React, { useMemo, useRef, useImperativeHandle, useState, useCallback, useEffect } from "react";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { AllCommunityModule, type RowSelectionOptions, type ColDef, type GridApi, type ICellRendererParams, type IHeaderParams, type RowClassParams } from "ag-grid-community";
import { Button, Divider, Dropdown, Icon, Layout, Space, Typography } from "@/publishing/components";
import { Checkbox } from "@/publishing/components/common/Checkbox";
import { useIsMobile } from "@/hooks/useIsMobile";

const CheckboxCellRenderer = ({ node, api }: ICellRendererParams) => {
    const [checked, setChecked] = useState(() => node.isSelected() ?? false);

    useEffect(() => {
        const handler = () => setChecked(node.isSelected() ?? false);
        api.addEventListener('selectionChanged', handler);
        return () => api.removeEventListener('selectionChanged', handler);
    }, [api, node]);

    return (
        <Checkbox
            checked={checked}
            onChange={(e) => node.setSelected(e.target.checked)}
            aria-label={`${(node.rowIndex ?? 0) + 1}행 선택`}
        />
    );
};

const CheckboxHeaderRenderer = ({ api }: IHeaderParams) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const update = () => {
            const total = api.getDisplayedRowCount();
            const selected = api.getSelectedRows().length;
            setChecked(total > 0 && selected === total);
            if (inputRef.current) {
                inputRef.current.indeterminate = selected > 0 && selected < total;
            }
        };
        api.addEventListener('selectionChanged', update);
        update();
        return () => api.removeEventListener('selectionChanged', update);
    }, [api]);

    const handleChange = () => {
        if (checked) api.deselectAll();
        else api.selectAll();
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
    columns: ColDef[];
    rowData?: unknown[];
    isRowSelection?: boolean;
    pageSize?: number;
    isRowNumber?: boolean;
    totalCount?: number;
    totalLabel?: string;
    totalExtras?: DataGridTotalExtra[];
    topRightButtons?: React.ReactNode;
    rowDragManaged?: boolean;
    gridLabel?: string;
    onRowDragEnd?: (rows: unknown[]) => void;
    getRowClass?: (params: RowClassParams) => string | string[] | undefined;
    initialSort?: { column: string; dir: "asc" | "desc" }[];
    infiniteScroll?: boolean;
    showHeader?: boolean;
    footerData?: unknown[];
    maxRows?: number;
    title?: string;
}

const DESKTOP_ROW_HEIGHT_REM = 5.5;
const MOBILE_ROW_HEIGHT_REM = 4.8;
const DESKTOP_MAX_DATA_ROWS = 10;
const MOBILE_MAX_DATA_ROWS = 5;
const BORDER_TOP_REM = 0.3;

const MODULES = [AllCommunityModule];

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
        columns,
        rowData = [],
        isRowSelection = false,
        pageSize = 10,
        isRowNumber = false,
        totalCount,
        totalLabel,
        totalExtras,
        topRightButtons,
        rowDragManaged = false,
        gridLabel = "데이터 그리드",
        onRowDragEnd,
        getRowClass,
        initialSort,
        infiniteScroll = false,
        showHeader = false,
        footerData,
        maxRows,
        title,
    } = props;

    const isMobile = useIsMobile();
    const gridRef = useRef<AgGridReact>(null);
    const [currentPageSize, setCurrentPageSize] = useState(isMobile ? 5 : pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useImperativeHandle(tref, () => ({
        getGrid: () => gridRef.current,
        getApi: () => gridRef.current?.api,
    }));

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        resizable: true,
        sortable: false,
        filter: false,
    }), []);

    const defaultRowSelection = useMemo<RowSelectionOptions>(() => ({
        mode: "multiRow",
        headerCheckbox: true,
    }), []);

    const displayCount = totalCount ?? rowData.length;

    const currentDataLength = Math.max(0, Math.min(currentPageSize, rowData.length - (currentPage - 1) * currentPageSize));

    const rowHeightRem = isMobile ? MOBILE_ROW_HEIGHT_REM : DESKTOP_ROW_HEIGHT_REM;
    const maxDataRows = maxRows ?? (isMobile ? MOBILE_MAX_DATA_ROWS : DESKTOP_MAX_DATA_ROWS);
    const headerRowCount = columns.some(col => "children" in col) ? 2 : 1;
    const footerRowCount = footerData?.length ?? 0;
    const maxHeightRem = (maxDataRows + headerRowCount + footerRowCount) * rowHeightRem + BORDER_TOP_REM;
    const rowCount = infiniteScroll ? rowData.length : currentDataLength;
    const gridHeight = infiniteScroll && rowData.length >= maxDataRows
        ? `${maxHeightRem}rem`
        : `${Math.min((Math.max(rowCount, 1) + headerRowCount + footerRowCount) * rowHeightRem + BORDER_TOP_REM, maxHeightRem)}rem`;

    const groupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

    const onPaginationChanged = useCallback(() => {
        if (gridRef.current?.api) {
            setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
            setTotalPages(gridRef.current.api.paginationGetTotalPages() || 1);
        }
    }, []);

    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        gridRef.current?.api?.paginationGoToPage(page - 1);
    }, [currentPage, totalPages]);

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

    const handlePageSizeChange = (val: string) => {
        const newSize = Number(val);
        setCurrentPageSize(newSize);
        gridRef.current?.api?.updateGridOptions({ paginationPageSize: newSize });
    };

    return (
        <div className="data-grid-wrapper" role="region" aria-label={gridLabel}>
            {(!infiniteScroll || showHeader || !!topRightButtons || !!title) && (
                <Layout.Row layout={isMobile ? "vertical" : "horizontal"} justify="space-between" align={isMobile ? "start" : "end"} gap={isMobile ? 8 : 20} className="data-grid-header">
                    {(!infiniteScroll || showHeader || title) && (
                        <Layout.Col layout={(isMobile || !!title) ? "vertical" : "horizontal"} gap={isMobile ? 8 : 14}>
                            {title && <Typography variant="heading-sm">{title}</Typography>}

                            {(!infiniteScroll || showHeader) && (
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
                                    {!infiniteScroll && !isMobile && <Divider layout="vertical" size={10} />}
                                    {!infiniteScroll && (
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
                        columnDefs={columns}
                        rowData={rowData}
                        pagination={!infiniteScroll}
                        paginationPageSize={currentPageSize}
                        suppressPaginationPanel={true}
                        onPaginationChanged={onPaginationChanged}
                        pinnedBottomRowData={footerData}
                        initialState={initialSort ? { sort: { sortModel: initialSort.map(s => ({ colId: s.column, sort: s.dir })) } } : undefined}
                        rowSelection={isRowSelection ? defaultRowSelection : undefined}
                        rowNumbers={isRowNumber}
                        animateRows={true}
                        rowDragManaged={rowDragManaged}
                        rowDragEntireRow={rowDragManaged}
                        onRowDragEnd={handleRowDragEnd}
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
                        rowHeight={isMobile ? 48 : 55}
                    />
                </div>
            </AgGridProvider>

            {!infiniteScroll && (
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
