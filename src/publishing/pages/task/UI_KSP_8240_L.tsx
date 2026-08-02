import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, DateRangePicker, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    { headerName: "처리상태", field: "processStatus", },
    {
        headerName: "지원 요청명", field: "requestName",
        cellRenderer: (params: ICellRendererParams) => {
            const handleClick = () => console.log("페이지 이동");
            return <Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button>;
        },
    },
    { headerName: "요청유형", field: "requestType", },
    { headerName: "요청자", field: "requester", },
    { headerName: "요청자 소속", field: "requesterDept", },
    { headerName: "요청일", field: "requestDate", },
    { headerName: "담당자", field: "assignee", },
    { headerName: "접수일", field: "receiptDate", },
    { headerName: "완료 예정일", field: "expectedDate", },
    { headerName: "완료일", field: "completionDate", },
];

const dummyData = [
    { no: 10, processStatus: "처리완료", requestName: "수정요청", requestType: "오류", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 9, processStatus: "처리중", requestName: "수정요청", requestType: "자료추출", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 8, processStatus: "접수대기", requestName: "수정요청", requestType: "수동처리", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 7, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 6, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 5, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 4, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 3, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 2, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
    { no: 1, processStatus: "접수완료", requestName: "수정요청", requestType: "문의", requester: "홍길동", requesterDept: "기획관리본부 > ESG경영", requestDate: "2023.03.03", assignee: "홍길동", receiptDate: "2023.03.03", expectedDate: "2023.03.03", completionDate: "2023.03.03" },
];


export function UI_KSP_8240_L() {
    const isMobile = useIsMobile();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <Layout title="전산 작업 요청" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="처리상태" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="요청유형" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 344}>
                            <Dropdown label="소속" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="상세검색" placeholder="지원 요청명, 요청자, 담당자로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
                        </SearchBox.Item>
                    </SearchBox.Row>

                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 357}>
                            <DateRangePicker label="요청일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 357}>
                            <DateRangePicker label="완료일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
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
                gridLabel="전산 작업 요청 목록"
                topRightButtons={
                    <>
                        <Button>작성</Button>
                    </>
                }
            />
        </Layout>
    );
}
