import CodeBlock from "../../layout/CodeBlock";

export default function ClassConvention() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">클래스</h2>
            </header>

            <div className="guide-content-body">
                <div id="guide-naming-class" className="guide-wrap">

                    <article className="guide-article">
                        <h3 className="guide-h3">기본 컴포넌트 (Base Component)</h3>
                        <ul className="guide-list">
                            <li>독립적으로 존재할 수 있는 UI 컴포넌트의 최상위 클래스는 직관적이고 명확한 영문 명사를 사용합니다.</li>
                            <li>단어를 연결할 때는 대시(<code>-</code>)를 사용합니다.</li>
                        </ul>
                        <div className="mt-10">
                            <CodeBlock code={`/* 컴포넌트 선언 */
.button { ... }
.input-field { ... }
.floating-button { ... }`} />
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">옵션 및 상태 (Modifiers)</h3>
                        <ul className="guide-list">
                            <li>크기, 색상, 형태, 상태 등을 변경하는 모디파이어(Modifier) 클래스는 기본 컴포넌트와 구분하기 위해 <strong>대시(<code>-</code>) 하나로 시작하는 독립적인 클래스</strong>로 작성합니다.</li>
                            <li>HTML 태그에 기본 클래스와 모디파이어 클래스를 조합하여 다중 클래스로(Multi-class) 적용합니다.</li>
                        </ul>

                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table">
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "80%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">분류</th>
                                        <th className="guide-th" scope="col">클래스 예시</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><strong>Variant (색상/스타일)</strong></td>
                                        <td className="guide-td"><code>.-primary</code>, <code>.-secondary</code>, <code>.-outline</code>, <code>.-text</code>, <code>.-link</code></td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><strong>Size (크기)</strong></td>
                                        <td className="guide-td"><code>.-lg</code>, <code>.-md</code>, <code>.-rg</code>, <code>.-sm</code>, <code>.-xs</code></td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><strong>Shape (형태/아이콘)</strong></td>
                                        <td className="guide-td"><code>.-shape-circle</code>, <code>.-ico</code>, <code>.-plus</code>, <code>.-minus</code></td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><strong>State (상태)</strong></td>
                                        <td className="guide-td"><code>.-active</code>, <code>.-disabled</code> (속성 선택자 <code>[disabled]</code>와 병행 사용)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-10">
                            {/* 화면에 보여지는 예시 코드이므로 className이 아닌 class를 사용합니다 */}
                            <CodeBlock code={`<button type="button" class="button -primary -lg">대형 프라이머리 버튼</button>
<button type="button" class="button -secondary -sm -disabled" disabled>소형 세컨더리 버튼 (비활성)</button>
<a href="#" class="button -link">텍스트 링크 버튼</a>`} />
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">레이아웃 및 래퍼 (Layout & Wrapper)</h3>
                        <ul className="guide-list">
                            <li>컴포넌트를 감싸는 부모 컨테이너나 레이아웃 요소는 컴포넌트명 뒤에 <code>-wrap</code> 접미사를 붙여 사용합니다.</li>
                            <li>특정 비율이나 특수한 레이아웃 정렬이 필요한 경우, 래퍼 하위 요소에 <code>.-flex-5</code>, <code>.-flex-3</code> 같은 유틸리티성 모디파이어를 사용하여 제어합니다.</li>
                        </ul>
                        <div className="mt-10">
                            <CodeBlock code={`/* CSS 정의 */
.cta-wrap { display: flex; gap: 0.8rem; width: 100%; }
.cta-wrap .button.-flex-3 { flex: 3; }
.cta-wrap .button.-flex-7 { flex: 7; }`} />
                        </div>
                        <div className="mt-10">
                            <CodeBlock code={`<div class="cta-wrap">
    <button type="button" class="button -secondary -lg -flex-3">취소</button>
    <button type="button" class="button -primary -lg -flex-7">확인</button>
</div>`} />
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">하위 요소 (Child Elements)</h3>
                        <ul className="guide-list">
                            <li>특정 컴포넌트에 종속되는 명확한 하위 요소(Element)는 컴포넌트명 뒤에 대시(<code>-</code>)로 연결하여 명명합니다.</li>
                        </ul>
                        <div className="mt-10">
                            <CodeBlock code={`<div class="floating-button-wrap">
    <button type="button" class="floating-button"><span>TOP</span></button>
    <button type="button" class="floating-button-close"><span class="hide">닫기</span></button>
</div>`} />
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">약어 사용 지양</h3>
                        <ul className="guide-list">
                            <li>클래스를 과도하게 줄이는 경우 작업자마다 해석이 달라질 수 있어 의미 해석의 오류가 발생할 수 있으므로 약어의 사용을 최대한 지양합니다.</li>
                            <li>모든 단어는 온전한 단어로 표기하는 것을 지향하되, 너무 길거나 풀어쓰는 것보다 약어 자체가 더 많이 사용되는 경우는 약어를 사용해도 좋습니다.<br />(예: <code>.button</code> (O), <code>.btn</code> (X) / <code>-lg</code> (O), <code>-large</code> (X))</li>
                        </ul>
                        <div className="compare-wrap mt-10">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.tit
.cnt
.btn
.call-to-action
.description
.large`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.title
.content
.button
.cta
.desc
.lg`}</code></pre>
                                </div>
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </>
    );
}