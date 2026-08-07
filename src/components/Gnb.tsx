import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMenuStore } from "@/store/menuStore";

import { logout as logoutApi } from "@/api";

// 컴포넌트
import { Button } from "@/components";

// 상수 정의
const DEFAULT_AUTO_LOGOUT_SECONDS = 10 * 60;
const ENV_AUTO_LOGOUT_SECONDS = Number(import.meta.env.VITE_AUTO_LOGOUT_SECONDS);
const AUTO_LOGOUT_SECONDS =
    Number.isFinite(ENV_AUTO_LOGOUT_SECONDS) && ENV_AUTO_LOGOUT_SECONDS > 0
        ? Math.floor(ENV_AUTO_LOGOUT_SECONDS)
        : DEFAULT_AUTO_LOGOUT_SECONDS;
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = ['mousedown', 'keydown', 'scroll', 'touchstart'];


/**
 * 시스템 최상단 헤더(Global Navigation Bar) 영역을 담당하는 컴포넌트입니다.
 */
export const GNB = () => {
    const navigate = useNavigate();
    const { user, logout: clearAuth } = useAuth();
    const { reset } = useMenuStore();
    const userNm = user?.name || user?.id || "User";
    const userRole = user?.userSe || "User";
    const hasAutoLoggedOutRef = useRef(false);
    const gnbRef = useRef<HTMLElement>(null);

    /* 상태 정의 */
    const [activePopup, setActivePopup] = useState<"profile" | null>(null);
    const [remainingSeconds, setRemainingSeconds] = useState(AUTO_LOGOUT_SECONDS); // 섹션 남은 시간

    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const seconds = String(remainingSeconds % 60).padStart(2, '0');

    // 세션 타입 초기화
    useEffect(() => {
        setRemainingSeconds(AUTO_LOGOUT_SECONDS);
        hasAutoLoggedOutRef.current = false;
    }, [user?.id]);
    // 세션 타이머 업데이트
    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {

        }
        const timerMin = window.setInterval(fetchData, 60000); // 일정 간격 정보 업데이트(1분단위)

        // 세션 타이머 업데이트
        const timer = window.setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    window.clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // 사용자 페이지 이용 시 세션 유지
        const handleUserActivity = () => {
            hasAutoLoggedOutRef.current = false;
            setRemainingSeconds(AUTO_LOGOUT_SECONDS);
        };
        // 이벤트 등록
        ACTIVITY_EVENTS.forEach((eventName) => {
            window.addEventListener(eventName, handleUserActivity, { passive: true });
        });

        // 종료 시 초기화
        return () => {
            // 주기적 조회 데이터 타이머 제거
            window.clearInterval(timerMin);
            // 세션 타이머 제거
            window.clearInterval(timer);
            // 세션 유지 이벤트 제거
            ACTIVITY_EVENTS.forEach((eventName) => {
                window.removeEventListener(eventName, handleUserActivity);
            });
        };
    }, [user]);
    // 세션 타임 종료 시 로그아웃
    useEffect(() => {
        if (!user || remainingSeconds > 0 || hasAutoLoggedOutRef.current) return;

        hasAutoLoggedOutRef.current = true;
        void performLogout();
    }, [remainingSeconds, user]);

    // 외부 클릭 시 팝업을 닫는 핸들러를 등록합니다.
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (gnbRef.current && !gnbRef.current.contains(e.target as Node)) {
                setActivePopup(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* 이벤트 정의 */
    // 팝업 오픈 토클 이벤트
    const togglePopup = (popupName: "profile") => {
        setActivePopup((prev) => (prev === popupName ? null : popupName));
    };

    // 키 다운 이벤트
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setActivePopup(null);
        }
    };

    // 로고 클릭 이벤트
    const handleLogoClick = () => {
        reset();
    };

    // 시간연장 클릭 이벤트
    const handleExtendSession = () => {
        hasAutoLoggedOutRef.current = false;
        setRemainingSeconds(AUTO_LOGOUT_SECONDS);
    };

    // 로그아웃 처리
    const performLogout = async () => {
        try {
            if (user?.id) await logoutApi(user.id);
        } catch (err) {
            // Move to login even when logout API fails.
            console.error("Logout API failed:", err);
        }

        sessionStorage.removeItem("access_token");
        reset();
        clearAuth();
        navigate("/login", { replace: true });
    };

    // 로그아웃 클릭 이벤트
    const handleLogout = async () => {
        if (!window.confirm("로그아웃 하시겠습니까?")) return;
        await performLogout();
    };

    return (
        <header className="gnb" onKeyDown={handleKeyDown} ref={gnbRef}>
            <div className="gnb-top">
                <div className="gnb-left">
                    <h1 className="logo" onClick={handleLogoClick}></h1>
                </div>

                <div className="gnb-right">
                    <div className="gnb-user-info">
                        <div className="user-profile-wrap">
                            <button type="button" className="user-profile" aria-expanded={activePopup === "profile"} onClick={() => togglePopup("profile")}>
                                <span className="user-name">{userNm}({userRole})</span>
                            </button>
                            {activePopup === "profile" && (
                                <div className="gnb-dropdown">
                                    <ul className="gnb-dropdown-list">
                                        <li key="1" className="gnb-dropdown-item">
                                            <Button variant="text" className="button-title" onClick={handleLogout}>로그아웃</Button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="session-timer">
                            <span className="time">{minutes}:{seconds}</span>
                            <Button rounded className="button-extend" onClick={handleExtendSession}>연장</Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};