import React, {useCallback, useRef, useState} from "react";
import { useIsDark } from "@/hooks/useIsDark";
import { Badge, Box, Button, Card, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";

import profileWidgetBg from "@/assets/img/general/bg-MA-001-2.png";

const PROFILE_ALARM_LIST = [
    { id: 1, category: "주문", title: "1000건 주문 시뮬레이션이 완료되었습니다. (성공 996 · 실패 4)" },
    { id: 2, category: "재고", title: "재고 정합성 체크에서 오버셀 76개가 감지되었습니다." },
    { id: 3, category: "동시성", title: "Pessimistic Lock 적용 테스트가 정상적으로 완료되었습니다." },
    { id: 4, category: "시스템", title: "재고가 초기화되어 전체 SKU가 재랜덤 부여되었습니다." },
];

/**
 * 프로파일 위젯 컴포넌트
 * @description
 */
export const ProfileWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;
    const profileBgInputRef = useRef<HTMLInputElement>(null);



    /* 상태 정의 */
    const [profileBgImage, setProfileBgImage] = useState<string | null>(profileWidgetBg);

    /* 이벤트 정의 */
    const handleProfileBgUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type.startsWith("image/"))) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setProfileBgImage(ev.target.result as string);
                    changeActiveKebab(null);
                }
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    }, []);


    return (
        <>
            <Card.Header
                leftIcon={widget.icon && <Icon name={widget.icon} size={20} />}
                extra={
                    widget.expandable && (
                        <div style={{ position: "relative" }}>
                            <Button
                                variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                className={`button-widget-settings ${isDark && "-invert"}`} rounded
                                aria-label="위젯 설정"
                                aria-haspopup="true"
                                aria-expanded={isKebabOpen}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    changeActiveKebab(isKebabOpen ? null : widget.id);
                                }}
                            />
                            {isKebabOpen && (
                                <div className="widget-setting-popup">
                                    <button onClick={(e) => { e.stopPropagation(); changeHide(widget.id); }}>
                                        위젯 삭제
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); changeExpand(widget.id); }}>
                                        {widget.size === "sm" ? "위젯 확대" : "위젯 축소"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                }
            >
                <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} color={isDark ? "var(--dash-text-disabled)" : "var(--dash-text-tertiary)"} />}>
                    <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>{widget.title}</Typography>
                </Button>
            </Card.Header>

                {/*<Layout.Row layout="vertical" align="center" justify="center" gap={10}>*/}
                {/*    <Layout.Col gap={6} align="center">*/}
                {/*        <div className="avatar">*/}
                {/*            <img src="/src/assets/img/temp/temp_profile-3.png" alt="홍길동" />*/}
                {/*        </div>*/}
                {/*        <Space size={3} align="baseline" separator={<Divider layout="vertical" variant="dashed" color="var(--dash-profile-divider)" />}>*/}
                {/*            <Typography variant="heading-xl" color="var(--dash-profile-text)" weight="semibold" style={{ lineHeight: 1 }}>홍길동</Typography>*/}
                {/*            <Typography variant="heading-sm" color="var(--dash-profile-sub)" weight="semibold">대리</Typography>*/}
                {/*        </Space>*/}
                {/*    </Layout.Col>*/}

                {/*    <Layout.Col>*/}
                {/*        <Space size={7} separator={<Divider layout="vertical" variant="dashed" color="var(--dash-profile-divider)" size={9} />}>*/}
                {/*            <Typography variant="body-lg" color="var(--dash-profile-text)">경영지원본부</Typography>*/}
                {/*            <Typography variant="body-lg" color="var(--dash-profile-text)">경영지원팀</Typography>*/}
                {/*        </Space>*/}
                {/*    </Layout.Col>*/}
                {/*</Layout.Row>*/}

                {/*<Layout.Row className="summary-wrap" gap={0}>*/}
                {/*    <Layout.Col align="center" gap={8}>*/}
                {/*        <Space size={6}>*/}
                {/*            <Icon name="message" size={20} color="var(--dash-profile-text)" />*/}
                {/*            <Typography variant="body-lg" color="var(--dash-profile-text)">쪽지</Typography>*/}
                {/*        </Space>*/}
                {/*        <Space size={3} align="baseline">*/}
                {/*            <Typography variant="body-lg" as="strong" color="var(--dash-profile-text)" style={{ fontSize: "3.2rem", lineHeight: 1 }}>3</Typography>*/}
                {/*            <Typography variant="body-lg" as="span" color="var(--dash-profile-muted)">건</Typography>*/}
                {/*        </Space>*/}
                {/*    </Layout.Col>*/}

                {/*    <Divider layout="vertical" variant="dashed" color="var(--dash-profile-divider)" size={64} />*/}

                {/*    <Layout.Col align="center" gap={8}>*/}
                {/*        <Space size={6}>*/}
                {/*            <Icon name="calendar" size={20} color="var(--dash-profile-text)" />*/}
                {/*            <Typography variant="body-lg" color="var(--dash-profile-text)">연차</Typography>*/}
                {/*        </Space>*/}
                {/*        <Space size={3} align="baseline">*/}
                {/*            <Typography variant="body-lg" as="strong" color="var(--dash-profile-text)" style={{ fontSize: "3.2rem", lineHeight: 1 }}>12</Typography>*/}
                {/*            <Typography variant="body-lg" as="span" color="var(--dash-profile-muted)">개</Typography>*/}
                {/*        </Space>*/}
                {/*    </Layout.Col>*/}
                {/*</Layout.Row>*/}

            <Card.Body gap={10}>
                <Layout.Row justify="space-between" className="title-wrap">
                    <Layout.Col layout="horizontal" align="center" gap={4}>
                        <Icon name="bell" size={18} color="var(--dash-profile-text)" />
                        <Typography variant="body-lg" weight="semibold" color="var(--dash-profile-text)">최근 알림</Typography>
                    </Layout.Col>

                    <Layout.Col layout="horizontal" align="baseline" justify="end" gap={3}>
                        <Typography variant="heading-lg" as="strong" color="var(--dash-profile-count-accent)" style={{ fontSize: "3.8rem", lineHeight: 1 }}>{PROFILE_ALARM_LIST.length}</Typography>
                        <Typography variant="body-lg" as="span" color="var(--dash-profile-text)">건</Typography>
                    </Layout.Col>
                </Layout.Row>

                <Layout.Row layout="vertical" gap={16} className="alarm-wrap">
                    {PROFILE_ALARM_LIST.map((item) => (
                        <Box variant="info" key={item.id}>
                            <Space size={12}>
                                <Typography variant="body-xs" weight="semibold" primary={!isDark} color={isDark ? "var(--dash-accent-link-dark)" : ""} >{item.category}</Typography>

                                <Typography variant="body-md" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-base)"}>{item.title}</Typography>
                            </Space>
                        </Box>
                    ))}
                </Layout.Row>
            </Card.Body>
        </>
    );
}
ProfileWidget.displayName = 'ProfileWidget';

