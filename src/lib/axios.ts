import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

export const TOKEN_KEY = 'busly_token';
export const USER_KEY = 'busly_user';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

// ─── Unauthorized handler (set by AuthContext) ─────────────────────────────
let unauthorizedHandler: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: () => void) => {
  unauthorizedHandler = fn;
};

// ─── Axios instance ───────────────────────────────────────────────────────
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // sends httpOnly refresh-token cookie
  timeout: 15_000,
});

// ─── Token refresh queue (prevents stampede on 401) ───────────────────────
let isRefreshing = false;
let refreshQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const drainQueue = (error: unknown, token?: string) => {
  refreshQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  refreshQueue = [];
};

/** Calls /auth/refresh with the httpOnly cookie — uses plain axios to avoid interceptor loops */
const doTokenRefresh = async (): Promise<string> => {
  const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
  // Backend wraps: { success, message, data: { accessToken } }
  return res.data?.data?.accessToken ?? res.data?.accessToken ?? '';
};

// ─── Request interceptor ──────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (import.meta.env.DEV) {
    console.debug(`[API →] ${config.method?.toUpperCase()} ${config.url}`, config.params ?? '');
  }
  return config;
});

// ─── Response interceptor ─────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    // Unwrap Busly ApiResponse envelope: { success, message, data } → data
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      response.data = response.data.data;
    }

    if (import.meta.env.DEV) {
      console.debug(
        `[API ✓] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.status,
      );
    }
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (import.meta.env.DEV) {
      console.error(
        `[API ✗] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`,
        error.response?.status,
        error.message,
      );
    }

    // ── 401 → try silent token refresh, then replay ───────────────────────
    if (error.response?.status === 401 && !originalRequest?._retry) {
      // If a refresh is already in-flight, queue this request
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) =>
          refreshQueue.push({ resolve, reject }),
        ).then((token) => {
          if (originalRequest?.headers) originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest!);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await doTokenRefresh();
        localStorage.setItem(TOKEN_KEY, newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        drainQueue(null, newToken);
        if (originalRequest?.headers) originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest!);
      } catch (refreshError) {
        drainQueue(refreshError);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        unauthorizedHandler?.();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
