import { createContext } from 'react'
import orderSummaryLocales from './locales/en'
import type { ItemsType, TimeUnit } from './types'

export type ContextProps = {
  currency: string
  localeFormat: string
  items: ItemsType[]
  categoriesPrice: Record<string, number>
  hideTimeUnit: boolean
  timePeriodUnit: TimeUnit
  timePeriodAmount: number
  locales: Record<keyof typeof orderSummaryLocales, string>
  fractionDigits?: number
}

export const OrderSummaryContext = createContext<ContextProps>({
  currency: 'EUR',
  localeFormat: 'en-US',
  items: [{ category: '', subCategories: [] }],
  categoriesPrice: {},
  hideTimeUnit: false,
  timePeriodUnit: 'hours',
  timePeriodAmount: 1,
  locales: orderSummaryLocales,
})
