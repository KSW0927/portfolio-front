import CodeBlock from "../../layout/CodeBlock";

export default function HtmlConvention() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">HTML</h2>
            </header>

            <div className="guide-content-body">
                <div id="guide-html" className="guide-wrap">

                    <article className="guide-article">
                        <h3 className="guide-h3">DOCTYPE</h3>
                        <p className="guide-desc">HTML5의 문법을 기본으로 따릅니다.</p>
                        <CodeBlock code={`<!DOCTYPE html>`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">인코딩</h3>
                        <p className="guide-desc">대소문자를 구별하여 CSS와 동일한 인코딩을 지정합니다.</p>
                        <CodeBlock code={`<meta charset="utf-8">`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">문자</h3>
                        <p className="guide-desc">태그명, Attribute명과 값은 소문자와 숫자, 대시(-)만 사용하되 alt값은 자유롭게 사용합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    {/* 화면에 보여지는 예시 코드이므로 className이 아닌 class를 사용합니다 */}
                                    <pre><code>{`<HEADER class="HEADER"></HEADER>`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`<header class="header"></header>`}</code></pre>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">따옴표</h3>
                        <p className="guide-desc">속성값에는 반드시 큰따옴표("")만 사용합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`<header class="header"></header>`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`<header class="header"></header>`}</code></pre>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">개행</h3>
                        <p className="guide-desc">코드 한 줄이 너무 길어지지 않도록 개행을 합니다. 태그 내부에 문자만 있는 경우 한 줄로 표기하고, 내부 태그와 함께 있는 경우에는 개행합니다.</p>
                        <div className="compare-wrap">
                            <div className="compare-box">
                                <div className="compare-head bad">비권장 (X)</div>
                                <div className="code-block border-none">
                                    {/* 백틱(`) 안의 띄어쓰기가 화면에 그대로 반영되므로 왼쪽으로 바짝 붙여서 작성합니다 */}
                                    <pre><code>{`<p class="p">
    내용
</p>

<p class="p"><span class="bold">굵은</span> 내용</p>`}</code></pre>
                                </div>
                            </div>
                            <div className="compare-box">
                                <div className="compare-head good">권장 (O)</div>
                                <div className="code-block border-none">
                                    <pre><code>{`<p class="p">내용</p>

<p class="p">
    <span class="bold">굵은</span> 내용
</p>`}</code></pre>
                                </div>
                            </div>
                        </div>

                        <p className="guide-desc mt-10">개행은 코드의 가독성을 높이기 위한 수단이므로 가급적 지키되, 충분한 의도가 있는 경우라면 규칙에서 벗어나도 무방합니다.</p>
                        <CodeBlock code={`<ul>
    <li>
        <a href="javascript:void(0)">
            <div class="subject">제목</div>
            <div class="desc">설명</div>
        </a>
    </li>
</ul>`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">들여쓰기</h3>
                        <p className="guide-desc">한 번 들여쓰기는 공백 4칸(Space 4)으로 정의하고, 중첩이 깊어질 때마다 한 번씩 들여씁니다.</p>
                        <CodeBlock code={`<div class="content">
    <p class="p">변할 쌓여만 가느니 이국 노래를 바다를 밟고 언덕 그렇게 목구멍을 경, 찾지 육체와 어찌 있었다.</p>
</div>`} />
                    </article>

                    <article className="guide-article">
                        <h3 className="guide-h3">주석</h3>
                        <p className="guide-desc">주석은 코드 끝부분에 작성하지 않으며, 해당하는 라인의 직전 라인에 작성합니다.<br />완료 처리 후 수정된 부분에 대해 날짜와 함께 명확하고 간결한 설명 메시지를 제공합니다.</p>
                        <CodeBlock code={`<!-- [260417] 프로필 이미지 렌더링 로직 추가 -->
<div class="profile-wrap">...</div>`} />

                        <p className="guide-desc mt-10">한 페이지에 여러 케이스가 함께 있는 경우 아래와 같이 표시합니다.</p>
                        <CodeBlock code={`<!-- [CASE] 관리자 권한 로그인 시 -->
<div class="admin-panel">...</div>`} />
                    </article>

                </div>
            </div>
        </>
    );
}