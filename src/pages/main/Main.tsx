import { useRef, useState, useEffect, useMemo } from 'react';
import { DataGrid, type DataGridHandle } from '@/components';

import { Layout } from "@/components";
import { WidgetRenderer } from "./WidgetRenderer";
import type { ColDef, CellClassParams } from "ag-grid-community";
import { ProductStockPanel } from "./components/ProductStockPanel";
import { useOrderSimulationStore, type OrderRow, type OrderStatus } from "@/store/orderSimulationStore";
import { useIsMobile } from "@/hooks/useIsMobile";

/* 주문 시뮬레이션
 * @description order-service의 실제 주문 API(Pessimistic Lock 기반 재고 차감)를 호출해서
 * 동시 주문 처리 흐름을 그리드에 실시간으로 보여줍니다.
 * 구매자는 로그인한 나 한 명이 아니라, 2000명짜리 테스트 구매자 풀 중 매 건마다 랜덤으로 배정해서
 * "여러 명이 동시에 주문한 것"처럼 재현합니다. 요청 자체는 내 로그인 토큰으로 인증됨.
 *
 * 시뮬레이션 실행/재고초기화 버튼과 성능 지표는 위젯(주문 테스트/처리 현황/응답시간/처리량/지연·오류율)으로
 * 이동했습니다. 이 페이지와 위젯들은 모두 useOrderSimulationStore()를 공유해서 같은 데이터를 보여줍니다.
 */

/**
 * 메인 대시보드 페이지
 * @description 포털 메인화면
 */
export default function Main() {
    const headerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const gridRef = useRef<DataGridHandle>(null);

    /* 상태 정의 */
    // 활성화된 팝업 종류
    const [activePopup, setActivePopup] = useState<"widget" | null>(null);

    // 주문 시뮬레이션 상태 (위젯들과 공유하는 zustand 스토어에서 가져옴)
    const { orderRows, productStocks, statusFilter } = useOrderSimulationStore();

    // 토클 팝업 외의 영역 클릭 시 팝업 닫기 처리
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (activePopup && headerRef.current && !headerRef.current.contains(target)) {
                setActivePopup(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activePopup]);

    const orderColumns = useMemo<ColDef<OrderRow>[]>(() => {
        const statusStyleMap: Record<OrderStatus, { bg: string; color: string }> = {
            '대기': { bg: '#2A2F3A', color: '#9098A6' },
            '처리중': { bg: '#3A331F', color: '#F5C242' },
            // 재고 차감(주문 확정)은 이미 끝났지만 결제가 아직 안 끝난 상태 - 처리중과는 다른 톤으로 구분
            '결제대기': { bg: '#1F2E3A', color: '#5AA9E6' },
            '결제완료': { bg: '#1F3326', color: '#4ADE80' },
            '품절': { bg: '#3A2C34', color: '#FF6B6B' },
            // 오버셀 사후 취소 - 품절과 구분되는 톤(보라)으로 "일단 성공했다가 취소됨"을 표시
            '결제취소': { bg: '#332038', color: '#C77DFF' },
        };

        return [
            { headerName: '주문번호', field: 'orderNo', flex: 1, minWidth: 200 },
            { headerName: '상품', field: 'item', flex: 2, minWidth: 280 },
            { headerName: '구매자', field: 'buyerUserNo', flex: 1, minWidth: 140, valueFormatter: (p) => `테스트유저${String(p.value).padStart(4, '0')}` },
            {
                headerName: '상태',
                field: 'status',
                enableCellChangeFlash: true,
                cellStyle: (p: CellClassParams<OrderRow>) => {
                    const style = statusStyleMap[p.value as OrderStatus];
                    return style
                        ? { backgroundColor: style.bg, color: style.color, fontWeight: 600, textAlign: 'center' as const }
                        : undefined;
                },
            },
            {
                headerName: '처리시간',
                field: 'latencyMs',
                enableCellChangeFlash: true,
                valueFormatter: (p) => (p.value == null ? '-' : `${p.value}ms`),
            },
        ];
    }, []);

    const filteredRows = useMemo(() => {
        if (statusFilter === '전체') return orderRows;
        // '주문' 필터는 결제 진행 상태(결제대기/결제완료)와 무관하게 재고 차감에 성공한 건을 전부 포함
        if (statusFilter === '주문') return orderRows.filter(r => r.status === '결제대기' || r.status === '결제완료');
        return orderRows.filter(r => r.status === statusFilter);
    }, [orderRows, statusFilter]);

    return (
        <>
            <Layout.Row layout="vertical" gap={22} className="dashboard-content">
                <div ref={headerRef}>
                    <Layout.Row justify="space-between" className="dashboard-header">
                        <Layout.Col layout="horizontal" align="center" gap={18} style={{ position: "relative" }}>
                        </Layout.Col>
                    </Layout.Row>
                </div>

                <WidgetRenderer />

                {!isMobile && <ProductStockPanel products={productStocks} />}

                {!isMobile && (
                    <DataGrid
                        tref={gridRef}
                        columns={orderColumns}
                        rowData={filteredRows}
                        isPaging={true}
                    />
                )}
            </Layout.Row>
        </>
    );
}
