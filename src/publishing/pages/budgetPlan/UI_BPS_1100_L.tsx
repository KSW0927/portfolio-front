import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Dropdown, Icon, Layout, Modal, SearchBox, Space, Table } from "@/publishing/components";
import { useState } from "react";

const tableColumns: ColDef[] = [
    { headerName: "연도", field: "year" },
    { headerName: "편성 종류", field: "planType" },
    { headerName: "예산편성 제목", field: "planTitle" },
    { headerName: "기준 환율(USD)", field: "baseExchangeRate" },
    { headerName: "최종 등록일", field: "lastRegDate" },
    {
        headerName: "관리",
        field: "action",
        minWidth: 150,
        sortable: true,
        cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.planType === "입력 완료" ? (
                <Space size="sm">
                    <Button variant="outlined" size="sm" onClick={() => { }}>입력 완료</Button>
                    <Button variant="outlined" size="sm" onClick={() => { }}>확정</Button>
                    <Button variant="outlined" size="sm" onClick={() => { }}>마감</Button>
                </Space>
            ) : null;
        },
    },
];

const tableData = [
    { year: "2026", planType: "입력 완료", planTitle: "2026년 사업예산", baseExchangeRate: "₩9,999", lastRegDate: "YYYY-MM-DD" },
    { year: "2025", planType: "마감", planTitle: "2025년 사업예산", baseExchangeRate: "₩9,999", lastRegDate: "YYYY-MM-DD" },
    { year: "2024", planType: "마감", planTitle: "2024년 사업예산", baseExchangeRate: "₩9,999", lastRegDate: "YYYY-MM-DD" },
    { year: "2023", planType: "마감", planTitle: "2023년 사업예산", baseExchangeRate: "₩9,999", lastRegDate: "YYYY-MM-DD" },
    { year: "2022", planType: "마감", planTitle: "2022년 사업예산", baseExchangeRate: "₩9,999", lastRegDate: "YYYY-MM-DD" },
];

const tableColumns2: ColDef[] = [
    { headerName: "예산 항목", field: "account" },
    { headerName: "1월(천원)", field: "jan" },
    { headerName: "2월(천원)", field: "feb" },
    { headerName: "3월(천원)", field: "mar" },
    { headerName: "4월(천원)", field: "apr" },
    { headerName: "5월(천원)", field: "may" },
    { headerName: "6월(천원)", field: "jun" },
    { headerName: "7월(천원)", field: "jul" },
    { headerName: "8월(천원)", field: "aug" },
    { headerName: "9월(천원)", field: "sep" },
    { headerName: "10월(천원)", field: "oct" },
    { headerName: "11월(천원)", field: "nov" },
    { headerName: "12월(천원)", field: "dec" },
    { headerName: "총합(천원)", field: "total" },
];

const tableData2 = [
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
    { account: "XXXX", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", jun: "99,999", jul: "99,999", aug: "99,999", sep: "99,999", oct: "99,999", nov: "99,999", dec: "99,999", total: "999,999" },
];

const monthFields = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "total"] as const;

const toNum = (val: string) => Number(val.replace(/,/g, "")) || 0;
const fmt = (n: number) => n.toLocaleString();

const tableData2Footer = [{
    account: "총합",
    ...Object.fromEntries(
        monthFields.map(f => [f, fmt(tableData2.reduce((sum, row) => sum + toNum(row[f]), 0))])
    ),
}];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1100_L() {
    const isMobile = useIsMobile();
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <Layout title="사업예산 일정관리" activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="연도" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="편성종류" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                        </SearchBox.Row>
                    </SearchBox.Content>

                    <SearchBox.Actions>
                        <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                        <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                    </SearchBox.Actions>
                </SearchBox>

                {/* Data Grid - 사업예산 일정 목록 */}
                <DataGrid
                    columns={tableColumns}
                    rowData={tableData}
                    gridLabel="사업예산 일정 목록"
                    infiniteScroll
                    showHeader
                    topRightButtons={
                        <>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                            <Button onClick={() => setIsOpenModal(true)}>생성</Button>
                        </>
                    }
                />

                {/* Data Grid - 사업예산 목록 */}
                <DataGrid
                    columns={tableColumns2}
                    rowData={tableData2}
                    gridLabel="사업예산 목록"
                    infiniteScroll
                    title="전체 월별 예산 조회"
                    footerData={tableData2Footer}
                    topRightButtons={
                        <>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                            <Button>USD</Button>
                            <Button>KRW</Button>
                        </>
                    }
                />
            </Layout>

            {/* Modal - 사업예산 일정 추가 */}
            <Modal size="sm" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="사업예산 일정 추가" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>
                    <Table variant="horizontal" caption="사업예산 일정">
                        <Table.Row>
                            <Table.Header scope="row">연도</Table.Header>
                            <Table.Cell>2027</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">제목</Table.Header>
                            <Table.Cell>2027년 사업예산</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">평균 기준 환율(USD)</Table.Header>
                            <Table.Cell>₩1,414</Table.Cell>
                        </Table.Row>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button>추가</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
