import { useIsDark } from "@/hooks/useIsDark";
import { Button, Card, Box, Divider, Icon, Layout, Space, Typography } from "@/components";
import type { WidgetCardProps } from "@/types/types.ts";
import { useOrderSimulationStore, type StatusFilter } from "@/store/orderSimulationStore";

/**
 * 처리 현황 위젯 컴포넌트
 * @description 주문 시뮬레이션 상태별 건수를 실시간으로 표시.
 * 주문/품절/결제대기/결제완료/결제취소 클릭 시 그리드의 상태 필터를 토글해서 연동됨.
 * 오버셀은 배치 단위 집계값이라 개별 주문 행 상태가 아니므로 필터 대상에서 제외.
 */
export const StatusWidget = (props: WidgetCardProps) => {
    const {widget} = props;
    const isDark = useIsDark();

    const { orderStats, statusFilter, setStatusFilter, stockIntegrity } = useOrderSimulationStore();

    const toggleFilter = (target: Exclude<StatusFilter, '전체'>) => {
        setStatusFilter(statusFilter === target ? '전체' : target);
    };
    const isDimmed = (target: StatusFilter) => statusFilter !== '전체' && statusFilter !== target;

    return (
        <>
            <Card.Header>
                <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>{widget.title}</Typography>
            </Card.Header>

            <Card.Body>
                <span
                    style={{
                        display: 'inline-block',
                        marginBottom: 10,
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1.6,
                        border: '1px solid #5AA9E6',
                        color: '#5AA9E6',
                    }}
                >
                    상태값을 클릭하면 아래 그리드가 필터링됩니다.
                </span>

                <Box variant="info" className="-blue widget-leave-content">
                    <Layout.Col
                        layout="vertical" gap={49}
                        onClick={() => toggleFilter('주문')}
                        style={{ cursor: 'pointer', opacity: isDimmed('주문') ? 0.5 : 1 }}
                    >
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>주문</Typography>
                            <Icon name="completed" size={20} color="#4C6FFF" />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color="#4C6FFF">{orderStats.success}</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>

                    <Divider layout="vertical" variant="dashed" spacing={14} color={isDark ? "var(--dash-bg-deep)" : ""} />

                    <Layout.Col
                        layout="vertical" gap={49}
                        onClick={() => toggleFilter('품절')}
                        style={{ cursor: 'pointer', opacity: isDimmed('품절') ? 0.5 : 1 }}
                    >
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>품절</Typography>
                            <Icon name="rejected" size={20} color="#FFB020" />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color="#FFB020">{orderStats.fail}</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>
                </Box>

                {(() => {
                    // 결제대기 + 결제완료 + 취소 세 값의 합은 항상 주문(success) 건수와 같다.
                    const paymentPending = Math.max(0, orderStats.success - orderStats.paymentCompleted - orderStats.cancelled);
                    return (
                        <Box variant="info" className="-blue widget-leave-content" style={{ marginTop: 12 }}>
                            <Layout.Col
                                layout="vertical" gap={49}
                                onClick={() => toggleFilter('결제대기')}
                                style={{ cursor: 'pointer', opacity: isDimmed('결제대기') ? 0.5 : 1 }}
                            >
                                <Space justify="space-between">
                                    <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>결제대기</Typography>
                                    <Icon name="pending" size={20} color="#5AA9E6" />
                                </Space>
                                <Space size={4} align="baseline" justify="end">
                                    <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color="#5AA9E6">{paymentPending}</Typography>
                                    <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                                </Space>
                            </Layout.Col>

                            <Divider layout="vertical" variant="dashed" spacing={14} color={isDark ? "var(--dash-bg-deep)" : ""} />

                            <Layout.Col
                                layout="vertical" gap={49}
                                onClick={() => toggleFilter('결제완료')}
                                style={{ cursor: 'pointer', opacity: isDimmed('결제완료') ? 0.5 : 1 }}
                            >
                                <Space justify="space-between">
                                    <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>결제완료</Typography>
                                    <Icon name="completed" size={20} color="#4ADE80" />
                                </Space>
                                <Space size={4} align="baseline" justify="end">
                                    <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color="#4ADE80">{orderStats.paymentCompleted}</Typography>
                                    <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                                </Space>
                            </Layout.Col>
                        </Box>
                    );
                })()}

                <Box variant="info" className="-blue widget-leave-content" style={{ marginTop: 12 }}>
                    <Layout.Col layout="vertical" gap={49}>
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>오버셀</Typography>
                            <Icon name="warning" size={20} color="#FF6B6B" />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color="#FF6B6B">{stockIntegrity?.lostUnits ?? 0}</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>

                    <Divider layout="vertical" variant="dashed" spacing={14} color={isDark ? "var(--dash-bg-deep)" : ""} />

                    <Layout.Col
                        layout="vertical" gap={49}
                        onClick={() => toggleFilter('결제취소')}
                        style={{ cursor: 'pointer', opacity: isDimmed('결제취소') ? 0.5 : 1 }}
                    >
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>결제취소</Typography>
                            <Icon name="rejected" size={20} color="#C77DFF" />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color="#C77DFF">{orderStats.cancelled}</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>
                </Box>
            </Card.Body>

            {widget.hasAction && (
                <Card.Actions>
                    <Button fullWidth onClick={widget.action}>{widget.actionTitle}</Button>
                </Card.Actions>
            )}
        </>
    );
}
StatusWidget.displayName = 'StatusWidget';
