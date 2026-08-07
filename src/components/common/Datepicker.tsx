import React, { forwardRef, type KeyboardEvent, type ReactNode, useCallback, useId, useRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { Icon } from "@/components";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko", ko);

export type DatePickerType = "day" | "month" | "year";

/**
 * DatePicker 컴포넌트 공통 속성 (Props)
 */
export interface BaseDatePickerProps {
    /** 피커 상단에 표시될 라벨 */
    label?: string | ReactNode;
    /** 선택할 날짜의 단위 (기본값: "day") */
    dateType?: DatePickerType;
    /** 시간 선택 포함 여부 */
    isTimer?: boolean;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 필수 입력 여부 (aria-required 연결) */
    required?: boolean;
    /** 에러 상태 활성화 여부 */
    isError?: boolean;
    /** 에러 발생 시 표시할 메시지 */
    errorMsg?: string;
    /** 선택에서 제외할 날짜 배열 */
    excludeDates?: Date[];
    /** 선택 가능한 최소 날짜 */
    minDate?: Date | null;
    /** 선택 가능한 최대 날짜 */
    maxDate?: Date | null;
    /** 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 피커의 너비 */
    width?: number | string;
    /** 부모 요소 너비 100% 채움 여부 */
    fullWidth?: boolean;
    /** 추가 커스텀 클래스명 */
    className?: string;
}

/**
 * 단일 날짜 선택 DatePicker 속성 (Props)
 */
export interface SingleDatePickerProps extends BaseDatePickerProps {
    selectsRange?: false;
    selected?: Date | null;
    onChange: (date: Date | null) => void;
    startDate?: never;
    endDate?: never;
}

/**
 * 기간 선택 DatePicker 속성 (Props)
 */
export interface RangeDatePickerProps extends BaseDatePickerProps {
    selectsRange: true;
    startDate: Date | null;
    endDate: Date | null;
    onChange: (dates: [Date | null, Date | null]) => void;
    selected?: never;
}

export type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

const getDateFormat = (dateType: DatePickerType, isTimer: boolean): string => {
    if (dateType === "year") return "yyyy";
    if (dateType === "month") return "yyyy.MM";
    if (isTimer) return "yyyy.MM.dd HH:mm";
    return "yyyy.MM.dd";
};

const getDateTypeDescription = (dateType: DatePickerType, isTimer: boolean): string => {
    if (dateType === "year") return "연도 선택";
    if (dateType === "month") return "연월 선택";
    if (isTimer) return "날짜 및 시간 선택";
    return "날짜 선택";
};

/**
 * 단일 날짜 또는 기간을 선택할 수 있는 DatePicker 컴포넌트입니다.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
    const {
        label,
        dateType = "day",
        isTimer = false,
        disabled = false,
        required = false,
        isError = false,
        errorMsg,
        excludeDates,
        minDate,
        maxDate,
        placeholder = isTimer ? "YYYY.MM.DD HH:MM" : "YYYY.MM.DD",
        width,
        fullWidth = false,
        className = "",
    } = props;

    const datePickerRef = useRef<ReactDatePicker>(null);
    const datePickerId = useId();
    const errorId = useId();

    const handleIconClick = useCallback(() => {
        if (!disabled) {
            datePickerRef.current?.setOpen(true);
            datePickerRef.current?.setFocus();
        }
    }, [disabled]);

    const handleIconKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleIconClick();
            }
        },
        [handleIconClick]
    );

    const handleInputKeyDown = useCallback((e: KeyboardEvent) => {
        const allowedKeys = new Set([
            "Tab", "Escape", "Enter",
            "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
            "PageUp", "PageDown", "Home", "End",
        ]);
        if (!allowedKeys.has(e.key)) {
            e.preventDefault();
        }
    }, []);

    const handleWrapperKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (e.key === " " || e.key === "Spacebar") {
            const navButton = target.closest<HTMLButtonElement>(".react-datepicker__navigation");
            if (navButton) {
                e.preventDefault();
                navButton.click();
            }
        }
    }, []);

    const handleWrapperBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        const relatedTarget = e.relatedTarget as HTMLElement | null;

        if (
            relatedTarget &&
            (e.currentTarget.contains(relatedTarget) ||
                relatedTarget.closest(".react-datepicker-popper"))
        ) {
            return;
        }

        datePickerRef.current?.setOpen(false);
    }, []);

    const groupClasses = ["datepicker-group", fullWidth ? "w-full" : ""]
        .filter(Boolean)
        .join(" ");

    const wrapperClasses = [
        "datepicker-wrap",
        isError ? "-error" : "",
        disabled ? "-disabled" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    let computedWidth: string | undefined;
    if (fullWidth) {
        computedWidth = "100%";
    } else if (width !== undefined) {
        computedWidth = typeof width === "number" ? `${width}px` : width;
    }

    const commonDatePickerProps = {
        id: datePickerId,
        ref: datePickerRef,
        locale: "ko" as const,
        dateFormat: getDateFormat(dateType, isTimer),
        showMonthYearPicker: dateType === "month",
        showYearPicker: dateType === "year",
        showTimeSelect: isTimer && !props.selectsRange,
        timeFormat: "HH:mm",
        timeIntervals: 30,
        disabled,
        minDate: minDate ?? undefined,
        maxDate: maxDate ?? undefined,
        excludeDates,
        placeholderText: placeholder,
        className: "datepicker-field",
        wrapperClassName: "react-datepicker-wrapper",
        autoComplete: "off",
        ariaRequired: required ? "true" : "false",
        ariaInvalid: isError ? "true" : "false",
        "aria-describedby": isError && errorMsg ? errorId : undefined,
        "aria-label": !label ? getDateTypeDescription(dateType, isTimer) : undefined,
        onKeyDown: handleInputKeyDown,
        popperProps: { strategy: "fixed" as const },
        portalId: "datepicker-portal",
    };

    return (
        <div
            className={groupClasses}
            style={computedWidth ? { width: computedWidth } : {}}
            ref={ref}
        >
            {label && (
                <label htmlFor={datePickerId} className="form-label">
                    {label}
                    {required && (
                        <span className="required-mark" aria-hidden="true">
                            *
                        </span>
                    )}
                </label>
            )}

            <div
                className={wrapperClasses}
                onKeyDown={handleWrapperKeyDown}
                onBlur={handleWrapperBlur}
            >
                {props.selectsRange ? (
                    <ReactDatePicker
                        {...commonDatePickerProps}
                        selectsRange={true}
                        startDate={props.startDate}
                        endDate={props.endDate}
                        onChange={(update: [Date | null, Date | null]) =>
                            (props as RangeDatePickerProps).onChange(update)
                        }
                    />
                ) : (
                    <ReactDatePicker
                        {...commonDatePickerProps}
                        selectsRange={false}
                        selected={props.selected}
                        onChange={(date: Date | null) =>
                            (props as SingleDatePickerProps).onChange(date)
                        }
                    />
                )}

                <button
                    type="button"
                    className="datepicker-icon"
                    onClick={handleIconClick}
                    onKeyDown={handleIconKeyDown}
                    aria-label={`${getDateTypeDescription(dateType, isTimer)} 달력 열기`}
                    aria-controls={datePickerId}
                    disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                >
                    <Icon name="calendar" size={18} aria-hidden="true" />
                </button>
            </div>

            {isError && errorMsg && (
                <div className="validation-msg" role="alert">
                    <Icon name="warning" size={18} color="currentColor" />
                    <span>{errorMsg}</span>
                </div>
            )}
        </div>
    );
});
DatePicker.displayName = "DatePicker";

/**
 * DateRangePicker 컴포넌트 속성 (Props)
 */
export interface DateRangePickerProps extends BaseDatePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (dates: [Date | null, Date | null]) => void;
}

