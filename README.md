# Frontend — NOTI-FLOW 대시보드

React + Vite + TypeScript로 구현한 [NOTI-FLOW](https://github.com/KSW0927/portfolio-api) MSA 백엔드의 동시성 제어 데모용 대시보드입니다.

**🔗 [라이브 데모](https://portfolio-front-roan-one.vercel.app)** *(Ctrl/Cmd+클릭으로 새 탭에서 열기)*

---

## 프로젝트 개요

한정 수량 상품에 N건(100/500/1000)의 동시 주문을 시뮬레이션으로 발생시키고, 락 전략(NONE/PESSIMISTIC/DISTRIBUTED)에 따라 처리 결과가 어떻게 달라지는지 실시간으로 확인할 수 있는 관제 대시보드입니다. 구매자는 로그인한 사용자 한 명이 아니라 2,000명 규모의 테스트 구매자 풀에서 매 건 랜덤 배정되어 "여러 명이 동시에 주문한" 상황을 재현하며, 요청 자체는 로그인한 사용자의 토큰으로 인증됩니다.

## 메뉴 구성

| 화면 | 경로 | 설명 |
|---|---|---|
| 로그인 | `/login` | 게스트 체험 버튼 클릭 시 시딩된 데모 계정으로 user-auth-service 로그인 API(`/api/users/login`)를 실제 호출하는 자동 로그인 |
| 메인 대시보드 | `/main` | 주문 시뮬레이션 + 위젯 4종 + 재고 패널 |

## 참고 화면 및 위젯 설명

메인 대시보드는 `useOrderSimulationStore` 하나를 여러 위젯이 공유하는 구조입니다.

| 위젯 | 파일 | 설명 |
|---|---|---|
| 옵션 설정 | `widgets/OptionWidget.tsx` | 락 전략 선택, 재고 초기화, 100/500/1000건 트리거 |
| 처리 현황 | `widgets/StatusWidget.tsx` | 주문/품절/결제대기/결제완료/오버셀/결제취소 집계 |
| 응답시간 | `widgets/LatencyWidget.tsx` | 평균/P50/P95/P99 |
| 알림 | `widgets/NotifyWidget.tsx` | WebSocket으로 수신한 실시간 알림 목록 (오버셀 > 품절·취소 > 일반 순으로 정렬) |

위 4종은 `widgetStore`에 등록되어 드래그·순서변경·표시토글이 가능한 위젯입니다. 이와 별도로 `components/ProductStockPanel.tsx`(재고 패널)가 상품×옵션 조합별 남은 재고를 보여주는데, 위젯 스토어에 속하지 않는 고정 영역입니다.

## 백엔드 연동 구조

이 프론트는 [NOTI-FLOW](https://github.com/KSW0927/portfolio-api) MSA 백엔드와 연동되어 동작하는 대시보드입니다. 로그인과 주문 처리는 REST로, 처리 결과 알림은 WebSocket(STOMP)으로 실시간 수신합니다.

| 연동 대상 | 방식 | 관련 파일 |
|---|---|---|
| user-auth-service (:8081) | REST (로그인/로그아웃) | `src/api/auth.ts`, `src/store/authStore.ts` |
| order-service (:8082) | REST (상품조회/주문/재고초기화, 락 전략 NONE/PESSIMISTIC/DISTRIBUTED 선택 포함) | `src/api/order.ts`, `src/store/orderSimulationStore.ts` |
| realtime-gateway-service (:8084) | WebSocket(STOMP, `/ws` → `/topic/notifications` 구독) | `src/store/notifyStore.ts` |

주문 처리 결과는 order-service → Kafka → notify-service → Kafka → realtime-gateway-service를 거쳐 STOMP로 브로드캐스트되고, `notifyStore`가 이를 구독해서 메인 대시보드의 알림 위젯(`NotifyWidget.tsx`)에 실시간으로 반영합니다. 백엔드 쪽 이벤트 흐름 전체는 [backend 리포지토리 README](https://github.com/KSW0927/portfolio-api)를 참고하세요.

> 현재는 전체 브로드캐스트만 구현되어 있고, 로그인한 계정이 시뮬레이션에 포함됐을 때만 오는 개인 알림(`convertAndSendToUser`)은 아직 없습니다.

## 핵심 구현 포인트

### 동시성 제한 워커풀

"1000건 버튼"을 눌러도 실제로 서버에 동시 도달하는 요청은 최대 `CONCURRENCY`개로 제한됩니다. 1코어 서버 보호와 브라우저 커넥션 제한을 고려한 설계입니다.

```ts
const CONCURRENCY = 20;

// 동시성 제한 워커풀: 한 번에 CONCURRENCY개씩만 실제로 진행 중인 요청으로 유지
let cursor = 0;
const worker = async () => {
    while (cursor < initialRows.length) {
        const idx = cursor++;
        await processOne(idx);
    }
};
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, count) }, () => worker()));
```

### REST + WebSocket 하이브리드 그리드 업데이트

그 자리에서 동기로 확정되는 결과(재고 성공/실패)는 REST 응답으로, 이후 비동기로 일어나는 결과(결제 확정, 오버셀 취소)는 `orderId`를 매칭해 WebSocket push로 반영합니다.

```ts
// notifyStore가 결제 확정 알림을 받았을 때 orderId로 매칭해서 호출
markPaymentCompleted: (orderId) => {
    const idx = ordersRef.findIndex((o) => o.orderId === orderId && o.status === '결제대기');
    if (idx === -1) return; // 배치 사이 재고초기화로 이미 지워졌거나, 중복 알림인 경우

    ordersRef[idx] = { ...ordersRef[idx], status: '결제완료' };
    paymentCompletedRef += 1;
},
```

## 기술 스택

React 18, TypeScript, Vite, Zustand, TanStack Query, Axios, @stomp/stompjs + SockJS, ag-grid-community, Tailwind CSS

## 테스트

핵심 계산 로직(`orderSimulationStore.ts`)을 Vitest로 단위 테스트했습니다. API 호출이나 스토어 상태와 무관한 순수 함수만 추출해서, mock 없이 바로 검증합니다.

| 대상 함수 | 검증 내용 | 개수 |
|---|---|---|
| `calcPercentile` | 응답시간 위젯(P50/P95/P99)이 쓰는 백분위수 계산 (nearest-rank) | 4 |
| `calcStockIntegrity` | 배치 종료 후 재고 정합성(오버셀 발생 여부) 계산 | 3 |
| `calcOversoldProducts` | 상품별 오버셀 수량 계산 | 3 |

```bash
npm run test -- orderSimulationStore
```

## 환경 설정

| 프로그램 | 버전 |
|---|---|
| Node.js | v18.12.0 |
| NPM | v8.19.2 |

각 서비스 URL은 `.env`/`.env.development`/`.env.production`의 `VITE_ORDER_API_URL`, `VITE_GATEWAY_WS_URL` 등으로 설정합니다 (`.env.example` 참고).

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:3000

npm run build    # 프로덕션 빌드
npm run test     # vitest
```

## 배포

Vercel (`develop` 브랜치 기준 자동 배포) — [https://portfolio-front-roan-one.vercel.app](https://portfolio-front-roan-one.vercel.app)
