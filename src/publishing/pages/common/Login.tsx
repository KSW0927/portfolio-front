import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import i18n from "@/i18n";
import { Button, Checkbox, Input } from "@/publishing/components";

type Language = "ko" | "en";
type LooseObject = Record<string, unknown>;
const REMEMBER_LOGIN_ID_KEY = "remember_login_id";

const copy = {
    ko: {
        titleStrong: "KSS해운",
        title: "업무포탈시스템",
        idLabel: "아이디",
        idPlaceholder: "이메일을 입력해주세요.",
        passwordLabel: "비밀번호",
        passwordPlaceholder: "비밀번호를 입력해주세요.",
        rememberId: "아이디 저장",
        login: "로그인",
        error: "아이디 혹은 비밀번호를 확인해주세요.",
        firstToggleName: "한국어",
        lastToggleName: "English",
    },
    en: {
        titleStrong: "KSS LINE",
        title: "Portal system",
        idLabel: "ID",
        idPlaceholder: "Enter your Email.",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password.",
        rememberId: "Remember ID",
        login: "Login",
        error: "Please check your ID or password.",
        firstToggleName: "한국어",
        lastToggleName: "English",
    },
} as const;

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [rememberId, setRememberId] = useState(false);
    const [isValidation, setValidation] = useState(true);
    const [lang, setLang] = useState<Language>("ko");
    const [isLoading, setIsLoading] = useState(false);

    const text = copy[lang];

    const normalizeLanguage = (value: unknown, fallback: Language): Language => {
        const normalized = String(value || "").toLowerCase();
        if (normalized === "en") return "en";
        if (normalized === "ko") return "ko";
        return fallback;
    };

    const extractAccessToken = (payload: unknown): string => {
        if (!payload || typeof payload !== "object") return "";

        const data = payload as LooseObject;
        const nestedData = data.data as LooseObject | undefined;
        const nestedResult = data.result as LooseObject | undefined;

        return String(
            data.accessToken ||
            data.token ||
            data.jwt ||
            nestedData?.accessToken ||
            nestedData?.token ||
            nestedResult?.accessToken ||
            nestedResult?.token ||
            ""
        );
    };

    const asLooseObject = (value: unknown): LooseObject =>
        value && typeof value === "object" ? (value as LooseObject) : {};

    const extractUserData = (payload: unknown, fallbackLanguage: Language) => {
        const data = asLooseObject(payload);
        const result = asLooseObject(data.result);
        const resultUser = asLooseObject(result.user);
        const resultUserInfo = asLooseObject(result.userInfo);
        const innerData = asLooseObject(data.data);
        const innerDataUser = asLooseObject(innerData.user);
        const innerDataUserInfo = asLooseObject(innerData.userInfo);
        const user = asLooseObject(data.user);
        const userInfo = asLooseObject(data.userInfo);
        const source =
            Object.keys(resultUser).length > 0 ? resultUser :
                Object.keys(resultUserInfo).length > 0 ? resultUserInfo :
                    Object.keys(innerDataUser).length > 0 ? innerDataUser :
                        Object.keys(innerDataUserInfo).length > 0 ? innerDataUserInfo :
                            Object.keys(user).length > 0 ? user :
                                Object.keys(userInfo).length > 0 ? userInfo :
                                    Object.keys(result).length > 0 ? result :
                                        innerData;

        return {
            id: String(source.id || source.userId || source.loginId || loginId),
            name: String(source.name || source.userNm || source.username || source.empNm || loginId),
            emplyeeNo: "",
            telNo: "",
            mobile: "",
            email: String(source.email || source.emailAdres || ""),
            deptCd: "",
            jbpsCd: "",
            state: "",
            taskNm: "",
            userSe: String(source.userse || source.userSe || ""),
            language: normalizeLanguage(source.language || source.lang, fallbackLanguage),
        };
    };

    useEffect(() => {
        const savedLoginId = localStorage.getItem(REMEMBER_LOGIN_ID_KEY);
        if (!savedLoginId) return;

        setLoginId(savedLoginId);
        setRememberId(true);
    }, []);

    const loginCheck = async () => {
        if (!loginId.trim() || !password.trim()) {
            setValidation(false);
            return;
        }

        setIsLoading(true);
        setValidation(true);
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("auth-store");
        i18n.changeLanguage(lang);

        try {
            const data = await loginApi({
                id: loginId,
                password,
                language: lang,
                siteNo: "21",
            });

            if (String(data?.resultCode) !== "200") {
                setValidation(false);
                return;
            }

            const accessToken = extractAccessToken(data);
            if (accessToken) {
                sessionStorage.setItem("access_token", accessToken);
            }

            const userData = extractUserData(data, lang);
            login(userData);

            if (rememberId) {
                localStorage.setItem(REMEMBER_LOGIN_ID_KEY, loginId.trim());
            } else {
                localStorage.removeItem(REMEMBER_LOGIN_ID_KEY);
            }

            setValidation(true);
            navigate("/", { state: { serviceId: "1", lang } });
        } catch (err) {
            setValidation(false);
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isLoading) {
            e.preventDefault();
            void loginCheck();
        }
    };

    return (
        <div className="login-wrap">
            <div className="login-panel">
                <h1 className="login-title">
                    <span className="com-name">{text.titleStrong}</span> {text.title}
                </h1>

                <div className="login-form-group">
                    <Input
                        label={text.idLabel}
                        placeholder={text.idPlaceholder}
                        value={loginId}
                        onChange={(e) => {
                            setLoginId(e.target.value);
                            setValidation(true);
                        }}
                        leftIcon={<i className="ico ico-mail -x18" aria-hidden="true"></i>}
                        fullWidth
                    />

                    <Input
                        label={text.passwordLabel}
                        type="password"
                        placeholder={text.passwordPlaceholder}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setValidation(true);
                        }}
                        onKeyDown={handlePasswordKeyDown}
                        leftIcon={<i className="ico ico-lock -x18" aria-hidden="true"></i>}
                        fullWidth
                    />
                </div>

                <div className="login-options">
                    <Checkbox
                        label={text.rememberId}
                        checked={rememberId}
                        onChange={(e) => {
                            setRememberId(e.target.checked);
                            if (!e.target.checked) {
                                localStorage.removeItem(REMEMBER_LOGIN_ID_KEY);
                            }
                        }}
                    />

                    <div className="lang-toggle">
                        <button
                            type="button"
                            className={`lang-toggle-btn ${lang === "ko" ? "-active" : ""}`}
                            onClick={() => setLang("ko")}
                        >
                            {text.firstToggleName}
                        </button>
                        <button
                            type="button"
                            className={`lang-toggle-btn ${lang === "en" ? "-active" : ""}`}
                            onClick={() => setLang("en")}
                        >
                            {text.lastToggleName}
                        </button>
                    </div>
                </div>

                <Button
                    variant="solid"
                    color="primary"
                    fullWidth
                    onClick={() => { if (!isLoading) { void loginCheck(); } }}
                >
                    {isLoading ? "..." : text.login}
                </Button>

                {!isValidation && (
                    <p className="login-error-msg">{text.error}</p>
                )}
            </div>

            <div className="login-footer">KSS LINE LTD.</div>
        </div>
    );
}