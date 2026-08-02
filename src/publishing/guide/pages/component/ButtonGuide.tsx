import { Button, Icon } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function ButtonGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Button</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">버튼은 사용자가 폼을 제출하거나, 모달을 열거나, 다음 단계로 진행하는 등 다양한 액션을 취할 수 있도록 유도하는 핵심 컴포넌트입니다.</p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Variant</h3>
                        <p className="guide-desc">
                            버튼의 시각적 강조 수준에 따라 <code>solid</code>, <code>filled</code>, <code>outlined</code>, <code>text</code> 네 가지 스타일을 제공합니다.
                        </p>

                        <div className="comp-preview">
                            <Button variant="solid">Solid</Button>
                            <Button variant="filled">Filled</Button>
                            <Button variant="outlined">Outlined</Button>
                            <Button variant="text">Text</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`<Button variant="solid">Solid</Button>
<Button variant="filled">Filled</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            버튼의 크기는 <code>sm</code>, <code>md</code>(기본값), <code>lg</code> 세 가지로 제공됩니다.
                        </p>

                        <div className="comp-preview align-center">
                            <Button size="lg">Large Button</Button>
                            <Button size="md">Medium Button</Button>
                            <Button size="sm">Small Button</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`<Button size="lg">Large Button</Button>
<Button size="md">Medium Button</Button>
<Button size="sm">Small Button</Button>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">With Icon</h3>
                        <p className="guide-desc">
                            버튼 내부에 아이콘을 추가하여 텍스트를 보조하거나, 아이콘만으로 버튼의 기능을 표현할 수 있습니다. <code>leftIcon</code>과 <code>rightIcon</code> prop을 사용합니다.<br />
                        </p>
                        <div className="guide-info-box" style={{ marginTop: 0 }}>
                            <div>
                                <strong className="guide-info-box-title">접근성 가이드</strong>
                                <p className="guide-desc">
                                    텍스트 없이 아이콘만 있는 버튼은 스크린 리더 사용자를 위해 반드시 <code>aria-label</code> 속성으로 버튼의 역할을 명시해야 합니다.
                                </p>
                            </div>
                        </div>

                        <div className="comp-preview align-center">
                            <Button variant="outlined" leftIcon={<Icon name="add" size={18} />}>
                                Add Item
                            </Button>
                            <Button variant="filled" leftIcon={<Icon name="settings" size={18} color="#005BAA" />} rightIcon={<Icon name="arrow-down" size={18} color="#005BAA" />}>
                                Settings
                            </Button>
                            <Button rightIcon={<Icon name="arrow-right" size={18} />}>
                                Next Step
                            </Button>
                            <Button variant="text" leftIcon={<Icon name="search" size={18} />} aria-label="검색" />
                        </div>

                        <CodeBlock isComponent={true} code={`import { Icon } from "@/publishing/components";

<Button variant="outlined" leftIcon={<Icon name="add" size={18} />}>
    Add Item
</Button>

// 💡 Tip: Icon 컴포넌트의 색상은 CSS color 값으로 쉽게 변경할 수 있습니다.
<Button 
    variant="filled" 
    leftIcon={<Icon name="settings" size={18} color="#005BAA" />} 
    rightIcon={<Icon name="arrow-down" size={18} color="#005BAA" />}
>
    Settings
</Button>
<Button rightIcon={<Icon name="arrow-right" size={18} />}>
    Next Step
</Button>
<Button variant="text" leftIcon={<Icon name="search" size={18} />} aria-label="검색" />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Text</h3>
                        <p className="guide-desc">
                            배경색 없이 텍스트로만 구성된 버튼 스타일입니다. 주로 보조적인 액션이나 리스트 내의 상세 보기 등에 사용됩니다.
                        </p>

                        <div className="comp-preview is-column">
                            <div style={{ display: "flex", gap: "2.0rem" }}>
                                <Button variant="text">Text Button</Button>
                                <Button variant="text" leftIcon={<Icon name="blank" size={24} />}>
                                    Text + Icon
                                </Button>
                                <Button variant="text" leftIcon={<Icon name="blank" size={24} />} rightIcon={<Icon name="blank" size={24} />} disabled>
                                    Text Disabled
                                </Button>
                            </div>
                            <div style={{ display: "flex", gap: "2.0rem" }}>
                                <Button variant="text" color="primary" size="sm">
                                    Text Primary
                                </Button>
                                <Button variant="text" color="primary" size="sm" leftIcon={<Icon name="blank" size={18} />}>
                                    Text Primary + Icon
                                </Button>
                                <Button variant="text" color="primary" size="sm" leftIcon={<Icon name="blank" size={18} />} rightIcon={<Icon name="blank" size={18} />} disabled>
                                    Text Primary + Icon
                                </Button>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<Button variant="text">Text Button</Button>
<Button variant="text" leftIcon={<Icon name="blank" size={24} />}>Text + Icon</Button>
<Button variant="text" leftIcon={<Icon name="blank" size={24} />} rightIcon={<Icon name="blank" size={24} />} disabled>
    Text Disabled
</Button>

<Button variant="text" color="primary" size="sm">Text Primary</Button>
<Button variant="text" color="primary" size="sm" leftIcon={<Icon name="blank" size={18} />}>Text Primary + Icon</Button>
<Button variant="text" color="primary" size="sm" leftIcon={<Icon name="blank" size={18} />} rightIcon={<Icon name="blank" size={18} />} disabled>
    Text Primary + Icon
</Button>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Mics</h3>
                        <p className="guide-desc">
                            기본 제공되는 <code>variant</code>나 <code>color</code> 외에도, <code>className</code>을 추가하여 특정 기능(예: 비상대응 활성화)에 맞는 커스텀 스타일을 덮어씌울 수 있습니다.
                        </p>

                        <div className="comp-preview align-center">
                            <Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>
                                다운로드
                            </Button>
                            <Button leftIcon={<Icon name="bell" size={24} />} rounded className="button-alarm">
                                비상대응
                            </Button>
                            <Button leftIcon={<Icon name="bell" size={24} />} rounded className="button-alarm -active">
                                비상대응
                            </Button>
                        </div>

                        <CodeBlock isComponent={true} code={`// 💡 Tip: Icon 컴포넌트의 색상은 CSS color 값으로 쉽게 변경할 수 있습니다.
<Button color="green" leftIcon={<Icon name="excel" size={24} color="#FFF" />}>
    다운로드
</Button>

// 비상대응 활성화 시 -active 클래스 추가
<Button leftIcon={<Icon name="bell" size={24} />} rounded className="button-alarm -active">
    비상대응
</Button>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">File Upload</h3>
                        <p className="guide-desc">
                            기본 HTML 파일 입력(<code>&lt;input type="file"&gt;</code>)의 투박한 디자인을 대체하는 컴포넌트입니다.<br />
                            버튼 클릭으로 파일 창을 호출하며, 선택된 파일명이나 기본 안내 메시지가 우측에 출력됩니다. <code>buttonProps</code>를 통해 버튼의 크기나 테마를 제어할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Button.FileUpload
                                buttonProps={{ size: "sm", color: "primary" }}
                            />

                            <Button.FileUpload
                                buttonText="첨부파일 변경"
                                placeholder="이미지 파일(.jpg, .png)만 가능합니다."
                                accept="image/png, image/jpeg"
                                buttonProps={{ variant: "outlined", size: "sm" }}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`// 기본 사용법
<Button.FileUpload />

// 속성 커스텀 사용법
<Button.FileUpload 
    buttonText="첨부파일 변경"
    placeholder="이미지 파일(.jpg, .png)만 가능합니다."
    accept="image/png, image/jpeg"
    multiple={true} // 다중 파일 선택 허용
    buttonProps={{ variant: "outlined", size: "sm" }} 
    onChange={(e) => console.log(e.target.files)}
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Shapes & Layout</h3>
                        <p className="guide-desc"><code>rounded</code> prop으로 모서리를 둥글게 만들거나, <code>fullWidth</code> prop으로 부모 요소의 너비를 100% 채우도록 설정할 수 있습니다.</p>

                        <div className="comp-preview align-center">
                            <Button color="primary" rounded>Rounded Button</Button>
                            <Button variant="outlined" color="primary" rounded>Rounded Button</Button>
                        </div>
                        <div className="comp-preview is-column">
                            <Button color="primary" fullWidth>Full Width Button</Button>
                            <Button variant="filled" color="primary" fullWidth>Full Width Button</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`<Button rounded>Rounded Button</Button>
<Button fullWidth>Full Width Button</Button>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <p className="guide-desc">
                            <code>disabled</code> 속성을 사용하여 버튼을 비활성화할 수 있습니다. 비활성 상태에서는 클릭 이벤트가 발생하지 않으며, 시각적으로 흐리게 표시됩니다.
                        </p>

                        <div className="comp-preview">
                            <Button disabled>Disabled</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`<Button disabled>Disabled</Button>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Button 컴포넌트에서 사용할 수 있는 속성들입니다. 기본 HTML 버튼 속성을 모두 상속받습니다.</p>
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
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"solid" | "filled" | "outlined" | "text"</code></td>
                                        <td className="guide-td"><code>"solid"</code></td>
                                        <td className="guide-td">버튼의 형태(스타일)를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>color</code></td>
                                        <td className="guide-td"><code>"primary" | "green"</code></td>
                                        <td className="guide-td"><code>"primary"</code></td>
                                        <td className="guide-td">버튼의 메인 색상 테마를 지정합니다.<br />(단, <code>variant="text"</code>일 경우 기본값은 빈 문자열로 처리되어 부모 색상을 따릅니다.)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"sm" | "md" | "lg"</code></td>
                                        <td className="guide-td"><code>"md"</code></td>
                                        <td className="guide-td">버튼의 크기를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>rounded</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 양끝 모서리가 완전히 둥근 형태가 됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>fullWidth</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 너비가 100%로 꽉 채워집니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>leftIcon</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">버튼 텍스트 왼쪽에 아이콘을 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>rightIcon</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">버튼 텍스트 오른쪽에 아이콘을 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">컴포넌트에 커스텀 CSS 클래스를 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>type</code></td>
                                        <td className="guide-td"><code>"button" | "submit" | "reset"</code></td>
                                        <td className="guide-td"><code>"button"</code></td>
                                        <td className="guide-td">HTML 버튼 요소의 타입을 지정합니다. (기본 브라우저 동작은 <code>submit</code>이지만 컴포넌트에서는 <code>button</code>으로 고정되어 있습니다.)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 버튼이 비활성화됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>aria-label</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>[접근성 필수]</strong> 텍스트 없이 아이콘만 있는 버튼일 경우 스크린 리더가 읽을 수 있도록 설명을 반드시 문자열로 전달해야 합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>...props</code></td>
                                        <td className="guide-td"><code>ButtonHTMLAttributes</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>onClick</code> 등 기타 모든 표준 HTML <code>&lt;button&gt;</code> 속성을 지원합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Button.FileUpload</h4>
                        <p className="guide-desc mt-10">
                            기본 HTML <code>&lt;input type="file"&gt;</code> 속성(<code>accept</code>, <code>multiple</code>, <code>onChange</code> 등)을 모두 상속받습니다.
                        </p>
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
                                        <td className="guide-td"><code>buttonText</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td"><code>"파일선택"</code></td>
                                        <td className="guide-td">좌측 업로드 버튼 내부에 표시될 텍스트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>placeholder</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>"선택된 파일이 없습니다."</code></td>
                                        <td className="guide-td">파일을 선택하지 않았을 때 우측에 표시될 기본 안내 메시지입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>buttonProps</code></td>
                                        <td className="guide-td"><code>ButtonProps</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">
                                            내부 버튼의 스타일을 제어하기 위한 프롭스 객체입니다.<br />
                                            (예: <code>{`{ size: "sm", variant: "outlined", color: "green" }`}</code>)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(e: ChangeEvent) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">파일이 선택되거나 변경되었을 때 실행될 함수입니다. <code>e.target.files</code>로 선택된 파일 객체에 접근할 수 있습니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>...props</code></td>
                                        <td className="guide-td"><code>InputHTMLAttributes</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>accept</code>(허용 확장자), <code>multiple</code>(다중 선택) 등 파일 input 고유 속성을 자유롭게 사용할 수 있습니다.</td>
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