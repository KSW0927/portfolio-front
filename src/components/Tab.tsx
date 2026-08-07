/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, forwardRef, useEffect, useState, useRef, useId, Children, isValidElement } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, KeyboardEvent } from "react";

export type TabVariant = "line" | "chip";

interface TabContextValue {
    activeValue: string | number;
    onChange: (value: string | number) => void;
    variant: TabVariant;
    tabIdPrefix: string;
}

const TabContext = createContext<TabContextValue | null>(null);

/**
 * Tab.Provider 컴포넌트 속성 (Props)
 */
export interface TabProviderProps {
    /** 현재 활성화된 탭의 식별 값 */
    value: string | number;
    /** 탭 변경 시 호출되는 콜백 함수 */
    onChange: (value: string | number) => void;
    /** 탭의 시각적 스타일 설정 */
    variant?: TabVariant;
    /** Tab 및 Tab.Panel을 포함하는 자식 요소 */
    children: ReactNode;
}

/**
 * Tab.Panel을 Tab 컴포넌트 외부에서 사용할 때 context를 공유하기 위한 Provider입니다.
 */
const TabProvider = ({ value, onChange, variant = "line", children }: TabProviderProps) => {
    const tabIdPrefix = useId();
    return (
        <TabContext.Provider value={{ activeValue: value, onChange, variant, tabIdPrefix }}>
            {children}
        </TabContext.Provider>
    );
};
TabProvider.displayName = "Tab.Provider";

/**
 * Tab 컴포넌트 속성 (Props)
 */
export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** 탭의 시각적 스타일 설정 */
    variant?: TabVariant;
    /** 현재 활성화된 탭의 식별 값 */
    value: string | number;
    /** 탭 변경 시 호출되는 콜백 함수 */
    onChange: (value: string | number) => void;
    /** Tab.Item 및 Tab.Panel을 포함하는 자식 요소 */
    children: ReactNode;
    /** 스크린 리더 등 보조 기기를 위한 탭 리스트의 접근성 레이블 */
    label?: string;
}

/**
 * 탭의 상태를 관리하고 하위 컴포넌트(Tab.Item, Tab.Panel)에 컨텍스트를 제공합니다.
 * WAI-ARIA 접근성 표준 및 키보드 내비게이션을 지원합니다.
 */
