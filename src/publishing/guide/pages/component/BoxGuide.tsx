import { Box } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function BoxGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Box</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        화면 내에서 구역을 나누거나 컨텐츠를 그룹화할 때 사용하는 공통 Box 컴포넌트입니다.
                        기본 배경색과 패딩이 적용되어 있으며, <code>variant</code>와 <code>size</code> 속성을 통해 스타일을 확장할 수 있습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Variant</h3>
                        <p className="guide-desc">
                            박스의 용도와 배경색에 따라 <code>default</code>, <code>info</code>, <code>inner</code> 3가지 타입을 제공합니다.
                        </p>

                        <div className="comp-preview">
                            <Box variant="default">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Default Box</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>기본적인 회색 배경(#F1F3F8)의 컨테이너입니다. (padding: 20px)</p>
                            </Box>

                            <Box variant="info">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Info Box</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>안내 문구나 주의사항 등을 담을 때 사용합니다. (padding: 14px)</p>
                            </Box>

                            <Box variant="inner" style={{ border: "1px solid #ddd" }}>
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Inner Box</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>박스 내부에 들어가는 흰색 배경(#FFFFFF)의 컨테이너입니다. (가이드 가시성을 위해 임시 테두리 적용)</p>
                            </Box>
                        </div>

                        <CodeBlock isComponent={true} code={`<Box variant="default">Default Box</Box>
<Box variant="info">Info Box</Box>
<Box variant="inner">Inner Box</Box>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            기본 사이즈 외에 <code>size="lg"</code> 속성을 부여하여 상하좌우 여백을 넓게 사용할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Box>
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Default Box (padding: 20px)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>Default Size</p>
                            </Box>

                            <Box size="lg">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Default Box - Large (padding: 30px)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}><code>size="lg"</code> 적용 시 더 넓은 내부 여백을 가집니다.</p>
                            </Box>

                            <Box variant="info">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Info Box (padding: 14px)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>Default Size</p>
                            </Box>

                            <Box variant="info" size="lg">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Info Box - Large (padding: 24px)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}><code>size="lg"</code> 적용 시 더 넓은 내부 여백을 가집니다.</p>
                            </Box>
                        </div>

                        <CodeBlock isComponent={true} code={`<Box>Default Size (padding: 20px)</Box>
<Box size="lg">Large Size (padding: 30px)</Box>

<Box variant="info">Default Size (padding: 14px)</Box>
<Box variant="info" size="lg">Large Size (padding: 24px)</Box>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Nesting</h3>
                        <p className="guide-desc">
                            실무에서 가장 많이 쓰이는 형태입니다. 회색 배경의 <code>default</code> 박스 내부에 흰색 배경의 <code>inner</code> 박스를 중첩하여 컨텐츠를 분리합니다.
                        </p>

                        <div className="comp-preview">
                            <Box variant="default">
                                <h4 style={{ marginBottom: "15px", fontSize: "1.6rem", fontWeight: 600 }}>결제 정보</h4>

                                <Box variant="inner">
                                    <p style={{ fontWeight: 500, color: "#333" }}>[내부 데이터 영역]</p>
                                    <p style={{ marginTop: "4px", color: "#666" }}>이곳에 상세 폼이나 테이블이 들어갑니다.</p>
                                </Box>
                            </Box>
                        </div>

                        <CodeBlock isComponent={true} code={`<Box variant="default">
    <h4>결제 정보</h4>
    <Box variant="inner">
        상세 폼 또는 테이블 영역
    </Box>
</Box>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
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
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"default" | "info" | "inner"</code></td>
                                        <td className="guide-td"><code>"default"</code></td>
                                        <td className="guide-td">
                                            박스의 배경색과 용도에 따른 기본 타입을 지정합니다.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"lg"</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">
                                            박스의 추가 크기(여백) 옵션을 지정합니다. (예: <code>-lg</code> 클래스 추가)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>gap</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td"><code>0</code></td>
                                        <td className="guide-td">자식 요소 간의 간격(gap)을 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>fullHeight</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code> 설정 시 박스의 높이를 100%로 채웁니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>header</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">박스 상단에 고정되는 헤더 영역입니다. 타이틀, 버튼 등 부가 요소를 배치할 수 있습니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">박스 내부에 렌더링될 컨텐츠입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">추가적인 커스텀 클래스를 전달할 수 있습니다.</td>
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