import { useState } from "react";
import { Icon, Input } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function InputGuide() {
    const [clearableText, setClearableText] = useState("텍스트를 지워보세요");
    const [errorText, setErrorText] = useState("잘못된 입력값");

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Input</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Input은 사용자가 텍스트 데이터를 입력할 수 있는 기본적인 폼 요소입니다.
                        상태와 사이즈에 따라 시각적인 피드백을 제공하며, 내용 지우기 및 유효성 검사 메시지 기능을 포함합니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label</h3>
                        <p className="guide-desc">
                            <code>label</code> prop을 사용하여 입력창에 폼 라벨을 추가할 수 있습니다.<br />
                            기본값인 <code>layout="vertical"</code>은 라벨이 상단에 위치하며, <code>layout="horizontal"</code>을 설정하면 라벨과 입력창이 가로로 나란히 배치됩니다.
                        </p>

                        <div className="comp-preview" style={{ alignItems: "flex-end" }}>
                            <Input label="사용자 이름" />
                            <Input layout="horizontal" label="사용자 이름" />
                        </div>

                        <CodeBlock isComponent={true} code={`<Input label="사용자 이름" />
<Input layout="horizontal" label="사용자 이름" />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            인풋의 크기는 <code>-lg</code>(기본값), <code>-md</code> 두 가지로 제공됩니다.
                            화면의 레이아웃과 입력 폼의 밀도에 맞춰 선택적으로 사용합니다.
                        </p>

                        <div className="comp-preview align-center">
                            <Input size="lg" placeholder="Large 사이즈 (기본값)" />
                            <Input size="md" placeholder="Medium 사이즈" />
                        </div>

                        <CodeBlock isComponent={true} code={`<Input size="lg" placeholder="Large 사이즈 (기본값)" />
<Input size="md" placeholder="Medium 사이즈" />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Width</h3>
                        <p className="guide-desc">
                            <code>width</code> prop을 사용하여 인풋의 가로 너비를 직접 제어할 수 있습니다.
                            숫자(px 단위로 변환)나 문자열(%, rem 등) 형태를 모두 지원합니다.
                            <code>fullWidth</code>가 <code>true</code>일 경우 <code>width</code> 값보다 우선하여 100%로 적용됩니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Input width={200} placeholder="width={200}" />
                            <Input width="300px" placeholder="width='300px'" />
                            <Input width="50%" placeholder="width='50%'" />
                            <Input fullWidth placeholder="fullWidth={true}" />
                        </div>

                        <CodeBlock isComponent={true} code={`<Input width={200} placeholder="200px 너비" />
<Input width="300px" placeholder="300px 너비" />
<Input width="50%" placeholder="부모의 50% 너비" />
<Input fullWidth placeholder="100% 너비" />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">With Icon</h3>
                        <p className="guide-desc">
                            <code>leftIcon</code> prop을 사용하여 인풋 좌측에 아이콘을 추가할 수 있습니다.
                            아이콘은 시각적인 보조 역할을 하며, 일반적으로 검색이나 사용자 이름 등 필드의 목적을 나타내는 데 사용됩니다.
                        </p>

                        <div className="comp-preview">
                            <Input
                                leftIcon={<Icon name="search" size={18} />}
                                placeholder="검색어를 입력하세요."
                            />
                            <Input
                                leftIcon={<Icon name="user" size={18} />}
                                placeholder="이름을 입력해 주세요."
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`import { Icon } from "@/publishing/components";

<Input leftIcon={<Icon name="search" size={18} />} placeholder="검색어를 입력하세요." />
<Input leftIcon={<Icon name="user" size={18} />} placeholder="이름을 입력해 주세요." />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Clearable & Accessibility</h3>
                        <p className="guide-desc">
                            <code>onClear</code> prop을 전달하고 <code>value</code> 값이 존재하면, 우측에 텍스트를 한 번에 지울 수 있는 X 버튼이 나타납니다.
                        </p>
                        <div className="guide-info-box" style={{ marginTop: 0 }}>
                            <div>
                                <strong className="guide-info-box-title">접근성 가이드</strong>
                                <p className="guide-desc">
                                    입력창에 포커스가 있을 때 키보드의 <code>Esc</code> 키를 눌러도 내용이 지워지며, X 버튼 클릭 후에도 포커스가 입력창으로 자동 복귀되어 타이핑을 매끄럽게 이어갈 수 있습니다.
                                </p>
                            </div>
                        </div>

                        <div className="comp-preview">
                            <Input
                                placeholder="텍스트를 입력하세요"
                                value={clearableText}
                                onChange={(e) => setClearableText(e.target.value)}
                                onClear={() => setClearableText("")}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`import { useState } from "react";

const [text, setText] = useState("텍스트를 지워보세요");

<Input 
    placeholder="텍스트를 입력하세요" 
    value={text}
    onChange={(e) => setText(e.target.value)}
    onClear={() => setText("")} // 클릭 또는 Esc 키 입력 시 실행됨
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Validation</h3>
                        <p className="guide-desc">
                            <code>isError</code> prop을 <code>true</code>로 설정하면 테두리가 붉은색으로 변경됩니다.
                            <code>errorMsg</code>를 함께 전달하면 입력창 하단에 에러 아이콘과 함께 경고 메시지가 출력되며, 스크린 리더에서도 이를 자동으로 읽어줍니다.
                        </p>

                        <div className="comp-preview">
                            <Input
                                value={errorText}
                                onChange={(e) => setErrorText(e.target.value)}
                                onClear={() => setErrorText("")}
                                isError={true}
                                errorMsg="필수 입력 항목입니다."
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Input 
    value={text}
    onChange={(e) => setText(e.target.value)}
    onClear={() => setText("")}
    isError={true}
    errorMsg="필수 입력 항목입니다."
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Read Only (읽기 전용)</h3>
                        <p className="guide-desc">
                            <code>readOnly</code> 속성을 추가하면 텍스트를 읽고 복사할 수는 있지만 수정은 불가능해집니다.
                            <code>disabled</code>와 달리 폼 전송 시 데이터가 포함되며, 시각적인 흐림 처리가 되지 않습니다.
                        </p>

                        <div className="comp-preview">
                            <Input value="복사는 가능하지만 수정은 안 됩니다." readOnly />
                        </div>

                        <CodeBlock isComponent={true} code={`<Input value="복사는 가능하지만 수정은 안 됩니다." readOnly />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled (비활성화)</h3>
                        <p className="guide-desc">
                            <code>disabled</code> 속성을 추가하면 사용자 입력을 완전 차단하고, 래퍼 전체의 배경 및 텍스트 색상이 비활성화된 상태로 표시됩니다.
                            이 상태에서는 X(지우기) 버튼 등 모든 상호작용이 불가능해집니다.
                        </p>

                        <div className="comp-preview">
                            <Input placeholder="입력할 수 없습니다" disabled />
                            <Input value="수정 불가 텍스트" disabled />
                        </div>

                        <CodeBlock isComponent={true} code={`<Input placeholder="입력할 수 없습니다" disabled />
<Input value="수정 불가 텍스트" disabled />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Input 컴포넌트에서 사용할 수 있는 전용 속성들입니다. 기본 HTML <code>&lt;input&gt;</code> 속성(readOnly, maxLength 등)을 모두 상속받습니다.</p>
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
                                        <td className="guide-td"><code>string | ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">입력창 상단에 표시될 폼 라벨입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"vertical"</code></td>
                                        <td className="guide-td">라벨과 입력창의 배치 방향을 결정합니다. <code>"horizontal"</code> 적용 시 라벨이 왼쪽에 나란히 배치됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"lg" | "md"</code></td>
                                        <td className="guide-td"><code>"lg"</code></td>
                                        <td className="guide-td">입력창의 크기(높이 및 폰트 사이즈)를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>width</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">입력창의 가로 너비를 지정합니다. 숫자 입력 시 px 단위가 적용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>leftIcon</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">입력창 왼쪽에 표시할 아이콘 컴포넌트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>fullWidth</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 너비가 100%로 꽉 채워집니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isError</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정 시 테두리가 에러 색상으로 변경되며 에러 상태를 나타냅니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>errorMsg</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>isError</code>가 <code>true</code>일 때 입력창 하단에 표시할 경고 메시지입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onClear</code></td>
                                        <td className="guide-td"><code>() =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">텍스트 지우기(X) 버튼을 클릭하거나 Esc를 눌렀을 때 실행될 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>wrapperClassName</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">실제 <code>input</code> 태그를 감싸고 있는 외곽선(Wrapper) <code>div</code>에 커스텀 클래스를 추가할 때 사용합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">실제 <code>input</code> 엘리먼트 자체에 커스텀 클래스를 추가할 때 사용합니다.</td>
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