import { useCallback, useMemo, useRef, useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AlertService } from "@/utils/AlertService";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Checkbox, DataGrid, DatePicker, Divider, Dropdown, Icon, Input, Layout, Modal, Space, Table, Textarea, type DataGridHandle } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const attendeeGradeValues = [
    { label: "VVIP", value: "VVIP" },
    { label: "VIP", value: "VIP" },
    { label: "일반", value: "일반" },
];
const corpTypeValues = [
    { label: "기업", value: "기업" },
    { label: "기자", value: "기자" },
    { label: "개인", value: "개인" },
];

const initialDummyData = [
    { no: 10, attendeeGrade: "VVIP", attendeeType: "기업", corpType: "기업", corpName: "기업명", attendeeName: "홍길동(직위/직책)", phone: "010-1234-5678", email: "hong@example.com", replyYN: true, attendYN: true, isEditing: false },
    { no: 9, attendeeGrade: "VIP", attendeeType: "외부", corpType: "개인", corpName: "개인투자자", attendeeName: "김철수(직위/직책)", phone: "010-2345-6789", email: "kim@example.com", replyYN: false, attendYN: false, isEditing: false },
    { no: 8, attendeeGrade: "일반", attendeeType: "내부", corpType: "기자", corpName: "회사명", attendeeName: "이영희(직위/직책)", phone: "010-3456-7890", email: "lee@example.com", replyYN: true, attendYN: false, isEditing: false },
    { no: 7, attendeeGrade: "VVIP", attendeeType: "기업", corpType: "기업", corpName: "기업명", attendeeName: "홍길동(직위/직책)", phone: "010-1234-5678", email: "hong@example.com", replyYN: true, attendYN: true, isEditing: false },
    { no: 6, attendeeGrade: "VIP", attendeeType: "외부", corpType: "개인", corpName: "개인투자자", attendeeName: "김철수(직위/직책)", phone: "010-2345-6789", email: "kim@example.com", replyYN: false, attendYN: false, isEditing: false },
    { no: 5, attendeeGrade: "일반", attendeeType: "내부", corpType: "기자", corpName: "회사명", attendeeName: "이영희(직위/직책)", phone: "010-3456-7890", email: "lee@example.com", replyYN: true, attendYN: false, isEditing: false },
    { no: 4, attendeeGrade: "VVIP", attendeeType: "기업", corpType: "기업", corpName: "기업명", attendeeName: "홍길동(직위/직책)", phone: "010-1234-5678", email: "hong@example.com", replyYN: true, attendYN: true, isEditing: false },
    { no: 3, attendeeGrade: "VIP", attendeeType: "외부", corpType: "개인", corpName: "개인투자자", attendeeName: "김철수(직위/직책)", phone: "010-2345-6789", email: "kim@example.com", replyYN: false, attendYN: false, isEditing: false },
    { no: 2, attendeeGrade: "일반", attendeeType: "내부", corpType: "기자", corpName: "회사명", attendeeName: "이영희(직위/직책)", phone: "010-3456-7890", email: "lee@example.com", replyYN: true, attendYN: false, isEditing: false },
    { no: 1, attendeeGrade: "VVIP", attendeeType: "기업", corpType: "기업", corpName: "기업명", attendeeName: "홍길동(직위/직책)", phone: "010-1234-5678", email: "hong@example.com", replyYN: true, attendYN: true, isEditing: false },
];

