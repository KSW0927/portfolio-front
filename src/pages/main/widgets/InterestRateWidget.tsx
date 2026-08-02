import { useIsDark } from "@/hooks/useIsDark";
import { Box, Card, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";
import { useOrderSimulationStore } from "@/store/orderSimulationStore";

/**
 * 실패율 위젯 컴포넌트 (기존 금리 위젯 슬롯 재활용)
 * @description 주문 시뮬레이션의 실패율(품절 등)을 실시간으로 표시.
 * (P50/P95/P99는 응답시간 위젯으로 통합됨)
 */
export const InterestRateWidget = (props: WidgetCardProps) => {
    const { } = props;
    const isDark = useIsDark();
    const { orderStats } = useOrderSimulationStore();

    const failRate = orderStats.processed > 0
        ? Math.round((orderStats.fail / orderStats.processed) * 1000) / 10
        : 0;

    return (
        <>
            <Card.Header
                extra={<Typography variant="body-lg" weight="semibold"
                                   color={isDark ? "var(--dash-text-disabled)" : ""}>{orderStats.processed}건 중 실패</Typography>}
            >
                <Space size={4}>
                    <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>실패율</Typography>
                </Space>
            </Card.Header>
            <Card.Body>
                <Box variant="info" className="-blue widget-interest-rate-content">
                    <Layout.Col layout="vertical" gap={24}>
                        <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>FAIL RATE</Typography>

                        <Space size={10} layout="vertical">
                            <Space.Item size={4} align="center" justify="end">
                                <Typography variant="heading-md" primary={!isDark} color={isDark ? "#68B8FF" : ""}>{failRate}</Typography>
                                <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>%</Typography>
                            </Space.Item>

                            <Space.Item size={10} align="center" justify="end">
                                <Space.Item size={4} align="center">
                                    <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>성공</Typography>
                                    <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">{orderStats.success}건</Typography>
                                </Space.Item>

                                <Space.Item size={4} align="center">
                                    <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>실패</Typography>
                                    <Typography variant="body-sm" as="span" color={failRate > 0 ? "var(--dash-oil-down)" : "var(--dash-oil-up)"}>{orderStats.fail}건</Typography>
                                </Space.Item>
                            </Space.Item>
                        </Space>
                    </Layout.Col>
                </Box>
            </Card.Body>
        </>
    );
}
InterestRateWidget.displayName = 'InterestRateWidget';
