import { useRef } from "react";
import { Button, Calendar, Icon, type CalendarRef } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CalendarGuide() {
    const isMobile = useIsMobile();
    const calendarRef1 = useRef<CalendarRef>(null);
    const calendarRef2 = useRef<CalendarRef>(null);

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

    const dotEvents = [
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T09:00:00", end: "2026-05-04T10:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T10:00:00", end: "2026-05-04T12:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T15:00:00", end: "2026-05-04T15:30:00", color: "#773ED9", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T16:00:00", end: "2026-05-04T17:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T17:00:00", end: "2026-05-04T18:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-04T18:00:00", end: "2026-05-04T19:30:00", color: "#773ED9", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-09T09:00:00", end: "2026-05-09T09:30:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-09T09:30:00", end: "2026-05-09T10:00:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-13T09:00:00", end: "2026-05-13T09:30:00", color: "#E32020", display: "list-item" },
        { title: "3회의실 - 신입사원 오리엔테이션", start: "2026-05-13T10:00:00", end: "2026-05-13T10:30:00", color: "#773ED9", display: "list-item" },
    ];

    const blockEvents = [
        { title: "[결재완료]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
        { title: "[결재완료]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", start: "2026-05-11", end: "2026-05-13", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
        { title: "[결재완료]", date: "2026-05-21", display: "block", backgroundColor: "#E9F4FF", borderColor: "#005AAA", textColor: "#004586" },
        { title: "[신청중]", date: "2026-05-21", display: "block", backgroundColor: "#F8F5FD", borderColor: "#773ED9", textColor: "#5626AA" },
        { title: "[예약취소]", date: "2026-05-21", display: "block", backgroundColor: "#FFF0F0", borderColor: "#E32020", textColor: "#D31616" },
    ];

    const timeFormatOptions = {
        displayEventTime: true,
        eventTimeFormat: {
            hour: "2-digit" as const,
            minute: "2-digit" as const,
            meridiem: "lowercase" as const,
            hour12: true
        }
    };

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Calendar</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <article className="comp-article">
                        <h3 className="guide-h3">Type 1: Dot Events</h3>
                        <div className="comp-preview is-column">
                            <Calendar
                                ref={calendarRef1}
                                events={dotEvents}
                                holidays={KOR_HOLIDAYS_2026}
                                ariaLabel="회의실 예약 일정"
                                options={{ initialDate: "2026-05-04", ...timeFormatOptions }}
                                headerTop={
                                    <div className="calendar-legend">
                                        <div className="legend-item"><span className="dot" style={{ backgroundColor: "#E32020" }}></span> 주요업무</div>
                                        <div className="legend-item"><span className="dot" style={{ backgroundColor: "#773ED9" }}></span> 주요업무</div>
                                        <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1D59F0" }}></span> 주관업무</div>
                                    </div>
                                }
                                headerRight={
                                    <>
                                        <Button variant="solid" size={isMobile ? "md" : "lg"} leftIcon={<Icon name="add" size={24} color="#FFF" />}>회의실 사용 예약</Button>
                                    </>
                                }
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<Calendar
    events={[
        { 
            title: "컨퍼런스", 
            start: "2026-05-04T10:00:00", 
            end: "2026-05-04T12:00:00", 
            color: "#00B2FF", 
            display: "list-item" 
        }
    ]}
    holidays={KOR_HOLIDAYS_2026}
    ariaLabel="회의실 예약 일정"
    options={{
        initialDate: "2026-05-01",
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
            <Button variant="solid" size="lg" leftIcon={<Icon name="add" size={24} color="#FFF" />}>회의실 사용 예약</Button>
        </>
    }
/>`} />
                    </article>

                    <article className="comp-article mt-10">
                        <h3 className="guide-h3">Type 2: Block Events</h3>
                        <div className="comp-preview is-column">
                            <Calendar
                                ref={calendarRef2}
                                events={blockEvents}
                                holidays={KOR_HOLIDAYS_2026}
                                ariaLabel="휴양시설 일정"
                                options={{ initialDate: "2026-05-11", ...timeFormatOptions }}
                                headerTop={
                                    <div className="calendar-legend">
                                        <div className="legend-item"><span className="dot" style={{ backgroundColor: "#773ED9" }}></span> 신청중</div>
                                        <div className="legend-item"><span className="dot" style={{ backgroundColor: "#E32020" }}></span> 예약취소</div>
                                        <div className="legend-item"><span className="dot" style={{ backgroundColor: "#1D59F0" }}></span> 신청완료</div>
                                    </div>
                                }
                                headerRight={
                                    <>
                                        <Button variant="solid" size={isMobile ? "md" : "lg"} leftIcon={<Icon name="add" size={24} color="#FFF" />}>휴양시설 예약</Button>
                                    </>
                                }
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`{/* 여러 날짜에 걸친 바(Bar) 형태의 이벤트는 start와 end를 활용합니다. */}
{/* 주의: end 날짜는 포함되지 않으므로 5/13까지 표시하려면 5/14로 설정하거나 일수를 계산해야 합니다. */}
<Calendar
    events={[
        { 
            title: "[결재완료]", 
            start: "2026-05-11", 
            end: "2026-05-13", 
            display: "block", 
            backgroundColor: "#E9F4FF", 
            borderColor: "#005AAA", 
            textColor: "#004586" 
        }
    ]}
    holidays={KOR_HOLIDAYS_2026}
    ariaLabel="휴양시설 일정"
    options={{
        initialDate: "2026-05-01",
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
        <>
            <Button variant="solid" size="lg" leftIcon={<Icon name="add" size={24} color="#FFF" />}>휴양시설 예약</Button>
        </>
    }
/>`} />
                    </article>

                    <article className="comp-article mt-10">
                        <h3 className="guide-h3">Props</h3>
                        <div className="guide-table-wrap mt-4">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "17%" }} />
                                    <col style={{ width: "25%" }} />
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
                                        <td className="guide-td"><code>events</code></td>
                                        <td className="guide-td"><code>EventSourceInput</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 캘린더에 표시될 이벤트(일정) 데이터 배열입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>type</code></td>
                                        <td className="guide-td"><code>"Month" | "Week" | "Day" | "List"</code></td>
                                        <td className="guide-td"><code>"Month"</code></td>
                                        <td className="guide-td">캘린더의 초기 뷰 타입을 지정합니다. <code>"List"</code> 적용 시 월 단위의 일정 리스트 UI로 전환됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>headerTop</code></td>
                                        <td className="guide-td"><code>React.ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">커스텀 헤더 좌측 영역에 들어갈 요소입니다. (주로 색상 범례 등에 사용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>headerRight</code></td>
                                        <td className="guide-td"><code>React.ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">커스텀 헤더 우측 영역에 들어갈 요소입니다. (주로 등록/작성 등 추가 버튼에 사용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>holidays</code></td>
                                        <td className="guide-td"><code>{`{ date: string, title: string }[]`}</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">공휴일 데이터를 전달하면 달력에 붉은색 텍스트로 처리됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>options</code></td>
                                        <td className="guide-td"><code>CalendarOptions</code></td>
                                        <td className="guide-td"><code>{`{}`}</code></td>
                                        <td className="guide-td">FullCalendar의 고유 옵션(<code>initialDate</code>, <code>datesSet</code> 등)을 덮어씌웁니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>height</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td"><code>"auto"</code></td>
                                        <td className="guide-td">캘린더의 전체 높이를 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onEventClick</code></td>
                                        <td className="guide-td"><code>(info: EventClickArg) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">이벤트(일정)를 클릭했을 때의 콜백 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onDateClick</code></td>
                                        <td className="guide-td"><code>(info: DateClickArg) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">달력의 빈 날짜 셀을 클릭했을 때의 콜백 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>ariaLabel</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>"달력 일정"</code></td>
                                        <td className="guide-td">스크린 리더가 캘린더 영역을 식별할 수 있도록 제공하는 접근성 레이블입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">캘린더 최상위 래퍼 요소에 추가할 커스텀 클래스명입니다.</td>
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