export function UI_SPS_2201_W() {
    const isMobile = useIsMobile();
    const gridRef = useRef<DataGridHandle>(null);
    const originalRowRef = useRef<Map<number, typeof initialDummyData[0]>>(new Map());
    const [tableData, setTableData] = useState(initialDummyData);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const updateRow = useCallback((no: number, changes: Partial<typeof initialDummyData[0]>) => {
        setTableData(prev => prev.map(row => row.no === no ? { ...row, ...changes } : row));
    }, []);

    const handleEdit = useCallback((data: typeof initialDummyData[0]) => {
        originalRowRef.current.set(data.no, { ...data });
        updateRow(data.no, { isEditing: true });
    }, [updateRow]);

    const handleCancel = useCallback((no: number) => {
        const original = originalRowRef.current.get(no);
        if (original) {
            setTableData(prev => prev.map(row => row.no === no ? { ...original, isEditing: false } : row));
            originalRowRef.current.delete(no);
        } else {
            updateRow(no, { isEditing: false });
        }
    }, [updateRow]);

    const handleSave = useCallback((data: typeof initialDummyData[0]) => {
        updateRow(data.no, { isEditing: false });
        AlertService.success("저장되었습니다.");
    }, [updateRow]);

    const tableColumns = useMemo<ColDef[]>(() => [
        { headerName: "번호", field: "no", width: 70, minWidth: 70, flex: 0, },
        {
            headerName: "참석자 등급",
            field: "attendeeGrade",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Dropdown options={attendeeGradeValues} value={value} onChange={(val) => updateRow(data.no, { attendeeGrade: val })} fullWidth menuPortal />;
                }
                return value || "-";
            },
        },
        {
            headerName: "참석사 유형",
            field: "corpType",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Dropdown options={corpTypeValues} value={value} onChange={(val) => updateRow(data.no, { corpType: val })} fullWidth menuPortal />;
                }
                return value || "-";
            },
        },
        {
            headerName: "참석사",
            field: "corpName",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input defaultValue={value} onBlur={(e) => updateRow(data.no, { corpName: e.target.value })} />;
                }
                return value;
            },
        },
        {
            headerName: "참석자",
            field: "attendeeName",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input defaultValue={value} onBlur={(e) => updateRow(data.no, { attendeeName: e.target.value })} />;
                }
                return value;
            },
        },
        {
            headerName: "전화번호",
            field: "phone",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input defaultValue={value} onBlur={(e) => updateRow(data.no, { phone: e.target.value })} />;
                }
                return value;
            },
        },
        {
            headerName: "이메일",
            field: "email",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input defaultValue={value} onBlur={(e) => updateRow(data.no, { email: e.target.value })} />;
                }
                return value;
            },
        },
        {
            headerName: "참석여부 회신",
            field: "replyYN",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Checkbox checked={!!value} onChange={(e) => updateRow(data.no, { replyYN: e.target.checked })} />;
                }
                return value ? "O" : "X";
            },
        },
        {
            headerName: "실제 참석여부",
            field: "attendYN",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Checkbox checked={!!value} onChange={(e) => updateRow(data.no, { attendYN: e.target.checked })} />;
                }
                return value ? "O" : "X";
            },
        },
        {
            headerName: "관리",
            field: "mng",
            minWidth: 130,
            cellRenderer: ({ data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return (
                        <Space size={6}>
                            <Button variant="outlined" size="sm" onClick={() => handleCancel(data.no)}>취소</Button>
                            <Button variant="solid" color="primary" size="sm" onClick={() => handleSave(data)}>저장</Button>
                        </Space>
                    );
                }
                return <Button variant="outlined" size="sm" onClick={() => handleEdit(data)}>수정</Button>;
            },
        },
    ], [updateRow, handleSave, handleEdit, handleCancel]);

    const handleAddRow = () => {
        const newNo = tableData.length > 0 ? Math.max(...tableData.map(d => d.no)) + 1 : 1;
        setTableData(prev => [{
            no: newNo, attendeeGrade: "", attendeeType: "", corpType: "", corpName: "", attendeeName: "", phone: "", email: "", replyYN: false, attendYN: false, isEditing: true,
        }, ...prev]);
    };

    const handleDeleteRow = async () => {
        const api = gridRef.current?.getApi();
        if (!api) return;
        const selected = api.getSelectedRows();
        if (selected.length === 0) return AlertService.warning("삭제할 행을 선택해주세요.");
        const isOk = await AlertService.confirm("행 삭제", `선택된 ${selected.length}개의 행을 삭제하시겠습니까?`);
        if (isOk) {
            const selectedIds = new Set(selected.map((r: unknown) => (r as { no: number }).no));
            setTableData(prev => prev.filter(row => !selectedIds.has(row.no)));
            AlertService.success(`${selected.length}개의 행이 삭제되었습니다.`);
        }
    };

    // 내부 참석자 모달
    const botGridRef = useRef<DataGridHandle>(null);
    const [topForm, setTopForm] = useState({ hq: "", team: "", employee: "" });
    const [botData, setBotData] = useState([
        { no: 10, hq: "XXXXXXX", team: "XXXXXXX", employee: "XXXXXXX" },
        { no: 9, hq: "XXXXXXX", team: "XXXXXXX", employee: "XXXXXXX" },
        { no: 8, hq: "XXXXXXX", team: "XXXXXXX", employee: "XXXXXXX" },
        { no: 7, hq: "XXXXXXX", team: "XXXXXXX", employee: "XXXXXXX" },
        { no: 6, hq: "XXXXXXX", team: "XXXXXXX", employee: "XXXXXXX" },
    ]);

    const topData = useMemo(() => [topForm], [topForm]);

    const topColumns = useMemo<ColDef[]>(() => [
        {
            headerName: "본부",
            field: "hq",
            cellRenderer: ({ value }: ICellRendererParams) => (
                <Dropdown options={dummyOptions} value={value} onChange={(val) => setTopForm(prev => ({ ...prev, hq: val }))} fullWidth menuPortal />
            ),
        },
        {
            headerName: "팀",
            field: "team",
            cellRenderer: ({ value }: ICellRendererParams) => (
                <Dropdown options={dummyOptions} value={value} onChange={(val) => setTopForm(prev => ({ ...prev, team: val }))} fullWidth menuPortal />
            ),
        },
        {
            headerName: "사원",
            field: "employee",
            cellRenderer: ({ value }: ICellRendererParams) => (
                <Dropdown options={dummyOptions} value={value} onChange={(val) => setTopForm(prev => ({ ...prev, employee: val }))} fullWidth menuPortal />
            ),
        },
    ], []);

    const botColumns = useMemo<ColDef[]>(() => [
        { headerName: "본부", field: "hq" },
        { headerName: "팀", field: "team" },
        { headerName: "사원", field: "employee" },
    ], []);

    const handleAddAttendee = () => {
        if (!topForm.hq || !topForm.team || !topForm.employee) {
            AlertService.warning("본부, 팀, 사원을 모두 입력해 주세요.");
            return;
        }
        const newNo = botData.length > 0 ? Math.max(...botData.map(d => d.no)) + 1 : 1;
        const getLabel = (val: string) => dummyOptions.find(o => o.value === val)?.label ?? val;
        setBotData(prev => [{
            no: newNo,
            hq: getLabel(topForm.hq),
            team: getLabel(topForm.team),
            employee: getLabel(topForm.employee),
        }, ...prev]);
        setTopForm({ hq: "", team: "", employee: "" });
    };

    const handleDeleteAttendee = async () => {
        const api = botGridRef.current?.getApi();
        if (!api) return;
        const selected = api.getSelectedRows();
        if (selected.length === 0) return AlertService.warning("삭제할 행을 선택해주세요.");
        const isOk = await AlertService.confirm("행 삭제", `선택된 ${selected.length}개의 행을 삭제하시겠습니까?`);
        if (isOk) {
            const selectedIds = new Set(selected.map((r: unknown) => (r as { no: number }).no));
            setBotData(prev => prev.filter(row => !selectedIds.has(row.no)));
            AlertService.success(`${selected.length}개의 행이 삭제되었습니다.`);
        }
    };

    return (
        <>
            <Layout title="IR 실시 등록/수정" favorite={false} activeMenuId="">

                {/* Form Table */}
                <Table variant="horizontal" caption="IR 실시 등록 및 수정 양식">
                    <Table.Row>
                        <Table.Header scope="row" required>IR 제목</Table.Header>
                        <Table.Cell colSpan={3}>
                            <Input fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row" required>시행일시</Table.Header>
                        <Table.Cell colSpan={3}>
                            <DatePicker selected={null} onChange={() => { }} isTimer={true} width={isMobile ? "100%" : 230} />
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row" required>실시유형</Table.Header>
                                <Table.Cell>
                                    <Dropdown options={dummyOptions} onChange={() => { }} fullWidth />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row" required>참석사 유형</Table.Header>
                                <Table.Cell>
                                    <Dropdown options={dummyOptions} onChange={() => { }} fullWidth />
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row" required>실시유형</Table.Header>
                            <Table.Cell>
                                <Dropdown options={dummyOptions} onChange={() => { }} width={230} />
                            </Table.Cell>
                            <Table.Header scope="row" required>참석사 유형</Table.Header>
                            <Table.Cell>
                                <Dropdown options={dummyOptions} onChange={() => { }} width={230} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Header scope="row" required>장소</Table.Header>
                        <Table.Cell>
                            <Dropdown options={dummyOptions} onChange={() => { }} width={isMobile ? "100%" : 230} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row">내부 참석자</Table.Header>
                        <Table.Cell>
                            <Button onClick={() => setIsOpenModal(true)}>관리</Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row">비고</Table.Header>
                        <Table.Cell colSpan={3}>
                            <Textarea fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">작성자</Table.Header>
                                <Table.Cell>XXXX</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">작성일</Table.Header>
                                <Table.Cell>YYYY-MM-DD</Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">작성자</Table.Header>
                            <Table.Cell>XXXX</Table.Cell>
                            <Table.Header scope="row">작성일</Table.Header>
                            <Table.Cell>YYYY-MM-DD</Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">수정자</Table.Header>
                                <Table.Cell>XXXX</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">수정일</Table.Header>
                                <Table.Cell>YYYY-MM-DD</Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">수정자</Table.Header>
                            <Table.Cell>XXXX</Table.Cell>
                            <Table.Header scope="row">수정일</Table.Header>
                            <Table.Cell>YYYY-MM-DD</Table.Cell>
                        </Table.Row>
                    )}
                </Table>

                {/* Data Grid */}
                <DataGrid
                    tref={gridRef}
                    columns={tableColumns}
                    rowData={tableData}
                    isRowSelection={true}
                    isRowNumber={true}
                    gridLabel="IR 실시 목록"
                    topRightButtons={
                        <>
                            <Button variant="filled" color="primary" onClick={handleDeleteRow}>행 삭제</Button>
                            <Button variant="filled" color="primary" onClick={handleAddRow}>행 추가</Button>
                            <Button onClick={() => { }}>참석자 선택</Button>
                        </>
                    }
                />

                <Layout.Row justify="end" gap={8}>
                    <Button variant="outlined" size={isMobile ? "md" : "lg"}>이전</Button>
                    <Button size={isMobile ? "md" : "lg"} onClick={() => { }}>저장</Button>
                </Layout.Row>
            </Layout>

            {/* Modal - IR 내부 참석자 관리 */}
            <Modal size="sm" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="IR 내부 참석자 관리" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>
                    <Layout.Row layout="vertical">
                        {/* Data Grid - Top */}
                        <DataGrid
                            columns={topColumns}
                            rowData={topData}
                            gridLabel="IR 내부 참석자 추가 목록"
                            infiniteScroll
                            topRightButtons={
                                <>
                                    <Button variant="outlined" size="sm" onClick={handleAddAttendee}>추가</Button>
                                </>
                            }
                        />

                        <Divider />

                        {/* Data Grid - Bottom */}
                        <DataGrid
                            tref={botGridRef}
                            columns={botColumns}
                            rowData={botData}
                            isRowSelection
                            gridLabel="IR 내부 참석자 목록"
                            infiniteScroll
                            showHeader
                            topRightButtons={
                                <>
                                    <Button size="sm" color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>다운로드</Button>
                                    <Button variant="outlined" size="sm" onClick={handleDeleteAttendee}>삭제</Button>
                                </>
                            }
                        />
                    </Layout.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button>저장</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
