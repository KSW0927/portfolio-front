import React, { forwardRef, useId } from "react";

/**
 * Checkbox 컴포넌트 속성 (Props)
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** 체크박스 우측에 표시될 주요 라벨 텍스트 */
    label?: React.ReactNode;
    /** 라벨을 보조하는 부가 설명 텍스트 */
    description?: React.ReactNode;
    /** 최상위 래퍼 요소에 적용할 커스텀 클래스명 */
    wrapperClassName?: string;
    /** 컴포넌트 스타일 변형 (기본값: "default") */
    variant?: "default" | "box";
}

/**
 * @description 단일 다중 선택을 위한 체크박스 컴포넌트입니다.
 */
const CheckboxSingle = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, description, className = "", wrapperClassName = "", disabled, readOnly, id, onClick, onChange, variant = "default", ...props }, ref) => {
        const generatedId = useId();
        const checkboxId = id || generatedId;
        const descriptionId = `${checkboxId}-desc`;

        const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
            if (readOnly) e.preventDefault();
            if (onClick) onClick(e);
        };

        const wrapperClasses = [
            "checkbox-wrap",
            variant === "box" ? "-box" : "",
            disabled ? "-disabled" : "",
            readOnly ? "-readonly" : "",
            wrapperClassName
        ].filter(Boolean).join(" ");

        const inputClasses = [
            "checkbox-input",
            "sr-only",
            className
        ].filter(Boolean).join(" ");

        return (
            <div className={wrapperClasses}>
                <input
                    type="checkbox"
                    id={checkboxId}
                    ref={ref}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-readonly={readOnly}
                    tabIndex={readOnly ? -1 : undefined}
                    className={inputClasses}
                    aria-describedby={description ? descriptionId : undefined}
                    onClick={handleClick}
                    onChange={onChange || (() => { })}
                    {...props}
                />
                <label htmlFor={checkboxId} className="checkbox-box" aria-hidden="true">
                    <svg className="checkbox-icon" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.75 2.96117L4.03883 6.25L9.33887 0.75"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
                {(label || description) && (
                    <div className="checkbox-content">
                        {label && (
                            <label htmlFor={checkboxId} className="form-label">
                                {label}
                            </label>
                        )}
                        {description && <span id={descriptionId} className="checkbox-desc">{description}</span>}
                    </div>
                )}
            </div>
        );
    }
);

CheckboxSingle.displayName = "Checkbox";

/**
 * Checkbox.Group 옵션 타입
 */
export interface CheckboxOption {
    /** 화면에 표시할 라벨 */
    label: React.ReactNode;
    /** 선택 시 폼에 전달될 실제 값 */
    value: string;
    /** 선택 항목에 대한 부가 설명 */
    description?: React.ReactNode;
    /** 해당 옵션의 비활성화 여부 */
    disabled?: boolean;
}

/**
 * Checkbox.Group 컴포넌트 속성 (Props)
 */
export interface CheckboxGroupProps {
    /** 렌더링할 체크박스 옵션 배열 */
    options: CheckboxOption[];
    /** 현재 선택된 값들의 배열 */
    value?: string[];
    /** 값이 변경될 때 호출되는 콜백 함수 */
    onChange?: (values: string[]) => void;
    /** input name 속성 */
    name?: string;
    /** 컨텐츠 배치 방향 (기본값: "horizontal") */
    layout?: "horizontal" | "vertical";
    /** 전체 비활성화 여부 */
    disabled?: boolean;
    /** 전체 읽기 전용 여부 */
    readOnly?: boolean;
    /** 그룹 컨테이너에 적용할 커스텀 클래스명 */
    className?: string;
}

/**
 * @description 여러 개의 체크박스를 묶어서 관리하는 그룹 컴포넌트입니다.
 */
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    options,
    value = [],
    onChange,
    name,
    layout = "horizontal",
    disabled = false,
    readOnly = false,
    className = "",
}) => {
    const handleChange = (optionValue: string, isChecked: boolean) => {
        if (!onChange || readOnly) return;

        if (isChecked) {
            onChange([...value, optionValue]);
        } else {
            onChange(value.filter((v) => v !== optionValue));
        }
    };

    const groupClasses = [
        "checkbox-group",
        `-${layout}`,
        className
    ].filter(Boolean).join(" ");

    return (
        <div className={groupClasses} role="group">
            {options.map((option) => {
                const isChecked = value.includes(option.value);
                const isDisabled = disabled || option.disabled;

                return (
                    <CheckboxSingle
                        key={option.value}
                        name={name}
                        value={option.value}
                        checked={isChecked}
                        disabled={isDisabled}
                        readOnly={readOnly}
                        label={option.label}
                        description={option.description}
                        onChange={(e) => handleChange(option.value, e.target.checked)}
                    />
                );
            })}
        </div>
    );
};

type CheckboxComponent = typeof CheckboxSingle & {
    Group: typeof CheckboxGroup;
};

export const Checkbox = CheckboxSingle as CheckboxComponent;
Checkbox.Group = CheckboxGroup;