import React, { useCallback } from "react";
import { useIsDark } from "@/hooks/useIsDark";
import { Button, Calendar, Card, Checkbox, Divider, Icon, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";

/**
 * 캘린더 이벤트 dot 색상 - FullCalendar API는 CSS 변수를 직접 지원하지 않아
 * CSS 토큰 값과 동일한 실제 색상값을 상수로 관리합니다.
 * (--dash-event-red-border, --dash-event-purple-border 와 동일)
 */
const EVENT_COLOR_MAP: Record<string, string> = {
    red: "#E32020",
    purple: "#773ED9",
};

/**
 * 캘린더 일정 데이터 인터페이스
 */
interface CalendarEventData {
    id: string;
    title: string;
    start: string;
    end?: string;
    color: string;
    category: string;
    completed?: boolean;
    backgroundColor?: string;
}

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

const MY_CALENDAR_EVENTS: CalendarEventData[] = [
    { id: "1", title: "주간 업무회의", start: "2026-05-04T09:00:00", end: "2026-05-04T11:00:00", color: "red", category: "회의실 B" },
    { id: "2", title: "3분기 실적회의", start: "2026-05-04T11:00:00", end: "2026-05-04T12:00:00", color: "red", category: "업무관리" },
    { id: "3", title: "3분기 실적회의", start: "2026-05-04T13:00:00", end: "2026-05-04T14:00:00", color: "red", category: "업무관리", completed: true },
    { id: "4", title: "홍길동 반차", start: "2026-05-15", color: "purple", category: "근태일정" },
    { id: "5", title: "홍길동 반차", start: "2026-05-20", color: "purple", category: "근태일정" },
    { id: "6", title: "홍길동 반차", start: "2026-05-22", color: "purple", category: "근태일정" },
];

const TEAM_CALENDAR_EVENTS: CalendarEventData[] = [
    { id: "1", title: "주간 업무회의", start: "2026-05-08T09:00:00", end: "2026-05-08T11:00:00", color: "red", category: "회의실 B" },
    { id: "2", title: "3분기 실적회의", start: "2026-05-08T11:00:00", end: "2026-05-08T12:00:00", color: "red", category: "업무관리" },
    { id: "3", title: "3분기 실적회의", start: "2026-05-08T13:00:00", end: "2026-05-08T14:00:00", color: "red", category: "업무관리", completed: true },
    { id: "4", title: "홍길동 반차", start: "2026-05-07", color: "purple", category: "근태일정" },
    { id: "5", title: "홍길동 반차", start: "2026-05-21", color: "purple", category: "근태일정" },
    { id: "6", title: "홍길동 반차", start: "2026-05-29", color: "purple", category: "근태일정" },
];


/**
 * 나의일정 위젯 컴포넌트
 * @description
 */
export const CalendarWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab, changeHide, changeExpand } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;


    /* 상태 정의 */
    const [calendarTab, setCalendarTab] = React.useState<"my" | "team">("my");
    const [selectedDate, setSelectedDate] = React.useState<string | null>("2026-05-04");
    const [calendarEvents, setCalendarEvents] = React.useState({
        my: MY_CALENDAR_EVENTS,
        team: TEAM_CALENDAR_EVENTS
    });


    /* 이벤트 정의 */
    const toggleEventCompletion = useCallback((id: string) => {
        setCalendarEvents(prev => ({
            ...prev,
            [calendarTab]: prev[calendarTab].map(ev =>
                ev.id === id ? { ...ev, completed: !ev.completed } : ev
            )
        }));
    }, [calendarTab]);


    const currentEvents = calendarEvents[calendarTab];

    const selectedDateEvents = currentEvents.filter(ev => {
        if (!selectedDate) return true;
        return ev.start.startsWith(selectedDate);
    });


    return (
        <>
            <div className="widget-calendar-content">
                <Card.Header
                    extra={
                        <div style={{ position: "relative" }}>
                            <Button
                                variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                className={`button-widget-settings ${isDark && "-invert"}`} rounded
                                aria-label="위젯 설정"
                                aria-haspopup="true"
                                aria-expanded={isKebabOpen}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeActiveKebab(isKebabOpen ? null : widget.id);
                                }}
                            />
                            {isKebabOpen && (
                                <div className="widget-setting-popup">
                                    <button onClick={(e) => { e.stopPropagation(); changeHide(widget.id); }}>위젯 삭제</button>
                                    <button onClick={(e) => { e.stopPropagation(); changeExpand(widget.id); }}>
                                        {widget.size === "md" ? "위젯 확대" : "위젯 축소"}
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                >
                    <Space size={12}>
                        <Icon name="calendar2" size={20} />

                        <Space size={6}>
                            <Button variant="text" onClick={() => setCalendarTab("my")}>
                                <Typography
                                    variant="heading-sm"
                                    tertiary={!isDark && calendarTab !== "my"}
                                    color={isDark && calendarTab !== "my" ? "var(--dash-text-muted-num)" : "var(--dash-profile-text)"}
                                >
                                    나의 일정
                                </Typography>
                            </Button>
                            <Divider layout="vertical" variant="dashed" size={12} />
                            <Button variant="text" onClick={() => setCalendarTab("team")}>
                                <Typography
                                    variant="heading-sm"
                                    tertiary={!isDark && calendarTab !== "team"}
                                    color={isDark && calendarTab !== "team" ? "var(--dash-text-muted-num)" : "var(--dash-profile-text)"}
                                >
                                    팀 일정
                                </Typography>
                            </Button>
                        </Space>
                    </Space>
                </Card.Header>

                <Card.Body gap={8}>
                    <div className="mini-calendar-wrapper">
                        <Calendar
                            type="Month"
                            events={currentEvents.map(ev => ({
                                ...ev,
                                backgroundColor: EVENT_COLOR_MAP[ev.color] ?? "#999999"
                            }))}
                            holidays={KOR_HOLIDAYS_2026}
                            ariaLabel={calendarTab === "my" ? "나의 일정" : "팀 일정"}
                            onDateClick={(info) => {
                                setSelectedDate(info.dateStr);
                            }}
                            options={{
                                initialDate: "2026-05-04",
                                height: 'auto',
                                contentHeight: 'auto',
                                eventContent: (arg) => (
                                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: arg.event.backgroundColor }} />
                                ),
                                dayCellClassNames: (arg) => {
                                    const d = arg.date;
                                    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                    return dateStr === selectedDate ? 'is-selected-date' : '';
                                }
                            }}
                            className="dashboard-mini-calendar"
                        />
                    </div>

                    <div className="calendar-event-list">
                        {selectedDateEvents.length > 0 ? selectedDateEvents.map(event => (
                            <div key={event.id} className={`event-item color-${event.color} ${event.completed ? "-completed" : ""} ${event.category === "업무관리" ? "-task" : ""}`}>
                                <Typography variant="body-lg" className="event-category text-ellipsis">
                                    {event.category}
                                </Typography>

                                <Divider layout="vertical" variant="dashed" size={10} color="rgba(51, 51, 51, 0.3)" />

                                <Typography variant="body-lg" className="event-title text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>
                                    {event.title}
                                </Typography>

                                <Typography variant="body-md" className="event-time" secondary={!isDark}>
                                    {event.start.includes("T")
                                        ? `${event.start.split("T")[1].substring(0, 5)}~${event.end?.split("T")[1].substring(0, 5)}`
                                        : event.start.replace(/-/g, ".")}
                                </Typography>

                                {event.category === "업무관리" && (
                                    <Checkbox checked={event.completed} onChange={() => toggleEventCompletion(event.id)} />
                                )}
                            </div>
                        )) : (
                            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--dash-text-tertiary)", fontSize: "1.3rem" }}>
                                등록된 일정이 없습니다.
                            </div>
                        )}
                    </div>
                </Card.Body>
            </div>
        </>
    );
}
CalendarWidget.displayName = 'CalendarWidget';

