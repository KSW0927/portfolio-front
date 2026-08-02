import { useState } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, DateRangePicker, Divider, Dropdown, Icon, Input, Layout, Modal, SearchBox, Table, Textarea, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableData = [
    { shipName: "XXXX", "jan-usd": "1,200", "jan-krw": "1,697,040", "feb-usd": "1,200", "feb-krw": "1,694,400", "mar-usd": "1,350", "mar-krw": "1,908,450", "apr-usd": "1,350", "apr-krw": "1,905,300", "may-usd": "1,500", "may-krw": "2,120,250", "jun-usd": "1,500", "jun-krw": "2,117,250", "jul-usd": "1,400", "jul-krw": "1,978,180", "aug-usd": "1,400", "aug-krw": "1,975,420", "sep-usd": "1,300", "sep-krw": "1,836,290", "oct-usd": "1,300", "oct-krw": "1,833,650", "nov-usd": "1,250", "nov-krw": "1,766,250", "dec-usd": "1,250", "dec-krw": "1,763,750", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "980", "jan-krw": "1,386,054", "feb-usd": "980", "feb-krw": "1,383,900", "mar-usd": "1,050", "mar-krw": "1,484,350", "apr-usd": "1,050", "apr-krw": "1,481,900", "may-usd": "1,100", "may-krw": "1,554,850", "jun-usd": "1,100", "jun-krw": "1,552,650", "jul-usd": "1,080", "jul-krw": "1,525,428", "aug-usd": "1,080", "aug-krw": "1,523,304", "sep-usd": "1,020", "sep-krw": "1,440,378", "oct-usd": "1,020", "oct-krw": "1,438,310", "nov-usd": "1,000", "nov-krw": "1,413,000", "dec-usd": "1,000", "dec-krw": "1,411,000", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "870", "jan-krw": "1,229,310", "feb-usd": "870", "feb-krw": "1,227,420", "mar-usd": "920", "mar-krw": "1,300,040", "apr-usd": "920", "apr-krw": "1,298,160", "may-usd": "960", "may-krw": "1,356,720", "jun-usd": "960", "jun-krw": "1,354,800", "jul-usd": "940", "jul-krw": "1,327,652", "aug-usd": "940", "aug-krw": "1,325,828", "sep-usd": "910", "sep-krw": "1,285,649", "oct-usd": "910", "oct-krw": "1,283,830", "nov-usd": "890", "nov-krw": "1,257,570", "dec-usd": "890", "dec-krw": "1,255,790", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "1,100", "jan-krw": "1,554,850", "feb-usd": "1,100", "feb-krw": "1,552,650", "mar-usd": "1,200", "mar-krw": "1,696,800", "apr-usd": "1,200", "apr-krw": "1,694,400", "may-usd": "1,280", "may-krw": "1,808,880", "jun-usd": "1,280", "jun-krw": "1,806,720", "jul-usd": "1,260", "jul-krw": "1,779,828", "aug-usd": "1,260", "aug-krw": "1,778,148", "sep-usd": "1,180", "sep-krw": "1,666,942", "oct-usd": "1,180", "oct-krw": "1,665,002", "nov-usd": "1,150", "nov-krw": "1,624,950", "dec-usd": "1,150", "dec-krw": "1,623,150", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "760", "jan-krw": "1,073,880", "feb-usd": "760", "feb-krw": "1,072,240", "mar-usd": "810", "mar-krw": "1,144,935", "apr-usd": "810", "apr-krw": "1,143,330", "may-usd": "850", "may-krw": "1,201,475", "jun-usd": "850", "jun-krw": "1,199,775", "jul-usd": "830", "jul-krw": "1,172,837", "aug-usd": "830", "aug-krw": "1,171,591", "sep-usd": "800", "sep-krw": "1,130,320", "oct-usd": "800", "oct-krw": "1,129,040", "nov-usd": "780", "nov-krw": "1,101,540", "dec-usd": "780", "dec-krw": "1,100,580", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "1,200", "jan-krw": "1,697,040", "feb-usd": "1,200", "feb-krw": "1,694,400", "mar-usd": "1,350", "mar-krw": "1,908,450", "apr-usd": "1,350", "apr-krw": "1,905,300", "may-usd": "1,500", "may-krw": "2,120,250", "jun-usd": "1,500", "jun-krw": "2,117,250", "jul-usd": "1,400", "jul-krw": "1,978,180", "aug-usd": "1,400", "aug-krw": "1,975,420", "sep-usd": "1,300", "sep-krw": "1,836,290", "oct-usd": "1,300", "oct-krw": "1,833,650", "nov-usd": "1,250", "nov-krw": "1,766,250", "dec-usd": "1,250", "dec-krw": "1,763,750", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "980", "jan-krw": "1,386,054", "feb-usd": "980", "feb-krw": "1,383,900", "mar-usd": "1,050", "mar-krw": "1,484,350", "apr-usd": "1,050", "apr-krw": "1,481,900", "may-usd": "1,100", "may-krw": "1,554,850", "jun-usd": "1,100", "jun-krw": "1,552,650", "jul-usd": "1,080", "jul-krw": "1,525,428", "aug-usd": "1,080", "aug-krw": "1,523,304", "sep-usd": "1,020", "sep-krw": "1,440,378", "oct-usd": "1,020", "oct-krw": "1,438,310", "nov-usd": "1,000", "nov-krw": "1,413,000", "dec-usd": "1,000", "dec-krw": "1,411,000", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "870", "jan-krw": "1,229,310", "feb-usd": "870", "feb-krw": "1,227,420", "mar-usd": "920", "mar-krw": "1,300,040", "apr-usd": "920", "apr-krw": "1,298,160", "may-usd": "960", "may-krw": "1,356,720", "jun-usd": "960", "jun-krw": "1,354,800", "jul-usd": "940", "jul-krw": "1,327,652", "aug-usd": "940", "aug-krw": "1,325,828", "sep-usd": "910", "sep-krw": "1,285,649", "oct-usd": "910", "oct-krw": "1,283,830", "nov-usd": "890", "nov-krw": "1,257,570", "dec-usd": "890", "dec-krw": "1,255,790", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "1,100", "jan-krw": "1,554,850", "feb-usd": "1,100", "feb-krw": "1,552,650", "mar-usd": "1,200", "mar-krw": "1,696,800", "apr-usd": "1,200", "apr-krw": "1,694,400", "may-usd": "1,280", "may-krw": "1,808,880", "jun-usd": "1,280", "jun-krw": "1,806,720", "jul-usd": "1,260", "jul-krw": "1,779,828", "aug-usd": "1,260", "aug-krw": "1,778,148", "sep-usd": "1,180", "sep-krw": "1,666,942", "oct-usd": "1,180", "oct-krw": "1,665,002", "nov-usd": "1,150", "nov-krw": "1,624,950", "dec-usd": "1,150", "dec-krw": "1,623,150", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
    { shipName: "XXXX", "jan-usd": "760", "jan-krw": "1,073,880", "feb-usd": "760", "feb-krw": "1,072,240", "mar-usd": "810", "mar-krw": "1,144,935", "apr-usd": "810", "apr-krw": "1,143,330", "may-usd": "850", "may-krw": "1,201,475", "jun-usd": "850", "jun-krw": "1,199,775", "jul-usd": "830", "jul-krw": "1,172,837", "aug-usd": "830", "aug-krw": "1,171,591", "sep-usd": "800", "sep-krw": "1,130,320", "oct-usd": "800", "oct-krw": "1,129,040", "nov-usd": "780", "nov-krw": "1,101,540", "dec-usd": "780", "dec-krw": "1,100,580", "cur-total-usd": "99,999", "cur-total-krw": "99,999", "total-usd": "99,999", "total-krw": "99,999" },
];

export function UI_BPS_1200_L() {
    const isMobile = useIsMobile();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const tableColumns = [
        { headerName: "선박", field: "shipName" },
        {
            headerName: "1월", field: "",
            children: [
                {
                    headerName: "USD", field: "jan-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "jan-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "2월", field: "",
            children: [
                {
                    headerName: "USD", field: "feb-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "feb-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "3월", field: "",
            children: [
                {
                    headerName: "USD", field: "mar-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "mar-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "4월", field: "",
            children: [
                {
                    headerName: "USD", field: "apr-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "apr-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "5월", field: "",
            children: [
                {
                    headerName: "USD", field: "may-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "may-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "6월", field: "",
            children: [
                {
                    headerName: "USD", field: "jun-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "jun-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "7월", field: "",
            children: [
                {
                    headerName: "USD", field: "jul-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "jul-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "8월", field: "",
            children: [
                {
                    headerName: "USD", field: "aug-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "aug-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "9월", field: "",
            children: [
                {
                    headerName: "USD", field: "sep-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "sep-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "10월", field: "",
            children: [
                {
                    headerName: "USD", field: "oct-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "oct-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "11월", field: "",
            children: [
                {
                    headerName: "USD", field: "nov-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "nov-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "12월", field: "",
            children: [
                {
                    headerName: "USD", field: "dec-usd", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
                {
                    headerName: "KRW", field: "dec-krw", minWidth: 140,
                    cellRenderer: ({ value }: ICellRendererParams) => {
                        return <Input value={value} onChange={() => { }} fullWidth />;
                    },
                },
            ]
        },
        {
            headerName: "통화 별 합계", field: "",
            children: [
                { headerName: "USD", field: "cur-total-usd", },
                { headerName: "KRW", field: "cur-total-krw", },
            ]
        },
        {
            headerName: "총 합계", field: "",
            children: [
                { headerName: "USD", field: "total-usd", },
                { headerName: "KRW", field: "total-krw", },
            ]
        },
        {
            headerName: "비고", field: "note", minWidth: 280,
            cellRenderer: ({ value }: ICellRendererParams) => {
                return <Input value={value} onChange={() => { }} fullWidth />;
            },
        },
    ];

    return (
        <>
            <Layout title="예산/계획/실적 데이터 관리(선박별)" extra={(<Typography variant="heading-md">2026 평균 예산 기준 환율(USD) : ₩1,414</Typography>)} activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="연도" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="예산 분류" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="예산 항목" options={dummyOptions} fullWidth />
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
                    gridLabel="선박별 비용분배 예산/계획/실적 데이터 목록"
                    infiniteScroll
                    showHeader
                    topRightButtons={
                        <>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                            <Button variant="outlined">양식 다운로드</Button>
                            <Button variant="outlined">엑셀 업로드</Button>
                            <Button variant="filled" onClick={() => { setIsOpenModal(true) }}>복사</Button>
                            <Button>저장</Button>
                        </>
                    }
                />
            </Layout>

            {/* Modal - 데이터 복사 */}
            <Modal size="lg" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="부서별 교육영상 현황" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>
                    <Layout.Row>
                        <Layout.Col gap={8}>
                            <Typography variant="heading-xs">기준 데이터</Typography>

                            {/* Form Table */}
                            <Table variant="horizontal" caption="기준 데이터 입력 양식">
                                <Table.Row>
                                    <Table.Header scope="row" required>구간</Table.Header>
                                    <Table.Cell>
                                        <DateRangePicker dateType="month" startDate={null} endDate={null} onChange={() => { }} />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>예산 분류</Table.Header>
                                    <Table.Cell>
                                        <Dropdown options={dummyOptions} />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">예산 항목</Table.Header>
                                    <Table.Cell>운항비</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">담당팀</Table.Header>
                                    <Table.Cell>영업본부 &gt; 탱커팀</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>
                                        구간 평균 환율(USD)<br />
                                        <Button size="sm">조회</Button>
                                    </Table.Header>
                                    <Table.Cell className="text-center">₩1,414</Table.Cell>
                                </Table.Row>
                            </Table>
                        </Layout.Col>

                        <Divider layout="vertical" size={282} spacing={20} />

                        <Layout.Col gap={8}>
                            <Typography variant="heading-xs">생성 데이터</Typography>

                            {/* Form Table */}
                            <Table variant="horizontal" caption="생성 데이터 입력 양식">
                                <Table.Row>
                                    <Table.Header scope="row" required>구간</Table.Header>
                                    <Table.Cell>
                                        <DateRangePicker dateType="month" startDate={null} endDate={null} onChange={() => { }} />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">예산 분류</Table.Header>
                                    <Table.Cell>예산/계획/실적</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">예산 항목</Table.Header>
                                    <Table.Cell>운항비</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">담당팀</Table.Header>
                                    <Table.Cell>영업본부 &gt; 탱커팀</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>
                                        구간 평균 환율(USD)<br />
                                        <Button size="sm">조회</Button>
                                    </Table.Header>
                                    <Table.Cell className="text-center">₩1,414</Table.Cell>
                                </Table.Row>
                            </Table>
                        </Layout.Col>
                    </Layout.Row>

                    <Layout.Row>

                        {/* Form Table */}
                        <Table variant="horizontal" caption="비고 입력 양식">
                            <Table.Row>
                                <Table.Header scope="row">비고</Table.Header>
                                <Table.Cell>
                                    <Textarea fullWidth />
                                </Table.Cell>
                            </Table.Row>
                        </Table>
                    </Layout.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button>생성</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
