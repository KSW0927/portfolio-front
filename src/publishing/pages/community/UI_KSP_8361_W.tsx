import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Box, Button, Card, Checkbox, Divider, Icon, Input, Layout, List, RadioButton, Space, Typography } from "@/publishing/components";

export function UI_KSP_8361_W() {
    const isMobile = useIsMobile();

    return (
        <Layout.Row layout="vertical" gap={30} style={{ padding: "2.0rem" }}>
            {/* Title */}
            <Typography variant="heading-xl" color="#000">2026년 KSS해운 서비스 만족도 조사</Typography>

            {/* Information */}
            <Box size="lg" gap={20} paddingLeft={20} paddingRight={20}>
                <Typography variant="body-lg" secondary>
                    본 설문은 KSS해운 서비스 이용 만족도를 파악하여 더 나은 운영 체계를 구축하기 위한 기초 자료로 활용됩니다.<br />
                    고객님의 솔직한 답변은 서비스 개선의 소중한 밑거름이 됩니다. 바쁘시더라도 잠시만 시간을 내어 응답해 주시면 감사하겠습니다.<br />
                    응답하신 내용은 통계법에 따라 비밀이 보장되며, 서비스 개선 목적 외에는 사용되지 않습니다.
                </Typography>
                <Box variant="inner">
                    <List layout={isMobile ? "vertical" : "horizontal"}>
                        <List.Item
                            label={<Typography variant="body-lg" weight="semibold" primary>문항 수</Typography>}
                            showDivider={false}
                        >
                            : 10문항
                        </List.Item>
                        {!isMobile && <Divider variant="dashed" layout="vertical" size={14} spacing={14} />}
                        <List.Item
                            label={<Typography variant="body-lg" weight="semibold" primary>설문기간</Typography>}
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
                    <Typography variant="body-md" color="#E31616">* 표시는 필수 문항입니다.</Typography>
                </Layout.Col>

                <Layout.Col gap={24}>
                    {/* Q01 */}
                    <Card size="xl" className="survey-card">
                        <Space size={10} align="start">
                            <Badge size="md" color="gray" className="survey-q-num">01</Badge>

                            <Space.Item layout="vertical" align="start">
                                <Typography variant="body-lg" weight="semibold">귀하의 소속을 선택해 주세요. (복수선택 가능)<Icon name="asterisk" size={18} /></Typography>
                            </Space.Item>
                        </Space>

                        <Space layout="vertical" size={15} className="survey-options">
                            <Checkbox label="화주(고객사)" onChange={() => { }} />
                            <Checkbox label="협력사" onChange={() => { }} />
                            <Checkbox label="내부임직원" onChange={() => { }} />
                        </Space>
                    </Card>

                    {/* Q02 */}
                    <Card size="xl" className="survey-card">
                        <Space size={8} align="start">
                            <Badge size="md" color="gray" className="survey-q-num">02</Badge>

                            <Space.Item layout="vertical" align="start">
                                <Typography variant="body-lg" weight="semibold">최근 3개월 내 KSS해운 서비스’를 이용해본 적이 있으십니까?<Icon name="asterisk" size={18} /></Typography>
                            </Space.Item>
                        </Space>

                        <Space layout="vertical" size={15} className="survey-options">
                            <RadioButton name="q2" label="예" description="(문항 4번으로 이동)" layout="horizontal" />
                            <RadioButton name="q2" label="아니오" description="(문항3번으로 이동)" layout="horizontal" />
                        </Space>
                    </Card>

                    {/* Q03 - disabled */}
                    <Card size="xl" className="survey-card -disabled">
                        <Space size={8} align="start">
                            <Badge size="md" color="gray" className="survey-q-num">03</Badge>

                            <Space.Item layout="vertical" align="start">
                                <Typography variant="body-lg" weight="semibold">최근 3개월 내 KSS해운 서비스’를 이용하지 않은 가장 큰 이유는 무엇입니까?<Icon name="asterisk" size={18} /></Typography>
                                <Typography variant="body-sm" secondary>(2번 문항에 ‘아니오’ 답변자만 선택)</Typography>
                            </Space.Item>
                        </Space>

                        <Space layout="vertical" size={15} className="survey-options">
                            <RadioButton name="q3" label="서비스를 들어본 적이 없음 (인지도 부족)" disabled />
                            <RadioButton name="q3" label="타사(경쟁사) 서비스를 이용 중임" disabled />
                            <RadioButton name="q3" label="서비스 이용 가격이 비싸다고 생각함" disabled />
                            <RadioButton name="q3" label="서비스의 품질이나 전문성이 부족해 보임" disabled />
                            <RadioButton name="q3" label="현재 해운 서비스가 필요한 비즈니스 상황이 아님" disabled />
                        </Space>
                    </Card>

                    {/* Q04 */}
                    <Card size="xl" className="survey-card">
                        <Space size={8} align="start">
                            <Badge size="md" color="gray" className="survey-q-num">04</Badge>

                            <Space.Item layout="vertical" align="start">
                                <Typography variant="body-lg" weight="semibold">KSS해운의 서비스 중 가장 만족스러웠던 부분은 무엇입니까?<Icon name="asterisk" size={18} /></Typography>
                                <Typography variant="body-sm" secondary>(2번 문항에 ‘예’ 답변자만 선택)</Typography>
                            </Space.Item>
                        </Space>

                        <Space layout="vertical" size={15} className="survey-options">
                            <RadioButton name="q4" label="운항 안전성" />
                            <RadioButton name="q4" label="운송 정확도" />
                            <RadioButton name="q4" label="업무 대응 속도" />
                            <RadioButton name="q4" label="직원 친절도" />
                            <RadioButton name="q4" label="커뮤니케이션" />
                        </Space>
                    </Card>

                    {/* Q05 */}
                    <Card size="xl" className="survey-card">
                        <Space size={8} align="start">
                            <Badge size="md" color="gray" className="survey-q-num">05</Badge>

                            <Space.Item layout="vertical" align="start">
                                <Typography variant="body-lg" weight="semibold">KSS해운에 전달하고 싶은 의견 및 건의사항이 있다면 자유롭게 작성해 주세요.</Typography>
                            </Space.Item>
                        </Space>

                        <Space layout="vertical" size={15} className="survey-options">
                            <Input placeholder="의견 및 건의사항 작성" fullWidth />
                        </Space>
                    </Card>
                </Layout.Col>
            </Layout.Row>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>임시저장</Button>
                <Button size={isMobile ? "md" : "lg"}>설문 제출</Button>
            </Layout.Row>
        </Layout.Row >
    );
}