import { useEffect, useState} from "react";
import { useIsDark } from "@/hooks/useIsDark";
import { Box, Button, Card, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types";
import { useNotificationStore, type NotificationItem } from "@/store/notificationStore";
import { AlertService } from "@/utils/AlertService";

const FALLBACK_ALARM_LIST: NotificationItem[] = [
    { id: -1, category: "안내", title: "주문을 실행하면 실시간 알림이 여기에 표시됩니다.", buyerUserNo: 0, createdAt: "", pinned: false },
];

const showNotificationDetail = (item: NotificationItem) => {
    if (item.id < 0) return; // 안내용 더미 항목은 클릭 무시

    const time = item.createdAt
        ? new Date(item.createdAt).toLocaleString("ko-KR", { hour12: false })
        : "-";

    AlertService.alert(
        `${item.category} 알림 상세`,
        `
            <div style="text-align:left; line-height:1.8;">
                <div>${item.title}</div>
                <div>구매자 번호 : ${item.buyerUserNo}</div>
                <div>접수 시각 : ${time}</div>
            </div>
        `,
        "info",
    );
};

/**
 * 프로파일 위젯 컴포넌트
 * @description
 */
export const NotifyWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;

    const notifications = useNotificationStore((state) => state.notifications);
    const connect = useNotificationStore((state) => state.connect);
    const alarmList = notifications.length > 0 ? notifications : FALLBACK_ALARM_LIST;
    // 클릭해서 상세를 확인한 알림 - 이 항목에만 강조 효과를 준다(기존엔 최상단 고정이었음)
    const [activeAlarmId, setActiveAlarmId] = useState<number | null>(null);

    useEffect(() => {
        connect();
    }, [connect]);

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
                <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>{widget.title}</Typography>
            </Card.Header>

            <Card.Body gap={10}>
                <Layout.Row justify="space-between" className="title-wrap">
                    <Layout.Col layout="horizontal" align="center" gap={4}>
                        <Icon name="bell" size={18} color="var(--dash-profile-text)" />
                        <Typography variant="body-lg" weight="semibold" color="var(--dash-profile-text)">최근 알림</Typography>
                    </Layout.Col>

                    <Layout.Col layout="horizontal" align="baseline" justify="end" gap={3}>
                        <Typography variant="heading-lg" as="strong" color="var(--dash-profile-count-accent)" style={{ fontSize: "3.8rem", lineHeight: 1 }}>{alarmList.length}</Typography>
                        <Typography variant="body-lg" as="span" color="var(--dash-profile-text)">건</Typography>
                    </Layout.Col>
                </Layout.Row>

                <Layout.Row layout="vertical" gap={16} className="alarm-wrap">
                    {alarmList.map((item) => (
                        <Box
                            variant="info"
                            key={item.id}
                            className={[
                                // 오버셀(재고)·환불(취소) 알림은 클릭 여부와 무관하게 항상 빨간 계열로 강조
                                (item.category === "재고" || item.category === "결제취소") && item.pinned ? "is-oversell" : "",
                                item.id === activeAlarmId ? "is-active" : "",
                            ].filter(Boolean).join(" ")}
                            onClick={() => {
                                if (item.id < 0) return;
                                setActiveAlarmId(item.id);
                                showNotificationDetail(item);
                            }}
                            style={{ cursor: item.id >= 0 ? "pointer" : "default" }}
                        >
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
NotifyWidget.displayName = 'NotifyWidget';

