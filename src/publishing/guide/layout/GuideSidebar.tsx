import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const componentMenu = [
    {
        title: "General",
        links: [
            { path: "/publishing-guide/components/color", name: "Color" },
            { path: "/publishing-guide/components/typo", name: "Typography" },
            { path: "/publishing-guide/components/icon", name: "Icon" },
            { path: "/publishing-guide/components/layout", name: "Layout" },
        ]
    },
    {
        title: "Modules",
        links: [
            { path: "/publishing-guide/components/alert", name: "Alert" },
            { path: "/publishing-guide/components/calendar", name: "Calendar" },
            { path: "/publishing-guide/components/dataGrid", name: "Data Grid(Ag Grid)" },
            { path: "/publishing-guide/components/datepicker", name: "Datepicker" },
            { path: "/publishing-guide/components/fileUploader", name: "File Uploader" },
            { path: "/publishing-guide/components/searchBox", name: "Search Box" },
            { path: "/publishing-guide/components/treeList", name: "Tree List" },
        ]
    },
    {
        title: "Components",
        links: [
            { path: "/publishing-guide/components/badge", name: "Badge" },
            { path: "/publishing-guide/components/box", name: "Box" },
            { path: "/publishing-guide/components/button", name: "Button" },
            { path: "/publishing-guide/components/card", name: "Card" },
            { path: "/publishing-guide/components/checkbox", name: "Checkbox" },
            { path: "/publishing-guide/components/collapse", name: "Collapse" },
            { path: "/publishing-guide/components/divider", name: "Divider" },
            { path: "/publishing-guide/components/dropdown", name: "Dropdown" },
            { path: "/publishing-guide/components/input", name: "Input" },
            { path: "/publishing-guide/components/list", name: "List" },
            { path: "/publishing-guide/components/modal", name: "Modal" },
            { path: "/publishing-guide/components/radioButton", name: "Radio Button" },
            { path: "/publishing-guide/components/space", name: "Space" },
            { path: "/publishing-guide/components/switch", name: "Switch" },
            { path: "/publishing-guide/components/tab", name: "Tab" },
            { path: "/publishing-guide/components/table", name: "Table" },
            { path: "/publishing-guide/components/textarea", name: "Textarea" },
        ]
    }
];

export default function GuideSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [searchTerm, setSearchTerm] = useState("");
    const isConvention = currentPath.includes("/convention");
    const isWorklist = currentPath.includes("/worklist");
    const isComponents = currentPath.includes("/components");

    const filteredMenu = componentMenu
        .map(group => ({
            ...group,
            links: group.links.filter(link =>
                link.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter(group => group.links.length > 0);

    return (
        <aside className="sidebar">
            {/* Convention SNB */}
            <div className={`snb-group ${isConvention ? "active" : ""}`}>
                <h3 className="snb-title" style={{ marginTop: "2.0rem" }}>코딩 규칙</h3>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/convention/html" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>HTML</NavLink></li>
                    <li><NavLink to="/publishing-guide/convention/css" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>CSS</NavLink></li>
                    <li><NavLink to="/publishing-guide/convention/js" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>JS</NavLink></li>
                </ul>
                <h3 className="snb-title">명명 규칙</h3>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/convention/filename" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>파일/폴더</NavLink></li>
                    <li><NavLink to="/publishing-guide/convention/imgname" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>이미지</NavLink></li>
                    <li><NavLink to="/publishing-guide/convention/class" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>클래스</NavLink></li>
                </ul>
            </div>

            {/* Worklist SNB */}
            <div className={`snb-group ${isWorklist ? "active" : ""}`}>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/worklist/wbs" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>WBS(컴포넌트)</NavLink></li>
                </ul>
                <h3 className="snb-title">포탈</h3>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/worklist/sample" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>샘플 화면</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/common" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>공통</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/task" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>업무관리</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/community" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>커뮤니티</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/support" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>직원 지원센터</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/education" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>교육</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/innovation" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>경영혁신과제</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/mypage" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>마이페이지</NavLink></li>
                </ul>
                <h3 className="snb-title">전략기획시스템</h3>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/worklist/standardInfo" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>기준 정보 관리</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/budgetPlan" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>예산 편성 관리</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/dataRegist" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>예산 자료 등록 관리</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/dataUsage" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>자료활용 관리</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/strategyDiagram" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>전략체계도 관리</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/esgManagement" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>ESG 경영</NavLink></li>
                    <li><NavLink to="/publishing-guide/worklist/irManagement" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>IR 관리</NavLink></li>
                </ul>
                <h3 className="snb-title">운영관리시스템</h3>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/worklist/boardManagement" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>게시판 관리</NavLink></li>
                </ul>
            </div>

            {/* Components SNB */}
            <div className={`snb-group ${isComponents ? "active" : ""}`}>
                <div className="snb-search-wrapper">
                    <input
                        type="text"
                        className="snb-search-input"
                        placeholder="컴포넌트 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <ul className="snb-list">
                    <li><NavLink to="/publishing-guide/components/overview" className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>Overview</NavLink></li>
                </ul>
                {filteredMenu.map(group => (
                    <div key={group.title}>
                        <h3 className="snb-title">{group.title}</h3>
                        <ul className="snb-list">
                            {group.links.map(link => (
                                <li key={link.path}>
                                    <NavLink to={link.path} className={({ isActive }) => isActive ? "snb-item active" : "snb-item"}>{link.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
}