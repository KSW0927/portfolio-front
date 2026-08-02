import { Badge } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function BadgeGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Badge</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        뱃지는 숫자나 상태, 카테고리 등을 간결하게 표시하기 위한 작은 UI 요소입니다.
                        스타일(Variant)과 색상(Color)을 조합하여 사용할 수 있습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Variant</h3>
                        <p className="guide-desc">
                            뱃지의 배경색과 테두리 적용 방식에 따라 <code>solid</code>, <code>filled</code>, <code>outlined</code> 세 가지 스타일을 제공합니다.
                        </p>

                        <div className="comp-preview">
                            <Badge variant="solid">Solid</Badge>
                            <Badge variant="filled">Filled</Badge>
                            <Badge variant="outlined">Outlined</Badge>
                        </div>

                        <CodeBlock isComponent={true} code={`<Badge variant="solid">Solid</Badge>
<Badge variant="filled">Filled</Badge>
<Badge variant="outlined">Outlined</Badge>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Color</h3>
                        <p className="guide-desc">
                            각 스타일별로 <code>blue</code>, <code>gray</code>, <code>red</code>, <code>green</code>, <code>yellow</code> 다섯 가지 색상을 지원합니다.
                        </p>

                        <div className="comp-preview">
                            <Badge color="blue">Blue</Badge>
                            <Badge color="gray">Gray</Badge>
                            <Badge color="red">Red</Badge>
                            <Badge color="green">Green</Badge>

                            <div style={{ width: "100%", height: "1px", backgroundColor: "var(--color-gray-03)", margin: "1rem 0" }} />

                            <Badge variant="filled" color="blue">Blue</Badge>
                            <Badge variant="filled" color="gray">Gray</Badge>
                            <Badge variant="filled" color="red">Red</Badge>
                            <Badge variant="filled" color="green">Green</Badge>

                            <div style={{ width: "100%", height: "1px", backgroundColor: "var(--color-gray-03)", margin: "1rem 0" }} />

                            <Badge variant="outlined" color="blue">Blue</Badge>
                            <Badge variant="outlined" color="gray">Gray</Badge>
                            <Badge variant="outlined" color="red">Red</Badge>
                            <Badge variant="outlined" color="green">Green</Badge>
                        </div>

                        <CodeBlock isComponent={true} code={`<Badge color="blue">Blue</Badge>
<Badge color="gray">Gray</Badge>
<Badge color="red">Red</Badge>
<Badge color="green">Green</Badge>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            뱃지의 크기는 <code>lg</code>, <code>md</code>(기본값), <code>sm</code> 세 가지로 제공됩니다.
                        </p>

                        <div className="comp-preview align-center" style={{ gap: "1rem" }}>
                            <Badge size="lg">Large</Badge>
                            <Badge size="md">Medium</Badge>
                            <Badge size="sm">Small</Badge>
                        </div>

                        <CodeBlock isComponent={true} code={`<Badge size="lg">Large Size</Badge>
<Badge size="md">Medium</Badge>
<Badge size="sm">Small</Badge>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Shapes</h3>
                        <p className="guide-desc">
                            <code>rounded</code> 속성으로 캡슐 모양을 만들거나, <code>dot</code> 속성으로 텍스트가 없는 알림 점 형태를 만들 수 있습니다.
                        </p>
                        <div className="guide-info-box">
                            <div>
                                <strong className="guide-info-box-title">접근성 가이드</strong>
                                <p className="guide-desc">
                                    Dot 형태는 따로 라벨이 없을 시 반드시 aria-label을 권장합니다.
                                </p>
                            </div>
                        </div>

                        <div className="comp-preview align-center" style={{ gap: "1.5rem" }}>
                            <Badge color="blue" size="sm" rounded>+99</Badge>
                            <Badge variant="outlined" color="red" rounded>Outlined Pill</Badge>
                            <Badge color="red" dot aria-label="새로운 알림" />
                            <Badge color="green" dot>재평가 진행</Badge>
                        </div>

                        <CodeBlock isComponent={true} code={`<Badge rounded>Pill Shape</Badge>
<Badge variant="outlined" rounded>Outlined Pill</Badge>
<Badge color="red" dot aria-label="새로운 알림" />
<Badge color="green" dot>재평가 진행</Badge>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Badge 컴포넌트의 모든 속성은 아래와 같습니다.</p>
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
                                        <td className="guide-td"><code>"solid" | "filled" | "outlined"</code></td>
                                        <td className="guide-td"><code>"solid"</code></td>
                                        <td className="guide-td">뱃지의 디자인 스타일을 결정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>color</code></td>
                                        <td className="guide-td"><code>"blue" | "gray" | "red" | "green"</code></td>
                                        <td className="guide-td"><code>"blue"</code></td>
                                        <td className="guide-td">뱃지의 테마 색상을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"sm" | "md" | "lg"</code></td>
                                        <td className="guide-td"><code>"md"</code></td>
                                        <td className="guide-td">뱃지의 높이와 패딩 크기를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>rounded</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code> 설정 시 양 끝이 둥근 캡슐 모양이 됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>dot</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">텍스트 없는 8px 크기의 원형 지시등 형태로 변경합니다. 텍스트와 함께 사용하면 텍스트 좌측에 점이 표시됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>aria-label</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>[접근성 권장]</strong> Dot 전용 뱃지처럼 텍스트가 없는 경우 스크린 리더를 위해 반드시 제공해야 합니다.</td>
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
