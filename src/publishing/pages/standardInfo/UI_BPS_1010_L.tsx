import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, Dropdown, Icon, Layout, SearchBox } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "분류1", field: "category1", minWidth: 150, flex: 0 },
    { headerName: "분류2", field: "category2", minWidth: 150, flex: 0 },
    { headerName: "분류3", field: "category3", minWidth: 150, flex: 0 },
    { headerName: "분류4", field: "category4", minWidth: 150, flex: 0 },
    { headerName: "담당 팀", field: "chargeTeam", cellClass: "text-left", flex: 1, },
    { headerName: "등록단위", field: "regUnit", minWidth: 150, flex: 0 },
    { headerName: "분배여부", field: "distYn", minWidth: 150, flex: 0 },
    {
        headerName: "사용여부",
        field: "useYn",
        minWidth: 150,
        flex: 0,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "사용" ? "blue" : "red"} dot>{value}</Badge>
        ),
    },
];

const tableData = [
    { category1: "수입", category2: "영업수입", category3: "수송량", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 케미컬 팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "해운수입", category4: "-", chargeTeam: "영업 본부 > 케미컬 팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "연료비", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "항비", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 케미컬 팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", chargeTeam: "영업 본부 > 케미컬 팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "비용", category3: "운항비", category4: "화물비", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "비용", category3: "운항비", category4: "연료비", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "비용", category3: "운항비", category4: "항비", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "영업수입", category3: "수송량", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 케미컬 팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "해운수입", category4: "-", chargeTeam: "영업 본부 > 케미컬 팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "연료비", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "항비", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 케미컬 팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", chargeTeam: "영업 본부 > 케미컬 팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "분배", useYn: "사용" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", chargeTeam: "영업 본부 > 탱커팀, 영업 본부 > 가스팀", regUnit: "등록항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "영업수입", category3: "기타운항비", category4: "-", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "비용", category3: "운항비", category4: "화물비", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "비용", category3: "운항비", category4: "연료비", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
    { category1: "수입", category2: "비용", category3: "운항비", category4: "항비", chargeTeam: "-", regUnit: "집계항목", distYn: "미분배", useYn: "미사용" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1010_L() {
    const isMobile = useIsMobile();

    return (
        <Layout title="예산기준정보 체크리스트" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        {isMobile ? (
                            <>
                                <SearchBox.Item width="100%">
                                    <Dropdown label="예산 항목" options={dummyOptions} fullWidth />
                                    <Dropdown options={dummyOptions} fullWidth disabled />
                                </SearchBox.Item>
                                <SearchBox.Item width="100%">
                                    <Dropdown options={dummyOptions} fullWidth disabled />
                                    <Dropdown options={dummyOptions} fullWidth disabled />
                                </SearchBox.Item>
                            </>
                        ) : (
                            <SearchBox.Item width={584}>
                                <Dropdown label="예산 항목" options={dummyOptions} fullWidth />
                                <Dropdown options={dummyOptions} fullWidth disabled />
                                <Dropdown options={dummyOptions} fullWidth disabled />
                                <Dropdown options={dummyOptions} fullWidth disabled />
                            </SearchBox.Item>
                        )}
                        <SearchBox.Item width={isMobile ? "100%" : 288}>
                            <Dropdown label="담당 팀" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth disabled />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="등록단위" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="분배여부" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="사용여부" options={dummyOptions} fullWidth />
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
                gridLabel="예산기준정보 체크리스트 목록"
                topRightButtons={
                    <>
                        <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                    </>
                }
            />
        </Layout>
    );
}
