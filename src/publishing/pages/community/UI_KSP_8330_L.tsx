import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    { headerName: "선명", field: "shipName", minWidth: 300 },
    { headerName: "Operation", field: "operation" },
    { headerName: "MM", field: "mm" },
    { headerName: "MO(운항)", field: "mo" },
    { headerName: "MC", field: "mc" },
    { headerName: "선장", field: "captain" },
    { headerName: "기관장", field: "chiefEngineer" },
    { headerName: "일항사", field: "firstOfficer" },
    { headerName: "이항사", field: "secondOfficer" },
];

const tableData = Array.from({ length: 20 }, (_, i) => ({
    no: String(20 - i), shipName: "GTPO (GAS POWER)", operation: "홍길동", mm: "고길동", mo: "나길동", mc: "다길동", captain: "라길동", chiefEngineer: "마길동", firstOfficer: "바길동", secondOfficer: "차길동",
}));

export function UI_KSP_8330_L() {
    const isMobile = useIsMobile();

    return (
        <Layout title="선박별 담당자" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="선명" value="all" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="검색" placeholder="담당자를 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
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
                gridLabel="선박별 담당자 목록"
                topRightButtons={
                    <>
                        <Button>담당자 수정</Button>
                    </>
                }
            />
        </Layout>
    );
}
