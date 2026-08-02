import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, DateRangePicker, Icon, Input, Layout, SearchBox, Space } from "@/publishing/components";

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    {
        headerName: "제목", field: "title", cellClass: "text-left", flex: 1,
        cellRenderer: (params: ICellRendererParams) => {
            const handleClick = () => console.log("페이지 이동");
            return params.data.isNew
                ? <Space size={4}><Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button> <Icon name="new" size={24} /></Space>
                : <Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button>;
        },
    },
    { headerName: "게시자", field: "name", width: 150, minWidth: 150, flex: 0, },
    { headerName: "게시일", field: "date", width: 150, minWidth: 150, flex: 0, },
    { headerName: "조회수", field: "view", width: 150, minWidth: 150, flex: 0, },
];

const dummyData = [
    { no: "20", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10", isNew: true },
    { no: "19", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10", isNew: true },
    { no: "18", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "17", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "16", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "15", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "14", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "13", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "12", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "11", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "10", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "9", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "8", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "7", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "6", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "5", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "4", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "3", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "2", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
    { no: "1", title: "업무에 유용한 사이트 및 어플", name: "홍길동", date: "2026-02-30", view: "10" },
];

export function UI_KSP_8260_L() {
    const isMobile = useIsMobile();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <Layout title="자유게시판" activeMenuId="">

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
                rowData={dummyData}
                gridLabel="자유게시판 목록"
                topRightButtons={
                    <>
                        <Button>작성</Button>
                    </>
                }
            />
        </Layout>
    );
}
