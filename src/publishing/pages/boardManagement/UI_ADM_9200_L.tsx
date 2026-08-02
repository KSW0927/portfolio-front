import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "0" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    { headerName: "게시판ID", field: "boardId", minWidth: 150, flex: 0, },
    { headerName: "게시판 유형", field: "boardType", minWidth: 150, flex: 0, },
    { headerName: "게시판명", field: "boardNm", cellClass: "text-left", flex: 1, },
    { headerName: "담당자", field: "manager", minWidth: 150, flex: 0, },
    { headerName: "공개여부", field: "openYn", minWidth: 150, flex: 0, },
    {
        headerName: "사용여부", field: "useYn", minWidth: 150, flex: 0,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "사용" ? "blue" : "red"} dot>{value}</Badge>
        ),
    },
];

const dummyData = [
    { no: "20", boardId: "XXXX", boardType: "기본", boardNm: "공지사항", manager: "XXX, XXX", openYn: "공개", useYn: "사용" },
    { no: "19", boardId: "XXXX", boardType: "FAQ", boardNm: "FAQ", manager: "XXX(XXX)", openYn: "비공개", useYn: "미사용" },
    { no: "18", boardId: "XXXX", boardType: "Q&A", boardNm: "Q&A", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "17", boardId: "XXXX", boardType: "이미지", boardNm: "사진자료실", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "16", boardId: "XXXX", boardType: "링크", boardNm: "기사", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "15", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "14", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "13", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "12", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "11", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "10", boardId: "XXXX", boardType: "기본", boardNm: "공지사항", manager: "XXX, XXX", openYn: "공개", useYn: "사용" },
    { no: "9", boardId: "XXXX", boardType: "FAQ", boardNm: "FAQ", manager: "XXX(XXX)", openYn: "비공개", useYn: "미사용" },
    { no: "8", boardId: "XXXX", boardType: "Q&A", boardNm: "Q&A", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "7", boardId: "XXXX", boardType: "이미지", boardNm: "사진자료실", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "6", boardId: "XXXX", boardType: "링크", boardNm: "기사", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "5", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "4", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "3", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "2", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
    { no: "1", boardId: "XXXX", boardType: "XXXX", boardNm: "XXXX", manager: "XXX(XXX)", openYn: "XXX", useYn: "XXX" },
];

export function UI_ADM_9200_L() {
    const isMobile = useIsMobile();

    return (
        <Layout title="게시판 목록" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="게시판 유형" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="공개여부" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="사용여부" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 480}>
                            <Dropdown options={dummyOptions} width={240} />
                            <Input fullWidth />
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
                rowData={dummyData}
                gridLabel="자유게시판 목록"
                topRightButtons={
                    <>
                        <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                        <Button>등록</Button>
                    </>
                }
            />
        </Layout>
    );
}
