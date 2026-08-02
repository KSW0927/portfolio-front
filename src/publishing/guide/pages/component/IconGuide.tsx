import { useState, useMemo } from "react";
import { Icon, type IconSize } from "@/publishing/components";

const iconList = {
    "18": ["add", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "ascending", "asterisk", "attachment", "banner", "bell", "blank", "calendar", "call", "chart", "checklist", "close", "community", "contents", "descending", "down", "download", "education", "email", "erp", "excel", "expandable-list", "external-link", "first", "folder", "home", "inbox", "info", "infor", "last", "left", "location", "management", "menu", "menu2", "message", "new", "org-char", "pencil", "popup", "port", "price", "reset", "right", "search", "settings", "site", "star", "survey", "technology", "tree-view-minus", "tree-view-plus", "up", "user", "user-check", "up-down", "vote", "warning", "bank", "bank-line", "calculating-machine", "company-vehicle", "global", "leave-line", "meeting-line", "menu-w", "oil-prices", "relaxation", "speaker", "stock-price", "register"],
    "20": ["approval", "calendar2", "completed", "education", "favorite", "kebab", "leave", "meeting", "message2", "notice", "organization", "pending", "post-latest", "rejected", "request", "scheduled", "survey", "vote2", "oil", "data-search", "exchange", "interest-rate"],
    "24": ["add", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "attachment", "banner", "bell", "blank", "calendar", "call", "chart", "checklist", "close", "community", "contents", "download", "education", "email", "erp", "excel", "external-link", "first", "folder", "home", "inbox", "info", "infor", "last", "location", "management", "menu", "message", "money", "new", "org-char", "pencil", "popup", "port", "price", "reset", "search", "settings", "siren", "site", "star", "survey", "technology", "user", "user-check", "up-down", "vote", "warning"],
    "32": ["add", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "attachment", "banner", "bell", "blank", "calendar", "call", "chart", "checklist", "close", "community", "contents", "download", "education", "email", "erp", "excel", "external-link", "first", "folder", "home", "inbox", "info", "infor", "last", "location", "management", "menu", "menu2", "message", "org-char", "pencil", "popup", "port", "price", "reset", "search", "settings", "siren", "site", "star", "survey", "technology", "user", "user-check", "up-down", "vote", "warning"],
};

const Toast = ({ message, isVisible }: { message: string; isVisible: boolean }) => (
    <div className={`guide-toast ${isVisible ? "visible" : ""}`}>
        <span className="guide-toast-icon">✨</span>{message}
    </div>
);

const IconItem = ({ name, size, onCopy }: { name: string; size: IconSize; onCopy: (text: string) => void }) => {
    const copyText = `<Icon name="${name}" size={${size}} />`;

    return (
        <button
            className="icon-item-wrap"
            onClick={() => onCopy(copyText)}
            title="클릭하여 코드 복사"
        >
            <Icon name={name} size={size} />
            <code className="icon-item-name">
                {name}
            </code>
        </button>
    );
};

export default function IconGuide() {
    const [searchTerm, setSearchTerm] = useState("");
    const [toast, setToast] = useState({ isVisible: false, message: "" });

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setToast({ isVisible: true, message: "아이콘 코드가 복사되었습니다!" });
            setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 2000);
        } catch (err) {
            console.error("복사 실패:", err);
            alert("복사에 실패했습니다.");
        }
    };

    const filteredIconList = useMemo(() => {
        if (!searchTerm.trim()) return iconList;

        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered: Record<string, string[]> = {};

        for (const [size, names] of Object.entries(iconList)) {
            const filteredNames = names.filter(name => name.toLowerCase().includes(lowercasedFilter));
            if (filteredNames.length > 0) {
                filtered[size] = filteredNames;
            }
        }
        return filtered;
    }, [searchTerm]);

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Icon</h2>
            </header>
            <div className="guide-content-body">
                <div className="guide-wrap">
                    <div className="guide-article">
                        <h3 className="guide-h3">Icon System</h3>
                        <p className="guide-desc">
                            프로젝트 전반에서 사용되는 아이콘 목록입니다. 일관된 UI를 위해 <code>&lt;Icon&gt;</code> 컴포넌트를 사용해주세요.
                        </p>
                        <div className="guide-info-box">
                            <Icon name="info" size={20} className="guide-info-box-icon" />
                            <div>
                                <strong className="guide-info-box-title">웹 접근성 가이드</strong>
                                <p className="guide-desc">
                                    <code>&lt;Icon&gt;</code> 컴포넌트는 스크린 리더가 읽지 않도록 내부적으로 <code>aria-hidden="true"</code> 속성을 자동으로 부여합니다.<br />
                                    (가이드의 아이콘 카드를 클릭하면 <code>&lt;Icon&gt;</code> 컴포넌트 사용법 코드가 자동 복사됩니다.)
                                </p>
                            </div>
                        </div>
                        <div className="guide-search-wrapper">
                            <input
                                type="text"
                                className="guide-search-input"
                                placeholder="아이콘명 검색... (ex: arrow)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {Object.keys(filteredIconList).length > 0 ? (
                        Object.entries(filteredIconList).map(([size, names]) => (
                            <article key={size} className="comp-article">
                                <h3 className="guide-h3 icon-guide-size-title">
                                    {size}px Icons
                                </h3>
                                <div className="comp-preview icon-grid">
                                    {names.map(iconName => (
                                        <IconItem
                                            key={`${iconName}-${size}`}
                                            name={iconName}
                                            size={Number(size) as IconSize}
                                            onCopy={handleCopy}
                                        />
                                    ))}
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="guide-article">
                            <p className="no-results-message">
                                "{searchTerm}"에 대한 검색 결과가 없습니다.
                            </p>
                        </div>
                    )}

                    <article className="comp-article">
                        <h3 className="guide-h3">Props</h3>
                        <p className="guide-desc">Icon 컴포넌트에서 사용할 수 있는 속성들입니다. 기본 HTML <code>&lt;i&gt;</code> 태그 속성을 모두 상속받습니다.</p>
                        <div className="guide-table-wrap mt-10">
                            <table className="guide-table props-table">
                                <colgroup>
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "50%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="guide-th" scope="col">Prop</th>
                                        <th className="guide-th" scope="col">Type</th>
                                        <th className="guide-th" scope="col">Default</th>
                                        <th className="guide-th" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="guide-td"><code>name</code></td>
                                        <td className="guide-td"><code>string</code></td>
                                        <td className="guide-td">- (필수)</td>
                                        <td className="guide-td">
                                            아이콘의 이름을 지정합니다. (예: "add", "arrow-down")<br />
                                            전체 아이콘 이름은 상단 목록을 참고하세요.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="guide-td"><code>size</code></td>
                                        <td className="guide-td"><code>number</code></td>
                                        <td className="guide-td"><code>18</code></td>
                                        <td className="guide-td">아이콘의 크기를 지정합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </div>

            <Toast message={toast.message} isVisible={toast.isVisible} />
        </>
    );
}