import dayjs from "dayjs";
import type { ValueFormatterParams} from "ag-grid-community";
import type {OptionItem} from "@/types/types.ts";



// ─── 유틸 ────────────────────────────────────────────────────────────────────




/**
 * Grid 포맷터 공통 - AG Grid
 * 기본 빌드인 제공 :
 */
export const AgGridFormatters = {
    // ─── ThousandsFormatter ──────────────────────────────────────────────────────────
    // 천자리 표시 및 소수점 처리
    thousandsFormatter: (target: ValueFormatterParams | { decimal: number }) => {

        if(typeof target === "object" && "value" in target) {
            const params = target as ValueFormatterParams;

            // 값에 대한 예외처리
            if(params.value === null || params.value === undefined) return "";
            // 숫자가 아니면 원본 그래도 반환
            const numericValue = Number(params.value);
            if(isNaN(numericValue)) return params.value;

            return numericValue.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
        }

        const decimal = ("decimal" in target) ? target.decimal : 0;

        return (params: ValueFormatterParams) => {
            // 값에 대한 예외처리
            if(params.value === null || params.value === undefined) return "";
            // 숫자가 아니면 원본 그래도 반환
            const numericValue = Number(params.value);
            if(isNaN(numericValue)) return params.value;

            return numericValue.toLocaleString("ko-KR", { maximumFractionDigits: decimal });
        }
    },
    // ─── CurrencyFormatter ──────────────────────────────────────────────────────────
    // 금액(KRW, USD)
    currencyFormatter: (target: ValueFormatterParams | { currency: string }) => {

        if(typeof target === "object" && "value" in target) {
            const params = target as ValueFormatterParams;

            // 값에 대한 예외처리
            if(params.value === null || params.value === undefined) return "";
            // 숫자가 아니면 원본 그래도 반환
            const numericValue = Number(params.value);
            if(isNaN(numericValue)) return params.value;

            return numericValue.toLocaleString("ko-KR", { maximumFractionDigits: 0, style: "currency", currency: "KRW" });
        }

        const currency = ("currency" in target) ? target.currency : "KRW";

        return (params: ValueFormatterParams) => {
            // 값에 대한 예외처리
            if(params.value === null || params.value === undefined) return "";
            // 숫자가 아니면 원본 그래도 반환
            const numericValue = Number(params.value);
            if(isNaN(numericValue)) return params.value;

            return numericValue.toLocaleString("ko-KR", { maximumFractionDigits: 0, style: "currency", currency: currency });
        }
    },
    // ─── dateFormatter ──────────────────────────────────────────────────────────
    // 날짜 표시
    dateFormatter: (target: ValueFormatterParams | { format: string }) => {

        if(typeof target === "object" && "value" in target) {
            const params = target as ValueFormatterParams;

            // 값에 대한 예외처리
            if(!params.value) return "-";
            // 날짜가 아니면 원본 그래도 반환
            const dateValue = new Date(params.value);
            if(isNaN(dateValue.getTime())) return params.value;

            return dayjs(params.value).format("YYYY-MM-DD");
        }

        const format = ("format" in target) ? target.format : "YYYY-MM-DD";

        return (params: ValueFormatterParams) => {
            // 값에 대한 예외처리
            if(!params.value) return "-";
            // 날짜가 아니면 원본 그래도 반환
            const dateValue = new Date(params.value);
            if(isNaN(dateValue.getTime())) return params.value;

            return dayjs(params.value).format(format);
        }
    },
    dateTimeFormatter: (target: ValueFormatterParams | { format: string }) => {

        if(typeof target === "object" && "value" in target) {
            const params = target as ValueFormatterParams;

            // 값에 대한 예외처리
            if(!params.value) return "-";
            // 날짜가 아니면 원본 그래도 반환
            const dateValue = new Date(params.value);
            if(isNaN(dateValue.getTime())) return params.value;

            return dayjs(params.value).format("YYYY-MM-DD HH:mm:ss");
        }

        const format = ("format" in target) ? target.format : "YYYY-MM-DD HH:mm:ss";

        return (params: ValueFormatterParams) => {
            // 값에 대한 예외처리
            if(!params.value) return "-";
            // 날짜가 아니면 원본 그래도 반환
            const dateValue = new Date(params.value);
            if(isNaN(dateValue.getTime())) return params.value;

            return dayjs(params.value).format(format);
        }
    },
    // ─── phoneFormatter ──────────────────────────────────────────────────────────
    // 전화번호 표시
    phoneFormatter: (params: ValueFormatterParams) => {
        // 값에 대한 예외처리
        if(!params.value) return "";
        // 숫자만 남기기
        const num = params.value.replace(/[^0-9]/g, "");

        if(num.length === 11) {
            return num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-%3");
        } else if(num.length === 10) {
            return num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-%3");
        } else {
            return params.value;
        }
    },
    // ─── bizNoFormatter ──────────────────────────────────────────────────────────
    // 사업자번호 표시
    bizNoFormatter: (params: ValueFormatterParams) => {
        // 값에 대한 예외처리
        if(!params.value) return "";
        // 숫자만 남기기
        const num = params.value.replace(/[^0-9]/g, "");

        if(num.length === 10) {
            return num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-%3");
        } else {
            return params.value;
        }
    },
    // ─── percentFormatter ──────────────────────────────────────────────────────────
    // 백분율 표시
    percentFormatter: (params: ValueFormatterParams) => {
        // 값에 대한 예외처리
        if(params.value === null || params.value === undefined) return "0%";
        // 숫자가 아니면 원본 그래도 반환
        const numericValue = Number(params.value);
        if(isNaN(numericValue)) return params.value;

        // 소수점 값일 경우 100을 곱해 백분율로 백분율 값이면 %만 추가
        const isDecimalFraction = numericValue > -1 && numericValue < 1 && numericValue !== 0;
        const finalNum = isDecimalFraction ? numericValue * 100 : numericValue;

        return `${finalNum.toFixed(1)}%`; // 소수점 1자리까지 표시
    },
    // ─── truncateFormatter ──────────────────────────────────────────────────────────
    // 말줄임
    truncateFormatter: (maxLength: number = 20) => {
        return (params: ValueFormatterParams) => {
            // 값에 대한 예외처리
            if(!params.value) return "";

            const str = String(params.value);
            return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
        }
    },
    // ─── codeNameFormatter ──────────────────────────────────────────────────────────
    // 코드데이터
    codeNameFormatter: (codes: OptionItem[]) => {
        return (params: ValueFormatterParams) => {
            // 값에 대한 예외처리
            if(!params.value) return "-";
            if(codes === null || codes === undefined || codes.length === 0) return params.value;

            // 매칭되는 코드 값 찾기
            const matchOption = codes.find(item => item.value === String(params.value));
            return matchOption ? matchOption.label : params.value;
        }
    },

}


