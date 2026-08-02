import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, Checkbox, DataGrid, DateRangePicker, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";
import { TextCellEditor, SelectCellEditor } from "@/publishing/components/DataGridCellEditors";

type StatusBadgeColor = "red" | "green" | "gray" | "blue";

const getStatusColor = (value: string): StatusBadgeColor => {
    if (["사용", "진행중", "수강 완료"].includes(value)) return "blue";
    if (value === "평가종료") return "gray";
    if (["누락", "미수강"].includes(value)) return "red";
    if (value === "재평가 진행") return "green";
    return "blue";
};

const selectOptions = ["옵션 1", "옵션 2"];

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
    {
        headerName: "번호",
        field: "no",
        width: 80,
        minWidth: 80,
        flex: 0,
        sortable: true,
    },
    {
        headerName: "Input(수정가능)",
        field: "input",
        minWidth: 150,
        sortable: true,
        editable: true,
        cellEditor: TextCellEditor,
    },
    {
        headerName: "Input Subrow(수정가능)",
        field: "inputSubrow",
        minWidth: 250,
        sortable: true,
        editable: true,
        cellEditor: TextCellEditor,
        cellClass: "text-left",
        cellRenderer: ({ value, data }: ICellRendererParams) => {
            if (data?.isSubRow) {
                return (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Icon name="expandable-list" size={24} />
                        {value}
                    </span>
                );
            }
            return value ?? "";
        },
    },
    {
        headerName: "Status",
        field: "status",
        minWidth: 130,
        sortable: true,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={getStatusColor(value)} dot>{value}</Badge>
        ),
    },
    {
        headerName: "Badge",
        field: "badge",
        minWidth: 170,
        sortable: true,
        cellRenderer: ({ value }: ICellRendererParams) => (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {value} <Badge variant="filled" color="blue">일정 초과</Badge>
            </span>
        ),
    },
    {
        headerName: "Select",
        field: "select",
        minWidth: 150,
        sortable: true,
        editable: true,
        cellEditor: SelectCellEditor,
        cellEditorParams: { values: selectOptions },
    },
    {
        headerName: "Button",
        field: "button",
        minWidth: 150,
        sortable: true,
        cellRenderer: ({ value }: ICellRendererParams) => {
            let variant: "solid" | "outlined" | "filled" = "outlined";
            if (value === "하위메뉴추가") variant = "solid";
            else if (value === "현황보기") variant = "filled";
            return (
                <Button variant={variant} size="sm" onClick={() => console.log(`${value} 클릭`)}>
                    {value || "Button"}
                </Button>
            );
        },
    },
];

