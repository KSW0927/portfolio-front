import { useIsDark } from "@/hooks/useIsDark";
import { Box, Button, Card, Icon, Layout, Space, Switch, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";
import { useOrderSimulationStore } from "@/store/orderSimulationStore";

/**
 * 옵션 설정 위젯 컴포넌트
 * @description 100/500/1000건 주문 시뮬레이션 실행 + 재고 초기화 버튼 + Pessimistic Lock 적용/미적용 스위치.
 * 락을 꺼두면 동시 요청 시 lost-update(오버셀)가 재현되어 락의 효과를 비교 시연할 수 있음.
 * 실제 동작은 orderSimulationStore(zustand)에 있고, 이 위젯은 그 액션을 호출만 함.
 */
export const ApprovalWidget = (props: WidgetCardProps) => {
    const { activeKebabId, widget, changeActiveKebab, changeHide, changeExpand } = props;
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;

    const { isRunning, isResetting, lockEnabled, setLockEnabled, runSimulation, handleReset } = useOrderSimulationStore();
    const disabled = isRunning || isResetting;

    const items: { label: string; sub: string; onClick: () => void; icon?: string }[] = [
        { label: '100', sub: '건 주문', onClick: () => void runSimulation(100) },
        { label: '500', sub: '건 주문', onClick: () => void runSimulation(500) },
        { label: '1000', sub: '건 주문', onClick: () => void runSimulation(1000) },
        { label: '재고 초기화', sub: '', onClick: () => void handleReset(), icon: 'reset' },
    ];

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
                <Space size={8} align="center">
                    <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} color={isDark ? "var(--dash-text-disabled)" : "var(--dash-text-tertiary)"} />}>
                        <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>{widget.title}</Typography>
                    </Button>
                    {disabled && (
                        <Typography variant="body-sm" as="span" color="var(--dash-text-secondary)">
                            {isRunning ? '처리중...' : '초기화중...'}
                        </Typography>
                    )}
                </Space>
            </Card.Header>

            <Card.Body>
                <Space justify="space-between" align="center" style={{ marginBottom: 10 }}>
                    <Typography variant="body-sm" as="span" color={isDark ? "var(--dash-text-secondary)" : ""}>
                        Pessimistic Lock
                    </Typography>
                    <Switch
                        labelPlacement="left"
                        checked={lockEnabled}
                        disabled={disabled}
                        onChange={(e) => setLockEnabled(e.target.checked)}
                    >
                        <Typography variant="body-sm" as="span" color={lockEnabled ? "var(--dash-oil-up)" : "var(--dash-oil-down)"}>
                            {lockEnabled ? '락 적용' : '락 미적용'}
                        </Typography>
                    </Switch>
                </Space>

                <div className="widget-approval-content">
                    {items.map((item) => (
                        <Box
                            key={item.label}
                            variant="info"
                            className="-blue"
                            onClick={disabled ? undefined : item.onClick}
                            role="button"
                            tabIndex={disabled ? -1 : 0}
                            style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}
                        >
                            <Layout.Col layout="vertical" gap={5}>
                                <Space justify="space-between">
                                    {item.icon && <Icon name={item.icon} size={20} />}
                                </Space>
                                <Space size={4} align="baseline" justify="end">
                                    <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>{item.label}</Typography>
                                    <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>{item.sub}</Typography>
                                </Space>
                            </Layout.Col>
                        </Box>
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
ApprovalWidget.displayName = 'ApprovalWidget';
