import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, Card, Checkbox, DateRangePicker, Divider, Dropdown, Icon, Input, Layout, SearchBox, Space, Typography } from "@/publishing/components";

const dummyOptions = [
    { label: "전체", value: "all" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
];

interface SurveyItem {
    id: string;
    status: string;       // 신청중
    dday: string;         // D+3 등
    title: string;
    startDate: string;
    endDate: string;
    current: number;
    total: number;
    disabled?: boolean;   // 설문하기 버튼 비활성
}

const dummyData: SurveyItem[] = [
    { id: "1", status: "신청중", dday: "D+3", title: "2026년 KSS해운 서비스 만족도 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "2", status: "신청중", dday: "D+3", title: "2026년 서비스 만족도 설문 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "3", status: "신청중", dday: "D+3", title: "2026년 KSS해운 서비스 만족도 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "4", status: "신청중", dday: "D+3", title: "2026년 서비스 만족도 설문 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "5", status: "신청중", dday: "D+3", title: "2026년 KSS해운 서비스 만족도 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "6", status: "신청중", dday: "D+3", title: "2026년 서비스 만족도 설문 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120, disabled: true },
    { id: "7", status: "신청중", dday: "D+3", title: "2026년 KSS해운 서비스 만족도 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "8", status: "신청중", dday: "D+3", title: "2026년 서비스 만족도 설문 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "9", status: "신청중", dday: "D+3", title: "2026년 KSS해운 서비스 만족도 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
    { id: "10", status: "신청중", dday: "D+3", title: "2026년 서비스 만족도 설문 조사", startDate: "2026-02-30", endDate: "2026-03-12", current: 20, total: 120 },
];

const TOTAL_PAGES = 3;

export function UI_KSP_8360_L() {
    const isMobile = useIsMobile();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Layout title="설문" activeMenuId="">

            {/* SearchBox */}
            <SearchBox>
                <SearchBox.Content>
                    <SearchBox.Row>
                        <SearchBox.Item width={isMobile ? "100%" : 140}>
                            <Dropdown label="진행상태" value="all" options={dummyOptions} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 357}>
                            <DateRangePicker label="게시일" startDate={startDate} endDate={endDate} onChange={setDateRange} />
                        </SearchBox.Item>
                        <SearchBox.Item width={isMobile ? "100%" : 380}>
                            <Input label="상세검색" placeholder="제목으로 검색하세요." leftIcon={<Icon name="search" size={20} color="#999" />} fullWidth />
                        </SearchBox.Item>
                        <SearchBox.Item>
                            <Checkbox label="내가 속한 설문만 보기" />
                        </SearchBox.Item>
                    </SearchBox.Row>
                </SearchBox.Content>

                <SearchBox.Actions>
                    <Button variant="text" color="primary" className="button-reset" leftIcon={<Icon name="reset" size={18} style={{ color: "#005AAA" }} />} size={isMobile ? "lg" : "md"}>초기화</Button>
                    <Button variant="solid" className="button-search" size={isMobile ? "sm" : "md"}>검색</Button>
                </SearchBox.Actions>
            </SearchBox>

            {/* List Grid */}
            <div className="list-grid-wrap">
                <Layout.Row justify="space-between" align="end" className="data-grid-header">
                    <Layout.Col layout={"horizontal"} gap={isMobile ? 8 : 14}>
                        <div className="data-grid-total" aria-live="polite" aria-atomic="true">
                            <Typography variant={isMobile ? "body-md" : "body-lg"} as="span">
                                총
                                <Typography variant={isMobile ? "body-md" : "body-lg"} as="strong" weight="semibold" primary> {dummyData.length}</Typography>
                                건
                            </Typography>
                        </div>
                        <Divider layout="vertical" size={10} />
                        <Dropdown
                            variant="text"
                            label="목록 표시 개수"
                            layout="horizontal"
                            options={isMobile ? [
                                { label: "5개", value: "5" },
                                { label: "10개", value: "10" },
                                { label: "20개", value: "20" },
                                { label: "50개", value: "50" },
                            ] : [
                                { label: "10개", value: "10" },
                                { label: "20개", value: "20" },
                                { label: "50개", value: "50" },
                            ]}
                            value={String(isMobile ? 5 : 10)}
                            onChange={() => { }}
                        />
                    </Layout.Col>
                </Layout.Row>

                {/* Survey List */}
                <ul className="list-grid">
                    {dummyData.map((item) => (
                        <li key={item.id}>
                            <Card variant="light" size="xl" layout={isMobile ? "vertical" : "horizontal"} className="list-grid-item">
                                <Card.Body className="list-grid-contents">
                                    <Space size="sm">
                                        <Badge variant="filled" color="blue" rounded>{item.status}</Badge>
                                        <Badge variant="filled" color="red" rounded>{item.dday}</Badge>
                                    </Space>
                                    <Space size="sm">
                                        <Typography variant="heading-md">{item.title}</Typography>
                                        <Icon name="arrow-right" size={20} color="#333" />
                                    </Space>


                                    <div className="list-grid-item-meta">
                                        <Space size={4}>
                                            <Icon name="calendar" size={24} color="#999" />
                                            <Typography variant="body-md" secondary>{item.startDate} ~ {item.endDate}</Typography>
                                        </Space>
                                        <Divider layout="vertical" variant="dashed" spacing={12} size={14} />
                                        <Space size={4}>
                                            <Icon name="user" size={24} color="#999" />
                                            <Typography variant="body-md" as="span" secondary><Typography variant="body-md" weight="semibold" as="strong" primary>{item.current}</Typography>/{item.total}</Typography>
                                        </Space>
                                    </div>
                                </Card.Body>
                                {!isMobile && <Divider layout="vertical" variant="dashed" size={88} />}
                                <Card.Actions>
                                    <Button
                                        variant="solid"
                                        disabled={item.disabled}
                                        leftIcon={<Icon name="pencil" size={18} color={item.disabled ? "#999" : "#FFF"} />}
                                    >
                                        설문하기
                                    </Button>
                                </Card.Actions>
                            </Card>
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                <div className="list-grid-footer">
                    <div className="pagination-wrap">
                        <button className="button-page" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} aria-label="이전 페이지">
                            <Icon name="arrow-left" size={16} color="#666" />
                        </button>
                        <div className="button-pages">
                            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    className={`button-page${currentPage === page ? " active" : ""}`}
                                    onClick={() => setCurrentPage(page)}
                                    aria-label={`${page}페이지`}
                                    aria-current={currentPage === page ? "page" : undefined}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button className="button-page" disabled={currentPage === TOTAL_PAGES} onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))} aria-label="다음 페이지">
                            <Icon name="arrow-right" size={16} color="#666" />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}