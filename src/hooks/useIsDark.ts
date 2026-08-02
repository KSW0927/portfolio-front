import { useState, useEffect } from "react";

export const useIsDark = () => {
    // 초기 로드 시 다크모드인지 확인
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.getAttribute("data-theme") === "dark";
        }
        return false;
    });

    useEffect(() => {
        // html 태그의 data-theme 속성이 변경될 때마다 감지하는 옵저버
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "data-theme") {
                    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect(); // 컴포넌트 언마운트 시 정리
    }, []);

    return isDark;
};