import { useState } from "react";
import { Dropdown, Modal, Button } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

const SAMPLE_OPTIONS = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
];

export default function DropdownGuide() {
    const [selectedValue, setSelectedValue] = useState("");
    const [errorValue, setErrorValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDropdownValue, setModalDropdownValue] = useState("");

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Dropdown</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        Dropdown은 사용자에게 선택 가능한 목록을 제공하고, 그 중 하나를 선택하게 하는 커스텀 UI 컴포넌트입니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Basic Usage</h3>
                        <p className="guide-desc">
                            <code>options</code> 배열 속성을 통해 목록을 렌더링합니다. 값이 선택되지 않았을 때는 <code>placeholder</code>가 연한 회색 텍스트로 노출됩니다.
                        </p>

                        <div className="comp-preview">
                            <Dropdown
                                options={SAMPLE_OPTIONS}
                                value={selectedValue}
                                onChange={(val) => setSelectedValue(val)}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`import { useState } from "react";

const SAMPLE_OPTIONS = [
    { label: "내용을 입력하세요. 1", value: "1" },
    { label: "내용을 입력하세요. 2", value: "2" },
    { label: "내용을 입력하세요. 3", value: "3" },
];

const [value, setValue] = useState("");

<Dropdown 
    options={SAMPLE_OPTIONS}
    value={value} 
    onChange={(val) => setValue(val)}
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Label</h3>
                        <p className="guide-desc">
                            <code>label</code> prop을 사용하여 드롭다운에 폼 라벨을 추가할 수 있습니다.<br />
                            기본값인 <code>layout="vertical"</code>은 라벨이 상단에 위치하며, <code>layout="horizontal"</code>을 설정하면 라벨과 드롭다운이 가로로 나란히 배치됩니다.
                        </p>

                        <div className="comp-preview" style={{ alignItems: "flex-end" }}>
                            <Dropdown
                                label="상태 분류"
                                options={SAMPLE_OPTIONS}
                                value={selectedValue}
                                onChange={(val) => setSelectedValue(val)}
                            />
                            <Dropdown
                                layout="horizontal"
                                label="상태 분류"
                                options={SAMPLE_OPTIONS}
                                value={selectedValue}
                                onChange={(val) => setSelectedValue(val)}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown label="상태 분류" options={options} />
<Dropdown layout="horizontal" label="상태 분류" options={options} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size</h3>
                        <p className="guide-desc">
                            드롭다운의 높이와 폰트 크기는 <code>-lg</code>(기본값), <code>-md</code> 두 가지로 제공됩니다.
                        </p>

                        <div className="comp-preview align-center">
                            <Dropdown
                                size="lg"
                                placeholder="Large 사이즈 (기본값)"
                                options={SAMPLE_OPTIONS}
                            />
                            <Dropdown
                                size="md"
                                placeholder="Medium 사이즈"
                                options={SAMPLE_OPTIONS}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown size="lg" placeholder="Large 사이즈" options={options} />
<Dropdown size="md" placeholder="Medium 사이즈" options={options} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Text</h3>
                        <p className="guide-desc">
                            <code>variant="text"</code>를 사용하면 테두리와 배경이 없는 텍스트형 드롭다운을 만들 수 있습니다.<br />
                            또한 <code>layout="horizontal"</code>을 적용하면 라벨과 드롭다운이 좌우로 나란히 배치되어, 데이터 그리드 상단의 유틸리티 영역(목록 개수 선택 등)에 유용하게 사용할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <Dropdown
                                layout="horizontal"
                                variant="text"
                                label="목록 표시 개수"
                                options={[
                                    { label: "10개", value: "10" },
                                    { label: "20개", value: "20" },
                                    { label: "50개", value: "50" }
                                ]}
                                value="10"
                                onChange={() => { }}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown 
    layout="horizontal" 
    variant="text" 
    label="목록 표시 개수" 
    options={[{ label: "10개", value: "10" }, { label: "20개", value: "20" }, { label: "50개", value: "50" }]} 
    value="10" 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Width</h3>
                        <p className="guide-desc">
                            <code>width</code> prop을 사용해 너비를 직접 지정(숫자/문자열)하거나, <code>fullWidth</code> prop으로 부모 너비의 100%를 꽉 채울 수 있습니다.
                        </p>

                        <div className="comp-preview is-column">
                            <Dropdown width={200} placeholder="width={200}" options={SAMPLE_OPTIONS} />
                            <Dropdown width="50%" placeholder="width='50%'" options={SAMPLE_OPTIONS} />
                            <Dropdown fullWidth placeholder="fullWidth={true}" options={SAMPLE_OPTIONS} />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown width={200} placeholder="200px 넓이" options={options} />
<Dropdown width="50%" placeholder="50% 넓이" options={options} />
<Dropdown fullWidth placeholder="100% 넓이" options={options} />`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Validation</h3>
                        <p className="guide-desc">
                            유효성 검사 실패 시 <code>isError</code> prop을 <code>true</code>로 설정하면 테두리가 붉은색으로 변경됩니다.
                            <code>errorMsg</code>를 함께 전달하면 드롭다운 하단에 경고 메시지가 표시됩니다.
                        </p>

                        <div className="comp-preview">
                            <Dropdown
                                options={SAMPLE_OPTIONS}
                                value={errorValue}
                                onChange={(val) => setErrorValue(val)}
                                isError={true}
                                errorMsg="필수 입력 항목입니다."
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown 
    isError={true} 
    errorMsg="필수 입력 항목입니다." 
    options={options} 
/>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Menu Portal</h3>
                        <p className="guide-desc">
                            <code>menuPortal</code> prop을 <code>true</code>로 설정하면 드롭다운 메뉴가 부모 DOM 트리에 렌더링되지 않고 <code>document.body</code>에 Portal로 마운트됩니다.<br />
                            <code>overflow: hidden</code>이나 <code>overflow: auto</code>가 적용된 컨테이너(예: 모달, 테이블, 스크롤 패널) 내부에서 메뉴가 잘리는 문제를 해결할 때 사용합니다.<br />
                            메뉴 위치는 트리거 요소의 <code>getBoundingClientRect()</code>를 기준으로 <code>position: fixed</code>로 계산되며, 스크롤 발생 시 메뉴가 자동으로 닫힙니다.
                        </p>

                        <div className="comp-preview" style={{ overflow: "hidden", border: "1px dashed #ccc", padding: "16px", height: "80px" }}>
                            <Dropdown
                                menuPortal
                                placeholder="overflow:hidden 컨테이너 내부"
                                options={SAMPLE_OPTIONS}
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown menuPortal options={options} />`} />

                        <p className="guide-desc mt-20">
                            특히 <strong>Modal 내부에 Dropdown을 사용할 때는 반드시 <code>menuPortal</code>을 적용해야 합니다.</strong><br />
                            Modal은 내부적으로 <code>overflow: hidden</code> 처리가 되어 있어, <code>menuPortal</code> 없이 사용하면 메뉴가 Modal 영역 밖으로 펼쳐지지 못하고 잘리거나 보이지 않습니다.
                        </p>

                        <div className="comp-preview">
                            <Button variant="outlined" onClick={() => setIsModalOpen(true)}>모달 열기 (menuPortal 예시)</Button>
                        </div>

                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="sm">
                            <Modal.Header title="Modal 내부 Dropdown" onClose={() => setIsModalOpen(false)} />
                            <Modal.Body>
                                <p style={{ marginBottom: "12px", fontSize: "13px", color: "#555" }}>
                                    Modal 내부의 Dropdown에는 반드시 <code>menuPortal</code>을 사용하세요.
                                </p>
                                <Dropdown
                                    menuPortal
                                    label="항목 선택"
                                    options={SAMPLE_OPTIONS}
                                    value={modalDropdownValue}
                                    onChange={(val) => setModalDropdownValue(val)}
                                    fullWidth
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>취소</Button>
                                <Button variant="solid" color="primary" onClick={() => setIsModalOpen(false)}>확인</Button>
                            </Modal.Footer>
                        </Modal>

                        <CodeBlock isComponent={true} code={`const [isOpen, setIsOpen] = useState(false);
const [value, setValue] = useState("");

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
    <Modal.Header title="Modal 내부 Dropdown" onClose={() => setIsOpen(false)} />
    <Modal.Body>
        {/* Modal 내부에서는 반드시 menuPortal 사용 */}
        <Dropdown
            menuPortal
            options={options}
            value={value}
            onChange={(val) => setValue(val)}
            fullWidth
        />
    </Modal.Body>
    <Modal.Footer>
        <Button variant="outlined" onClick={() => setIsOpen(false)}>취소</Button>
        <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>확인</Button>
    </Modal.Footer>
</Modal>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Disabled</h3>
                        <p className="guide-desc">
                            <code>disabled</code> 속성을 추가하면 사용자 상호작용(클릭, 포커스)이 차단되고 배경이 시각적으로 비활성화 처리됩니다.
                        </p>

                        <div className="comp-preview">
                            <Dropdown
                                placeholder="선택할 수 없습니다"
                                options={SAMPLE_OPTIONS}
                                disabled
                            />
                            <Dropdown
                                value="1"
                                options={SAMPLE_OPTIONS}
                                disabled
                            />
                        </div>

                        <CodeBlock isComponent={true} code={`<Dropdown placeholder="선택할 수 없습니다" options={options} disabled />
<Dropdown value="1" options={options} disabled />`} />
                    </article>



                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Dropdown 컴포넌트에서 사용할 수 있는 전용 속성들입니다.</p>
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
                                        <td className="guide-td"><code>label</code></td>
                                        <td className="guide-td"><code>string | ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">드롭다운 상단(또는 좌측)에 표시될 폼 라벨입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>options</code></td>
                                        <td className="guide-td"><code>DropdownOption[]</code></td>
                                        <td className="guide-td"><code>[]</code></td>
                                        <td className="guide-td">
                                            <strong>[필수]</strong> 드롭다운에 표시될 항목들의 배열입니다.<br />
                                            <code>{`{ label: string, value: string }`}</code> 형태여야 합니다.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>value</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">현재 선택된 옵션의 <code>value</code> 값입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>onChange</code></td>
                                        <td className="guide-td"><code>(value: string) =&gt; void</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">사용자가 항목을 클릭하여 선택했을 때 호출되는 콜백 함수입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>variant</code></td>
                                        <td className="guide-td"><code>"default" | "text"</code></td>
                                        <td className="guide-td"><code>"default"</code></td>
                                        <td className="guide-td">드롭다운의 디자인 형태를 결정합니다. <code>"text"</code> 적용 시 배경과 보더가 없는 형태로 렌더링됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"vertical"</code></td>
                                        <td className="guide-td">라벨과 인풋창의 배치 방향을 결정합니다. <code>"horizontal"</code> 적용 시 라벨이 왼쪽에 나란히 배치됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>placeholder</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>"선택해 주세요."</code></td>
                                        <td className="guide-td">선택된 값이 없을 때 기본으로 표시될 안내 문구입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"lg" | "md"</code></td>
                                        <td className="guide-td"><code>"lg"</code></td>
                                        <td className="guide-td">드롭다운 박스의 크기(높이 및 폰트 사이즈)를 지정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>width</code></td>
                                        <td className="guide-td"><code>number | string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">가로 너비를 지정합니다. 숫자 입력 시 px 단위가 적용됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>fullWidth</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정하면 너비가 부모의 100%로 고정됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>isError</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td"><code>true</code>로 설정 시 테두리가 에러 색상으로 변경됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>errorMsg</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">에러 상태일 때 하단에 표시할 경고 메시지입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>disabled</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">컴포넌트를 비활성화합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>className</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">클릭 가능한 내부 트리거 영역(Field)에 커스텀 클래스를 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>wrapperClassName</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td"><code>""</code></td>
                                        <td className="guide-td">테두리를 포함하는 외부 래퍼 영역(Wrap)에 커스텀 클래스를 추가합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>menuPortal</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">
                                            <code>true</code>로 설정하면 드롭다운 메뉴를 부모 트리가 아닌 <code>document.body</code>에 Portal로 렌더링합니다.<br />
                                            <code>overflow: hidden</code> 또는 <code>overflow: auto</code>가 적용된 컨테이너(모달, 테이블, 스크롤 패널 등) 내부에서 메뉴가 잘리는 현상을 방지할 때 사용합니다.
                                        </td>
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