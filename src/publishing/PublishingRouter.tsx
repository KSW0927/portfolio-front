import { Routes, Route, Navigate } from "react-router-dom";
import GuideLayout from "./guide/layout/GuideLayout";
import Wbs from "./guide/pages/worklist/Wbs";
import Worklist from "./guide/pages/worklist/Worklist";
import {
    HtmlConvention, CssConvention, JsConvention, ClassConvention, FolderConvention, ImgConvention,
    ComponentOverview,
    ColorGuide, TypoGuide, IconGuide, LayoutGuide,
    AlertGuide, CalendarGuide, DataGridGuide, DatepickerGuide, FileUploaderGuide, SearchBoxGuide, TreeListGuide,
    BadgeGuide, BoxGuide, ButtonGuide, CardGuide, CheckboxGuide, CollapseGuide, DividerGuide, DropdownGuide, InputGuide, ListGuide, ModalGuide, RadioButtonGuide, SpaceGuide, SwitchGuide, TabGuide, TableGuide, TextareaGuide,
} from "./guide/pages";
import {
    ModalFormTable, SubCalendar, SubCardList, SubDefault, SubFormTable, SubTreeList, SubDoubleTable,
    Login, Dashboard,
    UI_KSP_8174_L, UI_KSP_8192_L, UI_KSP_8200_L, UI_KSP_8202_W, UI_KSP_8220_L, UI_KSP_8221_R, UI_KSP_8230_L, UI_KSP_8331_W, UI_KSP_8240_L, UI_KSP_8241_W, UI_KSP_8242_R,
    UI_KSP_8250_L, UI_KSP_8251_W, UI_KSP_8252_R, UI_KSP_8260_L, UI_KSP_8261_W, UI_KSP_8262_R, UI_KSP_8330_L, UI_KSP_8340_L, UI_KSP_8350_L, UI_KSP_8351_W, UI_KSP_8360_L, UI_KSP_8361_W, UI_KSP_8370_L, UI_KSP_8371_W,
    UI_KSP_8380_L, UI_KSP_8400_W, UI_KSP_8401_L,
    UI_KSP_8420_L, UI_KSP_8421_W, UI_KSP_8430_L, UI_KSP_8432_R, UI_KSP_8440_L, UI_KSP_8442_R,
    UI_KSP_8450_L, UI_KSP_8460_L, UI_KSP_8472_L,
    UI_KSP_8490_L, UI_KSP_8530_L, UI_KSP_8540_L,
    UI_BPS_1000_L, UI_BPS_1010_L, UI_BPS_1020_L, UI_BPS_1050_L, UI_BPS_1060_L,
    UI_BPS_1100_L, UI_BPS_1110_L, UI_BPS_1140_L,
    UI_BPS_1200_L, UI_BPS_1250_L,
    UI_BPS_1330_L,
    UI_SPS_2010_L,
    UI_SPS_2100_W,
    UI_SPS_2201_W,
    UI_ADM_9200_L, UI_ADM_9201_R, UI_ADM_9202_W,
} from "./pages";

import "../assets/css/common-ui.css";
import "../assets/css/components.css";

