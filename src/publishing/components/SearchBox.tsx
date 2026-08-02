import { type ReactNode } from "react";

/**
 * SearchBox 컴포넌트 속성 (Props)
 */
export interface SearchBoxProps {
    /** 내부에 렌더링될 요소들 */
    children: ReactNode;
    /** 추가로 적용할 클래스명 */
    className?: string;
}

/**
 * SearchBox.Item 컴포넌트 속성 (Props)
 */
export interface SearchBoxItemProps extends SearchBoxProps {
    /** CSS flex 속성 값 */
    flex?: number | string;
    /** 항목의 고정 너비 */
    width?: string | number;
    /** 항목의 입력 필드를 설명하는 라벨 텍스트 또는 노드 */
    label?: string | React.ReactNode;
}

/**
 * @description 복잡한 검색 필터를 구성하는 컨테이너 컴포넌트입니다.
 */
export const SearchBox = ({ children, className = "" }: SearchBoxProps) => {
    const classes = ["searchbox", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};

SearchBox.Content = function SearchBoxContent({ children, className = "" }: SearchBoxProps) {
    const classes = ["searchbox-content", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};

SearchBox.Row = function SearchBoxRow({ children, className = "" }: SearchBoxProps) {
    const classes = ["searchbox-row", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};

SearchBox.Item = function SearchBoxItem({ children, flex, width, label, className = "" }: SearchBoxItemProps) {
    const classes = [
        "searchbox-item",
        className,
        label ? "-has-label" : ""
    ].filter(Boolean).join(" ");

    return (
        <div
            className={classes}
            style={{ flex, width }}
        >
            {label && (
                <span className="form-label">{label}</span>
            )}
            {children}
        </div>
    );
};

SearchBox.Actions = function SearchBoxActions({ children, className = "" }: SearchBoxProps) {
    const classes = ["searchbox-actions", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
};