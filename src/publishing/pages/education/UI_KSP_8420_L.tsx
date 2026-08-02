import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, DateRangePicker, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
    {
        headerName: "평가자", field: "evaluator", flex: 0,
        cellRenderer: (params: ICellRendererParams) => {
            const handleClick = () => console.log("페이지 이동");
            return <Button variant="text" size="lg" onClick={handleClick}>{params.value}</Button>;
        },
    },
    { headerName: "최근 평가일자", field: "recentEvalDate", flex: 0, },
    { headerName: "평가완료 예정일자", field: "evalDueDate", flex: 0, },
    { headerName: "피평가자 소속", field: "evaluateeDept", flex: 0, },
    { headerName: "피평가자", field: "evaluatee", flex: 0, },
    {
        headerName: "평가 종료 여부",
        field: "evalEndYn",
        width: 120, flex: 0,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "진행중" ? "blue" : "gray"} dot>{value}</Badge>
        ),
    },
    {
        headerName: "누락상태",
        field: "missingStatus",
        width: 120, flex: 0,
        cellClass: "text-left",
        cellRenderer: ({ value }: ICellRendererParams) => (
            value === "누락" ? (
                <Badge color="red" dot>{value}</Badge>
            ) : "-"
        ),
    },
    { headerName: "평가 결과", field: "evalResult", flex: 1 },
];

const dummyData = [
    { no: "20", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "동경사무소", evaluatee: "홍길동(B12345)", evalEndYn: "진행중", missingStatus: "누락", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "19", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "싱가포르지사", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "18", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "17", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "16", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "15", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "14", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "13", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "12", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "11", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "10", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "동경사무소", evaluatee: "홍길동(B12345)", evalEndYn: "진행중", missingStatus: "누락", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "9", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "싱가포르지사", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "8", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "7", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "6", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "5", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "4", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "3", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "2", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
    { no: "1", evaluator: "홍길동(B12345)", recentEvalDate: "2020-10-10", evalDueDate: "2020-11-11", evaluateeDept: "기획전략팀", evaluatee: "홍길동(B12345)", evalEndYn: "평가종료", missingStatus: "", evalResult: "현재 담당업무에 대하여 모두 ‘상’ 평가로 해당 업무 종료" },
];

export function UI_KSP_8420_L() {
    const isMobile = useIsMobile();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <Layout title="업무숙련도 평가 내역" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 344}>
                            <Dropdown label="소속" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="평가 종료 여부" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="누락 상태" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 357}>
                            <DateRangePicker label="평가일자" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="이름검색" placeholder="이름으로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
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
                gridLabel="업무숙련도 평가 내역 목록"
            />
        </Layout>
    );
}
