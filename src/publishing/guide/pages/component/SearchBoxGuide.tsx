import { useState } from "react";
import {
    SearchBox,
    Button,
    Input,
    Dropdown,
    DateRangePicker,
    Icon
} from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function SearchBoxGuide() {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const deptOptions1 = [
        { label: "전체", value: "" },
        { label: "영업본부", value: "1" },
    ];
    const deptOptions2 = [
        { label: "전체", value: "" },
        { label: "가스팀", value: "1" },
    ];
    const dummyOptions = [
        { label: "전체", value: "0" },
        { label: "진행중", value: "1" },
        { label: "평가종료", value: "2" },
    ];
    const dummyOptions2 = [
        { label: "전체", value: "0" },
        { label: "누락", value: "1" },
    ];
    const dummyOptions3 = [
        { label: "신청 대기중", value: "1" },
        { label: "진행중", value: "2" },
        { label: "완료", value: "3" },
        { label: "보류", value: "4" },
        { label: "반려", value: "5" },
        { label: "신청", value: "6" },
        { label: "결재 완료", value: "7" },
    ];

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">SearchBox (검색 영역)</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        목록 상단에 위치하는 복합 검색 필터 영역입니다.
                        <code>SearchBox.Row</code>와 <code>SearchBox.Item</code>을 조합하여 1줄 또는 다단 레이아웃을 유연하게 구성할 수 있습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Multi-Row (2줄 이상)</h3>
                        <p className="guide-desc">
                            조건이 많아 2줄 이상으로 배치될 때의 모습입니다. 액션 버튼은 내용물의 높이와 상관없이 우측 하단에 고정됩니다.
                        </p>

                        <div className="comp-preview">
                            <SearchBox>
                                <SearchBox.Content>
                                    <SearchBox.Row>
                                        <SearchBox.Item>
                                            <Dropdown label="소속" value="1" options={deptOptions1} />
                                            <Dropdown value="1" options={deptOptions2} />
                                        </SearchBox.Item>
                                        <SearchBox.Item>
                                            <Dropdown label="평가 종료 여부" options={dummyOptions} />
                                        </SearchBox.Item>
                                        <SearchBox.Item>
                                            <Dropdown label="누락 상태" options={dummyOptions2} />
                                        </SearchBox.Item>
                                        <SearchBox.Item width={357}>
                                            <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                                        </SearchBox.Item>
                                    </SearchBox.Row>

                                    <SearchBox.Row>
                                        <SearchBox.Item width={344}>
                                            <Input label="상세검색" placeholder="검색어를 입력하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
                                        </SearchBox.Item>
                                    </SearchBox.Row>
                                </SearchBox.Content>

                                <SearchBox.Actions>
                                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />}>초기화</Button>
                                    <Button variant="solid" className="button-search">검색</Button>
                                </SearchBox.Actions>
                            </SearchBox>
                        </div>

                        <CodeBlock isComponent={true} code={`<SearchBox>
    <SearchBox.Content>
        {/* 첫 번째 줄 */}
        <SearchBox.Row>
            <SearchBox.Item>
                <Dropdown label="소속" value="1" options={deptOptions1} />
                <Dropdown value="1" options={deptOptions2} />
            </SearchBox.Item>
            <SearchBox.Item>
                <Dropdown label="평가 종료 여부" options={dummyOptions} />
            </SearchBox.Item>
            <SearchBox.Item>
                <Dropdown label="누락 상태" options={dummyOptions2} />
            </SearchBox.Item>
            <SearchBox.Item width={357}>
                <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
            </SearchBox.Item>
        </SearchBox.Row>

        {/* 두 번째 줄 */}
        <SearchBox.Row>
            <SearchBox.Item width={344}>
                <Input label="상세검색" placeholder="검색어를 입력하세요." leftIcon={<Icon name="search" size={20} color="#999" />} fullWidth />
            </SearchBox.Item>
        </SearchBox.Row>
    </SearchBox.Content>

    <SearchBox.Actions>
        <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />}>초기화</Button>
        <Button variant="solid" className="button-search">검색</Button>
    </SearchBox.Actions>
</SearchBox>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Single-Row (1줄)</h3>
                        <p className="guide-desc">
                            검색 조건이 적어 1줄로 배치되는 기본 형태입니다.
                        </p>

                        <div className="comp-preview">
                            <SearchBox>
                                <SearchBox.Content>
                                    <SearchBox.Row>
                                        <SearchBox.Item width={357}>
                                            <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                                        </SearchBox.Item>
                                        <SearchBox.Item width={380}>
                                            <Input label="상세검색" placeholder="제목으로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
                                        </SearchBox.Item>
                                        <SearchBox.Item>
                                            <Dropdown label="진행상태" placeholder="전체" options={dummyOptions3} />
                                        </SearchBox.Item>
                                    </SearchBox.Row>
                                </SearchBox.Content>

                                <SearchBox.Actions>
                                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />}>초기화</Button>
                                    <Button variant="solid" className="button-search">검색</Button>
                                </SearchBox.Actions>
                            </SearchBox>
                        </div>

                        <CodeBlock isComponent={true} code={`<SearchBox>
    <SearchBox.Content>
        <SearchBox.Row>
            <SearchBox.Item width={357}>
                <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
            </SearchBox.Item>
            <SearchBox.Item width={380}>
                <Input label="상세검색" placeholder="제목으로 검색하세요." leftIcon={<Icon name="search" size={20} />} fullWidth />
            </SearchBox.Item>
            <SearchBox.Item>
                <Dropdown label="진행상태" placeholder="전체" options={dummyOptions3} />
            </SearchBox.Item>
        </SearchBox.Row>
    </SearchBox.Content>

    <SearchBox.Actions>
        <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />}>초기화</Button>
        <Button variant="solid" className="button-search">검색</Button>
    </SearchBox.Actions>
</SearchBox>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4 mt-20">SearchBox</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "20%" }} />
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
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">전체 검색 영역의 최상위 래퍼입니다. 내부 Row 개수에 따라 버튼 정렬(center / flex-end)이 자동 조절됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">최상위 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">SearchBox.Item</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "20%" }} />
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
                                        <td className="guide-td"><code>width</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">아이템의 고정 너비를 지정합니다. (예: <code>160</code>, <code>"300px"</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>flex</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">아이템의 확장 비율입니다. <code>1</code>을 주면 같은 줄의 가로 잔여 공간을 모두 채웁니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">내부에 렌더링될 폼 요소(Input, Dropdown 등)입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">아이템 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">SearchBox.Content</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "20%" }} />
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
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">폼 요소(<code>SearchBox.Row</code>)들이 배치되는 좌측 메인 컨텐츠 영역입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">Content 영역 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">SearchBox.Row</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "20%" }} />
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
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">가로 한 줄에 들어갈 <code>SearchBox.Item</code> 요소들을 배열합니다. 내부 요소들의 하단 라인(baseline)을 자동으로 맞춰줍니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">Row 영역 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">SearchBox.Actions</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "20%" }} />
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
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">우측 하단에 고정되는 액션 버튼(검색, 초기화 등) 요소들을 포함합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">Actions 영역 컨테이너에 추가할 커스텀 클래스입니다.</td>
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