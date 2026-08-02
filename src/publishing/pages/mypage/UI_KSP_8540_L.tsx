import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Card, DataGrid, Icon, Layout, Space, Tab, Typography } from "@/publishing/components";

const summary = [
    { icon: "survey", title: "대기", cnt: 6 },
    { icon: "survey", title: "예정", cnt: 12 },
    { icon: "request", title: "진행", cnt: 52 },
    { icon: "education", title: "반려", cnt: 7 },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0 },
    { headerName: "문서번호", field: "docNo", width: 130, minWidth: 130 },
    { headerName: "제목", field: "title", width: 500, minWidth: 500 },
    { headerName: "상신자", field: "name", width: 500, minWidth: 500 },
    { headerName: "상신일", field: "date", width: 200, minWidth: 200 },
    { headerName: "상태", field: "status", width: 100, minWidth: 100 },
    { headerName: "진행경로", field: "path", width: 114, minWidth: 114 },
];

const dummyData1 = [
    { no: "1", docNo: "16-242", title: "2016-09-30", name: "홍길동", date: "2021-04-30", status: "홍은아", path: "2021-04-30" },
];
const dummyData2 = [
    { no: "1", docNo: "16-243", title: "2016-10-30", name: "홍길동", date: "2021-04-30", status: "홍은아", path: "2021-04-30" },
];
const dummyData3 = [
    { no: "1", docNo: "16-244", title: "2016-11-30", name: "홍길동", date: "2021-04-30", status: "홍은아", path: "2021-04-30" },
];
const dummyData4 = [
    { no: "1", docNo: "16-245", title: "2016-12-30", name: "홍길동", date: "2021-04-30", status: "홍은아", path: "2021-04-30" },
];

export function UI_KSP_8540_L() {
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState<string | number>("tab1");

    return (
        <>
            <Layout title="전자결재 현황" extra={(<Button>전자결재 이동</Button>)} activeMenuId="">

                <Layout.Row layout="vertical">
                    {/* Card Grid */}
                    <div className={`card-grid ${isMobile ? "-col-2" : "-col-4"}`}>
                        {summary.map((item, index) => {
                            return (
                                <Card size="lg" key={`${item.title}-${index}`} >
                                    <Space layout="vertical" size={24}>
                                        <Card.Header leftIcon={<Icon name={item.icon} size={20} />}>
                                            <Typography variant="heading-md">{item.title}</Typography>
                                        </Card.Header>

                                        <Card.Body>
                                            <Space size={4} align="baseline" justify="end">
                                                <Typography variant="heading-xl" as="strong" primary style={{ fontSize: "5.0rem", lineHeight: 1 }}>{item.cnt}</Typography>
                                                <Typography variant="heading-sm" as="span" secondary>건</Typography>
                                            </Space>
                                        </Card.Body>
                                    </Space>
                                </Card>
                            );
                        })}
                    </div>
                </Layout.Row>


                <Layout.Row layout="vertical">
                    <Tab variant="chip" value={activeTab} onChange={(val) => setActiveTab(val as string)}>
                        <Tab.Item value="tab1">대기</Tab.Item>
                        <Tab.Item value="tab2">예정</Tab.Item>
                        <Tab.Item value="tab3">진행</Tab.Item>
                        <Tab.Item value="tab4">반려</Tab.Item>
                    </Tab>

                    {/* Data Grid */}
                    <DataGrid
                        columns={tableColumns}
                        rowData={activeTab === "tab1" ? dummyData1 : activeTab === "tab2" ? dummyData2 : activeTab === "tab3" ? dummyData3 : dummyData4}
                        gridLabel="전자결재 현황 목록"
                        title={activeTab === "tab1" ? "대기" : activeTab === "tab2" ? "예정" : activeTab === "tab3" ? "진행" : "반려"}
                    />
                </Layout.Row>
            </Layout>
        </>
    );
}