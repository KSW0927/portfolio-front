import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { worklistData } from "../pages/worklist/worklistData";

export default function GuideHeader() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const location = useLocation();
    const navigate = useNavigate();

    const firstCategory = Object.keys(worklistData)[0];

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const getActiveClass = (path: string) => {
        return location.pathname.includes(path) ? "guide-gnb-item active" : "guide-gnb-item";
    };

    return (
        <header className="header">
            <div className="logo">Publishing Guide</div>
            <nav className="guide-gnb">
                <ul className="guide-gnb-list">
                    <li
                        className={getActiveClass("/convention")}
                        onClick={() => navigate("/publishing-guide/convention/html")}
                    >
                        Convention
                    </li>
                    <li
                        className={getActiveClass("/worklist")}
                        onClick={() => firstCategory && navigate(`/publishing-guide/worklist/${firstCategory}`)}
                    >
                        Worklist
                    </li>
                    <li
                        className={getActiveClass("/components")}
                        onClick={() => navigate("/publishing-guide/components/overview")}
                    >
                        Components
                    </li>
                </ul>
            </nav>
            <div className="header-utils">
                <button onClick={toggleTheme} className="dark-mode-toggle" title="다크/라이트 모드 전환">
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>
            </div>
        </header>
    );
}