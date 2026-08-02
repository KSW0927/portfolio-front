import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsDark } from "@/hooks/useIsDark";
import profileWidgetBg from "@/assets/img/general/bg-MA-001-2.png";
import { Button, Card, Divider, Icon, Layout, Space, Switch, Typography } from "@/publishing/components";
import { WidgetRenderer } from "./WidgetRenderer";

/**
 * 대시보드 위젯의 크기 타입
 */
export type WidgetSize = "sm" | "md" | "lg";

/**
 * 대시보드에서 지원하는 위젯의 종류
 */
export type WidgetType = "profile" | "leave" | "approval" | "banner" | "oil" | "calendar" | "vote" | "favorite" | "notice" | "education" | "meeting" | "message" | "latestPost" | "orgList" | "survey" | "dataSearch" | "exchange" | "interestRate";

/**
 * 대시보드 개별 위젯의 메타데이터 인터페이스
 */
export interface WidgetData {
    id: string;
    iconEdit?: string;
    icon?: string;
    title: string;
    type: WidgetType;
    size: WidgetSize;
    expandable?: boolean;
    hasAction?: boolean;
    actionTitle?: string;
    action?: () => void;
}

/**
 * 사용자가 커스텀하여 저장한 테마 인터페이스
 */
interface SavedTheme {
    id: string;
    name: string;
    themeMode: string;
    skinColor: string;
    bgImage: string | null;
    widgetsOrder: WidgetData[];
    activeWidgets: string[];
}

const INITIAL_WIDGETS: WidgetData[] = [
    { id: "w1", iconEdit: "user", title: "프로필", type: "profile", size: "md" },
    { id: "w2", iconEdit: "leave-line", icon: "leave", title: "나의 연차", type: "leave", size: "sm" },
    { id: "w3", iconEdit: "bank", icon: "approval", title: "전자결재", type: "approval", size: "sm" },
    { id: "w4", iconEdit: "banner", title: "배너", type: "banner", size: "sm" },
    { id: "w5", iconEdit: "oil-prices", icon: "oil", title: "유가", type: "oil", size: "sm" },
    { id: "w6", iconEdit: "calendar", icon: "calendar2", title: "나의 일정", type: "calendar", size: "md", expandable: true },
    { id: "w7", iconEdit: "speaker", icon: "notice", title: "공지사항", type: "notice", size: "sm", expandable: true },
    { id: "w8", iconEdit: "menu-w", icon: "favorite", title: "즐겨찾는 메뉴", type: "favorite", size: "sm", expandable: true },
    { id: "w9", iconEdit: "vote", icon: "vote2", title: "투표", type: "vote", size: "sm", expandable: true },
    { id: "w10", iconEdit: "register", icon: "education", title: "교육 신청내역 /현황", type: "education", size: "sm", expandable: true },
    { id: "w11", iconEdit: "meeting-line", icon: "meeting", title: "회의실", type: "meeting", size: "sm", expandable: true, hasAction: true, actionTitle: "예약하기", action: () => { } },
    { id: "w12", iconEdit: "message", icon: "message2", title: "쪽지", type: "message", size: "sm", expandable: true, hasAction: true, actionTitle: "쪽지 보내기", action: () => { } },
    { id: "w13", iconEdit: "inbox", icon: "post-latest", title: "최신 게시글", type: "latestPost", size: "sm", expandable: true },
    { id: "w14", iconEdit: "org-char", icon: "organization", title: "조직도", type: "orgList", size: "sm", expandable: true },
    { id: "w15", iconEdit: "checklist", icon: "survey", title: "설문", type: "survey", size: "sm", expandable: true },
    { id: "w16", iconEdit: "management", icon: "data-search", title: "비정형 데이터 검색", type: "dataSearch", size: "sm", expandable: true, hasAction: true, actionTitle: "신규 비정형 DATA 만들기", action: () => { } },
    { id: "w17", iconEdit: "global", icon: "exchange", title: "환율", type: "exchange", size: "sm" },
    { id: "w18", iconEdit: "bank_line", icon: "interest-rate", title: "금리", type: "interestRate", size: "sm" },
];

