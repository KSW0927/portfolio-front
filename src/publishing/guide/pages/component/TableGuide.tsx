import { Dropdown, Input, Table, Button, DatePicker, Checkbox, Textarea, Typography, FileUploader } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";
import { useState } from "react";

const dropdownOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
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

export default function TableGuide() {
    const [sdate, setsDate] = useState<Date | null>(null);
    const [edate, seteDate] = useState<Date | null>(null);
    const [checkedList, setCheckedList] = useState<string[]>([]);

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
            <header className="guide-content-header">
                <h2 className="guide-h2">Table</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Table 컴포넌트는 용도에 따라 3가지의 <code>variant</code>를 제공합니다.<br />
                        데이터 목록을 나열하는 <code>default</code> 타입과, 입력 폼을 구성할 때 사용하는 <code>vertical</code> / <code>horizontal</code> 타입으로 구분됩니다.<br />
                        <strong>웹 접근성(A11y)</strong>을 위해 <code>caption</code>과 <code>scope</code> 속성 사용을 권장합니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Default</h3>
                        <p className="guide-desc">
                            기본값인 <code>variant="default"</code>는 <code>Table.Head</code>와 <code>Table.Body</code>를 사용하여 일반적인 데이터 표 형식을 렌더링합니다. 넓이가 좁아지면 가로 스크롤이 생성됩니다.<br />
                            상단 제목 줄은 <code>scope="col"</code>을 지정합니다.
                        </p>

                        <div className="comp-preview">
                            <Table variant="default" caption="시스템 점검 및 보고 업무 목록">
                                <Table.Head>
                                    <Table.Row>
                                        <Table.Header scope="col">번호</Table.Header>
                                        <Table.Header scope="col">업무제목</Table.Header>
                                        <Table.Header scope="col">주관팀</Table.Header>
                                        <Table.Header scope="col">등록일</Table.Header>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>2</Table.Cell>
                                        <Table.Cell>2026년도 상반기 결산 및 보고</Table.Cell>
                                        <Table.Cell>경영관리팀</Table.Cell>
                                        <Table.Cell>2026-04-30</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>1</Table.Cell>
                                        <Table.Cell>시스템 정기 점검에 따른 중단 안내</Table.Cell>
                                        <Table.Cell>정보기술팀</Table.Cell>
                                        <Table.Cell>2026-04-29</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>

                        <CodeBlock isComponent={true} code={`<Table variant="default" caption="시스템 점검 및 보고 업무 목록">
    <Table.Head>
        <Table.Row>
            <Table.Header scope="col">번호</Table.Header>
            <Table.Header scope="col">업무제목</Table.Header>
        </Table.Row>
    </Table.Head>
    <Table.Body>
        <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>시스템 정기 점검 안내</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Horizontal</h3>
                        <p className="guide-desc">
                            <code>variant="horizontal"</code>은 좌측에 제목, 우측에 입력 필드가 위치합니다.<br />
                            좌측 제목 셀이 가로줄(행)을 설명하므로 <code>scope="row"</code>를 지정합니다.
                        </p>

                        <div className="comp-preview">
                            <Table variant="horizontal" caption="회의실 예약 정보 입력 폼">
                                <Table.HeaderArea>
                                    <Table.HeaderLeft>
                                        <Typography variant="heading-sm">테이블 타이틀</Typography>
                                    </Table.HeaderLeft>
                                    <Table.HeaderRight>
                                        <Button variant="outlined" size="lg">목록</Button>
                                        <Button variant="solid" size="lg">저장</Button>
                                    </Table.HeaderRight>
                                </Table.HeaderArea>

                                <Table.Row>
                                    <Table.Header scope="row" required>DATA 선택</Table.Header>
                                    <Table.Cell colSpan={3}>
                                        <Dropdown
                                            options={dropdownOptions}
                                            onChange={() => { }}
                                            width={178}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>제목</Table.Header>
                                    <Table.Cell colSpan={3}>
                                        <Input placeholder="제목을 입력해 주세요" fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>비정형 설명</Table.Header>
                                    <Table.Cell colSpan={3}>
                                        <Textarea placeholder="비정형 설명을 입력해 주세요." fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>회의실</Table.Header>
                                    <Table.Cell colSpan={3}>
                                        <Dropdown
                                            options={dropdownOptions}
                                            onChange={() => { }}
                                            width={200}
                                        />
                                        <Dropdown
                                            options={dropdownOptions}
                                            onChange={() => { }}
                                            width={200}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row" required>회의실 사용 일시</Table.Header>
                                    <Table.Cell>
                                        <DatePicker
                                            selected={sdate}
                                            onChange={(newDate) => setsDate(newDate)}
                                            placeholder="YYYY.MM.DD HH:MM"
                                            isTimer
                                            width={200}
                                        />
                                    </Table.Cell>
                                    <Table.Header scope="row" required>회의실 사용 종료일시</Table.Header>
                                    <Table.Cell>
                                        <DatePicker
                                            selected={edate}
                                            onChange={(newDate) => seteDate(newDate)}
                                            placeholder="YYYY.MM.DD HH:MM"
                                            isTimer
                                            width={200}
                                        />
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
                        </div>

                        <CodeBlock isComponent={true} code={`<Table variant="horizontal" caption="회의실 예약 정보 입력 폼">
    <Table.Row>
        <Table.Header scope="row" required>업무제목</Table.Header>
        <Table.Cell>
            <Input placeholder="제목을 입력해 주세요." fullWidth />
        </Table.Cell>
    </Table.Row>
    <Table.Row>
        <Table.Header scope="row">주관팀</Table.Header>
        <Table.Cell>
            <Dropdown options={dropdownOptions} width={240} />
        </Table.Cell>
    </Table.Row>
</Table>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Vertical</h3>
                        <p className="guide-desc">
                            <code>variant="vertical"</code>은 좁은 영역에 적합하게 제목과 입력 필드가 상하로 배치됩니다.
                        </p>

                        <div className="comp-preview">
                            <Table variant="vertical" caption="회의실 예약 정보 입력 폼">
                                <Table.Row>
                                    <Table.Header scope="col" required>업무제목</Table.Header>
                                    <Table.Cell>
                                        <Input placeholder="제목을 입력하세요." fullWidth />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="col">주관팀</Table.Header>
                                    <Table.Cell>
                                        <Dropdown
                                            options={dropdownOptions}
                                            onChange={() => { }}
                                            fullWidth
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table>
                        </div>

                        <CodeBlock isComponent={true} code={`<Table variant="vertical" caption="회의실 예약 정보 입력 폼">
    <Table.Row>
        <Table.Header scope="col" required>업무제목</Table.Header>
        <Table.Cell>
            <Input placeholder="제목을 입력하세요." fullWidth />
        </Table.Cell>
    </Table.Row>
    <Table.Row>
        <Table.Header scope="col">주관팀</Table.Header>
        <Table.Cell>
            <Dropdown options={dropdownOptions} fullWidth />
        </Table.Cell>
    </Table.Row>
</Table>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4 mt-20">Table</h4>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Prop</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"default" | "vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"default"</code></td>
                                        <td className="guide-td">
                                            테이블의 용도 및 정렬을 결정합니다.<br />
                                            - <strong>default:</strong> 데이터 목록 표 (thead/tbody 사용 필요)<br />
                                            - <strong>vertical:</strong> 상하 배치 입력 폼<br />
                                            - <strong>horizontal:</strong> 좌우 배치 입력 폼
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>caption</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">
                                            웹 접근성(A11y)을 위한 테이블의 요약/제목입니다. <br />화면에는 보이지 않지만 스크린 리더가 테이블 구조를 파악하는 데 사용합니다.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Table.Header</h4>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Prop</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>required</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>일 경우 빨간색 별표(*)가 텍스트 우측에 추가됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>scope</code></td>
                                        <td className="guide-td"><code>"col" | "row" | "colgroup" | "rowgroup"</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">
                                            웹 접근성(A11y)을 위해 제목 셀이 가리키는 방향을 명시합니다.<br />
                                            데이터 표(default)는 <code>col</code>, 폼 입력 표(horizontal)는 주로 <code>row</code>를 사용합니다.
                                        </td>
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