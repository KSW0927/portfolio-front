import { useIsDark } from "@/hooks/useIsDark";
import { Card, Icon, Button, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";

const SEARCH_DATA_LIST = [
    { id: 1, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 2, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 3, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 4, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 5, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 6, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 7, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
];

/**
 * 비정형데이터검색 위젯 컴포넌트
 * @description
 */
export const DataSearchWidget = (props: WidgetCardProps) => {
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
                <div className="widget-data-search-content">
                    <ul>
                        {SEARCH_DATA_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Space layout="vertical" size={4}>
                                        <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                        <Typography variant="body-md" tertiary>{item.extra}</Typography>
                                    </Space>

                                    <Button variant="outlined" size="sm">보기</Button>
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
DataSearchWidget.displayName = 'DataSearchWidget';

