import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Input, Button } from "@/components";
import { AlertService } from "@/utils/AlertService";
import type { AuthUser } from "@/types/types";

const REMEMBER_LOGIN_ID_KEY = 'remember_login_id';

const GUEST_ID = 'Guest';
const GUEST_PASSWORD = 'guest1234!';

const text = {
  titleStrong: "NOTI-FLOW",
  title: "",
  idLabel: "아이디",
  idPlaceholder: "이메일을 입력해주세요.",
  passwordLabel: "비밀번호",
  passwordPlaceholder: "비밀번호를 입력해주세요.",
  rememberId: "아이디 저장",
  login: "로그인",
  guestLogin: "자동 로그인",
  error: "아이디 혹은 비밀번호를 확인해주세요.",
  guestError: "게스트 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.",
};

/**
 * 로그인 페이지
 */
export default function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [loginId, setLoginId] = useState(GUEST_ID);
  const [password, setPassword] = useState(GUEST_PASSWORD);
  const [rememberId, setRememberId] = useState(false);
  const [isValidation, setValidation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLoginId = localStorage.getItem(REMEMBER_LOGIN_ID_KEY);
    if (!savedLoginId) return;

    setRememberId(true);
  }, []);

  const applyLoginSuccess = (data: Awaited<ReturnType<typeof loginApi>>) => {
    if (data?.code !== 200 || !data.data) {
      return false;
    }

    const { userNo, username, accessToken } = data.data;
    if (accessToken) {
      sessionStorage.setItem('access_token', accessToken);
    }

    const userData: AuthUser = {
      id: String(userNo),
      name: username,
      userSe: 'Guest',
      language: 'ko',
    };
    login(userData);
    navigate('/', { state: { serviceId: '1' } });
    return true;
  };

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

      const success = applyLoginSuccess(data);
      if (!success) {
        setValidation(false);
        return;
      }

      if (rememberId) {
        localStorage.setItem(REMEMBER_LOGIN_ID_KEY, loginId.trim());
      } else {
        localStorage.removeItem(REMEMBER_LOGIN_ID_KEY);
      }

      setValidation(true);
    } catch (err) {
      setValidation(false);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('auth-store');
    AlertService.loading('자동로그인중입니다');

    try {
      const data = await loginApi(
        { id: GUEST_ID, password: GUEST_PASSWORD },
        { showLoading: false },
      );

      const success = applyLoginSuccess(data);
      if (!success) {
        await AlertService.error(text.guestError);
      }
    } catch (err) {
      console.error('Guest login error:', err);
      await AlertService.error(text.guestError);
    } finally {
      AlertService.close();
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
                disabled
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
                disabled
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidation(true);
                }}
                onKeyDown={handlePasswordKeyDown}
                leftIcon={<i className="ico ico-lock -x18" aria-hidden="true"></i>}
                fullWidth
            />
          </div>

          <Button
              variant="solid"
              color="primary"
              fullWidth
              onClick={() => { void handleGuestLogin(); }}
          >
            {text.guestLogin}
          </Button>

          {!isValidation && (
              <p className="login-error-msg">{text.error}</p>
          )}
        </div>

        <div className="login-footer">NOTI-FLOW</div>
      </div>
  );
};