export default function PublishingRouter() {
    return (
        <Routes>
            <Route element={<GuideLayout />}>
                <Route index element={<Navigate to="worklist/sample" replace />} />

                {/* Convention */}
                <Route path="convention/html" element={<HtmlConvention />} />
                <Route path="convention/css" element={<CssConvention />} />
                <Route path="convention/js" element={<JsConvention />} />
                <Route path="convention/class" element={<ClassConvention />} />
                <Route path="convention/filename" element={<FolderConvention />} />
                <Route path="convention/imgname" element={<ImgConvention />} />

                {/* Worklist */}
                <Route path="worklist/wbs" element={<Wbs />} />
                <Route path="worklist/sample" element={<Worklist category="sample" />} />
                <Route path="worklist/common" element={<Worklist category="common" />} />
                <Route path="worklist/task" element={<Worklist category="task" />} />
                <Route path="worklist/community" element={<Worklist category="community" />} />
                <Route path="worklist/support" element={<Worklist category="support" />} />
                <Route path="worklist/education" element={<Worklist category="education" />} />
                <Route path="worklist/innovation" element={<Worklist category="innovation" />} />
                <Route path="worklist/mypage" element={<Worklist category="mypage" />} />
                <Route path="worklist/standardInfo" element={<Worklist category="standardInfo" />} />
                <Route path="worklist/budgetPlan" element={<Worklist category="budgetPlan" />} />
                <Route path="worklist/dataRegist" element={<Worklist category="dataRegist" />} />
                <Route path="worklist/dataUsage" element={<Worklist category="dataUsage" />} />
                <Route path="worklist/esgManagement" element={<Worklist category="esgManagement" />} />
                <Route path="worklist/irManagement" element={<Worklist category="irManagement" />} />
                <Route path="worklist/strategyDiagram" element={<Worklist category="strategyDiagram" />} />
                <Route path="worklist/boardManagement" element={<Worklist category="boardManagement" />} />

                {/* Components */}
                <Route path="components/overview" element={<ComponentOverview />} />
                <Route path="components/color" element={<ColorGuide />} />
                <Route path="components/typo" element={<TypoGuide />} />
                <Route path="components/icon" element={<IconGuide />} />
                <Route path="components/layout" element={<LayoutGuide />} />

                <Route path="components/alert" element={<AlertGuide />} />
                <Route path="components/calendar" element={<CalendarGuide />} />
                <Route path="components/dataGrid" element={<DataGridGuide />} />
                <Route path="components/datepicker" element={<DatepickerGuide />} />
                <Route path="components/fileUploader" element={<FileUploaderGuide />} />
                <Route path="components/searchBox" element={<SearchBoxGuide />} />
                <Route path="components/treeList" element={<TreeListGuide />} />

                <Route path="components/badge" element={<BadgeGuide />} />
                <Route path="components/box" element={<BoxGuide />} />
                <Route path="components/button" element={<ButtonGuide />} />
                <Route path="components/calendar" element={<CalendarGuide />} />
                <Route path="components/card" element={<CardGuide />} />
                <Route path="components/checkbox" element={<CheckboxGuide />} />
                <Route path="components/collapse" element={<CollapseGuide />} />
                <Route path="components/divider" element={<DividerGuide />} />
                <Route path="components/dropdown" element={<DropdownGuide />} />
                <Route path="components/input" element={<InputGuide />} />
                <Route path="components/list" element={<ListGuide />} />
                <Route path="components/modal" element={<ModalGuide />} />
                <Route path="components/radioButton" element={<RadioButtonGuide />} />
                <Route path="components/space" element={<SpaceGuide />} />
                <Route path="components/switch" element={<SwitchGuide />} />
                <Route path="components/tab" element={<TabGuide />} />
                <Route path="components/table" element={<TableGuide />} />
                <Route path="components/textarea" element={<TextareaGuide />} />

            </Route >

            <Route path="pages/sample/subDefault" element={<SubDefault />} />
            <Route path="pages/sample/subFormTable" element={<SubFormTable />} />
            <Route path="pages/sample/subCalendar" element={<SubCalendar />} />
            <Route path="pages/sample/subTreeList" element={<SubTreeList />} />
            <Route path="pages/sample/subCardList" element={<SubCardList />} />
            <Route path="pages/sample/subDoubleTable" element={<SubDoubleTable />} />
            <Route path="pages/sample/modalFormTable" element={<ModalFormTable />} />
            <Route path="pages/common/login" element={<Login />} />
            <Route path="pages/common/dashboard" element={<Dashboard />} />
            {/* 업무관리 */}
            <Route path="pages/task/UI_KSP_8174_L" element={<UI_KSP_8174_L />} />                   {/* 주기적/반복적 업무 */}
            <Route path="pages/task/UI_KSP_8192_L" element={<UI_KSP_8192_L />} />                   {/* 방선동승 결과보고서 등록/수정(CEO&Senior leafer visit) */}
            <Route path="pages/task/UI_KSP_8200_L" element={<UI_KSP_8200_L />} />                   {/* 거래처면담 일정 */}
            <Route path="pages/task/UI_KSP_8202_W" element={<UI_KSP_8202_W />} />                   {/* 거래처면담 일정 등록/수정 */}
            <Route path="pages/task/UI_KSP_8220_L" element={<UI_KSP_8220_L />} />                   {/* 비정형 데이터 검색 */}
            <Route path="pages/task/UI_KSP_8221_R" element={<UI_KSP_8221_R />} />                   {/* 비정형 데이터 등록/수정 */}
            <Route path="pages/task/UI_KSP_8230_L" element={<UI_KSP_8230_L />} />                   {/* 업무별 신청 */}
            <Route path="pages/task/UI_KSP_8240_L" element={<UI_KSP_8240_L />} />                   {/* 전산 작업 요청 */}
            <Route path="pages/task/UI_KSP_8241_W" element={<UI_KSP_8241_W />} />                   {/* 전산 작업 요청 등록/수정 */}
            <Route path="pages/task/UI_KSP_8242_R" element={<UI_KSP_8242_R />} />                   {/* 전산 작업 요청 상세 */}
            {/* 커뮤니티 */}
            <Route path="pages/community/UI_KSP_8250_L" element={<UI_KSP_8250_L />} />              {/* 공지사항 */}
            <Route path="pages/community/UI_KSP_8251_W" element={<UI_KSP_8251_W />} />              {/* 공지사항 등록/수정 */}
            <Route path="pages/community/UI_KSP_8252_R" element={<UI_KSP_8252_R />} />              {/* 공지사항 상세 */}
            <Route path="pages/community/UI_KSP_8260_L" element={<UI_KSP_8260_L />} />              {/* 자유게시판 */}
            <Route path="pages/community/UI_KSP_8261_W" element={<UI_KSP_8261_W />} />              {/* 자유게시판 등록/수정 */}
            <Route path="pages/community/UI_KSP_8262_R" element={<UI_KSP_8262_R />} />              {/* 자유게시판 상세 */}
            <Route path="pages/community/UI_KSP_8330_L" element={<UI_KSP_8330_L />} />              {/* 선박별 담당자 */}
            <Route path="pages/community/UI_KSP_8331_W" element={<UI_KSP_8331_W />} />              {/* 선박별 담당자 등록/수정 */}
            <Route path="pages/community/UI_KSP_8340_L" element={<UI_KSP_8340_L />} />              {/* 조직 현황 */}
            <Route path="pages/community/UI_KSP_8350_L" element={<UI_KSP_8350_L />} />              {/* 비상연락망 */}
            <Route path="pages/community/UI_KSP_8351_W" element={<UI_KSP_8351_W />} />              {/* 비상연락망 수정 */}
            <Route path="pages/community/UI_KSP_8360_L" element={<UI_KSP_8360_L />} />              {/* 설문 */}
            <Route path="pages/community/UI_KSP_8361_W" element={<UI_KSP_8361_W />} />              {/* 설문 작성 */}
            <Route path="pages/community/UI_KSP_8370_L" element={<UI_KSP_8370_L />} />              {/* 투표 */}
            <Route path="pages/community/UI_KSP_8371_W" element={<UI_KSP_8371_W />} />              {/* 투표 작성 */}
            {/* 직원 지원센터 */}
            <Route path="pages/support/UI_KSP_8380_L" element={<UI_KSP_8380_L />} />                {/* 회의실 사용 일정 */}
            <Route path="pages/support/UI_KSP_8400_W" element={<UI_KSP_8400_W />} />                {/* 휴양시설 신청 */}
            <Route path="pages/support/UI_KSP_8401_L" element={<UI_KSP_8401_L />} />                {/* FAQ */}
            {/* 교육 */}
            <Route path="pages/education/UI_KSP_8420_L" element={<UI_KSP_8420_L />} />              {/* 업무숙련도 평가 내역 */}
            <Route path="pages/education/UI_KSP_8421_W" element={<UI_KSP_8421_W />} />              {/* 업무숙련도 평가 내역 등록/수정 */}
            <Route path="pages/education/UI_KSP_8430_L" element={<UI_KSP_8430_L />} />              {/* 부서별 교육(웨바나) */}
            <Route path="pages/education/UI_KSP_8432_R" element={<UI_KSP_8432_R />} />              {/* 부서별 교육영상 상세 */}
            <Route path="pages/education/UI_KSP_8440_L" element={<UI_KSP_8440_L />} />              {/* 법정교육 */}
            <Route path="pages/education/UI_KSP_8442_R" element={<UI_KSP_8442_R />} />              {/* 법정교육 상세 */}
            {/* 경영혁신과제 */}
            <Route path="pages/innovation/UI_KSP_8450_L" element={<UI_KSP_8450_L />} />             {/* 총괄현황 */}
            <Route path="pages/innovation/UI_KSP_8460_L" element={<UI_KSP_8460_L />} />             {/* 진행과제 */}
            <Route path="pages/innovation/UI_KSP_8472_L" element={<UI_KSP_8472_L />} />             {/* 업무별 분류 */}
            {/* 마이페이지 */}
            <Route path="pages/mypage/UI_KSP_8490_L" element={<UI_KSP_8490_L />} />                 {/* 나의 정보 */}
            <Route path="pages/mypage/UI_KSP_8530_L" element={<UI_KSP_8530_L />} />                 {/* 근태/휴가 현황 */}
            <Route path="pages/mypage/UI_KSP_8540_L" element={<UI_KSP_8540_L />} />                 {/* 전자결재 현황 */}
            {/* 전략기획시스템\기준정보관리 */}
            <Route path="pages/standardInfo/UI_BPS_1000_L" element={<UI_BPS_1000_L />} />           {/* 예산 기준정보 관리 */}
            <Route path="pages/standardInfo/UI_BPS_1010_L" element={<UI_BPS_1010_L />} />           {/* 예산 기준정보 체크리스트 */}
            <Route path="pages/standardInfo/UI_BPS_1020_L" element={<UI_BPS_1020_L />} />           {/* 유류 소비량 기준 정보 */}
            <Route path="pages/standardInfo/UI_BPS_1050_L" element={<UI_BPS_1050_L />} />           {/* 포트별 윤활유 단가 정보 */}
            <Route path="pages/standardInfo/UI_BPS_1060_L" element={<UI_BPS_1060_L />} />           {/* 환율 정보 */}
            {/* 전략기획시스템\예산 편성 관리 */}
            <Route path="pages/budgetPlan/UI_BPS_1100_L" element={<UI_BPS_1100_L />} />             {/* 사업예산 일정관리 */}
            <Route path="pages/budgetPlan/UI_BPS_1110_L" element={<UI_BPS_1110_L />} />             {/* 예산 편성 진행 현황 모니터링 */}
            <Route path="pages/budgetPlan/UI_BPS_1140_L" element={<UI_BPS_1140_L />} />             {/* 영업계획 비교 */}
            {/* 전략기획시스템\예산 자료 등록 관리 */}
            <Route path="pages/dataRegist/UI_BPS_1200_L" element={<UI_BPS_1200_L />} />             {/* 예산/계획/실적 데이터 관리(선박별) */}
            <Route path="pages/dataRegist/UI_BPS_1250_L" element={<UI_BPS_1250_L />} />             {/* 예산 데이터 관리(이익 배당금) */}
            {/* 전략기획시스템\자료활용 관리 */}
            <Route path="pages/dataUsage/UI_BPS_1330_L" element={<UI_BPS_1330_L />} />              {/* 선박별 예산 상세 내역 */}
            {/* 전략기획시스템\전략체계도 관리 */}
            <Route path="pages/strategyDiagram/UI_SPS_2010_L" element={<UI_SPS_2010_L />} />        {/* 전략체계도 작성 */}
            {/* 전략기획시스템\IR 관리 */}
            <Route path="pages/esgManagement/UI_SPS_2100_W" element={<UI_SPS_2100_W />} />          {/* ESG지표 트리 */}
            {/* 전략기획시스템\IR 관리 */}
            <Route path="pages/irManagement/UI_SPS_2201_W" element={<UI_SPS_2201_W />} />           {/* IR 실시 등록/수정 */}
            {/* 운영관리시스템\게시판 관리 */}
            <Route path="pages/boardManagement/UI_ADM_9200_L" element={<UI_ADM_9200_L />} />        {/* 게시판 목록 */}
            <Route path="pages/boardManagement/UI_ADM_9201_R" element={<UI_ADM_9201_R />} />        {/* 게시판 상세 */}
            <Route path="pages/boardManagement/UI_ADM_9202_W" element={<UI_ADM_9202_W />} />        {/* 게시판 등록/수정 */}
        </Routes >
    );
}