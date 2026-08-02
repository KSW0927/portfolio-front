import { Typography } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function TypoGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Typography</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        타이포그래피는 텍스트의 크기(Size)와 굵기(Weight)를 일관성 있게 유지하여 디자인 시스템의 시각적 위계를 성립하고 가독성을 높이는 핵심 요소입니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Display</h3>
                        <p className="guide-desc">
                            페이지의 핵심 메시지나 히어로 영역 등 가장 텍스트가 강조되어야 할 때 사용하는 큰 사이즈의 타이포그래피입니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Typography variant="display-xl">Display - Extra Large (50px, Bold)</Typography>
                            <Typography variant="display-lg">Display - Large (38px, Bold)</Typography>
                        </div>

                        <CodeBlock isComponent={true} code={`<Typography variant="display-xl">Display - Extra Large</Typography>
<Typography variant="display-lg">Display - Large</Typography>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Heading</h3>
                        <p className="guide-desc">
                            페이지나 섹션의 제목 등에 사용되며, 정보의 계층 구조를 명확하게 구분해 줍니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Typography variant="heading-xl">Heading - Extra Large (26px, Bold)</Typography>
                            <Typography variant="heading-lg">Heading - Large (24px, Bold)</Typography>
                            <Typography variant="heading-md">Heading - Medium (22px, Bold)</Typography>
                            <Typography variant="heading-sm">Heading - Small (18px, Bold)</Typography>
                            <Typography variant="heading-xs">Heading - Extra Small (16px, Semi Bold)</Typography>
                        </div>

                        <CodeBlock isComponent={true} code={`<Typography variant="heading-xl">Heading - Extra Large</Typography>
<Typography variant="heading-lg">Heading - Large</Typography>
<Typography variant="heading-md">Heading - Medium</Typography>
<Typography variant="heading-sm">Heading - Small</Typography>
<Typography variant="heading-xs">Heading - Extra Small</Typography>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Body</h3>
                        <p className="guide-desc">
                            일반적인 본문, 컴포넌트 내부 텍스트 등에 사용됩니다. 굵기에 따라 <code>semibold</code>(600)와 <code>medium</code>(500)으로 나뉘며, 위계에 맞게 xl부터 xs까지의 사이즈를 선택할 수 있습니다.
                        </p>

                        <div className="comp-preview" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <Typography variant="body-lg" weight="semibold">Body Large - Semibold (16px)</Typography>
                                <Typography variant="body-md" weight="semibold">Body Medium - Semibold (14px)</Typography>
                                <Typography variant="body-sm" weight="semibold">Body small - Semibold (13px)</Typography>
                                <Typography variant="body-xs" weight="semibold">Body Extra Small - Semibold (12px)</Typography>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <Typography variant="body-lg" weight="medium">Body Large - Medium (16px)</Typography>
                                <Typography variant="body-md" weight="medium">Body Medium - Medium (14px)</Typography>
                                <Typography variant="body-sm" weight="medium">Body Small - Medium (13px)</Typography>
                                <Typography variant="body-xs" weight="medium">Body Extra Small - Medium (12px)</Typography>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`{/* weight 생략 시 기본값은 medium입니다 */}
<Typography variant="body-lg">Body Large - Medium</Typography>
<Typography variant="body-lg" weight="semibold">Body Large - Semibold</Typography>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Polymorphic Element</h3>
                        <p className="guide-desc">
                            <code>as</code> prop을 사용하여 시각적 스타일은 유지하되, 렌더링되는 HTML 태그를 시맨틱하게 변경할 수 있습니다.<br />
                            <strong>제네릭 다형성(Polymorphic)이 적용되어 있어, 변경된 태그에 맞는 고유 HTML 속성(예: <code>label</code>의 <code>htmlFor</code>, <code>a</code>의 <code>href</code>)을 타입 에러 없이 안전하게 사용할 수 있습니다.</strong>
                        </p>

                        <div className="comp-preview is-column">
                            <Typography variant="heading-xl" as="span">
                                스타일은 heading-xl이지만 실제로는 span 태그입니다.
                            </Typography>

                            <Typography variant="body-md" weight="medium" as="label" htmlFor="example-input">
                                스타일은 body-md (Medium)이지만 label 태그로 렌더링됩니다.
                            </Typography>

                            <Typography
                                variant="body-lg"
                                weight="semibold"
                                as="a"
                                href="#"
                            >
                                a 태그로 렌더링된 링크 텍스트입니다.
                            </Typography>
                        </div>

                        <CodeBlock isComponent={true} code={`<Typography variant="heading-xl" as="span">
    스타일은 heading-xl이지만 실제로는 span 태그입니다.
</Typography>

<Typography variant="body-md" weight="medium" as="label" htmlFor="example-input">
    스타일은 body-md (Medium)이지만 label 태그로 렌더링됩니다.
</Typography>

<Typography variant="body-lg" weight="semibold" as="a" href="#">
    a 태그로 렌더링된 링크 텍스트입니다.
</Typography>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Typography 컴포넌트에서 사용할 수 있는 속성들입니다.</p>
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
                                        <td className="guide-td"><code>"display-xl" | "heading-xl" | "body-lg" | ...</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 타이포그래피의 크기 스타일을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>as</code></td>
                                        <td className="guide-td"><code>ElementType</code></td>
                                        <td className="guide-td">매핑된 태그</td>
                                        <td className="guide-td">스타일은 유지한 채 렌더링할 HTML 태그를 변경합니다. (예: <code>"span"</code>, <code>"div"</code>, <code>"h2"</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>weight</code></td>
                                        <td className="guide-td"><code>"semibold" | "medium"</code></td>
                                        <td className="guide-td"><code>"medium"</code></td>
                                        <td className="guide-td">Body variant 사용 시 텍스트의 굵기를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>primary</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">true로 설정하면 브랜드 컬러(Primary)가 텍스트 색상으로 적용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>secondary</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">true로 설정하면 Secondary 컬러가 텍스트 색상으로 적용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>tertiary</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">true로 설정하면 Tertiary 컬러가 텍스트 색상으로 적용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>color</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">커스텀 텍스트 색상을 직접 지정합니다. (인라인 스타일로 적용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">출력할 내용을 전달합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">추가적인 커스텀 클래스를 적용합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>...props</code></td>
                                        <td className="guide-td"><code>HTMLAttributes</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">기타 표준 HTML 요소의 속성을 모두 지원합니다.</td>
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