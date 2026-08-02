import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Calendar, type CalendarRef, Checkbox, DatePicker, Dropdown, FileUploader, Icon, Input, Layout, Modal, Table, Textarea } from "@/publishing/components";

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

export function SubCalendar() {
    const isMobile = useIsMobile();
    /** 캘린더 컴포넌트의 인스턴스 참조를 위한 ref입니다. */
    const calendarRef = useRef<CalendarRef>(null);
    /** 모달의 열림/닫힘 상태를 관리합니다. */
    const [isOpen, setIsOpen] = useState(false);
    /** 회의실 사용 시작 일시 상태입니다. */
    const [sdate, setsDate] = useState<Date | null>(null);
    /** 회의실 사용 종료 일시 상태입니다. */
    const [edate, seteDate] = useState<Date | null>(null);
    /** 일정공유 항목들 중 현재 선택된 체크박스 값들의 배열입니다. */
    const [checkedList, setCheckedList] = useState<string[]>([]);

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
        // NOTE: end 날짜는 포함되지 않으므로, 표현하고 싶은 마지막 날짜의 다음 날을 적어야 합니다.
        { title: "[결재완료]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
        { title: "[결재완료]", date: "2026-05-17", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", date: "2026-05-17", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", date: "2026-05-17", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
    ];

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
            <Layout title="샘플 서브 페이지(Calendar)" activeMenuId="">

                {/* Calendar */}
                <Calendar
                    ref={calendarRef}
                    events={events}
                    holidays={KOR_HOLIDAYS_2026}
                    // DEV: 달력에 맞는 내용 입력 필요 ex) 거래처 면담 일정
                    ariaLabel="회의실 예약 일정"
                    options={{
                        initialDate: "2026-05-04",
                        displayEventTime: true,
                        eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: "lowercase", hour12: true }
                    }}
                    headerTop={
                        <div className="calendar-legend">
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#E32020" }}></span> 주요업무</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#773ED9" }}></span> 주요업무</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1D59F0" }}></span> 주관업무</div>
                        </div>
                    }
                    headerRight={
                        <>
                            <Button variant="solid" size={isMobile ? "md" : "lg"} leftIcon={<Icon name="add" size={24} color="#FFF" />} onClick={() => setIsOpen(true)}>회의실 사용 예약</Button>
                        </>
                    }
                />
            </Layout>

            {/* Modal - 회의실 예약 */}
            <Modal size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header title="회의실 사용 예약/수정" onClose={() => setIsOpen(false)} />
                <Modal.Body>
                    <Table variant="horizontal">
                        <Table.Row>
                            <Table.Header required>업무제목</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Input placeholder="업무 제목을 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>회의실</Table.Header>
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
                            <Table.Header required>회의실 사용 시작일시</Table.Header>
                            <Table.Cell>
                                <DatePicker
                                    selected={sdate}
                                    onChange={(newDate) => setsDate(newDate)}
                                    width={200}
                                    isTimer
                                />
                            </Table.Cell>
                            <Table.Header required>회의실 사용 종료일시</Table.Header>
                            <Table.Cell>
                                <DatePicker
                                    selected={edate}
                                    onChange={(newDate) => seteDate(newDate)}
                                    width={200}
                                    isTimer
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header>업무 내용</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Textarea placeholder="상세 내용을 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header>주관팀</Table.Header>
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
                            <Table.Header>담당자</Table.Header>
                            <Table.Cell colSpan={3}>
                                <Input placeholder="담당자를 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header>일정공유</Table.Header>
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
                            <Table.Header>회의자료 업로드</Table.Header>
                            <Table.Cell colSpan={3}>
                                <FileUploader />
                            </Table.Cell>
                        </Table.Row>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>저장</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}