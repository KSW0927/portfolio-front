import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Calendar, type CalendarRef, Checkbox, DatePicker, Dropdown, FileUploader, Icon, Input, Layout, Modal, Table, Textarea } from "@/publishing/components";

const dummyOptions = [
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

export function UI_KSP_8380_L() {
    const isMobile = useIsMobile();
    const calendarRef = useRef<CalendarRef>(null);
    const [isOpenModal1, setIsOpenModal1] = useState(false);
    const [isOpenModal2, setIsOpenModal2] = useState(false);
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const modalCheckedList = ["1-2", "2-3", "2-5", "3-1", "3-3", "4-1", "4-5", "5-2"];

    const KOR_HOLIDAYS_2026 = [
        { date: "2026-01-01", title: "신정" },
        { date: "2026-02-16", title: "설날 연휴" },
        { date: "2026-02-17", title: "설날" },
        { date: "2026-02-18", title: "설날 연휴" },
        { date: "2026-03-01", title: "3·1절" },
        { date: "2026-03-02", title: "대체공휴일" },
        { date: "2026-05-05", title: "어린이날" },
        { date: "2026-05-24", title: "부처님오신날" },
        { date: "2026-05-25", title: "대체공휴일" },
        { date: "2026-06-03", title: "전국동시지방선거" },
        { date: "2026-06-06", title: "현충일" },
        { date: "2026-08-15", title: "광복절" },
        { date: "2026-08-17", title: "대체공휴일" },
        { date: "2026-09-24", title: "추석 연휴" },
        { date: "2026-09-25", title: "추석" },
        { date: "2026-09-26", title: "추석 연휴" },
        { date: "2026-10-03", title: "개천절" },
        { date: "2026-10-05", title: "대체공휴일" },
        { date: "2026-10-09", title: "한글날" },
        { date: "2026-12-25", title: "크리스마스" }
    ];

    const events = [
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T09:00:00", end: "2026-05-04T10:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T10:00:00", end: "2026-05-04T12:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T15:00:00", end: "2026-05-04T15:30:00", color: "#773ED9", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T16:00:00", end: "2026-05-04T17:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T18:00:00", end: "2026-05-04T19:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T19:00:00", end: "2026-05-04T20:30:00", color: "#773ED9", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-09T09:00:00", end: "2026-05-09T09:30:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-09T09:30:00", end: "2026-05-09T10:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-13T09:00:00", end: "2026-05-13T09:30:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-13T10:00:00", end: "2026-05-13T10:30:00", color: "#773ED9", display: "list-item" },
    ];

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
            <Layout title="회의실 사용 일정" activeMenuId="">

                {/* Calendar */}
                <Calendar
                    ref={calendarRef}
                    events={events}
                    holidays={KOR_HOLIDAYS_2026}
                    ariaLabel="회의실 사용 일정"
                    onEventClick={() => setIsOpenModal2(true)}
                    options={{
                        initialDate: "2026-05-04",
                        displayEventTime: true,
                        eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: "lowercase", hour12: true },
                        eventDidMount: (info) => { info.el.style.cursor = "pointer"; },
                    }}
                    headerTop={
                        <div className="calendar-legend">
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#E32020" }}></span> 주요업무</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#773ED9" }}></span> 공유업무</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1D59F0" }}></span> 주관업무</div>
                        </div>
                    }
                    headerRight={
                        <>
                            <Button variant="solid" size={isMobile ? "md" : "lg"} leftIcon={<Icon name="add" size={24} color="#FFF" />} onClick={() => setIsOpenModal1(true)}>회의실 사용 예약</Button>
                        </>
                    }
                />
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

            {/* Modal - 회의실 사용 */}
            <Modal size="xl" isOpen={isOpenModal2} onClose={() => setIsOpenModal2(false)}>
                <Modal.Header title="회의실 사용" onClose={() => setIsOpenModal2(false)} />
                <Modal.Body>
                    <Table variant="horizontal">
                        <Table.Row>
                            <Table.Header scope="row">업무 제목</Table.Header>
                            <Table.Cell colSpan={3}>업무 제목</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">회의실</Table.Header>
                            <Table.Cell colSpan={3}>본사 - 소회의실 1</Table.Cell>
                        </Table.Row>
                        {isMobile ? (
                            <>
                                <Table.Row>
                                    <Table.Header scope="row">회의실 사용 시작일시</Table.Header>
                                    <Table.Cell>2026-10-10 10:00</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header scope="row">회의실 사용 종료일시</Table.Header>
                                    <Table.Cell>2026-10-10 10:00</Table.Cell>
                                </Table.Row>
                            </>
                        ) : (
                            <Table.Row>
                                <Table.Header scope="row">회의실 사용 시작일시</Table.Header>
                                <Table.Cell>2026-10-10 10:00</Table.Cell>
                                <Table.Header scope="row">회의실 사용 종료일시</Table.Header>
                                <Table.Cell>2026-10-10 10:00</Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Header scope="row">업무 내용</Table.Header>
                            <Table.Cell colSpan={3}>주간회의 진행</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">주관팀</Table.Header>
                            <Table.Cell colSpan={3}>영업본부 &gt; 가스팀</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">담당자</Table.Header>
                            <Table.Cell colSpan={3}>홍길동(B12345)</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">일정공유</Table.Header>
                            <Table.Cell colSpan={3}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <Checkbox.Group
                                        options={shareOptions1}
                                        value={modalCheckedList}
                                        onChange={() => { }}
                                        layout="horizontal"
                                        readOnly
                                    />
                                    <Checkbox.Group
                                        options={shareOptions2}
                                        value={modalCheckedList}
                                        onChange={() => { }}
                                        layout="horizontal"
                                        readOnly
                                    />
                                    <Checkbox.Group
                                        options={shareOptions3}
                                        value={modalCheckedList}
                                        onChange={() => { }}
                                        layout="horizontal"
                                        readOnly
                                    />
                                    <Checkbox.Group
                                        options={shareOptions4}
                                        value={modalCheckedList}
                                        onChange={() => { }}
                                        layout="horizontal"
                                        readOnly
                                    />
                                    <Checkbox.Group
                                        options={shareOptions5}
                                        value={modalCheckedList}
                                        onChange={() => { }}
                                        layout="horizontal"
                                        readOnly
                                    />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">작성이력</Table.Header>
                            <Table.Cell colSpan={3}>
                                등록 : 홍길동(B12345) 2010-10-10 10:00<br />
                                수정 : 홍길동(B12345) 2010-10-10 10:00
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header scope="row">회의자료 업로드</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Button variant="text" size="lg" leftIcon={<Icon name="attachment" size={24} />}>업무숙련도_평가.pdf</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="solid" color="primary" onClick={() => setIsOpenModal1(false)}>저장</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}