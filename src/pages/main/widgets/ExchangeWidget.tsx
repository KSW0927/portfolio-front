import { useIsDark } from "@/hooks/useIsDark";
import { Box, Card, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";
import { useOrderSimulationStore } from "@/store/orderSimulationStore";

/**
 * 처리량(TPS) 위젯 컴포넌트 (기존 환율 위젯 슬롯 재활용)
 * @description 주문 시뮬레이션의 초당 처리 건수(TPS)를 실시간으로 표시.
 */
export const ExchangeWidget = (props: WidgetCardProps) => {
    const { } = props;
    const isDark = useIsDark();
    const { orderStats, isRunning } = useOrderSimulationStore();

    return (
        <>
            <Card.Header
                extra={
                    <Typography variant="body-lg" weight="semibold" color={isDark ? "var(--dash-text-disabled)" : ""}>
                        {isRunning ? '처리중...' : `${orderStats.processed} / ${orderStats.total}건`}
                    </Typography>
                }
            >
                <Space size={4}>
                    <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>처리량</Typography>
                    <Typography variant="body-md" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>(TPS)</Typography>
                </Space>
            </Card.Header>
            <Card.Body>
                <Box variant="info" className="-blue widget-exchange-content">
                    <Layout.Col layout="vertical" gap={24}>
                        <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>TPS</Typography>

                        <Space size={10} layout="vertical">
                            <Space.Item size={4} align="center" justify="end">
                                <Typography variant="heading-md" primary={!isDark} color={isDark ? "#68B8FF" : ""}>{orderStats.tps}</Typography>
                                <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>건/초</Typography>
                            </Space.Item>

                            <Space.Item size={4} align="center" justify="end">
                                <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>동시성</Typography>
                                <Typography variant="body-sm" as="span" color={isRunning ? "var(--dash-oil-up)" : "var(--dash-text-tertiary)"}>{isRunning ? '진행중' : '대기'}</Typography>
                            </Space.Item>
                        </Space>
                    </Layout.Col>
                </Box>
            </Card.Body>
        </>
    );
}
ExchangeWidget.displayName = 'ExchangeWidget';
