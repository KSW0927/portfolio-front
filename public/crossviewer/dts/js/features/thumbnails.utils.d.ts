/**
 * thumbnails.utils.ts
 *
 * 썸네일 네비게이션 로직에서 추출된 순수 함수(pure functions).
 * DOM 의존성 및 부수 효과(side-effect)가 없으므로 단위 테스트에서 직접 사용 가능하다.
 *
 * 의존 관계:
 *   thumbnails.ts → thumbnails.utils.ts (단방향)
 *   *.test.ts     → thumbnails.utils.ts (직접 import)
 */
/**
 * pageChanged 이벤트 페이로드(safePage)와 뷰어의 실제 현재 페이지(viewerCurrentPage)를
 * 비교해 최종 네비게이션 대상 페이지를 결정한다.
 *
 * HWP/HWPX 뷰어는 getPageThumbnail() 호출 시 내부적으로 pageChanged 이벤트를
 * 발생시키는 경우가 있다. 이때 이벤트 페이로드의 page(safePage)가 실제 뷰어 현재
 * 페이지와 달라 spurious 이벤트가 발생한다.
 * 두 값이 다르면 spurious 이벤트로 판단하고 뷰어의 실제 현재 페이지를 반환한다.
 *
 * @param safePage            pageChanged 이벤트 페이로드에서 추출한 페이지 번호
 * @param viewerCurrentPage   viewer.getCurrentPage() 반환값 (null/undefined 허용)
 * @returns                   실제 UI·스크롤 업데이트에 사용할 최종 페이지 번호
 */
export declare function resolveNavigationPage(safePage: number, viewerCurrentPage: number | null | undefined): number;
/**
 * 썸네일 inner 요소의 bounding rect가 스크롤 컨테이너(뷰포트)의 범위 안에
 * 완전히 포함되는지 판단한다.
 *
 * @param thumbRect    대상 inner 요소의 { top, bottom } (viewport 기준)
 * @param viewportRect 스크롤 컨테이너 요소의 { top, bottom } (viewport 기준)
 * @returns            완전히 보이면 true, 부분적이거나 안 보이면 false
 */
export declare function isThumbnailVisible(thumbRect: {
    top: number;
    bottom: number;
}, viewportRect: {
    top: number;
    bottom: number;
}): boolean;
/**
 * 특정 요소를 스크롤 컨테이너의 상단에 맞추기 위한 scrollTop 오프셋을 계산한다.
 *
 * 공식: offset = elementTop - containerTop + currentScrollTop
 *   - elementTop과 containerTop은 모두 viewport 기준 위치이므로
 *     (elementTop - containerTop)은 컨테이너 내부에서의 상대 위치를 나타낸다.
 *   - 여기에 현재 scrollTop을 더해 콘텐츠 내부 절대 위치를 구한다.
 *
 * @param elementTop       대상 요소의 viewport-relative top (getBoundingClientRect().top)
 * @param containerTop     스크롤 컨테이너의 viewport-relative top
 * @param currentScrollTop 현재 컨테이너의 scrollTop 값
 * @returns                컨테이너에 설정해야 할 scrollTop 값
 */
export declare function calcScrollOffset(elementTop: number, containerTop: number, currentScrollTop: number): number;
