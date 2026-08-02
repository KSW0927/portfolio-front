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

const hqValues = ["본부 1", "본부 2", "본부 3", "본부 4"];
const teamValues = ["팀 1", "팀 2", "팀 3", "팀 4"];

const initialDummyData = [
    { id: 1, hq: "본부 1", team: "팀 1", sort: "1", usageYN: "사용", isEditing: false },
    { id: 2, hq: "본부 2", team: "팀 2", sort: "1", usageYN: "사용", isEditing: false },
    { id: 3, hq: "본부 3", team: "팀 3", sort: "1", usageYN: "미사용", isEditing: false },
    { id: 4, hq: "본부 4", team: "팀 4", sort: "1", usageYN: "사용", isEditing: false },
    { id: 5, hq: "-", team: "-", sort: "5", usageYN: "사용", isEditing: true },
];

export function SubTreeList() {
    const isMobile = useIsMobile();
    const treeRef = useRef<TreeListRef>(null);
    const gridRef = useRef<DataGridHandle>(null);
    const [radioSelected1, setRadioSelected1] = useState("radio1");
    const [radioSelected2, setRadioSelected2] = useState("radio2");
    const [tableData, setTableData] = useState(initialDummyData);

    const updateRow = useCallback((id: number, changes: Partial<typeof initialDummyData[0]>) => {
        setTableData(prev => prev.map(row => row.id === id ? { ...row, ...changes } : row));
    }, []);

    const tableColumns = useMemo<ColDef[]>(() => [
        {
            headerName: "본부",
            field: "hq",
            minWidth: 200,
            cellClass: "text-left",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    const opts = hqValues.map(v => ({ label: v, value: v }));
                    return <Dropdown options={opts} value={value} onChange={(val) => updateRow(data.id, { hq: val })} fullWidth menuPortal />;
                }
                return value || "-";
            },
        },
        {
            headerName: "팀",
            field: "team",
            minWidth: 200,
            cellClass: "text-left",
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    const opts = teamValues.map(v => ({ label: v, value: v }));
                    return <Dropdown options={opts} value={value} onChange={(val) => updateRow(data.id, { team: val })} fullWidth menuPortal />;
                }
                return value || "-";
            },
        },
        {
            headerName: "정렬순서",
            field: "sort",
            width: 225,
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return <Input value={value ?? ""} onChange={(e) => updateRow(data.id, { sort: e.target.value })} placeholder="입력해 주세요." fullWidth />;
                }
                return value;
            },
        },
        {
            headerName: "사용여부",
            field: "usageYN",
            width: 225,
            cellRenderer: ({ value, data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return (
                        <div style={{ display: "flex", gap: "1.6rem", justifyContent: "center", alignItems: "center" }}>
                            <RadioButton name={`usage-${data.id}`} label="사용" checked={value === "사용"} onChange={() => updateRow(data.id, { usageYN: "사용" })} />
                            <RadioButton name={`usage-${data.id}`} label="미사용" checked={value === "미사용"} onChange={() => updateRow(data.id, { usageYN: "미사용" })} />
                        </div>
                    );
                }
                return value;
            },
        },
        {
            headerName: "관리",
            field: "mng",
            minWidth: 130,
            cellRenderer: ({ data }: ICellRendererParams) => {
                if (data?.isEditing) {
                    return (
                        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}>
                            <Button variant="outlined" size="sm" onClick={() => updateRow(data.id, { isEditing: false })}>취소</Button>
                            <Button variant="solid" color="primary" size="sm" onClick={() => {
                                console.log("저장 데이터:", data);
                                AlertService.success("저장되었습니다.");
                                updateRow(data.id, { isEditing: false });
                            }}>저장</Button>
                        </div>
                    );
                }
                return <Button variant="outlined" size="sm" onClick={() => updateRow(data.id, { isEditing: true })}>수정</Button>;
            },
        },
    ], [updateRow]);

    const handleAddRow = () => {
        const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.id)) + 1 : 1;
        setTableData(prev => [...prev, {
            id: newId, hq: "", team: "", sort: String(newId), usageYN: "사용", isEditing: true,
        }]);
    };

    const handleDeleteRow = async () => {
        const api = gridRef.current?.getApi();
        if (!api) return;
        const selected = api.getSelectedRows();
        if (selected.length === 0) return AlertService.warning("삭제할 행을 선택해주세요.");
        const isOk = await AlertService.confirm("행 삭제", `선택된 ${selected.length}개의 행을 삭제하시겠습니까?`);
        if (isOk) {
            const selectedIds = new Set(selected.map((r: unknown) => (r as { id: number }).id));
            setTableData(prev => prev.filter(row => !selectedIds.has(row.id)));
            AlertService.success(`${selected.length}개의 행이 삭제되었습니다.`);
        }
    };

    const sampleTreeData: TreeData[] = [
        {
            id: "1",
            title: "예산항목",
            children: [
                {
                    id: "1-1",
                    title: "수입",
                    children: [
                        { id: "1-1-1", title: "해운수입" },
                        { id: "1-1-2", title: "항비" },
                        { id: "1-1-3", title: "기타운항비" },
                        { id: "1-1-4", title: "대선료" },
                    ]
                }
            ]
        },
        {
            id: "2",
            title: "비용",
            children: [
                {
                    id: "2-1",
                    title: "운항비",
                    children: [
                        { id: "2-1-1", title: "화물비" },
                        { id: "2-1-2", title: "연료비" },
                        { id: "2-1-3", title: "항비" },
                        { id: "2-1-4", title: "급수비" },
                        { id: "2-1-5", title: "통신비" },
                        { id: "2-1-6", title: "기타 운항비" },
                    ]
                }
            ]
        },
        {
            id: "3",
            title: "선비",
            children: [
                {
                    id: "3-1",
                    title: "선원비",
                    children: [
                        { id: "3-1-1", title: "Item 1" },
                        { id: "3-1-2", title: "Item 2" },
                        { id: "3-1-3", title: "Item 3" },
                    ]
                }
            ]
        }
    ];

    return (
        <Layout title="샘플 서브 페이지(Tree List)" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
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
                        mobileButtonText="예산항목 선택"
                        title="예산항목 선택"
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
                            <Table variant="horizontal">
                                <Table.HeaderArea>
                                    <Table.HeaderLeft>
                                        <Typography variant="heading-sm">예산코드(등록/상세)</Typography>
                                    </Table.HeaderLeft>
                                    <Table.HeaderRight>
                                        <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>
                                            다운로드
                                        </Button>
                                        <Button variant="outlined">수정이력 조회</Button>
                                        <Button variant="solid">저장</Button>
                                    </Table.HeaderRight>
                                </Table.HeaderArea>

                                <Table.Row>
                                    <Table.Header>상위코드</Table.Header>
                                    <Table.Cell colSpan={isMobile ? 0 : 3}>TEXT</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header>화면 ID</Table.Header>
                                    <Table.Cell colSpan={isMobile ? 0 : 3}>
                                        <Input placeholder="제목을 입력해 주세요." width={isMobile ? "calc(100% - 8.0rem)" : 220} />
                                        <Button variant="solid" size="sm">중복확인</Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header>담당자</Table.Header>
                                    <Table.Cell colSpan={isMobile ? 0 : 3}>
                                        <Button variant="solid" size="sm">담당자 관리</Button>
                                    </Table.Cell>
                                </Table.Row>
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header>항목명(한글)</Table.Header>
                                            <Table.Cell>
                                                <Input fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header>항목명(영문)</Table.Header>
                                            <Table.Cell>
                                                <Input fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header>항목명(한글)</Table.Header>
                                        <Table.Cell>
                                            <Input fullWidth />
                                        </Table.Cell>
                                        <Table.Header>항목명(영문)</Table.Header>
                                        <Table.Cell>
                                            <Input fullWidth />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header>항목명(한글)</Table.Header>
                                            <Table.Cell>
                                                <Dropdown options={dummyOptions} onChange={() => { }} fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header>항목명(영문)</Table.Header>
                                            <Table.Cell>
                                                <Dropdown options={dummyOptions} onChange={() => { }} fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header>항목명(한글)</Table.Header>
                                        <Table.Cell>
                                            <Dropdown options={dummyOptions} onChange={() => { }} width={200} fullWidth={isMobile} />
                                        </Table.Cell>
                                        <Table.Header>항목명(영문)</Table.Header>
                                        <Table.Cell>
                                            <Dropdown options={dummyOptions} onChange={() => { }} width={200} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header>ERP 코드</Table.Header>
                                            <Table.Cell>
                                                <Dropdown options={dummyOptions} onChange={() => { }} fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header>그룹항목 여부</Table.Header>
                                            <Table.Cell>
                                                <RadioButton name="groupYN" label="그룹" value="radio1" checked={radioSelected1 === "radio1"} onChange={() => setRadioSelected1("radio1")} />
                                                <RadioButton name="groupYN" label="단일" value="radio2" checked={radioSelected1 === "radio2"} onChange={() => setRadioSelected1("radio2")} />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header>ERP 코드</Table.Header>
                                        <Table.Cell>
                                            <Dropdown options={dummyOptions} onChange={() => { }} width={200} />
                                        </Table.Cell>
                                        <Table.Header>그룹항목 여부</Table.Header>
                                        <Table.Cell>
                                            <RadioButton name="groupYN" label="그룹" value="radio1" checked={radioSelected1 === "radio1"} onChange={() => setRadioSelected1("radio1")} />
                                            <RadioButton name="groupYN" label="단일" value="radio2" checked={radioSelected1 === "radio2"} onChange={() => setRadioSelected1("radio2")} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                                {isMobile ? (
                                    <>
                                        <Table.Row>
                                            <Table.Header>게시여부 사용여부</Table.Header>
                                            <Table.Cell>
                                                <RadioButton name="postYN" label="사용" value="radio1" checked={radioSelected2 === "radio1"} onChange={() => setRadioSelected2("radio1")} />
                                                <RadioButton name="postYN" label="미사용" value="radio2" checked={radioSelected2 === "radio2"} onChange={() => setRadioSelected2("radio2")} />
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Header>순서</Table.Header>
                                            <Table.Cell>
                                                <Input fullWidth />
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                ) : (
                                    <Table.Row>
                                        <Table.Header>게시여부 사용여부</Table.Header>
                                        <Table.Cell>
                                            <RadioButton name="postYN" label="사용" value="radio1" checked={radioSelected2 === "radio1"} onChange={() => setRadioSelected2("radio1")} />
                                            <RadioButton name="postYN" label="미사용" value="radio2" checked={radioSelected2 === "radio2"} onChange={() => setRadioSelected2("radio2")} />
                                        </Table.Cell>
                                        <Table.Header>순서</Table.Header>
                                        <Table.Cell>
                                            <Input fullWidth />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table>

                            <Layout.Row layout="vertical" gap={isMobile ? 30 : 14}>
                                <Space layout="vertical" size={14}>
                                    <Typography variant="heading-sm">예산 등록 담당 부서</Typography>

                                    {/* Search Box */}
                                    <SearchBox>
                                        <SearchBox.Content>
                                            <SearchBox.Row>
                                                <SearchBox.Item width={380}>
                                                    <Input label="상세검색" leftIcon={<Icon name="search" size={18} />} placeholder="제목으로 검색하세요." fullWidth />
                                                </SearchBox.Item>
                                            </SearchBox.Row>
                                        </SearchBox.Content>

                                        <SearchBox.Actions>
                                            <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                                            <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                                        </SearchBox.Actions>
                                    </SearchBox>
                                </Space>

                                {/* Data Grid */}
                                <DataGrid
                                    tref={gridRef}
                                    columns={tableColumns}
                                    rowData={tableData}
                                    isRowSelection={true}
                                    gridLabel="예산 등록 담당 부서 목록"
                                    topRightButtons={
                                        <>
                                            <Button variant="filled" color="primary" onClick={handleDeleteRow}>열 삭제</Button>
                                            <Button variant="filled" color="primary" onClick={handleAddRow}>열 추가</Button>
                                        </>
                                    }
                                />
                            </Layout.Row>
                        </Box>
                    </Layout.Col>
                </Layout.Row>
            </Box>
        </Layout>
    );
}
