import React, { forwardRef, useId, useRef } from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { Icon } from "@/components";

export type TextareaLayout = "vertical" | "horizontal";

/**
 * Textarea 컴포넌트 속성 (Props)
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** 입력창 상단 또는 좌측에 표시될 라벨 */
    label?: string | ReactNode;
    /** 컨텐츠 배치 방향 (기본값: "vertical") */
    layout?: TextareaLayout;
    /** 텍스트 영역의 너비 값 */
    width?: number | string;
    /** 부모 요소 너비 100% 채움 여부 */
    fullWidth?: boolean;
    /** 에러 상태 활성화 여부 */
    isError?: boolean;
    /** 에러 발생 시 하단에 표시할 메시지 */
    errorMsg?: string;
    /** 최상위 래퍼 요소에 적용할 커스텀 클래스명 */
    wrapperClassName?: string;
}

/**
 * @description 여러 줄의 텍스트를 입력받는 텍스트 영역 컴포넌트입니다.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            layout = "vertical",
            width,
            fullWidth = false,
            disabled = false,
            isError = false,
            errorMsg,
            value,
            className = "",
            wrapperClassName = "",
            style,
            rows = 4,
            ...props
        },
        ref
    ) => {
        const textareaId = useId();
        const errorId = `${textareaId}-error`;
        const internalRef = useRef<HTMLTextAreaElement | null>(null);

        const setRefs = (element: HTMLTextAreaElement | null) => {
            internalRef.current = element;
            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
            }
        };

        const groupClasses = [
            "textarea-group",
            `-${layout}`,
            fullWidth ? "w-full" : "",
        ].filter(Boolean).join(" ");

        const wrapperClasses = [
            "textarea-wrap",
            fullWidth ? "w-full" : "",
            isError ? "-error" : "",
            disabled ? "-disabled" : "",
            wrapperClassName,
        ].filter(Boolean).join(" ");

        const fieldClasses = [
            "textarea-field",
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

        return (
            <div className={groupClasses} style={containerStyle}>
                {label && (
                    <label htmlFor={textareaId} className="form-label">
                        {label}
                    </label>
                )}

                <div className={wrapperClasses}>
                    <textarea
                        id={textareaId}
                        ref={setRefs}
                        className={fieldClasses}
                        disabled={disabled}
                        value={value}
                        rows={rows}
                        aria-invalid={isError}
                        aria-describedby={isError && errorMsg ? errorId : undefined}
                        {...props}
                    />
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

Textarea.displayName = "Textarea";