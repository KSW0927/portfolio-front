import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, Icon } from "@/publishing/components";

/**
 * MenuItem 속성 (Props)
 */
export interface MenuItem {
  /** 메뉴의 고유 ID */
  id: string;
  /** 표시될 메뉴 이름 */
  title: string;
  /** 표시될 아이콘의 이름 */
  icon?: string;
  /** 클릭 시 이동할 경로 */
  path?: string;
  /** 하위 메뉴 목록 */
  children?: MenuItem[];
}

/**
 * LNB 컴포넌트 속성 (Props)
 */
export interface LNBProps {
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
}

/**
 * 샘플 메뉴 데이터
 */
const MENU_DATA: MenuItem[] = [
  {
    id: "task",
    title: "업무관리",
    icon: "inbox",
    children: [
      {
        id: "task-1",
        title: "업무일지",
        children: [
          { id: "task-1-1", title: "업무일지 관리", path: "" },
          { id: "task-1-2", title: "주기적/반복적 업무", path: "" },
          { id: "task-1-3", title: "요청업무 관리", path: "" },
          { id: "task-1-4", title: "업무일지 현황", path: "" },
          { id: "task-1-5", title: "분류코드", path: "" },
        ]
      },
      { id: "task-2", title: "방선동승보고", path: "" },
      { id: "task-3", title: "거래처면담 일정", path: "" },
      { id: "task-4", title: "거래처 주소록", path: "" },
      { id: "task-5", title: "비정형 데이터 검색", path: "" },
      { id: "task-6", title: "업무별 신청", path: "" },
      { id: "task-7", title: "전산 작업 요청", path: "" },
    ],
  },
  {
    id: "community",
    title: "커뮤니티",
    icon: "community",
    children: [
      { id: "comm-1", title: "공지사항", path: "" },
      { id: "comm-2", title: "자유게시판", path: "" },
      { id: "comm-3", title: "칭찬게시판", path: "" },
      { id: "comm-4", title: "회발위 공지사항(간사)", path: "" },
      { id: "comm-5", title: "해운/조선 소식", path: "" },
      { id: "comm-6", title: "Safety Bulletin", path: "" },
      { id: "comm-7", title: "사내 근로복지 기금", path: "" },
      { id: "comm-8", title: "우리사주조합", path: "" },
      { id: "comm-9", title: "선박별 담당자", path: "" },
      { id: "comm-10", title: "조직 현황", path: "" },
      { id: "comm-11", title: "비상연락망", path: "" },
      { id: "comm-12", title: "설문", path: "" },
      { id: "comm-13", title: "투표", path: "" },
    ],
  },
  {
    id: "employee",
    title: "직원 지원센터",
    icon: "user-check",
    children: [
      { id: "employee-1", title: "회의실 사용 일정", path: "" },
      { id: "employee-2", title: "법인차량 현황 및 신청", path: "" },
      {
        id: "employee-3",
        title: "KSS 휴양시설",
        children: [
          { id: "employee-3-1", title: "휴양시설 현황 및 신청", path: "" },
          { id: "employee-3-2", title: "FAQ", path: "" },
        ]
      },
      { id: "employee-4", title: "고충처리 위원회", path: "" },
    ],
  },
  {
    id: "training",
    title: "교육",
    icon: "education",
    children: [
      { id: "train-1", title: "업무숙련도 평가 내역", path: "" },
      { id: "train-2", title: "부서별 교육(웨비나)", path: "" },
      { id: "train-3", title: "법정교육", path: "" },
    ],
  },
  {
    id: "innovation",
    title: "경영혁신과제",
    icon: "user",
    children: [
      { id: "innovation-1", title: "총괄현황", path: "" },
      {
        id: "innovation-2",
        title: "회사 경영혁신과제",
        children: [
          { id: "innovation-2-1", title: "진행과제", path: "" },
          { id: "innovation-2-2", title: "지속추진과제", path: "" },
          { id: "innovation-2-3", title: "종결과제", path: "" },
          { id: "innovation-2-4", title: "업무별 분류", path: "" },
        ]
      },
      { id: "innovation-3", title: "경영진 주요보고사항", path: "" },
    ],
  },
  {
    id: "account",
    title: "마이페이지",
    icon: "user",
    children: [
      { id: "account-1", title: "나의 정보", path: "" },
      { id: "account-2", title: "쪽지 및 알림", path: "" },
      { id: "account-3", title: "나의 신청 내역", path: "" },
      { id: "account-4", title: "나의 교육 내역", path: "" },
      { id: "account-5", title: "근태/휴가 현황", path: "" },
      { id: "account-6", title: "전자결재 현황", path: "" },
      { id: "account-7", title: "월별급여 현황", path: "" },
    ],
  },
];
/**
 * @description 좌측 메뉴 트리 및 아코디언 기능을 담당하는 Local Navigation Bar 컴포넌트입니다.
 */
