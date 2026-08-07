import { type ReactNode, type HTMLAttributes } from 'react';

/**
 * Box 컴포넌트 속성 (Props)
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    /** 박스의 시각적 스타일 변형 (기본값: "default") */
    variant?: "default" | "info" | "inner";
    /** 박스 패딩/크기 지정 */
    size?: "lg" | string;
    /** 자식 요소 간의 간격 (gap) */
    gap?: number | string;
    /** 박스의 배경 색상 (CSS color 값) */
    bgColor?: string;
    /** 박스의 테두리 색상 — 지정 시 1px solid {색상}으로 적용 */
    borderColor?: string;
    /** 상하좌우 패딩 (CSS padding 값) */
    padding?: number | string;
    /** 위쪽 패딩 */
    paddingTop?: number | string;
    /** 오른쪽 패딩 */
    paddingRight?: number | string;
    /** 아래쪽 패딩 */
    paddingBottom?: number | string;
    /** 왼쪽 패딩 */
    paddingLeft?: number | string;
    /** 박스의 높이를 100%로 채울지 여부 */
    fullHeight?: boolean;
    /** 박스 상단 헤더 영역 (타이틀 등) */
    header?: ReactNode;
    /** 내부 콘텐츠 */
    children: ReactNode;
}

/**
 * 컨텐츠 그룹을 시각적으로 묶어주는 기본 박스 컨테이너 컴포넌트입니다.
 */
export const Box = ({
    variant = "default",
    size,
    children,
    gap,
    bgColor,
    borderColor,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    fullHeight,
    header,
    className = "",
    ...props
}: BoxProps) => {
    const classes = [
        "box",
        `box-${variant}`,
        size ? `-${size}` : "",
        fullHeight ? "-h-full" : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <div className={classes} style={{ gap: gap, backgroundColor: bgColor, border: borderColor ? `1px solid ${borderColor}` : undefined, padding, paddingTop, paddingRight, paddingBottom, paddingLeft }} {...props}>
            {header && (
                <div className="box-header">
                    {header}
                </div>
            )}
            {children}
        </div>
    );
};