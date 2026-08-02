import React, { forwardRef, useId } from "react";

/**
 * RadioButton 컴포넌트 속성 (Props)
 */
export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** 라디오 버튼 우측에 표시될 주요 라벨 텍스트 */
    label?: React.ReactNode;
    /** 라벨을 보조하는 부가 설명 텍스트 */
    description?: React.ReactNode;
    /** 컨텐츠 배치 방향 (기본값: "vertical") */
    layout?: "vertical" | "horizontal";
    /** 최상위 래퍼 요소에 적용할 커스텀 클래스명 */
    wrapperClassName?: string;
}

/**
 * @description 단일 선택을 위한 라디오 버튼 컴포넌트입니다.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
    ({ label, description, layout = "vertical", className = "", wrapperClassName = "", disabled, id, onChange, ...props }, ref) => {
        const generatedId = useId();
        const radioId = id || generatedId;
        const descriptionId = `${radioId}-desc`;

        const wrapperClasses = [
            "radio-wrap",
            disabled ? "-disabled" : "",
            wrapperClassName
        ].filter(Boolean).join(" ");

        const inputClasses = [
            "radio-input",
            className
        ].filter(Boolean).join(" ");

        const contentClasses = [
            "radio-content",
            `-${layout}`
        ].filter(Boolean).join(" ");

        return (
            <div className={wrapperClasses}>
                <input
                    type="radio"
                    id={radioId}
                    ref={ref}
                    disabled={disabled}
                    className={inputClasses}
                    aria-describedby={description ? descriptionId : undefined}
                    onChange={onChange || (() => { })}
                    {...props}
                />
                <label htmlFor={radioId} className="radio-circle" aria-hidden="true" />
                {(label || description) && (
                    <div className={contentClasses}>
                        {label && (
                            <label htmlFor={radioId} className="form-label">
                                {label}
                            </label>
                        )}
                        {description && (
                            <span className="radio-desc">{description}</span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

RadioButton.displayName = "RadioButton";