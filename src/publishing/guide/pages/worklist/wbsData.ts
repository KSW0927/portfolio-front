export interface WbsHeader {
    month: string;
    weeks: string[];
}

export interface WbsTask {
    depth: number;
    name: string;
    assignee: string;
    schedule: boolean[];
}

export const wbsSchedule: { headers: WbsHeader[]; tasks: WbsTask[] } = {
    headers: [
        { month: "4월", weeks: ["3주", "4주"] },
        { month: "5월", weeks: ["1주", "2주", "3주", "4주"] },
        { month: "6월", weeks: ["1주", "2주"] },
    ],
    tasks: [
        { depth: 1, name: "구조 설계", assignee: "박나영", schedule: [true, false, false, false, false, false, false, false] },
        { depth: 2, name: "분석 및 표준 구조 정의", assignee: "박나영", schedule: [true, false, false, false, false, false, false, false] },
        { depth: 2, name: "디자인 시스템 구조 설계", assignee: "박나영", schedule: [true, false, false, false, false, false, false, false] },
        { depth: 3, name: "네임스페이스 규칙 정의", assignee: "박나영", schedule: [true, false, false, false, false, false, false, false] },
        { depth: 3, name: "Asset 구조 설계", assignee: "박나영", schedule: [true, false, false, false, false, false, false, false] },
        { depth: 3, name: "토큰 계증 정의", assignee: "박나영", schedule: [true, false, false, false, false, false, false, false] },
        { depth: 1, name: "구현 1단계", assignee: "박나영", schedule: [false, true, true, true, true, true, false, false] },
        { depth: 2, name: "Core CSS 개발", assignee: "박나영", schedule: [false, true, false, false, false, false, false, false] },
        { depth: 3, name: "Typography", assignee: "박나영", schedule: [false, true, false, false, false, false, false, false] },
        { depth: 3, name: "Layout", assignee: "박나영", schedule: [false, true, false, false, false, false, false, false] },
        { depth: 3, name: "Color", assignee: "박나영", schedule: [false, true, false, false, false, false, false, false] },
        { depth: 3, name: "Image", assignee: "박나영", schedule: [false, true, false, false, false, false, false, false] },
        { depth: 2, name: "UI 컴포넌트 개발", assignee: "박나영", schedule: [false, false, true, false, false, false, false, false] },
        { depth: 3, name: "Button", assignee: "박나영", schedule: [false, false, true, false, false, false, false, false] },
        { depth: 3, name: "Icon", assignee: "박나영", schedule: [false, false, true, false, false, false, false, false] },
        { depth: 3, name: "Badge", assignee: "박나영", schedule: [false, false, true, false, false, false, false, false] },
        { depth: 3, name: "Card", assignee: "박나영", schedule: [false, false, true, false, false, false, false, false] },
        { depth: 3, name: "List", assignee: "박나영", schedule: [false, false, false, true, false, false, false, false] },
        { depth: 3, name: "Input", assignee: "박나영", schedule: [false, false, false, true, false, false, false, false] },
        { depth: 3, name: "Select", assignee: "박나영", schedule: [false, false, false, true, false, false, false, false] },
        { depth: 3, name: "Checkbox", assignee: "박나영", schedule: [false, false, false, true, false, false, false, false] },
        { depth: 3, name: "Radio", assignee: "박나영", schedule: [false, false, false, false, true, false, false, false] },
        { depth: 3, name: "Date picker", assignee: "박나영", schedule: [false, false, false, false, true, false, false, false] },
        { depth: 3, name: "Pagination", assignee: "박나영", schedule: [false, false, false, false, true, false, false, false] },
        { depth: 3, name: "Search Bar", assignee: "박나영", schedule: [false, false, false, false, true, false, false, false] },
        { depth: 3, name: "Calendar", assignee: "박나영", schedule: [false, false, false, false, false, true, false, false] },
        { depth: 3, name: "Widget", assignee: "박나영", schedule: [false, false, false, false, false, true, false, false] },
        { depth: 3, name: "Layer Popup", assignee: "박나영", schedule: [false, false, false, false, false, true, false, false] },
        { depth: 3, name: "Modal", assignee: "박나영", schedule: [false, false, false, false, false, true, false, false] },
        { depth: 2, name: "외부 플러그인 적용", assignee: "박나영", schedule: [false, false, false, false, false, false, true, true] },
        { depth: 3, name: "Data Grid(tabulator)", assignee: "박나영", schedule: [false, false, false, false, false, false, true, false] },
        { depth: 3, name: "Tree View(js tree)", assignee: "박나영", schedule: [false, false, false, false, false, false, false, true] },
    ],
};