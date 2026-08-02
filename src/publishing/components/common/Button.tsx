import React, { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, useRef, useState } from "react";

export type ButtonVariant = "solid" | "filled" | "outlined" | "text";
export type ButtonColor = "primary" | "green";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button 컴포넌트 속성 (Props)
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** 버튼의 시각적 형태 (기본값: "solid") */
    variant?: ButtonVariant;
    /** 버튼의 테마 색상 (기본값: variant가 text가 아니면 "primary") */
    color?: ButtonColor;
    /** 버튼의 크기 (기본값: "md") */
    size?: ButtonSize;
    /** 모서리 둥글게 처리 여부 */
    rounded?: boolean;
    /** 부모 요소의 너비를 100% 채울지 여부 */
    fullWidth?: boolean;
    /** 버튼 텍스트 좌측에 표시할 아이콘 노드 */
    leftIcon?: ReactNode;
    /** 버튼 텍스트 우측에 표시할 아이콘 노드 */
    rightIcon?: ReactNode;
}

/**
 * @description 사용자 인터랙션을 유도하는 기본 단일 버튼 컴포넌트입니다.
 */
export const ButtonSingle = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type = "button",
            variant = "solid",
            color,
            size = "md",
            rounded = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            className = "",
            children,
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        const isIconOnly = !children && (leftIcon || rightIcon);

        if (process.env.NODE_ENV !== "production") {
            if (isIconOnly && !ariaLabel && !props.title) {
                console.warn(
                    `A11y Warning: 아이콘만 있는 버튼(Icon-only button)은 스크린 리더 사용자를 위해 반드시 "aria-label" 또는 "title" 속성을 제공해야 합니다.`
                );
            }
        }

        const appliedColor = color || (variant === "text" ? "" : "primary");

        const classes = [
            "button",
            `-${variant}`,
            appliedColor ? `-${appliedColor}` : "",
            `-${size}`,
            rounded ? "-rounded" : "",
            isIconOnly ? "-icon-only" : "",
            fullWidth ? "w-full" : "",
            className,
        ].filter(Boolean).join(" ");

        return (
            <button
                ref={ref}
                type={type}
                className={classes}
                aria-label={ariaLabel}
                {...props}
            >
                {leftIcon && (
                    <span className="button-icon" aria-hidden="true">
                        {leftIcon}
                    </span>
                )}
                {children && <span className="button-text">{children}</span>}
                {rightIcon && (
                    <span className="button-icon" aria-hidden="true">
                        {rightIcon}
                    </span>
                )}
            </button>
        );
    }
);

ButtonSingle.displayName = "Button";

/**
 * Button.FileUpload 컴포넌트 속성 (Props)
 */
export interface ButtonFileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** 파일 선택 버튼에 표시될 텍스트 (기본값: "파일선택") */
    buttonText?: ReactNode;
    /** 파일이 선택되지 않았을 때 표시될 텍스트 (기본값: "선택된 파일이 없습니다.") */
    placeholder?: string;
    /** 내부 Button 컴포넌트에 전달할 속성들 */
    buttonProps?: Omit<ButtonProps, "onClick">;
}

/**
 * @description 숨겨진 file input과 커스텀 버튼을 연결하여 파일을 업로드하는 컴포넌트입니다.
 */
const FileUpload = React.forwardRef<HTMLInputElement, ButtonFileUploadProps>(
    ({ buttonText = "파일선택", placeholder = "선택된 파일이 없습니다.", buttonProps, className = "", onChange, ...props }, ref) => {
        const [fileName, setFileName] = useState("");
        const inputRef = useRef<HTMLInputElement | null>(null);

        const setRefs = (element: HTMLInputElement | null) => {
            inputRef.current = element;
            if (typeof ref === "function") ref(element);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
        };

        const handleClick = () => {
            inputRef.current?.click();
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                setFileName(files.length > 1 ? `${files[0].name} 외 ${files.length - 1}건` : files[0].name);
            } else {
                setFileName("");
            }
            if (onChange) onChange(e);
        };

        const classes = [
            "button-file-wrap",
            className
        ].filter(Boolean).join(" ");

        return (
            <div className={classes}>
                <input
                    type="file"
                    className="sr-only"
                    ref={setRefs}
                    onChange={handleChange}
                    tabIndex={-1}
                    {...props}
                />
                <Button {...buttonProps} onClick={handleClick}>
                    {buttonText}
                </Button>
                <span className="file-name-text">{fileName || placeholder}</span>
            </div>
        );
    }
);
FileUpload.displayName = "Button.FileUpload";

type ButtonComponent = typeof ButtonSingle & {
    FileUpload: typeof FileUpload;
};

export const Button = ButtonSingle as ButtonComponent;
Button.FileUpload = FileUpload;