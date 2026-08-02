import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

/**
 * Switch 컴포넌트 속성 (Props)
 */
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** 스위치 라벨의 위치 (기본값: "right") */
    labelPlacement?: "left" | "right";
    /** 스위치 옆에 표시될 라벨 텍스트 또는 컴포넌트 */
    children?: ReactNode;
}

/**
 * @description 사용자에게 즉각적인 On/Off 상태 전환을 제공하는 토글 컴포넌트입니다.
 * 웹 접근성(A11y)을 준수하기 위해 실제로는 숨겨진 checkbox input을 기반으로 동작합니다.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            labelPlacement = "right",
            children,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        const wrapperClasses = [
            "switch-wrapper",
            disabled ? "-disabled" : "",
            className
        ].filter(Boolean).join(" ");

        return (
            <label className={wrapperClasses}>
                <input
                    type="checkbox"
                    role="switch"
                    className="switch-input"
                    ref={ref}
                    disabled={disabled}
                    {...props}
                />

                {labelPlacement === "left" && children && (
                    <span className="switch-label">{children}</span>
                )}

                <div className="switch-track">
                    <span className="switch-thumb" />
                </div>

                {labelPlacement === "right" && children && (
                    <span className="switch-label">{children}</span>
                )}
            </label>
        );
    }
);

Switch.displayName = "Switch";