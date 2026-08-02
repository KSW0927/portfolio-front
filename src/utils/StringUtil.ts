/**
 * 문자열 유틸 (글로벌)
 */

/** 지정한 최대 글자 수를 넘기는 경우 말줄임표로 반환 → String 객체 */
export const truncateText = (text: string, maxLength: number): string => {
    if(!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};


