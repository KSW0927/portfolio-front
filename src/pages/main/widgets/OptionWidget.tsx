import { useIsDark } from "@/hooks/useIsDark";
import { Box, Button, Card, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types";
import { useOrderSimulationStore } from "@/store/orderSimulationStore";
import type { LockStrategy } from "@/api/order";

/**
 * 락 전략 선택지 - 3단계 세그먼트 버튼으로 표시
 * NONE(락 없음)/PESSIMISTIC(DB 락)/DISTRIBUTED(분산락) 중 하나를 골라
 * 동시 요청이 몰릴 때 재고 차감을 어떻게 순차화할지 비교 시연함.
 */
const LOCK_STRATEGIES: { value: LockStrategy; label: string; color: string }[] = [
    { value: 'NONE', label: '락 없음', color: '#FF6B6B' },
    { value: 'PESSIMISTIC', label: 'DB 락', color: '#5AA9E6' },
    { value: 'DISTRIBUTED', label: '분산락', color: '#C77DFF' },
];

/**
 * 옵션 설정 위젯 컴포넌트
 * 100/500/1000건 주문 시뮬레이션 실행 + 재고 초기화 버튼 + 락 전략(락없음/DB락/분산락) 선택.
 * 락 없음을 고르면 동시 요청 시 lost-update(오버셀)가 재현되어 락의 효과를 비교 시연할 수 있음.
 * 실제 동작은 orderSimulationStore(zustand)에 있고, 이 위젯은 그 액션을 호출만 함.
 */
export const OptionWidget = (props: WidgetCardProps) => {
    const {widget} = props;
    const isDark = useIsDark();

    const { isRunning, isResetting, lockStrategy, setLockStrategy, runSimulation, handleReset } = useOrderSimulationStore();
    const disabled = isRunning || isResetting;

    const resetItem: { label: string; sub: string; onClick: () => void } = {
        label: '재고 초기화', sub: '', onClick: () => void handleReset(),
    };
    const orderCountItems: { label: string; sub: string; onClick: () => void }[] = [
        { label: '100', sub: '건', onClick: () => void runSimulation(100) },
        { label: '500', sub: '건', onClick: () => void runSimulation(500) },
        { label: '1000', sub: '건', onClick: () => void runSimulation(1000) },
    ];

    return (
        <div className="widget-option-content">
            <Card.Header>
                <Space size={8} align="center">
                    <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>{widget.title}</Typography>
                    <Typography variant="body-md" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>(OPTION)</Typography>
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
                        락 전략
                    </Typography>
                    <Space size={6}>
                        {LOCK_STRATEGIES.map((s) => {
                            const active = lockStrategy === s.value;
                            return (
                                <button
                                    key={s.value}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => setLockStrategy(s.value)}
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: 6,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        lineHeight: 1.6,
                                        cursor: disabled ? 'not-allowed' : 'pointer',
                                        border: `1px solid ${s.color}`,
                                        backgroundColor: active ? s.color : 'transparent',
                                        color: active ? '#fff' : s.color,
                                        opacity: disabled ? 0.5 : 1,
                                    }}
                                >
                                    {s.label}
                                </button>
                            );
                        })}
                    </Space>
                </Space>

                <Layout.Row layout="vertical" gap={12}>
                    <Box
                        variant="info"
                        className="-blue"
                        onClick={disabled ? undefined : resetItem.onClick}
                        role="button"
                        tabIndex={disabled ? -1 : 0}
                        style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}
                    >
                        <Layout.Col layout="vertical" gap={5} align="center">
                            <Space size={4} align="baseline" justify="center">
                                <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>{resetItem.label}</Typography>
                            </Space>
                        </Layout.Col>
                    </Box>

                    <Layout.Row gap={12}>
                        {orderCountItems.map((item) => (
                            <Box
                                key={item.label}
                                variant="info"
                                className="-blue"
                                onClick={disabled ? undefined : item.onClick}
                                role="button"
                                tabIndex={disabled ? -1 : 0}
                                style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}
                            >
                                <Layout.Col layout="vertical" gap={5} align="center">
                                    <Space size={4} align="baseline" justify="end" wrap>
                                        <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1, whiteSpace: 'nowrap' }} color={isDark ? "var(--dash-text-primary)" : ""}>{item.label}</Typography>
                                        <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>{item.sub}</Typography>
                                    </Space>
                                </Layout.Col>
                            </Box>
                        ))}
                    </Layout.Row>
                </Layout.Row>
            </Card.Body>

            {widget.hasAction && (
                <Card.Actions>
                    <Button fullWidth onClick={widget.action}>{widget.actionTitle}</Button>
                </Card.Actions>
            )}
        </div>
    );
}
OptionWidget.displayName = 'OptionWidget';
