import React, { useState, useRef, useEffect, forwardRef, useId } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components";
import type { CompGroupItem } from "@/types/types";

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
 * @description 옵션 목록에서 하나를 선택하는 드롭다운 (Select) 컴포넌트입니다.
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
                        <label id={labelId} className="form-label" onClick={handleToggle}>
                            {label}
                        </label>
                    )}

                    <div className={wrapperClasses} ref={wrapRef}>
                        <div
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

// 샘플데이터
const erpSampleHp: CompGroupItem[] = [
    { value: "HQ001", text: "경영지원본부" },
    { value: "HQ002", text: "영업본부" },
    { value: "HQ003", text: "기술본부" },
    { value: "HQ004", text: "선박관리본부" }
];

const erpSampleTeam: CompGroupItem[] = [
    { value: "TEAM001", text: "인사팀", parentValue: "HQ001" },
    { value: "TEAM002", text: "재무팀", parentValue: "HQ001" },
    { value: "TEAM003", text: "총무팀", parentValue: "HQ001" },
    { value: "TEAM004", text: "국내영업팀", parentValue: "HQ002" },
    { value: "TEAM005", text: "해외영업팀", parentValue: "HQ002" },
    { value: "TEAM006", text: "기술기획팀", parentValue: "HQ003" },
    { value: "TEAM007", text: "플랫폼개발팀", parentValue: "HQ003" },
    { value: "TEAM008", text: "서비스운영팀", parentValue: "HQ003" },
    { value: "TEAM009", text: "운항관리팀", parentValue: "HQ004" },
    { value: "TEAM010", text: "정비관리팀", parentValue: "HQ004" }
];
const erpSamplePosition: CompGroupItem[] = [
    { value: "POS001", text: "사원" },
    { value: "POS002", text: "대리" },
    { value: "POS003", text: "과장" },
    { value: "POS004", text: "차장" },
    { value: "POS005", text: "부장" },
    { value: "POS006", text: "팀장" },
    { value: "POS007", text: "본부장" }
];

// 부서 데이터 모듈 캐시 (앱 전체 1회만 fetch)
let deptCache: { hp: CompGroupItem[]; team: CompGroupItem[] } | null = null;
let deptPromise: Promise<{ hp: CompGroupItem[]; team: CompGroupItem[] }> | null = null;

const getDepts = async () => {
    if (deptCache) return deptCache;
    if (!deptPromise) {
        deptPromise = CommonApi.getComDept().then((r) => {
            const items = r.items ?? [];
            const hp: CompGroupItem[] = items
                .filter((x) => x.deptLevel === 2)
                .map((x) => ({ value: x.deptNo, text: x.deptNm }));
            const team: CompGroupItem[] = items
                .filter((x) => !!x.upDeptNo && x.deptLevel === 3)
                .map((x) => ({
                    value: x.deptNo,
                    text: x.deptNm,
                    parentValue: x.upDeptNo,
                }));
            deptCache = { hp, team };
            return deptCache;
        });
    }
    return deptPromise;
};

/**
 * 데이터 드롭다운 속성 (Props)
 * @interface DataDropdownProps
 */
export interface DataDropdownProps {
    /** 데이터 종류(CODE: 공통코드, HP: 본부, TEAM: 팀, POSITION: 직책, HP-TEAM: 부서 2단계) */
    dataType: "CODE" | "HP" | "TEAM" | "POSITION" | "HP-TEAM" | "TEAM-BY-HP";
    /** 데이터 파라메터(예: 공통코드) */
    dataParam?: string;
    /** 전체 추가 여부 */
    isAll?: boolean;
    /** 드롭다운 상단 또는 좌측 라벨 */
    label?: string | React.ReactNode;
    /** 본부 코드 필터 (TEAM-BY-HP 전용, 다중 가능) */
    upDeptNos?: string[];
    /** 드롭다운 크기 (기본값: "lg") */
    size?: DropdownSize;
    /** 드롭다운 스타일 (기본값: "default") */
    variant?: DropdownVariant;
    /** 배치 형태 (기본값: "vertical") */
    layout?: DropdownLayout;
    /** 너비 값 */
    width?: number | string;
    /** 너비 100% 채움 여부 */
    fullWidth?: boolean;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 현재 선택된 값 */
    value?: string;
    value2?: string;
    /** 변경 이벤트 콜백 */
    onChanges?: (value1: string, value2: string) => void;
}
/**
 * @description 특정 데이터를 넣어주는 드롭다운 컴포넌트 입니다.
 */
