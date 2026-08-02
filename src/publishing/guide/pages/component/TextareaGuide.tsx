import { useState } from "react";
import { Textarea } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function TextareaGuide() {
    const [errorText, setErrorText] = useState("잘못된 형태의 입력입니다.");

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Textarea</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Textarea는 사용자가 여러 줄의 긴 텍스트 데이터를 입력할 수 있는 폼 요소입니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label</h3>
                        <p className="guide-desc">
                            <code>label</code> prop을 사용하여 입력창에 폼 라벨을 추가할 수 있습니다.<br />
                            기본값인 <code>layout="vertical"</code>은 라벨이 상단에 위치하며, <code>layout="horizontal"</code>을 설정하면 라벨과 텍스트 영역이 나란히 배치됩니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Textarea label="설명" placeholder="설명을 자세히 입력해 주세요." fullWidth />
                            <Textarea layout="horizontal" label="상세 사유" placeholder="사유를 입력해 주세요." fullWidth />
                        </div>

                        <CodeBlock isComponent={true} code={`<Textarea label="설명" placeholder="설명을 자세히 입력해 주세요." fullWidth />
<Textarea layout="horizontal" label="상세 사유" placeholder="사유를 입력해 주세요." fullWidth />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Rows</h3>
                        <p className="guide-desc">
                            <code>rows</code> 속성을 사용하여 초기 렌더링 시 노출되는 줄 수를 지정할 수 있습니다. (기본값: 4)
                        </p>

                        <div className="comp-preview align-center">
                            <Textarea rows={2} placeholder="rows={2}" width={300} />
                            <Textarea rows={6} placeholder="rows={6}" width={300} />
                        </div>

                        <CodeBlock isComponent={true} code={`<Textarea rows={2} placeholder="높이가 2줄인 영역" />
<Textarea rows={6} placeholder="높이가 6줄인 영역" />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Validation</h3>
                        <p className="guide-desc">
                            <code>isError</code> prop을 <code>true</code>로 설정하면 테두리가 붉은색으로 변경됩니다.
                            <code>errorMsg</code>를 함께 전달하면 입력창 하단에 에러 아이콘과 함께 경고 메시지가 출력됩니다.
                        </p>

                        <div className="comp-preview">
                            <Textarea
                                value={errorText}
                                onChange={(e) => setErrorText(e.target.value)}
                                isError={true}
                                errorMsg="내용을 10자 이상 입력해야 합니다."
                                fullWidth
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Textarea 
    value={text}
    onChange={(e) => setText(e.target.value)}
    isError={true}
    errorMsg="내용을 10자 이상 입력해야 합니다."
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <p className="guide-desc">
                            <code>disabled</code> 속성을 추가하면 사용자 입력을 차단하고, 배경 및 텍스트 색상이 비활성화된 상태로 표시됩니다.<br />
                            이 상태에서는 크기 조절(Resize)도 불가능해집니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Textarea placeholder="입력할 수 없습니다" disabled fullWidth />
                        </div>

                        <CodeBlock isComponent={true} code={`<Textarea placeholder="입력할 수 없습니다" disabled />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Textarea 컴포넌트에서 사용할 수 있는 전용 속성들입니다. 기본 HTML <code>&lt;textarea&gt;</code> 속성을 모두 상속받습니다.</p>
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
                                        <td className="guide-td">입력창 상단(또는 좌측)에 표시될 폼 라벨입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"vertical"</code></td>
                                        <td className="guide-td">라벨과 입력창의 배치 방향을 결정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>rows</code></td>
                                        <td className="guide-td"><code>number</code></td>
                                        <td className="guide-td"><code>4</code></td>
                                        <td className="guide-td">입력창의 기본 표시 줄 수를 설정합니다. (높이 제어)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>width</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">입력창의 가로 너비를 지정합니다.</td>
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
                                        <td className="guide-td"><code>true</code>로 설정 시 에러 상태 테두리가 적용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>errorMsg</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><code>isError</code>가 <code>true</code>일 때 입력창 하단에 표시할 경고 메시지입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>wrapperClassName</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">실제 <code>textarea</code>를 감싸는 외곽선(Wrapper) <code>div</code>에 커스텀 클래스를 추가할 때 사용합니다.</td>
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