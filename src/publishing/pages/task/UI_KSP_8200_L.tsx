import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Calendar, type CalendarRef, Layout } from "@/publishing/components";


export function UI_KSP_8200_L() {
    const isMobile = useIsMobile();
    const calendarRef = useRef<CalendarRef>(null);

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
        { title: "싱가폴사무소(홍길동)", start: "2026-05-04T09:00:00", end: "2026-05-04T10:00:00", color: "#773ED9", display: "list-item" },
        { title: "본사 내방(홍길동)", start: "2026-05-04T10:00:00", end: "2026-05-04T12:00:00", color: "#E32020", display: "list-item" },
        { title: "해사본부 내방(홍길동)", start: "2026-05-06T15:00:00", end: "2026-05-06T15:30:00", color: "#1ABFD2", display: "list-item" },
        { title: "동경사무소(홍길동)", start: "2026-05-07T16:00:00", end: "2026-05-07T17:00:00", color: "#067609", display: "list-item" },
        { title: "상해사무소(홍길동)", start: "2026-05-08T18:00:00", end: "2026-05-08T19:00:00", color: "#B25300", display: "list-item" },
        { title: "거래처로 방문(홍길동)", start: "2026-05-08T18:00:00", end: "2026-05-08T19:00:00", color: "#1D59F0", display: "list-item" },
    ];

    return (
        <>
            <Layout title="거래처면담 일정" activeMenuId="">

                {/* Calendar */}
                <Calendar
                    ref={calendarRef}
                    events={events}
                    holidays={KOR_HOLIDAYS_2026}
                    ariaLabel="거래처 면담 일정"
                    options={{
                        initialDate: "2026-05-04",
                        displayEventTime: true,
                        eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: "lowercase", hour12: true }
                    }}
                    headerTop={
                        <div className="calendar-legend">
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#E32020" }}></span> 본사내방</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1ABFD2" }}></span> 해사본부 내방</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1D59F0" }}></span> 거래처로 방문</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#18C41D" }}></span> 동경사무소</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#773ED9" }}></span> 싱가폴사무소</div>
                            <div className="legend-item"><span className="dot" style={{ backgroundColor: "#FF861C" }}></span> 상해사무소</div>
                        </div>
                    }
                    headerRight={
                        <>
                            <Button variant="solid" size={isMobile ? "md" : "lg"}>면담 일정등록</Button>
                        </>
                    }
                />
            </Layout>
        </>
    );
}