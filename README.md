# Frontend

This is a React application built with Vite, TypeScript, Zustand, Tailwind CSS, and Axios.

## 백엔드 연동 구조 (notiflow)

이 프론트는 [notiflow](https://github.com/KSW0927/portfolio-api) MSA 백엔드와 붙어서 동작하는 대시보드입니다. 회원가입/로그인과 주문 처리는 REST로, 처리 결과 알림은 WebSocket(STOMP)으로 실시간 수신합니다.

| 연동 대상 | 방식 | 관련 파일 |
|---|---|---|
| user-auth-service (:8081) | REST (로그인/회원가입/로그아웃) | `src/api/auth.ts`, `src/store/authStore.ts` |
| order-service (:8082) | REST (상품조회/주문/재고초기화, 락 전략 NONE/PESSIMISTIC/DISTRIBUTED 선택 포함) | `src/api/order.ts`, `src/store/orderSimulationStore.ts` |
| realtime-gateway-service (:8084) | WebSocket(STOMP, `/ws` > `/topic/notifications` 구독) | `src/store/notifyStore.ts` |

주문 처리 결과는 order-service > Kafka > notify-service > Kafka > realtime-gateway-service를 거쳐 STOMP로 브로드캐스트되고, `notifyStore`가 이를 구독해서 메인 대시보드의 알림 위젯(`src/pages/main/widgets/NotifyWidget.tsx`)에 실시간으로 반영합니다. 백엔드 쪽 이벤트 흐름 전체는 backend 리포지토리 README를 참고하세요.

각 서비스 URL은 `.env`/`.env.development`의 `VITE_ORDER_API_URL`, `VITE_GATEWAY_WS_URL` 등으로 설정합니다.

## 프로젝트 소개

### 프로젝트 개요

### 메뉴 구성

## 참고 화면 및 메뉴 설명

### 메인 화면

### 로그인 화면

## 환경 설정

프로젝트에서 사용된 환경 프로그램 정보는 다음과 같다.

| 프로그램 명 | 버전 명  |
| :---------- | :------- |
| Node.js     | v18.12.0 |
| NPM         | v8.19.2  |

## BackEnd 구동

## FrontEnd 구동

아래 1 ~ 3의 과정을 따라서 진행한다.

### 1. 프로젝트의 생성

Git에서 복제하여 설치 시 1-1. 을 참고한다.

#### 1-1. Git에서 프로젝트 복제 및 모듈 설치

### 2. 백엔드 프로젝트 설정

구동된 BackEnd 서버의 URL을 본 어플리케이션의 .env.development 파일의 VITE_EGOV_CONTEXT_URL에 설정해 준다.
(단, 개발환경에서는 사용하는 환경변수 정보는 .env.development, build 시 사용하는 환경변수는 .env.production 에 기입해 준다.)

```bash
# .env.development 예시
VITE_APP_EGOV_CONTEXT_URL=localhost:8080
```

### 3. 프로젝트 폴더 구성
```bash
Docs/                                      # 프로젝트 관련 문서
public/                                    # 원본 그대로 사용할 리소스
src/                        
 ├── api/                                  # Axios 인스턴스, API 명세서별 호출 함수
 ├── assets/                               # 이미지, 폰트, 글로벌 스타일
 ├── conponents/                           # 재사용 가능한 UI 컴포넌트
 │    ├── common/                          # 공통 컴포넌트
 │    ├── charts/                          # 차트 컴포넌트
 │    ├── edior/                           # 에디터 컴포넌트
 │    ├── grid/                            # 그리드 컴포넌트
 │    ├── layout/                          # Header, Footer, Sidebar 등 레이아웃
 ├── config/                               # 각종 설정
 ├── constants/                            # 환경 변수, 설정값, 매직 넘버 등
 ├── hooks/                                # 커스텀 훅(useAuth, useFetch 등)      
 ├── pages/                                # 라우팅 단위의 페이지 컴포넌트
 ├── store/                                # 상태관리(Zustand)
 ├── test/                                 # 테스트 관련
 ├── types/                                # TypeScript 인터페이스 및 타입 정의
 ├── utils/                                # 순수 함수(날짜 포맷팅, 로컬 스토리지 제어 등)
 ├── App.css
 ├── App.text.tsx
 ├── App.tsx                               # 라우팅 설정 및 Global Provider 배치
 ├── index.css
 ├── main.tsx
 └── pages/                                # 페이지 컴포넌트 (Home, BoardList, Search 등)
│   └── task/                              # 업무관리
│   │   ├── 1.1 TaskTaskLog.tsx            # 업무일지(달력형/리스트형)
│   │   ├── 1.2 TaskPrdRct.tsx             # 주기적/반복적 업무(리스트형)
│   │   ├── 1.3 TaskReqTaskMng.tsx         # 요청업무 관리
│   │   ├── 1.4 TaskTaskPrst.tsx           # 업무일지 현황
│   │   ├── 1.5 TaskClsCod.tsx             # 분류코드
│   │   ├── 1.6 TaskBrdInspRpt.tsx         # 방선동승보고
│   │   ├── 1.7 TaskCnptSchdl.tsx          # 거래처면담 일정
│   │   ├── 1.8 TaskCnptAdbk.tsx           # 거래처 주소록
│   │   ├── 1.9 TaskUstrPrst.tsx           # 비정형 데이터 검색
│   │   ├── 1.10 TaskTskasnPrst.tsx        # 업무별 신청
│   │   ├── 1.11 TaskTechDmnd.tsx          # 전산 작업 요청
│   │   └── 1.12 TaskWorkReqt.tsx          # 업무 작업 요청
│   ├── cmnty/                             # 커뮤니티
│   │   ├── 2.1 CmntyNtcBbs.tsx            # 공지사항
│   │   ├── 2.2 CmntyFrbBbs.tsx            # 자유게시판
│   │   ├── 2.3 CmntyPrbBbs.tsx            # 칭찬게시판
│   │   ├── 2.4 CmntyMcdNtc.tsx            # 회발위 공지사항(간사)
│   │   ├── 2.5 CmntyShpNews.tsx           # 해운/조선 소식
│   │   ├── 2.6 CmntySftBlt.tsx            # Safety Bulletin
│   │   ├── 2.7 CmntyLbrFnd.tsx            # 사내 근로복지 기금
│   │   ├── 2.8 CmntySfprplAsct.tsx        # 우리사주조합
│   │   ├── 2.9 CmntyVslPic.tsx            # 선박별 담당자
│   │   ├── 2.10 CmntyOgnzPrst.tsx         # 조직현황
│   │   ├── 2.11 CmntyEuseCnpl.tsx         # 비상연락망
│   │   ├── 2.12 CmntySrvy.tsx             # 설문
│   │   └── 2.13 CmntyVote.tsx             # 투표
│   ├── com/                               # 공통 화면
│   │   ├── CmntyNtcBbs.tsx                # 공지사항
│   │   ├── CmntySrvy.tsx                  # 설문
│   │   └── CmntyVote.tsx                  # 투표
│   ├── sprt/                              # 직원 지원센터
│   │   ├── 3.1 SprtCfrmSchdl.tsx          # 회의실 사용일정(달력형/리스트형)
│   │   ├── 3.2 SprtVhclPrst.tsx           # 법인차량 현황 및 신청(달력형/리스트형)
│   │   ├── 3.3 SprtVctRclt.tsx            # KSS 휴양시설
│   │   ├── 3.4 SprtVctFaq.tsx             # KSS 휴양시설 FAQ
│   │   └── 3.5 SprtDclr.tsx               # 고충처리 위원회
│   ├── edu/                               # 교육
│   │   ├── 4.1 EduTaskEvl.tsx             # 업무숙련도 평가
│   │   ├── 4.2 EduDeptEdu.tsx             # 부서별 교육 (웨비나)
│   │   └── 4.3 EduSttyEdu.tsx             # 법정교육
│   ├── mngm/                              # 경영혁신과제
│   │   ├── 5.1 MngmOvrlPrst.tsx           # 총괄현황
│   │   ├── 5.2 MngmCoMngmAsmt.tsx         # 회사 경영혁신과제
│   │   │   ├── 5.2.1 MngmPrgrsAsmt.tsx    # 진행과제
│   │   │   ├── 5.2.2 MngmPrplAsmt.tsx     # 지속추진과제
│   │   │   ├── 5.2.3 MngmTrmnAsmt.tsx     # 종결과제
│   │   │   └── 5.2.4 MngmTaskClsf.tsx     # 업무별 분류
│   │   ├── 5.3 MngmMngmRpt.tsx            # 경영진 주요보고사항
│   │   └── 5.4 MngmPrsmpPrfmnc.tsx        # 추정실적추이    --
│   ├── mypage/                            # 마이페이지
│   │   ├── 6.1 MyDashboard.tsx            # 대시보드
│   │   ├── 6.2 MsgAndNoti.tsx             # 쪽지 및 알림
│   │   ├── 6.3 MyAplyHis.tsx              # 나의 신청내역
│   │   ├── 6.4 MyEduHis.tsx               # 나의 교육내역
│   │   ├── 6.5 MyAtabPrst.tsx             # 근태/휴가 현황
│   │   ├── 6.6 MyElaprPrst.tsx            # 전자결재 현황
│   │   ├── 6.7 MySlryPrst.tsx             # 월별급여 현황
│   │   └── 6.8 MySlry.tsx                 # 월급여 명세서
│   ├── bizBgt/                            # 사업예산관리
│   │   ├── 7.1 CrtrInfo.tsx               # 기준정보 - 예산기준정보 관리
│   │   ├── 7.2 CrtrInfoChkList.tsx        # 기준정보 - 예산기준정보 조회
│   │   ├── 7.3 CrtrInfoFlco.tsx           # 기준정보 - 유류 소비량 관리
│   │   ├── 7.4 CrtrInfoPortChg.tsx        # 기준정보 - 항구별 표준 항비
│   │   ├── 7.5 CrtrInfoVsl.tsx            # 기준정보 - 선발별 항차정보
│   │   ├── 7.6 CrtrInfoFlcoUntprc.tsx     # 기준정보 - 포트별 유류 단가정보
│   │   ├── 7.7 CrtrInfoExchrt.tsx         # 기준정보 - 환율정보
│   │   ├── 7.8 BgtFndgSchdl.tsx           # 사업예산수립 - 사업예산 일정관리
│   │   ├── 7.9 BgtFndgPrst.tsx            # 사업예산수립 - 예산 편성 관리
│   │   ├── 7.10 BgtFndgBgt.tsx            # 사업예산수립 - 선박별 예산 조회
│   │   ├── 7.11 BgtFndgSnths.tsx          # 사업예산수립 - 본부 예산 조회
│   │   ├── 7.12 BgtFndgBizPln.tsx         # 사업예산수립 - 영업계획 비교
│   │   ├── 7.13 DataRegBgtMng.tsx         # 자료등록 - 선박별 관리(예산/계획/실적 데이터 관리)
│   │   ├── 7.14 DataRegBgtMngNorm.tsx     # 자료등록 - 공통분배/일반관리(예산/계획/실적 데이터 관리)
│   │   ├── 7.15 DataRegBgtMngComCst.tsx   # 자료등록 - 선박별 공통비용 관리(예산/계획/실적 데이터 관리)
│   │   ├── 7.15 DataRegBgtDatMng.tsx      # 자료등록 - 예산 데이터관리
│   │   ├── 7.16 DataUtlzBscs.tsx          # 자료활용 - 항목별 관리(기초 예산 내역/상세 내역)
│   │   ├── 7.17 DataUtlzBscsVsl.tsx       # 자료활용 - 선박별 관리(기초 예산 내역/상세 내역)
│   │   ├── 7.18 DataUtlzPrfmnc.tsx        # 자료활용 - 과거 실적 비교(미정)
│   │   ├── 7.19 DataUtlz.tsx              # 자료활용 - 매출액 증감 자료(미정)
│   │   ├── 7.20 DataUtlzSale.tsx          # 자료활용 - 영업이익 증감 자료(미정)
│   │   ├── 7.21 DataUtlzCorp.tsx          # 자료활용 - 법인세전이익 증감 자료(미정)
│   │   └── 7.22 DataUtlzTsls.tsx          # 자료활용 - 매출 총이익 증감 자료(미정)
│   └── plan/                              # 기획전략(경영전략)
│       ├── 8.1 PlanMngPrpl.tsx            # 사업계획관리 - 부서별 중점 추진사항 관리
│       ├── 8.2 PlanMngStrtg.tsx           # 사업계획관리 - 전략체계도 관리
│       ├── 8.3 PlanMngMngm.tsx            # 사업계획관리 - 경영방침 관리
│       ├── 8.4 PlanMngDeptTask.tsx        # 사업계획관리 - 부서별 주요업무 관리
│       ├── 8.5 EsgMngmTree.tsx            # ESG경영 - ESG 지표 설정 관리
│       ├── 8.6 EsgMngmDeptInpt.tsx        # ESG경영 - ESG 지표 입력 관리
│       ├── 8.7 EsgMngmGoal.tsx            # ESG경영 - ESG 지표 보고서 관리
│       ├── 8.8 IrMngIng.tsx               # IR관리 - IR 관리
│       ├── 8.9 IrMngInsdMng.tsx           # IR관리 - IR참석자 관리
│       ├── 8.10 IrMngCmnty.tsx            # IR관리 - 네이버 종토방 관리
│       └── 8.11 IrMngHpFqa.tsx            # IR관리 - FAQ 관리
.env.development
.env.production
.gitignore                   # Git에 올리지 않는 파일에 대한 정의
eslint.config.js
index.html
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
```

### 4. 프로젝트 공통 기능
- 다국어 : react-i18next (다국어 지원 및 날짜/통화 포맷팅)
- 보안 : React Router + Zustand (로그인 세션 유지 및 권한별 페이지 접근 제어)
- 유효성 검사 : Zod (API 요청 및 폼 입력 값의 타입/규격 검증)
- 그리드 : Toast UI Grid
- 그래프 : Apache Echarts 5.x
- 에디터 : Summernote
- 달력 :
- 색상???

### 4-1. 다국어 가이드
- 공통 부분 : com.문자id
- 그리드 및 테이블 부분 : table.컬럼명
- 검색 부분 : search.조건명
- 버튼 부분 : butn.문자열명
- 메시지 : msg.문자열명
- 오류메시지 : msg.err.문자열명

### 5. 공통 컴포넌트 샘플 페이지
http://localhost:8080/sample

### 6. 퍼블리싱 가이드 페이지
http://localhost:3000/publishing-guide


### 99. 프로젝트 실행 및 기타 명령어
```bash
# 테스트용 리액트 서버를 실행할 때 아래 명령어를 사용한다.
npm run dev
```
```bash
# 빌드할 때에는 아래 명령어를 사용한다.
npm run build
```
```bash
# 로컬에서 미리보기할 때는 아래 명령어를 사용한다.
npm run preview
```
```bash
# 테스트 대상 파일 경로는 vite.config.js에 명시되어 있으며 디폴트로 EgovMain.jsx의 테스트를 실행한다.
# watch 모드로 테스트를 실행할 경우에는 아래 명령어를 사용한다.
npm run test

# 일회성 테스트를 실행할 경우에는 아래 명령어를 사용한다.
npm run test:run
```

### 참조
보다 상세한 설명은 아래의 문서를 확인한다.

1. [vite 공식 가이드 문서(한글)](https://vitejs-kr.github.io/guide/)
2. [개발환경 초기 설정](./Docs/development-env-setting.md)