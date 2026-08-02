import { useState } from "react";
import { Card, Icon, Button, Typography, Divider } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function CardGuide() {
    const [isFavorite, setIsFavorite] = useState(false);
    const handleToggleFavorite = () => setIsFavorite(!isFavorite);

    const favButtonClasses = [
        "button-fav",
        isFavorite ? "-active" : ""
    ].filter(Boolean).join(" ");

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Card</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        연관된 정보를 독립적인 그룹으로 묶어 시각적으로 구분할 때 사용하는 Card 컴포넌트입니다.
                        기본 속성(<code>size</code>, <code>variant</code>, <code>layout</code>)으로 전체적인 틀을 잡고,
                        제공되는 하위 컴포넌트(<code>Header</code>, <code>Body</code>, <code>InnerBox</code> 등)를 레고 블록처럼 조립하여 유연하게 레이아웃을 구성할 수 있습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            카드 내부의 여백 크기를 4단계로 조절할 수 있습니다. 컨텐츠의 밀도와 목적에 따라 선택합니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Card size="sm" variant="light">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Small (sm)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>padding: 16px 20px</p>
                            </Card>

                            <Card size="md" variant="light">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Medium (md) - Default</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>padding: 20px 20px</p>
                            </Card>

                            <Card size="lg" variant="light">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Large (lg)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>padding: 24px 24px</p>
                            </Card>

                            <Card size="xl" variant="default">
                                <h4 style={{ fontSize: "1.4rem", fontWeight: 600 }}>Extra Large (xl)</h4>
                                <p style={{ marginTop: "4px", color: "#666" }}>padding: 30px 30px</p>
                            </Card>
                        </div>

                        <CodeBlock isComponent={true} code={`<Card size="sm">...</Card>
<Card size="md">...</Card>
<Card size="lg">...</Card>
<Card size="xl">...</Card>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Variant</h3>
                        <p className="guide-desc">
                            카드의 배경 및 테두리 테마(<code>variant</code>)를 지정하고, 선택되거나 강조되어야 할 때 <code>active</code> 속성을 부여합니다.
                        </p>

                        <div className="comp-preview is-column">
                            <div style={{ display: "flex", gap: "10px" }}>
                                <Card variant="default" style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 500 }}>Default</p>
                                    <p style={{ marginTop: "4px", fontSize: "1.3rem", color: "#666" }}>흰색 배경 / 진한 테두리</p>
                                </Card>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <Card variant="light" style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 500 }}>Light</p>
                                    <p style={{ marginTop: "4px", fontSize: "1.3rem", color: "#666" }}>흰색 배경 / 옅은 테두리</p>
                                </Card>
                                <Card variant="light" active style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 500, color: "#005BAA" }}>Light (Active)</p>
                                    <p style={{ marginTop: "4px", fontSize: "1.3rem", color: "#666" }}>연파랑 배경으로 변경</p>
                                </Card>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <Card variant="filled" style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 500 }}>Filled</p>
                                    <p style={{ marginTop: "4px", fontSize: "1.3rem", color: "#666" }}>회색 배경 / 옅은 테두리</p>
                                </Card>
                                <Card variant="filled" active style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 500, color: "#005BAA" }}>Filled (Active)</p>
                                    <p style={{ marginTop: "4px", fontSize: "1.3rem", color: "#666" }}>흰색 배경 / 파란색 테두리</p>
                                </Card>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<Card variant="default">...</Card>
<Card variant="light" active>...</Card>
<Card variant="filled" active>...</Card>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Layout</h3>
                        <p className="guide-desc">
                            <code>layout</code> 속성을 통해 내부 하위 컴포넌트(Header, Body, Actions 등)들의 기본 정렬 방향을 가로 또는 세로로 지정할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Card variant="light" layout="vertical" style={{ width: "400px" }}>
                                <Card.Header><Typography variant="heading-md">Vertical (기본값)</Typography></Card.Header>
                                <Card.Body>
                                    <p style={{ color: "#666" }}>정보가 위에서 아래로 흐르는 기본적인 대시보드 및 요약 카드 형태입니다.</p>
                                </Card.Body>
                                <Card.Actions style={{ marginTop: "16px" }}>
                                    <Button size="sm">상세보기</Button>
                                </Card.Actions>
                            </Card>

                            <Card variant="light" layout="horizontal" style={{ width: "100%", marginTop: "16px" }}>
                                <Card.Body>
                                    <Typography variant="heading-md">Horizontal</Typography>
                                    <p style={{ color: "#666", marginTop: "4px" }}>목록이나 리스트 아이템처럼 정보와 액션이 좌우로 나란히 배치되는 형태입니다.</p>
                                </Card.Body>
                                <Card.Actions>
                                    <Button size="sm" variant="outlined">수정</Button>
                                    <Button size="sm">삭제</Button>
                                </Card.Actions>
                            </Card>
                        </div>

                        <CodeBlock isComponent={true} code={`{/* 세로형 배치 (기본) */}
<Card layout="vertical">
    <Card.Header>...</Card.Header>
    <Card.Body>...</Card.Body>
    <Card.Actions>...</Card.Actions>
</Card>

{/* 가로형 배치 */}
<Card layout="horizontal">
    <Card.Body>...</Card.Body>
    <Card.Actions>...</Card.Actions>
</Card>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Clickable (클릭 가능한 카드)</h3>
                        <p className="guide-desc">
                            Card 컴포넌트에 <code>onClick</code> 이벤트를 부여하면 자동으로 마우스 호버/액티브 효과와 키보드 접근성이 적용되어 버튼처럼 사용할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <div style={{ display: "flex", gap: "16px" }}>
                                <Card size="md" variant="light" onClick={() => alert("Card clicked!")} style={{ flex: 1 }}>
                                    <Card.Header>
                                        <Typography variant="heading-md">클릭해 보세요</Typography>
                                    </Card.Header>
                                    <Card.Body>
                                        <p style={{ color: "#666" }}>클릭 가능한 카드입니다.</p>
                                    </Card.Body>
                                </Card>

                                <Card size="md" variant="filled" onClick={() => alert("Card clicked!")} style={{ flex: 1 }}>
                                    <Card.Header>
                                        <Typography variant="heading-md">키보드로도 동작합니다</Typography>
                                    </Card.Header>
                                    <Card.Body>
                                        <p style={{ color: "#666" }}>Tab 키로 포커스를 맞춘 후 Enter나 Space 키를 눌러보세요.</p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`<Card variant="light" onClick={() => alert("Card clicked!")}>
    <Card.Header>클릭 가능한 카드</Card.Header>
    <Card.Body>키보드로도 동작합니다.</Card.Body>
</Card>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Sub-components (하위 요소 조립)</h3>
                        <p className="guide-desc">
                            복잡한 데이터 구조를 표현하기 위해 <code>Header</code>, <code>Body</code>, <code>InnerBox</code>, <code>Divider</code>, <code>Actions</code>를 자유롭게 조합할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <Card size="md" variant="light" style={{ width: "100%", maxWidth: "600px" }}>
                                <Card.Header
                                    leftIcon={<Icon name="approval" size={20} />}
                                    extra={<Button variant="text" leftIcon={<Icon name="star-filled" size={32} />} className={favButtonClasses} aria-label="즐겨찾기" onClick={handleToggleFavorite} />}
                                >
                                    <Typography variant="heading-md">복합 데이터 카드 예시</Typography>
                                </Card.Header>

                                <Card.Body style={{ marginBottom: "16px" }}>
                                    <p style={{ color: "#666" }}>필요한 하위 요소들만 골라서 원하는 레이아웃을 구성하세요.</p>
                                </Card.Body>

                                <Divider spacing={20} />

                                <Card.Actions>
                                    <Button variant="outlined" size="sm">자세히 보기</Button>
                                </Card.Actions>
                            </Card>
                        </div>

                        <CodeBlock isComponent={true} code={`<Card size="md" variant="light">
    <Card.Header
        leftIcon={<Icon name="approval" size={20} />}
        extra={<Button variant="text" leftIcon={<Icon name="star-filled" size={32} />} className={favButtonClasses} aria-label="즐겨찾기" onClick={handleToggleFavorite} />}
    >
        <Typography variant="heading-md">복합 데이터 카드 예시</Typography>
    </Card.Header>

    <Card.Body>내용...</Card.Body>

    <Card.Divider type="horizontal" />

    <Card.Actions>
        <Button variant="outlined">자세히 보기</Button>
    </Card.Actions>
</Card>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4 mt-20">Card</h4>
                        <div className="guide-table-wrap">
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
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"sm" | "md" | "lg" | "xl"</code></td>
                                        <td className="guide-td"><code>"md"</code></td>
                                        <td className="guide-td">카드의 내부 여백(Padding) 크기를 조절합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"default" | "light" | "filled"</code></td>
                                        <td className="guide-td"><code>"default"</code></td>
                                        <td className="guide-td">카드의 시각적 테마 (배경색 및 테두리 색상)를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>active</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">카드의 선택 또는 활성화 상태를 표현합니다. (variant에 따라 다른 스타일 적용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"vertical"</code></td>
                                        <td className="guide-td">내부 자식 요소들의 배치 방향을 결정합니다. 리스트형 UI에서는 <code>"horizontal"</code>을 사용합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onClick</code></td>
                                        <td className="guide-td"><code>(e: MouseEvent) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">클릭 이벤트를 부여하면 자동으로 마우스 호버 효과와 키보드 접근성(Enter/Space 키 동작)이 활성화되어 버튼처럼 동작합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">카드 내부에 렌더링될 하위 컴포넌트들입니다.</td>
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

                        <h4 className="guide-h4 mt-20">Card.Header</h4>
                        <div className="guide-table-wrap">
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
                                        <td className="guide-td"><code>leftIcon</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">헤더 텍스트 좌측에 위치할 아이콘 노드입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>extra</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">헤더 우측 끝에 위치할 부가 요소입니다. (즐겨찾기 별표 아이콘 등)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">헤더의 메인 타이틀 영역입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">헤더 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Card.Body</h4>
                        <div className="guide-table-wrap">
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
                                        <td className="guide-td"><code>align</code></td>
                                        <td className="guide-td"><code>"left" | "center" | "right"</code></td>
                                        <td className="guide-td"><code>"left"</code></td>
                                        <td className="guide-td">내부 텍스트 및 인라인 요소의 가로 정렬 방향을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>gap</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td"><code>0</code></td>
                                        <td className="guide-td">자식 요소 간의 간격(gap)을 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">카드의 메인 컨텐츠 영역입니다. <code>layout="horizontal"</code>일 경우 가변폭(flex: 1)을 가집니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">Body 컨테이너에 추가할 커스텀 클래스입니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Card.Actions</h4>
                        <div className="guide-table-wrap">
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
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">조작 버튼(Button)들이 배치되는 영역입니다. 보통 카드 하단이나 우측(가로 모드)에 위치합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">Actions 컨테이너에 추가할 커스텀 클래스입니다.</td>
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