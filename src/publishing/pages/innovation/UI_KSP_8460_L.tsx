import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, DataGrid, Divider, Dropdown, Icon, Input, Layout, SearchBox, Space, SummaryCard, Tab, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0 },
    { headerName: "과제번호", field: "taskNo", width: 100, minWidth: 100 },
    { headerName: "지시자", field: "orderer", width: 130, minWidth: 130 },
    { headerName: "지시일자", field: "orderDate", width: 130, minWidth: 130 },
    { headerName: "지시사항(제목)", field: "title", minWidth: 284 },
    { headerName: "분류", field: "category", width: 200, minWidth: 200 },
    { headerName: "주관(팀/본부)", field: "dept", width: 100, minWidth: 100 },
    { headerName: "담당자", field: "assignee", width: 80, minWidth: 80 },
    { headerName: "처리기한", field: "dueDate", width: 130, minWidth: 130 },
    { headerName: "완료일자", field: "endDate", width: 100, minWidth: 100 },
    { headerName: "진행률", field: "progress", width: 100, minWidth: 100 },
    {
        headerName: "상태",
        field: "status",
        minWidth: 80,
        cellRenderer: ({ value }: ICellRendererParams) => {
            if (!value) return null;
            return (
                <span style={{ lineHeight: 1.5, textAlign: "center" }}>
                    {String(value).split("\n").map((line, i, arr) => (
                        <span key={i} style={{ fontSize: i > 0 ? "1.3rem" : undefined, fontWeight: i > 0 ? "600" : "500" }}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                </span>
            );
        },
    },
    { headerName: "다음처리일자", field: "nextActionDate", minWidth: 130 },
    {
        headerName: "비고",
        field: "remark",
        minWidth: 80,
        cellRenderer: ({ value }: ICellRendererParams) => {
            if (value === "누락") return <span className="text-red">{value}</span>;
            return value || null;
        },
    },
];

const dummyData = [
    { no: "10", taskNo: "21-19", orderer: "경영지원본부장", orderDate: "2021-01-21", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "해상인사팀", assignee: "홍길동", dueDate: "2021-04-30", endDate: "2021-04-30", progress: "100%", status: "보고중", nextActionDate: "2022-09-30", remark: "누락" },
    { no: "9", taskNo: "21-12", orderer: "경영지원본부장", orderDate: "2021-01-22", title: "운영자금 확보 또는 선박금융 거래선 확대 방안", category: "경영일반 > 위기대응능력", dept: "재경팀", assignee: "홍길동", dueDate: "2021-20-19", endDate: "2022-11-21", progress: "100%", status: "완료\n(종결)", nextActionDate: "2022-09-30", remark: "누락" },
    { no: "8", taskNo: "21-11", orderer: "경영지원본부장", orderDate: "2021-01-22", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "재경팀", assignee: "홍길동", dueDate: "2021-20-28", endDate: "2022-01-31", progress: "100%", status: "완료\n(종결)", nextActionDate: "2022-09-30", remark: "" },
    { no: "7", taskNo: "21-19", orderer: "경영지원본부장", orderDate: "2021-01-21", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "해상인사팀", assignee: "홍길동", dueDate: "2021-04-30", endDate: "2021-04-30", progress: "100%", status: "보고중", nextActionDate: "2022-09-30", remark: "누락" },
    { no: "6", taskNo: "21-12", orderer: "경영지원본부장", orderDate: "2021-01-22", title: "운영자금 확보 또는 선박금융 거래선 확대 방안", category: "경영일반 > 위기대응능력", dept: "재경팀", assignee: "홍길동", dueDate: "2021-20-19", endDate: "2022-11-21", progress: "100%", status: "완료\n(종결)", nextActionDate: "2022-09-30", remark: "누락" },
    { no: "5", taskNo: "21-11", orderer: "경영지원본부장", orderDate: "2021-01-22", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "재경팀", assignee: "홍길동", dueDate: "2021-20-28", endDate: "2022-01-31", progress: "100%", status: "완료\n(종결)", nextActionDate: "2022-09-30", remark: "" },
    { no: "4", taskNo: "21-19", orderer: "경영지원본부장", orderDate: "2021-01-21", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "해상인사팀", assignee: "홍길동", dueDate: "2021-04-30", endDate: "2021-04-30", progress: "100%", status: "보고중", nextActionDate: "2022-09-30", remark: "누락" },
    { no: "3", taskNo: "21-12", orderer: "경영지원본부장", orderDate: "2021-01-22", title: "운영자금 확보 또는 선박금융 거래선 확대 방안", category: "경영일반 > 위기대응능력", dept: "재경팀", assignee: "홍길동", dueDate: "2021-20-19", endDate: "2022-11-21", progress: "100%", status: "완료\n(종결)", nextActionDate: "2022-09-30", remark: "누락" },
    { no: "2", taskNo: "21-11", orderer: "경영지원본부장", orderDate: "2021-01-22", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "재경팀", assignee: "홍길동", dueDate: "2021-20-28", endDate: "2022-01-31", progress: "100%", status: "완료\n(종결)", nextActionDate: "2022-09-30", remark: "" },
    { no: "1", taskNo: "21-19", orderer: "경영지원본부장", orderDate: "2021-01-21", title: "사고/포상에 대한 회사의 원칙/기준 재정비", category: "경영일반 > 위기대응능력", dept: "해상인사팀", assignee: "홍길동", dueDate: "2021-04-30", endDate: "2021-04-30", progress: "100%", status: "보고중", nextActionDate: "2022-09-30", remark: "누락" },
];

export function UI_KSP_8460_L() {
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState<string>("tab1");

    const taskData1 = [
        { title: "공통", total: 10, ongoing: 0, continuous: 0, completed: 10 },
        { title: "인사교육", total: 22, ongoing: 0, continuous: 0, completed: 22 },
        { title: "재경", total: 8, ongoing: 3, continuous: 0, completed: 5 },
        { title: "가스", total: 9, ongoing: 0, continuous: 0, completed: 9 },
        { title: "케미칼", total: 6, ongoing: 0, continuous: 0, completed: 6 },
        { title: "기획전략", total: 0, ongoing: 0, continuous: 0, completed: 0 },
        { title: "ESG경영", total: 37, ongoing: 0, continuous: 2, completed: 36 },
        { title: "정보기술", total: 3, ongoing: 0, continuous: 1, completed: 2 },
        { title: "선박", total: 9, ongoing: 0, continuous: 1, completed: 8 },
        { title: "안전품질", total: 14, ongoing: 0, continuous: 2, completed: 12 },
        { title: "해상인사", total: 23, ongoing: 1, continuous: 2, completed: 20 },
        { title: "동경", total: 1, ongoing: 0, continuous: 1, completed: 1 },
        { title: "상해", total: 0, ongoing: 0, continuous: 0, completed: 0 },
    ];

    const taskData2 = [
        { title: "경영관리", total: 5, ongoing: 0, continuous: 0, completed: 5 },
        { title: "공무", total: 0, ongoing: 0, continuous: 0, completed: 0 },
        { title: "해무", total: 0, ongoing: 0, continuous: 3, completed: 3 },
        { title: "안품", total: 0, ongoing: 0, continuous: 1, completed: 1 },
    ];

    return (
        <>
            <Layout title="진행과제" activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="기간" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="상태" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 344}>
                                <Dropdown label="소속" options={dummyOptions} fullWidth />
                                <Dropdown options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="대분류" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="소분류" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 380}>
                                <Input label="검색" placeholder="제목 및 담당자로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
                            </SearchBox.Item>
                        </SearchBox.Row>
                    </SearchBox.Content>

                    <SearchBox.Actions>
                        <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                        <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                    </SearchBox.Actions>
                </SearchBox>

                {/* Summary */}
                <Box gap={24}>
                    <Space justify="space-between">
                        <Typography variant="heading-sm">경영혁신과제 진행과제 현황</Typography>
                        <Space size={4}>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>
                                다운로드
                            </Button>
                            <Button variant="outlined" leftIcon={<Icon name="info" size={24} />}>
                                도움말
                            </Button>
                        </Space>
                    </Space>

                    <Tab.Provider value={activeTab} onChange={(val) => setActiveTab(val as string)}>
                        <Layout.Row align-items="center" justify="space-between">
                            <Tab variant="chip" value={activeTab} onChange={(val) => setActiveTab(val as string)}>
                                <Tab.Item value="tab1">각 팀</Tab.Item>
                                <Tab.Item value="tab2">과제번호</Tab.Item>
                            </Tab>
                            <Space size={isMobile ? 0 : 14} separator={!isMobile && (<Divider layout="vertical" size={13} />)} layout={isMobile ? "vertical" : "horizontal"}>
                                <Space size="sm" align="center">
                                    <Space.Item>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">진행과제</Typography>
                                    </Space.Item>
                                    <Space.Item>
                                        <Typography variant="heading-md" as="strong" primary>4</Typography>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                    </Space.Item>
                                </Space>
                                <Space size="sm" align="center">
                                    <Space.Item>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">지속과제</Typography>
                                    </Space.Item>
                                    <Space.Item>
                                        <Typography variant="heading-md" as="strong" primary>8</Typography>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                    </Space.Item>
                                </Space>

                                <Space size="sm" align="center">
                                    <Space.Item>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">종결과제</Typography>
                                    </Space.Item>
                                    <Space.Item>
                                        <Typography variant="heading-md" as="strong" primary>145</Typography>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                    </Space.Item>
                                </Space>

                                <Space size="sm" align="center">
                                    <Space.Item>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">계(건)</Typography>
                                    </Space.Item>
                                    <Space.Item>
                                        <Typography variant="heading-md" as="strong" primary>157</Typography>
                                        <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                    </Space.Item>
                                </Space>
                            </Space>
                        </Layout.Row>

                        <Tab.Panel value="tab1">
                            <SummaryCard.Slider>
                                {taskData1.map((item, index) => (
                                    <SummaryCard
                                        key={`${item.title}-${index}`}
                                        title={item.title}
                                        totalCount={item.total}
                                        ongoingCount={item.ongoing}
                                        continuousCount={item.continuous}
                                        completedCount={item.completed}
                                        onClick={(type) => console.log(item.title, type)}
                                    />
                                ))}
                            </SummaryCard.Slider>
                        </Tab.Panel>

                        <Tab.Panel value="tab2">
                            <SummaryCard.Slider>
                                {taskData2.map((item, index) => (
                                    <SummaryCard
                                        key={`${item.title}-${index}`}
                                        title={item.title}
                                        totalCount={item.total}
                                        ongoingCount={item.ongoing}
                                        continuousCount={item.continuous}
                                        completedCount={item.completed}
                                        onClick={(type) => console.log(item.title, type)}
                                    />
                                ))}
                            </SummaryCard.Slider>
                        </Tab.Panel>
                    </Tab.Provider>
                </Box>

                {/* Data Grid */}
                <DataGrid
                    columns={tableColumns}
                    rowData={dummyData}
                    gridLabel="진행과제 목록"
                    title="진행과제 목록"
                    topRightButtons={<Button>작성</Button>}
                />
            </Layout>
        </>
    );
}
