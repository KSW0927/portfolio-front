import { useState } from "react";
import { RadioButton } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function RadioButtonGuide() {
    const [selected, setSelected] = useState("radio2");

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">RadioButton</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        여러 옵션 중 단 하나만을 선택해야 할 때 사용하는 컴포넌트입니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <div className="comp-preview">
                            <RadioButton
                                name="basic"
                                value="radio1"
                                checked={selected === "radio1"}
                                onChange={() => setSelected("radio1")}
                            />
                            <RadioButton
                                name="basic"
                                value="radio2"
                                checked={selected === "radio2"}
                                onChange={() => setSelected("radio2")}
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<RadioButton name="group" value="1" checked={true} />
<RadioButton name="group" value="2" checked={false} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label</h3>
                        <p className="guide-desc"><code>label</code> 속성을 사용하여 라디오버튼 우측에 텍스트를 추가할 수 있습니다.</p>
                        <div className="comp-preview">
                            <RadioButton
                                label="라디오버튼"
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<RadioButton label="라디오버튼" />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">With Description</h3>
                        <p className="guide-desc">
                            <code>description</code>속성을 사용하여 라디오버튼에 부가적인 설명을 덧붙일 수 있으며, <code>layout</code>을 통해 세로형 또는 가로형 배치를 선택할 수 있습니다.
                        </p>
                        <div className="comp-preview is-column">
                            <RadioButton
                                label="부가설명형 (Vertical)"
                                description="부차적인 설명이 아래에 들어갑니다."
                            />
                            <RadioButton
                                layout="horizontal"
                                label="부가설명형 (Horizontal)"
                                description="부차적인 설명이 우측에 들어갑니다."
                            />
                        </div>
                        <CodeBlock isComponent={true} code={`<RadioButton 
    label="세로형 설명" 
    description="부가 설명 텍스트" 
/>
<RadioButton 
    layout="horizontal"
    label="가로형 설명" 
    description="부가 설명 텍스트" 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <div className="comp-preview">
                            <div style={{ display: "flex", gap: "3.2rem" }}>
                                <RadioButton label="Disabled (Unchecked)" disabled />
                                <RadioButton label="Disabled (Checked)" disabled checked />
                            </div>
                        </div>
                        <CodeBlock isComponent={true} code={`<RadioButton label="비활성화" disabled />
<RadioButton label="비활성화 선택됨" disabled checked />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">RadioButton 컴포넌트 전용 속성입니다. 표준 HTML <code>&lt;input type="radio"&gt;</code> 속성을 모두 지원합니다.</p>
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
                                        <td className="guide-td">라디오 버튼 우측에 표시될 메인 텍스트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>description</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">추가적으로 표시될 설명 텍스트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"vertical"</code></td>
                                        <td className="guide-td">라벨과 설명 텍스트의 배치 방향을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>wrapperClassName</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">최상위 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>...props</code></td>
                                        <td className="guide-td"><code>InputHTMLAttributes</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>name</code>, <code>value</code>, <code>checked</code>, <code>onChange</code> 등 표준 속성</td>
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