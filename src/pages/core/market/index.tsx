import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { Column, Container, Row } from '@/globals/grid'
import { PrimaryButton } from '@/globals/buttons'
import { theme } from '@/globals/theme'
import { Input } from '@/components/inputs/input'
import { useAuth } from '@/hooks/useAuth'
import { getAssetHistory } from '@/services/market.service'
import type { AssetHistoryRange, AssetHistoryRequestDTO, AssetHistoryRowDTO, AssetSymbolMetaDTO } from '@/types/MarketTypes'

import { ActionButtons, AssetTitle, ChartWrapper, CustomPeriodForm, FieldGroup, Form, RangeButton, RangeButtons, SearchButton, SessionDate, StatusText } from '@/pages/core/market/styles'
import { buildNiceYAxis, formatSessionDate, formatXAxisTick, formatYAxisTick, isIntradayRow, parseRowDateTime } from '@/pages/core/market/utils'
import { Title } from '@/globals/text'
import { ReactSelect } from '@/components/inputs/react-select'
import type { SelectOption } from '@/components/inputs/react-select'

const POLL_INTERVAL_MS = 5 * 60_000

const ASSET_OPTIONS: SelectOption[] = [
    { label: 'PETR4', value: 'PETR4' },
    { label: 'VALE3', value: 'VALE3' },
]

const RANGE_OPTIONS: { id: AssetHistoryRange; label: string }[] = [
    { id: '1D', label: '1D' },
    { id: '5D', label: '5D' },
    { id: '1M', label: '1M' },
    { id: '3M', label: '3M' },
    { id: '6M', label: '6M' },
    { id: '1Y', label: '1A' },
]

const LINE_COLORS = [
    theme.colors.yinBlue,
    theme.colors.fireBrick,
    theme.colors.darthmouthGreen,
    theme.colors.ultraViolet,
    theme.colors.davysGrey,
]

