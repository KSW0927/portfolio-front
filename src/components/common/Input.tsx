import React, { forwardRef, useId, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components";

export type InputSize = "md" | "lg";
export type InputLayout = "vertical" | "horizontal";

/**
 * Input 컴포넌트 속성 (Props)
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** 인풋 필드 상단 또는 좌측에 표시될 라벨 */
    label?: string | ReactNode;
    /** 인풋 필드의 크기 (기본값: "lg") */
    size?: InputSize;
    /** 컨텐츠 배치 방향 (기본값: "vertical") */
    layout?: InputLayout;
    /** 인풋 컴포넌트의 너비 값 */
    width?: number | string;
    /** 부모 요소 너비 100% 채움 여부 */
    fullWidth?: boolean;
    /** 에러 상태 활성화 여부 */
    isError?: boolean;
    /** 에러 발생 시 하단에 표시할 메시지 */
    errorMsg?: string;
    /** 우측 초기화 버튼 클릭 시 호출되는 콜백 함수 */
    onClear?: () => void;
    /** 인풋 필드 좌측에 표시될 아이콘 노드 */
    leftIcon?: ReactNode;
    /** 아무 것도 입력되지 않았을 때 표시할 텍스트 */
    placeholder?: string;
    /** 최상위 래퍼 요소에 적용할 커스텀 클래스명 */
    wrapperClassName?: string;
}

/**
 * 텍스트 데이터를 입력받는 기본 인풋 필드 컴포넌트입니다.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            size = "lg",
            layout = "vertical",
            width,
            fullWidth = false,
            disabled = false,
            readOnly = false,
            isError = false,
            errorMsg,
            onClear,
            value,
            className = "",
            wrapperClassName = "",
            placeholder = "입력해 주세요.",
            leftIcon,
            style,
            onKeyDown,
            ...props
        },
        ref
    ) => {
        const inputId = useId();
        const errorId = `${inputId}-error`;
        const internalRef = useRef<HTMLInputElement | null>(null);

        const setRefs = (element: HTMLInputElement | null) => {
            internalRef.current = element;
            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
            }
        };

        const groupClasses = [
            "input-group",
            `-${layout}`,
            fullWidth ? "w-full" : "",
        ].filter(Boolean).join(" ");

        const wrapperClasses = [
            "input-wrap",
            `-${size}`,
            fullWidth ? "w-full" : "",
            isError ? "-error" : "",
            disabled ? "-disabled" : "",
            readOnly ? "-readonly" : "",
            leftIcon ? "has-left-icon" : "",
            wrapperClassName,
        ].filter(Boolean).join(" ");

        const inputClasses = [
            "input-field",
            className
        ].filter(Boolean).join(" ");

        const computedWidth = fullWidth
            ? "100%"
            : width !== undefined
                ? typeof width === "number"
                    ? `${width}px`
                    : width
                : undefined;

        const containerStyle: React.CSSProperties = {
            ...style,
            ...(computedWidth ? { width: computedWidth } : {}),
        };

        const hasValue = value !== undefined && value !== null && String(value).length > 0;
        const showClearBtn = onClear && hasValue && !disabled && !readOnly;

        const handleClearClick = () => {
            if (onClear) {
                onClear();
                setTimeout(() => internalRef.current?.focus(), 0);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Escape" && showClearBtn) {
                e.preventDefault();
                handleClearClick();
            }
            if (onKeyDown) onKeyDown(e);
        };

        return (
            <div className={groupClasses} style={containerStyle}>
                {label && (
                    <label htmlFor={inputId} className="form-label">
                        {label}
                    </label>
                )}

                <div className={wrapperClasses}>
                    {leftIcon && (
                        <span className="input-icon-left" aria-hidden="true">
                            {leftIcon}
                        </span>
                    )}
                    <input
                        id={inputId}
                        ref={setRefs}
                        className={inputClasses}
                        disabled={disabled}
                        readOnly={readOnly}
                        tabIndex={readOnly ? -1 : undefined}
                        value={value}
                        aria-invalid={isError}
                        aria-describedby={isError && errorMsg ? errorId : undefined}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        {...props}
                    />
                    {showClearBtn && (
                        <button
                            type="button"
                            className="input-clear-btn"
                            onClick={handleClearClick}
                            aria-label="입력 내용 지우기"
                        >
                            <Icon name="close" size={18} />
                        </button>
                    )}
                </div>

                {isError && errorMsg && (
                    <div id={errorId} className="validation-msg" role="alert" aria-live="assertive">
                        <Icon name="warning" size={18} color="currentColor" />
                        <span>{errorMsg}</span>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";