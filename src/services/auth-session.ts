import { AUTH_TOKEN_KEY } from '@/services/api'
import { useAuthStore } from '@/stores/auth-store'

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  useAuthStore.getState().reset()
}
