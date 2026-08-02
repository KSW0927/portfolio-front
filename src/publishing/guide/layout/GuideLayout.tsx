import { Outlet } from "react-router-dom";

import GuideHeader from "./GuideHeader";
import GuideSidebar from "./GuideSidebar";
import "../assets/css/guide.css";

export default function GuideLayout() {
    return (
        <div className="publishing-guide-root">
            <GuideHeader />
            <div className="layout-container">
                <GuideSidebar />
                <main className="main-content">
                    <section className="content-view active">
                        <Outlet />
                    </section>
                </main>
            </div>
        </div>
    );
}