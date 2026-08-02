export default function ImgConvention() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">이미지</h2>
            </header>

            <div className="guide-content-body">
                <div id="guide-naming-img" className="guide-wrap">
                    <article className="guide-article">
                        <h3 className="guide-h3">이미지 규칙</h3>
                        <ul className="guide-list">
                            <li>디자인 단계에서 정의된 Export 명이 없는 경우 아래 규칙을 따릅니다.</li>
                            <li>단어 간의 구분은 대시(-)로 연결하고 화면ID와 조합되는 경우 이미지가 한 개만 있어도 숫자(-1)를 붙입니다.</li>
                            <li>아래의 접두사를 사용하여 이미지를 생성합니다.</li>
                        </ul>

                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table">
                                <caption><span className="hide">이미지별 접두사 작명법</span></caption>
                                <colgroup>
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "75%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">이름</th>
                                        <th className="guide-th" scope="col">작명법</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td">아이콘</td>
                                        <td className="guide-td">
                                            <div className="naming-breakdown">
                                                <div className="naming-file">ico-checkbox-active.png</div>
                                                <div className="naming-marks">
                                                    <div className="mark-box">접두사(ico)</div>
                                                    <div className="mark-box highlight">대상요소(checkbox)</div>
                                                    <div className="mark-box">구분값(active)</div>
                                                    <div className="mark-box">확장자(.png)</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td">특정 페이지 아이콘</td>
                                        <td className="guide-td">
                                            <div className="naming-breakdown">
                                                <div className="naming-file">ico-BU-001-1.png</div>
                                                <div className="naming-marks">
                                                    <div className="mark-box">접두사(ico)</div>
                                                    <div className="mark-box highlight">화면ID(HA-01...)</div>
                                                    <div className="mark-box">숫자(1)</div>
                                                    <div className="mark-box">확장자(.png)</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td">특정 페이지 비주얼 이미지</td>
                                        <td className="guide-td">
                                            <div className="naming-breakdown">
                                                <div className="naming-file">img-BU-001-1.png</div>
                                                <div className="naming-marks">
                                                    <div className="mark-box">접두사(img)</div>
                                                    <div className="mark-box highlight">화면ID(HA-01...)</div>
                                                    <div className="mark-box">숫자(1)</div>
                                                    <div className="mark-box">확장자(.png)</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td">특정 페이지 배너</td>
                                        <td className="guide-td">
                                            <div className="naming-breakdown">
                                                <div className="naming-file">bn-BU-001-1.png</div>
                                                <div className="naming-marks">
                                                    <div className="mark-box">접두사(bn)</div>
                                                    <div className="mark-box highlight">화면ID(HA-01...)</div>
                                                    <div className="mark-box">숫자(1)</div>
                                                    <div className="mark-box">확장자(.png)</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <h3 className="guide-h3 mt-10">저장 폴더</h3>
                        <div className="guide-table-wrap">
                            <table className="guide-table">
                                <caption><span className="hide">저장폴더 경로 안내</span></caption>
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "30%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">경로1</th>
                                        <th className="guide-th" scope="col">경로2</th>
                                        <th className="guide-th" scope="col">경로3</th>
                                        <th className="guide-th" scope="col">종류</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td" rowSpan={3}><code>assets</code></td>
                                        <td className="guide-td" rowSpan={3}><code>img</code></td>
                                        <td className="guide-td"><code>general</code></td>
                                        <td className="guide-td">비주얼 및 일반 이미지</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>ico</code></td>
                                        <td className="guide-td">아이콘 이미지</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>temp</code></td>
                                        <td className="guide-td">임시 이미지</td>
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