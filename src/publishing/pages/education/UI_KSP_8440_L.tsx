import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, DateRangePicker, Dropdown, Icon, Input, Layout, Modal, SearchBox, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const dummyData = [
    { no: "10", eduNo: "1111", eduCategory: "성희롱 예방 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "미수강", totalEduStatus: "50/100 (50%)" },
    { no: "9", eduNo: "1111", eduCategory: "개인정보 보호법 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "8", eduNo: "1111", eduCategory: "산업안전 보건 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "7", eduNo: "1111", eduCategory: "퇴직연금 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "6", eduNo: "1111", eduCategory: "장애인 인식 개선 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "5", eduNo: "1111", eduCategory: "내부 회계관리 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "4", eduNo: "1111", eduCategory: "사내 재무 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "3", eduNo: "1111", eduCategory: "사내 AI 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "2", eduNo: "1111", eduCategory: "사내 AI 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
    { no: "1", eduNo: "1111", eduCategory: "사내 AI 교육", title: "내부회계관리 제도 교육", instructor: "내부회계관리팀", lectureDate: "2022-01-12", status: "수강 완료", totalEduStatus: "50/100 (50%)" },
];

const tableColumns2: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    { headerName: "사번", field: "empNo" },
    { headerName: "성명", field: "name" },
    { headerName: "본부", field: "division" },
    { headerName: "팀", field: "team" },
    { headerName: "수강일시", field: "lectureDateTime" },
    {
        headerName: "상태",
        field: "status",
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "수강 완료" ? "blue" : "red"} dot>{value}</Badge>
        ),
    },
];

const dummyData2 = [
    { no: "10", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "2020-10-10 10:25", status: "수강 완료" },
    { no: "9", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "8", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "7", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "6", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "5", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "4", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "3", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "2", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
    { no: "1", empNo: "12345", name: "홍길동", division: "영업본부", team: "가스팀", lectureDateTime: "-", status: "미수강" },
];

export function UI_KSP_8440_L() {
    const isMobile = useIsMobile();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const tableColumns: ColDef[] = [
        { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
        { headerName: "교육 번호", field: "eduNo", width: 100, flex: 0, },
        { headerName: "교육 분류", field: "eduCategory", minWidth: 200, flex: 0, },
        {
            headerName: "제목", field: "title", cellClass: "text-left", flex: 1,
            cellRenderer: (params: ICellRendererParams) => {
                const handleClick = () => console.log("페이지 이동");
                return <Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button>;
            },
        },
        { headerName: "강의자", field: "instructor", minWidth: 220, flex: 0, },
        { headerName: "강의일자", field: "lectureDate", minWidth: 200, flex: 0, },
        {
            headerName: "상태",
            field: "status",
            minWidth: 120,
            flex: 0,
            cellClass: "text-left",
            cellRenderer: ({ value }: ICellRendererParams) => (
                <Badge color={value === "수강 완료" ? "blue" : "red"} dot>{value}</Badge>
            ),
        },
        { headerName: "교육현황", field: "totalEduStatus", minWidth: 200, flex: 0, },
        {
            headerName: "현황보기", field: "statusView", minWidth: 200, flex: 0,
            cellRenderer: () => (
                <Button variant="filled" onClick={() => setIsOpenModal(true)}>현황보기</Button>
            ),
        },
    ];

    return (
        <>
            <Layout title="법정교육" activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="교육 분류" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 357}>
                                <DateRangePicker label="강의일자" startDate={new Date()} endDate={new Date()} onChange={() => { }} />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="상태" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 380}>
                                <Input label="강의자" placeholder="제목 및 강의자로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
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
                    gridLabel="법정교육 목록"
                    topRightButtons={
                        <>
                            <Button>교육 등록</Button>
                        </>
                    }
                />
            </Layout>

            {/* Modal - 법정 교육영상 현황 */}
            <Modal size="md" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="법정 교육영상 현황" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>

                    <Layout.Row layout="vertical" gap={8}>
                        <Typography variant="heading-sm">대상 인원</Typography>

                        {/* SearchBox */}
                        <SearchBox>
                            <SearchBox.Content>
                                <SearchBox.Row>
                                    <SearchBox.Item width={isMobile ? "100%" : 344}>
                                        <Dropdown label="소속" options={dummyOptions} fullWidth />
                                        <Dropdown options={dummyOptions} fullWidth />
                                    </SearchBox.Item>
                                    <SearchBox.Item width={isMobile ? "100%" : 140}>
                                        <Dropdown label="상태" options={dummyOptions} fullWidth />
                                    </SearchBox.Item>
                                    <SearchBox.Item width={isMobile ? "100%" : 140}>
                                        <Dropdown label="직책" options={dummyOptions} fullWidth />
                                    </SearchBox.Item>
                                    <SearchBox.Item width={isMobile ? "100%" : 280}>
                                        <Input label="성명" fullWidth />
                                    </SearchBox.Item>
                                </SearchBox.Row>
                            </SearchBox.Content>

                            <SearchBox.Actions>
                                <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                                <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                            </SearchBox.Actions>
                        </SearchBox>
                    </Layout.Row>

                    {/* Data Grid */}
                    <DataGrid
                        columns={tableColumns2}
                        rowData={dummyData2}
                        gridLabel="부서별 교육영상 현황 목록"
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
