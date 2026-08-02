import React, { type ComponentPropsWithoutRef, type ElementType } from "react";

export type TypographyVariant =
    | "display-xl" | "display-lg" | "heading-xl" | "heading-lg" | "heading-md"
    | "heading-sm" | "heading-xs" | "body-lg" | "body-md" | "body-sm" | "body-xs";

export type TypographyWeight = "semibold" | "medium";

/**
 * Typography 컴포넌트 속성 (Props)
 */
export type TypographyProps<T extends ElementType> = {
    /** 텍스트 크기 및 스타일 종류 */
    variant: TypographyVariant;
    /** 폰트 굵기 (기본값: "medium") */
    weight?: TypographyWeight;
    /** 브랜드 컬러(Primary) 적용 여부 */
    primary?: boolean;
    /** 컬러(Secondary) 적용 여부 */
    secondary?: boolean;
    /** 컬러(Tertiary) 적용 여부 */
    tertiary?: boolean;
    /** 커스텀 텍스트 색상 (인라인 스타일) */
    color?: string;
    /** 렌더링될 실제 DOM 태그 (미지정 시 variant 기반 추론) */
    as?: T;
    /** 텍스트 콘텐츠 */
    children: React.ReactNode;
    /** 추가 클래스명 */
    className?: string;
    /** 인라인 스타일 */
    style?: React.CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "variant" | "weight" | "as" | "children" | "className">;

const defaultElementMap: Record<TypographyVariant, ElementType> = {
    "display-xl": "h1",
    "display-lg": "h1",
    "heading-xl": "h1",
    "heading-lg": "h2",
    "heading-md": "h3",
    "heading-sm": "h4",
    "heading-xs": "h5",
    "body-lg": "p",
    "body-md": "p",
    "body-sm": "p",
    "body-xs": "p",
};

/**
 * @description 시스템 디자인의 타이포그래피 규칙을 일관되게 적용하는 텍스트 컴포넌트입니다.
 */
export const Typography = <T extends ElementType = "span">({
    variant,
    weight = "medium",
    primary = false,
    secondary = false,
    tertiary = false,
    color,
    as,
    children,
    className = "",
    style,
    ...props
}: TypographyProps<T>) => {
    const Component = as || defaultElementMap[variant];

    const isBody = variant.startsWith("body-");
    const typographyClass = isBody
        ? `${variant}-${weight}`
        : `${variant}`;

    const classes = [
        typographyClass,
        `${primary ? "text-primary" : ""}`,
        `${secondary ? "text-secondary" : ""}`,
        `${tertiary ? "text-tertiary" : ""}`,
        className
    ].filter(Boolean).join(" ");

    return (
        <Component className={classes} style={{ color: color, ...style }} {...props}>
            {children}
        </Component>
    );
};