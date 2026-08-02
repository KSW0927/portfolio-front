import { useState } from "react";
import { Checkbox } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function CheckboxGuide() {
    const [isChecked, setIsChecked] = useState(true);
    const [groupValues, setGroupValues] = useState<string[]>(["apple"]);
    const [verticalValues, setVerticalValues] = useState<string[]>(["option1"]);

    const groupOptions = [
        { label: "사과", value: "apple" },
        { label: "바나나", value: "banana" },
        { label: "포도", value: "grape" },
        { label: "오렌지 (비활성)", value: "orange", disabled: true },
    ];

    const verticalOptions = [
        { label: "옵션 1", value: "option1", description: "옵션 1에 대한 부가 설명입니다." },
        { label: "옵션 2", value: "option2", description: "옵션 2에 대한 부가 설명입니다." },
        { label: "옵션 3", value: "option3" },
    ];

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Checkbox</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        사용자가 여러 옵션 중 하나 이상을 선택할 때 사용하는 체크박스 컴포넌트입니다.
                        단일 선택(<code>Checkbox</code>)과 그룹 선택(<code>Checkbox.Group</code>) 두 가지 형태로 제공됩니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <div className="comp-preview">
                            <Checkbox />
                            <Checkbox
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<Checkbox />
<Checkbox checked={true} onChange={handleChange} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label</h3>
                        <p className="guide-desc"><code>label</code> 속성을 사용하여 체크박스 우측에 텍스트를 추가할 수 있습니다.</p>
                        <div className="comp-preview">
                            <Checkbox
                                label="기본형"
                            />
                            <Checkbox
                                label="선택됨"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<Checkbox label="기본형" />
<Checkbox label="선택됨" checked={true} onChange={handleChange} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">With Description</h3>
                        <p className="guide-desc">
                            <code>description</code> 속성을 사용하여 체크박스 레이블 하단에 부가적인 설명을 덧붙일 수 있습니다.
                        </p>
                        <div className="comp-preview">
                            <Checkbox
                                label="부가설명형"
                                description="여기에 부가설명 텍스트가 들어갑니다. 여러 줄로 입력될 경우 자연스럽게 레이블 하단에 위치합니다."
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<Checkbox 
    label="부가설명형" 
    description="여기에 부가설명 텍스트가 들어갑니다. 여러 줄로 입력될 경우 자연스럽게 레이블 하단에 위치합니다." 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Box Variant</h3>
                        <p className="guide-desc"><code>variant="box"</code> 속성을 사용하면 체크박스 전체 영역을 테두리로 감싼 박스 형태로 표시됩니다.</p>
                        <div className="comp-preview">
                            <Checkbox variant="box" label="중국집" />
                            <Checkbox variant="box" label="선택됨" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                            <Checkbox variant="box" label="비활성화" disabled />
                            <Checkbox variant="box" label="비활성화 (선택됨)" disabled checked />
                        </div>
                        <CodeBlock isComponent={true} code={`<Checkbox variant="box" label="중국집" />
<Checkbox variant="box" label="선택됨" checked={true} onChange={handleChange} />
<Checkbox variant="box" label="비활성화" disabled />
<Checkbox variant="box" label="비활성화 (선택됨)" disabled checked />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <div className="comp-preview">
                            <Checkbox label="Disabled (Unchecked)" disabled />
                            <Checkbox label="Disabled (Checked)" disabled checked />
                        </div>
                        <CodeBlock isComponent={true} code={`<Checkbox label="Disabled (Unchecked)" disabled />
<Checkbox label="Disabled (Checked)" disabled checked />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Read Only</h3>
                        <div className="comp-preview">
                            <Checkbox label="Read Only (Checked)" readOnly checked />
                        </div>
                        <CodeBlock isComponent={true} code={`<Checkbox label="Read Only (Checked)" readOnly checked />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Checkbox.Group</h3>
                        <p className="guide-desc">
                            여러 개의 체크박스를 묶어서 관리하는 그룹 컴포넌트입니다. <code>options</code> 배열을 전달하면 자동으로 체크박스 목록을 렌더링하며,
                            <code>value</code>와 <code>onChange</code>로 선택 상태를 제어합니다.
                        </p>

                        <div className="comp-preview is-column" style={{ gap: "1.6rem" }}>
                            <div>
                                <p className="guide-desc" style={{ marginBottom: "8px", fontSize: "13px" }}>가로 배열 (기본값: horizontal)</p>
                                <Checkbox.Group
                                    options={groupOptions}
                                    value={groupValues}
                                    onChange={setGroupValues}
                                    name="fruits"
                                />
                            </div>

                            <div>
                                <p className="guide-desc" style={{ marginBottom: "8px", fontSize: "13px" }}>세로 배열 (vertical)</p>
                                <Checkbox.Group
                                    options={verticalOptions}
                                    value={verticalValues}
                                    onChange={setVerticalValues}
                                    layout="vertical"
                                    name="options"
                                />
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`import { useState } from "react";
import { Checkbox } from "@/publishing/components";

const options = [
    { label: "사과", value: "apple" },
    { label: "바나나", value: "banana" },
    { label: "포도", value: "grape" },
    { label: "오렌지 (비활성)", value: "orange", disabled: true },
];

const [selected, setSelected] = useState<string[]>(["apple"]);

// 가로 배열 (기본값)
<Checkbox.Group
    options={options}
    value={selected}
    onChange={setSelected}
    name="fruits"
/>

// 세로 배열
<Checkbox.Group
    options={options}
    value={selected}
    onChange={setSelected}
    layout="vertical"
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Checkbox.Group — Disabled / ReadOnly</h3>
                        <p className="guide-desc">
                            그룹 전체를 <code>disabled</code> 또는 <code>readOnly</code>로 설정할 수 있습니다. 개별 옵션의 <code>disabled</code> 속성과 조합도 가능합니다.
                        </p>

                        <div className="comp-preview is-column" style={{ gap: "1.6rem" }}>
                            <div>
                                <p className="guide-desc" style={{ marginBottom: "8px", fontSize: "13px" }}>전체 Disabled</p>
                                <Checkbox.Group
                                    options={[
                                        { label: "옵션 A", value: "a" },
                                        { label: "옵션 B", value: "b" },
                                    ]}
                                    value={["a"]}
                                    onChange={() => { }}
                                    disabled
                                />
                            </div>
                            <div>
                                <p className="guide-desc" style={{ marginBottom: "8px", fontSize: "13px" }}>전체 ReadOnly</p>
                                <Checkbox.Group
                                    options={[
                                        { label: "옵션 A", value: "a" },
                                        { label: "옵션 B", value: "b" },
                                    ]}
                                    value={["b"]}
                                    onChange={() => { }}
                                    readOnly
                                />
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`// 전체 비활성화
<Checkbox.Group options={options} value={selected} onChange={setSelected} disabled />

// 전체 읽기 전용
<Checkbox.Group options={options} value={selected} onChange={setSelected} readOnly />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4">Checkbox</h4>
                        <p className="guide-desc mt-10">
                            <code>Checkbox</code> 컴포넌트는 HTML 표준 <code>&lt;input type="checkbox"&gt;</code>의 모든 속성을 상속받습니다.
                        </p>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "17%" }} />
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
                                        <td className="guide-td"><code>label</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">체크박스 우측에 표시될 메인 텍스트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>description</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">레이블 하단에 표시될 부가 설명 텍스트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>checked</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">체크박스의 선택 상태입니다. (제어 컴포넌트로 사용할 때)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">체크박스를 비활성화 상태로 만듭니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>readOnly</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">체크박스를 읽기 전용 상태로 만듭니다. 키보드나 마우스로 값을 변경할 수 없습니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">체크박스 상태 변경 시 호출되는 이벤트 핸들러입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">실제 <code>input</code> 태그에 커스텀 CSS 클래스를 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"default" | "box"</code></td>
                                        <td className="guide-td"><code>"default"</code></td>
                                        <td className="guide-td">체크박스 스타일 변형입니다. <code>"box"</code>로 설정하면 전체 영역을 테두리로 감싼 박스 형태로 표시됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>wrapperClassName</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">전체를 감싸는 최상위 래퍼 <code>div</code> 요소에 커스텀 CSS 클래스를 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>...props</code></td>
                                        <td className="guide-td"><code>InputHTMLAttributes</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>id</code>, <code>name</code> 등 기타 모든 HTML <code>&lt;input type="checkbox"&gt;</code> 표준 속성을 지원합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Checkbox.Group</h4>
                        <div className="guide-table-wrap mt-10">
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
                                        <td className="guide-td"><code>options</code></td>
                                        <td className="guide-td"><code>CheckboxOption[]</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 렌더링할 체크박스 옵션 배열입니다. 각 옵션은 <code>label</code>, <code>value</code>, <code>description?</code>, <code>disabled?</code>를 가집니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>value</code></td>
                                        <td className="guide-td"><code>string[]</code></td>
                                        <td className="guide-td"><code>[]</code></td>
                                        <td className="guide-td">현재 선택된 값들의 배열입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(values: string[]) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">선택 값이 변경될 때 호출되는 콜백 함수입니다. 변경된 전체 선택값 배열을 반환합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>name</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">각 <code>input</code>의 <code>name</code> 속성값입니다. 폼 전송 시 그룹을 식별하는 데 사용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"horizontal" | "vertical"</code></td>
                                        <td className="guide-td"><code>"horizontal"</code></td>
                                        <td className="guide-td">체크박스 목록의 배치 방향을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">그룹 내 모든 체크박스를 비활성화합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>readOnly</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">그룹 내 모든 체크박스를 읽기 전용 상태로 만듭니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">그룹 컨테이너에 커스텀 CSS 클래스를 추가합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">CheckboxOption (options 배열 항목)</h4>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "17%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Key</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>label</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 화면에 표시할 라벨입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>value</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 선택 시 폼에 전달될 실제 값입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>description</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">선택 항목에 대한 부가 설명입니다. 라벨 하단에 표시됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">해당 옵션만 개별적으로 비활성화합니다.</td>
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
