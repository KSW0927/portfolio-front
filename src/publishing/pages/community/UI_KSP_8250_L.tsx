import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, DateRangePicker, Icon, Input, Layout, SearchBox, Space } from "@/publishing/components";

const tableColumns: ColDef[] = [
    {
        headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0,
        cellRenderer: (params: ICellRendererParams) => params.data.isPinned
            ? <Badge variant="solid" rounded>공지</Badge>
            : params.value,
    },
    {
        headerName: "제목", field: "title", width: 500, minWidth: 500, cellClass: "text-left",
        cellRenderer: (params: ICellRendererParams) => {
            const handleClick = () => console.log("페이지 이동");
            return params.data.isNew
                ? <Space size={4}><Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button> <Icon name="new" size={24} /></Space>
                : <Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button>;
        },
    },
    { headerName: "게시자", field: "name", width: 150, minWidth: 150 },
    { headerName: "게시일", field: "date", width: 150, minWidth: 150 },
    { headerName: "조회수", field: "view", width: 150, minWidth: 150 },
];

const dummyData = [
    { no: "1", title: "2026년 1월 평균환율 안내드립니다.", name: "홍길동", date: "2026-02-30", view: "10", isPinned: true, isNew: true },
    { no: "2", title: "2026년도 안전보건관리 계획 안내", name: "홍길동", date: "2026-02-30", view: "10", isPinned: true, isNew: true },
    { no: "3", title: "항만서비스 휴무일정에 따른(2/13(금)-2/19(목)) 행낭운행 일정 안내", name: "홍길동", date: "2026-02-30", view: "10", isPinned: true, isNew: true },
    { no: "4", title: "항만서비스 휴무일정에 따른(2/13(금)-2/19(목)) 행낭운행 일정 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "5", title: "[산업안전보건위원회] 25년도 4분기 회의 결과 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "6", title: "2026년 연간 사내의 행사 계획 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "7", title: "2025년 근로소득 연말정산 안내(입력기간 : 2026.01.15~2026.01.22)", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "8", title: "급여 공제내역(국민건강보험,장기요양보험,국민연금) 변동 안내 건", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "9", title: "근로기준법 등 게시", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "10", title: "경영정책 Q&A 자료", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "11", title: "2026년 상반기 사내 교육 프로그램 신청 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "12", title: "[산업안전보건위원회] 25년도 4분기 회의 결과 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "13", title: "2026년 연간 사내의 행사 계획 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "14", title: "2025년 근로소득 연말정산 안내(입력기간 : 2026.01.15~2026.01.22)", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "15", title: "급여 공제내역(국민건강보험,장기요양보험,국민연금) 변동 안내 건", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "16", title: "근로기준법 등 게시", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "17", title: "경영정책 Q&A 자료", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "18", title: "2026년 상반기 사내 교육 프로그램 신청 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "19", title: "[산업안전보건위원회] 25년도 4분기 회의 결과 안내", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "20", title: "2026년 연간 사내의 행사 계획 안내", name: "홍길동", date: "2026-02-30", view: "10", isNew: true },
];

const sortedDummyData = [...dummyData].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return Number(b.no) - Number(a.no);
});

export function UI_KSP_8250_L() {
    const isMobile = useIsMobile();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <Layout title="공지사항" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 357}>
                            <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Input label="게시자" placeholder="게시자를 검색하세요." fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="상세검색" placeholder="제목으로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
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
                rowData={sortedDummyData}
                gridLabel="공지사항 목록"
                topRightButtons={
                    <>
                        <Button>작성</Button>
                    </>
                }
            />
        </Layout>
    );
}
