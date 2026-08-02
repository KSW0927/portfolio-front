import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Badge, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";



const MESSAGE_LIST = [
    { id: 1, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.안녕하세요.", date: "2026-02-27", status: "읽음" },
    { id: 2, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "안읽음" },
    { id: 3, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "읽음" },
    { id: 4, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "안읽음" },
    { id: 5, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "읽음" },
    { id: 6, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "안읽음" },
    { id: 7, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "읽음" },
];


/**
 * 쪽지 위젯 컴포넌트
 * @description
 */
export const MessageWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab, changeHide, changeExpand } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;


    /* 상태 정의 */


    /* 이벤트 정의 */



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

            <Card.Body>
                <div className="widget-message-content">
                    <ul>
                        {MESSAGE_LIST.map((item) => (
                            <li
                                key={`${item.id}`} role="button"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        // DEV: onClick과 동일한 로직 실행 추가 필요 - 웹접근성
                                    }
                                }}
                            >
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <div className="avatar">
                                            <img
                                                src={item.profileImage}
                                                alt={item.name}
                                            />
                                        </div>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.date}</Typography>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Badge
                                        variant="filled" rounded
                                        color={
                                            ({
                                                "읽음": "blue",
                                                "안읽음": "red",
                                            }[item.status] || "gray") as "blue" | "red" | "gray"
                                        }
                                    >{item.status}</Badge>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card.Body>

            {widget.hasAction && (
                <Card.Actions>
                    <Button fullWidth onClick={widget.action}>{widget.actionTitle}</Button>
                </Card.Actions>
            )}
        </>
    );
}
MessageWidget.displayName = 'MessageWidget';

