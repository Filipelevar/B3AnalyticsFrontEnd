export type AssetHistoryRange = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y'

export type AssetHistoryRequestDTO =
  | { symbols: string; range: AssetHistoryRange; startDate?: never; endDate?: never }
  | { symbols: string; range?: never; startDate: string; endDate: string }

export interface AssetHistoryRowDTO {
  date: string
  [symbol: string]: string | number
}

export interface AssetSymbolMetaDTO {
  name?: string
  currency?: string
}

export interface AssetHistoryResponseDTO {
  data: AssetHistoryRowDTO[]
  meta?: Record<string, AssetSymbolMetaDTO>
}
