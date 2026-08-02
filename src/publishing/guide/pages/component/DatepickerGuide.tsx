import { useState } from "react";
import { DatePicker, DateRangePicker } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

const today = new Date();

// 오늘 기준 +3일, +5일을 excludeDates 시연 데이터로 사용
const EXCLUDE_DATES = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
];

export default function DatepickerGuide() {
    const [singleDate, setSingleDate] = useState<Date | null>(null);
    const [monthDate, setMonthDate] = useState<Date | null>(null);
    const [yearDate, setYearDate] = useState<Date | null>(null);

    const [timeDate, setTimeDate] = useState<Date | null>(null);
    const [excludeDate, setExcludeDate] = useState<Date | null>(null);
    const [errorDate, setErrorDate] = useState<Date | null>(null);

    const [singleRange, setSingleRange] = useState<[Date | null, Date | null]>([null, null]);
    const [sStart, sEnd] = singleRange;

    const [doubleRange, setDoubleRange] = useState<[Date | null, Date | null]>([null, null]);
    const [dStart, dEnd] = doubleRange;

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">DatePicker</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        DatePicker는 사용자가 날짜 또는 날짜 구간을 직관적으로 선택할 수 있도록 돕는 달력 컴포넌트입니다.
                        단일 날짜 선택(<code>DatePicker</code>)과 기간 선택(<code>DateRangePicker</code>) 두 가지 형태로 제공됩니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label (폼 라벨)</h3>
                        <p className="guide-desc">
                            <code>label</code> prop을 사용하여 달력 입력창 상단에 폼 라벨을 추가할 수 있습니다.
                            단일 선택(DatePicker) 및 기간 선택(DateRangePicker) 모두에 사용할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column" style={{ gap: "2.4rem" }}>
                            <DatePicker
                                label="단일 선택 라벨"
                                selected={singleDate}
                                onChange={(date) => setSingleDate(date)}
                            />

                            <div style={{ maxWidth: "600px" }}>
                                <DateRangePicker
                                    label="기간 선택 라벨 (Range)"
                                    startDate={dStart}
                                    endDate={dEnd}
                                    onChange={(dates) => setDoubleRange(dates)}
                                />
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<DatePicker label="단일 선택 라벨" selected={date} onChange={...} />
<DateRangePicker label="기간 선택 라벨 (Range)" startDate={start} endDate={end} onChange={...} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Single Date</h3>
                        <p className="guide-desc">
                            가장 기본적인 형태의 날짜 선택 컴포넌트입니다. 달력 아이콘을 클릭하여 날짜를 선택할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <DatePicker
                                selected={singleDate}
                                onChange={(date) => setSingleDate(date)}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";

const [date, setDate] = useState<Date | null>(null);

<DatePicker 
    selected={date} 
    onChange={(newDate) => setDate(newDate)} 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Time Select (시간 포함)</h3>
                        <p className="guide-desc">
                            <code>isTimer</code> 속성을 <code>true</code>로 설정하면 달력 하단(또는 우측)에 시간을 선택할 수 있는 스크롤 영역이 활성화됩니다.
                        </p>

                        <div className="comp-preview">
                            <DatePicker
                                selected={timeDate}
                                onChange={(date) => setTimeDate(date)}
                                isTimer={true}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<DatePicker 
    selected={date} 
    onChange={setDate} 
    isTimer={true} 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Exclude Dates (특정 날짜 제외)</h3>
                        <p className="guide-desc">
                            <code>excludeDates</code> 배열에 Date 객체들을 전달하면, 해당 날짜들은 달력에서 클릭할 수 없도록 회색으로 비활성화됩니다. (예제: 오늘 기준 +3일, +5일 비활성화)
                        </p>

                        <div className="comp-preview">
                            <DatePicker
                                selected={excludeDate}
                                onChange={(date) => setExcludeDate(date)}
                                excludeDates={EXCLUDE_DATES}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`const EXCLUDE_DATES = [
    new Date(2026, 3, 10), // 2026년 4월 10일
    new Date(2026, 3, 15)  // 2026년 4월 15일
];

<DatePicker 
    selected={date} 
    onChange={setDate} 
    excludeDates={EXCLUDE_DATES} 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Date Range</h3>
                        <p className="guide-desc">
                            두 가지 스타일의 기간 선택을 지원합니다.
                            1) <strong>단일 인풋:</strong> <code>DatePicker</code>에 <code>selectsRange</code> 속성 사용.
                            2) <strong>더블 인풋:</strong> <code>DateRangePicker</code> 컴포넌트 사용.
                        </p>

                        <div className="comp-preview is-column">
                            <div style={{ width: "100%", maxWidth: "300px", marginBottom: "24px" }}>
                                <p className="guide-desc" style={{ marginBottom: "8px", fontSize: "13px" }}>1. 단일 인풋 기간 선택 (selectsRange)</p>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={sStart}
                                    endDate={sEnd}
                                    onChange={(update) => setSingleRange(update)}
                                />
                            </div>

                            <div style={{ width: "100%", maxWidth: "600px" }}>
                                <p className="guide-desc" style={{ marginBottom: "8px", fontSize: "13px" }}>2. 더블 인풋 기간 선택 (DateRangePicker)</p>
                                <DateRangePicker
                                    startDate={dStart}
                                    endDate={dEnd}
                                    onChange={(dates) => setDoubleRange(dates)}
                                />
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`// 1. 단일 인풋
<DatePicker 
    selectsRange={true}
    startDate={startDate}
    endDate={endDate}
    onChange={(update) => setDateRange(update)}
/>

// 2. 더블 인풋
<DateRangePicker 
    startDate={startDate}
    endDate={endDate}
    onChange={(dates) => setDateRange(dates)}
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Date Types (월 / 년도 선택)</h3>
                        <p className="guide-desc">
                            <code>dateType</code> prop을 <code>"month"</code> 또는 <code>"year"</code>로 설정하여 월단위, 년단위 선택기로 변경할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
                                <DatePicker
                                    dateType="month"
                                    placeholder="YYYY.MM"
                                    selected={monthDate}
                                    onChange={(date) => setMonthDate(date)}
                                />
                                <DatePicker
                                    dateType="year"
                                    placeholder="YYYY"
                                    selected={yearDate}
                                    onChange={(date) => setYearDate(date)}
                                />
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<DatePicker dateType="month" placeholder="YYYY.MM" selected={...} onChange={...} />
<DatePicker dateType="year" placeholder="YYYY" selected={...} onChange={...} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Validation</h3>
                        <p className="guide-desc">
                            <code>isError</code> 속성을 통해 에러를 표시할 수 있습니다. 기간 선택(DateRangePicker)의 경우 두 인풋 모두 붉은 테두리가 적용되며 에러 메시지는 하단에 한 번만 출력됩니다.
                        </p>

                        <div className="comp-preview is-column">
                            <DatePicker
                                selected={errorDate}
                                onChange={(date) => setErrorDate(date)}
                                isError={true}
                                errorMsg="올바른 날짜를 선택해 주세요."
                            />
                            <DateRangePicker
                                startDate={null}
                                endDate={null}
                                onChange={() => { }}
                                isError={true}
                                errorMsg="시작일과 종료일을 모두 선택해야 합니다."
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<DatePicker isError={true} errorMsg="올바른 날짜를 선택해 주세요." ... />
<DateRangePicker isError={true} errorMsg="시작일과 종료일을 모두 선택해야 합니다." ... />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <p className="guide-desc">
                            <code>disabled</code> 속성을 추가하면 사용자 상호작용이 차단되고 시각적으로 비활성화 처리됩니다.
                        </p>

                        <div className="comp-preview">
                            <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div style={{ width: "300px" }}>
                                    <DatePicker disabled selected={new Date()} onChange={() => { }} />
                                </div>
                                <DateRangePicker disabled startDate={null} endDate={null} onChange={() => { }} />
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<DatePicker disabled selected={new Date()} onChange={...} />
<DateRangePicker disabled startDate={null} endDate={null} onChange={...} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">DatePicker 및 DateRangePicker에서 공통으로 사용할 수 있는 속성들입니다.</p>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "45%" }} />
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
                                        <td className="guide-td"><code>label</code></td>
                                        <td className="guide-td"><code>string | ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">달력 입력창 상단에 표시될 폼 라벨입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>dateType</code></td>
                                        <td className="guide-td"><code>"day" | "month" | "year"</code></td>
                                        <td className="guide-td"><code>"day"</code></td>
                                        <td className="guide-td">선택할 날짜의 단위를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isTimer</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>일 경우 달력 하단에 시간 선택기가 함께 표시됩니다. (<code>day</code> 모드 전용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>minDate / maxDate</code></td>
                                        <td className="guide-td"><code>Date | null</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">선택 가능한 최소/최대 날짜를 제한합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>excludeDates</code></td>
                                        <td className="guide-td"><code>Date[]</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">선택 불가능하도록 비활성화할 특정 날짜들의 배열입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>width</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">컴포넌트의 가로 너비를 제어합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>fullWidth</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정 시 너비가 부모 100%로 꽉 채워집니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isError</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정 시 테두리가 붉은색 에러 스타일로 변경됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>errorMsg</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">에러 상태일 때 하단에 표시할 안내 메시지입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>placeholder</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>"YYYY.MM.DD"</code></td>
                                        <td className="guide-td">날짜가 선택되지 않았을 때 표시할 플레이스홀더 텍스트입니다. (<code>isTimer</code> 활성화 시 기본값: <code>"YYYY.MM.DD HH:MM"</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정 시 사용자 상호작용이 차단되고 시각적으로 비활성화됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>required</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정 시 라벨 우측에 필수 입력 표시(*)가 나타나고 <code>aria-required</code>가 연결됩니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">DatePicker 전용</h4>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "60%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Prop</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>selected</code></td>
                                        <td className="guide-td"><code>Date | null</code></td>
                                        <td className="guide-td">단일 날짜 선택 모드에서 현재 선택된 날짜 객체입니다. (<code>selectsRange=false</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>startDate</code></td>
                                        <td className="guide-td"><code>Date | null</code></td>
                                        <td className="guide-td">단일 인풋 기간 선택 모드에서 시작 날짜 객체입니다. (<code>selectsRange=true</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>endDate</code></td>
                                        <td className="guide-td"><code>Date | null</code></td>
                                        <td className="guide-td">단일 인풋 기간 선택 모드에서 종료 날짜 객체입니다. (<code>selectsRange=true</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>selectsRange</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 단일 인풋으로 기간을 선택하는 모드가 됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(date: (Date | null) | [Date | null, Date | null]) =&gt; void</code></td>
                                        <td className="guide-td">
                                            <strong>[필수]</strong> 날짜가 선택되었을 때 실행되는 함수입니다. <code>selectsRange</code> 값에 따라
                                            단일 날짜 또는 날짜 배열을 반환합니다.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">기간 선택 전용 (DateRangePicker)</h4>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "60%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Prop</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>startDate</code></td>
                                        <td className="guide-td"><code>Date | null</code></td>
                                        <td className="guide-td"><strong>[필수]</strong> 선택된 시작 날짜 객체입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>endDate</code></td>
                                        <td className="guide-td"><code>Date | null</code></td>
                                        <td className="guide-td"><strong>[필수]</strong> 선택된 종료 날짜 객체입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(dates: [Date | null, Date | null]) =&gt; void</code></td>
                                        <td className="guide-td"><strong>[필수]</strong> 날짜가 선택되었을 때 배열 형태로 [시작일, 종료일]을 반환합니다.</td>
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