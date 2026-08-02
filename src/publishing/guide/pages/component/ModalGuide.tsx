import { useState } from "react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Modal, Button, Typography, SearchBox, Dropdown, Icon, DataGrid, Badge } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";
import { useIsMobile } from "@/hooks/useIsMobile";

const dummyData: { no: string, idNo: string, name: string, dept: string, team: string, date: string, status: string }[] = [
    { no: "10", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "2020-10-10 15:25", status: "수강 완료" },
    { no: "9", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "수강 완료" },
    { no: "8", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "7", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "6", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "5", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "4", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "3", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "2", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
    { no: "1", idNo: "12345", name: "홍길동", dept: "영업본부", team: "가스팀", date: "-", status: "미수강" },
];

const tableColumns: ColDef[] = [
    { headerName: "번호", field: "no", maxWidth: 80 },
    { headerName: "사번", field: "idNo" },
    { headerName: "성명", field: "name" },
    { headerName: "본부", field: "dept" },
    { headerName: "팀", field: "team" },
    { headerName: "수강일시", field: "date", minWidth: 170 },
    {
        headerName: "상태",
        field: "status",
        minWidth: 120,
        cellRenderer: ({ value }: ICellRendererParams) => (
            <Badge color={value === "수강 완료" ? "blue" : "red"} dot>{value}</Badge>
        ),
    },
];

export default function ModalGuide() {
    const isMobile = useIsMobile();
    const [isBasicOpen, setIsBasicOpen] = useState(false);

    const [isSmOpen, setIsSmOpen] = useState(false);
    const [isMdOpen, setIsMdOpen] = useState(false);
    const [isLgOpen, setIsLgOpen] = useState(false);
    const [isXlOpen, setIsXlOpen] = useState(false);

    const [isLockOpen, setIsLockOpen] = useState(false);

    const dummyOptions = [
        { label: "전체", value: "0" },
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
        { label: "Option 4", value: "4" },
        { label: "Option 5", value: "5" },
    ];

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Modal (사용자 정의 팝업)</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        화면 최상단에 띄워져 입력 폼, 데이터 그리드 등 복잡한 사용자 화면을 구성할 때 사용하는 모달 컴포넌트입니다.<br />
                        React의 상태(State)를 기반으로 렌더링을 제어하며 <code>Modal.Header</code>, <code>Modal.Body</code>, <code>Modal.Footer</code>를 조합해 레이아웃을 잡습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <p className="guide-desc">
                            데이터 추가, 수정 등의 입력 폼을 제공하는 가장 기본적인 모달 형태입니다. (기본 사이즈: md)
                        </p>

                        <div className="comp-preview">
                            <Button onClick={() => setIsBasicOpen(true)}>기본 모달 열기</Button>

                            <Modal isOpen={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
                                <Modal.Header title="부서별 교육영상 현황" onClose={() => setIsBasicOpen(false)} />
                                <Modal.Body title="대상 인원">
                                    <SearchBox>
                                        <SearchBox.Content>
                                            <SearchBox.Row>
                                                <SearchBox.Item>
                                                    <Dropdown label="소속" value="0" options={dummyOptions} />
                                                    <Dropdown value="0" options={dummyOptions} />
                                                </SearchBox.Item>
                                                <SearchBox.Item>
                                                    <Dropdown label="상태" value="0" options={dummyOptions} />
                                                </SearchBox.Item>
                                            </SearchBox.Row>

                                            <SearchBox.Row>
                                                <SearchBox.Item>
                                                    <Dropdown label="성명" value="0" options={dummyOptions} />
                                                </SearchBox.Item>
                                            </SearchBox.Row>
                                        </SearchBox.Content>

                                        <SearchBox.Actions>
                                            <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                                            <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                                        </SearchBox.Actions>
                                    </SearchBox>

                                    <DataGrid
                                        columns={tableColumns}
                                        rowData={dummyData}
                                        pageSize={isMobile ? 5 : 10}
                                        totalCount={dummyData.length}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="solid" color="primary" onClick={() => setIsBasicOpen(false)}>확인</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        <CodeBlock isComponent={true} code={`const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isBasicOpen} onClose={() => setIsOpen(false)}>
    <Modal.Header title="부서별 교육영상 현황" onClose={() => setIsOpen(false)} />
    <Modal.Body title="대상 인원">
        <SearchBox>...</SearchBox>

        <DataGrid>...</DataGrid>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>확인</Button>
    </Modal.Footer>
</Modal>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            <code>size</code> 속성을 통해 컨텐츠의 양에 맞는 모달 가로 크기를 4단계로 설정할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                <Button variant="outlined" onClick={() => setIsSmOpen(true)}>SM (468px)</Button>
                                <Button variant="outlined" onClick={() => setIsMdOpen(true)}>MD (848px - Default)</Button>
                                <Button variant="outlined" onClick={() => setIsLgOpen(true)}>LG (1188px)</Button>
                                <Button variant="outlined" onClick={() => setIsXlOpen(true)}>XL (1336px)</Button>
                            </div>

                            {/* SM Modal */}
                            <Modal isOpen={isSmOpen} onClose={() => setIsSmOpen(false)} size="sm">
                                <Modal.Header title="Small Modal" onClose={() => setIsSmOpen(false)} />
                                <Modal.Body>단순한 비밀번호 확인 폼이나 소량의 컨텐츠에 적합합니다.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outlined" onClick={() => setIsSmOpen(false)}>취소</Button>
                                    <Button variant="solid" color="primary" onClick={() => setIsSmOpen(false)}>확인</Button>
                                </Modal.Footer>
                            </Modal>

                            {/* MD Modal */}
                            <Modal isOpen={isMdOpen} onClose={() => setIsMdOpen(false)} size="md">
                                <Modal.Header title="Medium Modal" onClose={() => setIsMdOpen(false)} />
                                <Modal.Body>일반적인 폼 전송에 사용되는 기본 사이즈입니다.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outlined" onClick={() => setIsMdOpen(false)}>취소</Button>
                                    <Button variant="solid" color="primary" onClick={() => setIsMdOpen(false)}>확인</Button>
                                </Modal.Footer>
                            </Modal>

                            {/* LG Modal */}
                            <Modal isOpen={isLgOpen} onClose={() => setIsLgOpen(false)} size="lg">
                                <Modal.Header title="Large Modal" onClose={() => setIsLgOpen(false)} />
                                <Modal.Body>조직도 선택이나 많은 데이터 입력을 요구하는 화면에 적합합니다.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outlined" onClick={() => setIsLgOpen(false)}>취소</Button>
                                    <Button variant="solid" color="primary" onClick={() => setIsLgOpen(false)}>확인</Button>
                                </Modal.Footer>
                            </Modal>

                            {/* XL Modal */}
                            <Modal isOpen={isXlOpen} onClose={() => setIsXlOpen(false)} size="xl">
                                <Modal.Header title="Extra Large Modal" onClose={() => setIsXlOpen(false)} />
                                <Modal.Body>데이터 그리드(DataGrid)나 다량의 컨텐츠가 포함되어야 할 때 사용합니다.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outlined" onClick={() => setIsXlOpen(false)}>취소</Button>
                                    <Button variant="solid" color="primary" onClick={() => setIsXlOpen(false)}>확인</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        <CodeBlock isComponent={true} code={`<Modal size="sm" ...> {/* 468px */} </Modal>
<Modal size="md" ...> {/* 848px */} </Modal>
<Modal size="lg" ...> {/* 1188px */} </Modal>
<Modal size="xl" ...> {/* 1336px */} </Modal>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Overlay Click Control</h3>
                        <p className="guide-desc">
                            입력 폼이 많아 실수로 모달이 닫히는 것을 방지해야 할 경우 <code>closeOnOverlayClick={`{false}`}</code>를 적용하여 뒷 배경 클릭을 막을 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <Button onClick={() => setIsLockOpen(true)} color="primary">배경 클릭 잠금 모달 열기</Button>

                            <Modal isOpen={isLockOpen} onClose={() => setIsLockOpen(false)} closeOnOverlayClick={false}>
                                <Modal.Header title="작업 중단 방지" onClose={() => setIsLockOpen(false)} />
                                <Modal.Body>
                                    <Typography variant="body-lg" weight="semibold">바깥 어두운 배경을 클릭해보세요.</Typography>
                                    <p style={{ marginTop: "8px" }}>모달이 닫히지 않습니다. 오직 "X" 버튼이나 하단의 "닫기" 버튼을 통해서만 닫을 수 있습니다.</p>
                                    <div style={{ height: "400px", backgroundColor: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", marginTop: "20px" }}>
                                        <span style={{ color: "#999" }}>스크롤 테스트용 긴 영역 (Body에 자동 스크롤 생성됨)</span>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="solid" onClick={() => setIsLockOpen(false)}>닫기</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <CodeBlock isComponent={true} code={`<Modal isOpen={isOpen} onClose={handleClose} closeOnOverlayClick={false}>
...
</Modal>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4 mt-20">Modal</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th">Prop</th>
                                        <th className="guide-th">Type</th>
                                        <th className="guide-th">Default</th>
                                        <th className="guide-th">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>isOpen</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">모달의 렌더링 여부를 결정합니다. 필수 값입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onClose</code></td>
                                        <td className="guide-td"><code>() =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">모달을 닫는 상태 변경 함수입니다. 오버레이(배경) 클릭 시 작동합니다. 필수 값입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"sm" | "md" | "lg" | "xl"</code></td>
                                        <td className="guide-td"><code>"md"</code></td>
                                        <td className="guide-td">모달 창의 가로 폭 크기를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>closeOnOverlayClick</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>true</code></td>
                                        <td className="guide-td"><code>false</code> 지정 시 뒷 배경을 클릭해도 모달이 닫히지 않습니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>closeOnEsc</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>true</code></td>
                                        <td className="guide-td"><code>false</code> 지정 시 ESC 키를 눌러도 모달이 닫히지 않습니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>ariaLabel</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">스크린리더가 모달 역할을 읽을 때 사용할 레이블입니다. <code>Modal.Header</code>에 <code>title</code>이 있으면 자동 연결되므로 생략 가능합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Modal.Header</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th">Prop</th>
                                        <th className="guide-th">Type</th>
                                        <th className="guide-th">Default</th>
                                        <th className="guide-th">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>title</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">좌측 상단에 표시될 모달 타이틀입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>showCloseBtn</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>true</code></td>
                                        <td className="guide-td">우측 상단 X 닫기 버튼의 노출 여부를 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onClose</code></td>
                                        <td className="guide-td"><code>() =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">닫기(X) 버튼 클릭 시 호출되는 함수입니다. 보통 부모의 <code>onClose</code>를 넘겨줍니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Modal.Body</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th">Prop</th>
                                        <th className="guide-th">Type</th>
                                        <th className="guide-th">Default</th>
                                        <th className="guide-th">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>title</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">바디 영역 상단에 굵게 표시될 소제목입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}