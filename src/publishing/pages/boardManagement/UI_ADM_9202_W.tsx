import { useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, DataGrid, Dropdown, Icon, Input, Layout, Modal, RadioButton, SearchBox, Space, Table, Textarea, Typography, type DataGridHandle } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
]

interface EmployeeData {
    id: number;
    name: string;
    division: string;
    team: string;
    position: string;
}

const initialLeftData: EmployeeData[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: 20 - idx,
    name: "XXXX",
    division: "XXXX",
    team: "XXXX",
    position: "XXXX",
}));

const tableColumns: ColDef[] = [
    { headerName: "ID", field: "id", width: 110 },
    { headerName: "성명", field: "name", width: 110 },
    { headerName: "본부", field: "division", width: 110 },
    { headerName: "팀", field: "team", width: 110 },
    { headerName: "직책", field: "position", width: 110 },
];

export function UI_ADM_9202_W() {
    const isMobile = useIsMobile();
    const [radio, setRadio] = useState<Record<number, string>>(
        () => Object.fromEntries(Array.from({ length: 14 }, (_, i) => [i + 1, "radio1"]))
    );
    const handleRadio = (key: number, value: string) => setRadio(prev => ({ ...prev, [key]: value }));
    const [isOpenModal, setIsOpenModal] = useState(false);
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
        const selectedNos = new Set(selected.map(r => r.id));
        setLeftData(prev => prev.filter(r => !selectedNos.has(r.id)));
        setRightData(prev => [...prev, ...selected].sort((a, b) => b.id - a.id));
    };

    const handleMoveLeft = () => {
        const api = rightGridRef.current?.getApi();
        if (!api) return;
        const selected = api.getSelectedRows() as EmployeeData[];
        if (selected.length === 0) {
            alert("이동할 데이터를 선택해주세요.");
            return;
        }
        const selectedNos = new Set(selected.map(r => r.id));
        setRightData(prev => prev.filter(r => !selectedNos.has(r.id)));
        setLeftData(prev => [...prev, ...selected].sort((a, b) => b.id - a.id));
    };

    return (
        <>
            <Layout title="게시판 등록/수정" favorite={false} activeMenuId="">

                {/* Form Table */}
                <Table variant="horizontal" caption="게시판 상세">
                    <Table.Row>
                        <Table.Header scope="row" required>게시판명</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Input fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row" required>화면 ID</Table.Header>
                                <Table.Cell>
                                    <Space size="sm">
                                        <Input />
                                        <Button size="sm">중복체크</Button>
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">게시판 ID</Table.Header>
                                <Table.Cell>XXXXX</Table.Cell>
                            </Table.Row>
                        </>

                    ) : (
                        <Table.Row>
                            <Table.Header scope="row" required>화면 ID</Table.Header>
                            <Table.Cell>
                                <Space size="sm">
                                    <Input />
                                    <Button size="sm">중복체크</Button>
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row">게시판 ID</Table.Header>
                            <Table.Cell>XXXXX</Table.Cell>
                        </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Header scope="row">담당자</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Button size="sm" onClick={() => setIsOpenModal(true)}>담당자 관리</Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row">게시판  소개</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Textarea fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row"></Table.Header>
                                <Table.Cell></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row" required>게시판 유형</Table.Header>
                                <Table.Cell>
                                    <Dropdown options={dummyOptions} onChange={() => { }} fullWidth />
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row"></Table.Header>
                            <Table.Cell></Table.Cell>
                            <Table.Header scope="row" required>게시판 유형</Table.Header>
                            <Table.Cell>
                                <Dropdown options={dummyOptions} onChange={() => { }} width={200} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">사용여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup1" label="사용" value="radio1" checked={radio[1] === "radio1"} onChange={() => handleRadio(1, "radio1")} />
                                        <RadioButton name="radioGroup1" label="미사용" value="radio2" checked={radio[1] === "radio2"} onChange={() => handleRadio(1, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">공개 여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup2" label="공개" value="radio1" checked={radio[2] === "radio1"} onChange={() => handleRadio(2, "radio1")} />
                                        <RadioButton name="radioGroup2" label="미공개" value="radio2" checked={radio[2] === "radio2"} onChange={() => handleRadio(2, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup1" label="사용" value="radio1" checked={radio[1] === "radio1"} onChange={() => handleRadio(1, "radio1")} />
                                    <RadioButton name="radioGroup1" label="미사용" value="radio2" checked={radio[1] === "radio2"} onChange={() => handleRadio(1, "radio2")} />
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row">공개 여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup2" label="공개" value="radio1" checked={radio[2] === "radio1"} onChange={() => handleRadio(2, "radio1")} />
                                    <RadioButton name="radioGroup2" label="미공개" value="radio2" checked={radio[2] === "radio2"} onChange={() => handleRadio(2, "radio2")} />
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">게시여부 사용여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup3" label="사용" value="radio1" checked={radio[3] === "radio1"} onChange={() => handleRadio(3, "radio1")} />
                                        <RadioButton name="radioGroup3" label="미사용" value="radio2" checked={radio[3] === "radio2"} onChange={() => handleRadio(3, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">카테고리 사용여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup4" label="사용" value="radio1" checked={radio[4] === "radio1"} onChange={() => handleRadio(4, "radio1")} />
                                        <RadioButton name="radioGroup4" label="미사용" value="radio2" checked={radio[4] === "radio2"} onChange={() => handleRadio(4, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">게시여부 사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup3" label="사용" value="radio1" checked={radio[3] === "radio1"} onChange={() => handleRadio(3, "radio1")} />
                                    <RadioButton name="radioGroup3" label="미사용" value="radio2" checked={radio[3] === "radio2"} onChange={() => handleRadio(3, "radio2")} />
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row">카테고리 사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup4" label="사용" value="radio1" checked={radio[4] === "radio1"} onChange={() => handleRadio(4, "radio1")} />
                                    <RadioButton name="radioGroup4" label="미사용" value="radio2" checked={radio[4] === "radio2"} onChange={() => handleRadio(4, "radio2")} />
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">댓글 사용여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup5" label="사용" value="radio1" checked={radio[5] === "radio1"} onChange={() => handleRadio(5, "radio1")} />
                                        <RadioButton name="radioGroup5" label="미사용" value="radio2" checked={radio[5] === "radio2"} onChange={() => handleRadio(5, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">카테고리 관리</Table.Header>
                                <Table.Cell>
                                    <Space layout="vertical" size={14}>
                                        <Space.Item size="sm">
                                            <Input />
                                            <Button size="sm">등록</Button>
                                        </Space.Item>
                                        <Space.Item layout="vertical" align="start" size="sm">
                                            <Space.Item size="sm">
                                                <Input value="기술" disabled />
                                                <Button size="sm">삭제</Button>
                                                <Button variant="outlined" size="sm">수정</Button>
                                            </Space.Item>
                                            <Space.Item size="sm">
                                                <Input value="기술" disabled />
                                                <Button size="sm">삭제</Button>
                                                <Button variant="outlined" size="sm">수정</Button>
                                            </Space.Item>
                                            <Space.Item size="sm">
                                                <Input value="기술" disabled />
                                                <Button size="sm">삭제</Button>
                                                <Button variant="outlined" size="sm">수정</Button>
                                            </Space.Item>
                                            <Space.Item size="sm">
                                                <Input />
                                                <Button size="sm">저장</Button>
                                            </Space.Item>
                                        </Space.Item>
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">댓글 사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup5" label="사용" value="radio1" checked={radio[5] === "radio1"} onChange={() => handleRadio(5, "radio1")} />
                                    <RadioButton name="radioGroup5" label="미사용" value="radio2" checked={radio[5] === "radio2"} onChange={() => handleRadio(5, "radio2")} />
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row" rowSpan={4}>카테고리 관리</Table.Header>
                            <Table.Cell rowSpan={4}>
                                <Space layout="vertical" size={14}>
                                    <Space.Item size="sm">
                                        <Input />
                                        <Button size="sm">등록</Button>
                                    </Space.Item>
                                    <div style={{ maxHeight: 168, overflowY: "auto" }}>
                                        <Space.Item layout="vertical" align="start" size="sm">
                                            <Space.Item size="sm">
                                                <Input value="기술" disabled />
                                                <Button size="sm">삭제</Button>
                                                <Button variant="outlined" size="sm">수정</Button>
                                            </Space.Item>
                                            <Space.Item size="sm">
                                                <Input value="기술" disabled />
                                                <Button size="sm">삭제</Button>
                                                <Button variant="outlined" size="sm">수정</Button>
                                            </Space.Item>
                                            <Space.Item size="sm">
                                                <Input value="기술" disabled />
                                                <Button size="sm">삭제</Button>
                                                <Button variant="outlined" size="sm">수정</Button>
                                            </Space.Item>
                                            <Space.Item size="sm">
                                                <Input />
                                                <Button size="sm">저장</Button>
                                            </Space.Item>
                                        </Space.Item>
                                    </div>
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Header scope="row">상단 고정 사용여부</Table.Header>
                        <Table.Cell>
                            <Space size={24}>
                                <RadioButton name="radioGroup6" label="사용" value="radio1" checked={radio[6] === "radio1"} onChange={() => handleRadio(6, "radio1")} />
                                <RadioButton name="radioGroup6" label="미사용" value="radio2" checked={radio[6] === "radio2"} onChange={() => handleRadio(6, "radio2")} />
                            </Space>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row">출처 사용여부</Table.Header>
                        <Table.Cell>
                            <Space size={24}>
                                <RadioButton name="radioGroup7" label="사용" value="radio1" checked={radio[7] === "radio1"} onChange={() => handleRadio(7, "radio1")} />
                                <RadioButton name="radioGroup7" label="미사용" value="radio2" checked={radio[7] === "radio2"} onChange={() => handleRadio(7, "radio2")} />
                            </Space>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row">사용자 익명 여부</Table.Header>
                        <Table.Cell>
                            <Space size={24}>
                                <RadioButton name="radioGroup8" label="사용" value="radio1" checked={radio[8] === "radio1"} onChange={() => handleRadio(8, "radio1")} />
                                <RadioButton name="radioGroup8" label="미사용" value="radio2" checked={radio[8] === "radio2"} onChange={() => handleRadio(8, "radio2")} />
                            </Space>
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">공개여부 사용여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup9" label="사용" value="radio1" checked={radio[9] === "radio1"} onChange={() => handleRadio(9, "radio1")} />
                                        <RadioButton name="radioGroup9" label="미사용" value="radio2" checked={radio[9] === "radio2"} onChange={() => handleRadio(9, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">게시물 표시 제한</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup10" label="전체" value="radio1" checked={radio[10] === "radio1"} onChange={() => handleRadio(10, "radio1")} />
                                        <RadioButton name="radioGroup10" label="작성자 본인의 게시물만" value="radio2" checked={radio[10] === "radio2"} onChange={() => handleRadio(10, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">공개여부 사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup9" label="사용" value="radio1" checked={radio[9] === "radio1"} onChange={() => handleRadio(9, "radio1")} />
                                    <RadioButton name="radioGroup9" label="미사용" value="radio2" checked={radio[9] === "radio2"} onChange={() => handleRadio(9, "radio2")} />
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row">게시물 표시 제한</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup10" label="전체" value="radio1" checked={radio[10] === "radio1"} onChange={() => handleRadio(10, "radio1")} />
                                    <RadioButton name="radioGroup10" label="작성자 본인의 게시물만" value="radio2" checked={radio[10] === "radio2"} onChange={() => handleRadio(10, "radio2")} />
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">첨부파일 사용여부</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup11" label="사용" value="radio1" checked={radio[11] === "radio1"} onChange={() => handleRadio(11, "radio1")} />
                                        <RadioButton name="radioGroup11" label="미사용" value="radio2" checked={radio[11] === "radio2"} onChange={() => handleRadio(11, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">첨부파일 가능개수</Table.Header>
                                <Table.Cell>
                                    <Space layout="vertical" size={10}>
                                        <Space.Item size={4}>
                                            <Input width={130} />개
                                        </Space.Item>
                                        <Space.Item size={4}>
                                            <Input width={130} /> MB
                                        </Space.Item>
                                        (0일 경우 제한 없음)
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">첨부파일 사용여부</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup11" label="사용" value="radio1" checked={radio[11] === "radio1"} onChange={() => handleRadio(11, "radio1")} />
                                    <RadioButton name="radioGroup11" label="미사용" value="radio2" checked={radio[11] === "radio2"} onChange={() => handleRadio(11, "radio2")} />
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row">첨부파일 가능개수</Table.Header>
                            <Table.Cell>
                                <Space size={10}>
                                    <Space.Item size={4}>
                                        <Input width={130} />개
                                    </Space.Item>
                                    <Space.Item size={4}>
                                        <Input width={130} /> MB (0일 경우 제한 없음)
                                    </Space.Item>
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">등록 제한</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup12" label="담당자" value="radio1" checked={radio[12] === "radio1"} onChange={() => handleRadio(12, "radio1")} />
                                        <RadioButton name="radioGroup12" label="전체" value="radio2" checked={radio[12] === "radio2"} onChange={() => handleRadio(12, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">답글 제한</Table.Header>
                                <Table.Cell>
                                    <Space size={24}>
                                        <RadioButton name="radioGroup13" label="담당자" value="radio1" checked={radio[13] === "radio1"} onChange={() => handleRadio(13, "radio1")} />
                                        <RadioButton name="radioGroup13" label="전체" value="radio2" checked={radio[13] === "radio2"} onChange={() => handleRadio(13, "radio2")} />
                                    </Space>
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">등록 제한</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup12" label="담당자" value="radio1" checked={radio[12] === "radio1"} onChange={() => handleRadio(12, "radio1")} />
                                    <RadioButton name="radioGroup12" label="전체" value="radio2" checked={radio[12] === "radio2"} onChange={() => handleRadio(12, "radio2")} />
                                </Space>
                            </Table.Cell>
                            <Table.Header scope="row">답글 제한</Table.Header>
                            <Table.Cell>
                                <Space size={24}>
                                    <RadioButton name="radioGroup13" label="담당자" value="radio1" checked={radio[13] === "radio1"} onChange={() => handleRadio(13, "radio1")} />
                                    <RadioButton name="radioGroup13" label="전체" value="radio2" checked={radio[13] === "radio2"} onChange={() => handleRadio(13, "radio2")} />
                                </Space>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Header scope="row">파일  업로드 제한</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Space size={24}>
                                <RadioButton name="radioGroup14" label="담당자" value="radio1" checked={radio[14] === "radio1"} onChange={() => handleRadio(14, "radio1")} />
                                <RadioButton name="radioGroup14" label="전체" value="radio2" checked={radio[14] === "radio2"} onChange={() => handleRadio(14, "radio2")} />
                            </Space>
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">수정자</Table.Header>
                                <Table.Cell>홍길동(test1)</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">최종 수정일</Table.Header>
                                <Table.Cell>YYYY-MM-DD</Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">수정자</Table.Header>
                            <Table.Cell>홍길동(test1)</Table.Cell>
                            <Table.Header scope="row">최종 수정일</Table.Header>
                            <Table.Cell>YYYY-MM-DD</Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">등록자</Table.Header>
                                <Table.Cell>홍길동(test1)</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">등록일</Table.Header>
                                <Table.Cell>YYYY-MM-DD</Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">등록자</Table.Header>
                            <Table.Cell>홍길동(test1)</Table.Cell>
                            <Table.Header scope="row">등록일</Table.Header>
                            <Table.Cell>YYYY-MM-DD</Table.Cell>
                        </Table.Row>
                    )}
                </Table>

                <Layout.Row justify="end" gap={8}>
                    <Button variant="outlined" size={isMobile ? "md" : "lg"}>이전</Button>
                    <Button size={isMobile ? "md" : "lg"} onClick={() => { }}>저장</Button>
                </Layout.Row>
            </Layout>

            {/* Modal - 게시판 담당자 관리 */}
            <Modal size="xl" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <Modal.Header title="게시판 담당자 관리" onClose={() => setIsOpenModal(false)} />
                <Modal.Body>
                    <Layout.Row layout={isMobile ? "vertical" : "horizontal"}>
                        <Layout.Col gap={20}>
                            <Typography variant="heading-sm">대상 인원</Typography>

                            {/* SearchBox */}
                            <SearchBox>
                                <SearchBox.Content>
                                    <SearchBox.Row>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Dropdown label="본부" options={dummyOptions} onChange={() => { }} fullWidth />
                                        </SearchBox.Item>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Dropdown label="팀" options={dummyOptions} onChange={() => { }} fullWidth />
                                        </SearchBox.Item>
                                    </SearchBox.Row>

                                    <SearchBox.Row>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Dropdown label="직책" options={dummyOptions} onChange={() => { }} fullWidth />
                                        </SearchBox.Item>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Input label="성명" fullWidth />
                                        </SearchBox.Item>
                                    </SearchBox.Row>
                                </SearchBox.Content>

                                <SearchBox.Actions>
                                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                                </SearchBox.Actions>
                            </SearchBox>

                            {/* Data Grid - Left */}
                            <DataGrid
                                tref={leftGridRef}
                                columns={tableColumns}
                                rowData={leftData}
                                isRowSelection
                                gridLabel="대상 인원 목록"
                                infiniteScroll
                                showHeader
                                initialSort={[{ column: "id", dir: "desc" }]}
                            />

                        </Layout.Col>

                        <Layout.Col layout={isMobile ? "horizontal" : "vertical"} width={isMobile ? "100%" : ''} justify="center" align="center" gap={10}>
                            <Button variant="text" leftIcon={<Icon name={isMobile ? "down" : "right"} size={32} color={isMobile ? "#999" : "#005AAA"} />} aria-label={isMobile ? "아래쪽으로 이동" : "오른쪽으로 이동"} onClick={handleMoveRight} />
                            <Button variant="text" leftIcon={<Icon name={isMobile ? "up" : "left"} size={32} color={isMobile ? "#005AAA" : "#999"} />} aria-label={isMobile ? "위쪽으로 이동" : "왼쪽으로 이동"} onClick={handleMoveLeft} />
                        </Layout.Col>

                        <Layout.Col gap={20}>
                            <Typography variant="heading-sm">미대상 인원</Typography>

                            {/* SearchBox */}
                            <SearchBox>
                                <SearchBox.Content>
                                    <SearchBox.Row>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Dropdown label="본부" options={dummyOptions} onChange={() => { }} fullWidth />
                                        </SearchBox.Item>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Dropdown label="팀" options={dummyOptions} onChange={() => { }} fullWidth />
                                        </SearchBox.Item>
                                    </SearchBox.Row>

                                    <SearchBox.Row>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Dropdown label="직책" options={dummyOptions} onChange={() => { }} fullWidth />
                                        </SearchBox.Item>
                                        <SearchBox.Item width={isMobile ? "100%" : 170}>
                                            <Input label="성명" fullWidth />
                                        </SearchBox.Item>
                                    </SearchBox.Row>
                                </SearchBox.Content>

                                <SearchBox.Actions>
                                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                                </SearchBox.Actions>
                            </SearchBox>

                            {/* Data Grid - Right */}
                            <DataGrid
                                tref={rightGridRef}
                                columns={tableColumns}
                                rowData={rightData}
                                isRowSelection
                                gridLabel="미대상 인원 목록"
                                infiniteScroll
                                showHeader
                                initialSort={[{ column: "id", dir: "desc" }]}
                            />
                        </Layout.Col>
                    </Layout.Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