/**
 * Grid 포맷터 공통 - Tabulator
 * 기본 빌드인 제공 :
 * - Plain Text : {title:"Example", field:"example", formatter:"plaintext"}
 * - Textarea : {title:"Example", field:"example", formatter:"textarea"}
 * - HTML : {title:"Example", field:"example", formatter:"html"}
 * - Money : {title:"Example", field:"example", formatter:"money", formatterParams: { decimal:".", thousand:",", symbol:"$", symbolAfter:"P", negativeSign:"-", precision:"2 }}
 * - Image : {title:"Ecample", field:"example", formatter:"image", formatterParams: { height:"50px", width:"50px", urlPrefix:"https://website.com/images/", urlSuffix:".png" }}
 * - Link : {title:"Example", field:"example", formatter:"link", formatterParams: { labelField:"name", urlPrefix:"mailto://", target:"_blank" }}
 * - Date Time(이용 시 luxon.js 라이브러리 추가 필요, 미사용 예정) : {title:"Example", field:"example", formatter:"datetime", formatterParams: { inputFormat:"yyyy-MM-dd HH:mm:ss", outputFormat:"yyyy.MM.dd HH:mm", invalidPlaceholder:"", timeZone:"America/New_York" }}
 * - Date Time Difference(이용 시 luxon.js 라이브러리 추가 필요, 미사용 예정) : {title:"Example", field:"example", formatter:"datetimediff", formatterParams: { inputFormat:"yyyy-MM-dd", units:["months", "days", "hours"], humanize:true, invalidPlaceholder:"" }}
 * - Tick Cross : {title:"Example", field:"example", formatter:"tickCross", formatterParams: { allowEmpty:true, allowTruthy:true, tickElement:"<i class='fa fa-check'>", crossElement:"<i class='fa fa-times'>" }}
 * - Color : {title:"Example", field:"example", formatter:"color"}
 * - Star Rating : {title:"Example", field:"example", formatter:"star", formatterParams: { stars:8 }}
 * - Traffic Light : {title:"Example", field:"example", formatter:"traffic", formatterParams: { min:0, max:10, colors:["red", "yellow", "green"] }}
 * - Progress Bar : {title:"Example", field:"example", formatter:"progress", formatterParams: { min:0, max:100, colors:["red", "yellow", "green"], legndColor:"#000000", legendAlign:"center" }}
 * - Array : {title:"Example", field:"example", formatter:"array", formatterParams: { delimiter:"|", valueMap:"age" }}
 * - List Lookup : {title:"Example", field:"example", formatter:"lookup", formatterParams: { "small":"Cute", "medium":"Fine", "big":"Scary" }}
 * - Json : {title:"Example", field:"example", variableHeight:true, formatter:"json", formatterParams:{ multiline:false, indent:" ", replacer:["cheese"] }}
 * - Toggle Switch : {title:"Example", field:"example", formatter:"toggle", formatterParams: { size:40, onValue:"on", offValue:"off", onTruthy:true, onColor:"green", offColor:"red", clickable:true }}
 * - Tick Button : {title:"Example", field:"example", formatter:"buttonTick"}
 * - Cross Button : {title:"Example", field:"example", formatter:"buttonCross"}
 * - Adaptable : {title:"Example", field:"example", formatter:"adaptable"}
 * - Row Number : {title:"Example", field:"example", formatter:"rownum"}
 * - Row Handle : {title:"Example", field:"example", formatter:"handle"}
 * - Row Selection : {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, titleFormatterParams: {rowRange:"active"}}
 */
