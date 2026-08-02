import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Divider, Dropdown, Icon, Input, Layout, SearchBox, Typography } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "항목", field: "item" },
    {
        headerName: "금액(천원)",
        field: "amountKrw",
        cellRenderer: ({ value, data }: ICellRendererParams) => {
            if (data?.isInput) {
                return <Input defaultValue={value ?? ""} onChange={() => { }} />;
            }
            return value ?? "";
        },
    },
];

const tableData1 = [
    { item: "기부금", amountKrw: "12,000", isInput: true },
    { item: "교육훈련비", amountKrw: "115,500", isInput: true },
    { item: "기선원복리-교육훈련", amountKrw: "626,600", isInput: true },
    { item: "유형자산 처분이익(선박)", amountKrw: "14,221,301", isInput: true },
];

const tableData2 = [
    { item: "유형자산 처분이익(선박)", amountKrw: "38,164,985", isInput: true },
];

const tableData3 = [
    { item: "법인세전이익", amountKrw: "78,986,097" },
    { item: "(순)성과이익", amountKrw: "55,795,913" },
    { item: "성과배당율(%)", amountKrw: "12", isInput: true },
    { item: "성과배당급 한도", amountKrw: "6,695,510" },
];

const tableColumns4: ColDef[] = [
    {
        headerName: "항목",
        field: "category",
        headerClass: "header-span-cell",
        rowSpan: ({ data }) => (data?.category === "기준액" ? 3 : 1),
        colSpan: ({ data }) => (data?.isInput ? 2 : 1),
        cellClassRules: {
            "cell-span": ({ data }) => data?.category === "기준액",
            "cell-span-covered": ({ data }) => !data?.category,
        },
        headerComponent: () => <div style={{ whiteSpace: "nowrap", transform: "translateX(600%)" }}>항목</div>,
    },
    {
        headerName: "",
        field: "subItem",
        flex: 1,
    },
    {
        headerName: "금액(천원)",
        field: "amountKrw",
        cellRenderer: ({ value, data }: ICellRendererParams) => {
            if (data?.isInput) {
                return <Input defaultValue={value ?? ""} onChange={() => { }} />;
            }
            return value ?? "";
        },
    },
];

const tableData4 = [
    { category: "기준액", subItem: "임원보수", amountKrw: "199,170" },
    { subItem: "직원급여", amountKrw: "562,240" },
    { subItem: "해상급여", amountKrw: "1,656,300" },
];

const tableData4Footer = [
    { category: "이익 배당률(%)", subItem: "", amountKrw: "280", isInput: true },
];

const tableColumns5: ColDef[] = [
    {
        headerName: "항목",
        field: "category",
        headerClass: "header-span-cell",
        rowSpan: ({ data }) => (data?.category === "이익배당금" ? 4 : 1),
        colSpan: ({ data }) => (data?.isInput ? 2 : 1),
        cellClassRules: {
            "cell-span": ({ data }) => data?.category === "이익배당금",
            "cell-span-covered": ({ data }) => !data?.category,
        },
        headerComponent: () => <div style={{ whiteSpace: "nowrap", transform: "translateX(600%)" }}>항목</div>,
    },
    {
        headerName: "",
        field: "subItem",
        flex: 1,
    },
    {
        headerName: "금액(천원)",
        field: "amountKrw",
        cellRenderer: ({ value, data }: ICellRendererParams) => {
            if (data?.isInput) {
                return <Input defaultValue={value ?? ""} onChange={() => { }} />;
            }
            return value ?? "";
        },
    },
];

const tableData5 = [
    { category: "이익배당금", subItem: "임원", amountKrw: "557,700" },
    { subItem: "직원", amountKrw: "1,574,300" },
    { subItem: "해상", amountKrw: "4,637,700" },
    { subItem: "합계", amountKrw: "6,769,700" },
];

