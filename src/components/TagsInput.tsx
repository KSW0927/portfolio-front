import React, { useState, useRef, useId, forwardRef } from "react";
import { Icon } from "@/components";

export type InputSize = "md" | "lg";

/**
 * TagsInput 컴포넌트 속성 (Props)
 */
export interface TagsInputProps {
    label?: string | React.ReactNode;
    size?: InputSize;
    /** 컨텐츠 배치 방향 (기본값: "vertical") */
    layout?: "vertical" | "horizontal";
    width?: number | string;
    fullWidth?: boolean;
    placeholder?: string;
    leftIcon?: React.ReactNode;

    /** 사용자가 선택할 수 있는 전체 옵션 리스트 */
    options: string[];
    /** 현재 선택된 태그 배열 (Controlled) */
    value: string[];
    /** 태그가 추가/삭제될 때 호출되는 콜백 */
    onChange: (newTags: string[]) => void;

    disabled?: boolean;
    isError?: boolean;
    errorMsg?: string;
}

/**
 * 자동완성 드롭다운을 통해 값을 검색하고, 선택한 항목이 인풋 하단에 태그로 나열되는 컴포넌트입니다.
 */
export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
    (
        {
            label,
            size = "lg",
            layout = "vertical",
            width,
            fullWidth = false,
            placeholder = "검색어를 입력하세요",
            leftIcon,
            options = [],
            value = [],
            onChange,
            disabled = false,
            isError = false,
            errorMsg,
        },
        ref
    ) => {
        const inputId = useId();
        const [inputText, setInputText] = useState("");
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [highlightedIndex, setHighlightedIndex] = useState(-1);
        const wrapperRef = useRef<HTMLDivElement>(null);

        const filteredOptions = options.filter(
            (opt) =>
                opt.toLowerCase().includes(inputText.toLowerCase()) &&
                !value.includes(opt)
        );

        const addTag = (tagToAdd: string) => {
            if (tagToAdd && !value.includes(tagToAdd)) {
                onChange([...value, tagToAdd]);
            }
            setInputText("");
            setIsDropdownOpen(false);
            setHighlightedIndex(-1);
        };

        const removeTag = (tagToRemove: string) => {
            onChange(value.filter((tag) => tag !== tagToRemove));
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (disabled) return;

            if (e.key === "Enter") {
                e.preventDefault();
                if (isDropdownOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    addTag(filteredOptions[highlightedIndex]);
                } else if (inputText.trim()) {
                    if (filteredOptions.length > 0) {
                        addTag(filteredOptions[0]);
                    }
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setIsDropdownOpen(true);
                setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "Escape") {
                setIsDropdownOpen(false);
            }
        };

        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                    setIsDropdownOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const groupClasses = ["input-group", `-${layout}`, fullWidth ? "w-full" : ""].filter(Boolean).join(" ");

        const inputWrapClasses = [
            "input-wrap",
            `-${size}`,
            fullWidth ? "w-full" : "",
            isError ? "-error" : "",
            disabled ? "-disabled" : "",
            leftIcon ? "has-left-icon" : ""
        ].filter(Boolean).join(" ");

        const computedWidth = fullWidth ? "100%" : width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined;

        return (
            <div className={groupClasses} style={computedWidth ? { width: computedWidth } : {}} ref={wrapperRef}>
                {label && <label htmlFor={inputId} className="form-label">{label}</label>}

                <div className="tags-input-wrapper">
                    <div className={inputWrapClasses}>
                        {leftIcon && (
                            <span className="input-icon-left" aria-hidden="true">
                                {leftIcon}
                            </span>
                        )}
                        <input
                            id={inputId}
                            ref={ref}
                            type="text"
                            className="input-field"
                            placeholder={placeholder}
                            value={inputText}
                            disabled={disabled}
                            autoComplete="off"
                            onChange={(e) => {
                                setInputText(e.target.value);
                                setIsDropdownOpen(true);
                                setHighlightedIndex(-1);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    {isDropdownOpen && inputText && !disabled && (
                        <ul className="tags-dropdown-menu">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={option}
                                        className={`tags-dropdown-option ${index === highlightedIndex ? "-highlighted" : ""}`}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            addTag(option);
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))
                            ) : (
                                <li className="tags-dropdown-empty">일치하는 결과가 없습니다.</li>
                            )}
                        </ul>
                    )}
                </div>

                {isError && errorMsg && (
                    <div className="validation-msg" role="alert">
                        <Icon name="warning" size={18} color="currentColor" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {value.length > 0 && (
                    <div className="tags-container">
                        {value.map((tag) => (
                            <span key={tag} className="tag-item">
                                {tag}
                                {!disabled && (
                                    <button
                                        type="button"
                                        className="tag-remove-btn"
                                        onClick={() => removeTag(tag)}
                                        aria-label={`${tag} 삭제`}
                                    >
                                        <Icon name="close" size={14} color="currentColor" />
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

TagsInput.displayName = "TagsInput";