import type {
  AssetHistoryRequestDTO,
  AssetHistoryResponseDTO,
} from '@/types/MarketTypes'

import { API } from '@/services/api'

const MARKET_ENDPOINTS = {
  history: '/assets/history',
} as const

export function getAssetHistory(params: AssetHistoryRequestDTO, options: { skipLoader?: boolean } = {}) {
  return API.get<AssetHistoryResponseDTO>(MARKET_ENDPOINTS.history, { params, skipLoader: options.skipLoader })
}