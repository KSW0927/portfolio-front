import { type ReactElement } from 'react';
import Swal, { type SweetAlertIcon, type SweetAlertOptions, type SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import i18n from 'i18next';

const SonSwal = withReactContent(Swal);

// 공통 스타일 설정
// 대시보드 위젯 카드와 톤을 맞추기 위한 커스텀 클래스(실제 스타일은 dashboard.css의 .dash-swal-* 참고).
// confirmButtonColor/cancelButtonColor 같은 인라인 색상 옵션은 CSS보다 우선 적용되어 테마 전환을
// 방해하므로 쓰지 않고, 버튼 색도 전부 customClass로만 제어한다.
const SWAL_CUSTOM_CLASS = {
    popup: 'dash-swal-popup',
    title: 'dash-swal-title',
    htmlContainer: 'dash-swal-html',
    confirmButton: 'dash-swal-confirm',
    cancelButton: 'dash-swal-cancel',
    denyButton: 'dash-swal-cancel',
};
const SWAL_TOAST_CUSTOM_CLASS = {
    popup: 'dash-swal-toast',
    title: 'dash-swal-toast-title',
};

/**
 * 전역 공통 팝업 서비스
 * theme: dark, light, auto, bootstrap-5, bootstrap-4, material-ui, bulma
 * title: 팝업의 제목(HTML형식)
 * titleText: 팝업 제목(텍스트형식)
 * html: 팝업에 대한 HTML 내용
 * text: 팝업에 표시할 내용
 * icon: warning, error, question, info, success
 * iconColor: 아이콘 색상
 * iconHTML: 커스텀 아이콘
 * animation: false면 애니메이션 미사용
 * showClass: 팝업 표시 시 애니메이션에 사용할 CSS
 * hideClass: 팝업 닫을 시 애니메이션에 사용할 CSS
 * footer: 팝업의 푸터(HTML형식 or 텍스트형식)
 * backdrop: true or false, background css
 * toast: 토스트 알림 유무
 * target:
 * topLayer:
 * input: 입력 필드 종류(text, email, password, number, tel, textarea, select, radio, checkbox, file)
 * width: 팝업 넓이
 * padding: 팝업 패딩
 * color: title, content, footer 색상
 * background: 팝업의 배경 색상
 * position: top, top-start, top-end, center, center-start, center-end, bottom, bottom-start, bottom-end
 * grow: false, row, column, fullscreen
 * customClass: 팝업의 CSS 클래스
 * timer: 팝업 자동 닫힘 시간(ms)
 * timerProgressBar: true or false
 * heightAuto: true or false
 * allowOutsideClick: true or false
 * allowEscapeKey: true or false
 * stopKeydownPropagation: true or false
 * keydownListenerCapture: true or false
 * showConfirmButton: true or false
 * showDenyButton: true or false
 * showCancelButton: true or false
 * showCloseButton: true or false
 * confirmButtonText: 확인 버튼 텍스트
 * denyButtonText: 취소 버튼 텍스트
 * cancelButtonText: 닫기 버튼 텍스트
 * confirmButtonColor: 확인 버튼 색상
 * denyButtonColor: 취소 버튼 색상
 * cancelButtonColor: 닫기 버튼 색상
 * reverseButtons: true or false, 버튼 순서 바꾸기
 * didRender: 팝업 랜더링 후 실행하는 함수
 * didOpen: 팝업 오픈 시 실행하는 함수
 * didClose: 팝업 닫을 시 실행하는 함수
 * didDestroy: 팝업 종료 후 실행하는 함수
 */
export const AlertService = {
    // 기본 알림(Success, Error, Warning, Info)
    alert: (title: string, text: string = '', icon: SweetAlertIcon = 'info') => {
        return SonSwal.fire({
            title,
            html: text,
            icon,
            confirmButtonText: i18n.t('ok'),
            cancelButtonText: i18n.t('cancel'),
            customClass: SWAL_CUSTOM_CLASS,
        });
    },
    success: (message: string, title?: string): Promise<SweetAlertResult> => {
        return SonSwal.fire({
            title: title || 'Success',
            text: message,
            icon: 'success',
            customClass: SWAL_CUSTOM_CLASS,
        });
    },
    error: (message: string, title?: string): Promise<SweetAlertResult> => {
        return SonSwal.fire({
            title: title || 'Error',
            text: message,
            icon: 'error',
            customClass: SWAL_CUSTOM_CLASS,
        });
    },
    warning: (message: string, title?: string): Promise<SweetAlertResult> => {
        return SonSwal.fire({
            title: title || 'Warning',
            text: message,
            icon: 'warning',
            customClass: SWAL_CUSTOM_CLASS,
        });
    },
    // 확인/취소 선택 알림
    confirm: async (title: string, text: string = ''): Promise<boolean> => {
        const result = await SonSwal.fire({
            title,
            html: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: i18n.t('ok'),
            cancelButtonText: i18n.t('cancel'),
            customClass: SWAL_CUSTOM_CLASS,
        });
        return result.isConfirmed;
    },
    // 우측 상단 토스트 메시지
    toast: (title: string, icon: SweetAlertIcon = 'success') => {
        const Toast = SonSwal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: SWAL_TOAST_CUSTOM_CLASS,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', SonSwal.stopTimer);
                toast.addEventListener('mouseleave', SonSwal.resumeTimer);
            }
        });
        return Toast.fire({ icon, title });
    },
    // 입력 팝업
    prompt: async (title: string, placeholder: string = ''): Promise<string | null> => {
        const { value } = await SonSwal.fire({
            title,
            input: 'text',
            inputPlaceholder: placeholder,
            showCancelButton: true,
            confirmButtonText: i18n.t('ok'),
            cancelButtonText: i18n.t('cancel'),
            customClass: SWAL_CUSTOM_CLASS,
        });
        return value || null;
    },
    // 로딩 팝업
    loading: (title: string = i18n.t('loading')) => {
        SonSwal.fire({
            title,
            allowOutsideClick: false,
            customClass: SWAL_CUSTOM_CLASS,
            didOpen: () => {
                SonSwal.showLoading();
            }
        });
    },
    //TSX 컴포넌트를 직접 주입하는 커스텀 팝업
    custom: async (title: string | ReactElement, content: ReactElement, options?: SweetAlertOptions) => {
        return SonSwal.fire({
            title,
            html: content,
            showCancelButton: true,
            confirmButtonText: i18n.t('ok'),
            cancelButtonText: i18n.t('cancel'),
            customClass: SWAL_CUSTOM_CLASS,
            ...options,
        });
    },
    // 팝업 강제 닫기
    close: () => {
        SonSwal.close();
    },
}
