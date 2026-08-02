import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Card, Checkbox, Icon, Layout, List, Space, Typography } from "@/publishing/components";

export function UI_KSP_8371_W() {
    const isMobile = useIsMobile();

    return (
        <Layout.Row layout="vertical" gap={30} style={{ padding: "2.0rem" }}>
            {/* Title */}
            <Typography variant="heading-xl" color="#000">회식장소 투표</Typography>

            {/* Information */}
            <Box size="lg" gap={20} paddingLeft={20} paddingRight={20}>
                <Typography variant="body-lg" secondary>
                    2026년 03월 31일 팀 회식 관련하여 희망하는 장소 투표해주시기 바랍니다.
                </Typography>
                <Box variant="inner">
                    <List layout={isMobile ? "vertical" : "horizontal"}>
                        <List.Item
                            label={<Typography variant="body-lg" weight="semibold" primary>투표기간</Typography>}
                            showDivider={false}
                        >
                            : 2026년 3월 01일 ~ 2026년 3월 31일
                        </List.Item>
                    </List>
                </Box>
            </Box>

            {/* Survey */}
            <Layout.Row layout="vertical" gap={14}>
                <Layout.Col align="end">
                    <Typography variant="body-md">* 복수선택 가능</Typography>
                </Layout.Col>

                <Layout.Col gap={24}>
                    {/* Q01 */}
                    <Card size="xl" className="survey-card -vote">
                        <Space justify="space-between">
                            <Space.Item size={8}>
                                <Icon name="vote" size={24} />
                                <Typography variant="body-lg" weight="semibold">투표</Typography>
                            </Space.Item>

                            <Typography variant="body-md" secondary>00명 참여</Typography>
                        </Space>

                        <Space layout="vertical" size={15} className="survey-options">
                            <Checkbox variant="box" label="중국집" checked onChange={() => { }} />
                            <Checkbox variant="box" label="고깃집" onChange={() => { }} />
                            <Checkbox variant="box" label="횟집" checked onChange={() => { }} />
                            <Checkbox variant="box" label="양꼬치집" onChange={() => { }} />
                            <Checkbox variant="box" label="파스타집" onChange={() => { }} />
                        </Space>
                    </Card>

                </Layout.Col>
            </Layout.Row>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>닫기</Button>
                <Button size={isMobile ? "md" : "lg"}>투표하기</Button>
            </Layout.Row>
        </Layout.Row >
    );
}