const initialData = [
    { no: "1", input: "고길동", inputSubrow: "기획전략팀장(SP Leader)", status: "사용", badge: "2023.04.03", select: "옵션 1", button: "하위메뉴추가" },
    { no: "2", input: "박둘리", inputSubrow: "팀원(Team Member)", status: "진행중", badge: "2023.04.06", select: "옵션 2", button: "주소록 선택", isSubRow: true },
    { no: "3", input: "도우너", inputSubrow: "팀원(Team Member)", status: "평가종료", badge: "2023.04.06", select: "옵션 1", button: "현황보기", isSubRow: true },
    { no: "4", input: "김또치", inputSubrow: "기획전략팀장(SP Leader)", status: "누락", badge: "2023.04.06", select: "옵션 1", button: "하위메뉴추가" },
    { no: "5", input: "마이콜", inputSubrow: "기획전략팀장(SP Leader)", status: "재평가 진행", badge: "2023.04.06", select: "옵션 2", button: "주소록 선택" },
    { no: "6", input: "고희동", inputSubrow: "기획전략팀장(SP Leader)", status: "미수강", badge: "2023.04.06", select: "옵션 1", button: "현황보기" },
    { no: "7", input: "고영희", inputSubrow: "기획전략팀장(SP Leader)", status: "수강 완료", badge: "2023.04.06", select: "옵션 2", button: "하위메뉴추가" },
    { no: "8", input: "고길동", inputSubrow: "기획전략팀장(SP Leader)", status: "사용", badge: "2023.04.03", select: "옵션 1", button: "하위메뉴추가" },
    { no: "9", input: "박둘리", inputSubrow: "팀원(Team Member)", status: "진행중", badge: "2023.04.06", select: "옵션 2", button: "주소록 선택", isSubRow: true },
    { no: "10", input: "도우너", inputSubrow: "팀원(Team Member)", status: "평가종료", badge: "2023.04.06", select: "옵션 1", button: "현황보기", isSubRow: true },
    { no: "11", input: "김또치", inputSubrow: "기획전략팀장(SP Leader)", status: "누락", badge: "2023.04.06", select: "옵션 1", button: "하위메뉴추가" },
    { no: "12", input: "마이콜", inputSubrow: "기획전략팀장(SP Leader)", status: "재평가 진행", badge: "2023.04.06", select: "옵션 2", button: "주소록 선택" },
    { no: "13", input: "고희동", inputSubrow: "기획전략팀장(SP Leader)", status: "미수강", badge: "2023.04.06", select: "옵션 1", button: "현황보기" },
    { no: "14", input: "고영희", inputSubrow: "기획전략팀장(SP Leader)", status: "수강 완료", badge: "2023.04.06", select: "옵션 2", button: "하위메뉴추가" },
    { no: "15", input: "고길동", inputSubrow: "기획전략팀장(SP Leader)", status: "사용", badge: "2023.04.03", select: "옵션 1", button: "하위메뉴추가" },
    { no: "16", input: "박둘리", inputSubrow: "팀원(Team Member)", status: "진행중", badge: "2023.04.06", select: "옵션 2", button: "주소록 선택", isSubRow: true },
    { no: "17", input: "도우너", inputSubrow: "팀원(Team Member)", status: "평가종료", badge: "2023.04.06", select: "옵션 1", button: "현황보기", isSubRow: true },
    { no: "18", input: "김또치", inputSubrow: "기획전략팀장(SP Leader)", status: "누락", badge: "2023.04.06", select: "옵션 1", button: "하위메뉴추가" },
    { no: "19", input: "마이콜", inputSubrow: "기획전략팀장(SP Leader)", status: "재평가 진행", badge: "2023.04.06", select: "옵션 2", button: "주소록 선택" },
    { no: "20", input: "고희동", inputSubrow: "기획전략팀장(SP Leader)", status: "미수강", badge: "2023.04.06", select: "옵션 1", button: "현황보기" },
    { no: "21", input: "고영희", inputSubrow: "기획전략팀장(SP Leader)", status: "수강 완료", badge: "2023.04.06", select: "옵션 2", button: "하위메뉴추가" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function SubDefault() {
    const isMobile = useIsMobile();
    const [tableData, setTableData] = useState<typeof initialData>(initialData);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <Layout title="샘플 서브 페이지(Search Box + Data Grid)" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 357}>
                            <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="상세검색" placeholder="제목으로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Input label="게시자" placeholder="게시자를 검색하세요." fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="선명" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>

                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 288}>
                            <Dropdown label="휴양시설 구분" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item label="상세검색">
                            <Checkbox label="내가 속한 현황만 보기" />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : ""}>
                            <Dropdown label="상태" options={dummyOptions} width={isMobile ? "44%" : 140} />
                            <Dropdown options={dummyOptions} width={isMobile ? "55%" : 174} />
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
                columns={tableColumns}
                rowData={tableData}
                onRowDragEnd={(rows) => setTableData(rows as typeof initialData)}
                getRowClass={({ data }) => data?.isSubRow ? "is-sub-row" : undefined}
                isRowSelection={true}
                rowDragManaged={true}
                gridLabel="게시글 목록"
                topRightButtons={
                    <>
                        <Button variant="filled" color="primary" leftIcon={<Icon name="pencil" size={24} color="#005BAA" />}>도움말</Button>
                        <Button variant="solid" color="primary">글쓰기</Button>
                        <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                    </>
                }
            />
        </Layout>
    );
}