/**
 * 시작일과 종료일을 각각 개별 필드로 입력받아 기간을 설정하는 DateRangePicker 컴포넌트입니다.
 */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
    (
        {
            label,
            startDate,
            endDate,
            onChange,
            fullWidth = false,
            isError = false,
            errorMsg,
            required,
            ...props
        },
        ref
    ) => {
        const groupLabelId = useId();
        const errorId = useId();

        const handleStartChange = useCallback(
            (date: Date | null) => onChange([date, endDate]),
            [onChange, endDate]
        );

        const handleEndChange = useCallback(
            (date: Date | null) => onChange([startDate, date]),
            [onChange, startDate]
        );

        const groupClasses = ["datepicker-group", fullWidth ? "w-full" : ""]
            .filter(Boolean)
            .join(" ");

        return (
            <div
                className={groupClasses}
                ref={ref}
                role="group"
                aria-labelledby={label ? groupLabelId : undefined}
                aria-required={required}
                aria-describedby={isError && errorMsg ? errorId : undefined}
            >
                {label && (
                    <span id={groupLabelId} className="form-label">
                        {label}
                        {required && (
                            <span className="required-mark" aria-hidden="true">
                                *
                            </span>
                        )}
                    </span>
                )}

                <div className="datepicker-range-wrap">
                    <DatePicker
                        {...props}
                        selected={startDate}
                        onChange={handleStartChange}
                        maxDate={endDate ?? props.maxDate}
                        isError={isError}
                        required={required}
                        placeholder="YYYY.MM.DD"
                        fullWidth
                    />

                    <span className="datepicker-range-divider" aria-hidden="true">
                        ~
                    </span>
                    <span className="sr-only">에서</span>

                    <DatePicker
                        {...props}
                        selected={endDate}
                        onChange={handleEndChange}
                        minDate={startDate ?? props.minDate}
                        isError={isError}
                        required={required}
                        fullWidth
                    />
                </div>

                {isError && errorMsg && (
                    <div
                        id={errorId}
                        className="validation-msg"
                        role="alert"
                        aria-live="assertive"
                    >
                        <Icon name="warning" size={18} color="currentColor" aria-hidden="true" />
                        <span>{errorMsg}</span>
                    </div>
                )}
            </div>
        );
    }
);
DateRangePicker.displayName = "DateRangePicker";