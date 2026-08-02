import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, DataGrid, Dropdown, Icon, Input, Layout, Modal, RadioButton, SearchBox, Space, Table } from "@/publishing/components";
import { useState } from "react";

const tableData = [
    { fleet: "케미컬", shipName: "XXXX", seq: "10", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "9", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "8", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "7", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "6", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "5", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "4", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "3", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "2", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
    { fleet: "케미컬", shipName: "XXXX", seq: "1", dailyFuelSailing: "99,999", dailyFuelAnchor: "99,999", dailyMCylSailing: "99,999", dailyMCylAnchor: "99,999", dailyMSysSailing: "99,999", dailyMSysAnchor: "99,999", dailyGSysSailing: "99,999", dailyGSysAnchor: "99,999", useYn: "사용" },
];

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

export function UI_BPS_1020_L() {
    const isMobile = useIsMobile();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [radioSelected, setRadioSelected] = useState("radio1");

    const tableColumns: ColDef[] = [
        { headerName: "선대", field: "fleet", width: 120, minWidth: 120, flex: 0 },
        { headerName: "선박명", field: "shipName", width: 120, minWidth: 120, flex: 0 },
        { headerName: "순번", field: "seq", width: 120, minWidth: 120, flex: 0 },
        { headerName: "일별 연료 소모량(운항)", field: "dailyFuelSailing", minWidth: 260, flex: 1 },
        { headerName: "일별 연료 소묘량(정박)", field: "dailyFuelAnchor", minWidth: 260, flex: 1 },
        { headerName: "일별 M cyl 소모량(운항)", field: "dailyMCylSailing", minWidth: 260, flex: 1 },
        { headerName: "일별 M cyl 소모량(정박)", field: "dailyMCylAnchor", minWidth: 260, flex: 1 },
        { headerName: "일별 M sys 소모량(운항)", field: "dailyMSysSailing", minWidth: 260, flex: 1 },
        { headerName: "일별 M sys 소모량(정박)", field: "dailyMSysAnchor", minWidth: 260, flex: 1 },
        { headerName: "일별 G sys 소모량(운항)", field: "dailyGSysSailing", minWidth: 260, flex: 1 },
        { headerName: "일별 G sys 소모량(정박)", field: "dailyGSysAnchor", minWidth: 260, flex: 1 },
        {
            headerName: "사용여부",
            field: "useYn",
            width: 120,
            minWidth: 120,
            flex: 0,
            cellClass: "text-left",
            cellRenderer: ({ value }: ICellRendererParams) => (
                <Badge color={value === "사용" ? "blue" : "red"} dot>{value}</Badge>
            ),
        },
        {
            headerName: "관리",
            field: "action",
            width: 120,
            minWidth: 120,
            flex: 0,
            cellRenderer: () => {
                return (
                    <Button variant="outlined" size="sm" onClick={() => setIsOpenModal(true)}>수정</Button>
                );
            },
        },
    ];

    return (
        <>
            <Layout title="유류(연료, 윤활유) 소비량 기준 정보" activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="선대" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="선박" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="사용여부" options={dummyOptions} fullWidth />
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
                    gridLabel="유류 소비량 기준 정보 목록"
                    topRightButtons={
                        <>
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                            <Button variant="solid" color="primary" onClick={() => setIsOpenModal(true)}>등록</Button>
                        </>
                    }
                />
            </Layout>

            {/* Modal - 선박별 유류 소비량 등록/수정 */}
            <Modal size="sm" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="선박별 유류 소비량 등록/수정" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>
                    <Table variant="horizontal">
                        <Table.Row>
                            <Table.Header scope="row" required>선박</Table.Header>
                            <Table.Cell>
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    fullWidth
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 연료 소모량(운항)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 연료 소모량(정박)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 M cyl 소모량(운항)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 M cyl 소모량(정박)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 M sys 소모량(운항)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 M sys 소모량(정박)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 G sys 소모량(운항)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>일별 G sys 소모량(정박)</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="useYN" label="사용" value="radio1" checked={radioSelected === "radio1"} onChange={() => setRadioSelected("radio1")} />
                                    <RadioButton name="useYN" label="미사용" value="radio2" checked={radioSelected === "radio2"} onChange={() => setRadioSelected("radio2")} />
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined" onClick={() => setIsOpenModal(false)}>삭제</Button>
                    <Button onClick={() => setIsOpenModal(false)}>저장</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
