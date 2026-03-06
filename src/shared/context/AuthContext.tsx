import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { api, TOKEN_KEY, USER_KEY, setUnauthorizedHandler } from '@/lib/axios';
import { authApi, type AuthUser, type LoginPayload, type RegisterPayload } from '@/lib/api/auth.api';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  /** Toggle commuter ↔ driver role for demo/testing */
  toggleRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function persistUser(user: AuthUser, token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  delete api.defaults.headers.common.Authorization;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  // Restore token into axios defaults on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  // Tell the axios interceptor how to force-logout on 401 exhaustion
  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession();
      setUser(null);
    });
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const { user: u, accessToken } = await authApi.login(payload);
      persistUser(u, accessToken);
      setUser(u);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<AuthUser> => {
    setIsLoading(true);
    try {
      const { user: u, accessToken } = await authApi.register(payload);
      persistUser(u, accessToken);
      setUser(u);
      return u;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      clearSession();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const toggleRole = useCallback(() => {
    setUser((prev) => {
      if (!prev) return null;
      const nextRole = prev.role === 'commuter' ? 'driver' : 'commuter';
      const updated = { ...prev, role: nextRole } as AuthUser;
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, toggleRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
