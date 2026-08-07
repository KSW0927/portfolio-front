import { type HTMLAttributes } from "react";

/**
 * Divider 컴포넌트 속성 (Props)
 */
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    /** * 디바이더 방향 (기본값: "horizontal")
     */
    layout?: "horizontal" | "vertical";

    /** * 디바이더의 선 스타일 (기본값: "solid")
     */
    variant?: "solid" | "dashed";

    /** * 디바이더의 길이 (기본값: "100%")
     */
    size?: number | string;

    /** * 여백 (기본값: 0)
     */
    spacing?: number | string;

    /** 디바이더의 색상 (기본값: CSS 변수 처리) */
    color?: string;
}

/**
 * 콘텐츠 사이를 시각적으로 분리해주는 구분선 컴포넌트입니다.
 */
export const Divider = ({
    layout = "horizontal",
    variant = "solid",
    size = "100%",
    spacing = 0,
    className = "",
    color = "",
    style,
    ...props
}: DividerProps) => {
    const isHorizontal = layout === "horizontal";
    const sizeValue = typeof size === "number" ? `${size}px` : size;
    const marginValue = typeof spacing === "number" ? `${spacing}px` : spacing;

    const customStyle: React.CSSProperties = {
        ...(isHorizontal
            ? { width: sizeValue, margin: `${marginValue} auto` }
            : { height: sizeValue, margin: `auto ${marginValue}` }),
        ...(color && { [variant === "dashed" ? "borderColor" : "backgroundColor"]: color }),
        ...style,
    };

    const classes = ["divider", `-${layout}`, `-${variant}`, className]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={classes}
            style={customStyle}
            role="separator"
            aria-orientation={layout}
            {...props}
        />
    );
};