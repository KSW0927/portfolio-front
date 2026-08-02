/**
 * 날짜 변환 유틸 (글로벌)
 */

/** YYYYMMDD / YYYY-MM-DD / YYYY.MM.DD / YYYY/MM/DD → Date 객체 */
export const ymdToDate = (ymd?: string | null): Date | null => {
    if (!ymd) return null;
    const clean = ymd.replace(/[-/.]/g, '');
    if (clean.length !== 8) return null;
    const y = Number(clean.substring(0, 4));
    const m = Number(clean.substring(4, 6)) - 1;
    const d = Number(clean.substring(6, 8));
    const dt = new Date(y, m, d);
    return isNaN(dt.getTime()) ? null : dt;
};

/** Date 객체 → YYYYMMDD 문자열 */
export const dateToYmd = (date: Date | null): string => {
    if (!date) return '';
    const y = date.getFullYear().toString().padStart(4, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}${m}${d}`;
};
