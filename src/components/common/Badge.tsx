import React, { type HTMLAttributes, type ReactNode } from "react";

export type BadgeVariant = "solid" | "filled" | "outlined";
export type BadgeColor = "blue" | "gray" | "red" | "green" | "yellow";
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Badge 컴포넌트 속성 (Props)
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** 뱃지의 시각적 스타일 (기본값: "solid") */
    variant?: BadgeVariant;
    /** 뱃지의 테마 색상 (기본값: "blue") */
    color?: BadgeColor;
    /** 뱃지의 크기 (기본값: "md") */
    size?: BadgeSize;
    /** 뱃지 모서리의 둥글기 적용 여부 */
    rounded?: boolean;
    /** 작은 점 형태(Dot) 표기 여부 */
    dot?: boolean;
    /** 뱃지 내부에 표시할 콘텐츠 (텍스트 또는 아이콘 등) */
    children?: ReactNode;
}

/**
 * 상태, 알림, 카테고리 등을 강조하여 표시하는 뱃지 컴포넌트입니다.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            variant = "solid",
            color = "blue",
            size = "md",
            rounded = false,
            dot = false,
            className = "",
            children,
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        const hasChildren = React.Children.count(children) > 0;

        if (process.env.NODE_ENV !== "production") {
            if (dot && !ariaLabel && !props.title) {
                console.warn(
                    `A11y Warning: 텍스트가 없는 Dot 뱃지는 스크린 리더 사용자를 위해 "aria-label" 또는 "title" 속성을 제공하는 것이 좋습니다.`
                );
            }
        }

        const classes = [
            "badge",
            `-${variant}`,
            `-${color}`,
            `-${size}`,
            rounded ? "-rounded" : "",
            dot ? (hasChildren ? "-dot-text" : "-dot") : "",
            className,
        ].filter(Boolean).join(" ");

        return (
            <span
                ref={ref}
                className={classes}
                aria-label={ariaLabel}
                {...props}
            >
                {dot && hasChildren && <span className="badge-dot-icon" aria-hidden="true" />}
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";