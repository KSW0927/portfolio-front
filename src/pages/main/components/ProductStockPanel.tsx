import type { ProductItem } from "@/api/order";
import { Card, Layout, Space, Typography } from "@/components";
import { useIsDark } from "@/hooks/useIsDark";

interface ProductStockPanelProps {
    products: ProductItem[];
}

interface ProductGroup {
    model: string;
    items: ProductItem[];
}

/**
 * detailId 순서(=모델 단위로 시딩된 순서)를 그대로 이용해 모델별로 묶는다.
 */
function groupByModel(products: ProductItem[]): ProductGroup[] {
    const groups: ProductGroup[] = [];
    for (const p of products) {
        const last = groups[groups.length - 1];
        if (last && last.model === p.model) {
            last.items.push(p);
        } else {
            groups.push({ model: p.model, items: [p] });
        }
    }
    return groups;
}

interface ProductStockListProps {
    products: ProductItem[];
    maxHeight?: number | string;
}

/**
 * 모델별 재고 목록 (Card 래퍼 없이 내용만)
 * ProductStockPanel(데스크톱 단독 카드)과 StatusWidget(모바일, 처리현황 위젯 내부 여백)에서
 * 같은 목록 렌더링 로직을 공유하기 위해 분리.
 */
export function ProductStockList({ products, maxHeight = 250 }: ProductStockListProps) {
    const isDark = useIsDark();
    if (products.length === 0) return null;

    const groups = groupByModel(products);

    return (
        <Layout.Row layout="vertical" gap={10} style={{ maxHeight, overflowY: "auto" }}>
            {groups.map((group) => (
                <Layout.Row key={group.model} gap={6} style={{ flexWrap: "wrap", alignItems: "center" }}>
                    <Typography variant="body-sm" weight="semibold" style={{ minWidth: 150 }} color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>
                        {group.model}
                    </Typography>
                    <Space size={6} style={{ flexWrap: "wrap" }}>
                        {group.items.map((p) => (
                            <span
                                key={p.detailId}
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: 999,
                                    fontSize: "1.2rem",
                                    fontWeight: 600,
                                    backgroundColor: p.stock === 0 ? "#3A2C34" : "var(--dash-bg-info-wrap)",
                                    color: p.stock === 0 ? "#FF6B6B" : "var(--dash-text-secondary)",
                                }}
                            >
                                {p.storage} {p.color}: {p.stock}
                            </span>
                        ))}
                    </Space>
                </Layout.Row>
            ))}
        </Layout.Row>
    );
}

/**
 * 제품별 남은 재고 패널
 * 주문 시뮬레이션 진행 중 실시간으로 갱신되는 제품별 재고 현황.
 * 모델별로 줄을 나눠서 표시하고, 품절(0개)은 빨간색으로 강조.
 * 위젯 카드(widget-card)와 동일한 컨테이너 스타일을 써서 대시보드 톤을 맞춘다.
 */
export function ProductStockPanel({ products }: ProductStockPanelProps) {
    const isDark = useIsDark();
    if (products.length === 0) return null;

    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    return (
        <Card className="widget-card -size-lg">
            <Card.Header extra={<Typography variant="body-md" as="span" color={isDark ? "var(--dash-text-tertiary)" : "var(--dash-text-secondary)"}>총 {totalStock}개</Typography>}>
                <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>재고</Typography>
            </Card.Header>

            <Card.Body>
                <ProductStockList products={products} />
            </Card.Body>
        </Card>
    );
}
