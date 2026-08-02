import React, { type ReactNode, type ElementType, type HTMLAttributes } from "react";

/**
 * List 컴포넌트 속성 (Props)
 */
export interface ListProps extends HTMLAttributes<HTMLElement> {
    /** * 렌더링할 부모 DOM 태그
     * - Description List(기본형)일 경우 "dl"을 사용합니다.
     * - Bullet List(일반 리스트)일 경우 시맨틱 마크업을 위해 "ul" 또는 "ol"을 권장합니다.
     * @default "dl"
     */
    as?: ElementType;
    /** * 콘텐츠 배치 방향
     * - vertical: 세로 나열 (기본값)
     * - horizontal: 가로 나열
     * @default "vertical"
     */
    layout?: "vertical" | "horizontal";
    /** * 리스트의 전체 텍스트 크기
     * - md: 16px (기본값)
     * - sm: 14px
     * @default "md"
     */
    size?: "md" | "sm";
    /** 리스트 내부에 렌더링될 하위 컴포넌트 (`<List.Item>`) */
    children: ReactNode;
    /** * 리스트 항목 간의 간격 (gap)
     */
    gap?: string | number;
}

/**
 * List.Item 컴포넌트 속성 (Props)
 */
export interface ListItemProps extends HTMLAttributes<HTMLElement> {
    /** 렌더링할 개별 항목의 DOM 태그 */
    as?: ElementType;
    /** * **[핵심 속성]** 라벨 텍스트 또는 노드
     * - 이 속성이 존재하면 **Description List (dt/dd)** 형태로 렌더링됩니다.
     * - 이 속성을 생략하면 **Bullet List (li)** 형태로 렌더링됩니다.
     */
    label?: ReactNode;
    /** 내용(Description)에 들어갈 텍스트 또는 노드 */
    children: ReactNode;
    /** (Description List 전용) 라벨(dt) 영역의 고정 넓이 */
    labelWidth?: string | number;
    /** (Description List 전용) 라벨 텍스트의 색상 */
    labelColor?: string;
    /** 좌측 영역(아이콘/라벨)과 우측 내용(children) 사이의 간격 */
    columnGap?: string | number;
    /** 좌측에 표시될 커스텀 아이콘 노드 */
    icon?: ReactNode;
    /** (Description List 전용) 라벨 텍스트 좌측에 불릿(•) 기호 표시 여부 */
    bullet?: boolean;
    /** (Description List 전용) 라벨과 설명 사이의 점선 구분선 표시 여부 */
    showDivider?: boolean;
    /** 항목 내부 요소들의 수직 정렬 방식 강제 덮어쓰기 */
    align?: "start" | "center" | "end";
}

/**
 * @description 정보를 나열할 때 사용하는 List 컴포넌트입니다.
 * Compound Component 패턴을 사용하며, `<List.Item>`의 `label` 속성 유무에 따라 유연하게 렌더링됩니다.
 */
export const List = Object.assign(
    React.forwardRef<HTMLElement, ListProps>(
        ({ as: Component = "dl", layout = "vertical", size = "md", children, gap, className = "", style, ...props }, ref) => {

            const classes = [
                "list",
                `-${layout}`,
                `-${size}`,
                className
            ].filter(Boolean).join(" ");

            return (
                <Component
                    ref={ref}
                    className={classes}
                    style={{ gap: gap, ...style }}
                    {...props}
                >
                    {children}
                </Component>
            );
        }
    ),
    {
        Item: React.forwardRef<HTMLElement, ListItemProps>(
            ({
                as,
                label,
                children,
                labelWidth = "auto",
                labelColor,
                columnGap,
                icon,
                bullet = false,
                showDivider = true,
                align,
                className = "",
                style,
                ...props
            }, ref) => {
                const isDesc = label !== undefined;
                const Component = as || (isDesc ? "div" : "li");
                const ContentTag = isDesc ? "dd" : "div";
                const widthValue = typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth;

                const classes = [
                    "list-item",
                    isDesc ? "-desc" : "-bullet",
                    className
                ].filter(Boolean).join(" ");

                const mappedAlign = align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;

                return (
                    <Component
                        ref={ref}
                        className={classes}
                        style={{
                            gap: columnGap ?? (isDesc ? undefined : 9),
                            alignItems: mappedAlign,
                            ...style
                        }}
                        {...props}
                    >
                        {isDesc ? (
                            <dt className="term" style={{ width: widthValue }}>
                                {icon && <span className="icon">{icon}</span>}
                                {bullet && <span className="bullet-mark" aria-hidden="true">•</span>}
                                <span className="label" style={{ color: labelColor }}>{label}</span>
                            </dt>
                        ) : (
                            <span className="bullet-mark" aria-hidden="true">
                                {icon || "•"}
                            </span>
                        )}

                        {isDesc && showDivider && (
                            <span className="divider" aria-hidden="true" />
                        )}

                        <ContentTag className="content">
                            {children}
                        </ContentTag>
                    </Component>
                );
            }
        )
    }
);

List.displayName = "List";
List.Item.displayName = "List.Item";