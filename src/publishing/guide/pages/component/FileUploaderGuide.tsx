import { FileUploader } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function FileUploaderGuide() {

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">File Uploader</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        파일을 선택하여 목록으로 관리하고 업로드할 수 있는 공통 파일 업로더 컴포넌트입니다.
                        <code>ref</code>를 통해 부모에서 <code>deleteAllFiles</code> 등의 메서드를 직접 제어할 수 있습니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <p className="guide-desc">
                            파일 선택 후 목록에 추가되며, 체크박스로 선택한 파일을 삭제하거나 전체 파일을 업로드할 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <FileUploader />
                        </div>

                        <CodeBlock isComponent={true} code={`<FileUploader />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">onUpload 콜백</h3>
                        <p className="guide-desc">
                            업로드 버튼 클릭 시 <code>onUpload</code> 콜백이 현재 파일 목록과 함께 호출됩니다.
                        </p>

                        <CodeBlock isComponent={true} code={`<FileUploader
    onUpload={(files) => {
        // files: File[]
        console.log(files);
    }}
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">파일 타입 제한</h3>
                        <p className="guide-desc">
                            <code>accept</code> prop으로 선택 가능한 파일 타입을 제한할 수 있습니다.
                            <code>multiple={false}</code>로 단일 파일만 허용할 수도 있습니다.
                        </p>

                        <CodeBlock isComponent={true} code={`// 이미지만 허용
<FileUploader accept="image/*" />

// PDF, Word만 허용
<FileUploader accept=".pdf,.doc,.docx" />

// 단일 파일
<FileUploader multiple={false} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <div className="guide-table-wrap mt-10">
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
                                        <td className="guide-td"><code>accept</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">허용할 파일 타입. input의 <code>accept</code> 속성과 동일한 형식을 사용합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>multiple</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>true</code></td>
                                        <td className="guide-td">다중 파일 선택 허용 여부입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onUpload</code></td>
                                        <td className="guide-td"><code>(files: File[]) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">업로드 버튼 클릭 시 호출됩니다. 현재 파일 목록을 인자로 전달합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">추가 커스텀 클래스를 전달할 수 있습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">FileUploaderHandle</h3>
                        <p className="guide-desc">
                            <code>ref</code>를 통해 노출되는 메서드입니다.
                        </p>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "3%" }} />
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "*" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Method</th>
                                        <th className="guide-th" scope="col">Signature</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>deleteAllFiles</code></td>
                                        <td className="guide-td"><code>() =&gt; void</code></td>
                                        <td className="guide-td">업로더에 추가된 모든 파일을 삭제합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>getFiles</code></td>
                                        <td className="guide-td"><code>() =&gt; File[]</code></td>
                                        <td className="guide-td">현재 업로더에 추가된 파일 목록을 반환합니다.</td>
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