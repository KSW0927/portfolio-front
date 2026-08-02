import { useRef } from "react";
import { TreeList, type TreeListRef, type TreeData, Box } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function TreeListGuide() {
    const treeRef = useRef<TreeListRef>(null);

    const sampleTreeData: TreeData[] = [
        {
            id: "1",
            title: "예산항목",
            children: [
                {
                    id: "1-1",
                    title: "수입",
                    children: [
                        { id: "1-1-1", title: "해운수입" },
                        { id: "1-1-2", title: "항비" },
                        { id: "1-1-3", title: "기타운항비" },
                        { id: "1-1-4", title: "대선료" },
                    ]
                },
                {
                    id: "1-2",
                    title: "비용",
                    children: [
                        {
                            id: "1-2-1",
                            title: "운항비",
                            children: [
                                { id: "1-2-1-1", title: "화물비" },
                                { id: "1-2-1-2", title: "연료비" },
                                { id: "1-2-1-3", title: "항비" },
                                { id: "1-2-1-4", title: "급수비" },
                                { id: "1-2-1-5", title: "통신비" },
                                { id: "1-2-1-6", title: "기타 운항비" },
                            ]
                        },
                    ]
                },
                {
                    id: "1-3",
                    title: "선비",
                    children: [
                        { id: "1-3-1", title: "선원비" }
                    ]
                }
            ]
        }
    ];

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">TreeList</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <p className="guide-desc mb-4">
                            <code>react-complex-tree</code>를 기반으로 한 계층형 트리 컴포넌트입니다.
                        </p>

                        <div className="comp-preview">
                            <Box variant="inner">
                                <TreeList
                                    ref={treeRef}
                                    treeId="budget-tree"
                                    initData={sampleTreeData}
                                    onSelectItems={(items) => console.log("선택된 아이템 ID:", items)}
                                />
                            </Box>
                        </div>

                        <CodeBlock isComponent={true} code={`import { useRef } from "react";
import { TreeList, type TreeListRef, type TreeData, Box } from "@/publishing/components";

export default function Example() {
    const treeRef = useRef<TreeListRef>(null);

    const sampleTreeData: TreeData[] = [
        {
            id: "1",
            title: "예산항목",
            children: [
                {
                    id: "1-1",
                    title: "수입",
                    children: [
                        { id: "1-1-1", title: "해운수입" },
                        { id: "1-1-2", title: "항비" },
                    ]
                }
            ]
        }
    ];

    return (
        <Box variant="inner">
            <TreeList
                ref={treeRef}
                treeId="budget-tree"
                initData={sampleTreeData}
                onSelectItems={(items) => console.log("Selected:", items)}
            />
        </Box>
    );
}`} />
                    </article>

                    <article className="comp-article mt-10">
                        <h3 className="guide-h3">Props</h3>
                        <div className="guide-table-wrap mt-4">
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
                                        <td className="guide-td"><code>initData</code></td>
                                        <td className="guide-td"><code>TreeData[]</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 트리를 구성할 계층형 초기 데이터 객체 배열입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>treeId</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 트리 인스턴스를 식별하는 고유 ID입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onSelectItems</code></td>
                                        <td className="guide-td"><code>(items: string[]) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">트리 아이템을 클릭/선택했을 때 호출되는 콜백 함수입니다. 선택된 아이템의 ID 배열을 반환합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onPrimaryAction</code></td>
                                        <td className="guide-td"><code>(item: TreeItem) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">아이템에 더블 클릭이나 Enter 키 등 주요 액션이 발생했을 때 호출됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onRename</code></td>
                                        <td className="guide-td"><code>(item: TreeItem, newName: string) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">트리 아이템의 이름 변경이 발생했을 때 호출되는 콜백 함수입니다.</td>
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