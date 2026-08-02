import { useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, DataGrid, type DataGridHandle, Dropdown, Icon, Input, Layout, Space, Table, Textarea } from "@/publishing/components";

interface EmployeeData {
    no: number;
    colName: string;
    detail: string;
}

const initialLeftData: EmployeeData[] = Array.from({ length: 20 }).map((_, idx) => ({
    no: 20 - idx,
    colName: `data${idx + 1}`,
    detail: ["이름", "성별", "핸드폰번호", "주소", "이메일", "본부", "팀", "사번", "생년월일", "직책"][idx % 10],
}));

const dropdownOptions = [
    { label: "인사정보 DATA", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", sortable: true, flex: 1 },
    { headerName: "칼럼명", field: "colName", flex: 1 },
    { headerName: "설명", field: "detail", flex: 1 },
];

export function SubDoubleTable() {
    const isMobile = useIsMobile();
    const leftGridRef = useRef<DataGridHandle>(null);
    const rightGridRef = useRef<DataGridHandle>(null);
    const [leftData, setLeftData] = useState<EmployeeData[]>(initialLeftData);
    const [rightData, setRightData] = useState<EmployeeData[]>([]);

    const handleMoveRight = () => {
        const api = leftGridRef.current?.getApi();
        if (!api) return;
        const selected = api.getSelectedRows() as EmployeeData[];
        if (selected.length === 0) {
            alert("이동할 데이터를 선택해주세요.");
            return;
        }
        const selectedNos = new Set(selected.map(r => r.no));
        setLeftData(prev => prev.filter(r => !selectedNos.has(r.no)));
        setRightData(prev => [...prev, ...selected].sort((a, b) => b.no - a.no));
    };

    const handleMoveLeft = () => {
        const api = rightGridRef.current?.getApi();
        if (!api) return;
        const selected = api.getSelectedRows() as EmployeeData[];
        if (selected.length === 0) {
            alert("이동할 데이터를 선택해주세요.");
            return;
        }
        const selectedNos = new Set(selected.map(r => r.no));
        setRightData(prev => prev.filter(r => !selectedNos.has(r.no)));
        setLeftData(prev => [...prev, ...selected].sort((a, b) => b.no - a.no));
    };

    return (
        <Layout title="샘플 서브 페이지(Form Table + Double Table)" activeMenuId="">

            {/* Form Table */}
            <Table variant="horizontal">
                <Table.Row>
                    <Table.Header required>DATA 선택</Table.Header>
                    <Table.Cell>
                        <Dropdown value="1" options={dropdownOptions} onChange={() => { }} width={178} fullWidth={isMobile} />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header required>비정형 제목</Table.Header>
                    <Table.Cell>
                        <Input placeholder="비정형 제목을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Header required>비정형 설명</Table.Header>
                    <Table.Cell>
                        <Textarea placeholder="비정형 설명을 입력해 주세요." fullWidth />
                    </Table.Cell>
                </Table.Row>
            </Table>

            <Box size={isMobile ? "" : "lg"} className={isMobile ? "-square" : ""}>
                <Layout.Row layout={isMobile ? "vertical" : "horizontal"} gap={30}>
                    <Layout.Col>
                        {/* Data Grid - Left */}
                        <DataGrid
                            tref={leftGridRef}
                            columns={tableColumns}
                            rowData={leftData}
                            isRowSelection={true}
                            gridLabel="이동 가능 항목 목록"
                            initialSort={[{ column: "no", dir: "desc" }]}
                        />
                    </Layout.Col>

                    <Layout.Col layout={isMobile ? "horizontal" : "vertical"} width={isMobile ? "100%" : ''} justify="center" align="center" gap={10}>
                        <Button variant="text" leftIcon={<Icon name={isMobile ? "down" : "right"} size={32} color={isMobile ? "#999" : "#005AAA"} />} aria-label={isMobile ? "아래쪽으로 이동" : "오른쪽으로 이동"} onClick={handleMoveRight} />
                        <Button variant="text" leftIcon={<Icon name={isMobile ? "up" : "left"} size={32} color={isMobile ? "#005AAA" : "#999"} />} aria-label={isMobile ? "위쪽으로 이동" : "왼쪽으로 이동"} onClick={handleMoveLeft} />
                    </Layout.Col>

                    <Layout.Col>
                        {/* Data Grid - Right */}
                        <DataGrid
                            tref={rightGridRef}
                            columns={tableColumns}
                            rowData={rightData}
                            isRowSelection={true}
                            gridLabel="선택된 항목 목록"
                            initialSort={[{ column: "no", dir: "desc" }]}
                        />
                    </Layout.Col>
                </Layout.Row>
            </Box>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>삭제</Button>
                <Button size={isMobile ? "md" : "lg"}>저장</Button>
            </Layout.Row>
        </Layout>
    );
}
