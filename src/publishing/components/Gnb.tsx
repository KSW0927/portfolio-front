/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/img/general/common/logo.png";
import LogoMob from "@/assets/img/general/common/logo-mob.png";
import LogoWhite from "@/assets/img/general/common/logo-white.png";
import { useIsDark } from "@/hooks/useIsDark";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Button, Icon, Input } from "@/publishing/components";

const favoriteList = [
    { id: 1, title: "즐겨찾기 A" },
    { id: 2, title: "즐겨찾기 B" },
    { id: 3, title: "즐겨찾기 C" },
    { id: 4, title: "즐겨찾기 D" },
    { id: 5, title: "즐겨찾기 E" },
];

const messageList = [
    { id: 1, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 2, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 3, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 4, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 5, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 6, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 7, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
    { id: 8, title: "[회의 일정 조정 요청드립니다. 오늘 중 회신 바랍니다.]" },
];

const notificationList = [
    { id: 1, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 2, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 3, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 4, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 5, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 6, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 7, title: "[업무 만족도 설문조사가 D-3일 입니다." },
    { id: 8, title: "[업무 만족도 설문조사가 D-3일 입니다." },
];

/**
 * GNB 컴포넌트 속성 (Props)
 */
interface GNBProps {
    onThemeChange?: (themeClass: string) => void;
    onMobileMenuOpen?: () => void;
}
/**
 * @description 시스템 최상단 헤더(Global Navigation Bar) 영역을 담당하는 컴포넌트입니다.
 */
export const GNB = ({ onThemeChange, onMobileMenuOpen }: GNBProps) => {
    const isDark = useIsDark();
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState<string>("portal");
    const [unreadMessageCount, setUnreadMessageCount] = useState(1);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activePopup, setActivePopup] = useState<"favorite" | "message" | "notification" | "profile" | null>(null);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);
    const gnbRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (gnbRef.current && !gnbRef.current.contains(e.target as Node)) {
                setActivePopup(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSearch = useCallback(() => {
        setIsSearchOpen((prev) => !prev);
        setActivePopup(null);
    }, []);

    const togglePopup = (popupName: "favorite" | "message" | "notification" | "profile") => {
        setActivePopup((prev) => (prev === popupName ? null : popupName));
        setIsSearchOpen(false);
    };

    useEffect(() => {
        if (isSearchOpen) {
            lastFocusedElementRef.current = document.activeElement as HTMLElement;
            const timer = setTimeout(() => {
                searchInputRef.current?.focus();
            }, 0);
            return () => clearTimeout(timer);
        } else {
            if (lastFocusedElementRef.current) {
                lastFocusedElementRef.current.focus();
            }
        }
    }, [isSearchOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsSearchOpen(false);
            setActivePopup(null);
        }
    };

    const handleTabClick = (tabId: string, themeClass: string) => {
        setActiveTab(tabId);
        if (onThemeChange) {
            onThemeChange(themeClass);
        }
    };

    if (isMobile) {
        return (
            <header className="gnb-mobile">
                <div className="gnb-left">
                    <h1 className="logo">
                        <Link to="/">
                            <img src={LogoMob} alt="(주) KSS 해운" />
                        </Link>
                    </h1>
                </div>
                <div className="gnb-right">
                    <Button variant="text" leftIcon={<Icon name="mobile-search" size={26} />} aria-label="검색" />
                    <Button variant="text" leftIcon={<Icon name="mobile-menu" size={26} />} onClick={onMobileMenuOpen} aria-label="메뉴 열기" />
                </div>
            </header>
        )
    }

    return (
        <header className="gnb" onKeyDown={handleKeyDown} ref={gnbRef}>
            <div className="gnb-top">
                <div className="gnb-left">
                    <h1 className="logo">
                        <Link to="/">
                            <img src={isDark ? LogoWhite : Logo} alt="(주) KSS 해운 업무포털" />
                        </Link>
                    </h1>

                    <nav className="gnb-tabs">
                        <button type="button" className={`tab-btn portal ${activeTab === "portal" ? "-active" : ""}`} onClick={() => handleTabClick("portal", "")}>
                            <Icon name="user" size={24} /><span>업무포털</span>
                        </button>
                        <button type="button" className={`tab-btn strategy ${activeTab === "strategy" ? "-active" : ""}`} onClick={() => handleTabClick("strategy", "theme-ocean")}>
                            <Icon name="folder" size={24} /><span>전략기획 시스템</span>
                        </button>
                        <button type="button" className={`tab-btn operation ${activeTab === "operation" ? "-active" : ""}`} onClick={() => handleTabClick("operation", "theme-indigo")}>
                            <Icon name="settings" size={24} /><span>운영관리 시스템</span>
                        </button>
                        <button type="button" className="tab-btn">
                            <Icon name="erp" size={24} /><span>ERP</span><Icon name="external-link" size={14} />
                        </button>
                    </nav>
                </div>

                <div className="gnb-right">
                    <Button leftIcon={<Icon name="bell" size={24} />} rounded className="button-alarm">
                        비상대응
                    </Button>

                    <div className="gnb-right">
                        <div className="gnb-utils">
                            <div className="gnb-util-wrap">
                                <Button variant="text" size="sm" aria-label="검색창 열기" leftIcon={<Icon name="search" size={32} />} aria-expanded={isSearchOpen} onClick={toggleSearch} />
                            </div>
                            <div className="gnb-util-wrap">
                                <Button variant="text" size="sm" aria-label="즐겨찾기" leftIcon={<Icon name="star" size={32} />} aria-expanded={activePopup === "favorite"} onClick={() => togglePopup("favorite")} />
                                {activePopup === "favorite" && (
                                    <div className="gnb-dropdown">
                                        <ul className="gnb-dropdown-list">
                                            {favoriteList.map((item) => (
                                                <li key={item.id} className="gnb-dropdown-item">
                                                    <Button variant="text" leftIcon={<Icon name="star-filled" size={18} color="#FFBE32" />} className="button-title">{item.title}</Button>
                                                    <Button variant="text" leftIcon={<Icon name="close" size={18} color="#999" />} className="button-del" aria-label="삭제" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="gnb-util-wrap">
                                <Button
                                    variant="text" size="sm" aria-label="쪽지" className="button-message"
                                    leftIcon={
                                        <div className="badge-wrap">
                                            <Icon name="message" size={32} />
                                            {unreadMessageCount > 0 && <Badge color="red" rounded aria-label="새로운 알림">{unreadMessageCount > 99 ? "99+" : unreadMessageCount}</Badge>}
                                        </div>
                                    }
                                    aria-expanded={activePopup === "message"} onClick={() => togglePopup("message")}
                                />
                                {activePopup === "message" && (
                                    <div className="gnb-dropdown">
                                        <div className="goto-link">
                                            <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} />} title="쪽지 바로가기">쪽지</Button>
                                        </div>
                                        <ul className={`gnb-dropdown-list ${messageList.length > 5 && "scroll-y"}`}>
                                            {messageList.map((item) => (
                                                <li key={item.id} className="gnb-dropdown-item">
                                                    <Button variant="text" className="button-title">{item.title}</Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="gnb-util-wrap">
                                <Button variant="text" size="sm" aria-label="알림" leftIcon={<Icon name="bell" size={32} />} aria-expanded={activePopup === "notification"} onClick={() => togglePopup("notification")} />
                                {activePopup === "notification" && (
                                    <div className="gnb-dropdown">
                                        <div className="goto-link">
                                            <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} />} title="알림 바로가기">알림</Button>
                                        </div>
                                        <ul className={`gnb-dropdown-list ${notificationList.length > 5 && "scroll-y"}`}>
                                            {notificationList.map((item) => (
                                                <li key={item.id} className="gnb-dropdown-item">
                                                    <Button variant="text" className="button-title">{item.title}</Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="gnb-user-info">
                            <div className="user-profile-wrap">
                                <button type="button" className="user-profile" aria-expanded={activePopup === "profile"} onClick={() => togglePopup("profile")}>
                                    <span className="user-name">홍길동 대리</span>
                                </button>
                                {activePopup === "profile" && (
                                    <div className="gnb-dropdown">
                                        <ul className="gnb-dropdown-list">
                                            <li key="1" className="gnb-dropdown-item">
                                                <Button variant="text" className="button-title">로그아웃</Button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="session-timer">
                                <span className="time">00:56</span>
                                <Button rounded className="button-extend">시간연장</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {isSearchOpen && (
                    <div className="gnb-search-panel">
                        <div className="search-input-wrap">
                            <Input ref={searchInputRef} placeholder="검색어를 입력하세요." fullWidth />
                            <Button variant="solid" size="lg" color="primary" rounded leftIcon={<Icon name="search" size={24} color="#FFF" />} aria-label="검색 실행" />
                        </div>
                        <Button variant="text" leftIcon={<Icon name="close" size={32} color="#999" />} className="button-search-close" aria-label="검색창 닫기" onClick={() => setIsSearchOpen(false)} />
                    </div>
                )}
            </div>
        </header>
    );
};