export const TabulatorFormatters = {
    /**
     * 버튼 1개짜리 Formatter
     * @param label 버튼 라벨
     * @param onClick 버튼 클릭 이벤트
     */
    buttonFormatter: (label: string, onClick?: (data: any) => void) => {
        return (cell: any) => {
            const button = document.createElement("button");
            button.innerHTML = label;
            button.style.padding = "2px 8px";
            button.style.cursor = "pointer";
            button.classList.add("btn gridview");

            button.addEventListener("click", (e: any) => {
                e.stopPropagation(); // 행 선택이나 드래그 이벤트 전파 방지
                onClick?.(cell.getData());
            });

            return button;
        };
    },
    /**
     * 버튼 2개이상 Formatter
     * @param config {label, onClick}[]
     */
    multiButtonFormatter: (config: { label: string, onClick?: (data: any) => void }[] ) => {
        return (cell: any) => {
            const container = document.createElement("dev");
            container.style.display = "flex";
            container.style.gap = "5px";
            container.style.justifyContent = "center";

            config.forEach((item: any) => {
                const button = document.createElement("button");
                button.innerHTML = item.label;
                button.style.cursor = "pointer";
                button.classList.add("btn gridview");

                button.addEventListener("click", (e: any) => {
                    e.stopPropagation(); // 행 선택이나 드래그 이벤트 전파 방지
                    item.onClick?.(cell.getData());
                });

                container.appendChild(button);
            });

            return container;
        };
    },
    /**
     * 날짜 Formatter
     * @param formatType date | datetime | custom 날짜 형식 종류
     * @param locale 지역설정(기본값 ko-KR) 한국은 일자 사이 '.', en-CA '-'
     */
    dateFormatter: (formatType: 'date' | 'datetime' | 'time' = 'date', locale: string = 'ko-KR') => {
        return (cell: any) => {
            const value = cell.getValue();
            if(!value) return "-"; //데이터가 없을 경우 빈 값 반환

            const date = new Date(value);
            if(isNaN(date.getTime())) return value; //유효하지 않은 날짜인 경우 원본 반환

            const options: Intl.DateTimeFormatOptions = {};
            if(formatType === 'date') { //결과 예: 2024. 5. 20
                options.year = 'numeric';
                options.month = '2-digit';
                options.day = '2-digit';
            } else if(formatType === 'datetime') { //결과 예: 2024. 5. 20 14:30
                options.year = 'numeric';
                options.month = '2-digit';
                options.day = '2-digit';
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.hour12 = false;
            } else if(formatType === 'time') {
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.second = '2-digit';
            }

            return new Intl.DateTimeFormat(locale, options).format(date);
        };
    },
}
