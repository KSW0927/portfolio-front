import { useState } from "react";

const Toast = ({ message, isVisible }: { message: string; isVisible: boolean }) => {
    return (
        <div className={`guide-toast ${isVisible ? "visible" : ""}`}>
            <span className="guide-toast-icon">✨</span>
            {message}
        </div>
    );
};

const ColorSwatch = ({ name, hex, onCopy }: { name: string; hex: string; onCopy: (hex: string) => void }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(hex);
            onCopy(hex);
        } catch (err) {
            console.error("클립보드 복사 실패:", err);
            alert("복사에 실패했습니다.");
        }
    };

    return (
        <div
            className="color-swatch-wrap"
            onClick={handleCopy}
            title={`${hex} 클릭하여 복사`}
        >
            <div
                className="color-swatch-circle"
                style={{ backgroundColor: `var(${name})` }}
            />
            <div className="color-swatch-info">
                <div className="color-swatch-name">{name}</div>
                <div className="color-swatch-hex">{hex}</div>
            </div>
        </div>
    );
};

export default function ColorGuide() {
    const [toast, setToast] = useState({ isVisible: false, message: "" });

    const showToast = (hex: string) => {
        setToast({ isVisible: true, message: `"${hex}" 색상이 복사되었습니다.` });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 2500);
    };
    const primitiveColors = [
        {
            title: "Base & Gray Scale",
            colors: [
                { name: "--color-base-white", hex: "#FFF" },
                { name: "--color-base-black", hex: "#000" },
                { name: "--color-gray-01", hex: "#FCFCFC" },
                { name: "--color-gray-02", hex: "#F4F4F4" },
                { name: "--color-gray-03", hex: "#EEE" },
                { name: "--color-gray-04", hex: "#DDD" },
                { name: "--color-gray-05", hex: "#CCC" },
                { name: "--color-gray-06", hex: "#BBB" },
                { name: "--color-gray-07", hex: "#949494" },
                { name: "--color-gray-08", hex: "#777" },
                { name: "--color-gray-09", hex: "#666" },
                { name: "--color-gray-10", hex: "#555" },
                { name: "--color-gray-11", hex: "#333" },
                { name: "--color-gray-12", hex: "#111" },
            ],
        },
        {
            title: "Neutral",
            colors: [
                { name: "--color-coolgray-01", hex: "#F1F3F8" },
                { name: "--color-coolgray-02", hex: "#A2A2A2" },
                { name: "--color-coolgray-03", hex: "#999" },
                { name: "--color-coolgray-04", hex: "#6D7882" },
                { name: "--color-coolgray-05", hex: "#55585C" },
            ],
        },
        {
            title: "Blue Scale",
            colors: [
                { name: "--color-blue-01", hex: "#F3F9FF" },
                { name: "--color-blue-02", hex: "#EFF8FF" },
                { name: "--color-blue-03", hex: "#E0F0FF" },
                { name: "--color-blue-04", hex: "#D5EBFF" },
                { name: "--color-blue-05", hex: "#C6D9F8" },
                { name: "--color-blue-06", hex: "#1D59F0" },
                { name: "--color-blue-07", hex: "#005BAA" },
                { name: "--color-blue-08", hex: "#004A8C" },
                { name: "--color-blue-09", hex: "#004586" },
                { name: "--color-blue-10", hex: "#003261" },
            ],
        },
        {
            title: "Red Scale",
            colors: [
                { name: "--color-red-01", hex: "#FFF0F0" },
                { name: "--color-red-02", hex: "#FFEAEA" },
                { name: "--color-red-03", hex: "#E68181" },
                { name: "--color-red-04", hex: "#E32020" },
                { name: "--color-red-05", hex: "#D31616" },
            ],
        },
        {
            title: "Green Scale",
            colors: [
                { name: "--color-green-01", hex: "#E2FFE3" },
                { name: "--color-green-02", hex: "#18C41D" },
                { name: "--color-green-03", hex: "#1A9835" },
                { name: "--color-green-04", hex: "#228738" },
                { name: "--color-green-05", hex: "#267337" },
                { name: "--color-green-06", hex: "#0B7F44" },
                { name: "--color-green-07", hex: "#067609" },
                { name: "--color-green-08", hex: "#006230" },
            ],
        },
        {
            title: "Purple Scale",
            colors: [
                { name: "--color-purple-01", hex: "#F8F5FD" },
                { name: "--color-purple-02", hex: "#EDE3FF" },
                { name: "--color-purple-03", hex: "#773ED9" },
                { name: "--color-purple-04", hex: "#5626AA" },
            ],
        },
        {
            title: "Cyan / Teal Scale",
            colors: [
                { name: "--color-cyan-01", hex: "#E3FCFF" },
                { name: "--color-cyan-02", hex: "#78F6FF" },
                { name: "--color-cyan-03", hex: "#1ABFD2" },
                { name: "--color-cyan-04", hex: "#0E7581" },
            ],
        },
        {
            title: "Orange & Yellow Scale",
            colors: [
                { name: "--color-yellow-01", hex: "#FFCE0A" },
                { name: "--color-orange-01", hex: "#FFF1E4" },
                { name: "--color-orange-02", hex: "#FF861C" },
                { name: "--color-orange-03", hex: "#B25300" },
            ],
        },
    ];

    const semanticColors = [
        {
            title: "Text",
            colors: [
                { name: "--color-text-base", hex: "#333" },
                { name: "--color-text-primary", hex: "#005BAA" },
                { name: "--color-text-secondary", hex: "#666" },
                { name: "--color-text-tertiary", hex: "#999" },
                { name: "--color-text-disabled", hex: "#A2A2A2" },
                { name: "--color-text-link", hex: "#004586" },
                { name: "--color-text-white", hex: "#FFF" },
            ]
        },
        {
            title: "Background",
            colors: [
                { name: "--color-bg-white", hex: "#FFF" },
                { name: "--color-bg-box", hex: "#F1F3F8" },
                { name: "--color-bg-card", hex: "#FFF" },
                { name: "--color-bg-search", hex: "#F4F4F4" },
                { name: "--color-bg-widget", hex: "#C6D9F8" },
                { name: "--color-bg-table-header", hex: "#F0F5F9" },
            ]
        },
        {
            title: "Border",
            colors: [
                { name: "--color-border-base", hex: "#CCC" },
                { name: "--color-border-strong", hex: "#666" },
                { name: "--color-border-focus", hex: "#005BAA" },
                { name: "--color-border-divider", hex: "#DDD" },
            ]
        },
    ];

    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">Color</h2>
            </header>

            <div className="guide-content-body">
                <div className="guide-wrap">
                    <div className="guide-article">
                        <h3 className="guide-h3">Color System</h3>
                        <p className="guide-desc">
                            프로젝트에서 사용되는 색상 토큰 시스템입니다. 일관된 UI를 위해 아래에 정의된 색상 변수를 사용해주세요.<br />
                            색상 토큰은 Primitive 토큰과 Semantic 토큰으로 나뉩니다.
                        </p>
                    </div>

                    <article className="comp-article">
                        <h3 className="guide-h3">Primitive Colors</h3>
                        <p className="guide-desc">가장 기본적인 색상 팔레트입니다. 직접 사용하기보다는 시맨틱 토큰을 통해 사용하는 것을 권장합니다.</p>

                        {primitiveColors.map((category) => (
                            <section key={category.title} className="color-category">
                                <h4 className="color-category-title">{category.title}</h4>
                                <div className="comp-preview color-grid">
                                    {category.colors.map((color) => (
                                        <ColorSwatch
                                            key={color.name}
                                            name={color.name}
                                            hex={color.hex}
                                            onCopy={showToast}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </article>

                    <article className="comp-article">
                        <h3 className="guide-h3">Semantic Colors</h3>
                        <p className="guide-desc">컴포넌트의 특정 역할이나 상태에 따라 의미를 부여한 색상 토큰입니다. 실제 UI 개발 시 이 토큰들을 사용해야 합니다.</p>

                        {semanticColors.map((category) => (
                            <section key={category.title} className="color-category">
                                <h4 className="color-category-title">{category.title}</h4>
                                <div className="comp-preview color-grid">
                                    {category.colors.map((color) => (
                                        <ColorSwatch
                                            key={color.name}
                                            name={color.name}
                                            hex={color.hex}
                                            onCopy={showToast}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </article>
                </div>
            </div>

            <Toast message={toast.message} isVisible={toast.isVisible} />
        </>
    );
}