import React, { useState, useRef, useEffect, forwardRef, useId } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components";

export type DropdownSize = "md" | "lg";
export type DropdownVariant = "default" | "text";
export type DropdownLayout = "vertical" | "horizontal";

export interface DropdownOption {
    /** 사용자에게 표시되는 라벨 */
    label: string;
    /** 선택 시 폼에 전달되는 실제 값 */
    value: string;
}

/**
 * Dropdown 컴포넌트 속성 (Props)
 */
export interface DropdownProps {
    /** 드롭다운 상단 또는 좌측 라벨 */
    label?: string | React.ReactNode;
    /** 드롭다운 크기 (기본값: "lg") */
    size?: DropdownSize;
    /** 드롭다운 스타일 (기본값: "default") */
    variant?: DropdownVariant;
    /** 컨텐츠 배치 방향 (기본값: "vertical") */
    layout?: DropdownLayout;
    /** 너비 값 */
    width?: number | string;
    /** 부모 요소 너비 100% 채움 여부 */
    fullWidth?: boolean;
    /** 에러 상태 활성화 여부 */
    isError?: boolean;
    /** 에러 발생 시 하단에 표시할 메시지 */
    errorMsg?: string;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 아무 항목도 선택되지 않았을 때 표시할 텍스트 */
    placeholder?: string;
    /** 선택 가능한 옵션 배열 */
    options: DropdownOption[];
    /** 현재 선택된 값 */
    value?: string;
    /** 선택 항목 변경 시 호출되는 콜백 함수 */
    onChange?: (value: string) => void;
    /** 내부 필드 요소에 적용할 커스텀 클래스명 */
    className?: string;
    /** 최상위 래퍼 요소에 적용할 커스텀 클래스명 */
    wrapperClassName?: string;
    /** 최상위 래퍼 요소 인라인 스타일 */
    style?: React.CSSProperties;
    /** 드롭다운 메뉴를 document.body에 portal로 렌더링 (overflow:hidden 컨테이너 내부에서 사용 시) */
    menuPortal?: boolean;
}

