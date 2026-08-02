import React, { useCallback } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useIsDark } from "@/hooks/useIsDark";
import { Badge, Box, Button, Calendar, Card, Checkbox, Divider, Dropdown, Icon, Layout, Space, Typography } from "@/publishing/components";
import type { WidgetData } from "./Dashboard";
import "swiper/css";
import "swiper/css/pagination";

/**
 * 캘린더 이벤트 dot 색상 - FullCalendar API는 CSS 변수를 직접 지원하지 않아
 * CSS 토큰 값과 동일한 실제 색상값을 상수로 관리합니다.
 * (--dash-event-red-border, --dash-event-purple-border 와 동일)
 */
const EVENT_COLOR_MAP: Record<string, string> = {
    red: "#E32020",
    purple: "#773ED9",
};

/**
 * 캘린더 일정 데이터 인터페이스
 */
interface CalendarEventData {
    id: string;
    title: string;
    start: string;
    end?: string;
    color: string;
    category: string;
    completed?: boolean;
    backgroundColor?: string;
}

/**
 * 위젯 렌더러 컴포넌트 Props
 */
interface WidgetRendererProps {
    widget: WidgetData;
    activeKebabId: string | null;
    setActiveKebabId: React.Dispatch<React.SetStateAction<string | null>>;
    handleDeleteWidget: (id: string) => void;
    handleExpandWidget: (id: string) => void;
    profileBgImage: string | null;
    profileBgInputRef: React.RefObject<HTMLInputElement>;
    handleProfileBgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 목업 데이터 모음
const NOTICE_LIST = [
    { id: 1, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 2, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 3, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 4, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 5, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 6, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 7, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 8, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 9, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 10, title: "2026 연말정산 제출 방법", date: "2026.02.11" },
];

const FAV_MENU_LIST = [
    { id: 1, title: "공지사항" },
    { id: 2, title: "Safety Bulletin" },
    { id: 3, title: "사내 근로복지 기금" },
    { id: 4, title: "설문" },
    { id: 5, title: "휘발위게시판" },
    { id: 6, title: "해운/조선 소식" },
    { id: 7, title: "비상연락망" },
    { id: 8, title: "업무일지" },
    { id: 9, title: "업무일지" },
    { id: 10, title: "비상연락망" },
    { id: 11, title: "업무일지" },
    { id: 12, title: "업무일지" },
    { id: 13, title: "비상연락망" },
    { id: 14, title: "업무일지" },
    { id: 15, title: "업무일지" },
];

const VOTE_LIST = [
    { id: 1, dday: -3, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 2, dday: -4, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 3, dday: -6, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 4, dday: -9, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 5, dday: -10, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 6, dday: -20, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
    { id: 7, dday: -30, title: "회식장소 투표", date: "2026-02-27", current: 72, total: 120 },
];

const EDU_LIST = [
    { id: 1, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "수료" },
    { id: 2, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "신청" },
    { id: 3, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "진행" },
    { id: 4, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "수료" },
    { id: 5, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "신청" },
    { id: 6, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "진행" },
    { id: 7, title: "관리감독자 정기교육", sdate: "2025-01-02", edate: "2025-06-30", status: "수료" },
];

const MEETING_LIST = [
    { id: 1, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 2, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 3, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 4, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 5, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 6, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
    { id: 7, stime: "10:00", etime: "11:00", title: "대회의실", date: "2026.2.3 (화)", team: "자금팀" },
];

const MESSAGE_LIST = [
    { id: 1, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.안녕하세요.", date: "2026-02-27", status: "읽음" },
    { id: 2, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "안읽음" },
    { id: 3, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "읽음" },
    { id: 4, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "안읽음" },
    { id: 5, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "읽음" },
    { id: 6, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "안읽음" },
    { id: 7, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", title: "안녕하세요. 해무팀 김해운 주임입니다.", date: "2026-02-27", status: "읽음" },
];

const POST_LIST = [
    { id: 1, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 2, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 3, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 4, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 5, category: "휘발위게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 6, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 7, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 8, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 9, category: "공지사항", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
    { id: 10, category: "자유게시판", title: "2026 연말정산 제출 방법", date: "2026.02.11" },
];

const ORG_LIST = [
    { id: 1, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 2, profileImage: "/src/assets/img/temp/temp_profile-2.png", name: "김해운", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 3, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 4, profileImage: "/src/assets/img/temp/temp_profile-2.png", name: "김해운", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 5, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 6, profileImage: "/src/assets/img/temp/temp_profile-2.png", name: "김해운", team: "ESG경영팀", email: "asdfg@kss.kr" },
    { id: 7, profileImage: "/src/assets/img/temp/temp_profile.png", name: "홍길동", team: "ESG경영팀", email: "asdfg@kss.kr" },
];

const SURVEY_LIST = [
    { id: 1, dday: -3, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
    { id: 2, dday: -4, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
    { id: 3, dday: -6, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
    { id: 4, dday: -9, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
    { id: 5, dday: -10, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
    { id: 6, dday: -20, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
    { id: 7, dday: -30, title: "2026년 KSS 해운 서비스 만족도 평가 설문조사", date: "2026-02-27", current: 72, total: 120 },
];

const SEARCH_DATA_LIST = [
    { id: 1, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 2, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 3, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 4, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 5, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 6, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
    { id: 7, title: "핸드폰 연락처 정보 모아보기", extra: "인사정보 DATA" },
];

const PROFILE_ALARM_LIST = [
    { id: 1, category: "설문", title: "만족도 설문조사 종료일까지 d-1일 남았습니다.", date: "2026.02.11" },
    { id: 2, category: "법인차량", title: "법인차량 예약이 변경되었습니다.", date: "2026.02.11" },
    { id: 3, category: "설문", title: "만족도 설문조사 종료일까지 d-1일 남았습니다.", date: "2026.02.11" },
    { id: 4, category: "법인차량", title: "법인차량 예약이 변경되었습니다.", date: "2026.02.11" },
];

const BANNER_LIST = [
    "/src/assets/img/temp/temp_banner-1.png",
    "/src/assets/img/temp/temp_banner-2.png",
    "/src/assets/img/temp/temp_banner-3.png",
];

const KOR_HOLIDAYS_2026 = [
    { date: "2026-01-01", title: "신정" },
    { date: "2026-02-16", title: "설날 연휴" },
    { date: "2026-02-17", title: "설날" },
    { date: "2026-02-18", title: "설날 연휴" },
    { date: "2026-03-01", title: "3·1절" },
    { date: "2026-03-02", title: "대체공휴일" },
    { date: "2026-05-05", title: "어린이날" },
    { date: "2026-05-24", title: "부처님오신날" },
    { date: "2026-05-25", title: "대체공휴일" },
    { date: "2026-06-03", title: "전국동시지방선거" },
    { date: "2026-06-06", title: "현충일" },
    { date: "2026-08-15", title: "광복절" },
    { date: "2026-08-17", title: "대체공휴일" },
    { date: "2026-09-24", title: "추석 연휴" },
    { date: "2026-09-25", title: "추석" },
    { date: "2026-09-26", title: "추석 연휴" },
    { date: "2026-10-03", title: "개천절" },
    { date: "2026-10-05", title: "대체공휴일" },
    { date: "2026-10-09", title: "한글날" },
    { date: "2026-12-25", title: "크리스마스" }
];

const MY_CALENDAR_EVENTS: CalendarEventData[] = [
    { id: "1", title: "주간 업무회의", start: "2026-05-04T09:00:00", end: "2026-05-04T11:00:00", color: "red", category: "회의실 B" },
    { id: "2", title: "3분기 실적회의", start: "2026-05-04T11:00:00", end: "2026-05-04T12:00:00", color: "red", category: "업무관리" },
    { id: "3", title: "3분기 실적회의", start: "2026-05-04T13:00:00", end: "2026-05-04T14:00:00", color: "red", category: "업무관리", completed: true },
    { id: "4", title: "홍길동 반차", start: "2026-05-15", color: "purple", category: "근태일정" },
    { id: "5", title: "홍길동 반차", start: "2026-05-20", color: "purple", category: "근태일정" },
    { id: "6", title: "홍길동 반차", start: "2026-05-22", color: "purple", category: "근태일정" },
];

const TEAM_CALENDAR_EVENTS: CalendarEventData[] = [
    { id: "1", title: "주간 업무회의", start: "2026-05-08T09:00:00", end: "2026-05-08T11:00:00", color: "red", category: "회의실 B" },
    { id: "2", title: "3분기 실적회의", start: "2026-05-08T11:00:00", end: "2026-05-08T12:00:00", color: "red", category: "업무관리" },
    { id: "3", title: "3분기 실적회의", start: "2026-05-08T13:00:00", end: "2026-05-08T14:00:00", color: "red", category: "업무관리", completed: true },
    { id: "4", title: "홍길동 반차", start: "2026-05-07", color: "purple", category: "근태일정" },
    { id: "5", title: "홍길동 반차", start: "2026-05-21", color: "purple", category: "근태일정" },
    { id: "6", title: "홍길동 반차", start: "2026-05-29", color: "purple", category: "근태일정" },
];

/**
 * 대시보드 내 개별 위젯의 타입에 따라 알맞은 UI 구조를 렌더링하는 컴포넌트입니다.
 */
export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
    widget,
    activeKebabId,
    setActiveKebabId,
    handleDeleteWidget,
    handleExpandWidget,
    profileBgImage,
    profileBgInputRef,
    handleProfileBgUpload
}) => {
    const isDark = useIsDark();
    const isKebabOpen = activeKebabId === widget.id;

    const [calendarTab, setCalendarTab] = React.useState<"my" | "team">("my");
    const [selectedDate, setSelectedDate] = React.useState<string | null>("2026-05-04");
    const [calendarEvents, setCalendarEvents] = React.useState({
        my: MY_CALENDAR_EVENTS,
        team: TEAM_CALENDAR_EVENTS
    });

    const toggleEventCompletion = useCallback((id: string) => {
        setCalendarEvents(prev => ({
            ...prev,
            [calendarTab]: prev[calendarTab].map(ev =>
                ev.id === id ? { ...ev, completed: !ev.completed } : ev
            )
        }));
    }, [calendarTab]);

    const renderContent = () => {
        switch (widget.type) {
            case "profile": return (
                <>
                    <div className="card-header-wrap" style={{ backgroundImage: profileBgImage ? `url(${profileBgImage})` : "" }}>
                        <Card.Header
                            extra={
                                <div style={{ position: "relative" }}>
                                    <Button
                                        variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                        className="button-widget-settings -invert" rounded
                                        aria-label="위젯 설정"
                                        aria-haspopup="true"
                                        aria-expanded={isKebabOpen}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveKebabId(isKebabOpen ? null : widget.id);
                                        }}
                                    />

                                    {isKebabOpen && (
                                        <div className="widget-setting-popup">
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                profileBgInputRef.current?.click();
                                            }}>
                                                배경 변경
                                            </button>
                                            <input
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                style={{ display: "none" }}
                                                ref={profileBgInputRef}
                                                onChange={handleProfileBgUpload}
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        >
                            <Space layout="vertical" align="start" size="sm">
                                <Typography variant="body-lg" color="var(--dash-profile-text)">2026-01-30</Typography>

                                <Badge color="yellow" dot>
                                    <Typography variant="body-lg" color="var(--dash-profile-badge-text)">연차</Typography>
                                </Badge>
                            </Space>
                        </Card.Header>

                        <Layout.Row layout="vertical" align="center" justify="center" gap={10}>
                            <Layout.Col gap={6} align="center">
                                <div className="avatar">
                                    <img src="/src/assets/img/temp/temp_profile-3.png" alt="홍길동" />
                                </div>
                                <Space size={3} align="baseline" separator={<Divider layout="vertical" variant="dashed" color="var(--dash-profile-divider)" />}>
                                    <Typography variant="heading-xl" color="var(--dash-profile-text)" weight="semibold" style={{ lineHeight: 1 }}>홍길동</Typography>
                                    <Typography variant="heading-sm" color="var(--dash-profile-sub)" weight="semibold">대리</Typography>
                                </Space>
                            </Layout.Col>

                            <Layout.Col>
                                <Space size={7} separator={<Divider layout="vertical" variant="dashed" color="var(--dash-profile-divider)" size={9} />}>
                                    <Typography variant="body-lg" color="var(--dash-profile-text)">경영지원본부</Typography>
                                    <Typography variant="body-lg" color="var(--dash-profile-text)">경영지원팀</Typography>
                                </Space>
                            </Layout.Col>
                        </Layout.Row>

                        <Layout.Row className="summary-wrap" gap={0}>
                            <Layout.Col align="center" gap={8}>
                                <Space size={6}>
                                    <Icon name="message" size={20} color="var(--dash-profile-text)" />
                                    <Typography variant="body-lg" color="var(--dash-profile-text)">쪽지</Typography>
                                </Space>
                                <Space size={3} align="baseline">
                                    <Typography variant="body-lg" as="strong" color="var(--dash-profile-text)" style={{ fontSize: "3.2rem", lineHeight: 1 }}>3</Typography>
                                    <Typography variant="body-lg" as="span" color="var(--dash-profile-muted)">건</Typography>
                                </Space>
                            </Layout.Col>

                            <Divider layout="vertical" variant="dashed" color="var(--dash-profile-divider)" size={64} />

                            <Layout.Col align="center" gap={8}>
                                <Space size={6}>
                                    <Icon name="calendar" size={20} color="var(--dash-profile-text)" />
                                    <Typography variant="body-lg" color="var(--dash-profile-text)">연차</Typography>
                                </Space>
                                <Space size={3} align="baseline">
                                    <Typography variant="body-lg" as="strong" color="var(--dash-profile-text)" style={{ fontSize: "3.2rem", lineHeight: 1 }}>12</Typography>
                                    <Typography variant="body-lg" as="span" color="var(--dash-profile-muted)">개</Typography>
                                </Space>
                            </Layout.Col>
                        </Layout.Row>
                    </div>

                    <Card.Body gap={10}>
                        <Layout.Row justify="space-between" className="title-wrap">
                            <Layout.Col layout="horizontal" align="center" gap={4}>
                                <Icon name="bell" size={18} color="var(--dash-profile-text)" />
                                <Typography variant="body-lg" weight="semibold" color="var(--dash-profile-text)">최근 알림</Typography>
                            </Layout.Col>

                            <Layout.Col layout="horizontal" align="baseline" justify="end" gap={3}>
                                <Typography variant="heading-lg" as="strong" color="var(--dash-profile-count-accent)" style={{ fontSize: "3.8rem", lineHeight: 1 }}>5</Typography>
                                <Typography variant="body-lg" as="span" color="var(--dash-profile-text)">건</Typography>
                            </Layout.Col>
                        </Layout.Row>

                        <Layout.Row layout="vertical" gap={16} className="alarm-wrap">
                            {PROFILE_ALARM_LIST.map((item) => (
                                <Box variant="info" key={item.id}>
                                    <Space size={12}>
                                        <Typography variant="body-xs" weight="semibold" primary={!isDark} color={isDark ? "var(--dash-accent-link-dark)" : ""} >{item.category}</Typography>

                                        <Layout.Col layout="horizontal" justify="space-between" align="center">
                                            <Typography variant="body-md" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-base)"}>{item.title}</Typography>
                                            <Typography variant="body-md" secondary={!isDark} color={isDark ? "var(--dash-text-tertiary)" : ""}>{item.date}</Typography>
                                        </Layout.Col>
                                    </Space>
                                </Box>
                            ))}
                        </Layout.Row>
                    </Card.Body>
                </>
            );

            case "leave": return (
                <Box variant="info" className="-blue widget-leave-content">
                    <Layout.Col layout="vertical" gap={49}>
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>사용 예정</Typography>
                            <Icon name="scheduled" size={20} />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>10</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>

                    <Divider layout="vertical" variant="dashed" spacing={14} color={isDark ? "var(--dash-bg-deep)" : ""} />

                    <Layout.Col layout="vertical" gap={49}>
                        <Space justify="space-between">
                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>사용완료</Typography>
                            <Icon name="completed" size={20} />
                        </Space>
                        <Space size={4} align="baseline" justify="end">
                            <Typography variant="display-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>5</Typography>
                            <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                        </Space>
                    </Layout.Col>
                </Box>
            );

            case "approval": return (
                <div className="widget-approval-content">
                    <Box variant="info" className="-blue">
                        <Layout.Col layout="vertical" gap={5}>
                            <Space justify="space-between">
                                <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>대기</Typography>
                                <Icon name="pending" size={20} />
                            </Space>
                            <Space size={4} align="baseline" justify="end">
                                <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>5</Typography>
                                <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                            </Space>
                        </Layout.Col>
                    </Box>
                    <Box variant="info" className="-blue">
                        <Layout.Col layout="vertical" gap={5}>
                            <Space justify="space-between">
                                <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>예정</Typography>
                                <Icon name="scheduled" size={20} />
                            </Space>
                            <Space size={4} align="baseline" justify="end">
                                <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>5</Typography>
                                <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                            </Space>
                        </Layout.Col>
                    </Box>
                    <Box variant="info" className="-blue">
                        <Layout.Col layout="vertical" gap={5}>
                            <Space justify="space-between">
                                <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>완료</Typography>
                                <Icon name="completed" size={20} />
                            </Space>
                            <Space size={4} align="baseline" justify="end">
                                <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>5</Typography>
                                <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                            </Space>
                        </Layout.Col>
                    </Box>
                    <Box variant="info" className="-blue">
                        <Layout.Col layout="vertical" gap={5}>
                            <Space justify="space-between">
                                <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>반려</Typography>
                                <Icon name="rejected" size={20} />
                            </Space>
                            <Space size={4} align="baseline" justify="end">
                                <Typography variant="heading-lg" as="strong" style={{ lineHeight: 1 }} color={isDark ? "var(--dash-text-primary)" : ""}>5</Typography>
                                <Typography variant="body-lg" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>건</Typography>
                            </Space>
                        </Layout.Col>
                    </Box>
                </div>
            );

            case "banner": return (
                <div className="widget-banner-content">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        className="banner-swiper"
                    >
                        {BANNER_LIST.map((imgSrc, index) => (
                            <SwiperSlide key={index}>
                                <div className="banner-img-wrap">
                                    <img src={imgSrc} alt={`배너 ${index + 1}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            );

            case "oil": return (
                <div className="widget-oil-content">
                    <Card.Header
                        leftIcon={<Icon name="oil" size={20} />}
                        extra={<Typography variant="body-lg" weight="semibold"
                            color={isDark ? "var(--dash-text-disabled)" : ""}>2026년 3월 1일</Typography>}
                    >
                        <Space size={4}>
                            <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>유가</Typography>
                            <Typography variant="body-md" as="span" secondary={!isDark} color={isDark ? "var(--dash-text-muted-num)" : ""}>(CRUDE OIL)</Typography>
                        </Space>
                    </Card.Header>
                    <Card.Body>
                        <Layout.Row layout="vertical" gap={12}>
                            <Box variant="info" className="-blue">
                                <Layout.Col layout="vertical" gap={5}>
                                    <Space justify="space-between">
                                        <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>DUBAI</Typography>
                                        <Space size={4}>
                                            <Typography variant="heading-md" primary={!isDark} color={isDark ? "#68B8FF" : ""}>76.88</Typography>
                                            <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>$</Typography>
                                        </Space>
                                    </Space>
                                    <Space size={4} align="center" justify="end">
                                        <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>전 데이터 대비</Typography>

                                        <Space size={3} align="center">
                                            <Icon name="up" size={18} color="var(--dash-oil-up)" />
                                            <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">2.54</Typography>
                                            <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">+1.10%</Typography>
                                        </Space>
                                    </Space>
                                </Layout.Col>
                            </Box>

                            <Layout.Row gap={12}>
                                <Box variant="info" className="-blue">
                                    <Layout.Col layout="vertical" gap={5}>
                                        <Space justify="space-between">
                                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>WTI</Typography>
                                            <Space size={4}>
                                                <Typography variant="heading-md" color={isDark ? "var(--dash-text-primary)" : ""}>76.08</Typography>
                                                <Typography variant="body-lg" secondary={!isDark} color={isDark ? "#666" : ""}>$</Typography>
                                            </Space>
                                        </Space>
                                        <Space size={4} align="center" justify="end">
                                            <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>전 데이터 대비</Typography>

                                            <Space size={3} align="center">
                                                <Icon name="down" size={18} color="var(--dash-oil-down)" />
                                                <Typography variant="body-sm" as="span" color="var(--dash-oil-down)">2.54</Typography>
                                                <Typography variant="body-sm" as="span" color="var(--dash-oil-down)">-1.10%</Typography>
                                            </Space>
                                        </Space>
                                    </Layout.Col>
                                </Box>
                                <Box variant="info" className="-blue">
                                    <Layout.Col layout="vertical" gap={5}>
                                        <Space justify="space-between">
                                            <Typography variant="body-lg" color={isDark ? "var(--dash-text-primary)" : ""}>BRENT</Typography>
                                            <Space size={4}>
                                                <Typography variant="heading-md" color={isDark ? "var(--dash-text-primary)" : ""}>78.98</Typography>
                                                <Typography variant="body-lg" color={isDark ? "#666" : ""}>$</Typography>
                                            </Space>
                                        </Space>
                                        <Space size={4} align="center" justify="end">
                                            <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>전 데이터 대비</Typography>

                                            <Space size={3} align="center">
                                                <Icon name="down" size={18} color="var(--dash-oil-down)" />
                                                <Typography variant="body-sm" as="span" color="var(--dash-oil-down)">2.54</Typography>
                                                <Typography variant="body-sm" as="span" color="var(--dash-oil-down)">-1.10%</Typography>
                                            </Space>
                                        </Space>
                                    </Layout.Col>
                                </Box>
                            </Layout.Row>
                        </Layout.Row>
                    </Card.Body>
                </div>
            );

            case "calendar": {
                const currentEvents = calendarEvents[calendarTab];

                const selectedDateEvents = currentEvents.filter(ev => {
                    if (!selectedDate) return true;
                    return ev.start.startsWith(selectedDate);
                });

                return (
                    <div className="widget-calendar-content">
                        <Card.Header
                            extra={
                                <div style={{ position: "relative" }}>
                                    <Button
                                        variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                        className={`button-widget-settings ${isDark && "-invert"}`} rounded
                                        aria-label="위젯 설정"
                                        aria-haspopup="true"
                                        aria-expanded={isKebabOpen}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveKebabId(isKebabOpen ? null : widget.id);
                                        }}
                                    />
                                    {isKebabOpen && (
                                        <div className="widget-setting-popup">
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteWidget(widget.id); }}>위젯 삭제</button>
                                            <button onClick={(e) => { e.stopPropagation(); handleExpandWidget(widget.id); }}>
                                                {widget.size === "md" ? "위젯 확대" : "위젯 축소"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            }
                        >
                            <Space size={12}>
                                <Icon name="calendar2" size={20} />

                                <Space size={6}>
                                    <Button variant="text" onClick={() => setCalendarTab("my")}>
                                        <Typography
                                            variant="heading-sm"
                                            tertiary={!isDark && calendarTab !== "my"}
                                            color={isDark && calendarTab !== "my" ? "var(--dash-text-muted-num)" : "var(--dash-text-primary)"}
                                        >
                                            나의 일정
                                        </Typography>
                                    </Button>
                                    <Divider layout="vertical" variant="dashed" size={12} />
                                    <Button variant="text" onClick={() => setCalendarTab("team")}>
                                        <Typography
                                            variant="heading-sm"
                                            tertiary={!isDark && calendarTab !== "team"}
                                            color={isDark && calendarTab !== "team" ? "var(--dash-text-muted-num)" : "var(--dash-text-primary)"}
                                        >
                                            팀 일정
                                        </Typography>
                                    </Button>
                                </Space>
                            </Space>
                        </Card.Header>

                        <Card.Body gap={8}>
                            <div className="mini-calendar-wrapper">
                                <Calendar
                                    type="Month"
                                    events={currentEvents.map(ev => ({
                                        ...ev,
                                        backgroundColor: EVENT_COLOR_MAP[ev.color] ?? "#999999"
                                    }))}
                                    holidays={KOR_HOLIDAYS_2026}
                                    ariaLabel={calendarTab === "my" ? "나의 일정" : "팀 일정"}
                                    onDateClick={(info) => {
                                        setSelectedDate(info.dateStr);
                                    }}
                                    options={{
                                        initialDate: "2026-05-04",
                                        height: 'auto',
                                        contentHeight: 'auto',
                                        eventContent: (arg) => (
                                            <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: arg.event.backgroundColor }} />
                                        ),
                                        dayCellClassNames: (arg) => {
                                            const d = arg.date;
                                            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                            return dateStr === selectedDate ? 'is-selected-date' : '';
                                        }
                                    }}
                                    className="dashboard-mini-calendar"
                                />
                            </div>

                            <div className="calendar-event-list">
                                {selectedDateEvents.length > 0 ? selectedDateEvents.map(event => (
                                    <div key={event.id} className={`event-item color-${event.color} ${event.completed ? "-completed" : ""} ${event.category === "업무관리" ? "-task" : ""}`}>
                                        <Typography variant="body-lg" className="event-category text-ellipsis">
                                            {event.category}
                                        </Typography>

                                        <Divider layout="vertical" variant="dashed" size={10} color="rgba(51, 51, 51, 0.3)" />

                                        <Typography variant="body-lg" className="event-title text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>
                                            {event.title}
                                        </Typography>

                                        <Typography variant="body-md" className="event-time" secondary={!isDark}>
                                            {event.start.includes("T")
                                                ? `${event.start.split("T")[1].substring(0, 5)}~${event.end?.split("T")[1].substring(0, 5)}`
                                                : event.start.replace(/-/g, ".")}
                                        </Typography>

                                        {event.category === "업무관리" && (
                                            <Checkbox checked={event.completed} onChange={() => toggleEventCompletion(event.id)} />
                                        )}
                                    </div>
                                )) : (
                                    <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--dash-text-tertiary)", fontSize: "1.3rem" }}>
                                        등록된 일정이 없습니다.
                                    </div>
                                )}
                            </div>
                        </Card.Body>
                    </div>
                );
            }

            case "notice": return (
                <div className="widget-notice-content">
                    {NOTICE_LIST.map((item) => (
                        <Button variant="text" key={`${item.id}`} fullWidth>
                            <Space justify="space-between" align="center">
                                <Typography variant="body-lg" weight="semibold" secondary={!isDark} color={isDark ? "var(--dash-text-primary)" : ""} className="text-ellipsis">{item.title}</Typography>
                                <Typography variant="body-md" weight="semibold" tertiary={!isDark} color={isDark ? "var(--dash-text-primary)" : ""}>{item.date}</Typography>
                            </Space>
                        </Button>
                    ))}
                </div>
            );

            case "favorite": return (
                <div className="widget-favorite-content">
                    {FAV_MENU_LIST.map((item) => (
                        <Button variant="outlined" key={`${item.id}`} className="button-fav-menu">{item.title}</Button>
                    ))}
                </div>
            );

            case "vote": return (
                <div className="widget-vote-content">
                    <ul>
                        {VOTE_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <Badge variant={item.dday > -10 ? "solid" : "filled"} color="red" rounded>D{item.dday}</Badge>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} color="var(--dash-text-tertiary)" />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.date}</Typography>
                                                </Space>
                                                <Space size={4}>
                                                    <Icon name="user" size={14} color="var(--dash-text-tertiary)" />
                                                    <Space.Item>
                                                        <Typography variant="body-xs" as="strong" primary={!isDark} color={isDark ? "var(--dash-accent-link-dark)" : ""}>{item.current}</Typography><Typography variant="body-xs" as="span" secondary>/{item.total}</Typography>
                                                    </Space.Item>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Button size="sm">투표</Button>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            case "education": return (
                <div className="widget-education-content">
                    <ul>
                        {EDU_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.sdate}</Typography><Typography variant="body-md" tertiary>~{item.edate}</Typography>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Badge
                                        variant="filled" rounded
                                        color={
                                            ({
                                                "수료": "blue",
                                                "진행": "green",
                                                "신청": "red"
                                            }[item.status] || "gray") as "blue" | "green" | "red" | "gray"
                                        }
                                    >{item.status}</Badge>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            case "meeting": return (
                <div className="widget-meeting-content">
                    <ul>
                        {MEETING_LIST.map((item) => (
                            <li
                                key={`${item.id}`} role="button"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        // DEV: onClick과 동일한 로직 실행 추가 필요 - 웹접근성
                                    }
                                }}
                            >
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <Badge variant="filled" size="lg" rounded>{item.stime}~{item.etime}</Badge>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.date}</Typography>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Space size={4}>
                                        <Icon name="user" size={18} />
                                        <Typography variant="body-md" tertiary>{item.team}</Typography>
                                    </Space>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            case "message": return (
                <div className="widget-message-content">
                    <ul>
                        {MESSAGE_LIST.map((item) => (
                            <li
                                key={`${item.id}`} role="button"
                                tabIndex={0}
                                onClick={() => { }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        // DEV: onClick과 동일한 로직 실행 추가 필요 - 웹접근성
                                    }
                                }}
                            >
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <div className="avatar">
                                            <img
                                                src={item.profileImage}
                                                alt={item.name}
                                            />
                                        </div>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.date}</Typography>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Badge
                                        variant="filled" rounded
                                        color={
                                            ({
                                                "읽음": "blue",
                                                "안읽음": "red",
                                            }[item.status] || "gray") as "blue" | "red" | "gray"
                                        }
                                    >{item.status}</Badge>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            case "latestPost": return (
                <div className="widget-latest-post-content">
                    {POST_LIST.map((item) => (
                        <Button variant="text" key={`${item.id}`} fullWidth>
                            <Space size={14}>
                                <Badge variant="solid" rounded>{item.category}</Badge>

                                <Space justify="space-between" align="center">
                                    <Typography variant="body-lg" weight="semibold" secondary={!isDark} className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>
                                    <Typography variant="body-md" weight="semibold" tertiary={!isDark} color={isDark ? "var(--dash-text-primary)" : ""}>{item.date}</Typography>
                                </Space>
                            </Space>
                        </Button>
                    ))}
                </div>
            );

            case "orgList": return (
                <>
                    <Card.Header
                        leftIcon={<Icon name="organization" size={20} />}
                        extra={
                            <Space size="sm">
                                <Dropdown
                                    size="md" width={110}
                                    options={[{ label: "경영관리팀", value: "1" }, { label: "자금팀", value: "2" }, { label: "회계팀", value: "3" }]}
                                    value="1"
                                />
                                <div style={{ position: "relative" }}>
                                    <Button
                                        variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                        className={`button-widget-settings ${isDark && "-invert"}`} rounded
                                        aria-label="위젯 설정"
                                        aria-haspopup="true"
                                        aria-expanded={isKebabOpen}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveKebabId(isKebabOpen ? null : widget.id);
                                        }}
                                    />

                                    {isKebabOpen && (
                                        <div className="widget-setting-popup">
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteWidget(widget.id); }}>
                                                위젯 삭제
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); handleExpandWidget(widget.id); }}>
                                                {widget.size === "sm" ? "위젯 확대" : "위젯 축소"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </Space>
                        }
                    >
                        <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} />}>
                            <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>조직도</Typography>
                        </Button>
                    </Card.Header>

                    <Card.Body>
                        <div className="widget-org-list-content">
                            <ul>
                                {ORG_LIST.map((item) => (
                                    <li
                                        key={`${item.id}`} role="button"
                                        tabIndex={0}
                                        onClick={() => { }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                // DEV: onClick과 동일한 로직 실행 추가 필요 - 웹접근성
                                            }
                                        }}
                                    >
                                        <Layout.Row justify="space-between" align="center">
                                            <Layout.Col layout="horizontal" align="center" gap={14}>
                                                <div className="avatar">
                                                    <img
                                                        src={item.profileImage}
                                                        alt={item.name}
                                                    />
                                                </div>

                                                <Space layout="vertical" size={4}>
                                                    <Typography variant="body-lg" weight="semibold" color={isDark ? "var(--dash-text-primary)" : ""}>{item.name}</Typography>

                                                    <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} color="var(--dash-text-tertiary)" />}>
                                                        <Space size={4}>
                                                            <Icon name="user" size={18} color="var(--dash-text-tertiary)" />
                                                            <Typography variant="body-md" tertiary>{item.team}</Typography>
                                                        </Space>

                                                        <Space size={4}>
                                                            <Icon name="email" size={18} color="var(--dash-text-tertiary)" />
                                                            <Typography variant="body-md" tertiary>{item.email}</Typography>
                                                        </Space>
                                                    </Space>
                                                </Space>
                                            </Layout.Col>


                                            <Button
                                                variant="text"
                                                leftIcon={<Icon name="message" size={32} color="var(--dash-text-tertiary)" />}
                                                className="button-message"
                                                aria-label={`${item.name}에게 쪽지 보내기`}
                                                onClick={() => { }}
                                            />
                                        </Layout.Row>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card.Body>
                </>
            );

            case "survey": return (
                <div className="widget-survey-content">
                    <ul>
                        {SURVEY_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Layout.Col layout="horizontal" align="center" gap={14}>
                                        <Badge variant={item.dday > -10 ? "solid" : "filled"} color="red" rounded>D{item.dday}</Badge>

                                        <Space layout="vertical" size={4}>
                                            <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                            <Space size={8} separator={<Divider layout="vertical" variant="dashed" size={10} color="var(--dash-text-tertiary)" />}>
                                                <Space size={4}>
                                                    <Icon name="calendar" size={18} color="var(--dash-text-tertiary)" />
                                                    <Typography variant="body-md" tertiary>{item.date}</Typography>
                                                </Space>
                                                <Space size={4}>
                                                    <Icon name="user" size={14} color="var(--dash-text-tertiary)" />
                                                    <Space.Item>
                                                        <Typography variant="body-xs" as="strong" primary>{item.current}</Typography><Typography variant="body-xs" as="span" secondary>/{item.total}</Typography>
                                                    </Space.Item>
                                                </Space>
                                            </Space>
                                        </Space>
                                    </Layout.Col>

                                    <Button size="sm">참여</Button>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            case "dataSearch": return (
                <div className="widget-data-search-content">
                    <ul>
                        {SEARCH_DATA_LIST.map((item) => (
                            <li key={`${item.id}`}>
                                <Layout.Row justify="space-between" align="center">
                                    <Space layout="vertical" size={4}>
                                        <Typography variant="body-lg" weight="semibold" className="text-ellipsis" color={isDark ? "var(--dash-text-primary)" : ""}>{item.title}</Typography>

                                        <Typography variant="body-md" tertiary>{item.extra}</Typography>
                                    </Space>

                                    <Button variant="outlined" size="sm">보기</Button>
                                </Layout.Row>
                            </li>
                        ))}
                    </ul>
                </div>
            );

            case "exchange": return (
                <>
                    <Card.Header
                        leftIcon={<Icon name="exchange" size={20} />}
                        extra={<Typography variant="body-lg" weight="semibold"
                            color={isDark ? "var(--dash-text-disabled)" : ""}>2026년 3월 1일</Typography>}
                    >
                        <Space size={4}>
                            <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>환율</Typography>
                        </Space>
                    </Card.Header>
                    <Card.Body>
                        <Box variant="info" className="-blue widget-exchange-content">
                            <Layout.Col layout="vertical" gap={24}>
                                <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>USD</Typography>

                                <Space size={10} layout="vertical">
                                    <Space.Item size={4} align="center" justify="end">
                                        <Typography variant="heading-md" primary={!isDark} color={isDark ? "#68B8FF" : ""}>1,524.80</Typography>
                                        <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>KRW</Typography>
                                    </Space.Item>

                                    <Space.Item size={4} align="center" justify="end">
                                        <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>전 데이터 대비</Typography>
                                        <Space.Item>
                                            <Icon name="up" size={18} color="var(--dash-oil-up)" />
                                            <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">20.50</Typography>
                                        </Space.Item>
                                        <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">+1.38%</Typography>
                                    </Space.Item>
                                </Space>
                            </Layout.Col>
                        </Box>
                    </Card.Body>
                </>
            );

            case "interestRate": return (
                <>
                    <Card.Header
                        leftIcon={<Icon name="interest-rate" size={20} />}
                        extra={<Typography variant="body-lg" weight="semibold"
                            color={isDark ? "var(--dash-text-disabled)" : ""}>2026년 3월 1일</Typography>}
                    >
                        <Space size={4}>
                            <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : ""}>금리</Typography>
                        </Space>
                    </Card.Header>
                    <Card.Body>
                        <Box variant="info" className="-blue widget-interest-rate-content">
                            <Layout.Col layout="vertical" gap={24}>
                                <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>US</Typography>

                                <Space size={10} layout="vertical">
                                    <Space.Item size={4} align="center" justify="end">
                                        <Typography variant="heading-md" primary={!isDark} color={isDark ? "#68B8FF" : ""}>3.75</Typography>
                                        <Typography variant="body-lg" primary={!isDark} color={isDark ? "#68B8FF" : ""}>%</Typography>
                                    </Space.Item>

                                    <Space.Item size={10} align="center" justify="end">
                                        <Space.Item size={4} align="center">
                                            <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>전 데이터</Typography>
                                            <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">3.89%</Typography>
                                        </Space.Item>

                                        <Space size={4} align="center">
                                            <Typography variant="body-xs" as="span" color={isDark ? "var(--dash-text-tertiary)" : ""}>전 데이터 대비</Typography>
                                            <Space.Item>
                                                <Icon name="up" size={18} color="var(--dash-oil-up)" />
                                                <Typography variant="body-sm" as="span" color="var(--dash-oil-up)">2.54</Typography>
                                            </Space.Item>
                                        </Space>
                                    </Space.Item>
                                </Space>
                            </Layout.Col>
                        </Box>
                    </Card.Body>
                </>
            );

            default:
                return (
                    <div style={{ padding: 24, textAlign: "center", color: "var(--dash-text-secondary)" }}>
                        {widget.title} 콘텐츠 영역
                    </div>
                );
        }
    };

    const isCustomLayout = ["profile", "calendar", "banner", "oil", "exchange", "interestRate", "orgList"].includes(widget.type);

    if (!isCustomLayout) {
        return (
            <>
                <Card.Header
                    leftIcon={widget.icon && <Icon name={widget.icon} size={20} />}
                    extra={
                        widget.expandable && (
                            <div style={{ position: "relative" }}>
                                <Button
                                    variant="text" leftIcon={<Icon name="kebab" size={20} />}
                                    className={`button-widget-settings ${isDark && "-invert"}`} rounded
                                    aria-label="위젯 설정"
                                    aria-haspopup="true"
                                    aria-expanded={isKebabOpen}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveKebabId(isKebabOpen ? null : widget.id);
                                    }}
                                />
                                {isKebabOpen && (
                                    <div className="widget-setting-popup">
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteWidget(widget.id); }}>
                                            위젯 삭제
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleExpandWidget(widget.id); }}>
                                            {widget.size === "sm" ? "위젯 확대" : "위젯 축소"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    }
                >
                    <Button variant="text" rightIcon={<Icon name="arrow-right" size={18} color={isDark ? "var(--dash-text-disabled)" : "var(--dash-text-tertiary)"} />}>
                        <Typography variant="heading-sm" color={isDark ? "var(--dash-text-primary)" : "var(--dash-text-primary)"}>{widget.title}</Typography>
                    </Button>
                </Card.Header>

                <Card.Body>{renderContent()}</Card.Body>

                {widget.hasAction && (
                    <Card.Actions>
                        <Button fullWidth onClick={widget.action}>{widget.actionTitle}</Button>
                    </Card.Actions>
                )}
            </>
        );
    }

    return renderContent();
};