export const DataDropdown = (props: DataDropdownProps) => {
    const {
        dataType, dataParam = "", isAll = false, onChanges, upDeptNos,
        label, size, variant, layout, width, fullWidth, disabled, value = "", value2 = ""
    } = props;

    /** 상태 정의 */
    const [isTwoLevel, setIsTwoLevel] = useState(false);
    const [Lvl1Options, setLvl1Options] = useState<DropdownOption[]>([]);
    const [Lvl2Options, setLvl2Options] = useState<DropdownOption[]>([]);
    const [lvl1Value, setlvl1Value] = useState(value);
    const [lvl2Value, setlvl2Value] = useState(value2);

    const [deptTeam, setDeptTeam] = useState<CompGroupItem[]>([]);

    let addOption: string = isAll ? "전체" : "선택";

    const upDeptNosKey = upDeptNos?.join(',') ?? '';

    useEffect(() => {
        // 초기화
        setlvl1Value("");
        setlvl2Value("");
        setIsTwoLevel(dataType === "HP-TEAM");

        // 선택 목록 가져오기
        switch (dataType) {
            case "CODE":
                if (dataParam && dataParam.length > 0) {
                    CommonCodeApi.getListForSelect({ cd: dataParam })
                        .then((response: DropdownOption[]) => {
                            setLvl1Options([{ value: "", label: addOption }, ...response]);
                        })
                        .catch((error: Error) => { console.log(error.name); setLvl1Options([]); });
                }
                break;
            case "HP": {
                const tmpOptions: DropdownOption[] = [];
                erpSampleHp?.forEach((option: CompGroupItem) => {
                    tmpOptions.push({ value: option.value, label: option.text });
                });
                setLvl1Options([{ value: "", label: addOption }, ...tmpOptions]);
                break;
            }
            case "TEAM": {
                const tmpOptions: DropdownOption[] = [];
                erpSampleTeam?.forEach((option: CompGroupItem) => {
                    tmpOptions.push({ value: option.value, label: option.text });
                });
                setLvl1Options([{ value: "", label: addOption }, ...tmpOptions]);
                break;
            }
            case "POSITION": {
                const tmpOptions: DropdownOption[] = [];
                erpSamplePosition?.forEach((option: CompGroupItem) => {
                    tmpOptions.push({ value: option.value, label: option.text });
                });
                setLvl1Options([{ value: "", label: addOption }, ...tmpOptions]);
                break;
            }
            case "HP-TEAM": {
                setIsTwoLevel(true);
                void getDepts().then(data => {
                    setDeptTeam(data.team);
                    const tmpOptions: DropdownOption[] = data.hp.map(opt => ({
                        value: opt.value,
                        label: opt.text,
                    }));
                    setLvl1Options([{ value: "", label: addOption }, ...tmpOptions]);
                    setLvl2Options([{ value: "", label: addOption }]);
                });
                break;
            }
            case "TEAM-BY-HP": {
                setIsTwoLevel(false);
                void getDepts().then(data => {
                    const targetHps = (upDeptNos ?? []).map(String);
                    const teams = targetHps.length === 0
                        ? data.team
                        : data.team.filter(opt => opt.parentValue != null && targetHps.includes(String(opt.parentValue)));
                    const tmpOptions = teams.map(opt => ({ value: opt.value, label: opt.text }));
                    setLvl1Options([{ value: "", label: addOption }, ...tmpOptions]);
                });
                break;
            }
        }
    }, [dataType, dataParam, addOption, upDeptNosKey]);

    useEffect(() => {
        if (isTwoLevel && dataType === "HP-TEAM") {
            const tmpOptions: DropdownOption[] = deptTeam
                .filter(opt => opt.parentValue === lvl1Value)
                .map(opt => ({ value: opt.value, label: opt.text }));
            setLvl2Options([{ value: "", label: addOption }, ...tmpOptions]);
        }
    }, [lvl1Value, dataType, deptTeam, addOption]);

    useEffect(() => {
        if (isTwoLevel && dataType === "HP-TEAM") {
            setlvl1Value(value);
            setlvl2Value(value2);
        } else {
            setlvl1Value(value);
        }
    }, [value, value2]);

    /** 이벤트 정의 */
    const handleLvl1Change = (value: string) => {
        // 레벨1 값 저장
        setlvl1Value(value);
        // 레벨2 초기화
        setlvl2Value("");

        //콜백 반환
        if (onChanges) onChanges(value, "");
    };
    const handleLvl2Change = (value: string) => {
        // 레벨2 값 저장
        setlvl2Value(value);

        //콜백 반환
        if (onChanges) onChanges(lvl1Value, value);
    };

    return (
        <div className="searchbox-item">
            <Dropdown
                options={Lvl1Options}
                label={label}
                size={size}
                variant={variant}
                layout={layout}
                width={width}
                fullWidth={fullWidth}
                disabled={disabled}
                value={lvl1Value}
                onChange={handleLvl1Change}
            />
            {isTwoLevel &&
                <Dropdown
                    options={Lvl2Options}
                    size={size}
                    variant={variant}
                    layout="horizontal"
                    width={width}
                    fullWidth={fullWidth}
                    disabled={disabled}
                    value={lvl2Value}
                    onChange={handleLvl2Change}
                />
            }
        </div>
    );
};
DataDropdown.displayName = "DataDropdown";