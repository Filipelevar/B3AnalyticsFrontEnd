import type {
  AuthenticateResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
} from '@/types/AuthTypes'

import { API } from '@/services/api'

const AUTH_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
} as const

export function login(body: LoginUserDTO) {
  return API.post<AuthenticateResponseDTO>(AUTH_ENDPOINTS.login, body)
}

export function register(body: RegisterUserDTO) {
  return API.post<AuthenticateResponseDTO>(AUTH_ENDPOINTS.register, body)
}