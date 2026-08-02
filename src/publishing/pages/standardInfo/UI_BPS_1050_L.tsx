import { useMemo } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, Divider, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "포트명", field: "portCode", width: 140, minWidth: 140, flex: 0 },
    { headerName: "윤활유 구분", field: "oilCategory", width: 140, minWidth: 140, flex: 0 },
    { headerName: "윤활유 명", field: "oilType", },
    { headerName: "단가(USD)", field: "unitPriceUsd", width: 140, minWidth: 140, flex: 0 },
    {
        headerName: "사용여부",
        field: "useYn",
        width: 130,
        minWidth: 130,
        flex: 0,
        sortable: true,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "사용" ? "blue" : "red"} dot>{value}</Badge>
        ),
    },
];

const tableData = [
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "MG 420", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "MG 420", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "MG 330", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "MG 5100", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "MG 440", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "ALEXIA 100", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "FUJAIRAH", oilCategory: "M CYL", oilType: "MELINA S30", unitPriceUsd: "999.99$", useYn: "미사용" },
    { portCode: "HOUSTON", oilCategory: "M SYS", oilType: "ARGINA S4 40", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "HOUSTON", oilCategory: "M SYS", oilType: "GSC DCA 50100H", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "HOUSTON", oilCategory: "M SYS", oilType: "GS SB 3006", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "HOUSTON", oilCategory: "G SYS", oilType: "GSP 4040", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "HOUSTON", oilCategory: "G SYS", oilType: "MG 540", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "S'PORE,", oilCategory: "G SYS", oilType: "ALEXIA 40", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "S'PORE,", oilCategory: "G SYS", oilType: "ARGINA S2 40", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "S'PORE,", oilCategory: "G SYS", oilType: "GSC DCA 5040H", unitPriceUsd: "999.99$", useYn: "사용" },
    { portCode: "S'PORE,", oilCategory: "G SYS", oilType: "GSP MDO 4020", unitPriceUsd: "999.99$", useYn: "사용" },
];

const tableColumns2: ColDef[] = [
    {
        headerName: "단가(USD)",
        field: "unitPriceUsd",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Input defaultValue={value} />
        ),
    },
];

const tableData2 = [
    { unitPriceUsd: "9,999" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1050_L() {
    const isMobile = useIsMobile();

    const tableColumns3 = useMemo((): ColDef[] => [
        { headerName: "단가(USD)", field: "unitPriceUsd", },
        { headerName: "수정자", field: "updater" },
        { headerName: "수정일", field: "updateDate", }
    ], []);

    const tableData3 = [
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
        { unitPriceUsd: "9,999", updater: "XXXX", updateDate: "YYYY-MM-DD" },
    ];

    return (
        <Layout title="포트별 윤활유 단가 정보" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="포트 명" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="윤활유 구분" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="사용여부" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 280}>
                            <Input label="윤활유 명" fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>

            <Layout.Row layout={isMobile ? "vertical" : "horizontal"}>
                <Layout.Col style={{ paddingTop: "1.6rem" }}>
                    {/* Data Grid - 윤활유 단가 정보 목록 */}
                    <DataGrid
                        columns={tableColumns}
                        rowData={tableData}
                        gridLabel="윤활유 단가 정보 목록"
                        infiniteScroll
                        showHeader
                    />
                </Layout.Col>

                <Divider layout={isMobile ? "horizontal" : "vertical"} size={isMobile ? "100%" : 843} spacing={30} />

                <Layout.Col gap={14}>
                    {/* Data Grid - 윤활유 단가 변경이력 목록 */}
                    <DataGrid
                        columns={tableColumns2}
                        rowData={tableData2}
                        gridLabel="윤활유 단가 변경이력 목록"
                        infiniteScroll
                        title="유활유 단가 변경이력"
                        topRightButtons={
                            <>
                                <Button>변경</Button>
                            </>
                        }
                    />

                    {/* Data Grid - 윤활유 단가 변경이력 목록 */}
                    <DataGrid
                        columns={tableColumns3}
                        rowData={tableData3}
                        gridLabel="윤활유 단가 변경이력 목록"
                        infiniteScroll
                        showHeader
                        topRightButtons={
                            <>
                                <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                            </>
                        }
                    />
                </Layout.Col>
            </Layout.Row>
        </Layout>
    );
}