export const LNB = ({ isCollapsed, onToggle, activeMenuId, themeClass = "", isMobileMenuOpen, onMobileMenuClose, onThemeChange }: LNBProps) => {
  const isMobile = useIsMobile();
  const [expandedMenu, setExpandedMenu] = useState<string | null>("");
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);

  const [active1Depth, setActive1Depth] = useState("employee");
  const [expandedMobile2Depth, setExpandedMobile2Depth] = useState<string | null>("employee-3");

  const handleMenuClick = (menuId: string) => {
    if (isCollapsed) {
      onToggle();
      setExpandedMenu(menuId);
      return;
    }
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  const handleSubMenuClick = (e: React.MouseEvent, subId: string) => {
    e.preventDefault();
    setExpandedSubMenu(expandedSubMenu === subId ? null : subId);
  };

  const handleMobile1DepthClick = (id: string) => {
    setActive1Depth(id);
    setExpandedMobile2Depth(null);
  };

  const handleMobile2DepthClick = (id: string) => {
    setExpandedMobile2Depth((prev) => (prev === id ? null : id));
  };

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (onThemeChange) {
      if (selectedValue === "strategy") onThemeChange("theme-ocean");
      else if (selectedValue === "operation") onThemeChange("theme-indigo");
      else onThemeChange("");
    }
  };

  const currentSystemValue = themeClass === "theme-ocean" ? "strategy" : themeClass === "theme-indigo" ? "operation" : "portal";

  const lnbClasses = [
    "lnb",
    isCollapsed ? "-collapsed" : "",
    themeClass
  ].filter(Boolean).join(" ");

  const currentMobileMenu = MENU_DATA.find((menu) => menu.id === active1Depth);

  if (isMobile) {
    if (!isMobileMenuOpen) return null;

    return (
      <div className={`drawer-mobile ${themeClass}`}>
        <div className="drawer-header">
          <div className="header-left">
            <span className="user-name">홍길동 대리</span>
            <div className="session-timer">
              <span className="time">00:56</span>
              <Button rounded className="button-extend">시간연장</Button>
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
            {MENU_DATA.map((menu) => (
              <button
                key={menu.id} type="button"
                className={`menu-trigger ${active1Depth === menu.id ? "-active" : ""}`}
                onClick={() => handleMobile1DepthClick(menu.id)}
              >
                <span>{menu.title}</span>
                {active1Depth === menu.id && <Icon name="arrow-right" size={18} />}
              </button>
            ))}
          </div>

          <div className="drawer-menu-list">
            {currentMobileMenu?.children?.map((sub) => {
              const hasChildren = !!sub.children;
              const isExpanded = expandedMobile2Depth === sub.id;

              return (
                <div key={sub.id} className="menu-group">
                  <button
                    type="button"
                    className={`button-menu ${isExpanded ? "-active" : ""}`}
                    onClick={() => hasChildren ? handleMobile2DepthClick(sub.id) : undefined}
                  >
                    <span>{sub.title}</span>
                    {hasChildren && (
                      <Icon name="arrow-down" size={18} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }} />
                    )}
                  </button>
                  {hasChildren && isExpanded && (
                    <div className="sub-menu-list">
                      {sub.children?.map((third) => (
                        <a key={third.id} href={third.path || "#"} className="sub-menu-link">
                          · {third.title}
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
    <aside className={lnbClasses}>
      <div className="lnb-body">
        <nav className="lnb-nav">
          {MENU_DATA.map((menu) => {
            const menuItemClasses = [
              "lnb-menu-item",
              expandedMenu === menu.id ? "-expanded" : ""
            ].filter(Boolean).join(" ");

            return (
              <div key={menu.id} className={menuItemClasses}>
                {/* 1depth */}
                <button
                  type="button"
                  className="lnb-menu-trigger"
                  onClick={() => handleMenuClick(menu.id)}
                >
                  <Icon name={menu.icon || "folder"} size={32} color="#fff" />
                  <span className="menu-text">{menu.title}</span>
                  {menu.children && <Icon name="arrow-down" size={18} className="arrow-icon" />}
                </button>

                {/* 2depth */}
                {menu.children && (
                  <div className="lnb-sub-menu">
                    <ul className="lnb-sub-list">
                      {menu.children.map((sub) => {
                        const subItemClasses = [
                          "lnb-sub-item",
                          activeMenuId === sub.id ? "-active" : "",
                          expandedSubMenu === sub.id ? "-expanded" : ""
                        ].filter(Boolean).join(" ");

                        return (
                          <li key={sub.id} className={subItemClasses}>
                            {/* 3depth */}
                            {sub.children ? (
                              <>
                                <button className="lnb-sub-link has-depth3" onClick={(e) => handleSubMenuClick(e, sub.id)}>
                                  {sub.title}
                                  <Icon name="arrow-down" size={18} className="arrow-icon" />
                                </button>
                                <div className="lnb-depth3-list">
                                  <ul className="lnb-depth3-list-inner">
                                    {sub.children.map((third) => {
                                      const depth3ItemClasses = [
                                        "lnb-depth3-item",
                                        activeMenuId === third.id ? "-active" : ""
                                      ].filter(Boolean).join(" ");

                                      return (
                                        <li key={third.id} className={depth3ItemClasses}>
                                          <a href={third.path}>{third.title}</a>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </>
                            ) : (
                              <a href={sub.path}>{sub.title}</a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="lnb-footer" onClick={onToggle} role="button">
        <div className="footer-icon">
          <Icon name={isCollapsed ? "last" : "first"} size={24} color="#fff" />
        </div>
        <span className="footer-text">접기</span>
      </div>
    </aside>
  );
};