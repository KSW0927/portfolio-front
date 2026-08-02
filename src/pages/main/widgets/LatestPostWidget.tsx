import { useIsDark } from "@/hooks/useIsDark";
import { Card, Icon, Badge, Button, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";

const POST_LIST = [
    { id: 1, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 2, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 3, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 4, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 5, category: "휘발위게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 6, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 7, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 8, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 9, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 10, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
];

/**
 * 최신게시글 위젯 컴포넌트
 * @description
 */
export const LatestPostWidget = (props: WidgetCardProps) => {
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
                <div className="widget-latest-post-content">
                    {POST_LIST.map((item) => (
                        <Button variant="text" key={`${item.id}`} fullWidth>
                            <Space size={14}>
                                <Badge variant="solid" rounded>{item.category}</Badge>

                                <Space justify="space-between" align="center">
                                    <Typography variant="body-lg" weight="semibold" secondary={!isDark} className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>
                                    <Typography variant="body-md" weight="semibold" tertiary={!isDark} color={isDark ? "var(--dash-text-primary)" : ""}>{item.date}</Typography>
                                </Space>
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
LatestPostWidget.displayName = 'LatestPostWidget';

