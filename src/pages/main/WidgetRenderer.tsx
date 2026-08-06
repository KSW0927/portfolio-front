import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useWidgetStore } from "@/store/widgetStore";
import { Card } from "@/components";

import "swiper/css";
import "swiper/css/pagination";
import cn from "classnames";

/**
 * 위젯 렌더러 컴포넌트 Props
 */
interface WidgetRendererProps {
    onChange?: () => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = (props: WidgetRendererProps) => {
    const { onChange } = props;
    const { widgets, getWidgetDetailById } = useWidgetStore();
    const gridRef = useRef<HTMLDivElement>(null);
    const rectsRef = useRef<Map<string, DOMRect>>(new Map());
    const visibleWidgets = widgets.filter(w => w.visible);

    // FLIP 애니메이션 처리
    useLayoutEffect(() => {
        if (!gridRef.current) return;
        (Array.from(gridRef.current.children) as HTMLElement[]).forEach((child) => {
            const id = child.dataset.id;
            if (!id) return;

            const newRect = child.getBoundingClientRect();
            const oldRect = rectsRef.current.get(id);

            if (oldRect) {
                const dx = oldRect.left - newRect.left;
                const dy = oldRect.top - newRect.top;

                if (dx !== 0 || dy !== 0) {
                    child.style.transform = `translate(${dx}px, ${dy}px)`;
                    child.style.transition = "none";
                    requestAnimationFrame(() => {
                        child.style.transform = "";
                        child.style.transition = "transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)";
                    });
                }
            }
            rectsRef.current.set(id, newRect);
        });
    }, [widgets]);


    /* 상태 정의 */
    // 활성화된 위젯 설정 팝업의 위젯ID
    const [activeKebabId, setActiveKebabId] = useState<string | null>(null);

    // 위젯 설정 팝업 외의 영역 클릭 시 팝업 닫기 처리
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (!target.closest('.button-expand-widget') && !target.closest('.widget-setting-popup') && !target.closest('.button-widget-settings')) {
                setActiveKebabId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    /* 이벤트 정의 */
    // 위젯 설정팝업 활성화ID 초기화
    const handleResetActiveKabab = useCallback((id: string | null) => {
        setActiveKebabId(id);
    }, []);

    return (
        <div
            ref={gridRef}
            className={cn('widget-grid')}
        >
            {visibleWidgets.map((widget) => {
                const widgetDetail = getWidgetDetailById(widget.id);
                const WidgetContent = widgetDetail?.component;
                const addstrWidgetType = widgetDetail?.type ?? "";

                return (
                    <Card
                        key={widget.id}
                        data-id={widget.id}
                        className={cn(`widget-card -size-${widget.size}`, addstrWidgetType)}
                    >
                        { !widgetDetail && (
                            <div style={{ padding: 24, textAlign: "center", color: "var(--dash-text-secondary)" }}>
                                콘텐츠 영역
                            </div>
                        )}
                        { WidgetContent && (
                            <WidgetContent
                                activeKebabId={activeKebabId}
                                widget={widgetDetail}
                                changeActiveKebab={handleResetActiveKabab}
                            />
                        )}
                    </Card>
                );
            })}
        </div>
    );
};