export function Market() {
    const { control, handleSubmit } = useForm<{ assets: SelectOption[] }>()
    const { register: registerCustomPeriod, handleSubmit: handleCustomPeriodSubmit } = useForm<{ startDate: string; endDate: string }>()
    const { isAuthenticated } = useAuth()

    const [symbols, setSymbols] = useState<string | null>(null)
    const [period, setPeriod] = useState<{ type: 'range'; id: AssetHistoryRange } | { type: 'custom'; startDate: string; endDate: string }>({ type: 'range', id: '1D' })
    const [data, setData] = useState<AssetHistoryRowDTO[]>([])
    const [meta, setMeta] = useState<Record<string, AssetSymbolMetaDTO>>({})
    const [isSearching, setIsSearching] = useState(false)
    const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)

    const activeRequest = useMemo<AssetHistoryRequestDTO | null>(() => {
        if (!symbols) return null
        if (period.type === 'range') return { symbols, range: period.id }
        return { symbols, startDate: period.startDate, endDate: period.endDate }
    }, [symbols, period])

    const activeRequestRef = useRef(activeRequest)
    useEffect(() => {
        activeRequestRef.current = activeRequest
    }, [activeRequest])

    const requestIdRef = useRef(0)

    const fetchHistory = useCallback(async (params: AssetHistoryRequestDTO, options: { background?: boolean } = {}) => {
        const requestId = ++requestIdRef.current

        try {
            if (!options.background) {
                setIsSearching(true)
                setData([])
                setMeta({})
            }

            const { data: response } = await getAssetHistory(params, { skipLoader: options.background })

            if (requestId !== requestIdRef.current) return

            setData(response.data)
            setMeta(response.meta ?? {})
            setLastUpdatedAt(new Date())
        } catch {
            if (requestId !== requestIdRef.current) return
        } finally {
            if (!options.background) setIsSearching(false)
        }
    }, [])

    function search({ assets }: { assets: SelectOption[] }) {
        setPeriod({ type: 'range', id: '1D' })
        setSymbols(assets.map((asset) => asset.value).join(','))
    }

    function applyCustomPeriod({ startDate, endDate }: { startDate: string; endDate: string }) {
        setPeriod({ type: 'custom', startDate, endDate })
    }

    function buyAsset(symbol: string) {
        toast.success(`Compra simulada de ${symbol} registrada.`, { id: `buy-${symbol}` })
    }

    useEffect(() => {
        if (!activeRequest) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchHistory(activeRequest)

        const isLiveRange = period.type === 'range' && period.id === '1D'
        if (!isLiveRange) return

        const intervalId = window.setInterval(() => {
            if (activeRequestRef.current) fetchHistory(activeRequestRef.current, { background: true })
        }, POLL_INTERVAL_MS)

        return () => window.clearInterval(intervalId)
    }, [activeRequest, period, fetchHistory])

    const visibleData = useMemo(() => {
        const now = new Date()
        return data.filter((row) => parseRowDateTime(row.date) <= now)
    }, [data])

    const assetKeys = useMemo(() => {
        const keys = new Set<string>()
        for (const row of visibleData) {
            for (const key of Object.keys(row)) {
                if (key !== 'date') keys.add(key)
            }
        }
        return [...keys]
    }, [visibleData])

    const isIntraday = visibleData.length > 0 && isIntradayRow(visibleData[0].date)

    const yAxis = useMemo(() => {
        const values: number[] = []
        for (const row of visibleData) {
            for (const key of assetKeys) {
                const value = row[key]
                if (typeof value === 'number') values.push(value)
            }
        }
        return buildNiceYAxis(values)
    }, [visibleData, assetKeys])



    return (
        <Container>
            <Row>
                <Column>
                    <Title>Consulta de ativos B3</Title>

                    <Form onSubmit={handleSubmit(search)}>
                        <FieldGroup>
                            <ReactSelect
                                control={control}
                                name="assets"
                                options={ASSET_OPTIONS}
                                isMulti
                                isRequired
                                placeholder="Selecione os ativos"
                                isSearchable={true}
                            />
                            <SearchButton type="submit" disabled={isSearching}>
                                Buscar
                            </SearchButton>
                        </FieldGroup>
                    </Form>

                    {lastUpdatedAt && (
                        <StatusText>
                            Última atualização: {lastUpdatedAt.toLocaleTimeString('pt-BR')}
                        </StatusText>
                    )}

                    {visibleData.length > 0 && (
                        <>
                            {assetKeys.map((symbol) => (
                                <AssetTitle key={symbol}>
                                    {symbol}{meta[symbol]?.name ? ` - ${meta[symbol]?.name}` : ''}
                                </AssetTitle>
                            ))}

                            {isIntraday && (
                                <SessionDate>Pregão de {formatSessionDate(visibleData[0].date)}</SessionDate>
                            )}

                            <ChartWrapper>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={visibleData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tickFormatter={formatXAxisTick} />
                                        <YAxis domain={yAxis.domain} ticks={yAxis.ticks} tickFormatter={formatYAxisTick} />
                                        <Tooltip
                                            labelFormatter={(label) => formatXAxisTick(String(label))}
                                            formatter={(value) => formatYAxisTick(Number(value))}
                                        />
                                        <Legend />
                                        {assetKeys.map((symbol, index) => (
                                            <Line
                                                key={symbol}
                                                type="monotone"
                                                dataKey={symbol}
                                                name={symbol}
                                                stroke={LINE_COLORS[index % LINE_COLORS.length]}
                                                dot={false}
                                            />
                                        ))}
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartWrapper>

                            <RangeButtons>
                                {RANGE_OPTIONS.map((option) => (
                                    <RangeButton
                                        key={option.id}
                                        type="button"
                                        $active={period.type === 'range' && option.id === period.id}
                                        onClick={() => setPeriod({ type: 'range', id: option.id })}
                                    >
                                        {option.label}
                                    </RangeButton>
                                ))}

                                <CustomPeriodForm onSubmit={handleCustomPeriodSubmit(applyCustomPeriod)}>
                                    <Input name="startDate" type="date" isRequired register={registerCustomPeriod} />
                                    <span>até</span>
                                    <Input name="endDate" type="date" isRequired register={registerCustomPeriod} />
                                    <RangeButton type="submit" $active={period.type === 'custom'}>
                                        Aplicar
                                    </RangeButton>
                                </CustomPeriodForm>
                            </RangeButtons>

                            {isAuthenticated && (
                                <ActionButtons>
                                    {assetKeys.map((symbol) => (
                                        <PrimaryButton key={symbol} type="button" onClick={() => buyAsset(symbol)}>
                                            Comprar {symbol}
                                        </PrimaryButton>
                                    ))}
                                </ActionButtons>
                            )}
                        </>
                    )}
                </Column>
            </Row>
        </Container>
    )
}
