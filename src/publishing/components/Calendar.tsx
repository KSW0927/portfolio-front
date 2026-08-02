import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import koLocale from "@fullcalendar/core/locales/ko";
import type { CalendarApi, CalendarOptions, DatesSetArg, DayCellContentArg, EventClickArg, EventMountArg, EventSourceInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { DateClickArg } from "@fullcalendar/interaction";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Icon, Space } from "@/publishing/components";

export interface CalendarRef {
    getApi: () => CalendarApi | undefined;
}

/**
 * Calendar 컴포넌트 속성 (Props)
 */
export interface CalendarProps {
    /** 캘린더의 전체 높이를 설정합니다. */
    height?: string | number;
    /** FullCalendar의 고유 옵션을 덮어씌웁니다. */
    options?: CalendarOptions;
    /** 캘린더의 뷰 타입을 지정합니다. */
    type?: "Month" | "Week" | "Day" | "List";
    /** 캘린더에 표시될 이벤트(일정) 데이터 배열입니다. */
    events: EventSourceInput;
    /** 공휴일 데이터를 전달하면 달력에 붉은색 텍스트로 표시됩니다. */
    holidays?: { date: string; title: string }[];
    /** 이벤트(일정)를 클릭했을 때의 콜백 함수입니다. */
    onEventClick?: (info: EventClickArg) => void;
    /** 달력의 날짜 셀을 클릭했을 때의 콜백 함수입니다. */
    onDateClick?: (info: DateClickArg) => void;
    /** 캘린더 최상위 래퍼 요소에 추가할 커스텀 클래스명입니다. */
    className?: string;
    /** 접근성 레이블입니다. */
    ariaLabel?: string;
    /** 커스텀 헤더 좌측에 들어갈 요소 (주로 범례 등) */
    headerTop?: React.ReactNode;
    /** 커스텀 헤더 우측에 들어갈 요소 (주로 버튼 등) */
    headerRight?: React.ReactNode;
}

interface FCTimeInfo {
    hour: number;
    minute: number;
}

interface FCFormatterArg {
    date: FCTimeInfo;
    end?: FCTimeInfo;
}

/**
 * @description FullCalendar 라이브러리를 기반으로 한 커스텀 캘린더 컴포넌트입니다.
 */
