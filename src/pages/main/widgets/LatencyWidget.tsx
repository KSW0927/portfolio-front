import { useIsDark } from "@/hooks/useIsDark";
import { Box, Card, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types";
import { useOrderSimulationStore } from "@/store/orderSimulationStore";

/**
 * 응답시간 위젯 컴포넌트
 * 주문 시뮬레이션의 평균/P50/P95/P99 응답시간(ms)을 실시간으로 표시.
 */
export const LatencyWidget = (props: WidgetCardProps) => {
    const { } = props;
    const isDark = useIsDark();
    const { orderStats, isRunning } = useOrderSimulationStore();

    return (
        <>
            <div className="widget-oil-content">
                <Card.Header
                    extra={
                        <Typography variant="body-lg" weight="semibold" color={isDark ? "var(--dash-text-disabled)" : ""}>
                            {isRunning ? '처리중...' : `총 ${orderStats.processed}건 처리`}
                        </Typography>
                    }
                >
                    <Space size={4}>
                        <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>응답시간</Typography>
                        <Typography variant="body-md" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>(LATENCY)</Typography>
                    </Space>
                </Card.Header>
                <Card.Body>
                    <Layout.Row layout="vertical" gap={12}>
                        <Box variant="info" className="-blue">
                            <Layout.Col layout="vertical" gap={5}>
                                <Space justify="space-between">
                                    <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>평균</Typography>
                                    <Space size={4}>
                                        <Typography variant="heading-md" primary={!isDark} color={isDark ? "#68B8FF" : ""}>{orderStats.avgLatency}</Typography>
                                        <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>ms</Typography>
                                    </Space>
                                </Space>
                            </Layout.Col>
                        </Box>

                        <Layout.Row gap={12}>
                            <Box variant="info" className="-blue">
                                <Layout.Col layout="vertical" gap={6} align="center">
                                    <Typography variant="body-sm" color={isDark ? "var(--dash-text-primary)" : ""}>P50</Typography>
                                    <Space size={2} align="baseline">
                                        <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>{orderStats.p50Latency}</Typography>
                                        <Typography variant="body-xs" secondary={!isDark} color={isDark ? "#666" : ""}>ms</Typography>
                                    </Space>
                                </Layout.Col>
                            </Box>
                            <Box variant="info" className="-blue">
                                <Layout.Col layout="vertical" gap={6} align="center">
                                    <Typography variant="body-sm" color={isDark ? "var(--dash-text-primary)" : ""}>P95</Typography>
                                    <Space size={2} align="baseline">
                                        <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>{orderStats.p95Latency}</Typography>
                                        <Typography variant="body-xs" color={isDark ? "#666" : ""}>ms</Typography>
                                    </Space>
                                </Layout.Col>
                            </Box>
                            <Box variant="info" className="-blue">
                                <Layout.Col layout="vertical" gap={6} align="center">
                                    <Typography variant="body-sm" color={isDark ? "var(--dash-text-primary)" : ""}>P99</Typography>
                                    <Space size={2} align="baseline">
                                        <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>{orderStats.p99Latency}</Typography>
                                        <Typography variant="body-xs" color={isDark ? "#666" : ""}>ms</Typography>
                                    </Space>
                                </Layout.Col>
                            </Box>
                        </Layout.Row>
                    </Layout.Row>
                </Card.Body>
            </div>
        </>
    );
}
LatencyWidget.displayName = 'LatencyWidget';
