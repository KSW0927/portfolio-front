import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { ColDef } from "ag-grid-community";
import { Button, Checkbox, DataGrid, DatePicker, DateRangePicker, Dropdown, FileUploader, Icon, Input, Layout, Modal, SearchBox, Table, Textarea, Typography } from "@/publishing/components";
import { AlertService } from "@/utils/AlertService";

const dummyOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

const shareOptions1 = [
    { label: "전체공유", value: "1-1" },
    { label: "본사공유", value: "1-2" },
    { label: "해사본부공유", value: "1-3" },
];

const shareOptions2 = [
    { label: "경영관리팀", value: "2-1" }, { label: "자금팀", value: "2-2" },
    { label: "회계팀", value: "2-3" }, { label: "경영지원본부", value: "2-4" },
    { label: "가스팀", value: "2-5" }, { label: "탱커팀", value: "2-6" },
    { label: "케미칼팀", value: "2-7" }, { label: "영업본부", value: "2-8" },
];

const shareOptions3 = [
    { label: "기획전략팀", value: "3-1" }, { label: "ESG경영팀", value: "3-2" },
    { label: "기획관리본부", value: "3-3" }, { label: "비상계획부", value: "3-4" },
    { label: "동경사무소", value: "3-5" }, { label: "싱가포르사무소", value: "3-6" },
    { label: "내부회계관리팀", value: "3-7" },
];

const shareOptions4 = [
    { label: "해상인사팀", value: "4-1" }, { label: "해사기획팀", value: "4-2" },
    { label: "정보기술팀", value: "4-3" }, { label: "해사업무팀", value: "4-4" },
    { label: "해사운영본부", value: "4-5" }, { label: "안전품질 1팀", value: "4-6" },
    { label: "안전품질 2팀", value: "4-7" },
];

const shareOptions5 = [
    { label: "선박관리 1팀", value: "5-1" }, { label: "선박관리 2팀", value: "5-2" },
    { label: "해사관리본부", value: "5-3" }, { label: "안전보건경영팀", value: "5-4" },
];

const ALL_SHARE_VALUES = [
    ...shareOptions1, ...shareOptions2, ...shareOptions3, ...shareOptions4, ...shareOptions5
].map(opt => opt.value);

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", width: 80, minWidth: 80, flex: 0, sortable: true, },
    { headerName: "이름", field: "name" },
    { headerName: "휴대폰", field: "mobile" },
    { headerName: "회사", field: "company" },
    { headerName: "부서", field: "depart" },
    { headerName: "직함", field: "title" },
    { headerName: "전자 메일 주소", field: "email" },
    {
        headerName: "선택", field: "select", minWidth: 140,
        cellRenderer: () => {
            return (
                <Button variant="outlined" size="sm">
                    선택
                </Button>
            );
        },
    }
];

const tableData = Array.from({ length: 20 }, (_, i) => ({
    no: String(20 - i), name: "홍길동", mobile: "010-1234-5678", company: "(주)KSS해운", depart: "경영지원본부", title: "선임", email: "kss.hw@kssline.com",
}));

