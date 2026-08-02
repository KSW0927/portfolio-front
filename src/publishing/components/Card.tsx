/* eslint-disable react-refresh/only-export-components */
import React, { type HTMLAttributes, type ReactNode } from 'react';

export type CardSize = "sm" | "md" | "lg" | "xl";
export type CardVariant = "default" | "light" | "filled";
export type CardLayout = "vertical" | "horizontal";

/**
 * Card 컴포넌트 속성 (Props)
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    size?: CardSize;
    variant?: CardVariant;
    active?: boolean;
    /* 콘텐츠 배치 방향 (기본값: "vertical") */
    layout?: CardLayout;
}

/**
 * @description 콘텐츠를 묶어 독립적인 그룹으로 표현하는 카드 컨테이너 컴포넌트입니다.
 */
const CardWrapper = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            size = "md",
            variant = "default",
            active = false,
            layout = "vertical",
            className = "",
            onClick,
            onKeyDown,
            children,
            ...props
        },
        ref
    ) => {
        const isClickable = Boolean(onClick);

        const classes = [
            "card",
            `card-${size}`,
            `card-${variant}`,
            `-${layout}`,
            active ? "-active" : "",
            isClickable ? "-clickable" : "",
            className
        ].filter(Boolean).join(" ");

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (isClickable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
            if (onKeyDown) onKeyDown(e);
        };

        return (
            <div
                ref={ref}
                className={classes}
                onClick={onClick}
                onKeyDown={handleKeyDown}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                {...props}
            >
                {children}
            </div >
        );
    }
);
CardWrapper.displayName = "Card";

/**
 * Card.Header 컴포넌트 속성 (Props)
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    leftIcon?: ReactNode;
    extra?: ReactNode;
}
const Header = ({ children, leftIcon, extra, className = "", ...props }: CardHeaderProps) => {
    return (
        <div className={`card-header ${className}`.trim()} {...props}>
            <div className="card-header-left">
                {leftIcon && <span className="card-header-icon">{leftIcon}</span>}
                {children}
            </div>
            {extra && <div className="card-header-extra">{extra}</div>}
        </div>
    );
};

/**
 * Card.Body 컴포넌트 속성 (Props)
 */
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    /* 내부 콘텐츠의 정렬 방향 (기본값: "left") */
    align?: "left" | "center" | "right";
    /** 자식 요소 간의 간격 (gap) */
    gap?: number | string;
}

const Body = ({ children, align, gap, className = "", ...props }: CardBodyProps) => {
    return <div className={`card-body ${className} ${align ? `-${align}` : ""}`.trim()} style={{ gap: gap }} {...props}>{children}</div>;
};

const Actions = ({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) => {
    return <div className={`card-actions ${className}`.trim()} {...props}>{children}</div>;
};

export const Card = Object.assign(CardWrapper, {
    Header,
    Body,
    Actions,
});