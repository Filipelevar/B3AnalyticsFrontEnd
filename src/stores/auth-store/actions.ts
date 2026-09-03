import { login } from '@/services/auth.service'
import { clearAuthSession } from '@/services/auth-session'
import { AUTH_TOKEN_KEY } from '@/services/api'
import type { LoginUserDTO } from '@/types/AuthTypes'

import { useAuthStore } from '.'

export async function signIn(credentials: LoginUserDTO) {
  const { data } = await login(credentials)

  window.localStorage.setItem(AUTH_TOKEN_KEY, data.token)
  useAuthStore.getState().setUser(data.user)
}

export function logout() {
  clearAuthSession()
}
