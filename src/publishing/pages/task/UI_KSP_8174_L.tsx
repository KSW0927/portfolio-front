import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, Dropdown, Icon, Input, Layout, SearchBox } from "@/publishing/components";

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
    { headerName: "해당팀", field: "team", minWidth: 150, flex: 0 },
    { headerName: "담당자", field: "assignee", minWidth: 100, flex: 0 },
    { headerName: "업무분류", field: "taskType", flex: 1 },
    { headerName: "업무제목", field: "taskTitle", minWidth: 180, flex: 0 },
    { headerName: "주가구분", field: "cycleType", minWidth: 180, flex: 0 },
    { headerName: "최근 업무일자", field: "recentWorkDate", minWidth: 150, flex: 0 },
    {
        headerName: "다음 업무예정일",
        field: "nextWorkDate",
        minWidth: 180,
        flex: 0,
        cellRenderer: ({ value }: ICellRendererParams) => {
            const BASE_DATE = new Date("2026-06-11");
            const isOverdue = value && new Date(value.replace(/\./g, "-")) < BASE_DATE;
            return (
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    {value} {isOverdue && <Badge variant="filled" color="blue">일정 초과</Badge>}
                </span>
            );
        },
    },
    {
        headerName: "누락여부",
        field: "missingYn",
        minWidth: 150,
        flex: 0,
        cellRenderer: ({ value }: ICellRendererParams) => {
            if (value === "누락") return <span className="text-red">{value}</span>;
            return value || null;
        },
    },
];

const dummyData = [
    { no: "10", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.06.10", missingYn: "" },
    { no: "9", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "" },
    { no: "8", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "" },
    { no: "7", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
    { no: "6", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
    { no: "5", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
    { no: "4", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
    { no: "3", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
    { no: "2", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
    { no: "1", team: "ESG 경영팀", assignee: "홍길동", taskType: "공시업무처리>공시업무>정기공시(분기/반기/사업보고서)", taskTitle: "반기보고서", cycleType: "연간", recentWorkDate: "2026.03.03", nextWorkDate: "2026.09.10", missingYn: "누락" },
];

export function UI_KSP_8174_L() {
    const isMobile = useIsMobile();

    return (
        <Layout title="주기적/반복적 업무" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 344}>
                            <Dropdown label="소속" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="주기" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Input label="담당자" placeholder="담당자 검색" fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="누락여부" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="상세 검색" placeholder="검색어를 입력하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
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
                gridLabel="주기적 반복적 업무 목록"
                topRightButtons={
                    <>
                        <Button>업무 작성</Button>
                    </>
                }
            />
        </Layout>
    );
}
