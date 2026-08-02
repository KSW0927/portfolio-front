import React, { forwardRef } from "react";

/**
 * Space 컴포넌트 속성 (Props)
 */
export interface SpaceProps {
    /** 자식 요소들 사이의 배치 방향 (기본값: "horizontal") */
    layout?: "horizontal" | "vertical";
    /** 자식 요소들 사이의 간격 (숫자 또는 미리 정의된 크기) */
    size?: "sm" | "md" | "lg" | number;
    /** 수직/교차축 정렬 방식 */
    align?: "start" | "end" | "center" | "baseline";
    /** 수평/주축 정렬 방식 */
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    /** 자동 줄바꿈 여부 (가로 방향일 때만 유효) */
    wrap?: boolean;
    /** 아이템 사이에 표시할 구분자 (문자열, 아이콘 등) */
    separator?: React.ReactNode;
    /** 컴포넌트에 추가할 커스텀 클래스명 */
    className?: string;
    /** 컴포넌트에 적용할 인라인 스타일 */
    style?: React.CSSProperties;
    /** 렌더링할 자식 요소들 */
    children?: React.ReactNode;
}

/**
 * @description 컴포넌트들 사이에 일정한 간격을 자동으로 부여해주는 레이아웃 컴포넌트입니다.
 */
export const Space = forwardRef<HTMLDivElement, SpaceProps>(
    (
        {
            layout = "horizontal",
            size = "md",
            align,
            justify,
            wrap = false,
            separator,
            className = "",
            style,
            children,
            ...props
        },
        ref
    ) => {
        const mergedAlign = align === undefined && layout === "horizontal" ? "center" : align;
        const gapValue = typeof size === "number" ? `${size}px` : undefined;

        const containerClasses = [
            "space-container",
            `-${layout}`,
            size && typeof size === "string" ? `-${size}` : "",
            mergedAlign ? `-align-${mergedAlign}` : "",
            justify ? `-justify-${justify}` : "",
            wrap ? "-wrap" : "",
            className,
        ].filter(Boolean).join(" ");

        const containerStyle: React.CSSProperties = {
            ...style,
            ...(gapValue ? { gap: gapValue } : {}),
        };

        const childArray = React.Children.toArray(children).filter(
            (child) => child !== undefined && child !== null && child !== ""
        );

        const nodes = childArray.map((child, index) => {
            const isLast = index === childArray.length - 1;
            return (
                <React.Fragment key={`space-item-${index}`}>
                    {child}
                    {!isLast && separator && (
                        <span className="space-separator">{separator}</span>
                    )}
                </React.Fragment>
            );
        });

        return (
            <div
                ref={ref}
                className={containerClasses}
                style={containerStyle}
                {...props}
            >
                {separator ? nodes : children}
            </div>
        );
    }
) as React.ForwardRefExoticComponent<SpaceProps & React.RefAttributes<HTMLDivElement>> & {
    Item: typeof SpaceItem;
};

Space.displayName = "Space";

/**
 * Space.Item 컴포넌트 속성 (Props)
 */
export interface SpaceItemProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /** 자식 요소들 사이의 배치 방향 (기본값: "horizontal") */
    layout?: "horizontal" | "vertical";
    /** 자식 요소들 사이의 간격 (숫자 또는 미리 정의된 크기) */
    size?: "sm" | "md" | "lg" | number;
    /** 수직/교차축 정렬 방식 */
    align?: "start" | "end" | "center" | "baseline";
    /** 수평/주축 정렬 방식 */
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
}

/**
 * @description Space 내부의 개별 아이템을 감싸는 래퍼 컴포넌트입니다.
 */
const SpaceItem = ({ children, className = "", style, layout = "horizontal", size, align, justify }: SpaceItemProps) => {
    const gapValue = typeof size === "number" ? `${size}px` : undefined;

    const mergedAlign = align === undefined && layout === "horizontal" ? "center" : align;

    const classes = [
        "space-item",
        `-${layout}`,
        size && typeof size === "string" ? `-${size}` : "",
        mergedAlign ? `-align-${mergedAlign}` : "",
        justify ? `-justify-${justify}` : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div
            className={classes}
            style={{ ...(gapValue ? { gap: gapValue } : {}), ...style }}
        >
            {children}
        </div>
    );
};

SpaceItem.displayName = "SpaceItem";
Space.Item = SpaceItem;