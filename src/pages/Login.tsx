import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Input, Checkbox, Button } from "@/components";
import type { AuthUser } from "@/types/types";

const REMEMBER_LOGIN_ID_KEY = 'remember_login_id';

const text = {
  titleStrong: "NOTI-FLOW",
  title: "",
  idLabel: "아이디",
  idPlaceholder: "이메일을 입력해주세요.",
  passwordLabel: "비밀번호",
  passwordPlaceholder: "비밀번호를 입력해주세요.",
  rememberId: "아이디 저장",
  login: "로그인",
  error: "아이디 혹은 비밀번호를 확인해주세요.",
};

/**
 * 로그인 페이지
 * @description
 */
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [isValidation, setValidation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('auth-store');

    try {
      // 로그인 요청
      const data = await loginApi({
        id: loginId,
        password,
      });

      // 로그인 오류 시 (정상 응답은 항상 code 200, 그 외는 apiClient가 에러로 던짐)
      if (data?.code !== 200 || !data.data) {
        setValidation(false);
        return;
      }

      // 접근 토큰 저장
      const { userNo, username, accessToken } = data.data;
      if (accessToken) {
        sessionStorage.setItem('access_token', accessToken);
      }

      // TODO: user-auth-service는 아직 emplyeeNo/deptCd 등 조직 정보를 내려주지 않음.
      // 백엔드 유저 모델이 확장되기 전까진 나머지 필드는 빈 값으로 채움.
      const userData: AuthUser = {
        id: String(userNo),
        name: username,
        emplyeeNo: '',
        telNo: '',
        mobile: '',
        email: '',
        deptCd: '',
        jbpsCd: '',
        state: '',
        taskNm: '',
        userSe: 'MNG',
        language: 'ko',
      };
      login(userData);

      if (rememberId) {
        localStorage.setItem(REMEMBER_LOGIN_ID_KEY, loginId.trim());
      } else {
        localStorage.removeItem(REMEMBER_LOGIN_ID_KEY);
      }

      setValidation(true);
      navigate('/', { state: { serviceId: '1' } });
    } catch (err) {
      setValidation(false);
      console.error('Login error:', err);
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

        <div className="login-footer">NOTI-FLOW</div>
      </div>
  );
};
