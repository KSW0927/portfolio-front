import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Input, Button } from "@/components";
import { AlertService } from "@/utils/AlertService";
import type { AuthUser } from "@/types/types";

const REMEMBER_LOGIN_ID_KEY = 'remember_login_id';

// 포트폴리오 방문자가 회원가입 없이 바로 둘러볼 수 있도록 준비해둔 게스트 전용 계정.
// 조회 위주 권한만 가지므로 프론트에 노출돼도 무방함 (백엔드 DemoUserSeeder가 기동 시 자동 생성).
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
 * @description
 */
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  // 자동 로그인 버튼만 쓰는 상태라 입력칸엔 게스트 계정 값을 고정으로 보여주고 수정은 막는다.
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

  // 실제 로그인 성공 이후 처리(토큰 저장, 인증 스토어 반영, 이동)는
  // 수동 로그인/게스트 자동 로그인이 동일하게 타므로 공통 함수로 분리.
  const applyLoginSuccess = (data: Awaited<ReturnType<typeof loginApi>>) => {
    if (data?.code !== 200 || !data.data) {
      return false;
    }

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

  // 게스트 체험: 버튼 클릭 시에만 동작하며, 로딩 얼럿을 띄운 채
  // 미리 준비된 데모 계정으로 자동 로그인한다.
  const handleGuestLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('auth-store');
    AlertService.loading('자동로그인중입니다');

    try {
      const data = await loginApi({
        id: GUEST_ID,
        password: GUEST_PASSWORD,
      });

      const success = applyLoginSuccess(data);
      if (!success) {
        // AlertService.error()가 로딩 팝업을 그대로 교체해서 보여준다.
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

          {/* <div className="login-options">
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
          </div> */}

          {/* <Button
              variant="solid"
              color="primary"
              fullWidth
              onClick={() => { if (!isLoading) { void loginCheck(); } }}
          >
            {isLoading ? "..." : text.login}
          </Button> */}

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
