/* eslint-disable react-refresh/only-export-components */
import React, { type ReactNode } from "react";

/**
 * Table 컴포넌트 속성 (Props)
 */
export interface TableProps {
    /** 테이블 내부 엘리먼트 */
    children: ReactNode;
    /** 테이블 정렬 방향 (기본값: "default") */
    variant?: "default" | "vertical" | "horizontal";
    /** 래퍼에 추가될 클래스명 */
    className?: string;
    /** 웹 접근성을 위한 테이블 설명 (스크린 리더용) */
    caption?: ReactNode;
}

/**
 * @description 데이터를 표 형태로 구성하는 통합 Table 컴포넌트입니다.
 * 웹 표준 및 WAI-ARIA 접근성 지침을 준수합니다.
 */
const TableWrapper = ({ children, variant = "default", className = "", caption }: TableProps) => {
    const headerArea = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && (child as React.ReactElement).type === HeaderArea
    );

    const tableContents = React.Children.toArray(children).filter(
        (child) => !(React.isValidElement(child) && (child as React.ReactElement).type === HeaderArea)
    );

    const wrapperClasses = [
        "table-container",
        `-${variant}`,
        className
    ].filter(Boolean).join(" ");

    return (
        <div className={wrapperClasses}>
            {headerArea}
            <table className="table">
                {caption && <caption className="table-caption sr-only">{caption}</caption>}
                {variant === "default" ? tableContents : <tbody>{tableContents}</tbody>}
            </table>
        </div>
    );
};

interface TableLayoutProps {
    children: ReactNode;
    className?: string;
}

const HeaderArea = ({ children, className = "" }: TableLayoutProps) => {
    const classes = ["table-header-area", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};

const HeaderLeft = ({ children, className = "" }: TableLayoutProps) => {
    const classes = ["table-header-left", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};

const HeaderRight = ({ children, className = "" }: TableLayoutProps) => {
    const classes = ["table-header-right", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};

const Head = ({ children, className = "" }: TableLayoutProps) => {
    const classes = ["table-head", className].filter(Boolean).join(" ");
    return <thead className={classes}>{children}</thead>;
};

const Body = ({ children, className = "" }: TableLayoutProps) => {
    const classes = ["table-body", className].filter(Boolean).join(" ");
    return <tbody className={classes}>{children}</tbody>;
};

const Row = ({ children, className = "" }: TableLayoutProps) => {
    const classes = ["table-row", className].filter(Boolean).join(" ");
    return <tr className={classes}>{children}</tr>;
};

interface TableHeaderProps {
    children?: ReactNode;
    /** 필수 입력 항목 표기 활성화 여부 */
    required?: boolean;
    /** 웹 접근성을 위한 제목 셀의 범위 */
    scope?: "col" | "row" | "colgroup" | "rowgroup";
    /** 행 병합 수 */
    rowSpan?: number;
    /** 열 병합 수 */
    colSpan?: number;
    className?: string;
}
const Header = ({ children, required = false, scope, rowSpan, colSpan, className = "" }: TableHeaderProps) => {
    const classes = [
        "table-header",
        required ? "is-required" : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <th className={classes} scope={scope} rowSpan={rowSpan} colSpan={colSpan}>
            {children}
        </th>
    );
};

interface TableCellProps {
    children?: ReactNode;
    /** 열 병합 수 */
    colSpan?: number;
    /** 행 병합 수 */
    rowSpan?: number;
    className?: string;
}
const Cell = ({ children, colSpan, rowSpan, className = "" }: TableCellProps) => {
    const classes = ["table-cell", className].filter(Boolean).join(" ");
    return (
        <td className={classes} colSpan={colSpan} rowSpan={rowSpan}>
            {children}
        </td>
    );
};

export const Table = Object.assign(TableWrapper, {
    HeaderArea,
    HeaderLeft,
    HeaderRight,
    Head,
    Body,
    Row,
    Header,
    Cell,
});

export default Table;