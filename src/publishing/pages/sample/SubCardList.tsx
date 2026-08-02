import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Card, DataGrid, DateRangePicker, Icon, Layout, SearchBox, Space, Typography } from "@/publishing/components";


const dummyData = [
    { no: 20, idNo: "D12301", name: "홍길동01", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 44, tel: "010-1010-1011", email: "kss.hw@kssline.com", date: "2026.01.20" },
    { no: 19, idNo: "D12302", name: "홍길동02", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 45, tel: "010-1010-1012", email: "kss.hw@kssline.com", date: "2026.01.19" },
    { no: 18, idNo: "D12303", name: "홍길동03", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 46, tel: "010-1010-1013", email: "kss.hw@kssline.com", date: "2026.01.18" },
    { no: 17, idNo: "D12304", name: "홍길동04", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 47, tel: "010-1010-1014", email: "kss.hw@kssline.com", date: "2026.01.17" },
    { no: 16, idNo: "D12305", name: "홍길동05", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 48, tel: "010-1010-1015", email: "kss.hw@kssline.com", date: "2026.01.16" },
    { no: 15, idNo: "D12306", name: "홍길동06", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 49, tel: "010-1010-1016", email: "kss.hw@kssline.com", date: "2026.01.15" },
    { no: 14, idNo: "D12307", name: "홍길동07", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 50, tel: "010-1010-1017", email: "kss.hw@kssline.com", date: "2026.01.14" },
    { no: 13, idNo: "D12308", name: "홍길동08", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 51, tel: "010-1010-1018", email: "kss.hw@kssline.com", date: "2026.01.13" },
    { no: 12, idNo: "D12309", name: "홍길동09", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "남", age: 52, tel: "010-1010-1019", email: "kss.hw@kssline.com", date: "2026.01.12" },
    { no: 11, idNo: "D12310", name: "홍길동10", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 53, tel: "010-1010-1021", email: "kss.hw@kssline.com", date: "2026.01.11" },
    { no: 10, idNo: "D12311", name: "홍길동11", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 54, tel: "010-1010-1022", email: "kss.hw@kssline.com", date: "2026.01.10" },
    { no: 9, idNo: "D12312", name: "홍길동12", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 55, tel: "010-1010-1023", email: "kss.hw@kssline.com", date: "2026.01.09" },
    { no: 8, idNo: "D12313", name: "홍길동13", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 56, tel: "010-1010-1024", email: "kss.hw@kssline.com", date: "2026.01.08" },
    { no: 7, idNo: "D12314", name: "홍길동14", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 57, tel: "010-1010-1025", email: "kss.hw@kssline.com", date: "2026.01.07" },
    { no: 6, idNo: "D12315", name: "홍길동15", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 58, tel: "010-1010-1026", email: "kss.hw@kssline.com", date: "2026.01.06" },
    { no: 5, idNo: "D12316", name: "홍길동16", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 59, tel: "010-1010-1027", email: "kss.hw@kssline.com", date: "2026.01.05" },
    { no: 4, idNo: "D12317", name: "홍길동17", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 60, tel: "010-1010-1028", email: "kss.hw@kssline.com", date: "2026.01.04" },
    { no: 3, idNo: "D12318", name: "홍길동18", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 61, tel: "010-1010-1029", email: "kss.hw@kssline.com", date: "2026.01.03" },
    { no: 2, idNo: "D12319", name: "홍길동19", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 62, tel: "010-1010-1030", email: "kss.hw@kssline.com", date: "2026.01.02" },
    { no: 1, idNo: "D12320", name: "홍길동20", pos: "과장", dept: "해외운영본부", team: "물류운영팀", sex: "여", age: 63, tel: "010-1010-1031", email: "kss.hw@kssline.com", date: "2026.01.01" },
];