const MOCK_COLORS = [
    "#D8EFF4", "#D8F4F2", "#DAF6F8", "#D8F4DE", "#E2EEDA",
    "linear-gradient(142.13deg, #F6F9FF 16.85%, #DAE8FF 87.5%)", "linear-gradient(142.13deg, #F6F6FF 16.85%, #DADCFF 87.5%)", "linear-gradient(142.13deg, #FCF6FF 16.85%, #ECDAFF 87.5%)", "linear-gradient(142.13deg, #F6FFFB 16.85%, #D8F4F2 87.5%)", "linear-gradient(142.13deg, #F6FDFF 16.85%, #DAF6F8 87.5%)",
    "#203663", "#28447C", "#305398", "#3F64AD", "#567DC8",
    "#333333", "#D2D9E3", "#EAECEE", "#F4F6F8", "#FFFFFF"
];

const HOVER_DELAY_MS = 500;

/**
 * 사용자 맞춤형 대시보드 컴포넌트
 * 위젯의 드래그 앤 드롭 배치, 크기 조절, 테마 스킨 변경 기능을 제공합니다.
 */
export const Dashboard = () => {
    const isDark = useIsDark();

    const [widgets, setWidgets] = useState<WidgetData[]>(INITIAL_WIDGETS);
    const [activeWidgetIds, setActiveWidgetIds] = useState<Set<string>>(new Set(INITIAL_WIDGETS.map(w => w.id)));

    const [themeMode, setThemeMode] = useState("light");
    const [skinColor, setSkinColor] = useState("linear-gradient(142.13deg, #F6F9FF 16.85%, #DAE8FF 87.5%)");
    const [bgImage, setBgImage] = useState<string | null>("");

    const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
    const [currentThemeName, setCurrentThemeName] = useState<string>("나만의 테마");

    const [profileBgImage, setProfileBgImage] = useState<string | null>(profileWidgetBg);
    const profileBgInputRef = useRef<HTMLInputElement>(null);
    const bgInputRef = useRef<HTMLInputElement>(null);

    const [activePopup, setActivePopup] = useState<"widget" | "theme" | "saved" | null>(null);
    const [activeKebabId, setActiveKebabId] = useState<string | null>(null);

    const [draggingId, setDraggingId] = useState<string | null>(null);

    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const rectsRef = useRef<Map<string, DOMRect>>(new Map());
    const originalWidgetsRef = useRef<WidgetData[]>([]);
    const draggingIdRef = useRef<string | null>(null);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const hoverTargetRef = useRef<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (activePopup && headerRef.current && !headerRef.current.contains(target)) {
                setActivePopup(null);
            }

            if (!target.closest('.button-expand-widget') && !target.closest('.widget-setting-popup') && !target.closest('.button-widget-settings')) {
                setActiveKebabId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activePopup]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", themeMode);
    }, [themeMode]);

    const handleThemeModeChange = useCallback((mode: "light" | "dark") => {
        setThemeMode(mode);

        if (mode === "dark") {
            setSkinColor("var(--dash-bg-page)");
        } else {
            setSkinColor("linear-gradient(142.13deg, #F6F9FF 16.85%, #DAE8FF 87.5%)");
        }

        setBgImage(null);
        if (bgInputRef.current) {
            bgInputRef.current.value = "";
        }
    }, []);

    const captureRects = useCallback(() => {
        if (!gridRef.current) return;
        (Array.from(gridRef.current.children) as HTMLElement[]).forEach((child) => {
            const id = child.dataset.id;
            if (id) rectsRef.current.set(id, child.getBoundingClientRect());
        });
    }, []);

    const togglePopup = useCallback((popupName: "widget" | "theme" | "saved") => {
        setActivePopup(prev => prev === popupName ? null : popupName);
    }, []);

    const handleWidgetToggle = useCallback((id: string) => {
        setActiveWidgetIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    }, []);

    const handleDeleteWidget = useCallback((id: string) => {
        handleWidgetToggle(id);
        setActiveKebabId(null);
    }, [handleWidgetToggle]);

    const handleResize = useCallback((index: number) => {
        captureRects();
        setWidgets(prev => {
            const next = [...prev];
            next[index] = {
                ...next[index],
                size: next[index].size === "sm" ? "md" : next[index].size === "md" ? "lg" : "md"
            };
            return next;
        });
    }, [captureRects]);

    const handleExpandWidget = useCallback((id: string) => {
        const index = widgets.findIndex(w => w.id === id);
        if (index !== -1) handleResize(index);
        setActiveKebabId(null);
    }, [widgets, handleResize]);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let file: File | null = null;

        if ("dataTransfer" in e) {
            file = e.dataTransfer.files[0];
        } else if ("target" in e && e.target.files) {
            file = e.target.files[0];
        }

        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) setBgImage(ev.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleSaveTheme = useCallback(() => {
        const themeName = window.prompt("저장할 테마 명을 입력해주세요.");
        if (themeName && themeName.trim() !== "") {
            const newTheme: SavedTheme = {
                id: Date.now().toString(),
                name: themeName,
                themeMode,
                skinColor,
                bgImage,
                widgetsOrder: widgets,
                activeWidgets: Array.from(activeWidgetIds)
            };
            setSavedThemes(prev => [...prev, newTheme]);
            setCurrentThemeName(themeName);
            setActivePopup(null);
            alert("테마가 저장되었습니다.");
        }
    }, [themeMode, skinColor, bgImage, widgets, activeWidgetIds]);

    const handleApplySavedTheme = useCallback((theme: SavedTheme) => {
        setThemeMode(theme.themeMode);
        setSkinColor(theme.skinColor);
        setBgImage(theme.bgImage);
        setWidgets(theme.widgetsOrder);
        setActiveWidgetIds(new Set(theme.activeWidgets));
        setCurrentThemeName(theme.name);
        setActivePopup(null);
    }, []);

    const handleDeleteTheme = useCallback((e: React.MouseEvent, themeId: string) => {
        e.stopPropagation();
        setSavedThemes(prev => prev.filter(t => t.id !== themeId));
    }, []);

    const handleProfileBgUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type.startsWith("image/"))) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setProfileBgImage(ev.target.result as string);
                    setActiveKebabId(null);
                }
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    }, []);

    // FLIP 애니메이션 처리
    useLayoutEffect(() => {
        if (!gridRef.current) return;
        (Array.from(gridRef.current.children) as HTMLElement[]).forEach((child) => {
            const id = child.dataset.id;
            if (!id) return;

            const newRect = child.getBoundingClientRect();
            const oldRect = rectsRef.current.get(id);

            if (oldRect) {
                const dx = oldRect.left - newRect.left;
                const dy = oldRect.top - newRect.top;

                if (dx !== 0 || dy !== 0) {
                    child.style.transform = `translate(${dx}px, ${dy}px)`;
                    child.style.transition = "none";
                    requestAnimationFrame(() => {
                        child.style.transform = "";
                        child.style.transition = "transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)";
                    });
                }
            }
            rectsRef.current.set(id, newRect);
        });
    }, [widgets]);

    const clearHoverTimer = useCallback(() => {
        if (hoverTimerRef.current !== null) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
        hoverTargetRef.current = null;
    }, []);

    const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
        originalWidgetsRef.current = [...widgets];
        draggingIdRef.current = id;
        setDraggingId(id);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", id);

        const target = e.currentTarget;
        setTimeout(() => { target.style.opacity = "0.25"; }, 0);
    }, [widgets]);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>, targetId: string) => {
        e.preventDefault();
        const currentDraggingId = draggingIdRef.current;
        if (!currentDraggingId || currentDraggingId === targetId) return;
        if (hoverTargetRef.current === targetId) return;

        clearHoverTimer();
        hoverTargetRef.current = targetId;

        hoverTimerRef.current = setTimeout(() => {
            const id = draggingIdRef.current;
            if (!id) return;

            setWidgets(prev => {
                const fromIndex = prev.findIndex(w => w.id === id);
                const toIndex = prev.findIndex(w => w.id === targetId);
                if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return prev;

                captureRects();
                const next = [...prev];
                const [moved] = next.splice(fromIndex, 1);
                next.splice(toIndex, 0, moved);
                return next;
            });

            hoverTargetRef.current = null;
        }, HOVER_DELAY_MS);
    }, [captureRects, clearHoverTimer]);

    const handleCardDragLeave = useCallback(() => {
        clearHoverTimer();
    }, [clearHoverTimer]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        clearHoverTimer();
    }, [clearHoverTimer]);

    const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        clearHoverTimer();
        e.currentTarget.style.opacity = "1";
        draggingIdRef.current = null;
        setDraggingId(null);
    }, [clearHoverTimer]);

    const handleGridDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (gridRef.current?.contains(e.relatedTarget as Node)) return;
        clearHoverTimer();
        captureRects();
        setWidgets(originalWidgetsRef.current);
    }, [captureRects, clearHoverTimer]);

    const visibleWidgets = widgets.filter(w => activeWidgetIds.has(w.id));

    return (
        <Layout
            activeMenuId=""
            className="dashboard"
            style={{
                background: bgImage ? `url(${bgImage}) center top / cover no-repeat` : skinColor
            }}
        >
            <Layout.Row layout="vertical" gap={22} className="dashboard-content">
                <div ref={headerRef}>
                    <Layout.Row justify="space-between" className="dashboard-header">
                        <Layout.Col layout="horizontal" align="center" gap={18} style={{ position: "relative" }}>
                            <h2 className="dashboard-title">나의 대시보드</h2>

                            <div style={{ position: "relative" }}>
                                <Button
                                    variant="outlined"
                                    aria-haspopup="true"
                                    aria-expanded={activePopup === "widget"}
                                    rightIcon={<Icon name="arrow-down" size={18} color={isDark ? "var(--dash-text-disabled)" : "var(--dash-text-secondary)"} />}
                                    onClick={() => togglePopup("widget")}
                                    style={isDark ? { backgroundColor: "var(--dash-bg-theme-btn)", borderColor: "var(--dash-border-muted)", color: "var(--dash-text-primary)" } : {}}
                                >
                                    위젯 편집
                                </Button>

                                {activePopup === "widget" && (
                                    <div className="popup-dropdown widget-edit-popup">
                                        <ul>
                                            {INITIAL_WIDGETS.map(widget => (
                                                <li key={widget.id}>
                                                    <Space size="sm">
                                                        {widget.iconEdit && <Icon name={widget.iconEdit} size={18} color={isDark ? "var(--dash-accent-icon-dark)" : "var(--dash-accent-icon-light)"} />}
                                                        <Typography variant="body-md" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-base)"}>{widget.title}</Typography>
                                                    </Space>
                                                    <Switch
                                                        checked={activeWidgetIds.has(widget.id)}
                                                        onChange={() => handleWidgetToggle(widget.id)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="info-wrap">
                                            <Icon name="info-filled" size={16} color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-secondary)"} />
                                            <div>테마 저장은 우측 상단의 저장하기를 완료한 경우에 적용됩니다.</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Layout.Col>

                        <Layout.Col layout="horizontal" align="center" gap={8} width="none" className="header-right" style={{ position: "relative" }}>
                            <div style={{ position: "relative" }}>
                                <Button
                                    variant="outlined" size="sm" rounded
                                    aria-haspopup="true"
                                    aria-expanded={activePopup === "widget"}
                                    leftIcon={<Icon name="change-theme" size={18} />} rightIcon={<Icon name="arrow-down" size={18} color={isDark ? "var(--dash-text-disabled)" : "var(--dash-text-secondary)"} />}
                                    onClick={() => togglePopup("theme")}
                                    style={isDark ? { backgroundColor: "var(--dash-bg-elevated)", borderColor: "var(--dash-border-base)", color: "var(--dash-text-primary)" } : {}}
                                >
                                    스킨변경
                                </Button>

                                {activePopup === "theme" && (
                                    <div className="popup-dropdown theme-change-popup">
                                        <Typography variant="body-md" as="h4" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-secondary)"}>스킨 설정</Typography>
                                        <Divider spacing={12} color={isDark ? "var(--dash-border-base)" : ""} />

                                        <div className="theme-section">
                                            <label>테마모드</label>
                                            <Space size="sm">
                                                <Button className={`button-theme-mode ${themeMode === "light" ? "-active" : ""}`} leftIcon={<Icon name="light-mode" size={16} color="#C8C8C8" />} onClick={() => handleThemeModeChange("light")}>라이트</Button>
                                                <Button className={`button-theme-mode ${themeMode === "dark" ? "-active" : ""}`} leftIcon={<Icon name="dark-mode" size={16} color="#C8C8C8" />} onClick={() => handleThemeModeChange("dark")}>다크</Button>
                                            </Space>
                                        </div>

                                        <Divider spacing={14} color={isDark ? "var(--dash-border-base)" : ""} />

                                        <div className="theme-section">
                                            <label>스킨 컬러</label>
                                            <div className="color-chip-grid">
                                                {MOCK_COLORS.map(color => (
                                                    <button
                                                        key={color}
                                                        aria-label={`스킨 컬러 ${color} 선택`}
                                                        onClick={() => {
                                                            setSkinColor(color);
                                                            setBgImage(null);
                                                            if (bgInputRef.current) {
                                                                bgInputRef.current.value = "";
                                                            }
                                                        }}
                                                        className="button-color-chip"
                                                        style={{
                                                            background: color,
                                                            border: skinColor === color
                                                                ? "2px solid var(--dash-accent-primary-alt)"
                                                                : color === "#FFFFFF"
                                                                    ? "1px solid #E4E4E4"
                                                                    : "1px solid transparent",
                                                            boxShadow: skinColor === color ? "0px 0.3rem 0.7rem 0px rgba(0, 0, 0, 0.14)" : "",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <Divider spacing={14} color={isDark ? "var(--dash-border-base)" : ""} />

                                        <div className="theme-section">
                                            <label>배경 이미지</label>
                                            <div
                                                className="upload-area"
                                                role="button"
                                                tabIndex={0}
                                                aria-label="배경 이미지 업로드"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={handleImageUpload}
                                                onClick={() => bgInputRef.current?.click()}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        bgInputRef.current?.click();
                                                    }
                                                }}
                                            >
                                                <Space layout="vertical" justify="center" align="center" size="sm">
                                                    <Icon name="upload-img" size={35} />
                                                    <p>클릭하거나 드래그하여 업로드</p>
                                                    <p className="subtxt">PNG, JPG 지원</p>
                                                </Space>
                                                <input type="file" id="bg-upload" ref={bgInputRef} accept=".png, .jpg, .jpeg" hidden onChange={handleImageUpload} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ position: "relative" }}>
                                <Button
                                    variant="outlined" size="sm" rounded
                                    aria-haspopup="true"
                                    aria-expanded={activePopup === "widget"}
                                    leftIcon={<div className="theme-dot" style={{ backgroundColor: "var(--dash-accent-primary)" }}></div>} rightIcon={<Icon name="arrow-down" size={18} color={isDark ? "var(--dash-text-disabled)" : "var(--dash-text-secondary)"} />}
                                    onClick={() => togglePopup("saved")}
                                    style={isDark ? { backgroundColor: "var(--dash-bg-elevated)", borderColor: "var(--dash-border-base)", color: "var(--dash-text-primary)" } : {}}
                                >
                                    {savedThemes.length > 0 ? currentThemeName : "테마 없음"}
                                </Button>

                                {activePopup === "saved" && (
                                    <div className="popup-dropdown saved-themes-popup">
                                        <ul>
                                            {savedThemes.length === 0 ? (
                                                <li style={{ padding: "1.6rem 0", justifyContent: "center", color: "var(--dash-text-tertiary)", fontSize: "1.4rem" }}>저장된 테마가 없습니다.</li>
                                            ) : (
                                                savedThemes.map(theme => (
                                                    <li key={theme.id} onClick={() => handleApplySavedTheme(theme)}>
                                                        <Typography variant="body-md" color={currentThemeName === theme.name ? "var(--dash-primary)" : "var(--dash-text-secondary)"}>
                                                            {theme.name}
                                                        </Typography>
                                                        <Button variant="text" leftIcon={<Icon name="close" size={18} />} onClick={(e) => handleDeleteTheme(e, theme.id)}></Button>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="solid" size="sm" rounded
                                leftIcon={<Icon name="add" size={18} color="var(--dash-fixed-white)" />}
                                onClick={handleSaveTheme}
                            >
                                저장하기
                            </Button>
                        </Layout.Col>
                    </Layout.Row>
                </div>

                <div
                    className={`widget-grid ${draggingId !== null ? "is-dragging-active" : ""}`}
                    ref={gridRef}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={handleGridDragLeave}
                >
                    {visibleWidgets.map((widget) => {
                        const isDragging = draggingId === widget.id;

                        return (
                            <Card
                                key={widget.id}
                                data-id={widget.id}
                                className={`widget-card -size-${widget.size} ${isDragging ? "is-dragging" : ""} ${widget.type === "profile" && "profile"} ${widget.type === "banner" && "banner"} ${widget.type === "orgList" && "orgList"}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, widget.id)}
                                onDragOver={(e) => handleDragOver(e, widget.id)}
                                onDragLeave={handleCardDragLeave}
                                onDragEnd={handleDragEnd}
                            >
                                <WidgetRenderer
                                    widget={widget}
                                    activeKebabId={activeKebabId}
                                    setActiveKebabId={setActiveKebabId}
                                    handleDeleteWidget={handleDeleteWidget}
                                    handleExpandWidget={handleExpandWidget}
                                    profileBgImage={profileBgImage}
                                    profileBgInputRef={profileBgInputRef}
                                    handleProfileBgUpload={handleProfileBgUpload}
                                />
                            </Card>
                        );
                    })}
                </div>
            </Layout.Row >
        </Layout >
    );
};