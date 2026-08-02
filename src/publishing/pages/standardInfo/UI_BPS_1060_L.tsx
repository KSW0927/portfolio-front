import { useCallback, useMemo, useRef, useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Dropdown, Icon, Input, Layout, SearchBox, Space, type DataGridHandle } from "@/publishing/components";
import { AlertService } from "@/utils/AlertService";

const initialDummyData = [
    { currency: "USD", jan: "₩1000", feb: "₩1000", mar: "₩1000", apr: "₩1000", may: "₩1000", jun: "₩1000", jul: "₩1000", aug: "₩1000", sep: "₩1000", oct: "₩1000", nov: "₩1000", dec: "₩1000", avg: "₩1000", isEditing: false },
    { currency: "JPY", jan: "₩10", feb: "₩10", mar: "₩10", apr: "₩10", may: "₩10", jun: "₩10", jul: "₩10", aug: "₩10", sep: "₩10", oct: "₩10", nov: "₩10", dec: "₩10", avg: "₩10", isEditing: false },
    { currency: "SGD", jan: "₩1000", feb: "₩1000", mar: "₩1000", apr: "₩1000", may: "₩1000", jun: "₩1000", jul: "₩1000", aug: "₩1000", sep: "₩1000", oct: "₩1000", nov: "₩1000", dec: "₩1000", avg: "₩1000", isEditing: false },
    { currency: "EUR", jan: "₩1000", feb: "₩1000", mar: "₩1000", apr: "₩1000", may: "₩1000", jun: "₩1000", jul: "₩1000", aug: "₩1000", sep: "₩1000", oct: "₩1000", nov: "₩1000", dec: "₩1000", avg: "₩1000", isEditing: true },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1060_L() {
    const isMobile = useIsMobile();
    const gridRef = useRef<DataGridHandle>(null);
    const [tableData, setTableData] = useState(initialDummyData);

    const updateRow = useCallback((currency: string, changes: Partial<typeof initialDummyData[0]>) => {
        setTableData(prev => prev.map(row => row.currency === currency ? { ...row, ...changes } : row));
    }, []);

    const editingValuesRef = useRef<Record<string, string>>({});

    const handleStartEdit = useCallback((data: typeof initialDummyData[0]) => {
        editingValuesRef.current = {
            currency: data.currency,
            jan: data.jan, feb: data.feb, mar: data.mar, apr: data.apr,
            may: data.may, jun: data.jun, jul: data.jul, aug: data.aug,
            sep: data.sep, oct: data.oct, nov: data.nov, dec: data.dec,
        };
        updateRow(data.currency, { isEditing: true });
    }, [updateRow]);

    const handleAdd = useCallback((currency: string) => {
        const isNew = currency === "";
        if (isNew && !editingValuesRef.current.currency?.trim()) {
            AlertService.error("통화를 입력해 주세요.");
            return;
        }
        const monthFields = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"] as const;
        const monthLabels: Record<typeof monthFields[number], string> = {
            jan: "1월", feb: "2월", mar: "3월", apr: "4월",
            may: "5월", jun: "6월", jul: "7월", aug: "8월",
            sep: "9월", oct: "10월", nov: "11월", dec: "12월",
        };
        const emptyMonth = monthFields.find(f => !editingValuesRef.current[f]?.trim());
        if (emptyMonth) {
            AlertService.error(`${monthLabels[emptyMonth]} 값을 입력해 주세요.`);
            return;
        }
        updateRow(currency, { ...(editingValuesRef.current as Partial<typeof initialDummyData[0]>), isEditing: false });
        AlertService.success("저장되었습니다.");
    }, [updateRow]);

    const makeMonthRenderer = useCallback((field: string) => ({ value, data }: ICellRendererParams) => {
        const monthOrder = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== "Tab") return;
            const idx = monthOrder.indexOf(field);
            const nextIdx = e.shiftKey ? idx - 1 : idx + 1;
            if (nextIdx >= 0 && nextIdx < monthOrder.length) {
                e.preventDefault();
                document.getElementById(`month-input-${monthOrder[nextIdx]}`)?.focus();
            }
        };
        if (data?.isEditing) {
            return (
                <Input
                    id={`month-input-${field}`}
                    defaultValue={editingValuesRef.current[field] ?? value ?? ""}
                    onChange={(e) => { editingValuesRef.current[field] = e.target.value; }}
                    onKeyDown={handleKeyDown}
                />
            );
        }
        return value ?? "";
    }, []);

    const tableColumns = useMemo<ColDef[]>(() => [
        { headerName: "통화", field: "currency" },
        { headerName: "1월", field: "jan", cellRenderer: makeMonthRenderer("jan") },
        { headerName: "2월", field: "feb", cellRenderer: makeMonthRenderer("feb") },
        { headerName: "3월", field: "mar", cellRenderer: makeMonthRenderer("mar") },
        { headerName: "4월", field: "apr", cellRenderer: makeMonthRenderer("apr") },
        { headerName: "5월", field: "may", cellRenderer: makeMonthRenderer("may") },
        { headerName: "6월", field: "jun", cellRenderer: makeMonthRenderer("jun") },
        { headerName: "7월", field: "jul", cellRenderer: makeMonthRenderer("jul") },
        { headerName: "8월", field: "aug", cellRenderer: makeMonthRenderer("aug") },
        { headerName: "9월", field: "sep", cellRenderer: makeMonthRenderer("sep") },
        { headerName: "10월", field: "oct", cellRenderer: makeMonthRenderer("oct") },
        { headerName: "11월", field: "nov", cellRenderer: makeMonthRenderer("nov") },
        { headerName: "12월", field: "dec", cellRenderer: makeMonthRenderer("dec") },
        { headerName: "평균", field: "avg" },
        {
            headerName: "관리",
            field: "mng",
            minWidth: 170,
            cellRenderer: ({ data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return (
                        <Space size={6}>
                            <Button variant="outlined" size="sm" onClick={() => {
                                if (data.currency === "") {
                                    setTableData(prev => prev.filter(r => !(r.currency === "" && r.isEditing)));
                                } else {
                                    updateRow(data.currency, { isEditing: false });
                                }
                            }}>취소</Button>
                            <Button variant="solid" color="primary" size="sm" onClick={() => handleAdd(data.currency)}>저장</Button>
                        </Space>
                    );
                }
                return <Button variant="outlined" size="sm" onClick={() => handleStartEdit(data)}>수정</Button>;
            },
        },
    ], [updateRow, handleAdd, handleStartEdit, makeMonthRenderer]);


    return (
        <Layout title="환율 정보" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="연도" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="예산 분류" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>

            {/* Data Grid */}
            <DataGrid
                tref={gridRef}
                columns={tableColumns}
                rowData={tableData}
                gridLabel="환율 정보 목록"
                infiniteScroll
                showHeader
                topRightButtons={
                    <>
                        <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                        <Button>확정</Button>
                    </>
                }
            />
        </Layout>
    );
}
