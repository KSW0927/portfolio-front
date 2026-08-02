import { useState } from "react";
import { Collapse, Typography } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function CollapseGuide() {
    const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

    const handleAccordionToggle = (id: number) => {
        setOpenAccordionId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Collapse</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Collapse 컴포넌트는 FAQ, 약관 등 사용자의 선택에 따라 상세 정보를 단계적으로 노출할 때 사용합니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Default Usage</h3>
                        <p className="guide-desc">
                            별도의 상태 관리 없이 동작하는 기본적인 비제어형(Uncontrolled) 사용법입니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Collapse.Group>
                                <Collapse title={(<Typography variant="heading-sm">휴양시설 이용 조건은 어떻게 되나요?</Typography>)}>
                                    <p>임직원 본인 및 직계가족에 한해 이용이 가능하며, 신청 시 가족관계 증명 서류가 필요할 수 있습니다.</p>
                                </Collapse>
                                <Collapse title="예약 취소 및 환불 규정 안내">
                                    <p>사용 7일 전: 100% 환불<br />사용 3일 전: 50% 환불<br />사용 당일: 노쇼 처리</p>
                                </Collapse>
                            </Collapse.Group>
                        </div>

                        <CodeBlock isComponent={true} code={`<Collapse.Group>
    <Collapse title={(<Typography variant="heading-sm">휴양시설 이용 조건은 어떻게 되나요?</Typography>)}>
        <p>임직원 본인 및 직계가족에 한해 이용이 가능하며, 신청 시 가족관계 증명 서류가 필요할 수 있습니다.</p>
    </Collapse>
    <Collapse title="예약 취소 및 환불 규정 안내">
        <p>사용 7일 전: 100% 환불<br />사용 3일 전: 50% 환불<br />사용 당일: 노쇼 처리</p>
    </Collapse>
</Collapse.Group>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Accordion</h3>
                        <p className="guide-desc">
                            <code>isOpen</code>과 <code>onToggle</code> prop을 활용하여 여러 항목 중 하나만 열리도록 상태를 제어(Controlled State)할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Collapse.Group>
                                <Collapse
                                    title="첫 번째 질문 (하나만 열립니다)"
                                    isOpen={openAccordionId === 1}
                                    onToggle={() => handleAccordionToggle(1)}
                                >
                                    <p>이곳은 첫 번째 질문에 대한 답변입니다.</p>
                                </Collapse>
                                <Collapse
                                    title="두 번째 질문 (클릭 시 다른 항목은 닫힘)"
                                    isOpen={openAccordionId === 2}
                                    onToggle={() => handleAccordionToggle(2)}
                                >
                                    <p>이곳은 두 번째 질문에 대한 답변입니다.</p>
                                </Collapse>
                            </Collapse.Group>
                        </div>

                        <CodeBlock isComponent={true} code={`const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

const handleAccordionToggle = (id: number) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
};

// ...

<Collapse.Group>
    <Collapse
        title="첫 번째 질문 (하나만 열립니다)"
        isOpen={openAccordionId === 1}
        onToggle={() => handleAccordionToggle(1)}
    >
        <p>이곳은 첫 번째 질문에 대한 답변입니다.</p>
    </Collapse>
    <Collapse
        title="두 번째 질문 (클릭 시 다른 항목은 닫힘)"
        isOpen={openAccordionId === 2}
        onToggle={() => handleAccordionToggle(2)}
    >
        <p>이곳은 두 번째 질문에 대한 답변입니다.</p>
    </Collapse>
</Collapse.Group>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Collapse 컴포넌트에서 사용할 수 있는 속성들입니다.</p>
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
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">헤더 영역에 표시될 제목입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isOpen</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">외부에서 열림 상태를 제어할 때 사용합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onToggle</code></td>
                                        <td className="guide-td"><code>() =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">헤더 클릭 시 실행될 콜백 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">펼쳐졌을 때 내부에 표시될 콘텐츠입니다.</td>
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