import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, DateRangePicker, Divider, Dropdown, Icon, Layout, SearchBox } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "TYPE", field: "type", },
    { headerName: "선박명", field: "name", },
];

const tableData = [
    { type: "TOT", name: "전체" },
    { type: "G", name: "전체" },
    { type: "G", name: "XXXXXXX" },
    { type: "G", name: "XXXXXXX" },
    { type: "C", name: "전체" },
    { type: "C", name: "XXXXXXX" },
    { type: "C", name: "XXXXXXX" },
    { type: "C", name: "XXXXXXX" },
    { type: "T", name: "전체" },
    { type: "T", name: "XXXXXXX" },
    { type: "T", name: "XXXXXXX" },
    { type: "TOT", name: "전체" },
    { type: "G", name: "전체" },
    { type: "G", name: "XXXXXXX" },
    { type: "G", name: "XXXXXXX" },
    { type: "C", name: "전체" },
    { type: "C", name: "XXXXXXX" },
    { type: "C", name: "XXXXXXX" },
    { type: "C", name: "XXXXXXX" },
    { type: "T", name: "전체" },
    { type: "T", name: "XXXXXXX" },
    { type: "T", name: "XXXXXXX" },
];

const tableColumns2: ColDef[] = [
    { headerName: "레벨", field: "level", width: 80, minWidth: 80, flex: 0 },
    { headerName: "항목명", field: "name", },
    { headerName: "4월(천원)", field: "apr", },
    { headerName: "5월(천원)", field: "may", },
    { headerName: "6월(천원)", field: "jun", },
    { headerName: "합계(천원)", field: "total", },
];

const tableData2 = [
    { level: "1", name: "해운수입", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "1", name: "해운수입", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "2", name: "운항비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "3", name: "화물비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "3", name: "항비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "3", name: "급수비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "3", name: "통신비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "3", name: "기타운항비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "2", name: "선비", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "2", name: "직접비 배분", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "2", name: "공통비 배분", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "1", name: "일반경비 배분", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
    { level: "1", name: "CB", apr: "999,999,999", may: "999,999,999", jun: "999,999,999", total: "999,999,999" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1330_L() {
    const isMobile = useIsMobile();

    return (
        <Layout title="선박별 예산상세 내역" activeMenuId="">

            <Layout.Row layout={isMobile ? "vertical" : "horizontal"}>
                <Layout.Col width={isMobile ? "100%" : 410} gap={46}>

                    {/* SearchBox */}
                    <SearchBox>
                        <SearchBox.Content>
                            <SearchBox.Row>
                                <SearchBox.Item width={isMobile ? "100%" : 140}>
                                    <Dropdown label="선대" options={dummyOptions} fullWidth />
                                </SearchBox.Item>
                            </SearchBox.Row>

                            <SearchBox.Row>
                                <SearchBox.Item width={isMobile ? "100%" : 140}>
                                    <Dropdown label="선박명" options={dummyOptions} fullWidth />
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
                        gridLabel="선박 목록"
                        infiniteScroll
                        showHeader
                    />
                </Layout.Col>

                <Divider layout={isMobile ? "horizontal" : "vertical"} size={isMobile ? "100%" : 870} spacing={30} />

                <Layout.Col gap={30}>

                    {/* SearchBox */}
                    <SearchBox>
                        <SearchBox.Content>
                            <SearchBox.Row>
                                <SearchBox.Item width={isMobile ? "100%" : 140}>
                                    <Dropdown label="예산 분류" options={dummyOptions} fullWidth />
                                </SearchBox.Item>
                            </SearchBox.Row>

                            <SearchBox.Row>
                                <SearchBox.Item width={isMobile ? "100%" : 140}>
                                    <Dropdown label="연도" options={dummyOptions} fullWidth />
                                </SearchBox.Item>
                                <SearchBox.Item width={isMobile ? "100%" : 140}>
                                    <Dropdown label="조회형태" options={dummyOptions} fullWidth />
                                </SearchBox.Item>
                                <SearchBox.Item width={isMobile ? "100%" : 357}>
                                    <DateRangePicker label="기간" startDate={null} endDate={null} onChange={() => { }} />
                                </SearchBox.Item>
                                <SearchBox.Item width={isMobile ? "100%" : 140}>
                                    <Dropdown label="조회레벨" options={dummyOptions} fullWidth />
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
                        columns={tableColumns2}
                        rowData={tableData2}
                        gridLabel="선박 예산항목 목록"
                        infiniteScroll
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
