import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  return { isAuthenticated, user, login, logout };
};