export function UI_KSP_8202_W() {
    const isMobile = useIsMobile();
    const [isOpenModal1, setIsOpenModal1] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const handleSave = () => AlertService.success("저장이 완료되었습니다.");

    /**
     * 일정공유 체크박스 그룹의 상태 변경을 제어하는 핸들러 함수입니다.
     * 다음과 같은 업무 규칙(Business Logic)을 포함합니다:
     * 1. "전체공유(1-1)" 선택 시: 1-2, 1-3을 제외한 모든 하위 팀 자동 선택
     * 2. "전체공유(1-1)" 해제 시: 1-2, 1-3의 기존 상태 유지 및 나머지 전체 해제
     * 3. "본사공유(1-2)" 또는 "해사본부공유(1-3)" 선택 시: "정보기술팀(4-3)" 무조건 포함
     * 4. 하위 팀 전체 직접 선택 시: "전체공유(1-1)" 자동 활성화 연동
     *
     * @param {string[]} newValues - 체크박스 컴포넌트에서 전달된 최신 선택 값 배열
     */
    const handleCheckboxChange = (newValues: string[]) => {
        const addedItem = newValues.find(v => !checkedList.includes(v));
        const removedItem = checkedList.find(v => !newValues.includes(v));

        let nextList = [...newValues];
        const subTeams = ALL_SHARE_VALUES.filter(v => v !== "1-1" && v !== "1-2" && v !== "1-3");

        if (addedItem === "1-1") {
            nextList = ["1-1", ...subTeams];
        } else if (removedItem === "1-1") {
            nextList = nextList.filter(v => v === "1-2" || v === "1-3");
        } else {
            if (nextList.includes("1-2") || nextList.includes("1-3")) {
                if (!nextList.includes("4-3")) {
                    nextList.push("4-3");
                }
            }

            const isAllSubTeamsChecked = subTeams.every(v => nextList.includes(v));

            if (isAllSubTeamsChecked) {
                if (!nextList.includes("1-1")) nextList.push("1-1");
            } else {
                nextList = nextList.filter(v => v !== "1-1");
            }
        }

        setCheckedList([...new Set(nextList)]);
    };

    return (
        <>
            <Layout title="거래처면담 등록/수정" favorite={false} activeMenuId="">

                {/* Form Table */}
                <Table variant="horizontal" caption="거래처면담 등록 및 수정 양식">
                    <Table.Row>
                        <Table.Header scope="row" required>구분</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Dropdown
                                options={dummyOptions}
                                onChange={() => { }}
                                width={isMobile ? "100%" : 200}
                            />
                            <Button variant="filled" onClick={() => setIsOpenModal1(true)}>회의실 예약하기</Button>
                            <Typography variant="body-lg" as={isMobile ? "p" : "span"}>회의실 예약 시 장소, 면담시간이 자동으로 불러 출력 됩니다.</Typography>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row" required>회의 장소</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Input value="회의장소 자동 출력" disabled width={isMobile ? "100%" : 200} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row" required>면담 시간</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <DateRangePicker startDate={null} endDate={null} onChange={() => { }} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row" required>면담 대상자</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <Input width={isMobile ? "100%" : 200} />
                            <Button variant="filled" onClick={() => setIsOpenModal2(true)}>주소록에서 기본정보 불러오기</Button>
                        </Table.Cell>
                    </Table.Row>
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">소속</Table.Header>
                                <Table.Cell>
                                    <Input fullWidth />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">부서</Table.Header>
                                <Table.Cell>
                                    <Input fullWidth />
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">소속</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                            <Table.Header scope="row">부서</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {isMobile ? (
                        <>
                            <Table.Row>
                                <Table.Header scope="row">직함</Table.Header>
                                <Table.Cell>
                                    <Input fullWidth />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Header scope="row">연락처</Table.Header>
                                <Table.Cell>
                                    <Input fullWidth />
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <Table.Row>
                            <Table.Header scope="row">직함</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                            <Table.Header scope="row">연락처</Table.Header>
                            <Table.Cell>
                                <Input fullWidth />
                            </Table.Cell>
                        </Table.Row>
                    )}
                    <Table.Row>
                        <Table.Header scope="row">참석자</Table.Header>
                        <Table.Cell colSpan={isMobile ? 0 : 3}>
                            <Input fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row" required>면담제목</Table.Header>
                        <Table.Cell colSpan={isMobile ? 0 : 3}>
                            <Input fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row" required>면담 목적</Table.Header>
                        <Table.Cell colSpan={isMobile ? 0 : 3}>
                            <Textarea placeholder="면담 목적을 입력해 주세요." fullWidth />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Header scope="row">첨부파일</Table.Header>
                        <Table.Cell colSpan={isMobile ? 1 : 3}>
                            <FileUploader />
                        </Table.Cell>
                    </Table.Row>
                </Table>

                <Layout.Row justify="end" gap={8}>
                    <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
                    <Button size={isMobile ? "md" : "lg"} onClick={handleSave}>저장</Button>
                </Layout.Row>
            </Layout>

            {/* Modal - 회의실 예약 */}
            <Modal size="lg" isOpen={isOpenModal1} onClose={() => setIsOpenModal1(false)}>
                <Modal.Header title="회의실 사용 예약/수정" onClose={() => setIsOpenModal1(false)} />
                <Modal.Body>
                    <Table variant="horizontal">
                        <Table.Row>
                            <Table.Header scope="row" required>업무 제목</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Input placeholder="업무 제목을 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row" required>회의실</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    width={isMobile ? "100%" : 200}
                                />
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    width={isMobile ? "100%" : 200}
                                />
                            </Table.Cell>
                        </Table.Row>
                        {isMobile ? (
                            <>
                                <Table.Row>
                                    <Table.Header scope="row" required>회의실 사용 시작일시</Table.Header>
                                    <Table.Cell>
                                        <DatePicker
                                            selected={null}
                                            onChange={() => { }}
                                            fullWidth
                                            isTimer
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>회의실 사용 종료일시</Table.Header>
                                    <Table.Cell>
                                        <DatePicker
                                            selected={null}
                                            onChange={() => { }}
                                            fullWidth
                                            isTimer
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </>
                        ) : (
                            <Table.Row>
                                <Table.Header scope="row" required>회의실 사용 시작일시</Table.Header>
                                <Table.Cell>
                                    <DatePicker
                                        selected={null}
                                        onChange={() => { }}
                                        width={200}
                                        isTimer
                                    />
                                </Table.Cell>
                                <Table.Header scope="row" required>회의실 사용 종료일시</Table.Header>
                                <Table.Cell>
                                    <DatePicker
                                        selected={null}
                                        onChange={() => { }}
                                        width={200}
                                        isTimer
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Header scope="row">업무 내용</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Textarea placeholder="상세 내용을 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">주관팀</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    width={isMobile ? "100%" : 200}
                                />
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    width={isMobile ? "100%" : 200}
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">담당자</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Input placeholder="담당자를 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">일정공유</Table.Header>
                            <Table.Cell colSpan={3}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <Checkbox.Group
                                        options={shareOptions1}
                                        value={checkedList}
                                        onChange={handleCheckboxChange}
                                        layout="horizontal"
                                    />
                                    <Checkbox.Group
                                        options={shareOptions2}
                                        value={checkedList}
                                        onChange={handleCheckboxChange}
                                        layout="horizontal"
                                    />
                                    <Checkbox.Group
                                        options={shareOptions3}
                                        value={checkedList}
                                        onChange={handleCheckboxChange}
                                        layout="horizontal"
                                    />
                                    <Checkbox.Group
                                        options={shareOptions4}
                                        value={checkedList}
                                        onChange={handleCheckboxChange}
                                        layout="horizontal"
                                    />
                                    <Checkbox.Group
                                        options={shareOptions5}
                                        value={checkedList}
                                        onChange={handleCheckboxChange}
                                        layout="horizontal"
                                    />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">회의자료 업로드</Table.Header>
                            <Table.Cell colSpan={3}>
                                <FileUploader />
                            </Table.Cell>
                        </Table.Row>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="solid" color="primary" onClick={() => setIsOpenModal1(false)}>저장</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal - 거래처 주소록 */}
            <Modal size="lg" isOpen={isOpenModal2} onClose={() => setIsOpenModal2(false)}>
                <Modal.Header title="거래처 주소록" onClose={() => setIsOpenModal2(false)} />
                <Modal.Body>
                    {/* SearchBox */}
                    <SearchBox>
                        <SearchBox.Content>
                            <SearchBox.Row>
                                <SearchBox.Item width={isMobile ? "100%" : 344}>
                                    <Dropdown label="소속" options={dummyOptions} fullWidth />
                                    <Dropdown options={dummyOptions} fullWidth />
                                </SearchBox.Item>
                                <SearchBox.Item width={isMobile ? "100%" : 380}>
                                    <Input label="상세검색" placeholder="회사명, 이름, 부서, 휴대폰, 지역정보를 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
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
                        gridLabel="거래처 목록"
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