/**
 * 옵션 목록에서 하나를 선택하는 드롭다운 (Select) 컴포넌트입니다.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
    (
        {
            label,
            size = "lg",
            variant = "default",
            layout = "vertical",
            width,
            fullWidth = false,
            disabled = false,
            isError = false,
            errorMsg,
            placeholder = "선택해 주세요",
            options = [],
            value,
            onChange,
            className = "",
            wrapperClassName = "",
            style,
            menuPortal = false,
        },
        ref
    ) => {
        const baseId = useId();
        const listboxId = `${baseId}-listbox`;
        const labelId = `${baseId}-label`;
        const comboboxId = `${baseId}-combobox`;

        const [isOpen, setIsOpen] = useState(false);
        const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
        const [menuPos, setMenuPos] = useState<React.CSSProperties>({});

        const wrapRef = useRef<HTMLDivElement>(null);
        const listboxRef = useRef<HTMLUListElement>(null);

        const openAndHighlight = () => {
            setIsOpen(true);
            const selectedIdx = options.findIndex((opt) => opt.value === value);
            setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : 0);
            if (menuPortal && wrapRef.current) {
                const rect = wrapRef.current.getBoundingClientRect();
                setMenuPos({ position: "fixed", top: rect.bottom, left: rect.left, width: rect.width, zIndex: 9999 });
            }
        };

        const closeAndReset = () => {
            setIsOpen(false);
            setHighlightedIndex(-1);
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const inWrap = wrapRef.current?.contains(event.target as Node);
                const inMenu = listboxRef.current?.contains(event.target as Node);
                if (!inWrap && !inMenu) closeAndReset();
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        useEffect(() => {
            if (!isOpen || !menuPortal) return;
            const handleScroll = () => closeAndReset();
            window.addEventListener("scroll", handleScroll, true);
            return () => window.removeEventListener("scroll", handleScroll, true);
        }, [isOpen, menuPortal]);

        useEffect(() => {
            if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
                const listItems = listboxRef.current.children;
                const highlightedItem = listItems[highlightedIndex] as HTMLElement;
                if (highlightedItem) {
                    highlightedItem.scrollIntoView({ block: "nearest" });
                }
            }
        }, [highlightedIndex, isOpen]);

        const handleToggle = () => {
            if (disabled) return;
            if (isOpen) {
                closeAndReset();
            } else {
                openAndHighlight();
            }
        };

        const handleOptionClick = (optionValue: string) => {
            if (onChange) onChange(optionValue);
            closeAndReset();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (disabled) return;
            switch (e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    if (isOpen) {
                        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
                            handleOptionClick(options[highlightedIndex].value);
                        }
                    } else {
                        openAndHighlight();
                    }
                    break;
                case "Escape":
                    if (isOpen) closeAndReset();
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    if (!isOpen) {
                        openAndHighlight();
                    } else {
                        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    if (!isOpen) {
                        openAndHighlight();
                    } else {
                        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                    }
                    break;
                case "Tab":
                    if (isOpen) closeAndReset();
                    break;
            }
        };

        const selectedOption = options.find((opt) => opt.value === value);
        const displayLabel = selectedOption ? selectedOption.label : placeholder;
        const isPlaceholderState = !selectedOption;

        const groupClasses = [
            "dropdown-group",
            `-${layout}`,
            `-${variant}`,
            fullWidth ? "w-full" : "",
        ].filter(Boolean).join(" ");

        const wrapperClasses = [
            "dropdown-wrap",
            `-${variant}`,
            `-${size}`,
            fullWidth ? "w-full" : "",
            isOpen ? "-open" : "",
            isError ? "-error" : "",
            disabled ? "-disabled" : "",
            wrapperClassName,
        ].filter(Boolean).join(" ");

        const fieldClasses = [
            "dropdown-field",
            isPlaceholderState ? "-placeholder" : "",
            className
        ].filter(Boolean).join(" ");

        const computedWidth = fullWidth ? "100%" : (width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined);
        const containerStyle: React.CSSProperties = {
            ...style,
            ...(computedWidth ? { width: computedWidth, minWidth: "auto" } : {}),
        };

        const menuUl = isOpen && !disabled ? (
            <ul
                className="dropdown-menu"
                role="listbox"
                id={listboxId}
                ref={listboxRef}
                style={menuPortal ? menuPos : undefined}
            >
                {options.map((option, index) => {
                    const isSelected = value === option.value;
                    const isHighlighted = highlightedIndex === index;
                    const optionClasses = [
                        "dropdown-option",
                        isSelected ? "-selected" : "",
                        isHighlighted ? "-highlighted" : ""
                    ].filter(Boolean).join(" ");

                    return (
                        <li
                            key={option.value}
                            id={`${baseId}-option-${index}`}
                            className={optionClasses}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleOptionClick(option.value)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {option.label}
                        </li>
                    );
                })}
            </ul>
        ) : null;

        return (
            <>
                <div className={groupClasses} style={containerStyle} ref={ref}>
                    {label && (
                        <label id={labelId} htmlFor={comboboxId} className="form-label" onClick={handleToggle}>
                            {label}
                        </label>
                    )}

                    <div className={wrapperClasses} ref={wrapRef}>
                        <div
                            id={comboboxId}
                            className={fieldClasses}
                            onClick={handleToggle}
                            onKeyDown={handleKeyDown}
                            tabIndex={disabled ? -1 : 0}
                            role="combobox"
                            aria-controls={listboxId}
                            aria-labelledby={label ? labelId : undefined}
                            aria-haspopup="listbox"
                            aria-expanded={isOpen}
                            aria-disabled={disabled}
                            aria-activedescendant={
                                isOpen && highlightedIndex >= 0 ? `${baseId}-option-${highlightedIndex}` : undefined
                            }
                        >
                            <span>{displayLabel}</span>
                        </div>

                        <div className="dropdown-icon" aria-hidden="true">
                            <Icon name="arrow-down" size={18} />
                        </div>

                        {!menuPortal && menuUl}
                    </div>

                    {isError && errorMsg && (
                        <div className="validation-msg" role="alert" aria-live="assertive">
                            <Icon name="warning" size={18} color="currentColor" />
                            <span>{errorMsg}</span>
                        </div>
                    )}
                </div>
                {menuPortal && menuUl && createPortal(menuUl, document.body)}
            </>
        );
    }
);
Dropdown.displayName = "Dropdown";

