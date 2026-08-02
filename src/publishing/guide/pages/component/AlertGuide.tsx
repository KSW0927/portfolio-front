import { AlertService } from "@/utils/AlertService";
import { Button } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function AlertGuide() {

    const handleAlert = () => AlertService.alert("기본 확인 팝업", "팝업이 생성되었습니다.", "info");
    const handleSuccess = () => AlertService.success("저장 동작을 완료하였습니다.");
    const handleError = () => AlertService.error("처리 중 오류 발생!");
    const handleWarning = () => AlertService.warning("경고 발생!");

    const handleConfirm = async () => {
        const isOk = await AlertService.confirm("정보 삭제", "해당 정보를 정말 삭제하시겠습니까?");
        if (isOk) {
            AlertService.success("삭제되었습니다.");
        }
    };

    const handlePrompt = async () => {
        const name = await AlertService.prompt("이름 확인", "이름을 입력하세요.");
        if (name) {
            AlertService.success(`입력하신 이름은 "${name}" 입니다.`);
        } else {
            AlertService.warning("입력된 값이 없습니다.");
        }
    };

    const handleToast = () => AlertService.toast("새로운 알람이 발생했습니다.");

    const handleLoading = () => {
        AlertService.loading("데이터를 처리 중입니다...");
        setTimeout(() => {
            AlertService.close();
            AlertService.toast("처리가 완료되었습니다.");
        }, 2000);
    };

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Alert (시스템 팝업)</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        <code>AlertService</code>는 SweetAlert2를 기반으로 만들어진 전역 알림 유틸리티입니다.<br />
                        함수 호출만으로 화면 중앙이나 우측 상단에 직관적인 메시지를 띄울 수 있습니다.<br />
                        (※ 복잡한 폼이나 그리드가 들어가는 사용자 정의 팝업은 별도의 <code>Modal</code> 컴포넌트를 사용해 주세요.)
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">기본 시스템 팝업 (Alert / Success / Warning / Error)</h3>
                        <p className="guide-desc">작업의 성공, 실패, 경고 등을 알리는 가장 기본적인 팝업입니다.</p>

                        <div className="comp-preview">
                            <Button onClick={handleAlert} variant="outlined">기본 알림</Button>
                            <Button onClick={handleSuccess} color="green">성공 (Success)</Button>
                            <Button onClick={handleWarning} variant="outlined">경고 (Warning)</Button>
                            <Button onClick={handleError} variant="outlined">오류 (Error)</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`// AlertService.ts import 필요
import { AlertService } from "@/utils/AlertService";

AlertService.alert("기본 확인 팝업", "팝업이 생성되었습니다.", "info");
AlertService.success("저장 동작을 완료하였습니다.");
AlertService.warning("경고 발생!");
AlertService.error("처리 중 오류 발생!");`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">확인 및 입력 팝업 (Confirm / Prompt)</h3>
                        <p className="guide-desc">
                            사용자의 명시적인 확인이나 텍스트 입력을 받을 때 사용합니다. <code>async/await</code>를 사용하여 사용자의 응답을 기다린 후 다음 로직을 처리합니다.
                        </p>

                        <div className="comp-preview">
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Button onClick={handleConfirm} variant="outlined">Confirm (확인/취소)</Button>
                                <Button onClick={handlePrompt} variant="outlined">Prompt (텍스트 입력)</Button>
                            </div>
                        </div>

                        <CodeBlock isComponent={true} code={`// Confirm (Boolean 반환)
const isOk = await AlertService.confirm("정보 삭제", "해당 정보를 정말 삭제하시겠습니까?");
if (isOk) {
    // 확인 버튼 클릭 시 실행할 로직
    AlertService.success("삭제되었습니다.");
}

// Prompt (String 또는 null 반환)
const name = await AlertService.prompt("이름 확인", "이름을 입력하세요.");
if (name) {
    // 값이 입력되었을 때 실행할 로직
}`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">토스트 팝업 (Toast)</h3>
                        <p className="guide-desc">
                            화면 우측 상단에 잠시 나타났다가 사라지는 비침투적 알림입니다. 작업 흐름을 방해하지 않고 상태를 알릴 때 유용합니다.
                        </p>

                        <div className="comp-preview">
                            <Button onClick={handleToast} variant="outlined">토스트 띄우기</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`AlertService.toast("새로운 알람이 발생했습니다.");`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">로딩 팝업 (Loading)</h3>
                        <p className="guide-desc">
                            API 통신이나 무거운 데이터 처리가 진행 중일 때, 사용자의 다른 조작을 막고 대기를 유도하기 위해 사용합니다. 작업이 끝나면 <code>AlertService.close()</code>를 호출하여 닫아주어야 합니다.
                        </p>

                        <div className="comp-preview">
                            <Button onClick={handleLoading} variant="solid">로딩 팝업 띄우기 (2초 대기)</Button>
                        </div>

                        <CodeBlock isComponent={true} code={`// 로딩 팝업 띄우기
AlertService.loading("데이터를 처리 중입니다...");

try {
    // 비동기 데이터 처리 (예: API 호출)
    await fetchSomeData();
} finally {
    // 작업 완료 후 무조건 닫기
    AlertService.close();
}`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">API Reference</h3>
                        <p className="guide-desc">각 메서드 호출 시 전달할 수 있는 인자(Arguments) 목록입니다.</p>

                        <h4 className="guide-h4 mt-20">기본 알림 (success, error, warning)</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "17%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Parameter</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>message</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 팝업 본문에 표시될 주 내용입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>title</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>"Success" | "Error" | ...</code></td>
                                        <td className="guide-td">팝업 상단에 표시될 제목입니다. 생략 시 타입에 맞는 기본 영문 제목이 들어갑니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">인터랙션 알림 (confirm)</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "17%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Parameter</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>title</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 팝업 상단에 표시될 제목입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>text</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">본문에 표시될 상세 내용(또는 HTML 문자열)입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><strong>Return</strong></td>
                                        <td className="guide-td"><code>Promise&lt;boolean&gt;</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">확인 버튼 클릭 시 <code>true</code>, 취소/닫기 시 <code>false</code>를 반환합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-20">입력 팝업 (prompt)</h4>
                        <div className="guide-table-wrap">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "17%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Parameter</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>title</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 팝업 상단에 표시될 질문/제목입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>placeholder</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">입력 필드(Input)의 플레이스홀더 텍스트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><strong>Return</strong></td>
                                        <td className="guide-td"><code>Promise&lt;string | null&gt;</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">입력 후 확인 클릭 시 입력된 <strong>문자열</strong>을, 취소 시 <code>null</code>을 반환합니다.</td>
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