const TabRoot = forwardRef<HTMLDivElement, TabProps>(
    ({ variant = "line", value, onChange, className = "", children, label, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
        const parentContext = useContext(TabContext);
        const generatedId = useId();
        // Tab.Provider 안에 있으면 동일한 ID prefix를 사용해 ARIA 관계를 유지
        const tabIdPrefix = parentContext?.tabIdPrefix ?? generatedId;

        const setRefs = (element: HTMLDivElement | null) => {
            containerRef.current = element;
            if (typeof ref === "function") ref(element);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
        };

        const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
            const tabs = Array.from(containerRef.current?.querySelectorAll('.tab-item:not(:disabled)') || []) as HTMLElement[];
            if (tabs.length === 0) return;

            const currIdx = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
            let nextIdx: number | null = null;

            switch (e.key) {
                case "ArrowRight":
                    nextIdx = (currIdx + 1) % tabs.length;
                    break;
                case "ArrowLeft":
                    nextIdx = (currIdx - 1 + tabs.length) % tabs.length;
                    break;
                case "Home":
                    nextIdx = 0;
                    break;
                case "End":
                    nextIdx = tabs.length - 1;
                    break;
                default:
                    return;
            }

            if (nextIdx !== null) {
                e.preventDefault();
                tabs[nextIdx].focus();
                const nextValue = tabs[nextIdx].getAttribute('data-value');
                if (nextValue) {
                    const parsedValue = isNaN(Number(nextValue)) ? nextValue : Number(nextValue);
                    onChange(parsedValue);
                }
            }
        };

        useEffect(() => {
            if (variant !== "line") return;
            const updateIndicator = () => {
                const activeTab = containerRef.current?.querySelector('.tab-item[aria-selected="true"]') as HTMLElement;
                if (activeTab) {
                    setIndicatorStyle({
                        left: activeTab.offsetLeft,
                        width: activeTab.offsetWidth,
                        opacity: 1,
                    });
                }
            };
            setTimeout(updateIndicator, 0);
            window.addEventListener('resize', updateIndicator);
            return () => window.removeEventListener('resize', updateIndicator);
        }, [value, variant, children]);

        const items: ReactNode[] = [];
        const panels: ReactNode[] = [];

        Children.forEach(children, (child) => {
            if (isValidElement(child) && (child.type as { displayName?: string }).displayName === "Tab.Panel") {
                panels.push(child);
            } else {
                items.push(child);
            }
        });

        return (
            <TabContext.Provider value={{ activeValue: value, onChange, variant, tabIdPrefix }}>
                <div className={`tab-container ${className}`} {...props}>
                    <div
                        ref={setRefs}
                        role="tablist"
                        aria-label={label}
                        className={`tab-list -${variant}`}
                        onKeyDown={handleKeyDown}
                    >
                        {items}
                        {variant === "line" && (
                            <span
                                className="tab-indicator"
                                aria-hidden="true"
                                style={{
                                    left: `${indicatorStyle.left}px`,
                                    width: `${indicatorStyle.width}px`,
                                    opacity: indicatorStyle.opacity
                                }}
                            />
                        )}
                    </div>
                    {panels}
                </div>
            </TabContext.Provider>
        );
    }
);
TabRoot.displayName = "Tab";

/**
 * Tab.Item 컴포넌트 속성 (Props)
 */
export interface TabItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    /** 탭을 식별하는 고유 값 */
    value: string | number;
    /** 탭 텍스트 옆에 표시할 뱃지 컴포넌트 */
    badge?: ReactNode;
    /** 탭에 표시될 텍스트 또는 노드 */
    children: ReactNode;
}

const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
    ({ value, badge, className = "", children, disabled, ...props }, ref) => {
        const context = useContext(TabContext);
        if (!context) throw new Error("Tab.Item은 Tab 컴포넌트 내부에서 사용되어야 합니다.");

        const isActive = String(context.activeValue) === String(value);

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                id={`${context.tabIdPrefix}-item-${value}`}
                aria-selected={isActive}
                aria-controls={`${context.tabIdPrefix}-panel-${value}`}
                tabIndex={isActive ? 0 : -1}
                disabled={disabled}
                data-value={value}
                className={["tab-item", className].filter(Boolean).join(" ")}
                onClick={() => !disabled && context.onChange(value)}
                {...props}
            >
                {badge && <span className="tab-badge">{badge}</span>}
                {children}
            </button>
        );
    }
);
TabItem.displayName = "Tab.Item";

/**
 * Tab.Panel 컴포넌트 속성 (Props)
 */
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    /** 연결될 탭 아이템의 고유 값 */
    value: string | number;
    /** 패널 안에 표시될 내용 */
    children: ReactNode;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
    ({ value, children, className = "", ...props }, ref) => {
        const context = useContext(TabContext);
        if (!context) return null;

        const isActive = String(context.activeValue) === String(value);

        return (
            <div
                ref={ref}
                role="tabpanel"
                id={`${context.tabIdPrefix}-panel-${value}`}
                aria-labelledby={`${context.tabIdPrefix}-item-${value}`}
                hidden={!isActive}
                tabIndex={0}
                className={["tab-panel", className].filter(Boolean).join(" ")}
                {...props}
            >
                {isActive && children}
            </div>
        );
    }
);
TabPanel.displayName = "Tab.Panel";

export const Tab = Object.assign(TabRoot, {
    Item: TabItem,
    Panel: TabPanel,
    Provider: TabProvider,
});
