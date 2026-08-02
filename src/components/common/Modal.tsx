/* eslint-disable react-refresh/only-export-components */
import React, {
    useEffect,
    useRef,
    useCallback,
    useId,
    type HTMLAttributes,
    type ReactNode,
} from "react";
import { Button, Icon, Typography } from "@/components";

export type ModalSize = "sm" | "md" | "lg" | "xl";

/** 포커스 가능한 요소 셀렉터 */
const FOCUSABLE_SELECTORS = [
    "a[href]",
    "area[href]",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
    "iframe",
    "object",
    "embed",
    "details > summary",
].join(", ");

/**
 * Modal 컴포넌트 속성 (Props)
 */
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    /** 모달 오픈 상태 여부 */
    isOpen: boolean;
    /** 모달 닫기 함수 (오버레이 클릭 또는 ESC 키 입력 시 호출) */
    onClose: () => void;
    /** 모달의 가로 크기 (기본값: "md") */
    size?: ModalSize;
    /** 오버레이(배경) 클릭 시 모달 닫기 허용 여부 (기본값: true) */
    closeOnOverlayClick?: boolean;
    /** ESC 키로 모달 닫기 허용 여부 (기본값: true) */
    closeOnEsc?: boolean;
    /**
     * 스크린리더가 모달의 역할을 설명할 때 사용하는 레이블
     * Modal.Header에 title prop이 있으면 자동 연결되므로 생략 가능
     */
    ariaLabel?: string;
    /** 내부 요소 */
    children: ReactNode;
}

/**
 * @description 화면 최상단에 띄워져 입력 폼, 데이터 그리드 등 복잡한 사용자 화면을 렌더링하는 모달 컴포넌트입니다.
 */
const ModalWrapper = ({
                          isOpen,
                          onClose,
                          size = "md",
                          closeOnOverlayClick = true,
                          closeOnEsc = true,
                          className = "",
                          children,
                          "aria-label": ariaLabel,
                          ...props
                      }: ModalProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const titleId = useId();

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!containerRef.current) return;

            if (e.key === "Escape" && closeOnEsc) {
                e.preventDefault();
                onClose();
                return;
            }

            if (e.key === "Tab") {
                const focusableElements = Array.from(
                    containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
                ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

                if (focusableElements.length === 0) {
                    e.preventDefault();
                    return;
                }

                const firstEl = focusableElements[0];
                const lastEl = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        },
        [closeOnEsc, onClose]
    );

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement as HTMLElement;

            document.body.style.overflow = "hidden";

            requestAnimationFrame(() => {
                if (!containerRef.current) return;
                const firstFocusable = containerRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
                if (firstFocusable) {
                    firstFocusable.focus();
                } else {
                    containerRef.current.focus();
                }
            });

            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    useEffect(() => {
        if (!isOpen && previousFocusRef.current) {
            previousFocusRef.current.focus();
            previousFocusRef.current = null;
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    const containerClasses = ["modal-container", `modal-${size}`, className]
        .filter(Boolean)
        .join(" ");

    const labelProps = ariaLabel
        ? { "aria-label": ariaLabel }
        : { "aria-labelledby": titleId };

    return (
        <div
            className="modal-overlay"
            onMouseDown={handleOverlayMouseDown}
            aria-hidden={false}
        >
            <div
                ref={containerRef}
                className={containerClasses}
                role="dialog"
                aria-modal="true"
                {...labelProps}
                tabIndex={-1}
                {...props}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && (child.type as { displayName?: string }).displayName === "ModalHeader") {
                        return React.cloneElement(child as React.ReactElement<ModalHeaderProps>, { _titleId: titleId });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

/**
 * Modal.Header 컴포넌트 속성 (Props)
 */
interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** 헤더에 표시될 타이틀 텍스트 또는 노드 */
    title?: ReactNode;
    /** 우측 상단 X 닫기 버튼 표시 여부 */
    showCloseBtn?: boolean;
    /** 닫기 버튼 클릭 시 호출되는 함수 (보통 부모의 onClose 전달) */
    onClose?: () => void;
    /** @internal */
    _titleId?: string;
}

/**
 * @description 모달의 헤더 영역을 구성합니다. title과 닫기 버튼을 포함할 수 있습니다.
 */
const Header = ({
                    title,
                    showCloseBtn = true,
                    onClose,
                    children,
                    className = "",
                    _titleId,
                    ...props
                }: ModalHeaderProps) => {
    const classes = ["modal-header", className].filter(Boolean).join(" ");

    return (
        <div className={classes} {...props}>
            {title ? (
                <Typography
                    variant="heading-md"
                    className="title"
                    id={_titleId}
                >
                    {title}
                </Typography>
            ) : (
                children
            )}
            {showCloseBtn && onClose && (
                <Button
                    variant="text"
                    leftIcon={<Icon name="close" size={32} />}
                    className="button-close"
                    onClick={onClose}
                    aria-label="모달 닫기"
                />
            )}
        </div>
    );
};
Header.displayName = "ModalHeader";

/**
 * Modal.Body 컴포넌트 속성 (Props)
 */
interface ModalBodyProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** 바디 영역 상단에 표시될 소제목 */
    title?: ReactNode;
}

/**
 * @description 모달의 주된 컨텐츠 영역을 구성합니다.
 */
const Body = ({ title, children, className = "", ...props }: ModalBodyProps) => {
    const classes = ["modal-body", className].filter(Boolean).join(" ");
    return (
        <div className={classes} {...props}>
            {title ? (
                <Typography variant="heading-sm" className="title">
                    {title}
                </Typography>
            ) : null}
            <div className="modal-content">{children}</div>
        </div>
    );
};
Body.displayName = "ModalBody";

/**
 * Modal.Footer 컴포넌트 속성 (Props)
 */
interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** 푸터 내부에 표시될 콘텐츠 (주로 버튼) */
    children: ReactNode;
}

/**
 * @description 모달의 푸터 영역을 구성합니다. 주로 확인, 취소 등의 액션 버튼을 배치합니다.
 */
const Footer = ({
                    children,
                    className = "",
                    ...props
                }: ModalFooterProps) => {
    const classes = ["modal-footer", className].filter(Boolean).join(" ");
    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};
Footer.displayName = "ModalFooter";

export const Modal = Object.assign(ModalWrapper, {
    Header,
    Body,
    Footer,
});