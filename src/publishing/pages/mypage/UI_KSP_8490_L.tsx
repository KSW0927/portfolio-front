import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button, Card, Divider, Icon, Input, Layout, List, Space, Typography } from "@/publishing/components";

interface ContentData {
    label?: string;
    value: number;
}

interface MyStatusCard {
    icon: string;
    title: string;
    content: ContentData[];
}

export function UI_KSP_8490_L() {
    const isMobile = useIsMobile();
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [addressValue, setAddressValue] = useState("서울시 마포구 동교동");
    const [addressInput, setAddressInput] = useState("");
    const [phoneValue, setPhoneValue] = useState("010-1234-5678");
    const [phoneInput, setPhoneInput] = useState("");

    const myStatus: MyStatusCard[] = [
        { icon: "approval", title: "전자결제", content: [{ label: "대기", value: 6 }, { label: "처리", value: 6 }] },
        { icon: "survey", title: "업무관리", content: [{ label: "업무일지", value: 6 }, { label: "요청업무", value: 6 }] },
        { icon: "education", title: "당해년 교육현황", content: [{ value: 6 }] },
        { icon: "request", title: "연차 정보", content: [{ value: 6 }] },
    ];

    return (
        <>
            <Layout title="나의 정보" activeMenuId="">
                {/* My Proflie */}
                <Box className={`my-profile-wrap ${isMobile ? "-square" : ""}`}>
                    <Space layout="vertical" size={30}>
                        <Layout.Row justify="space-between" align={isMobile ? "start" : "center"} layout={isMobile ? "vertical" : "horizontal"}>
                            <Layout.Col className="greetings">
                                <Space size={32}>
                                    <div className="avatar">
                                        <img src="/src/assets/img/temp/temp_profile.png" alt="홍길동 프로필 사진" />
                                    </div>

                                    <Space layout="vertical" size={12}>
                                        <Typography variant="body-lg" weight="semibold" color="#FFF">삼항사</Typography>
                                        <Typography variant="display-lg" color="#FFF"><Typography variant="display-lg" as="strong" color="#78F6FF">홍길동</Typography>님, 반갑습니다.</Typography>
                                    </Space>
                                </Space>
                            </Layout.Col>
                            <Layout.Col className="profile-info">
                                <List layout={isMobile ? "vertical" : "horizontal"} gap={50}>
                                    <List.Item
                                        icon={<Icon name="user" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
                                        label="직책"
                                        labelColor="#C6D9F8"
                                        columnGap={11}
                                    >
                                        <Typography variant="heading-sm" color="#FFF">삼항사</Typography>
                                    </List.Item>
                                    <List.Item
                                        icon={<Icon name="org-char" size={24} color="#FFF" style={{ backgroundColor: "#003261", borderRadius: "50%", padding: "0.6rem", boxSizing: "content-box" }} />}
                                        label="부서"
                                        labelColor="#C6D9F8"
                                        columnGap={11}
                                    >
                                        <Typography variant="heading-sm" color="#FFF">경영지원본부 / 경영지원팀</Typography>
                                    </List.Item>
                                </List>
                            </Layout.Col>
                        </Layout.Row>

                        <Layout.Row gap={32} layout={isMobile ? "vertical" : "horizontal"}>
                            <Layout.Col>
                                <div className="my-infobox">
                                    <List gap={8}>
                                        <List.Item label="전화번호" labelWidth={82} labelColor="#C6D9F8" columnGap={20}>
                                            <Typography variant="body-lg" color="#FFF" weight="semibold">02-123-4567</Typography>
                                        </List.Item>
                                        <List.Item label="휴대폰" labelWidth={82} labelColor="#C6D9F8" columnGap={20}>
                                            <Typography variant="body-lg" color="#FFF" weight="semibold">010-1234-5678</Typography>
                                        </List.Item>
                                        <List.Item label="이메일 주소" labelWidth={82} labelColor="#C6D9F8" columnGap={20}>
                                            <Typography variant="body-lg" color="#FFF" weight="semibold">2015-kss@naver.com-05</Typography>
                                        </List.Item>
                                    </List>
                                </div>
                            </Layout.Col>
                            <Layout.Col>
                                <div className="my-infobox">
                                    <List gap={8}>
                                        <List.Item label="배송지" labelWidth={82} labelColor="#C6D9F8" columnGap={20}>
                                            <Space size="sm">
                                                {isEditingAddress ? (
                                                    <>
                                                        <Input value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                                                        <Button size="sm" onClick={() => { setAddressValue(addressInput); setIsEditingAddress(false); }}>저장</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography variant="body-lg" color="#FFF" weight="semibold">{addressValue}</Typography>
                                                        <Button size="sm" onClick={() => { setAddressInput(addressValue); setIsEditingAddress(true); }}>수정</Button>
                                                    </>
                                                )}
                                            </Space>
                                        </List.Item>
                                        <List.Item label="배송지 연락처" labelWidth={82} labelColor="#C6D9F8" columnGap={20}>
                                            <Space size="sm">
                                                {isEditingPhone ? (
                                                    <>
                                                        <Input value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
                                                        <Button size="sm" onClick={() => { setPhoneValue(phoneInput); setIsEditingPhone(false) }}>저장</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography variant="body-lg" color="#FFF" weight="semibold">{phoneValue}</Typography>
                                                        <Button size="sm" onClick={() => { setPhoneInput(phoneValue); setIsEditingPhone(true) }}>수정</Button>
                                                    </>
                                                )}
                                            </Space>
                                        </List.Item>
                                    </List>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                    </Space>
                </Box>

                <Layout.Row gap={isMobile ? 20 : 16} layout="vertical">
                    <Typography variant="heading-sm">나의 현황</Typography>

                    {/* Card Grid */}
                    <div className={`card-grid my-status ${isMobile ? "" : "-col-4"}`}>
                        {myStatus.map((item, index) => {
                            const isTwoColumns = item.content.length === 2;

                            return (
                                <Card size="lg" variant="light" key={`${item.title}-${index}`} className="my-status-card">
                                    <Space layout="vertical" size={24}>
                                        <Card.Header leftIcon={<Icon name={item.icon} size={20} />}>
                                            <Typography variant="heading-md">{item.title}</Typography>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="contents">
                                                {isTwoColumns ? (
                                                    <>
                                                        <Space layout="vertical" size={8}>
                                                            <Typography variant="heading-xs">{item.content[0].label}</Typography>
                                                            <Space size={4} align="baseline" justify="end">
                                                                <Typography variant="heading-xl" as="strong" primary style={{ fontSize: "4.6rem", lineHeight: 1 }}>{item.content[0].value}</Typography>
                                                                <Typography variant="heading-sm" as="span" secondary>건</Typography>
                                                            </Space>
                                                        </Space>
                                                        <Divider layout="vertical" variant="dashed" spacing={24} size={82} />
                                                        <Space layout="vertical" size={8}>
                                                            <Typography variant="heading-xs">{item.content[1].label}</Typography>
                                                            <Space size={4} align="baseline" justify="end">
                                                                <Typography variant="heading-xl" as="strong" primary style={{ fontSize: "4.6rem", lineHeight: 1 }}>{item.content[1].value}</Typography>
                                                                <Typography variant="heading-sm" as="span" secondary>건</Typography>
                                                            </Space>
                                                        </Space>
                                                    </>
                                                ) : (
                                                    <Layout.Row justify="end">
                                                        <Space size={4} align="baseline" justify="end">
                                                            <Typography variant="heading-xl" as="strong" primary style={{ fontSize: "4.6rem", lineHeight: 1 }}>{item.content[0].value}</Typography>
                                                            <Typography variant="heading-sm" as="span" secondary>건</Typography>
                                                        </Space>
                                                    </Layout.Row>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Space>
                                </Card>
                            );
                        })}
                    </div>
                </Layout.Row>
            </Layout>
        </>
    );
}