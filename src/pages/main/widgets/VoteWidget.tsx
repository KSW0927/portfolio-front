import { useIsDark } from "@/hooks/useIsDark";
import { Badge, Button, Card, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";


const VOTE_LIST = [
    { id: 1, dday: -3, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 2, dday: -4, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 3, dday: -6, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 4, dday: -9, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 5, dday: -10, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 6, dday: -20, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 7, dday: -30, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
];

/**
 * 투표 위젯 컴포넌트
 * @description
 */
export const VoteWidget = (props: WidgetCardProps) => {
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
                <div className="widget-vote-content">
                    <ul>
                        {VOTE_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <Badge variant={item.dday > -10 ? "solid" : "filled"} color="red" rounded>D{item.dday}</Badge>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} color="var(--dash-text-tertiary)" />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.date}</Typography>
                                                </Space>
                                                <Space size={4}>
                                                    <Icon name="user" size={14} color="var(--dash-text-tertiary)" />
                                                    <Space.Item>
                                                        <Typography variant="body-xs" as="strong" primary={!isDark} color={isDark ? "var(--dash-accent-link-dark)" : ""}>{item.current}</Typography><Typography variant="body-xs" as="span" secondary>/{item.total}</Typography>
                                                    </Space.Item>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Button size="sm">투표</Button>
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
VoteWidget.displayName = 'VoteWidget';