export const Calendar = forwardRef<CalendarRef, CalendarProps>((props, ref) => {
    const {
        height = "auto",
        options = {},
        type = "Month",
        events,
        holidays,
        onEventClick,
        onDateClick,
        className = "",
        ariaLabel = "달력 일정",
        headerTop,
        headerRight,
    } = props;

    const isMobile = useIsMobile();
    const calendarRef = useRef<FullCalendar>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [currentTitle, setCurrentTitle] = useState("");
    const [viewType, setViewType] = useState<"Month" | "Week" | "Day" | "List">(type);

    useImperativeHandle(ref, () => ({
        getApi: () => calendarRef.current?.getApi(),
    }));

    let calendarType = "dayGridMonth";
    if (viewType === "Week") calendarType = "timeGridWeek";
    else if (viewType === "Day") calendarType = "timeGridDay";
    else if (viewType === "List") calendarType = "listWeek";

    useEffect(() => {
        const api = calendarRef.current?.getApi();
        if (api && api.view.type !== calendarType) {
            setTimeout(() => {
                api.changeView(calendarType);
            }, 0);
        }
    }, [calendarType]);

    const handlePrev = () => calendarRef.current?.getApi().prev();
    const handleNext = () => calendarRef.current?.getApi().next();
    const handleToday = () => calendarRef.current?.getApi().today();

    const handleEventDidMount = (arg: EventMountArg) => {
        arg.el.setAttribute("title", arg.event.title);
        arg.el.setAttribute("aria-label", arg.event.title);
        arg.el.setAttribute("role", "button");

        const eventBorderColor = arg.el.style.borderColor || arg.event.borderColor;

        if (eventBorderColor) {
            arg.el.style.setProperty("--event-border-color", eventBorderColor);
        }
    };

    const formatTime = (timeInfo: FCTimeInfo) => {
        let h = timeInfo.hour;
        const m = String(timeInfo.minute).padStart(2, "0");
        h = h % 12 || 12;
        const hStr = String(h).padStart(2, "0");
        return `${hStr}:${m}`;
    };

    const customEventTimeFormat = (arg: unknown) => {
        const fcArg = arg as FCFormatterArg;
        const startStr = formatTime(fcArg.date);

        if (viewType === "List" && fcArg.end) {
            return `${startStr} - ${formatTime(fcArg.end)}`;
        }

        return startStr;
    };

    const renderDayCell = (arg: DayCellContentArg) => {
        const y = arg.date.getFullYear();
        const m = String(arg.date.getMonth() + 1).padStart(2, "0");
        const d = String(arg.date.getDate()).padStart(2, "0");
        const dateStr = `${y}-${m}-${d}`;

        const holiday = holidays?.find(h => h.date === dateStr);
        const a11yText = `${y}년 ${m}월 ${d}일${holiday ? `, ${holiday.title}` : ""}`;

        return (
            <div className="day-cell" aria-label={a11yText}>
                <span className={`fc-daygrid-day-number ${holiday ? "is-holiday" : ""}`} aria-hidden="true">
                    {arg.dayNumberText.replace("일", "")}
                </span>
                {holiday && (
                    <span className="fc-holiday-title" aria-hidden="true">{holiday.title}</span>
                )}
            </div>
        );
    };

    const handleDatesSet = (arg: DatesSetArg) => {
        setCurrentTitle(arg.view.title);

        if (arg.view.type === "listMonth" || arg.view.type === "listWeek") {
            if (!wrapperRef.current) return;
            const listDays = wrapperRef.current.querySelectorAll(".fc-list-day");

            listDays.forEach((el: Element) => {
                const dayEl = el as HTMLElement;
                const dateTextEl = dayEl.querySelector(".fc-list-day-text");
                const sideTextEl = dayEl.querySelector(".fc-list-day-side-text");

                if (sideTextEl) {
                    sideTextEl.innerHTML = "";
                }

                if (dateTextEl && !dateTextEl.hasAttribute("data-customized")) {
                    dateTextEl.setAttribute("data-customized", "true");

                    const dateStr = dayEl.getAttribute("data-date");
                    if (dateStr) {
                        const dateObj = new Date(dateStr);
                        const m = dateObj.getMonth() + 1;
                        const d = dateObj.getDate();
                        const day = dateObj.getDay();
                        const dayMap = ["일", "월", "화", "수", "목", "금", "토"];
                        const isToday = dayEl.classList.contains("fc-day-today");

                        let dayColor = "";
                        if (day === 0) dayColor = "var(--color-text-calendar-sunday)";
                        else if (day === 6) dayColor = "var(--color-primary)";
                        else dayColor = "inherit";

                        const textColor = isToday ? "var(--color-primary)" : "inherit";
                        const finalDayColor = isToday ? "var(--color-primary)" : dayColor;

                        dateTextEl.innerHTML = `
                            ${renderToString(<Icon name="calendar" size={24} color="#005AAA" />)}
                            <span style="color: ${textColor};">${m}월 ${d}일</span>
                            <span style="color: ${finalDayColor}; margin-left: 2px;">(${dayMap[day]})</span>
                        `;
                    }
                }

                if (dayEl.classList.contains("fc-day-today")) {
                    let nextEl = dayEl.nextElementSibling;
                    while (nextEl && nextEl.classList.contains("fc-list-event")) {
                        nextEl.classList.add("is-today-event");
                        nextEl = nextEl.nextElementSibling;
                    }
                }
            });
        }

        if (options.datesSet) {
            options.datesSet(arg);
        }
    };

    const wrapperClasses = [
        "calendar",
        viewType === "List" ? "-list" : "",
        "hide-toolbar"
    ].filter(Boolean).join(" ");

    return (
        <div className={`calendar-wrap ${className}`}>
            {isMobile ? (
                <div className="calendar-header">
                    <div className="header-top">{headerTop}</div>
                    <div className="header-bottom">
                        <div className="header-left">
                            <h2 className="calendar-title">{currentTitle}</h2>
                        </div>

                        <div className="header-center">
                            <Space size={8}>
                                <Button variant="outlined" leftIcon={<Icon name="arrow-left" size={24} />} onClick={handlePrev} aria-label="이전" />
                                <Button variant="outlined" leftIcon={<Icon name="arrow-right" size={24} />} onClick={handleNext} aria-label="다음" />
                            </Space>
                            <Button variant="filled" onClick={handleToday}>Today</Button>
                        </div>

                        <div className="header-right">
                            {headerRight}
                            <Button variant="outlined" size={isMobile ? "md" : "lg"} onClick={() => setViewType(prev => prev !== "List" ? "List" : "Month")}>
                                {viewType !== "List" ? "리스트형" : "달력형"}
                            </Button>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="calendar-header">
                    <div className="header-top">{headerTop}</div>
                    <div className="header-bottom">
                        <div className="header-left">
                            <Space size={8}>
                                <Button variant="outlined" leftIcon={<Icon name="arrow-left" size={24} />} onClick={handlePrev} aria-label="이전" />
                                <Button variant="outlined" leftIcon={<Icon name="arrow-right" size={24} />} onClick={handleNext} aria-label="다음" />
                            </Space>
                            <Button variant="filled" onClick={handleToday}>Today</Button>
                        </div>

                        <div className="header-center">
                            <h2 className="calendar-title">{currentTitle}</h2>
                        </div>

                        <div className="header-right">
                            {headerRight}
                            <Button variant="outlined" size={isMobile ? "md" : "lg"} onClick={() => setViewType(prev => prev !== "List" ? "List" : "Month")}>
                                {viewType !== "List" ? "리스트형" : "달력형"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div ref={wrapperRef} className={wrapperClasses} aria-label={ariaLabel}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    locales={[koLocale]}
                    locale="ko"
                    initialView={calendarType}
                    height={height}
                    contentHeight="auto"
                    handleWindowResize={true}
                    expandRows={true}
                    selectable={false}
                    headerToolbar={false}
                    events={events}
                    eventClick={onEventClick}
                    dateClick={onDateClick}
                    dayCellContent={renderDayCell}
                    eventDidMount={handleEventDidMount}
                    displayEventEnd={viewType === "List"}
                    dayMaxEvents={3}
                    moreLinkContent={(arg) => `+ ${arg.num}`}
                    {...options}
                    eventTimeFormat={customEventTimeFormat}
                    slotLabelFormat={customEventTimeFormat}
                    datesSet={handleDatesSet}
                />
            </div>
        </div>
    );
});

Calendar.displayName = "Calendar";