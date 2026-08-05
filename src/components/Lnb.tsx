import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useMenuStore } from "@/store/menuStore";
import { type MenuItem } from "@/types/types.ts";
import { logout as logoutApi } from "@/api";
import { useAuth } from "@/hooks/useAuth.ts";
import { Button, Icon } from "@/components";
import { useIsMobile } from "@/hooks/useIsMobile";
import {ExternalSiteMove} from "@/utils/ExternalSiteMove.ts";

const DEFAULT_AUTO_LOGOUT_SECONDS = 10 * 60;
const ENV_AUTO_LOGOUT_SECONDS = Number(import.meta.env.VITE_AUTO_LOGOUT_SECONDS);
const AUTO_LOGOUT_SECONDS =
    Number.isFinite(ENV_AUTO_LOGOUT_SECONDS) && ENV_AUTO_LOGOUT_SECONDS > 0
        ? Math.floor(ENV_AUTO_LOGOUT_SECONDS)
        : DEFAULT_AUTO_LOGOUT_SECONDS;
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = ['mousedown', 'keydown', 'scroll', 'touchstart'];

/**
 * @description 좌측 메뉴 트리 및 아코디언 기능을 담당하는 Local Navigation Bar 컴포넌트입니다.
 */
export interface LNBProps {
  /** 메뉴 목록 데이터 */
  menus?: MenuItem[] | null;
  /** 사이드바 접힘 여부 */
  isCollapsed: boolean;
  /** 사이드바 접기/펼치기 토글 함수 */
  onToggle: () => void;
  /** 현재 활성화된 메뉴의 ID */
  activeMenuId?: string;
  /** 테마 적용을 위한 클래스명 */
  themeClass?: string;
  /** 모바일 메뉴 오픈 여부 */
  isMobileMenuOpen?: boolean;
  /** 모바일 메뉴 닫기 콜백 함수 */
  onMobileMenuClose?: () => void;
  /** 테마 변경 콜백 함수 */
  onThemeChange?: (theme: string) => void;
  /** 메뉴 클릭 콜백 함수 */
  onClickMenu?: (menu: MenuItem) => void;
}
export const LNB = (props: LNBProps) => {
  const { menus = [], isCollapsed, onToggle, themeClass = "", isMobileMenuOpen, onMobileMenuClose, onThemeChange, onClickMenu } = props;

  const location = useLocation(); // 현재 URL 정보
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout: clearAuth } = useAuth();
  const {
    currentServiceId, nowMenuId, expandedGroups,
    setCurrentServiceId, setNowMenuId, setNowMenuTitle, toggleGroups, reset, resetNowMenu
  } = useMenuStore();
  const userNm = user?.name || user?.id || "User";
  const userRole = user?.userSe || "User";
  const hasAutoLoggedOutRef = useRef(false);
  const currentSystemValue= (currentServiceId === "3") ? "operation" : (currentServiceId === "2") ? "strategy" : "portal";

  /* 상태 정의 */
  const isMobile = useIsMobile();
  const [currentMobileMenu, setCurrentMobileMenu] = useState<MenuItem>(); // 섹션 남은 시간
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

    // 일정 간격 정보 업데이트(1분단위)
    //const timerMin = window.setInterval(fetchData, 60000);

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
      //window.clearInterval(timerMin);
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

  useEffect(() => {
    const nowUrl = location.pathname;
    if("/main" === nowUrl) {
      // 메인으로 접속한 경우 선택된 메뉴 및 제목 초기화??
      resetNowMenu();
    } else {

    }
  }, [])

  /* 이벤트 정의 */
  // 모바일용: 서비스 변경 이벤트
  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const tmpServiceId = ("operation" === selectedValue ? "3" : ("strategy" === selectedValue ? "2" : "1"));

    if("operation" === selectedValue) {
      // noopener, noreferrer : 보안 및 성능 향상을 위한 옵션
      ExternalSiteMove.adminKssMainPage();
    } else if("erp" === selectedValue) {
      ExternalSiteMove.erpKssMainPage();
    } else {
      //선택된 서비스 저장
      setCurrentServiceId(tmpServiceId);

      if (onThemeChange) {
        if (selectedValue === "strategy") onThemeChange("theme-ocean");
        else if (selectedValue === "operation") onThemeChange("theme-indigo");
        else onThemeChange(""); // portal 이나 erp일 경우 기본 테마
      }

      navigate("/main", { state: { serviceId: tmpServiceId, lang: user?.language || "ko" } });
    }

  };

  // 1depth 클릭 핸들러
  const handleMenuClick = (menu: MenuItem) => {
    setCurrentMobileMenu(menu);

    if (isCollapsed) {
      onToggle();
      toggleGroups("ID" + menu.menuNo, menu.menuLevel); // 펼쳐진 메뉴 상태 저장소 저장
      // 모바일
      return;
    }

    // 메뉴 이동
    if(menu.submenus?.length === 0) {
      setNowMenuId(menu.menuNo); // 선택된 메뉴 저장소 저장
      setNowMenuTitle(menu.menuNm); // 선택된 메뉴 제목 저장소 저장
      navigate(menu.menuUrlAddr);
    } else {
      toggleGroups("ID" + menu.menuNo, menu.menuLevel); // 펼쳐진 메뉴 상태 저장소 저장
    }
  };

  // 2depth 클릭 핸들러
  const handleSubMenuClick = (e: React.MouseEvent, menu: MenuItem) => {
    e.preventDefault();
    console.log("handleSubMenuClick: " + menu.menuNo );

    // 메뉴 이동
    if(menu.submenus?.length === 0) {
      setNowMenuId(menu.menuNo); // 선택된 메뉴 저장소 저장
      setNowMenuTitle(menu.menuNm); // 선택된 메뉴 제목 저장소 저장
      onClickMenu?.(menu);
      navigate(menu.menuUrlAddr);
    } else {
      toggleGroups("ID" + menu.upMenuNo + "/ID" + menu.menuNo, menu.menuLevel); // 펼쳐진 메뉴 상태 저장소 저장

    }
  };

  // 3depth 클릭 핸들러
  const handleSub2MenuClick = (e: React.MouseEvent, menu: MenuItem) => {
    e.preventDefault();
    console.log("handleSub2MenuClick: " + menu.menuNo );

    setNowMenuId(menu.menuNo); // 선택된 메뉴 저장소 저장
    setNowMenuTitle(menu.menuNm); // 선택된 메뉴 제목 저장소 저장
    onClickMenu?.(menu);
    navigate(menu.menuUrlAddr);
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
  // 시간연장 클릭 이벤트
  const handleExtendSession = () => {
    hasAutoLoggedOutRef.current = false;
    setRemainingSeconds(AUTO_LOGOUT_SECONDS);
  };

  if (isMobile) {
    if (!isMobileMenuOpen) return null;

    return (
        <div className={cn("drawer-mobile", themeClass)}>
          <div className="drawer-header">
            <div className="header-left">
              <span className="user-name">{userNm}({userRole})</span>
              <div className="session-timer">
                <span className="time">{minutes}:{seconds}</span>
                <Button rounded className="button-extend" onClick={handleExtendSession}>{t('butn.extend')}</Button>
              </div>
            </div>
            <div className="header-right">
              <Button variant="text" leftIcon={<Icon name="close" size={24} color="#FFF" />} onClick={onMobileMenuClose} aria-label="닫기" />
            </div>
          </div>

          <div className="drawer-header-bottom">
            <div className="system-select-wrap">
              <select className="system-select" value={currentSystemValue} onChange={handleSystemChange}>
                <option value="portal">업무포털</option>
                <option value="strategy">전략기획 시스템</option>
                <option value="operation">운영관리 시스템</option>
                <option value="erp">ERP</option>
              </select>
              <Icon name="arrow-down" size={24} className="select-arrow" color="#999" />
            </div>
          </div>

          <div className="drawer-body">
            <div className="body-left">
              {menus?.map((menu: MenuItem) => (
                  <button
                      key={menu.menuNo} type="button"
                      className={cn("menu-trigger", { "-active" : expandedGroups.includes("ID" + menu.menuNo) })}
                      onClick={() => handleMenuClick(menu)}
                  >
                    <span>{menu.menuNm}</span>
                    {menu.submenus && <Icon name="arrow-right" size={18} />}
                  </button>
              ))}
            </div>

            <div className="drawer-menu-list">
              {currentMobileMenu?.submenus?.map((sub: MenuItem) => {
                const hasChildren = !!sub.submenus;
                const isExpanded = expandedGroups.includes("ID" + sub.upMenuNo + "/ID" + sub.menuNo);

                return (
                    <div key={sub.menuNo} className="menu-group">
                      <button
                          type="button"
                          className={cn("button-menu", { "-active" : expandedGroups.includes("ID" + sub.upMenuNo + "/ID" + sub.menuNo)})}
                          onClick={(e) => hasChildren ? handleSubMenuClick(e, sub) : undefined}
                      >
                        <span>{sub.menuNm}</span>
                        {hasChildren && (
                            <Icon name="arrow-down" size={18} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }} />
                        )}
                      </button>
                      {hasChildren && isExpanded && (
                          <div className="sub-menu-list">
                            {sub.submenus?.map((third: MenuItem) => (
                                <a key={third.menuNo} className="sub-menu-link" onClick={(e) => handleSub2MenuClick(e, third)}>
                                  · {third.menuNm}
                                </a>
                            ))}
                          </div>
                      )}
                    </div>
                );
              })}
            </div>
          </div>
        </div>
    );
  }

  return (
    <aside className={cn("lnb", themeClass, { "-collapsed": isCollapsed })}>
      <div className="lnb-body">
        <nav className="lnb-nav">
          {menus?.map((menu: MenuItem) => (
            <div key={menu.menuNo} className={cn("lnb-menu-item", { "-expanded": expandedGroups.includes("ID" + menu.menuNo) })}>
              {/* 1depth */}
              <button
                type="button"
                className="lnb-menu-trigger"
                onClick={() => handleMenuClick(menu)}
              >
                <Icon name={menu.menuIconNm || 'folder'} size={32} color="#fff" />
                <span className="menu-text">{menu.menuNm}</span>
                {menu.submenus && <Icon name="arrow-down" size={18} className="arrow-icon" />}
              </button>

              {/* 2depth */}
              {menu.submenus && (
                <div className="lnb-sub-menu">
                  <ul className="lnb-sub-list">
                    {menu.submenus.map((sub) => (
                      // 메뉴 활성화 시 -active 클래스 추가
                      <li key={sub.menuNo}
                          className={cn("lnb-sub-item", { "-active": nowMenuId === sub.menuNo, "-expanded": expandedGroups.includes("ID" + menu.menuNo + "/ID" +sub.menuNo)})}
                          onClick={(e) => handleSubMenuClick(e, sub)}
                      >
                        {/* 3depth */}
                        {(sub.submenus && sub.submenus.length > 0) ? (
                          <>
                            <button className="lnb-sub-link has-depth3">
                              {sub.menuNm}
                              <Icon name="arrow-down" size={18} className="arrow-icon" />
                            </button>
                            <div className="lnb-depth3-list">
                              <ul className="lnb-depth3-list-inner">
                                {sub.submenus.map((third) => (
                                  // 메뉴 활성화 시 -active 클래스 추가
                                  <li key={third.menuNo}
                                      className={cn("lnb-depth3-item", { "-active" : nowMenuId === third.menuNo })}
                                      onClick={(e) => handleSub2MenuClick(e, third)}
                                  >
                                    <a>{third.menuNm}</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <a onClick={(e) => handleSubMenuClick(e, sub)}>{sub.menuNm}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="lnb-footer" role="button" onClick={onToggle}>
        <div className="footer-icon">
          <Icon name={isCollapsed ? "last" : "first"} size={24} color="#fff" />
        </div>
        <span className="footer-text">접기</span>
      </div>
    </aside>
  );
};