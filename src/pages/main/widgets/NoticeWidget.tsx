import { useIsDark } from "@/hooks/useIsDark";
import { Card, Icon, Button, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";


const NOTICE_LIST = [
    { id: 1, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 2, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 3, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 4, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 5, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 6, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 7, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 8, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 9, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 10, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
];

/**
 * 공지사항 위젯 컴포넌트
 * @description
 */
export const NoticeWidget = (props: WidgetCardProps) => {
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
                <div className="widget-notice-content">
                    {NOTICE_LIST.map((item) => (
                        <Button variant="text" key={`${item.id}`} fullWidth>
                            <Space justify="space-between" align="center">
                                <Typography variant="body-lg" weight="semibold" secondary={!isDark} color={isDark ? "var(--dash-text-primary)" : ""} className="text-ellipsis">{item.title}</Typography>
                                <Typography variant="body-md" weight="semibold" tertiary={!isDark} color={isDark ? "var(--dash-text-primary)" : ""}>{item.date}</Typography>
                            </Space>
                        </Button>
                    ))}
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
NoticeWidget.displayName = 'NoticeWidget';

