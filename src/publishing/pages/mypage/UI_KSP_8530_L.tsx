import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Calendar, type CalendarRef, Checkbox, Divider, Dropdown, Icon, Layout, SearchBox, Space, Typography } from "@/publishing/components";

export function UI_KSP_8530_L() {
    const isMobile = useIsMobile();
    const calendarRef = useRef<CalendarRef>(null);

    const dummyOptions = [
        { label: "전체", value: "all" },
        { label: "출장", value: "1" },
        { label: "반차", value: "2" },
        { label: "반차(촉진)", value: "3" },
        { label: "반차(이월)", value: "4" },
        { label: "반차(보상)", value: "5" },
        { label: "휴가", value: "6" },
        { label: "휴가(촉진)", value: "7" },
        { label: "휴가(이월)", value: "8" },
        { label: "휴가(보상)", value: "9" },
        { label: "특별휴가", value: "10" },
        { label: "병가", value: "11" },
        { label: "재택근무", value: "12" },
        { label: "지각", value: "13" },
        { label: "조퇴", value: "14" },
        { label: "외근", value: "15" },
        { label: "교육", value: "16" },
    ]

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
        { title: "[휴가] 홍길동/[결제완료] XX 202호 (XXX)", start: "2026-05-06", end: "2026-05-09", display: "block", backgroundColor: "#F5F1FC", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[연차] 홍길동", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#D5EBFF", borderColor: "#005AAA", textColor: "#004586" },
    ];

    return (
        <>
            <Layout title="근태/휴가 현황" activeMenuId="">

                {/* SearchBox */}
                <SearchBox>
                    <SearchBox.Content>
                        <SearchBox.Row>
                            <SearchBox.Item width={isMobile ? "100%" : 140}>
                                <Dropdown label="구분" options={dummyOptions} fullWidth />
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
                    ariaLabel="근태/휴가 일정"
                    options={{
                        initialDate: "2026-05-01",
                        displayEventTime: true,
                        eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: "lowercase", hour12: true }
                    }}
                    headerTop={
                        <Box gap={24} variant={isMobile ? "info" : "default"} size={isMobile ? "lg" : ""}>
                            <Space justify="space-between" layout={isMobile ? "vertical" : "horizontal"} size={isMobile ? "sm" : "md"}>
                                <Typography variant="heading-sm">잔여</Typography>
                                <Space size={isMobile ? 0 : 14} separator={!isMobile && (<Divider layout="vertical" size={14} />)} layout={isMobile ? "vertical" : "horizontal"}>
                                    <Space size="sm" align="center">
                                        <Space.Item>
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">남은 휴가일수</Typography>
                                        </Space.Item>
                                        <Space.Item>
                                            <Typography variant="heading-md" as="strong" primary>10</Typography>
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                        </Space.Item>
                                    </Space>
                                    <Space size="sm" align="center">
                                        <Space.Item>
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">이월 휴가일수</Typography>
                                        </Space.Item>
                                        <Space.Item>
                                            <Typography variant="heading-md" as="strong" primary>3</Typography>
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                        </Space.Item>
                                    </Space>

                                    <Space size="sm" align="center">
                                        <Space.Item>
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">남은보상 휴가일수</Typography>
                                        </Space.Item>
                                        <Space.Item>
                                            <Typography variant="heading-md" as="strong" primary>3</Typography>
                                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">건</Typography>
                                        </Space.Item>
                                    </Space>
                                </Space>
                            </Space>
                        </Box>
                    }
                    headerRight={
                        <>
                            <Checkbox label="내가 속한 현황만 보기" />
                            <Button variant="solid" size={isMobile ? "md" : "lg"}>근태관리 이동</Button>
                        </>
                    }
                />
            </Layout>
        </>
    );
}