export function SubCardList() {
    const isMobile = useIsMobile();
    const [doubleRange, setDoubleRange] = useState<[Date | null, Date | null]>([null, null]);
    const [start, end] = doubleRange;

    const tableColumns: ColDef[] = [
        { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0 },
        { headerName: "사번", field: "idNo", minWidth: isMobile ? 120 : 100, sortable: true },
        { headerName: "성명", field: "name", minWidth: isMobile ? 120 : 100, sortable: true },
        { headerName: "직책", field: "pos", minWidth: isMobile ? 120 : 100, sortable: true },
        { headerName: "본부", field: "dept", minWidth: 150, sortable: true },
        { headerName: "팀", field: "team", minWidth: 150, sortable: true },
        { headerName: "성별", field: "sex", minWidth: 80, sortable: true },
        { headerName: "나이", field: "age", minWidth: 80, sortable: true },
        { headerName: "전화번호", field: "tel", minWidth: 150, sortable: true },
        { headerName: "이메일", field: "email", minWidth: 214, sortable: true },
        { headerName: "등록일", field: "date", minWidth: isMobile ? 120 : 100, sortable: true },
    ];

    {/* Card List */ }
    const cardListContent = (
        <div className="card-list-wrap" >
            <div className="card-list">
                <Card variant="light" size="sm" layout="horizontal">
                    <Card.Body gap={8}>
                        <Typography variant={isMobile ? "heading-xs" : "heading-sm"}>핸드폰 연락처 정보 모아보기</Typography>
                        <Typography variant="body-md" secondary>인사정보 DATA</Typography>
                    </Card.Body>
                    <Card.Actions>
                        <Button size="sm" variant="outlined">보기</Button>
                    </Card.Actions>
                </Card>

                <Card variant="light" size="sm" layout="horizontal">
                    <Card.Body gap={8}>
                        <Typography variant={isMobile ? "heading-xs" : "heading-sm"}>핸드폰 연락처 정보 모아보기</Typography>
                        <Typography variant="body-md" secondary>인사정보 DATA</Typography>
                    </Card.Body>
                    <Card.Actions>
                        <Button size="sm" variant="outlined">보기</Button>
                    </Card.Actions>
                </Card>

                <Card variant="light" size="sm" layout="horizontal">
                    <Card.Body gap={8}>
                        <Typography variant={isMobile ? "heading-xs" : "heading-sm"}>핸드폰 연락처 정보 모아보기</Typography>
                        <Typography variant="body-md" secondary>인사정보 DATA</Typography>
                    </Card.Body>
                    <Card.Actions>
                        <Button size="sm" variant="outlined">보기</Button>
                    </Card.Actions>
                </Card>

                <Card variant="light" size="sm" layout="horizontal">
                    <Card.Body gap={8}>
                        <Typography variant={isMobile ? "heading-xs" : "heading-sm"}>핸드폰 연락처 정보 모아보기</Typography>
                        <Typography variant="body-md" secondary>인사정보 DATA</Typography>
                    </Card.Body>
                    <Card.Actions>
                        <Button size="sm" variant="outlined">보기</Button>
                    </Card.Actions>
                </Card>
            </div>

            <Button size="lg" fullWidth style={{ flexShrink: 0 }}>신규 비정형 DATA 만들기</Button>
        </div>
    );

    const rightContent = (
        <Box variant="inner" gap={14}>
            <Typography variant="heading-sm">핸드폰 연락처 정보 모아보기</Typography>

            <Space layout="vertical" size={isMobile ? 30 : 14}>
                {/* Search Box */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 357}>
                                <DateRangePicker label="조회일자" startDate={start} endDate={end} onChange={(dates) => setDoubleRange(dates)} />
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
                    gridLabel="예산 등록 담당 부서 목록"
                    topRightButtons={
                        <>
                            <Button variant="solid" color="primary">수정</Button>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                        </>
                    }
                />
            </Space>
        </Box>
    );

    return (
        <Layout title="샘플 서브 페이지(Card List)" activeMenuId="">
            <Box className={isMobile ? "-square" : ""}>
                {!isMobile ? (
                    <Layout.Row>
                        <Layout.Col width={360} style={{ position: "relative" }}>
                            {cardListContent}
                        </Layout.Col>

                        <Layout.Col>
                            {rightContent}
                        </Layout.Col>
                    </Layout.Row>
                ) : (
                    <Layout.Row layout="vertical" gap={30}>
                        {cardListContent}
                        {rightContent}
                    </Layout.Row>
                )}
            </Box>
        </Layout >
    );
}