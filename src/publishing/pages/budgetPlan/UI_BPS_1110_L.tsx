import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, DataGrid, Dropdown, Icon, Layout, SearchBox, Space, Typography } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "분류1", field: "category1" },
    { headerName: "분류2", field: "category2", },
    { headerName: "분류3", field: "category3", },
    { headerName: "분류4", field: "category4", },
    { headerName: "담당 본부", field: "regDept", },
    { headerName: "담당 팀", field: "inputCurrency", },
    { headerName: "계획입력완료일", field: "planInputDate", },
    { headerName: "자료최초등록일", field: "dataFirstRegDate", },
    { headerName: "자료최초등록일", field: "dataLastRegDate", },
];

const tableData = [
    { category1: "수입", category2: "영업수입", category3: "수송량", category4: "-", regDept: "LPG팀", inputCurrency: "USD", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "수송량", category4: "-", regDept: "탱커팀", inputCurrency: "USD", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "수송량", category4: "-", regDept: "캐미컬팀", inputCurrency: "USD", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "해운수입", category4: "-", regDept: "영업본부", inputCurrency: "USD", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "연료비", category4: "-", regDept: "영업본부", inputCurrency: "USD", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-02-15" },
    { category1: "수입", category2: "영업수입", category3: "항비", category4: "-", regDept: "영업본부", inputCurrency: "KRW", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-18" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", regDept: "영업본부", inputCurrency: "KRW", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", regDept: "해사관리1팀", inputCurrency: "KRW", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", regDept: "해사관리1팀", inputCurrency: "KRW", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", regDept: "안전운항관리1팀", inputCurrency: "KRW", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", regDept: "안전운항관리2팀", inputCurrency: "KRW", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
    { category1: "수입", category2: "영업수입", category3: "대선료", category4: "-", regDept: "영업본부", inputCurrency: "USD", planInputDate: "2026-03-31", dataFirstRegDate: "2026-01-10", dataLastRegDate: "2026-03-20" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1110_L() {
    const isMobile = useIsMobile();
    return (
        <Layout title="예산 편성 진행 현황 모니터링" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="연도" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 344}>
                            <Dropdown label="담당 팀" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth disabled />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>


            <Layout.Row>
                {/* Information */}
                <Box gap={24} variant={isMobile ? "info" : "default"} size={isMobile ? "lg" : ""}>
                    <Space layout={isMobile ? "vertical" : "horizontal"} justify="space-between">
                        <Space.Item size={14}>
                            <Space.Item>
                                <Typography variant="body-lg" as="span" weight="semibold" primary>평균 기준 환율(USD) :</Typography>
                                <Typography variant="body-lg" as="span"> : ₩1,414</Typography>
                            </Space.Item>
                            <Space.Item>
                                <Typography variant="body-lg" as="span" weight="semibold" primary>제출상태 :</Typography>
                                <Typography variant="body-lg" as="span"> : 제출</Typography>
                            </Space.Item>
                        </Space.Item>

                        <Space.Item size="sm">
                            <Button>예산 특이사항 관리</Button>
                            <Button>팀별 제출 관리</Button>
                            <Button>검토</Button>
                        </Space.Item>
                    </Space>
                </Box>
            </Layout.Row>

            {/* Data Grid */}
            <DataGrid
                columns={tableColumns}
                rowData={tableData}
                gridLabel="예산 편성 진행 현황 목록"
                infiniteScroll
                showHeader
                topRightButtons={
                    <>
                        <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                    </>
                }
            />
        </Layout>
    );
}
