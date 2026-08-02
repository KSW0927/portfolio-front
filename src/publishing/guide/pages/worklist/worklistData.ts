export interface WorklistItem {
    id: string;
    type: "page" | "popup";
    name: string;
    d1: string;
    d2?: string;
    d3?: string;
    d4?: string;
    start: string;
    end: string;
    worker: string;
    status?: "done" | "review" | "ing" | "del" | "" | (string & {});
    note: string;
    pageId: string;
}

export const worklistData: Record<string, WorklistItem[]> = {
    // 샘플 화면
    sample: [
        { id: "-", type: "page", name: "SubDefault.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-04-29", end: "2026-04-30", worker: "박나영", status: "done", note: "Search Box + Data Grid\n2026-05-26: Ag Grid 컴포넌트 업데이트", pageId: "subDefault", },
        { id: "-", type: "page", name: "SubFormTable.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-04-30", end: "2026-04-30", worker: "박나영", status: "done", note: "Form Table + Data Grid\n2026-05-26: Ag Grid 컴포넌트 업데이트", pageId: "subFormTable", },
        { id: "-", type: "page", name: "SubCalendar.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-05-07", end: "2026-05-07", worker: "박나영", status: "done", note: "Calendar\n2026-05-15: Calendar 컴포넌트 업데이트(디자인 수정사항 반영)", pageId: "subCalendar", },
        { id: "-", type: "page", name: "SubTreeList.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-05-07", end: "2026-05-08", worker: "박나영", status: "done", note: "Tree List", pageId: "subTreeList", },
        { id: "-", type: "page", name: "SubCardList.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-05-08", end: "2026-05-08", worker: "박나영", status: "done", note: "Card List", pageId: "subCardList", },
        { id: "-", type: "page", name: "SubDoubleTable.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-05-11", end: "2026-05-11", worker: "박나영", status: "done", note: "Form Table + Double Table", pageId: "subDoubleTable", },
        { id: "-", type: "popup", name: "ModalFormTable.tsx", d1: "publishing", d2: "pages", d3: "sample", start: "2026-05-04", end: "2026-05-04", worker: "박나영", status: "done", note: "Form Table Modal", pageId: "modalFormTable", }
    ],
    // 공통
    common: [
        { id: "UI_KSP_8000_L", type: "page", name: "로그인", d1: "로그인", d2: "로그인", d3: "로그인", start: "2026-05-08", end: "2026-05-08", worker: "박나영", status: "done", note: "2026-05-13: 디자인 수정사항 반영", pageId: "Login", },
        { id: "UI_KSP_8010_L", type: "page", name: "메인", d1: "메인", d2: "메인", d3: "메인", start: "2026-05-18", end: "2026-05-21", worker: "박나영", status: "done", note: "2026-06-02: 로그아웃 팝업 추가\n 2026-06-15: 환율, 금리 위젯 추가", pageId: "Dashboard", },
    ],
    // 업무관리
    task: [
        { id: "UI_KSP_8174_L", type: "page", name: "주기적/반복적 업무(리스트형)", d1: "업무관리", d2: "업무일지", d3: "주기적/반복적 업무(리스트형)", start: "2026-06-11", end: "2026-06-11", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8174_L", },
        { id: "UI_KSP_8192_L", type: "page", name: "방선동승 결과보고서 등록/수정", d1: "업무관리", d2: "방선동승보고", d3: "방선동승 결과보고서 등록/수정(CEO&Senior leafer visit)", start: "2026-06-11", end: "2026-06-11", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8192_L", },
        { id: "UI_KSP_8200_L", type: "page", name: "거래처면담 일정", d1: "업무관리", d2: "거래처면담 일정", d3: "거래처면담 일정(달력형)", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "UI_KSP_8201_L 포함", pageId: "UI_KSP_8200_L", },
        { id: "UI_KSP_8202_W", type: "page", name: "거래처면담 일정 등록/수정", d1: "업무관리", d2: "거래처면담 일정", d3: "거래처면담 일정 등록/수정", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "UI_KSP_8203_P, UI_KSP_8204_P 포함", pageId: "UI_KSP_8202_W", },
        { id: "UI_KSP_8220_L", type: "page", name: "비정형 데이터 검색", d1: "업무관리", d2: "비정형 데이터 검색", d3: "비정형 데이터 검색", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8220_L", },
        { id: "UI_KSP_8221_R", type: "page", name: "비정형 데이터 등록/수정", d1: "업무관리", d2: "비정형 데이터 검색", d3: "비정형 데이터 등록/수정", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8221_R", },
        { id: "UI_KSP_8230_L", type: "page", name: "업무별 신청", d1: "업무관리", d2: "업무별 신청", d3: "업무별 신청", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8230_L", },
        { id: "UI_KSP_8240_L", type: "page", name: "전산 작업 요청", d1: "업무관리", d2: "전산 작업 요청", d3: "전산 작업 요청", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8240_L", },
        { id: "UI_KSP_8241_W", type: "page", name: "전산 작업 요청 등록/수정", d1: "업무관리", d2: "전산 작업 요청", d3: "전산 작업 요청 등록/수정", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8241_W", },
        { id: "UI_KSP_8242_R", type: "page", name: "전산 작업 요청 상세", d1: "업무관리", d2: "전산 작업 요청", d3: "전산 작업 요청 상세", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8242_R", },
    ],
    // 커뮤니티
    community: [
        { id: "UI_KSP_8250_L", type: "page", name: "공지사항", d1: "커뮤니티", d2: "공지사항", d3: "공지사항", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8250_L", },
        { id: "UI_KSP_8251_W", type: "page", name: "공지사항 등록/수정", d1: "커뮤니티", d2: "공지사항", d3: "공지사항 등록/수정", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8251_W", },
        { id: "UI_KSP_8252_R", type: "page", name: "공지사항 상세", d1: "커뮤니티", d2: "공지사항", d3: "공지사항 상세", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8252_R", },
        { id: "UI_KSP_8260_L", type: "page", name: "자유게시판", d1: "커뮤니티", d2: "자유게시판", d3: "자유게시판", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8260_L", },
        { id: "UI_KSP_8261_W", type: "page", name: "자유게시판 등록/수정", d1: "커뮤니티", d2: "자유게시판", d3: "자유게시판 등록/수정", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8261_W", },
        { id: "UI_KSP_8262_R", type: "page", name: "자유게시판 상세", d1: "커뮤니티", d2: "자유게시판", d3: "자유게시판 상세", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8262_R", },
        { id: "UI_KSP_8330_L", type: "page", name: "선박별 담당자", d1: "커뮤니티", d2: "선박별 담당자", d3: "선박별 담당자", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8330_L", },
        { id: "UI_KSP_8331_W", type: "page", name: "선박별 담당자 등록/수정", d1: "커뮤니티", d2: "선박별 담당자", d3: "선박별 담당자 등록/수정", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8331_W", },
        { id: "UI_KSP_8340_L", type: "page", name: "조직 현황", d1: "커뮤니티", d2: "조직 현황", d3: "조직 현황", start: "2026-05-11", end: "2026-05-11", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8340_L", },
        { id: "UI_KSP_8350_L", type: "page", name: "비상연락망", d1: "커뮤니티", d2: "비상연락망", d3: "비상연락망", start: "2026-05-11", end: "2026-05-11", worker: "박나영", status: "done", note: "2026-06-02: 기획 수정사항 반영", pageId: "UI_KSP_8350_L", },
        { id: "UI_KSP_8351_W", type: "page", name: "비상연락망 수정", d1: "커뮤니티", d2: "비상연락망", d3: "비상연락망 수정", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "2026-06-02: 불러오기, 삭제 버튼 추가", pageId: "UI_KSP_8351_W", },
        { id: "UI_KSP_8360_L", type: "page", name: "설문", d1: "커뮤니티", d2: "설문", d3: "설문", start: "2026-05-11", end: "2026-05-11", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8360_L", },
        { id: "UI_KSP_8361_W", type: "page", name: "설문 작성", d1: "커뮤니티", d2: "설문", d3: "설문 작성", start: "2026-05-27", end: "2026-05-27", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8361_W", },
        { id: "UI_KSP_8370_L", type: "page", name: "투표", d1: "커뮤니티", d2: "투표", d3: "투표", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8370_L", },
        { id: "UI_KSP_8371_W", type: "page", name: "투표 작성", d1: "커뮤니티", d2: "투표", d3: "투표 작성", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8371_W", },
    ],
    // 직원 지원센터
    support: [
        { id: "UI_KSP_8380_L", type: "page", name: "회의실 사용 일정", d1: "직원 지원센터", d2: "회의실 사용 일정", d3: "회의실 사용 일정(달력형)", start: "2026-05-28", end: "2026-05-28", worker: "박나영", status: "done", note: "UI_KSP_8381_L, UI_KSP_8382_P, UI_KSP_8383_P 포함", pageId: "UI_KSP_8380_L", },
        { id: "UI_KSP_8400_W", type: "popup", name: "휴양시설 신청", d1: "직원 지원센터", d2: "KSS 휴양시설", d3: "휴양시설 신청", start: "2026-05-12", end: "2026-05-12", worker: "박나영", status: "del", note: "", pageId: "UI_KSP_8400_W", },
        { id: "UI_KSP_8401_L", type: "page", name: "FAQ", d1: "직원 지원센터", d2: "KSS 휴양시설", d3: "FAQ", start: "2026-05-12", end: "2026-05-12", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8401_L", },
    ],
    // 교육
    education: [
        { id: "UI_KSP_8420_L", type: "page", name: "업무숙련도 평가 내역", d1: "교육", d2: "업무숙련도 평가", d3: "업무숙련도 평가 내역", start: "2026-06-01", end: "2026-06-01", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8420_L", },
        { id: "UI_KSP_8421_W", type: "page", name: "업무숙련도 평가 등록/수정", d1: "교육", d2: "업무숙련도 평가", d3: "업무숙련도 평가 등록/수정", start: "2026-06-02", end: "2026-06-02", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8421_W", },
        { id: "UI_KSP_8430_L", type: "page", name: "부서별 교육(웨바나)", d1: "교육", d2: "부서별 교육(웨바나)", d3: "부서별 교육(웨바나)", start: "2026-06-02", end: "2026-06-02", worker: "박나영", status: "done", note: "UI_KSP_8433_P 포함\n2026-06-02: 팝업 폼 유형 수정", pageId: "UI_KSP_8430_L", },
        { id: "UI_KSP_8432_R", type: "page", name: "부서별 교육영상 상세", d1: "교육", d2: "부서별 교육(웨바나)", d3: "부서별 교육영상 상세", start: "2026-06-02", end: "2026-06-02", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8432_R", },
        { id: "UI_KSP_8440_L", type: "page", name: "법정교육", d1: "교육", d2: "법정교육", d3: "법정교육", start: "2026-06-02", end: "2026-06-02", worker: "박나영", status: "done", note: "UI_KSP_8443_P 포함\n2026-06-02: 팝업 폼 유형 수정", pageId: "UI_KSP_8440_L", },
        { id: "UI_KSP_8442_R", type: "page", name: "법정교육 상세", d1: "교육", d2: "법정교육", d3: "법정교육 상세", start: "2026-06-02", end: "2026-06-02", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8442_R", },
    ],
    // 경영혁신과제
    innovation: [
        { id: "UI_KSP_8450_L", type: "page", name: "총괄현황", d1: "경영혁신과제", d2: "총괄현황", d3: "총괄현황", start: "2026-05-12", end: "2026-05-12", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8450_L", },
        { id: "UI_KSP_8460_L", type: "page", name: "진행과제", d1: "경영혁신과제", d2: "회사 경영혁신과제", d3: "진행과제", start: "2026-05-12", end: "2026-05-12", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8460_L", },
        { id: "UI_KSP_8472_L", type: "page", name: "업무별 분류", d1: "경영혁신과제", d2: "회사 경영혁신과제", d3: "업무별 분류", start: "2026-05-13", end: "2026-05-13", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8472_L", },
    ],
    // 마이페이지
    mypage: [
        { id: "UI_KSP_8490_L", type: "page", name: "나의 정보", d1: "마이페이지", d2: "나의 정보", d3: "나의 정보", start: "2026-05-18", end: "2026-05-18", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8490_L", },
        { id: "UI_KSP_8530_L", type: "page", name: "근태/휴가 현황", d1: "마이페이지", d2: "근태/휴가 현황", d3: "근태/휴가 현황", start: "2026-05-18", end: "2026-05-18", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8530_L", },
        { id: "UI_KSP_8540_L", type: "page", name: "전자결재 현황", d1: "마이페이지", d2: "전자결재 현황", d3: "전자결재 현황", start: "2026-05-18", end: "2026-05-18", worker: "박나영", status: "done", note: "", pageId: "UI_KSP_8540_L", },
    ],
    // 전략기획시스템\기준정보 관리
    standardInfo: [
        { id: "UI_BPS_1000_L", type: "page", name: "예산 기준정보 관리", d1: "사업예산 관리", d2: "기준정보", d3: "예산 기준 정보", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "del", note: "2026-06-05: v0.6 반영으로 인한 화면 삭제", pageId: "UI_BPS_1000_L", },
        { id: "UI_BPS_1010_L", type: "page", name: "예산 기준정보 체크리스트", d1: "사업예산 관리", d2: "기준정보", d3: "예산 기준 정보 체크리스트", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "done", note: "", pageId: "UI_BPS_1010_L", },
        { id: "UI_BPS_1020_L", type: "page", name: "유류 소비량 기준 정보", d1: "사업예산 관리", d2: "기준정보", d3: "유류(연료, 윤활유) 소비량 기준 정보", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "del", note: "PD_BPS_1021_L 포함\n2026-06-05: v0.6 반영으로 인한 화면 삭제", pageId: "UI_BPS_1020_L", },
        { id: "UI_BPS_1050_L", type: "page", name: "포트별 윤활유 단가 정보", d1: "사업예산 관리", d2: "기준정보", d3: "포트별 유활류 단가 정보", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "done", note: "2026-06-05: 화면 미확정", pageId: "UI_BPS_1050_L", },
        { id: "UI_BPS_1060_L", type: "page", name: "환율 정보", d1: "사업예산 관리", d2: "기준정보", d3: "환율 정보", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "done", note: "", pageId: "UI_BPS_1060_L", },
    ],
    // 전략기획시스템\예산 편성 관리
    budgetPlan: [
        { id: "UI_BPS_1100_L", type: "page", name: "사업예산 일정관리", d1: "사업예산 관리", d2: "사업예산 수립 진행관리", d3: "사업예산 일정관리", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "done", note: "", pageId: "UI_BPS_1100_L", },
        { id: "UI_BPS_1110_L", type: "page", name: "예산 편성 진행 현황 모니터링", d1: "사업예산 관리", d2: "사업예산 수립 진행관리", d3: "예산 편성 진행 현황 모니터링", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "done", note: "", pageId: "UI_BPS_1110_L", },
        { id: "UI_BPS_1140_L", type: "page", name: "영업계획 비교", d1: "사업예산 관리", d2: "사업예산 수립 진행관리", d3: "영업계획 비교", start: "2026-06-05", end: "2026-06-05", worker: "박나영", status: "del", note: "2026-06-10: v0.6 반영으로 인한 화면 삭제", pageId: "UI_BPS_1140_L", },
    ],
    // 전략기획시스템\예산 자료 등록 관리
    dataRegist: [
        { id: "UI_BPS_1200_L", type: "page", name: "예산/계획/실적 데이터 관리(선박별)", d1: "사업예산 관리", d2: "자료 등록", d3: "예산/계획/실적 데이터 관리(선박별)", start: "2026-06-10", end: "2026-06-10", worker: "박나영", status: "done", note: "UI_BPS_1202_L 포함", pageId: "UI_BPS_1200_L", },
        { id: "UI_BPS_1250_L", type: "page", name: "예산 데이터 관리(이익 배당금)", d1: "사업예산 관리", d2: "자료 등록", d3: "예산 데이터 관리(이익 배당금)", start: "2026-06-05", end: "2026-06-05", worker: "박나영", status: "done", note: "", pageId: "UI_BPS_1250_L", },
    ],
    // 전략기획시스템\자료활용 관리
    dataUsage: [
        { id: "UI_BPS_1330_L", type: "page", name: "선박별 예산상세 내역", d1: "사업예산 관리", d2: "자료 활용", d3: "선박별 예산상세 내역", start: "2026-06-04", end: "2026-06-04", worker: "박나영", status: "done", note: "", pageId: "UI_BPS_1330_L", },
    ],
    // 전략기획시스템\전략체계도 관리
    strategyDiagram: [
        { id: "UI_SPS_2010_L", type: "page", name: "전략체계도 작성", d1: "기획전략관리(경영전략)", d2: "사업계획 관리", d3: "전략 체계도 관리(기본 관리)", start: "2026-06-10", end: "2026-06-10", worker: "박나영", status: "done", note: "UI_SPS_2012_L, UI_SPS_2013_L, UI_SPS_2014_L 포함", pageId: "UI_SPS_2010_L", },
    ],
    // 전략기획시스템\ESG경영
    esgManagement: [
        { id: "UI_SPS_2100_W", type: "page", name: "ESG지표 트리", d1: "기획전략관리(경영전략)", d2: "ESG경영", d3: "ESG지표 트리", start: "2026-06-11", end: "2026-06-11", worker: "박나영", status: "done", note: "", pageId: "UI_SPS_2100_W", },
    ],
    // 전략기획시스템\IR 관리
    irManagement: [
        { id: "UI_SPS_2201_W", type: "page", name: "IR 실시 등록/수정", d1: "기획전략관리(경영전략)", d2: "IR관리", d3: "IR실시 등록/수정", start: "2026-06-10", end: "2026-06-10", worker: "박나영", status: "done", note: "UI_SPS_2202_L 포함", pageId: "UI_SPS_2201_W", },
    ],
    // 운영관리시스템\게시판 관리
    boardManagement: [
        { id: "UI_ADM_9200_L", type: "page", name: "게시판 목록", d1: "포털 관리", d2: "게시판 관리", d3: "게시판 목록 조회", start: "2026-06-05", end: "2026-06-05", worker: "박나영", status: "done", note: "", pageId: "UI_ADM_9200_L", },
        { id: "UI_ADM_9201_R", type: "page", name: "게시판 상세", d1: "포털 관리", d2: "게시판 관리", d3: "게시판 상세", start: "2026-06-05", end: "2026-06-05", worker: "박나영", status: "done", note: "", pageId: "UI_ADM_9201_R", },
        { id: "UI_ADM_9202_W", type: "page", name: "게시판 등록/수정", d1: "포털 관리", d2: "게시판 관리", d3: "게시판 등록/수정", start: "2026-06-05", end: "2026-06-05", worker: "박나영", status: "done", note: "", pageId: "UI_ADM_9202_W", },
    ]
};