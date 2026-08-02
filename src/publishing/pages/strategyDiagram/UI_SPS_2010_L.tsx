import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Divider, Dropdown, Icon, Input, Layout, Modal, SearchBox, Space, Tab, Table, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const tableColumns = [
    { headerName: "본부", field: "hq" },
    { headerName: "팀", field: "team" },
];

const tableData = Array.from({ length: 10 }, () => ({
    hq: "XXXXX", team: "XXX"
}));

export function UI_SPS_2010_L() {
    const isMobile = useIsMobile();
    const [activeStatus, setActiveStatus] = useState("tab1");
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <Layout title="전략체계도 작성" activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="연도" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                        </SearchBox.Row>
                    </SearchBox.Content>

                    <SearchBox.Actions>
                        <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                        <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                    </SearchBox.Actions>
                </SearchBox>

                <Layout.Row layout="vertical" gap={14}>
                    <Tab.Provider value={activeStatus} onChange={(value) => setActiveStatus(String(value))}>
                        <Layout.Row layout={isMobile ? "vertical" : "horizontal"} justify="space-between">
                            <Layout.Col>
                                <Tab variant="chip" value={activeStatus} onChange={(value) => setActiveStatus(String(value))}>
                                    <Tab.Item value="tab1">전략체계도 기본</Tab.Item>
                                    <Tab.Item value="tab2">전략과제</Tab.Item>
                                    <Tab.Item value="tab3">세부내용</Tab.Item>
                                </Tab>
                            </Layout.Col>
                            <Layout.Col layout="horizontal" justify="end" gap={8}>
                                {activeStatus === "tab1" && (
                                    <>
                                        <Button variant="filled">데이터 불러오기</Button>
                                        <Button variant="outlined">확정</Button>
                                    </>
                                )}
                                <Button variant="outlined">취소</Button>
                                <Button>저장</Button>
                            </Layout.Col>
                        </Layout.Row>

                        {/* 전략체계도 기본 */}
                        <Tab.Panel value="tab1">
                            {/* Form Table */}
                            <Table variant="horizontal" caption="전략체계도 기본 작성 양식">
                                <Table.Row>
                                    <Table.Header scope="row">미션</Table.Header>
                                    <Table.Cell>
                                        <Input fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">비전</Table.Header>
                                    <Table.Cell>
                                        <Input fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">
                                        핵심가치<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">경영방침</Table.Header>
                                    <Table.Cell>
                                        <Input fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">
                                        전략목표<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                            </Table>
                        </Tab.Panel>

                        {/* 전략과제 */}
                        <Tab.Panel value="tab2">
                            {/* Form Table */}
                            <Table variant="horizontal" caption="전략과제 작성 양식">
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={3}>
                                        전략목표 1<br />
                                        <Button size="sm">과제 추가</Button>
                                    </Table.Header>
                                    <Table.Header scope="col" colSpan={2} className="text-left">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Header>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={3}>
                                        전략목표 2<br />
                                        <Button size="sm">과제 추가</Button>
                                    </Table.Header>
                                    <Table.Header scope="col" colSpan={2} className="text-left">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Header>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={3}>
                                        전략목표 3<br />
                                        <Button size="sm">과제 추가</Button>
                                    </Table.Header>
                                    <Table.Header scope="col" colSpan={2} className="text-left">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Header>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                            </Table>
                        </Tab.Panel>

                        {/* 세부내용 */}
                        <Tab.Panel value="tab3">
                            {/* Form Table */}
                            <Table variant="horizontal" caption="세부내용 작성 양식">
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={5}>
                                        전략목표 1<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Header scope="col" colSpan={2} className="text-left">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Header>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={2} className="table-cell">
                                        전략과제 1-1<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Cell>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                                <Button variant="filled" onClick={() => setIsOpenModal(true)}>담당 팀 관리</Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={2} className="table-cell">
                                        전략과제 1-2<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Cell>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                                <Button variant="filled" onClick={() => setIsOpenModal(true)}>담당 팀 관리</Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={5}>
                                        전략목표 2<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Header scope="col" colSpan={2} className="text-left">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Header>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={2} className="table-cell">
                                        전략과제 2-1<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Cell>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                                <Button variant="filled" onClick={() => setIsOpenModal(true)}>담당 팀 관리</Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" rowSpan={2} className="table-cell">
                                        전략과제 2-2<br />
                                        <Button size="sm">추가</Button>
                                    </Table.Header>
                                    <Table.Cell>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Space layout="vertical" size={19}>
                                            <Space.Item size={4}>
                                                <Input fullWidth />
                                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                                                <Button variant="filled" onClick={() => setIsOpenModal(true)}>담당 팀 관리</Button>
                                            </Space.Item>
                                        </Space>
                                    </Table.Cell>
                                </Table.Row>
                            </Table>
                        </Tab.Panel>
                    </Tab.Provider>
                </Layout.Row>

                <Layout.Row justify="end" gap={8}>
                    <Button size={isMobile ? "md" : "lg"} onClick={() => { }}>인쇄</Button>
                </Layout.Row>
            </Layout>

            {/* Modal - 담당팀 관리 */}
            <Modal size="sm" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="담당팀 관리" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>
                    <Layout.Row layout="vertical">

                        {/* SearchBox */}
                        <SearchBox>
                            <SearchBox.Content>
                                <SearchBox.Row>
                                    <SearchBox.Item width={isMobile ? "100%" : 140}>
                                        <Dropdown label="본부" options={dummyOptions} fullWidth />
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
                            gridLabel="담당팀 목록"
                            infiniteScroll
                            showHeader
                            isRowSelection
                            maxRows={5}
                            topRightButtons={
                                <>
                                    <Button variant="outlined" size="sm" onClick={() => { }}>추가</Button>
                                </>
                            }
                        />

                        <Divider />

                        <Typography variant="heading-xs">현재 담당팀</Typography>

                        <Space layout="vertical" size="sm">
                            <Space.Item size={4}>
                                <Typography variant="heading-xs">XXX &gt; XXX</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                            </Space.Item>
                            <Space.Item size={4}>
                                <Typography variant="heading-xs">XXX &gt; XXX</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                            </Space.Item>
                            <Space.Item size={4}>
                                <Typography variant="heading-xs">XXX &gt; XXX</Typography>
                                <Button variant="text" leftIcon={<Icon name="close" size={24} />}></Button>
                            </Space.Item>
                        </Space>
                    </Layout.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button>저장</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
