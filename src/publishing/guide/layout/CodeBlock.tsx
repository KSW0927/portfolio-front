import { useState } from "react";

interface CodeBlockProps {
    code: string;
    isComponent?: boolean;
}

export default function CodeBlock({ code, isComponent = false }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert("복사를 지원하지 않는 환경입니다.");
        }
    };

    if (isComponent) {
        return (
            <div className="comp-code-wrap">
                <button
                    type="button"
                    className={`comp-copy-btn ${copied ? "copied" : ""}`}
                    onClick={handleCopy}
                    title="코드 복사"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
                <pre><code>{code}</code></pre>
            </div>
        );
    }

    return (
        <div className="code-block">
            <pre><code>{code}</code></pre>
        </div>
    );
}