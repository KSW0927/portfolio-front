import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Calendar, type CalendarRef, Checkbox, DateRangePicker, Dropdown, Icon, Input, Layout, List, Modal, SearchBox, Table, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
]

export function UI_KSP_8400_W() {
    const isMobile = useIsMobile();
    const calendarRef = useRef<CalendarRef>(null);
    // const [viewType, setViewType] = useState<"Month" | "List">("Month");

    const [isOpen, setIsOpen] = useState(false);

    const [doubleRange, setDoubleRange] = useState<[Date | null, Date | null]>([null, null]);
    const [start, end] = doubleRange;

    const [peopleCount, setPeopleCount] = useState("");
    const [isPeopleCountError, setIsPeopleCountError] = useState(false);

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
        // NOTE: end 날짜는 포함되지 않으므로, 표현하고 싶은 마지막 날짜의 다음 날을 적어야 합니다.
        { title: "[결재완료]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
        { title: "[결재완료]", date: "2026-05-17", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", date: "2026-05-17", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", date: "2026-05-17", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
    ];

    // 휴양시설 사용 인원 입력 핸들러
    const handlePeopleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPeopleCount(value);

        if (value.length > 0 && /[^0-9]/.test(value)) {
            setIsPeopleCountError(true);
        } else {
            setIsPeopleCountError(false);
        }
    };

    return (
        <>
            <Layout title="휴양시설 현황 및 신청" extra={(<Typography variant="heading-md">신청기간: 2026-10-10 ~ 2026-10-31</Typography>)} activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="진행상태" options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item width={isMobile ? "100%" : 288}>
                                <Dropdown label="휴양시설 구분" options={dummyOptions} fullWidth />
                                <Dropdown options={dummyOptions} fullWidth />
                            </SearchBox.Item>
                            <SearchBox.Item>
                                <Checkbox label="내가 속한 현황만 보기" />
                            </SearchBox.Item>
                        </SearchBox.Row>
                    </SearchBox.Content>

                    <SearchBox.Actions>
                        <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                        <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                    </SearchBox.Actions>
                </SearchBox>

                {/* Calendar */}

                <Calendar
                    ref={calendarRef}
                    events={events}
                    holidays={KOR_HOLIDAYS_2026}
                    ariaLabel="휴양시설 신청 현황"
                    options={{
                        initialDate: "2026-05-11",
                        displayEventTime: true,
                        eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: "lowercase", hour12: true }
                    }}
                    headerTop={
                        <div className="calendar-legend">
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#773ED9" }}></span> 신청중</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#E32020" }}></span> 예약취소</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1D59F0" }}></span> 신청완료</div>
                        </div>
                    }
                    headerRight={
                        <Button variant="solid" size="lg" leftIcon={<Icon name="add" size={24} color="#FFF" />} onClick={() => setIsOpen(true)}>휴양시설 예약</Button>
                    }
                />
            </Layout>

            {/* Modal - 휴양시설 신청 */}
            <Modal size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header title="휴양시설 신청/수정" onClose={() => setIsOpen(false)} />
                <Modal.Body>
                    {/* Information */}
                    <Box variant="info">
                        <List as="ul" size="sm">
                            <List.Item>휴양시설은 KSS 해운 임직원은 누구나 이용가능합니다.</List.Item>
                            <List.Item>임직원의 배우자, 직계존비속, 배우자의 부모에 한하여 임직원의 동행 없이도 이용가능</List.Item>
                            <List.Item>휴양시설은 최대 2박 3일을 원칙으로 신청해주세요.</List.Item>
                            <List.Item>신청 확정된 경우에만 달력현황에 표기됩니다.</List.Item>
                            <List.Item>신청 결과는 마이페이지에서 확인 가능합니다.</List.Item>
                        </List>
                    </Box>

                    {/* Form Table */}
                    <Table variant="horizontal">
                        {isMobile ? (
                            <>
                                <Table.Row>
                                    <Table.Header>신청인</Table.Header>
                                    <Table.Cell>
                                        <Input value="홍길동(A200241)" fullWidth disabled />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Header>신청일</Table.Header>
                                    <Table.Cell>
                                        <Input value="2026-10-10 / 15:02" fullWidth disabled />
                                    </Table.Cell>
                                </Table.Row>
                            </>
                        ) : (
                            <Table.Row>
                                <Table.Header>신청인</Table.Header>
                                <Table.Cell>
                                    <Input value="홍길동(A200241)" fullWidth disabled />
                                </Table.Cell>
                                <Table.Header>신청일</Table.Header>
                                <Table.Cell>
                                    <Input value="2026-10-10 / 15:02" fullWidth disabled />
                                </Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Header>신청가용 일수</Table.Header>
                            <Table.Cell colSpan={isMobile ? 0 : 3}>
                                신청가능 일수 : 2일 (1년 기준 최대 3박 가능)
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>휴양시설 구분</Table.Header>
                            <Table.Cell colSpan={isMobile ? 0 : 3}>
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    width={isMobile ? "100%" : 170}
                                />
                                <Dropdown
                                    options={dummyOptions}
                                    onChange={() => { }}
                                    width={isMobile ? "100%" : 170}
                                />
                                <Button>휴양시설 정보 바로가기</Button>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>핸드폰 번호</Table.Header>
                            <Table.Cell colSpan={isMobile ? 0 : 3}>
                                <Input placeholder="핸드폰 번호를 입력해 주세요." fullWidth />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>휴양시설 사용 인원</Table.Header>
                            <Table.Cell colSpan={isMobile ? 0 : 3}>
                                <Input
                                    placeholder="사용 인원수를 숫자로 입력해 주세요. (예시:2)"
                                    fullWidth
                                    value={peopleCount}
                                    onChange={handlePeopleCountChange}
                                    isError={isPeopleCountError}
                                    errorMsg="숫자만 입력해 주시기바랍니다" />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Header required>휴양시설 신청 기간</Table.Header>
                            <Table.Cell colSpan={isMobile ? 0 : 3}>
                                {/* 
                                    IF 신청가용 일수를 초과: errorMsg="신청가능일수를 초과할 수 없습니다."
                                    IF 해당시설의 사용한도 초과: errorMsg="해당 시설의 사용한도를 초과할 수 없습니다."
                                */}
                                <DateRangePicker startDate={start} endDate={end} onChange={(dates) => setDoubleRange(dates)} errorMsg="" />
                            </Table.Cell>
                        </Table.Row>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>신청하기</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}