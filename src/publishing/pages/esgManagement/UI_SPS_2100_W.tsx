import { useCallback, useMemo, useRef, useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AlertService } from "@/utils/AlertService";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, DataGrid, type DataGridHandle, Dropdown, Icon, Input, Layout, RadioButton, SearchBox, Space, Table, TreeList, type TreeData, type TreeListRef, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const hqValues = [
    { label: "본부1", value: "본부1" },
    { label: "본부2", value: "본부2" },
    { label: "본부3", value: "본부3" },
];
const teamValues = [
    { label: "팀1", value: "팀1" },
    { label: "팀2", value: "팀2" },
    { label: "팀3", value: "팀3" },
];

const initialDummyData = [
    { id: 5, name: "", unit: "", hq: "-", team: "-", isEditing: true },
    { id: 4, name: "XXXX", unit: "XXXX", hq: "본부1", team: "팀1", isEditing: false },
    { id: 3, name: "XXXX", unit: "XXXX", hq: "본부2", team: "팀2", isEditing: false },
    { id: 2, name: "XXXX", unit: "XXXX", hq: "본부3", team: "팀3", isEditing: false },
    { id: 1, name: "XXXX", unit: "XXXX", hq: "본부1", team: "팀1", isEditing: false },
];

export function UI_SPS_2100_W() {
    const isMobile = useIsMobile();
    const treeRef = useRef<TreeListRef>(null);
    const gridRef = useRef<DataGridHandle>(null);
    const originalRowRef = useRef<Map<number, typeof initialDummyData[0]>>(new Map());
    const newRowIdsRef = useRef<Set<number>>(new Set());
    const [radioSelected1, setRadioSelected1] = useState("radio1");
    const [tableData, setTableData] = useState(initialDummyData);

    const updateRow = useCallback((id: number, changes: Partial<typeof initialDummyData[0]>) => {
        setTableData(prev => prev.map(row => row.id === id ? { ...row, ...changes } : row));
    }, []);

    const handleEdit = useCallback((data: typeof initialDummyData[0]) => {
        originalRowRef.current.set(data.id, { ...data });
        updateRow(data.id, { isEditing: true });
    }, [updateRow]);

    const handleCancel = useCallback((id: number) => {
        if (newRowIdsRef.current.has(id)) {
            setTableData(prev => prev.filter(row => row.id !== id));
            newRowIdsRef.current.delete(id);
        } else {
            const original = originalRowRef.current.get(id);
            if (original) {
                setTableData(prev => prev.map(row => row.id === id ? { ...original, isEditing: false } : row));
                originalRowRef.current.delete(id);
            } else {
                updateRow(id, { isEditing: false });
            }
        }
    }, [updateRow]);

    const handleSave = useCallback((data: typeof initialDummyData[0]) => {
        newRowIdsRef.current.delete(data.id);
        originalRowRef.current.delete(data.id);
        updateRow(data.id, { isEditing: false });
        AlertService.success("저장되었습니다.");
    }, [updateRow]);

    const tableColumns = useMemo<ColDef[]>(() => [
        {
            headerName: "지표 상세 명",
            field: "name",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input defaultValue={value} onChange={(e) => updateRow(data.id, { name: e.target.value })} />;
                }
                return value;
            },
        },
        {
            headerName: "단위",
            field: "unit",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input defaultValue={value} onChange={(e) => updateRow(data.id, { unit: e.target.value })} />;
                }
                return value;
            },
        },
        {
            headerName: "본부",
            field: "hq",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Dropdown options={hqValues} value={value} onChange={(val) => updateRow(data.id, { hq: val })} fullWidth menuPortal />;
                }
                return value || "-";
            },
        },
        {
            headerName: "팀",
            field: "team",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Dropdown options={teamValues} value={value} onChange={(val) => updateRow(data.id, { team: val })} fullWidth menuPortal />;
                }
                return value || "-";
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
                            <Button variant="outlined" size="sm" onClick={() => handleCancel(data.id)}>취소</Button>
                            <Button variant="solid" color="primary" size="sm" onClick={() => handleSave(data)}>저장</Button>
                        </Space>
                    );
                }
                return <Button variant="outlined" size="sm" onClick={() => handleEdit(data)}>수정</Button>;
            },
        },
    ], [updateRow, handleSave, handleEdit, handleCancel]);

    const handleAddRow = () => {
        const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.id)) + 1 : 1;
        newRowIdsRef.current.add(newId);
        setTableData(prev => [{
            id: newId, name: "", unit: "", hq: "", team: "", usageYN: "사용", isEditing: true,
        }, ...prev]);
    };

    const sampleTreeData: TreeData[] = [
        {
            id: "1",
            title: "E (환경성과)",
            children: [
                {
                    id: "1-1",
                    title: "기후변화 대응",
                    children: [
                        {
                            id: "1-1-1",
                            title: "온실가스 배출량",
                            children: [
                                { id: "1-1-1-1", title: "온실가스 Scope1 배출량" },
                                { id: "1-1-1-2", title: "온실가스 Scope2 배출량" },
                            ]
                        },
                        {
                            id: "1-1-2",
                            title: "에너지 소비",
                            children: [
                                { id: "1-1-2-1", title: "에너지 소비량" },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            id: "2",
            title: "S (사회)"
        },
        {
            id: "3",
            title: "G (거버넌스)",
        }
    ];

    return (
        <Layout title="ESG 지표 트리" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 584}>
                            <Dropdown label="분류" options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
                            <Dropdown options={dummyOptions} fullWidth />
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

            <Box>
                <Layout.Row layout={isMobile ? "vertical" : "horizontal"} >
                    {/* Tree List */}
                    <TreeList.Sidebar
                        mobileButtonText="ESG 지표 선택"
                        title="ESG 지표"
                    >
                        <TreeList
                            ref={treeRef}
                            treeId="budget-tree"
                            initData={sampleTreeData}
                            onSelectItems={(items) => console.log("Selected:", items)}
                        />
                    </TreeList.Sidebar>

                    <Layout.Col>
                        <Box variant="inner" gap={40}>
                            {/* Form Table */}
                            <Table variant="horizontal" caption="지표 상세 입력 양식">
                                <Table.HeaderArea>
                                    <Table.HeaderLeft>
                                        <Typography variant="heading-sm">지표 상세</Typography>
                                    </Table.HeaderLeft>
                                    <Table.HeaderRight>
                                        <Button variant="outlined">취소</Button>
                                        <Button variant="solid">저장</Button>
                                    </Table.HeaderRight>
                                </Table.HeaderArea>

                                <Table.Row>
                                    <Table.Header scope="row">상위코드</Table.Header>
                                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                                        <Dropdown options={dummyOptions} width={isMobile ? "100%" : 170} />
                                        <Dropdown options={dummyOptions} width={isMobile ? "100%" : 170} />
                                        <Dropdown options={dummyOptions} width={isMobile ? "100%" : 170} />
                                        <Button size="sm">분류 변경저장</Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">지표명</Table.Header>
                                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                                        <Input fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">출처</Table.Header>
                                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                                        <Input fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header scope="row">사용 여부</Table.Header>
                                            <Table.Cell>
                                                <Space size={24}>
                                                    <RadioButton name="useYN" label="사용" value="radio1" checked={radioSelected1 === "radio1"} onChange={() => setRadioSelected1("radio1")} />
                                                    <RadioButton name="useYN" label="미사용" value="radio2" checked={radioSelected1 === "radio2"} onChange={() => setRadioSelected1("radio2")} />
                                                </Space>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header scope="row">Depth</Table.Header>
                                            <Table.Cell>4</Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header scope="row">사용 여부</Table.Header>
                                        <Table.Cell>
                                            <Space size={24}>
                                                <RadioButton name="useYN" label="사용" value="radio1" checked={radioSelected1 === "radio1"} onChange={() => setRadioSelected1("radio1")} />
                                                <RadioButton name="useYN" label="미사용" value="radio2" checked={radioSelected1 === "radio2"} onChange={() => setRadioSelected1("radio2")} />
                                            </Space>
                                        </Table.Cell>
                                        <Table.Header scope="row">Depth</Table.Header>
                                        <Table.Cell>4</Table.Cell>
                                    </Table.Row>
                                )}
                                <Table.Row>
                                    <Table.Header scope="row">
                                        지표상세<br />
                                        <Button onClick={handleAddRow}>행 추가</Button>
                                    </Table.Header>
                                    <Table.Cell colSpan={isMobile ? 1 : 3}>
                                        <DataGrid
                                            tref={gridRef}
                                            columns={tableColumns}
                                            rowData={tableData}
                                            infiniteScroll
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table>
                        </Box>
                    </Layout.Col>
                </Layout.Row>
            </Box>
        </Layout>
    );
}
