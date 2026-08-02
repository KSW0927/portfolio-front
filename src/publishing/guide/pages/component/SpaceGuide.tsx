import { Space, Button, Typography } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function SpaceGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Space</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Space 컴포넌트는 인라인 요소들 사이에 일정한 간격을 자동으로 부여하여 레이아웃을 정렬할 때 사용합니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <p className="guide-desc">
                            여러 컴포넌트를 나란히 배치할 때 자동으로 일정한 간격을 제공합니다.
                        </p>
                        <div className="comp-preview">
                            <Space>
                                <span>Space:</span>
                                <Button variant="solid">Button 1</Button>
                                <Button variant="outlined">Button 2</Button>
                            </Space>
                        </div>
                        <CodeBlock isComponent={true} code={`<Space>
    <span>Space:</span>
    <Button variant="solid">Button 1</Button>
    <Button variant="outlined">Button 2</Button>
</Space>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Space.Item (Compound Component)</h3>
                        <p className="guide-desc">
                            <code>Space.Item</code>을 사용하면 복잡한 구조를 가진 개별 아이템들을 명확하게 구분하여 배치할 수 있습니다.
                            특히 수치와 단위를 묶어서 하나의 아이템으로 취급해야 할 때 유용합니다.
                        </p>
                        <div className="comp-preview">
                            <Space size="sm" align="center">
                                <Space.Item>
                                    <Typography variant="body-lg" as="span">진행과제</Typography>
                                </Space.Item>
                                <Space.Item>
                                    <Typography variant="heading-md" as="strong" primary>4</Typography>
                                    <Typography variant="body-lg" as="span">건</Typography>
                                </Space.Item>
                            </Space>
                        </div>
                        <CodeBlock isComponent={true} code={`<Space size="sm" align="center">
    <Space.Item>
        <Typography variant="body-lg" as="span">진행과제</Typography>
    </Space.Item>
    <Space.Item>
        <Typography variant="heading-md" as="strong" primary>4</Typography>
        <Typography variant="body-lg" as="span">건</Typography>
    </Space.Item>
</Space>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Separator</h3>
                        <p className="guide-desc">
                            <code>separator</code> 속성을 사용하여 아이템 사이에 구분선을 추가할 수 있습니다.
                        </p>
                        <div className="comp-preview">
                            <Space separator="|">
                                <Button variant="text">Item 1</Button>
                                <Button variant="text">Item 2</Button>
                                <Button variant="text">Item 3</Button>
                            </Space>
                        </div>
                        <CodeBlock isComponent={true} code={`<Space separator="|">
    <Button variant="text">Item 1</Button>
    <Button variant="text">Item 2</Button>
    <Button variant="text">Item 3</Button>
</Space>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <thead>
                                    <tr>
                                        <th className="guide-th">Prop</th>
                                        <th className="guide-th">Type</th>
                                        <th className="guide-th">Default</th>
                                        <th className="guide-th">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>direction</code></td>
                                        <td className="guide-td"><code>"horizontal" | "vertical"</code></td>
                                        <td className="guide-td"><code>"horizontal"</code></td>
                                        <td className="guide-td">아이템들의 배치 방향을 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"sm" | "md" | "lg" | number</code></td>
                                        <td className="guide-td"><code>"md"</code></td>
                                        <td className="guide-td">아이템 사이의 간격 크기를 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>separator</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">아이템들 사이에 삽입될 구분자 요소를 설정합니다.</td>
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