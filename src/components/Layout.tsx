/* eslint-disable react-refresh/only-export-components */
import { type ReactNode } from "react";

/**
 * Layout.Row 컴포넌트 속성 (Props)
 */
export interface LayoutRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 레이아웃 방향 (가로 배치 기본값) */
    layout?: "horizontal" | "vertical";
    /** 자식 요소 간의 간격 (gap) */
    gap?: number | string;
    /** 주축 정렬 방식 */
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    /** 교차축 정렬 방식 */
    align?: "start" | "end" | "center" | "baseline";
    children?: ReactNode;
}

const Row = ({ layout = "horizontal", gap = "2.0rem", justify, align, className = "", style, children, ...rest }: LayoutRowProps) => {
    const mappedJustify = justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify;
    const mappedAlign = align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;

    const rowStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: layout === "vertical" ? "column" : "row",
        justifyContent: mappedJustify,
        alignItems: mappedAlign,
        gap: gap,
        ...style,
    };

    const classes = ["layout-row", className].filter(Boolean).join(" ");

    return (
        <div className={classes} style={rowStyle} {...rest}>
            {children}
        </div>
    );
};

/**
 * Layout.Col 컴포넌트 속성 (Props)
 */
export interface LayoutColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 레이아웃 방향 (세로 배치 기본값) */
    layout?: "horizontal" | "vertical";
    /** 컬럼의 고정 너비 (미지정 시 flex: 1) */
    width?: number | string;
    /** 자식 요소 간의 간격 (gap) */
    gap?: number | string;
    /** 주축 정렬 방식 */
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    /** 교차축 정렬 방식 */
    align?: "start" | "end" | "center" | "baseline";
    children?: ReactNode;
}

const Col = ({ layout = "vertical", width, className = "", gap, justify, align, style, children, ...rest }: LayoutColProps) => {
    const mappedJustify = justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify;
    const mappedAlign = align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;

    const colStyle: React.CSSProperties = {
        flex: width !== undefined ? "none" : 1,
        display: "flex",
        flexDirection: layout === "vertical" ? "column" : "row",
        justifyContent: mappedJustify,
        alignItems: mappedAlign,
        width: width,
        gap: gap,
        minWidth: 0,
        ...style,
    };

    const classes = ["layout-col", className].filter(Boolean).join(" ");

    return (
        <div className={classes} style={colStyle} {...rest}>
            {children}
        </div>
    );
};

/**
 * @description GNB/LNB를 포함한 전체 페이지 골격(LayoutWrapper)은 라이브 렌더 트리 어디서도
 * 쓰이지 않아 제거함. Layout.Row/Layout.Col만 위젯들에서 실제로 사용 중이라 유지.
 */
export const Layout = {
    Row,
    Col,
};