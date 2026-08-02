
/**
 * 외부 사이트 이동 유틸
 */
export const ExternalSiteMove = {
    // ─── ADMIN ──────────────────────────────────────────────────────────
    // 관리 사이트 메인으로 이동
    adminKssMainPage: () => {
        window.open(import.meta.env.VITE_ADMIN_SITE_URL, "_blank", "noopener, noreferrer");
    },

    // ─── CMS ──────────────────────────────────────────────────────────
    // 전자결제 목록 화면(임시 주소)
    cmsElectronicApprovalListPage: () => {
        window.open(import.meta.env.VITE_ERP_SITE_URL, "_blank", "noopener, noreferrer");
    },
    // 연차 목록 화면(임시 주소)
    cmsAnnualLeaveListPage: () => {
        window.open(import.meta.env.VITE_ERP_SITE_URL, "_blank", "noopener, noreferrer");
    },

    // ─── ERP ──────────────────────────────────────────────────────────
    erpKssMainPage: () => {
        window.open(import.meta.env.VITE_ERP_SITE_URL, "_blank", "noopener, noreferrer");
    },
    // 전자결제 목록 화면(임시 주소)
    erpElectronicApprovalListPage: () => {
        window.open(import.meta.env.VITE_ERP_SITE_URL, "_blank", "noopener, noreferrer");
    },
    // 연차 목록 화면(임시 주소)
    erpAnnualLeaveListPage: () => {
        window.open(import.meta.env.VITE_ERP_SITE_URL, "_blank", "noopener, noreferrer");
    },
}
