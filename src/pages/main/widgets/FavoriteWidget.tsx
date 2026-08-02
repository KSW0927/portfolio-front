import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Icon, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";

const FAV_MENU_LIST = [
    { id: 1, title: "공지사항" },
    { id: 2, title: "Safety Bulletin" },
    { id: 3, title: "사내 근로복지 기금" },
    { id: 4, title: "설문" },
    { id: 5, title: "휘발위게시판" },
    { id: 6, title: "해운/조선 소식" },
    { id: 7, title: "비상연락망" },
    { id: 8, title: "업무일지" },
    { id: 9, title: "업무일지" },
    { id: 10, title: "비상연락망" },
    { id: 11, title: "업무일지" },
    { id: 12, title: "업무일지" },
    { id: 13, title: "비상연락망" },
    { id: 14, title: "업무일지" },
    { id: 15, title: "업무일지" },
];

/**
 * 즐겨찾기 위젯 컴포넌트
 * @description
 */
export const FavoriteWidget = (props: WidgetCardProps) => {
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
                <div className="widget-favorite-content">
                    {FAV_MENU_LIST.map((item) => (
                        <Button variant="outlined" key={`${item.id}`} className="button-fav-menu">{item.title}</Button>
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
FavoriteWidget.displayName = 'FavoriteWidget';

