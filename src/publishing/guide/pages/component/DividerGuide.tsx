import { Card, Divider } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function DividerGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Divider</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        디바이더는 콘텐츠 그룹 사이를 시각적으로 분리하여 구조를 명확하게 해주는 구분선 컴포넌트입니다.
                        가로(Horizontal)와 세로(Vertical) 방향을 모두 지원하며, 여백, 길이, 선 스타일을 자유롭게 조절할 수 있습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Layout</h3>
                        <p className="guide-desc">
                            방향에 따라 <code>horizontal</code>(기본값)과 <code>vertical</code> 스타일을 제공합니다.
                        </p>

                        <div className="comp-preview is-column">
                            <div>
                                <p className="guide-desc">Horizontal</p>
                                <Divider layout="horizontal" />
                            </div>
                            <div>
                                <span>Item 1</span>
                                <Divider layout="vertical" spacing={10} />
                                <span>Item 2</span>
                                <Divider layout="vertical" spacing={10} />
                                <span>Item 3</span>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<Divider layout="horizontal" />

<div>
    <span>Item 1</span>
    <Divider layout="vertical" spacing={10} />
    <span>Item 2</span>
    <Divider layout="vertical" spacing={10} />
    <span>Item 3</span>
</div>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Variant</h3>
                        <p className="guide-desc">
                            <code>variant</code> 속성을 통해 실선(<code>solid</code>) 또는 점선(<code>dashed</code>) 스타일을 선택할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <div>
                                <p className="guide-desc" style={{ marginBottom: 8 }}>Solid (Default)</p>
                                <Divider variant="solid" />
                            </div>
                            <div>
                                <p className="guide-desc" style={{ marginBottom: 8 }}>Dashed</p>
                                <Divider variant="dashed" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", height: 40, marginTop: 16 }}>
                                <span>Solid</span>
                                <Divider layout="vertical" variant="solid" spacing={20} />
                                <span>Dashed</span>
                                <Divider layout="vertical" variant="dashed" spacing={20} />
                                <span>Vertical</span>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<Divider variant="solid" />
<Divider variant="dashed" />

<Divider layout="vertical" variant="dashed" spacing={20} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Spacing</h3>
                        <p className="guide-desc">
                            <code>spacing</code> 속성을 통해 여백을 설정할 수 있습니다.
                            가로선일 경우 상/하 여백이, 세로선일 경우 좌/우 여백이 적용됩니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Card>
                                <Card.Header>위쪽 콘텐츠</Card.Header>
                                <Divider spacing={30} />
                                <Card.Body>아래쪽 콘텐츠 (상하 30px 여백)</Card.Body>
                            </Card>
                            <Card layout="horizontal">
                                <Card.Header>좌측</Card.Header>
                                <Divider layout="vertical" spacing={20} />
                                <Card.Body>우측 (좌우 20px 여백)</Card.Body>
                            </Card>
                        </div>

                        <CodeBlock isComponent={true} code={`<Divider spacing={30} /> {/* 상하 30px 마진 */}

<Divider layout="vertical" spacing={20} /> {/* 좌우 20px 마진 */}`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            <code>size</code> 속성으로 구분선의 길이를 조절할 수 있습니다. 기본값은 <code>100%</code>이며, 숫자(px)나 문자열(%)로 입력 가능합니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Card style={{ width: 400 }}>
                                <Divider size="50%" spacing={20} />
                                <Divider size={50} spacing={20} />
                            </Card>
                            <Card layout="horizontal" style={{ height: 100 }}>
                                <span>전체 높이</span>
                                <Divider layout="vertical" spacing={20} />
                                <span>지정 높이(20px)</span>
                                <Divider layout="vertical" spacing={20} size={20} />
                            </Card>
                        </div>

                        <CodeBlock isComponent={true} code={`<Divider size="50%" />  {/* 가로 길이 50% */}
<Divider size={50} />    {/* 가로 길이 50px */}

<Divider layout="vertical" size={20} /> {/* 세로 길이 20px */}`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Divider 컴포넌트에서 사용할 수 있는 속성들입니다.</p>
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
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"horizontal" | "vertical"</code></td>
                                        <td className="guide-td"><code>"horizontal"</code></td>
                                        <td className="guide-td">구분선의 방향을 결정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"solid" | "dashed"</code></td>
                                        <td className="guide-td"><code>"solid"</code></td>
                                        <td className="guide-td">구분선의 선 스타일(실선/점선)을 결정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td"><code>"100%"</code></td>
                                        <td className="guide-td">
                                            구분선의 길이를 지정합니다.<br />
                                            가로선은 <code>width</code>, 세로선은 <code>height</code>에 적용됩니다.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>spacing</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td"><code>0</code></td>
                                        <td className="guide-td">
                                            구분선 주변의 여백을 지정합니다.<br />
                                            가로선은 상하 마진, 세로선은 좌우 마진으로 적용됩니다.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">추가적인 커스텀 클래스를 적용합니다.</td>
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