/* eslint-disable react-refresh/only-export-components */
import { type HTMLAttributes, type ReactNode } from "react";

/**
 * Popup 컴포넌트 속성 (Props)
 */
export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

/**
 * AlertService.custom() 내부에서 렌더링될 사용자 정의 팝업 콘텐츠 레이아웃 컴포넌트입니다.
 */
const PopupWrapper = ({ children, className = "", ...props }: PopupProps) => {
    const classes = ["popup-content-wrap", className].filter(Boolean).join(" ");

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

/**
 * Popup.Desc 컴포넌트 속성 (Props)
 */
interface PopupDescProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}

/** * 팝업 최상단에 위치하는 안내 문구 영역입니다.
 */
const Desc = ({ children, className = "", ...props }: PopupDescProps) => {
    const classes = ["popup-header-desc", className].filter(Boolean).join(" ");
    return <p className={classes} {...props}>{children}</p>;
};

/**
 * Popup.Body 컴포넌트 속성 (Props)
 */
interface PopupBodyProps extends HTMLAttributes<HTMLDivElement> {
    /** 컨텐츠가 길어질 때 내부 스크롤을 생성할지 여부 (기본값: true) */
    scrollable?: boolean;
    children: ReactNode;
}

/** * 팝업의 메인 컨텐츠 영역입니다.
 */
const Body = ({ scrollable = true, children, className = "", ...props }: PopupBodyProps) => {
    const classes = [
        "popup-body",
        scrollable ? "popup-body-scroll" : "",
        className
    ].filter(Boolean).join(" ");

    return <div className={classes} {...props}>{children}</div>;
};

/** * 팝업 내에서 시각적으로 분리되는 구역입니다.
 */
const Section = ({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) => {
    const classes = ["popup-section", className].filter(Boolean).join(" ");
    return <div className={classes} {...props}>{children}</div>;
};

export const Popup = Object.assign(PopupWrapper, {
    Desc,
    Body,
    Section,
});