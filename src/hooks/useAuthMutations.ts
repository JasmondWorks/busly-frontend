import { useMutation } from '@tanstack/react-query';
import { authApi, type LoginPayload, type RegisterPayload } from '@/lib/api/auth.api';

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authApi.logout(),
  });
}
