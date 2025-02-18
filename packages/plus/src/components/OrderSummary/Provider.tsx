import { createContext } from 'react'
import EstimateCostLocales from './locales/en'
import type { ItemsType, TimeUnit } from './types'

export type ContextProps = {
  currency: string
  locale: string
  items: ItemsType[]
  categoriesPrice: Record<string, number>
  hideTimeUnit: boolean
  timePeriodUnit: TimeUnit
  timePeriodAmount: number
  locales: Record<keyof typeof EstimateCostLocales, string>
}

export const OrderSummaryContext = createContext<ContextProps>({
  currency: 'EUR',
  locale: 'en-US',
  items: [{ category: '', subCategories: [] }],
  categoriesPrice: {},
  hideTimeUnit: false,
  timePeriodUnit: 'hours',
  timePeriodAmount: 1,
  locales: EstimateCostLocales,
})