const tableColumns6: ColDef[] = [
    { headerName: "선박", field: "shipName", },
    { headerName: "총액(천원) (%)", field: "totalAmountKrw", }
];

const tableData6 = [
    { shipName: "GAS FREIND", totalAmountKrw: "676,970 (9%)" },
    { shipName: "GAS FREIND", totalAmountKrw: "676,970 (9%)" },
    { shipName: "GAS FREIND", totalAmountKrw: "676,970 (9%)" },
];

const tableData6Footer = [
    { shipName: "총액", totalAmountKrw: "6,769,700 (100%)" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1250_L() {
    const isMobile = useIsMobile();

    return (
        <Layout title="예산 데이터 관리(이익 배당금)" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="연도" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>

            <Layout.Row layout="vertical">
                <Typography variant="heading-sm">성과배당급 한도 계산</Typography>

                <Layout.Row layout={isMobile ? "vertical" : "horizontal"}>
                    {/* Data Grid - 성과배당급 한도 계산 - 가산항목 */}
                    <DataGrid
                        columns={tableColumns}
                        rowData={tableData1}
                        gridLabel="성과배당금 한도 계산 가산항목 목록"
                        infiniteScroll
                        title="가산항목"
                    />

                    <Divider layout={isMobile ? "horizontal" : "vertical"} size={isMobile ? "100%" : 300} spacing={30} />

                    {/* Data Grid - 성과배당급 한도 계산 - 감산항목 */}
                    <DataGrid
                        columns={tableColumns}
                        rowData={tableData2}
                        gridLabel="성과배당금 한도 계산 감산항목 목록"
                        infiniteScroll
                        title="감산항목"
                    />

                    <Divider layout={isMobile ? "horizontal" : "vertical"} size={isMobile ? "100%" : 300} spacing={30} />

                    <Layout.Col gap={14}>
                        {/* Data Grid - 성과배당급 한도 계산 - 성과배당급 한도 */}
                        <DataGrid
                            columns={tableColumns}
                            rowData={tableData3}
                            gridLabel="성과배당금 한도 계산 성과배당급 한도 목록"
                            infiniteScroll
                            title="성과배당급 한도"
                        />
                    </Layout.Col>
                </Layout.Row>
            </Layout.Row>

            <Layout.Row layout="vertical">
                <Typography variant="heading-sm">이익배당금 계산</Typography>

                <Layout.Row layout={isMobile ? "vertical" : "horizontal"}>
                    {/* Data Grid - 이익배당금 계산 - 기준액 */}
                    <DataGrid
                        columns={tableColumns4}
                        rowData={tableData4}
                        footerData={tableData4Footer}
                        title="기준액"
                        gridLabel="이익배당금 계산 기준액 목록"
                        infiniteScroll
                    />

                    <Divider layout={isMobile ? "horizontal" : "vertical"} size={isMobile ? "100%" : 300} spacing={30} />

                    {/* Data Grid - 이익배당금 계산 - 이익 배당금 */}
                    <DataGrid
                        columns={tableColumns5}
                        rowData={tableData5}
                        gridLabel="이익배당금 계산 이익 배당금 목록"
                        infiniteScroll
                        title="이익 배당금"
                        topRightButtons={
                            <>
                                <Button>분배</Button>
                            </>
                        }

                    />

                    <Divider layout={isMobile ? "horizontal" : "vertical"} size={isMobile ? "100%" : 300} spacing={30} />

                    <Layout.Col gap={14}>
                        {/* Data Grid - 이익배당금 계산 - 성과배당급 한도 */}
                        <DataGrid
                            columns={tableColumns6}
                            rowData={tableData6}
                            footerData={tableData6Footer}
                            gridLabel="이익배당금 계산 성과배당급 한도 목록"
                            infiniteScroll
                            topRightButtons={
                                <>
                                    <Button>저장</Button>
                                </>
                            }
                        />
                    </Layout.Col>
                </Layout.Row>
            </Layout.Row>
        </Layout>
    );
}
