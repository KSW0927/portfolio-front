import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Badge, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";


const MEETING_LIST = [
    { id: 1, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 2, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 3, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 4, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 5, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 6, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 7, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
];


/**
 * 회의실 위젯 컴포넌트
 * @description
 */
export const MeetingWidget = (props: WidgetCardProps) => {
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
                <div className="widget-meeting-content">
                    <ul>
                        {MEETING_LIST.map((item) => (
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
                                        <Badge variant="filled" size="lg" rounded>{item.stime}~{item.etime}</Badge>

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

                                    <Space size={4}>
                                        <Icon name="user" size={18} />
                                        <Typography variant="body-md" tertiary>{item.team}</Typography>
                                    </Space>
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
MeetingWidget.displayName = 'MeetingWidget';

