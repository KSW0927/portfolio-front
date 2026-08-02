import { Button, Badge, Input, Dropdown, DatePicker, Switch, SearchBox, Icon, Box, Checkbox, Collapse, RadioButton, Table, Textarea, Card, List, Divider, Tab } from "@/publishing/components";
import { Link } from "react-router-dom";

export default function ComponentOverview() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Overview</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <p className="guide-desc">
                        프로젝트에서 사용되는 디자인 시스템의 기초 요소(Foundations)와 주요 UI 컴포넌트들을 한눈에 볼 수 있습니다.
                    </p>

                    <article className="comp-article guide-section">
                        <h3 className="guide-h3 guide-section-title">
                            Foundations
                        </h3>
                        <p className="guide-desc guide-section-desc">
                            UI를 구성하는 가장 기본적인 디자인 토큰 및 그래픽 요소입니다.
                        </p>

                        <div className="foundation-links">
                            <Link to="/publishing-guide/components/color" className="foundation-link">
                                🎨 Color
                            </Link>
                            <Link to="/publishing-guide/components/typo" className="foundation-link">
                                🔠 Typography
                            </Link>
                            <Link to="/publishing-guide/components/icon" className="foundation-link">
                                💠 Icon
                            </Link>
                            <Link to="/publishing-guide/components/layout" className="foundation-link">
                                🛠️ Layout
                            </Link>
                        </div>
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3 guide-section-title">Modules</h3>
                        <p className="guide-desc guide-section-desc">
                            여러 컴포넌트가 결합되어 특정한 기능을 수행하는 복합 UI 요소(Composite)들입니다.
                        </p>

                        <div className="comp-comp-overview-title">
                            <Link to="/publishing-guide/components/alert" className="comp-overview-card">
                                <div className="comp-overview-preview" style={{ gap: 8 }}>
                                    <Button color="green">Success</Button><Button style={{ backgroundColor: "#E32020", borderColor: "#E32020" }}>Error</Button>
                                </div>
                                <div className="comp-overview-title">Alert</div>
                            </Link>

                            <Link to="/publishing-guide/components/calendar" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <div style={{ width: "100%", fontSize: "9px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                                            <span style={{ color: "#aaa" }}>‹</span>
                                            <span style={{ fontWeight: 700, color: "#333", fontSize: "10px" }}>2026. 05</span>
                                            <span style={{ color: "#aaa" }}>›</span>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "2px" }}>
                                            {["월", "화", "수", "목", "금", "토", "일"].map((d, i) => (
                                                <div key={d} style={{ textAlign: "center", fontWeight: 600, color: i === 5 ? "#1C6BFF" : i === 6 ? "#E32020" : "#888", padding: "2px 0" }}>{d}</div>
                                            ))}
                                        </div>
                                        {([[null, null, null, null, 1, 2, 3], [4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31]] as (number | null)[][]).map((week, wi) => (
                                            <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "1px" }}>
                                                {week.map((day, di) => (
                                                    <div key={di} style={{ textAlign: "center", padding: "1px 0", position: "relative" }}>
                                                        <span style={{
                                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                            width: "15px", height: "15px", borderRadius: "50%",
                                                            background: day === 11 ? "#005AAA" : undefined,
                                                            color: day === 11 ? "#fff" : di === 5 ? "#1C6BFF" : di === 6 ? "#E32020" : day ? "#444" : "transparent",
                                                            fontWeight: day === 11 ? 700 : undefined,
                                                        }}>{day ?? ""}</span>
                                                        {(day === 13 || day === 14 || day === 15) && (
                                                            <div style={{ height: "3px", background: "#E9F4FF", borderTop: "1px solid #005AAA", marginTop: "1px", borderRadius: day === 13 ? "2px 0 0 2px" : day === 15 ? "0 2px 2px 0" : undefined }} />
                                                        )}
                                                        {day === 20 && (
                                                            <div style={{ height: "3px", background: "#F8F5FD", borderTop: "1px solid #773ED9", marginTop: "1px", borderRadius: "2px" }} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="comp-overview-title">Calendar</div>
                            </Link>

                            <Link to="/publishing-guide/components/dataGrid" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <div style={{ width: "100%", border: "1px solid #e0e0e0", borderRadius: "4px", overflow: "hidden", fontSize: "9px" }}>
                                        <div style={{ display: "flex", background: "#f5f6f7", borderBottom: "1px solid #d0d0d0", fontWeight: 700, color: "#444" }}>
                                            {["No", "Name", "Dept", "Date"].map((h, i) => (
                                                <div key={h} style={{ padding: "4px 6px", flex: i === 0 ? "0 0 22px" : 1, borderRight: i < 3 ? "1px solid #d0d0d0" : undefined, display: "flex", alignItems: "center", gap: 2 }}>
                                                    {h}<span style={{ color: "#aaa", fontSize: "7px" }}>▲</span>
                                                </div>
                                            ))}
                                        </div>
                                        {[["1", 65, 50, 55], ["2", 80, 40, 70], ["3", 55, 60, 45]].map(([no, w1, w2, w3], i) => (
                                            <div key={i} style={{ display: "flex", borderBottom: "1px solid #eeeeee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                                                <div style={{ padding: "4px 6px", flex: "0 0 22px", borderRight: "1px solid #eeeeee", color: "#999" }}>{no}</div>
                                                {[w1, w2, w3].map((w, j) => (
                                                    <div key={j} style={{ padding: "5px 6px", flex: 1, borderRight: j < 2 ? "1px solid #eeeeee" : undefined }}>
                                                        <div style={{ background: "#e0e4ea", height: "5px", borderRadius: "2px", width: `${w}%` }} />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, padding: "4px 6px", background: "#f5f6f7", borderTop: "1px solid #e0e0e0" }}>
                                            {["‹", "1", "2", "3", "›"].map((p, i) => (
                                                <div key={i} style={{ padding: "1px 5px", borderRadius: "3px", background: i === 1 ? "#1C6BFF" : "#e0e0e0", color: i === 1 ? "#fff" : "#555", fontSize: "8px" }}>{p}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="comp-overview-title">Data Grid(Ag Grid)</div>
                            </Link>

                            <Link to="/publishing-guide/components/datepicker" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <DatePicker
                                        selected={null}
                                        onChange={() => { }}
                                    />
                                </div>
                                <div className="comp-overview-title">Datepicker</div>
                            </Link>

                            <Link to="/publishing-guide/components/fileUploader" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <div style={{ width: "100%", fontSize: "9px", color: "#333", border: "1px solid #e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "3px", padding: "5px 6px", borderBottom: "1px solid #e5e7eb" }}>
                                            {["Del", "File"].map((label) => (
                                                <div key={label} style={{ padding: "2px 5px", border: "1px solid #ccc", borderRadius: "3px", color: "#555", fontSize: "8px" }}>{label}</div>
                                            ))}
                                            <div style={{ padding: "2px 5px", background: "#1C6BFF", borderRadius: "3px", color: "#fff", fontSize: "8px" }}>Upload</div>
                                        </div>
                                        <div style={{ borderBottom: "1px solid #e5e7eb", background: "#f5f6f8" }}>
                                            <div style={{ display: "flex", alignItems: "center", padding: "4px 6px", gap: "6px", color: "#666" }}>
                                                <div style={{ width: "8px", height: "8px", border: "1px solid #ccc", borderRadius: "2px", flexShrink: 0 }} />
                                                <div style={{ flex: 1 }}>Name</div>
                                                <div style={{ width: "30px" }}>Size</div>
                                                <div style={{ width: "22px" }}>Status</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", padding: "4px 6px", gap: "6px", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
                                            <div style={{ width: "8px", height: "8px", border: "1px solid #ccc", borderRadius: "2px", flexShrink: 0 }} />
                                            <div style={{ width: "10px", height: "12px", background: "#e53e3e", borderRadius: "1px", flexShrink: 0 }} />
                                            <div style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: "#444" }}>File.pdf</div>
                                            <div style={{ width: "30px", color: "#888", textAlign: "right" }}>8.51MB</div>
                                            <div style={{ width: "22px", color: "#888" }}>Wait</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 6px", color: "#888", fontSize: "8px", background: "#fafafa" }}>
                                            1 of File : 8.51MB
                                        </div>
                                    </div>
                                </div>
                                <div className="comp-overview-title">File Uploader</div>
                            </Link>

                            <Link to="/publishing-guide/components/modal" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <div style={{ width: "200px", background: "#fff", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", fontSize: "10px" }}>
                                        <div style={{ padding: "8px 10px 6px", borderBottom: "1px solid #eee", fontWeight: 600, color: "#222" }}>□□□</div>
                                        <div style={{ padding: "8px 10px", color: "#888", lineHeight: 1.5 }}>
                                            <div style={{ background: "#f0f0f0", height: "6px", borderRadius: "3px", marginBottom: "4px" }} />
                                            <div style={{ background: "#f0f0f0", height: "6px", borderRadius: "3px", width: "70%" }} />
                                        </div>
                                        <div style={{ padding: "6px 10px 8px", display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                            <div style={{ padding: "3px 8px", background: "#eee", borderRadius: "4px", color: "#555" }}>Cancel</div>
                                            <div style={{ padding: "3px 8px", background: "#1C6BFF", borderRadius: "4px", color: "#fff" }}>Confirm</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comp-overview-title">Modal</div>
                            </Link>

                            <Link to="/publishing-guide/components/searchBox" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <SearchBox>
                                        <SearchBox.Actions>
                                            <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />}>초기화</Button>
                                            <Button variant="solid" className="button-search">검색</Button>
                                        </SearchBox.Actions>
                                    </SearchBox>
                                </div>
                                <div className="comp-overview-title">Search Box</div>
                            </Link>

                            <Link to="/publishing-guide/components/treeList" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <div style={{ width: "100%", fontSize: "9px", color: "#333" }}>
                                        {[
                                            { label: "상위 항목 1", depth: 0, open: true },
                                            { label: "하위 항목 1-1", depth: 1, open: false, active: true },
                                            { label: "하위 항목 1-2", depth: 1, open: false },
                                            { label: "상위 항목 2", depth: 0, open: true },
                                            { label: "하위 항목 2-1", depth: 1, open: false },
                                            { label: "상위 항목 3", depth: 0, open: false },
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 4px", paddingLeft: `${4 + item.depth * 14}px`, background: item.active ? "#EBF3FF" : undefined, borderRadius: "3px", marginBottom: "1px" }}>
                                                <span style={{ color: item.depth === 0 ? "#005AAA" : "#bbb", fontSize: "7px", flexShrink: 0 }}>
                                                    {item.depth === 0 ? (item.open ? "▼" : "▶") : "└"}
                                                </span>
                                                <div style={{ background: item.active ? "#005AAA" : "#dde3ea", height: "6px", borderRadius: "2px", flex: 1 }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="comp-overview-title">Tree List</div>
                            </Link>
                        </div>
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3 guide-section-title">Components</h3>
                        <p className="guide-desc guide-section-desc">
                            더 이상 쪼갤 수 없는 가장 기본적인 단일 UI 블록(Atomic)들입니다.
                        </p>

                        <div className="comp-comp-overview-title">
                            <Link to="/publishing-guide/components/badge" className="comp-overview-card">
                                <div className="comp-overview-preview" style={{ gap: 8 }}>
                                    <Badge variant="solid" color="blue">Badge</Badge>
                                    <Badge variant="filled" color="blue">Badge</Badge>
                                    <Badge variant="outlined" color="blue">Badge</Badge>
                                </div>
                                <div className="comp-overview-title">Badge</div>
                            </Link>

                            <Link to="/publishing-guide/components/box" className="comp-overview-card">
                                <div className="comp-overview-preview" >
                                    <Box variant="default">Box</Box>
                                </div>
                                <div className="comp-overview-title">Box</div>
                            </Link>

                            <Link to="/publishing-guide/components/button" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Button>Button</Button>
                                </div>
                                <div className="comp-overview-title">Button</div>
                            </Link>

                            <Link to="/publishing-guide/components/card" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Card size="md" variant="light" style={{ cursor: "pointer" }}>
                                        <h4 style={{ fontWeight: 600 }}>Card</h4>
                                        <p style={{ marginTop: "4px", color: "#666" }}>Card component provides a flexible content container.</p>
                                    </Card>
                                </div>
                                <div className="comp-overview-title">Card</div>
                            </Link>

                            <Link to="/publishing-guide/components/checkbox" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Checkbox checked />
                                </div>
                                <div className="comp-overview-title">Checkbox</div>
                            </Link>

                            <Link to="/publishing-guide/components/collapse" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Collapse.Group>
                                        <Collapse title="■■■■■">
                                            <p>□□□□□□□</p>
                                        </Collapse>
                                        <Collapse title="■■■■■">
                                            <p>□□□□□□□</p>
                                        </Collapse>
                                    </Collapse.Group>
                                </div>
                                <div className="comp-overview-title">Collapse</div>
                            </Link>

                            <Link to="/publishing-guide/components/divider" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Divider />
                                </div>
                                <div className="comp-overview-title">Divider</div>
                            </Link>

                            <Link to="/publishing-guide/components/dropdown" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Dropdown
                                        placeholder="Dropdown"
                                        options={[]}
                                    />
                                </div>
                                <div className="comp-overview-title">Dropdown</div>
                            </Link>

                            <Link to="/publishing-guide/components/input" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Input placeholder="Input" />
                                </div>
                                <div className="comp-overview-title">Input</div>
                            </Link>

                            <Link to="/publishing-guide/components/list" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <List as="ul" size="sm">
                                        <List.Item>🍎 Apple</List.Item>
                                        <List.Item>🍉 Watermelon</List.Item>
                                        <List.Item>🍌 Banana</List.Item>
                                    </List>
                                </div>
                                <div className="comp-overview-title">List</div>
                            </Link>

                            <Link to="/publishing-guide/components/radioButton" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <RadioButton checked />
                                </div>
                                <div className="comp-overview-title">Radio Button</div>
                            </Link>

                            <Link to="/publishing-guide/components/space" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <div style={{ width: "20px", height: "20px", backgroundColor: "#ddd" }} />
                                        <div style={{ width: "20px", height: "20px", backgroundColor: "#ddd" }} />
                                        <div style={{ width: "20px", height: "20px", backgroundColor: "#ddd" }} />
                                    </div>
                                </div>
                                <div className="comp-overview-title">Space</div>
                            </Link>

                            <Link to="/publishing-guide/components/switch" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Switch checked={true} onChange={() => { }}>
                                    </Switch>
                                </div>
                                <div className="comp-overview-title">Switch</div>
                            </Link>

                            <Link to="/publishing-guide/components/tab" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Tab variant="chip" value="status1" onChange={() => { }}>
                                        <Tab.Item value="status1">Tab 1</Tab.Item>
                                        <Tab.Item value="status2">Tab 2</Tab.Item>
                                    </Tab>
                                </div>
                                <div className="comp-overview-title">Tab</div>
                            </Link>

                            <Link to="/publishing-guide/components/table" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Table variant="default">
                                        <Table.Head>
                                            <Table.Row>
                                                <Table.Header>■■■</Table.Header>
                                                <Table.Header>■■■</Table.Header>
                                                <Table.Header>■■■</Table.Header>
                                                <Table.Header>■■■</Table.Header>
                                            </Table.Row>
                                        </Table.Head>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>□□</Table.Cell>
                                                <Table.Cell>□□</Table.Cell>
                                                <Table.Cell>□□</Table.Cell>
                                                <Table.Cell>□□</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </div>
                                <div className="comp-overview-title">Table</div>
                            </Link>

                            <Link to="/publishing-guide/components/textarea" className="comp-overview-card">
                                <div className="comp-overview-preview">
                                    <Textarea placeholder="Textarea" />
                                </div>
                                <div className="comp-overview-title">Textarea</div>
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}