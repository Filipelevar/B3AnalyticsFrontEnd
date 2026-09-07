import axios from 'axios'

import { useLoadingStore } from '@/stores/loading-store'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipLoader?: boolean
  }
}

export const AUTH_TOKEN_KEY = 'b3analytics.auth.token'

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3333',
  timeout: 15_000,
})

API.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (!config.skipLoader) {
    useLoadingStore.getState().start()
  }

  return config
})

API.interceptors.response.use(
  (response) => {
    if (!response.config.skipLoader) {
      useLoadingStore.getState().finish()
    }
    return response
  },
  (error) => {
    if (!error.config?.skipLoader) {
      useLoadingStore.getState().finish()
    }
    return Promise.reject(error)
  },
)
