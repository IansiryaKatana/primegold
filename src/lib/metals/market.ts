import type { MarketTicker } from '@/lib/types'

export function getMarketStatus(now = new Date()) {
  const day = now.getDay()
  const hour = now.getHours()
  const isWeekday = day >= 1 && day <= 5
  const isOpen = isWeekday && hour >= 9 && hour < 18

  return {
    marketStatus: isOpen ? ('open' as const) : ('closed' as const),
    marketHoursLabel: 'Mon - Fri 9:30 AM - 5:30 PM',
  }
}

export function buildMarketTicker(
  goldPrice: number,
  silverPrice: number,
  updatedAt: string,
  options?: {
    goldChangePct?: number | null
    silverChangePct?: number | null
    source?: MarketTicker['source']
  },
): MarketTicker {
  const { marketStatus, marketHoursLabel } = getMarketStatus()

  return {
    goldPrice,
    silverPrice,
    goldChangePct: options?.goldChangePct ?? null,
    silverChangePct: options?.silverChangePct ?? null,
    source: options?.source ?? 'fallback',
    marketStatus,
    marketHoursLabel,
    updatedAt,
  }
}
