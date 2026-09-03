import type { HealthResponseDTO } from '@/types/HealthTypes'

import { API } from '@/services/api'

export function getHealth() {
  return API.get<HealthResponseDTO>('/health')
}