import type { ProductItem } from "@/api/order";

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

/**
 * 제품별 남은 재고 패널
 * @description 주문 시뮬레이션 진행 중 실시간으로 갱신되는 제품별 재고 현황.
 * 모델별로 줄을 나눠서 표시하고, 품절(0개)은 빨간색으로 강조.
 */
export function ProductStockPanel({ products }: ProductStockPanelProps) {
    if (products.length === 0) return null;

    const groups = groupByModel(products);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    return (
        <>
            <h2>재고 (총 {totalStock}개)</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxHeight: 250,
                    overflowY: "auto",
                    padding: 10,
                    border: "1px solid #2A2F3A",
                    borderRadius: 8,
                }}
            >
                {groups.map((group) => (
                    <div key={group.model} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--dash-text-primary)", minWidth: 150 }}>
                            {group.model}
                        </span>
                        {group.items.map((p) => (
                            <span
                                key={p.detailId}
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: 999,
                                    fontSize: "1.2rem",
                                    fontWeight: 600,
                                    backgroundColor: p.stock === 0 ? "#3A2C34" : "#252B3A",
                                    color: p.stock === 0 ? "#FF6B6B" : "#C7CCD6",
                                }}
                            >
                                {p.storage} {p.color}: {p.stock}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
