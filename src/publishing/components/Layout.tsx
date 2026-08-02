/* eslint-disable react-refresh/only-export-components */
import { type ReactNode, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, GNB, Icon, LNB, Typography } from "@/publishing/components";

/**
 * Layout.Row 컴포넌트 속성 (Props)
 */
export interface LayoutRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 레이아웃 방향 (가로 배치 기본값) */
    layout?: "horizontal" | "vertical";
    /** 자식 요소 간의 간격 (gap) */
    gap?: number | string;
    /** 주축 정렬 방식 */
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    /** 교차축 정렬 방식 */
    align?: "start" | "end" | "center" | "baseline";
    children?: ReactNode;
}

const Row = ({ layout = "horizontal", gap = "2.0rem", justify, align, className = "", style, children, ...rest }: LayoutRowProps) => {
    const mappedJustify = justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify;
    const mappedAlign = align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;

    const rowStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: layout === "vertical" ? "column" : "row",
        justifyContent: mappedJustify,
        alignItems: mappedAlign,
        gap: gap,
        ...style,
    };

    const classes = ["layout-row", className].filter(Boolean).join(" ");

    return (
        <div className={classes} style={rowStyle} {...rest}>
            {children}
        </div>
    );
};

/**
 * Layout.Col 컴포넌트 속성 (Props)
 */
export interface LayoutColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 레이아웃 방향 (세로 배치 기본값) */
    layout?: "horizontal" | "vertical";
    /** 컬럼의 고정 너비 (미지정 시 flex: 1) */
    width?: number | string;
    /** 자식 요소 간의 간격 (gap) */
    gap?: number | string;
    /** 주축 정렬 방식 */
    justify?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
    /** 교차축 정렬 방식 */
    align?: "start" | "end" | "center" | "baseline";
    children?: ReactNode;
}

const Col = ({ layout = "vertical", width, className = "", gap, justify, align, style, children, ...rest }: LayoutColProps) => {
    const mappedJustify = justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify;
    const mappedAlign = align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;

    const colStyle: React.CSSProperties = {
        flex: width !== undefined ? "none" : 1,
        display: "flex",
        flexDirection: layout === "vertical" ? "column" : "row",
        justifyContent: mappedJustify,
        alignItems: mappedAlign,
        width: width,
        gap: gap,
        minWidth: 0,
        ...style,
    };

    const classes = ["layout-col", className].filter(Boolean).join(" ");

    return (
        <div className={classes} style={colStyle} {...rest}>
            {children}
        </div>
    );
};

/**
 * Layout 컴포넌트 속성 (Props)
 */
export interface LayoutProps {
    /** 메인 콘텐츠 헤더에 표기될 페이지 타이틀 */
    title?: string;
    /** 메인 콘텐츠 헤더 우측에 추가로 표시될 요소 (ex. 신청기간 등) */
    extra?: ReactNode;
    /** 활성화된 좌측 메뉴의 ID */
    activeMenuId?: string;
    /** 메인 영역에 렌더링 될 자식 요소 */
    children: ReactNode;
    /** 즐겨찾기 활성화 여부 (기본값: false) */
    favorite?: boolean;
    /** 레이아웃 최상위 컨테이너에 적용할 추가 클래스명 */
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @description 시스템의 기본 골격이 되는 GNB, LNB, Main Content 구조를 형성하는 레이아웃 컴포넌트입니다.
 */
const LayoutWrapper = ({ activeMenuId, title, extra, children, favorite = true, className = "", style }: LayoutProps) => {
    const isMobile = useIsMobile();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [lnbTheme, setLnbTheme] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleToggleLnb = () => setIsCollapsed(!isCollapsed);
    const handleToggleFavorite = () => setIsFavorite(!isFavorite);

    const favButtonClasses = [
        "button-fav",
        isFavorite ? "-active" : ""
    ].filter(Boolean).join(" ");

    return (
        <div className={`wrap ${className}`} style={style}>
            <GNB
                onThemeChange={(theme) => setLnbTheme(theme)}
                onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
            />

            <div className="container">
                <LNB
                    isCollapsed={isCollapsed}
                    onToggle={handleToggleLnb}
                    activeMenuId={activeMenuId}
                    themeClass={lnbTheme}
                    isMobileMenuOpen={isMobileMenuOpen}
                    onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                    onThemeChange={(theme) => setLnbTheme(theme)}
                />

                <main className="content">
                    <div className="content-inner">
                        {title && (
                            <div className="content-header">
                                <div className="title-wrapper">
                                    <Typography variant={isMobile ? "heading-md" : "heading-xl"} as="h2">{title}</Typography>
                                    {favorite && (
                                        <Button
                                            variant="text"
                                            leftIcon={<Icon name="star-filled" size={isMobile ? 25 : 32} />}
                                            className={favButtonClasses}
                                            aria-label="즐겨찾기"
                                            onClick={handleToggleFavorite}
                                        />
                                    )}
                                </div>
                                {extra && (
                                    <div className="extra-wrapper">
                                        {extra}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="content-body">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div >
    );
};

export const Layout = Object.assign(LayoutWrapper, {
    Row,
    Col,
});