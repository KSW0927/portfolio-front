import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Badge, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";

const EDU_LIST = [
    { id: 1, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "수료" },
    { id: 2, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "신청" },
    { id: 3, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "진행" },
    { id: 4, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "수료" },
    { id: 5, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "신청" },
    { id: 6, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "진행" },
    { id: 7, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "수료" },
];

/**
 * 교육 신청내역/현황 위젯 컴포넌트
 * @description
 */
export const EducationWidget = (props: WidgetCardProps) => {
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
                <div className="widget-education-content">
                    <ul>
                        {EDU_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.sdate}</Typography><Typography variant="body-md" tertiary>~{item.edate}</Typography>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Badge
                                        variant="filled" rounded
                                        color={
                                            ({
                                                "수료": "blue",
                                                "진행": "green",
                                                "신청": "red"
                                            }[item.status] || "gray") as "blue" | "green" | "red" | "gray"
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
EducationWidget.displayName = 'EducationWidget';

