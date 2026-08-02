import { useState } from "react";
import { Tab } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function TabGuide() {
    const [activeLine, setActiveLine] = useState<string>("tab1");
    const [activeChip, setActiveChip] = useState<string>("status1");
    const [activeProvider, setActiveProvider] = useState<string>("p1");

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Tab</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        탭(Tab) 컴포넌트는 사용자가 여러 화면이나 카테고리를 이동할 때 사용하는 내비게이션 요소입니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Line</h3>
                        <p className="guide-desc">
                            기본 탭 형태입니다. 활성화된 탭 아래에 굵은 선이 표시됩니다.
                        </p>

                        <div className="comp-preview">
                            <Tab value={activeLine} onChange={(val) => setActiveLine(val as string)}>
                                <Tab.Item value="tab1">Tab 1</Tab.Item>
                                <Tab.Item value="tab2">Tab 2</Tab.Item>
                                <Tab.Item value="tab3">Tab 3</Tab.Item>
                                <Tab.Item value="tab4">Tab 4</Tab.Item>

                                <Tab.Panel value="tab1">Tab1 Contents</Tab.Panel>
                                <Tab.Panel value="tab2">Tab2 Contents</Tab.Panel>
                                <Tab.Panel value="tab3">Tab3 Contents</Tab.Panel>
                                <Tab.Panel value="tab4">Tab4 Contents</Tab.Panel>
                            </Tab>
                        </div>

                        <CodeBlock isComponent={true} code={`const [activeTab, setActiveTab] = useState("tab1");

<Tab value={activeTab} onChange={setActiveTab} variant="line">
    <Tab.Item value="tab1">Tab 1</Tab.Item>
    <Tab.Item value="tab2">Tab 2</Tab.Item>
    <Tab.Item value="tab3">Tab 3</Tab.Item>
    <Tab.Item value="tab4">Tab 4</Tab.Item>

    <Tab.Panel value="tab1">Tab1 Contents</Tab.Panel>
    <Tab.Panel value="tab2">Tab2 Contents</Tab.Panel>
    <Tab.Panel value="tab3">Tab3 Contents</Tab.Panel>
    <Tab.Panel value="tab4">Tab4 Contents</Tab.Panel>
</Tab>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Chip</h3>
                        <p className="guide-desc">
                            둥근 캡슐 모양의 버튼형 탭입니다. 주로 필터나 상태를 분류할 때 사용합니다.
                        </p>

                        <div className="comp-preview">
                            <Tab variant="chip" value={activeChip} onChange={(val) => setActiveChip(val as string)}>
                                <Tab.Item value="status1">Tab 1</Tab.Item>
                                <Tab.Item value="status2">Tab 2</Tab.Item>
                                <Tab.Item value="status3">Tab 3</Tab.Item>
                                <Tab.Item value="status4">Tab 4</Tab.Item>

                                <Tab.Panel value="status1">Tab1 Contents</Tab.Panel>
                                <Tab.Panel value="status2">Tab2 Contents</Tab.Panel>
                                <Tab.Panel value="status3">Tab3 Contents</Tab.Panel>
                                <Tab.Panel value="status4">Tab4 Contents</Tab.Panel>
                            </Tab>
                        </div>

                        <CodeBlock isComponent={true} code={`const [activeStatus, setActiveStatus] = useState("status1");

<Tab variant="chip" value={activeStatus} onChange={setActiveStatus}>
    <Tab.Item value="status1">Tab 1</Tab.Item>
    <Tab.Item value="status2">Tab 2</Tab.Item>
    <Tab.Item value="status3">Tab 3</Tab.Item>
    <Tab.Item value="status4">Tab 4</Tab.Item>

    <Tab.Panel value="status1">Tab1 Contents</Tab.Panel>
    <Tab.Panel value="status2">Tab2 Contents</Tab.Panel>
    <Tab.Panel value="status3">Tab3 Contents</Tab.Panel>
    <Tab.Panel value="status4">Tab4 Contents</Tab.Panel>
</Tab>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Provider (패널 분리)</h3>
                        <p className="guide-desc">
                            <code>Tab.Provider</code>로 감싸면 <code>Tab.Panel</code>을 <code>Tab</code> 컴포넌트 외부에 자유롭게 배치할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Tab.Provider value={activeProvider} onChange={(val) => setActiveProvider(val as string)}>
                                <Tab value={activeProvider} onChange={(val) => setActiveProvider(val as string)}>
                                    <Tab.Item value="p1">Tab 1</Tab.Item>
                                    <Tab.Item value="p2">Tab 2</Tab.Item>
                                    <Tab.Item value="p3">Tab 3</Tab.Item>
                                </Tab>
                                <div style={{ padding: "16px 0" }}>
                                    <Tab.Panel value="p1">Tab1 Contents (패널 분리)</Tab.Panel>
                                    <Tab.Panel value="p2">Tab2 Contents (패널 분리)</Tab.Panel>
                                    <Tab.Panel value="p3">Tab3 Contents (패널 분리)</Tab.Panel>
                                </div>
                            </Tab.Provider>
                        </div>

                        <CodeBlock isComponent={true} code={`const [activeTab, setActiveTab] = useState("p1");

<Tab.Provider value={activeTab} onChange={setActiveTab}>
    <Tab value={activeTab} onChange={setActiveTab}>
        <Tab.Item value="p1">Tab 1</Tab.Item>
        <Tab.Item value="p2">Tab 2</Tab.Item>
        <Tab.Item value="p3">Tab 3</Tab.Item>
    </Tab>

    <div>
        {/* Tab 외부에서도 패널 사용 가능 */}
        <Tab.Panel value="p1">Tab1 Contents</Tab.Panel>
        <Tab.Panel value="p2">Tab2 Contents</Tab.Panel>
        <Tab.Panel value="p3">Tab3 Contents</Tab.Panel>
    </div>
</Tab.Provider>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Accessibility</h3>
                        <p className="guide-desc">
                            W3C WAI-ARIA 표준을 준수합니다. 다음 키보드 조작을 지원합니다:
                        </p>
                        <ul className="guide-list">
                            <li><code>Tab</code>: 탭 리스트 또는 활성화된 패널로 포커스 이동</li>
                            <li><code>Left/Right Arrow</code>: 이전/다음 탭으로 포커스 및 선택 이동</li>
                            <li><code>Home/End</code>: 첫 번째/마지막 탭으로 이동</li>
                        </ul>

                        <div className="comp-preview">
                            <Tab
                                value={activeLine}
                                onChange={(val) => setActiveLine(val as string)}
                                label="사용자 설정 메뉴"
                            >
                                <Tab.Item value="tab1">프로필</Tab.Item>
                                <Tab.Item value="tab2">보안 설정</Tab.Item>
                                <Tab.Item value="tab3" disabled>알림 (점검중)</Tab.Item>

                                <Tab.Panel value="tab1">프로필 편집 화면입니다.</Tab.Panel>
                                <Tab.Panel value="tab2">비밀번호 변경 화면입니다.</Tab.Panel>
                            </Tab>
                        </div>
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4 mt-20">Tab</h4>
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
                                        <td className="guide-td"><code>"line" | "chip"</code></td>
                                        <td className="guide-td"><code>"line"</code></td>
                                        <td className="guide-td">탭의 시각적 형태를 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>value</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">현재 활성화된 탭의 값을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(value) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">탭 클릭 시 호출되며, 선택된 탭의 <code>value</code>를 반환합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Tab.Provider</h4>
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
                                        <td className="guide-td"><code>value</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">현재 활성화된 탭의 값을 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(value) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">탭 변경 시 호출되는 콜백 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"line" | "chip"</code></td>
                                        <td className="guide-td"><code>"line"</code></td>
                                        <td className="guide-td">탭의 시각적 형태를 설정합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">Tab.Item</h4>
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
                                        <td className="guide-td"><code>value</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">해당 탭 아이템의 고유 식별 값입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">클릭 및 포커스를 비활성화합니다.</td>
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