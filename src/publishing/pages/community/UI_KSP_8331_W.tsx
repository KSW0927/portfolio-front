import { useCallback, useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Button, DataGrid, Icon, Input, Layout } from "@/publishing/components";

const initialData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, shipName: "GTPO (GAS POWER)", operation: "홍길동", mm: "고길동", mo: "나길동", mc: "다길동", captain: "라길동", chiefEngineer: "마길동", firstOfficer: "바길동", secondOfficer: "차길동",
}));

export function UI_KSP_8331_W() {
    const [tableData, setTableData] = useState(initialData);

    const updateRow = useCallback((id: number, changes: Partial<typeof initialData[0]>) => {
        setTableData(prev => prev.map(row => row.id === id ? { ...row, ...changes } : row));
    }, []);

    const tableColumns: ColDef[] = [
        {
            headerName: "",
            colId: "drag",
            rowDrag: true,
            width: 76,
            minWidth: 76,
            maxWidth: 76,
            flex: 0,
            sortable: false,
            resizable: false,
            cellRenderer: () => <Icon name="up-down" size={32} color="#999" />,
        },
        { headerName: "선명", field: "shipName", minWidth: 300 },
        {
            headerName: "Operation", field: "operation",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data.id, { operation: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "MM", field: "mm",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data.id, { mm: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "MO(운항)", field: "mo",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data.id, { mo: e.target.value })} fullWidth />;
            },
        },
        {
            headerName: "MC", field: "mc",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                return <Input value={value ?? ""} onChange={(e) => updateRow(data.id, { mc: e.target.value })} fullWidth />;
            },
        },
        { headerName: "선장", field: "captain" },
        { headerName: "기관장", field: "chiefEngineer" },
        { headerName: "일항사", field: "firstOfficer" },
        { headerName: "이항사", field: "secondOfficer" },
    ];

    return (
        <Layout title="선박별 담당자 등록/수정" favorite={false} activeMenuId="">

            {/* Data Grid */}
            <DataGrid
                columns={tableColumns}
                rowData={tableData}
                onRowDragEnd={(rows) => setTableData(rows as typeof initialData)}
                rowDragManaged={true}
                gridLabel="선박별 담당자 목록"
                topRightButtons={
                    <>
                        <Button variant="outlined">목록</Button>
                        <Button>저장</Button>
                    </>
                }
            />
        </Layout>
    );
}
