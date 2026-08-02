import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Box, Button, Divider, Icon, Layout, List, Space, Typography } from "@/publishing/components";

export function UI_KSP_8252_R() {
    const isMobile = useIsMobile();
    const [prevHover, setPrevHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);

    return (
        <Layout title="공지사항" favorite={false} activeMenuId="">

            {/* Title */}
            <Layout.Row layout="vertical" gap={18}>
                <Layout.Col layout="horizontal" align="center" gap={8}>
                    <Badge size="lg" rounded>공지</Badge>
                    <Typography variant="heading-xl">경영정책 Q&A 자료</Typography>
                </Layout.Col>

                <List layout="horizontal" gap={14}>
                    <List.Item label={<Typography variant="body-lg" weight="semibold" primary>등록일</Typography>} columnGap={8} showDivider={false}>
                        2026-03-10
                    </List.Item>
                    <Divider variant="dashed" layout="vertical" size={14} />
                    <List.Item label={<Typography variant="body-lg" weight="semibold" primary>담당자</Typography>} columnGap={8} showDivider={false}>
                        홍길동
                    </List.Item>
                    <Divider variant="dashed" layout="vertical" size={14} />
                    <List.Item label={<Typography variant="body-lg" weight="semibold" primary>조회수</Typography>} columnGap={8} showDivider={false}>
                        10
                    </List.Item>
                </List>
            </Layout.Row>

            <Layout.Row layout="vertical" gap={24}>
                <Divider />

                {/* File */}
                <Box size="lg" bgColor="#F0F5F9" borderColor="#D9E2EA" gap={12} paddingTop={20} paddingBottom={20}>
                    <Typography variant="body-lg" weight="semibold" color="#464C53">첨부파일</Typography>

                    <Box variant="inner" borderColor="#D6E0EB" paddingTop={16} paddingBottom={16}>
                        <Space align="center" justify="space-between" >
                            <Space.Item size={8}>
                                <Icon name="attachment" size={24} />
                                <Typography variant="body-md" color="#464C53">공공데이터 개방 목록('24.12월기준).hwpx</Typography>
                            </Space.Item>
                            <Button variant="text" size="lg" leftIcon={<Icon name="download" size={16} color="#999" />}>다운로드</Button>
                        </Space>
                    </Box>
                </Box>

                공지사항 상세 내용 출력

                {/* Navigation */}
                <div className="board-navigation">
                    <Space size={38} className="item">
                        <Space.Item size={14} style={{ flexShrink: 0 }}>
                            <Icon name="arrow-up" size={18} color="#999" />
                            <Typography variant="body-lg">이전글</Typography>
                        </Space.Item>

                        <Button
                            variant="text" size="lg"
                            style={{ color: prevHover ? "var(--color-primary)" : "#666" }}
                            onMouseEnter={() => setPrevHover(true)}
                            onMouseLeave={() => setPrevHover(false)}
                        >
                            이전 글 출력
                        </Button>
                    </Space>

                    <Divider />

                    <Space size={38} className="item">
                        <Space.Item size={14} style={{ flexShrink: 0 }}>
                            <Icon name="arrow-down" size={18} color="#999" />
                            <Typography variant="body-lg">다음글</Typography>
                        </Space.Item>

                        <Button
                            variant="text" size="lg"
                            style={{ color: nextHover ? "var(--color-primary)" : "#666" }}
                            onMouseEnter={() => setNextHover(true)}
                            onMouseLeave={() => setNextHover(false)}
                        >
                            다음 글 출력
                        </Button>
                    </Space>
                </div>
            </Layout.Row>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
            </Layout.Row>
        </Layout >
    );
}
