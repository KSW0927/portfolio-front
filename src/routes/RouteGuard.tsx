import { useEffect, useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { usePermissionStore } from "@/store/permissionStore.ts";
//import { authApi } from "@/api/auth.ts";

export function RouteGuard() {
    const location = useLocation();
    const accessToken = sessionStorage.getItem("access_token");
    const { permissions, setPermission } = usePermissionStore();
    const [ isLoadding, setIsLoading ] = useState(true);
    const [ hasAccess, setHasAccess ] = useState(true);

    // 1. 인증 체크(토큰 없으면 즉시 로그인 페이지로)
    if(!accessToken) return <Navigate to="/login" replace />;

    useEffect(() => {
        const checkPermission = async () => {
            const currentPath = location.pathname;

            // 2. Zustand 캐시 확인(성능 최적화를 위해 이미 있으면 API 호출 생략)
            if(permissions[currentPath]) {
                setHasAccess(true); // 실제 서비스 로직에 따라 권한 값 검증 가능
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                // 3. 백엔드 API 호출(현재 메뉴 권한 정보 가져오기)
                const menuAuths = true;//await authApi.getListPageAuth();

                if(menuAuths) {
                    setPermission(currentPath, menuAuths);
                    setHasAccess(true);
                } else {
                    setHasAccess(false);
                }
            } catch (e) {
                setHasAccess(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkPermission();
    }, [location.pathname, permissions, setPermission]);

    if(isLoadding) return <div>권한 확인 중...</div>;
    if(!hasAccess) return <Navigate to="/unauthorized" replace />;

    // 4. 하위 컴포넌트(pageRoutes)에 권한 정보를 주입하며 랜더링
    return <Outlet context={{ permission: permissions[location.pathname]}} />;
}
