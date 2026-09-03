const INTRADAY_PATTERN = / \d{2}:\d{2}$/

export function isIntradayRow(dateValue: string): boolean {
  return INTRADAY_PATTERN.test(dateValue)
}

export function parseRowDateTime(dateValue: string): Date {
  if (isIntradayRow(dateValue)) {
    return new Date(dateValue.replace(' ', 'T') + ':00')
  }
  return new Date(`${dateValue}T00:00:00`)
}

export function formatXAxisTick(dateValue: string): string {
  if (isIntradayRow(dateValue)) {
    return dateValue.slice(-5)
  }

  const [, month, day] = dateValue.split('-')
  return `${day}/${month}`
}

export function formatSessionDate(dateValue: string): string {
  const [year, month, day] = dateValue.slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}

export function formatYAxisTick(value: number): string {
  return value.toFixed(2).replace('.', ',')
}

function niceNumber(range: number, round: boolean): number {
  const exponent = Math.floor(Math.log10(range))
  const fraction = range / 10 ** exponent

  let niceFraction: number
  if (round) {
    if (fraction < 1.5) niceFraction = 1
    else if (fraction < 3) niceFraction = 2
    else if (fraction < 7) niceFraction = 5
    else niceFraction = 10
  } else {
    if (fraction <= 1) niceFraction = 1
    else if (fraction <= 2) niceFraction = 2
    else if (fraction <= 5) niceFraction = 5
    else niceFraction = 10
  }

  return niceFraction * 10 ** exponent
}

export function buildNiceYAxis(values: number[], tickCount = 8): { domain: [number, number]; ticks: number[] } {
  if (values.length === 0) {
    return { domain: [0, 1], ticks: [0, 1] }
  }

  const min = Math.min(...values)
  const max = Math.max(...values)

  if (min === max) {
    const padding = min === 0 ? 1 : Math.abs(min) * 0.05
    return { domain: [min - padding, max + padding], ticks: [min - padding, min, max + padding] }
  }

  const range = niceNumber(max - min, false)
  const step = niceNumber(range / (tickCount - 1), true)
  const niceMin = Math.floor(min / step) * step
  const niceMax = Math.ceil(max / step) * step

  const ticks: number[] = []
  for (let tick = niceMin; tick <= niceMax + step / 2; tick += step) {
    ticks.push(Number(tick.toFixed(2)))
  }

  return { domain: [niceMin, niceMax], ticks }
}
