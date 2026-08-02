import { Icon, List, Typography } from "@/publishing/components";
import CodeBlock from "../../layout/CodeBlock";

export default function ListGuide() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">List</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        <code>List</code> 컴포넌트는 정보를 나열할 때 사용합니다.<br />
                        <code>&lt;List.Item&gt;</code> 단일 컴포넌트를 사용하며, <strong><code>label</code> prop의 유무</strong>에 따라 자동으로 Description List(기본형) 또는 Bullet List(일반 리스트) 형태로 렌더링됩니다.
                    </p>

                    <article className="comp-article">
                        <h3 className="guide-h3">Bullet List</h3>
                        <p className="guide-desc">
                            <code>&lt;List as="ul"&gt;</code> 속성을 부여하고 하위 <code>&lt;List.Item&gt;</code>에 <code>label</code>을 생략하면 일반 불릿 리스트(li)로 구성됩니다.<br />
                            시맨틱 마크업을 유지하면서 항목 간 일관된 간격과 다중 줄바꿈 시 깔끔한 들여쓰기를 제공합니다.
                        </p>

                        <div className="comp-preview">
                            <List as="ul" size="sm">
                                <List.Item>휴양시설은 KSS 해운 임직원은 누구나 이용가능합니다.</List.Item>
                                <List.Item>임직원의 배우자, 직계존비속, 배우자의 부모에 한하여 임직원의 동행 없이도 이용가능</List.Item>
                                <List.Item>휴양시설은 최대 2박 3일을 원칙으로 신청해주세요.</List.Item>
                                <List.Item>신청 확정된 경우에만 달력현황에 표기됩니다.</List.Item>
                                <List.Item>신청 결과는 마이페이지에서 확인 가능합니다.</List.Item>
                            </List>
                        </div>

                        <CodeBlock isComponent={true} code={`<List as="ul" size="sm">
    <List.Item>휴양시설은 KSS 해운 임직원은 누구나 이용가능합니다.</List.Item>
    <List.Item>임직원의 배우자, 직계존비속, 배우자의 부모에 한하여 임직원의 동행 없이도 이용가능</List.Item>
    <List.Item>휴양시설은 최대 2박 3일을 원칙으로 신청해주세요.</List.Item>
    <List.Item>신청 확정된 경우에만 달력현황에 표기됩니다.</List.Item>
    <List.Item>신청 결과는 마이페이지에서 확인 가능합니다.</List.Item>
</List>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Description List</h3>
                        <p className="guide-desc">
                            <code>label</code>과 라벨의 넓이(<code>labelWidth</code>)를 지정하여 설명 목록을 구성합니다. 기본적으로 라벨과 설명 사이에 점선 구분선이 표시됩니다.
                        </p>

                        <div className="comp-preview">
                            <List gap={4}>
                                <List.Item label="근무 형태" labelWidth={80} labelColor="#A2A2A2" columnGap={20}>정규</List.Item>
                                <List.Item label="재직 상태" labelWidth={80} labelColor="#A2A2A2" columnGap={20}>휴직</List.Item>
                                <List.Item label="입사일" labelWidth={80} labelColor="#A2A2A2" columnGap={20}>2015-01-05</List.Item>
                            </List>
                        </div>

                        <CodeBlock isComponent={true} code={`<List gap={4}>
    <List.Item label="근무 형태" labelWidth={80} labelColor="#A2A2A2" columnGap={20}>정규</List.Item>
    <List.Item label="재직 상태" labelWidth={80} labelColor="#A2A2A2" columnGap={20}>휴직</List.Item>
    <List.Item label="입사일" labelWidth={80} labelColor="#A2A2A2" columnGap={20}>2015-01-05</List.Item>
</List>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">With Icon</h3>
                        <p className="guide-desc">
                            <code>icon</code> prop을 사용하여 라벨 또는 항목 좌측에 아이콘을 추가할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <List layout="horizontal" gap={24}>
                                <List.Item
                                    icon={<Icon name="call" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
                                    label="초기 비상연락처"
                                    columnGap={11}
                                >
                                    <Typography variant="heading-xs" primary>+82 505 - 224 - 2244</Typography>
                                </List.Item>
                                <List.Item
                                    icon={<Icon name="siren" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
                                    label="비상대응실"
                                    columnGap={11}
                                >
                                    <Typography variant="heading-xs" primary>+ 82 51 - 600  -2942, 2943</Typography>
                                </List.Item>
                            </List>
                        </div>

                        <CodeBlock isComponent={true} code={`<List layout="horizontal">
    <List.Item
        icon={<Icon name="call" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
        label="초기 비상연락처"
        columnGap={11}
    >
        <Typography variant="heading-xs" primary>+82 505 - 224 - 2244</Typography>
    </List.Item>
</List>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">With Bullet & Sub-text</h3>
                        <p className="guide-desc">
                            <code>bullet</code> prop을 활성화하면 라벨 앞에 불릿(•)이 추가됩니다. 특정 항목에 구분선이 필요 없다면 <code>showDivider=&#123;false&#125;</code>를 지정합니다.
                        </p>

                        <div className="comp-preview">
                            <List gap={8}>
                                <List.Item bullet label="대표" labelColor="#666" columnGap={8}>
                                    02-3702-2700 <Typography variant="body-lg" as="span" tertiary>(DIR : 02-3702-2내선번호)</Typography>
                                </List.Item>
                                <List.Item bullet label="팩스" labelColor="#666" columnGap={8}>
                                    02-733-4103
                                </List.Item>
                                <List.Item bullet label="텔렉스" labelColor="#666" columnGap={8}>
                                    ksstelex@kssline.com
                                </List.Item>
                                <List.Item bullet label="E-mail(KSS)" labelColor="#666" columnGap={8}>
                                    개인ID@kssline.com <Typography variant="body-lg" as="span" tertiary>(예.사장 cdpark@kssline.com)</Typography>
                                </List.Item>
                                <List.Item bullet label="안내" labelColor="#666" showDivider={false}>
                                    공휴일 등의 경우 총괄 대표전화를 이용할 것
                                </List.Item>
                            </List>
                        </div>

                        <CodeBlock isComponent={true} code={`<List gap={8}>
    <List.Item bullet label="대표" labelColor="#666" columnGap={8}>
        02-3702-2700 <Typography variant="body-lg" as="span" tertiary>(DIR : 02-3702-2내선번호)</Typography>
    </List.Item>
    <List.Item bullet label="팩스" labelColor="#666" columnGap={8}>
        02-733-4103
    </List.Item>
    <List.Item bullet label="텔렉스" labelColor="#666" columnGap={8}>
        ksstelex@kssline.com
    </List.Item>
    <List.Item bullet label="E-mail(KSS)" labelColor="#666" columnGap={8}>
        개인ID@kssline.com <Typography variant="body-lg" as="span" tertiary>(예.사장 cdpark@kssline.com)</Typography>
    </List.Item>
    <List.Item bullet label="안내" labelColor="#666" showDivider={false}>
        공휴일 등의 경우 총괄 대표전화를 이용할 것
    </List.Item>
</List>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Size Variation</h3>
                        <p className="guide-desc">
                            <code>size</code> prop을 사용하여 리스트 폰트 사이즈를 제어합니다. 기본값은 <code>md</code>(16px)이며, <code>sm</code>(14px)을 지정할 수 있습니다.
                        </p>

                        <div className="comp-preview">
                            <List as="ul" size="sm" gap={4}>
                                <List.Item>폰트 사이즈 14px (sm) 적용 예시입니다.</List.Item>
                                <List.Item>공간이 좁은 사이드바나 부가 설명 영역에 활용하기 좋습니다.</List.Item>
                            </List>
                        </div>

                        <CodeBlock isComponent={true} code={`<List as="ul" size="sm" gap={4}>
    <List.Item>폰트 사이즈 14px (sm) 적용 예시입니다.</List.Item>
    <List.Item>공간이 좁은 사이드바나 부가 설명 영역에 활용하기 좋습니다.</List.Item>
</List>`} />
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>

                        <h4 className="guide-h4 mt-6">List Props</h4>
                        <div className="guide-table-wrap mt-4">
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
                                        <td className="guide-td"><code>as</code></td>
                                        <td className="guide-td"><code>ElementType</code></td>
                                        <td className="guide-td"><code>"dl"</code></td>
                                        <td className="guide-td">렌더링할 부모 태그를 변경합니다. (일반 불릿 리스트의 경우 <code>"ul"</code> 또는 <code>"ol"</code> 사용)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>layout</code></td>
                                        <td className="guide-td"><code>"vertical" | "horizontal"</code></td>
                                        <td className="guide-td"><code>"vertical"</code></td>
                                        <td className="guide-td">리스트의 배치 방향을 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>"md" | "sm"</code></td>
                                        <td className="guide-td"><code>"md"</code></td>
                                        <td className="guide-td">리스트 전체의 폰트 사이즈를 결정합니다. (md: 16px, sm: 14px)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>gap</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">리스트 항목간의 간격을 설정합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="guide-h4 mt-10">List.Item Props</h4>
                        <div className="guide-table-wrap mt-4">
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
                                        <td className="guide-td"><code>as</code></td>
                                        <td className="guide-td"><code>ElementType</code></td>
                                        <td className="guide-td"><code>"div" | "li"</code></td>
                                        <td className="guide-td">렌더링할 태그를 변경합니다. (기본적으로 label 유무에 따라 자동 지정됩니다)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>label</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">항목의 제목(dt) 역할을 하는 텍스트입니다. <strong>생략 시 자동으로 Bullet List 형태로 렌더링됩니다.</strong></td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>children</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td"><strong>(필수)</strong> 리스트 항목의 내용(설명)에 표시될 텍스트 또는 컴포넌트입니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>labelWidth</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td"><code>"auto"</code></td>
                                        <td className="guide-td">라벨(dt) 영역의 넓이를 고정합니다. (예: <code>"120px"</code>, <code>100</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>labelColor</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">라벨 텍스트의 색상을 지정합니다. (예: <code>"#A2A2A2"</code>)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>columnGap</code></td>
                                        <td className="guide-td"><code>string | number</code></td>
                                        <td className="guide-td"><code>8</code> (desc) <br /> <code>8</code> (bullet)</td>
                                        <td className="guide-td">라벨, 구분선, 설명 사이의 수평 간격을 설정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>icon</code></td>
                                        <td className="guide-td"><code>ReactNode</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">좌측에 표시할 아이콘 요소를 전달합니다. (Bullet 리스트의 경우 기본 점 기호를 대체합니다)</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>bullet</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>false</code></td>
                                        <td className="guide-td">(Description List 전용) 라벨 앞에 불릿(•) 기호를 표시할지 여부를 결정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>showDivider</code></td>
                                        <td className="guide-td"><code>boolean</code></td>
                                        <td className="guide-td"><code>true</code></td>
                                        <td className="guide-td">(Description List 전용) 라벨과 설명 사이의 점선 구분선 표시 여부를 결정합니다.</td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>alignItems</code></td>
                                        <td className="guide-td"><code>"center" | "flex-start" | ...</code></td>
                                        <td className="guide-td">-</td>
                                        <td className="guide-td">항목 내부 영역의 수직 정렬 방식을 강제로 지정합니다. (기본적으로 Desc는 center, Bullet은 flex-start로 동작합니다)</td>
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