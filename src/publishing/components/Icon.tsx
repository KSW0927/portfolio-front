import React, { type HTMLAttributes } from "react";

export type IconSize = number;

/**
 * Icon 컴포넌트 속성 (Props)
 */
export interface IconProps extends HTMLAttributes<HTMLElement> {
    /** 아이콘의 이름 */
    name: string;
    /** 아이콘의 크기 (픽셀 단위, 기본값: 18) */
    size?: IconSize;
    /** 아이콘의 색상 */
    color?: string;
}

/**
 * @description 시스템 전반에서 사용되는 아이콘을 렌더링하는 공통 컴포넌트입니다.
 */
export const Icon = React.forwardRef<HTMLElement, IconProps>(
    (
        {
            name,
            size = 18,
            color,
            className = "",
            style,
            ...props
        },
        ref
    ) => {
        const isColored = Boolean(color || style?.color);

        const classes = [
            "ico",
            `-x${size}`,
            `ico-${name.replace(/_/g, "-")}`,
            isColored ? "-colored" : "",
            className
        ].filter(Boolean).join(" ");

        const combinedStyle: React.CSSProperties = {
            ...style,
            ...(color ? { color } : {}),
            "--icon-size": `${size / 10}rem`,
        } as React.CSSProperties;

        return (
            <i
                ref={ref}
                className={classes}
                aria-hidden="true"
                style={combinedStyle}
                {...props}
            />
        );
    }
);

Icon.displayName = "Icon";