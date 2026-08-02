import React, { forwardRef, useState } from "react";
import { Icon } from "@/components";

/**
 * Collapse 컴포넌트 속성 (Props)
 */
export interface CollapseProps {
    /** 헤더에 표시될 제목 */
    title: React.ReactNode;
    /** 외부에서 제어하는 열림 상태 */
    isOpen?: boolean;
    /** 토글 시 실행될 콜백 함수 */
    onToggle?: () => void;
    /** 펼쳐졌을 때 보여줄 내부 콘텐츠 */
    children: React.ReactNode;
    /** 추가적인 커스텀 CSS 클래스명 */
    className?: string;
}

/**
 * @description 상세 내용을 숨기거나 펼칠 수 있는 아코디언 형태의 컴포넌트입니다.
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
    ({ title, isOpen: controlledOpen, onToggle, children, className = "" }, ref) => {
        const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
        const isExpanded = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

        const handleToggle = () => {
            if (onToggle) {
                onToggle();
            } else {
                setUncontrolledOpen(!uncontrolledOpen);
            }
        };

        const itemClasses = [
            "collapse-item",
            isExpanded ? "-open" : "",
            className
        ].filter(Boolean).join(" ");

        return (
            <div ref={ref} className={itemClasses}>
                <button
                    type="button"
                    className="collapse-header"
                    onClick={handleToggle}
                    aria-expanded={isExpanded}
                >
                    <span className="collapse-title">{title}</span>
                    <Icon name="arrow-down" size={24} className="ico-toggle" />
                </button>

                <div className="collapse-body" aria-hidden={!isExpanded}>
                    <div className="collapse-content">
                        <div className="collapse-content-inner">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
) as React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLDivElement>> & {
    Group: typeof CollapseGroup;
};

Collapse.displayName = "Collapse";

/**
 * Collapse.Group 컴포넌트 속성 (Props)
 */
export interface CollapseGroupProps {
    children: React.ReactNode;
    className?: string;
}

const CollapseGroup = ({ children, className = "" }: CollapseGroupProps) => {
    return (
        <div className={`collapse-wrap ${className}`.trim()}>
            {children}
        </div>
    );
};

CollapseGroup.displayName = "CollapseGroup";
Collapse.Group = CollapseGroup;