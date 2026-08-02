import { useState, useMemo } from "react";
import { worklistData } from "./worklistData";

interface WorklistProps {
    category: string;
}

const statusMap: Record<string, { label: string; class: string }> = {
    done: { label: "완료", class: "status-done" },
    review: { label: "검수 요청", class: "status-review" },
    ing: { label: "진행중", class: "status-ing" },
    del: { label: "삭제", class: "status-del" },
};

const categoryToNameMap: { [key: string]: string } = {
    sample: "샘플",
    common: "공통",
    task: "업무관리",
    community: "커뮤니티",
    support: "직원 지원센터",
    education: "교육",
    innovation: "경영혁신과제",
    mypage: "마이페이지",
    standardInfo: "기준정보 관리",
    budgetPlan: "예산 편성 관리",
    dataRegist: "예산 자료 등록 관리",
    dataUsage: "자료활용 관리",
    strategyDiagram: "전략체계도 관리",
    esgManagement: "ESG 경영",
    irManagement: "IR 관리",
    boardManagement: "게시판 관리",
};

export default function Worklist({ category }: WorklistProps) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [preview, setPreview] = useState({
        isOpen: false,
        url: "about:blank",
        width: "100%",
    });

    const categoryName = categoryToNameMap[category] || category.toUpperCase();
    const BASE_URL = `/publishing-guide/pages/${category}`;

    const wbsSummary = useMemo(() => {
        const data = worklistData[category] || [];
        const total = data.length;
        if (total === 0) {
            return { total: 0, done: 0, review: 0, ing: 0, progress: 0 };
        }
        const done = data.filter(item => item.status === "done").length;
        const review = data.filter(item => item.status === "review").length;
        const ing = data.filter(item => item.status === "ing").length;
        const progress = total > 0 ? Math.round((done / total) * 100) : 0;

        return { total, done, review, ing, progress };
    }, [category]);

    const filteredData = useMemo(() => {
        let allData: (typeof worklistData[string][0] & { originalCategory: string })[] = [];

        if (searchTerm.trim() !== "") {
            Object.entries(worklistData).forEach(([catKey, items]) => {
                const mapped = items.map(item => ({ ...item, originalCategory: catKey }));
                allData = allData.concat(mapped);
            });
        } else {
            const items = worklistData[category] || [];
            allData = items.map(item => ({ ...item, originalCategory: category }));
        }

        return allData.filter((item) => {
            const itemStatus = item.status || "";
            const matchesStatus = statusFilter === "all" || itemStatus === statusFilter;

            if (searchTerm.trim() === "") return matchesStatus;

            const lowerSearch = searchTerm.toLowerCase();
            const matchesSearch =
                item.id.toLowerCase().includes(lowerSearch) ||
                item.name.toLowerCase().includes(lowerSearch) ||
                item.worker.toLowerCase().includes(lowerSearch);

            return matchesStatus && matchesSearch;
        });
    }, [category, statusFilter, searchTerm]);

    const hasD2 = useMemo(() => filteredData.some(item => item.d2 && item.d2.trim() !== ""), [filteredData]);
    const hasD3 = useMemo(() => filteredData.some(item => item.d3 && item.d3.trim() !== ""), [filteredData]);
    const hasD4 = useMemo(() => filteredData.some(item => item.d4 && item.d4.trim() !== ""), [filteredData]);

    const emptyColSpan = 10 + (hasD2 ? 1 : 0) + (hasD3 ? 1 : 0) + (hasD4 ? 1 : 0);

    const handleOpenPreview = (url: string) => {
        setPreview((prev) => ({ ...prev, isOpen: true, url }));
    };

    const handleClosePreview = () => {
        setPreview((prev) => ({ ...prev, isOpen: false, url: "about:blank" }));
    };

    const getStatusInfo = (status?: string) => {
        if (!status) return { label: "-", class: "status-empty" };
        return statusMap[status] || { label: status, class: "status-custom" };
    };

    return (
        <>
            <header className="guide-content-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="guide-h2">{categoryName}</h2>

                <div className="worklist-search-group" style={{ position: "relative" }}>
                    <input
                        type="text"
                        id="worklist-search"
                        placeholder="전체 화면 ID, 화면명, 작업자 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingRight: searchTerm ? "3.2rem" : "1.2rem" }}
                    />

                    {searchTerm && (
                        <button className="btn-clear-search" onClick={() => setSearchTerm("")} aria-label="검색어 초기화" > &times; </button>
                    )}
                </div>
            </header>

            <div className="guide-content-body worklist-page-body">
                {searchTerm.trim() === "" && (
                    <div className="worklist-summary">
                        <div className="worklist-summary-group">
                            <div className="summary-item">
                                <span className="summary-label">전체</span>
                                <span className="summary-value">{wbsSummary.total}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">완료</span>
                                <span className="summary-value done">{wbsSummary.done}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">검수</span>
                                <span className="summary-value review">{wbsSummary.review}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">진행</span>
                                <span className="summary-value ing">{wbsSummary.ing}</span>
                            </div>
                        </div>
                        <div className="summary-progress">
                            <span className="summary-label">진척도</span>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${wbsSummary.progress}%` }} />
                            </div>
                            <span className="summary-value">{wbsSummary.progress}%</span>
                        </div>
                    </div>
                )}

                <div className="worklist-controls">
                    <div className="worklist-filter-group">
                        {["all", "ing", "review", "done"].map((status) => (
                            <label key={status} className="filter-item">
                                <input
                                    type="radio"
                                    name="status"
                                    value={status}
                                    checked={statusFilter === status}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                />
                                <span className="filter-item-text">
                                    {status === "all" ? "전체" : statusMap[status]?.label || status}
                                </span>
                            </label>
                        ))}
                    </div>
                    {searchTerm.trim() !== "" && (
                        <div style={{ fontSize: "1.4rem", color: "var(--text-muted)", fontWeight: "500" }}>
                            총 <strong style={{ color: "var(--accent-color)" }}>{filteredData.length}</strong>건의 화면이 검색되었습니다.
                        </div>
                    )}
                </div>

                <div className="worklist-wrapper">
                    <div className="table-area">
                        <table>
                            <colgroup>
                                <col width="8%" />
                                <col width="5%" />
                                <col width="12%" />
                                <col width="8%" />
                                {hasD2 && <col width="8%" />}
                                {hasD3 && <col width="8%" />}
                                {hasD4 && <col width="8%" />}
                                <col width="8%" />
                                <col width="8%" />
                                <col width="5%" />
                                <col width="7%" />
                                <col width="*" />
                                <col width="3%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th className="guide-th">화면 ID</th>
                                    <th className="guide-th">타입</th>
                                    <th className="guide-th">화면명</th>
                                    <th className="guide-th">Depth 1</th>
                                    {hasD2 && <th className="guide-th">Depth 2</th>}
                                    {hasD3 && <th className="guide-th">Depth 3</th>}
                                    {hasD4 && <th className="guide-th">Depth 4</th>}
                                    <th className="guide-th">시작일</th>
                                    <th className="guide-th">종료일</th>
                                    <th className="guide-th">작업자</th>
                                    <th className="guide-th">상태</th>
                                    <th className="guide-th">비고</th>
                                    <th className="guide-th"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => {
                                        const statusInfo = getStatusInfo(item.status);
                                        const itemBaseUrl = `/publishing-guide/pages/${item.originalCategory}`;
                                        const itemUrl = item.pageId ? `${itemBaseUrl}/${item.pageId}` : "";
                                        const isActive = preview.isOpen && preview.url === itemUrl;

                                        return (
                                            <tr key={`${item.originalCategory}-${item.pageId || item.name}`} className={isActive ? "active-row" : ""}>
                                                <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.id === "-" ? "" : item.id}</td>
                                                <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>
                                                    <span className={`type-badge ${item.type === "popup" ? "popup" : "page"}`}>
                                                        {item.type === "popup" ? "Pop-up" : "Page"}
                                                    </span>
                                                </td>
                                                <td className="guide-td name-cell" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>
                                                    {searchTerm && (
                                                        <span style={{ fontSize: "1.1rem", color: "#999", display: "block", marginBottom: "2px" }}>
                                                            {categoryToNameMap[item.originalCategory] || item.originalCategory}
                                                        </span>
                                                    )}
                                                    {item.name}
                                                </td>
                                                <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.d1}</td>
                                                {hasD2 && <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.d2 || "-"}</td>}
                                                {hasD3 && <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.d3 || "-"}</td>}
                                                {hasD4 && <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.d4 || "-"}</td>}
                                                <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.start}</td>
                                                <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.end || "-"}</td>
                                                <td className="guide-td" style={item.status === "del" ? { textDecoration: "line-through", color: "var(--color-text-disabled, #aaa)" } : undefined}>{item.worker}</td>
                                                <td className="guide-td">
                                                    <span className={`status-badge ${statusInfo.class}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td className="guide-td note-cell">{item.note}</td>
                                                <td className="guide-td">
                                                    {item.pageId && item.status !== "del" ? (
                                                        <button className="btn-preview" onClick={() => handleOpenPreview(itemUrl)}>🔍</button>
                                                    ) : (
                                                        <span style={{ color: "#ccc" }}>-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan={emptyColSpan} className="td no-data-cell">검색 결과가 없습니다.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className={`preview-area ${preview.isOpen ? "open" : ""}`}>
                        <div className="preview-controls">
                            <div className="preview-title" style={{ flex: 1, fontWeight: "bold", fontSize: "1.5rem", color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingRight: "1rem" }}>
                                {preview.isOpen && (() => {
                                    const activeItem = filteredData.find(item => {
                                        const url = item.pageId ? `/publishing-guide/pages/${item.originalCategory}/${item.pageId}` : "";
                                        return url === preview.url;
                                    });
                                    if (!activeItem) return null;
                                    return (
                                        <>
                                            {activeItem.name}
                                            <span style={{ fontSize: "1.3rem", color: "var(--accent-color)", marginLeft: "0.5rem" }}>
                                                ({activeItem.id})
                                            </span>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="device-btns">
                                <button className={preview.width === "412px" ? "active" : ""} onClick={() => setPreview(p => ({ ...p, width: "412px" }))}>📱 Mobile</button>
                                <button className={preview.width === "768px" ? "active" : ""} onClick={() => setPreview(p => ({ ...p, width: "768px" }))}>💻 Tablet</button>
                                <button className={preview.width === "100%" ? "active" : ""} onClick={() => setPreview(p => ({ ...p, width: "100%" }))}>🖥️ PC</button>
                            </div>
                            <div className="preview-actions">
                                <button className="btn-preview-action" onClick={() => window.open(preview.url)}>새창으로 열기</button>
                                <button className="btn-close" onClick={handleClosePreview}>&times;</button>
                            </div>
                        </div>
                        <div className="iframe-container" style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            backgroundColor: "var(--preview-bg, #f4f4f4)",
                            overflow: "auto",
                            padding: preview.width === "100%" ? "0" : "2rem 0"
                        }}>
                            <iframe
                                src={preview.url}
                                title="Preview"
                                className="preview-iframe"
                                style={{
                                    width: preview.width,
                                    height: "100%",
                                    minHeight: "100%",
                                    border: preview.width === "100%" ? "none" : "1px solid #ddd",
                                    backgroundColor: "#fff",
                                    boxShadow: preview.width === "100%" ? "none" : "0 4px 12px rgba(0,0,0,0.1)",
                                    transition: "width 0.3s ease"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}