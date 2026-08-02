import { Layout } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function LayoutGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Layout</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        서비스의 전체적인 뼈대를 담당하는 레이아웃 컴포넌트입니다.
                        상단 GNB와 좌측 LNB가 고정된 상태에서 우측 Main 영역이 독립적으로 스크롤되는 구조를 가집니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Layout</h3>
                        <p className="guide-desc">
                            <code>Layout</code> 컴포넌트는 페이지의 제목(<code>title</code>)과 실제 컨텐츠(<code>children</code>)를 인자로 받습니다.<br />
                            제목을 입력하면 상단 헤더 영역에 타이틀과 즐겨찾기 버튼이 자동으로 생성됩니다.
                        </p>

                        <div className="comp-preview layout-preview-box" style={{ padding: 0, overflow: "hidden" }}>
                            <Layout title="타이틀을 입력해 주세요">
                                컨텐츠 영역 입니다.
                            </Layout>
                        </div>
                        <CodeBlock isComponent={true} code={`<Layout title="타이틀을 입력해 주세요">
    컨텐츠 영역 입니다.
</Layout>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
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
                                        <td className="guide-td"><code>title</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>-</code></td>
                                        <td className="guide-td">컨텐츠 상단 헤더 영역에 출력될 페이지 타이틀입니다. 이 값을 넘겨주면 타이틀 우측에 즐겨찾기 버튼이 함께 렌더링됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>activeMenuId</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">현재 활성화된 LNB 메뉴의 ID입니다. (해당 ID를 가진 메뉴에 하이라이트 처리 적용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">메인 영역에 렌더링될 실제 페이지 컨텐츠입니다.</td>
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