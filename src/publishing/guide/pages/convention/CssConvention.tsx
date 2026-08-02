import CodeBlock from "../../layout/CodeBlock";

export default function CssConvention() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">CSS</h2>
            </header>

            <div className="guide-content-body">
                <div id="guide-css" className="guide-wrap">

                    <article className="guide-article">
                        <h3 className="guide-h3">문자</h3>
                        <ul className="guide-list">
                            <li>영문은 소문자로 작성합니다.</li>
                            <li>가상 요소(Pseudo Element)와 Content 값은 자유롭게 지정합니다.</li>
                            <li><code>font-family</code>의 값도 폰트 이름에 따라 자유롭게 지정합니다.</li>
                        </ul>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">따옴표</h3>
                        <p className="guide-desc">이름에 공백이 포함된 폰트나 한글 이름의 폰트는 큰따옴표를 사용합니다.</p>
                        <CodeBlock code={`@charset "utf-8";

.selector::before {
    content: "";
    font-family: "Pretendard", sans-serif;
}`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">세미콜론</h3>
                        <p className="guide-desc">모든 Property의 마지막에는 반드시 세미콜론을 삽입합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.selector { property: value }`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.selector { property: value; }`}</code></pre>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">들여쓰기</h3>
                        <ul className="guide-list">
                            <li>한 번 들여쓰기는 공백 4칸(Space)으로 정의합니다.</li>
                            <li><code>:root</code>와 <code>@media</code>, <code>@keyframes</code> 설정 외에는 들여쓰기 하지 않습니다.</li>
                        </ul>
                        <CodeBlock code={`:root {
    --variable: value;
}

@media (min-width: 320px) {
    .selector { property: value; }
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">공백</h3>
                        <p className="guide-desc">선택자와 중괄호 사이에 공백을 한 칸 삽입합니다.</p>
                        <CodeBlock code={`.selector { }`} />

                        <p className="guide-desc mt-10">자식, 일반 형제, 인접 형제 선택자의 경우 이전과 다음에 공백을 각각 한 칸씩 삽입합니다.</p>
                        <CodeBlock code={`.selector > .selector { }
.selector + .selector { }
.selector ~ .selector { }`} />

                        <p className="guide-desc mt-10">중괄호 앞과 뒤, 콜론(<code>:</code>)의 이전과 다음은 공백 없이 붙이며, 세미콜론(<code>;</code>)과 다음 Property 사이에는 공백을 한 칸 삽입합니다.</p>
                        <CodeBlock code={`.selector { property: value; property: value; }`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">개행</h3>
                        <p className="guide-desc"><code>:root</code>와 <code>@media</code>인 경우 중괄호가 시작할 때 한 번, 끝나기 전에 한 번 개행합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`:root { --variable: value; }

@media (min-width: 320px) {
    .selector {
        property: value;
    }
}`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`:root {
    --variable: value;
}

@media (min-width: 320px) {
    .selector { property: value; }
}`}</code></pre>
                                </div>
                            </div>
                        </div>

                        <p className="guide-desc mt-10">서로 다른 선택자의 경우 개행으로 구분합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.selector1, .selector2 { property: value; }
.selector3 { property: value; }`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.selector1,
.selector2 { property: value; }
.selector3 { property: value; }`}</code></pre>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">Property 선언 순서</h3>
                        <div className="guide-table-wrap">
                            <table className="guide-table">
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "80%" }} />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th className="guide-th" scope="row">1. 레이아웃</th>
                                        <td className="guide-td"><code>content, display, flex, visibility, opacity, overflow, float, clear, position, top, right, bottom, left, z-index</code></td>
                                    </tr>
                                    <tr>
                                        <th className="guide-th" scope="row">2. 박스모델</th>
                                        <td className="guide-td"><code>width, min-width, max-width, height, min-height, max-height, margin, padding, border, border-radius, outline, background, box-shadow</code></td>
                                    </tr>
                                    <tr>
                                        <th className="guide-th" scope="row">3. 글꼴</th>
                                        <td className="guide-td"><code>color, font-style, font-variant, font-weight, font-size, line-height, font-family, letter-spacing, text-transform, text-align, vertical-align, text-shadow</code></td>
                                    </tr>
                                    <tr>
                                        <th className="guide-th" scope="row">4. 기타</th>
                                        <td className="guide-td">그 외 모든 속성</td>
                                    </tr>
                                    <tr>
                                        <th className="guide-th" scope="row">5. 변형 & 모션</th>
                                        <td className="guide-td"><code>transform, transition, animation</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">방향에 따른 순서</h3>
                        <p className="guide-desc">방향과 관련된 스타일인 경우 시계방향(top, right, bottom, left)의 순서로 선언합니다.</p>
                        <CodeBlock code={`.selector { margin: 10px 5px 15px 0; padding: 5px 10px 0 0; }`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">약식 속성</h3>
                        <div className="guide-alert warning">
                            <strong>주의:</strong> 약식 속성을 사용 시 지정하지 않은 값을 의도치 않게 초기화하는 경우가 발생할 수 있으므로 사용에 주의가 필요합니다.
                        </div>

                        <p className="guide-desc mt-10"><code>border</code>는 <code>width</code>, <code>style</code>, <code>color</code>의 순서로 선언합니다.</p>
                        <CodeBlock code={`.selector { border: 1px solid #000; }`} />

                        <p className="guide-desc mt-10"><code>background</code>는 개별적으로 선언하고, 두 개 이상의 속성을 선언할 경우에만 약식을 사용합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.selector { background: #000; }`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`.selector { background-color: #000; }`}</code></pre>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">축약</h3>
                        <p className="guide-desc">16진수 컬러 값은 세 자리로 축약하고, 값이 0인 경우 단위는 생략합니다.</p>
                        <CodeBlock code={`/* Color */
#000000 -> #000
#ff0000 -> #f00

/* Unit */
0rem -> 0
0px -> 0`} />
                    </article>

                </div>
            </div>
        </>
    );
}