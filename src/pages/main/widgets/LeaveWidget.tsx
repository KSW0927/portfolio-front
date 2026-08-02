import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Box, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";
import { useOrderSimulationStore } from "@/store/orderSimulationStore";

/**
 * 처리 현황 위젯 컴포넌트
 * @description 주문 시뮬레이션 성공/실패 건수를 실시간으로 표시.
 * 클릭 시 그리드의 상태 필터(성공/실패)를 토글해서 연동됨.
 */
export const LeaveWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab, changeHide, changeExpand } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;

    const { orderStats, statusFilter, setStatusFilter, stockIntegrity } = useOrderSimulationStore();

    const toggleFilter = (target: '성공' | '실패') => {
        setStatusFilter(statusFilter === target ? '전체' : target);
    };

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
                <Box variant="info" className="-blue widget-leave-content">
                    <Layout.Col
                        layout="vertical" gap={49}
                        onClick={() => toggleFilter('성공')}
                        style={{ cursor: 'pointer', opacity: statusFilter === '실패' ? 0.5 : 1 }}
                    >
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>성공</Typography>
                            <Icon name="completed" size={20} />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>{orderStats.success}</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>

                    <Divider layout="vertical" variant="dashed" spacing={14} color={isDark ? "var(--dash-bg-deep)" : ""} />

                    <Layout.Col
                        layout="vertical" gap={49}
                        onClick={() => toggleFilter('실패')}
                        style={{ cursor: 'pointer', opacity: statusFilter === '성공' ? 0.5 : 1 }}
                    >
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>실패</Typography>
                            <Icon name="rejected" size={20} />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>{orderStats.fail}</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>
                </Box>

                {stockIntegrity && (
                    <Space
                        justify="space-between" align="center"
                        style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, backgroundColor: stockIntegrity.lostUnits > 0 ? "#3A2C34" : "#1F3326" }}
                    >
                        <Typography variant="body-xs" as="span" color={stockIntegrity.lostUnits > 0 ? "#FF6B6B" : "#4ADE80"}>
                            재고 정합성 ({stockIntegrity.lockEnabled ? '락 적용' : '락 미적용'})
                        </Typography>
                        <Typography variant="body-xs" as="span" color={stockIntegrity.lostUnits > 0 ? "#FF6B6B" : "#4ADE80"}>
                            예상재고 : {stockIntegrity.expectedTotal} / 실제재고 {stockIntegrity.actualTotal}
                            {stockIntegrity.lostUnits > 0 ? ` (유실 : ${stockIntegrity.lostUnits}개)` : ' (일치)'}
                        </Typography>
                    </Space>
                )}
            </Card.Body>

            {widget.hasAction && (
                <Card.Actions>
                    <Button fullWidth onClick={widget.action}>{widget.actionTitle}</Button>
                </Card.Actions>
            )}
        </>
    );
}
LeaveWidget.displayName = 'LeaveWidget';
