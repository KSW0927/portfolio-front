import { useState } from "react";
import { Switch } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function SwitchGuide() {
    const [isEmailAlertOn, setIsEmailAlertOn] = useState(false);

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Switch</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Switch는 설정, 알림 켜기/끄기 등 사용자가 옵션을 즉각적으로 활성화하거나 비활성화할 때 사용하는 토글 컴포넌트입니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <p className="guide-desc">
                            기본적인 스위치 형태입니다. 라벨을 클릭해도 스위치가 토글되며,
                            <code>defaultChecked</code>를 사용하여 비제어(Uncontrolled) 컴포넌트로 쓰거나,
                            <code>checked</code>와 <code>onChange</code>를 조합하여 제어(Controlled) 컴포넌트로 사용할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Switch defaultChecked>Uncontrolled (기본 On)</Switch>

                            <div style={{ marginTop: "1.6rem" }}>
                                <Switch
                                    checked={isEmailAlertOn}
                                    onChange={(e) => setIsEmailAlertOn(e.target.checked)}
                                >
                                    이메일 알림 받기 (Controlled) - 상태: {isEmailAlertOn ? "On" : "Off"}
                                </Switch>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`// 비제어 방식
<Switch defaultChecked>Uncontrolled</Switch>

// 제어 방식
const [isOn, setIsOn] = useState(false);
<Switch checked={isOn} onChange={(e) => setIsOn(e.target.checked)}>
    알림 받기
</Switch>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label Placement</h3>
                        <p className="guide-desc">
                            <code>labelPlacement</code> 속성을 사용하여 라벨을 스위치의 왼쪽(<code>left</code>) 또는 오른쪽(<code>right</code>)에 배치할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Switch labelPlacement="left">Label on Left</Switch>
                            <Switch labelPlacement="right">Label on Right (Default)</Switch>
                        </div>

                        <CodeBlock isComponent={true} code={`<Switch labelPlacement="left">Label on Left</Switch>
<Switch labelPlacement="right">Label on Right</Switch>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <p className="guide-desc">
                            <code>disabled</code> 속성을 추가하여 사용자와의 상호작용을 차단할 수 있습니다.
                            이때 시각적으로 불투명도가 낮아지며 마우스 커서가 변경됩니다.
                        </p>

                        <div className="comp-preview align-center" style={{ gap: "2.4rem" }}>
                            <Switch disabled>Disabled Off</Switch>
                            <Switch disabled defaultChecked>Disabled On</Switch>
                        </div>

                        <CodeBlock isComponent={true} code={`<Switch disabled>Disabled Off</Switch>
<Switch disabled defaultChecked>Disabled On</Switch>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">
                            Switch 컴포넌트는 표준 HTML <code>&lt;input type="checkbox"&gt;</code>의 모든 속성을 상속받으며, 추가로 아래의 속성을 지원합니다.
                        </p>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "45%" }} />
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
                                        <td className="guide-td"><code>checked</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">스위치의 현재 활성화(On) 상태입니다. (제어 컴포넌트용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>defaultChecked</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">초기 활성화 상태를 지정합니다. (비제어 컴포넌트용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(e: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">상태가 변경될 때 호출되는 콜백 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">스위치 우측 또는 좌측에 표시될 텍스트 및 요소를 입력합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 상호작용이 불가능해집니다.</td>
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