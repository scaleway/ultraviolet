import { createContext } from 'react'
import orderSummaryLocales from './locales/en'
import type {
  CurrencyType,
  ItemsType,
  LocalesFormatType,
  PriceType,
  TimeUnit,
} from './types'

export type ContextProps = {
  currency: CurrencyType
  localeFormat: LocalesFormatType
  items: ItemsType[]
  categoriesPrice: PriceType
  hideTimeUnit: boolean
  timePeriodUnit: TimeUnit
  timePeriodAmount: number
  locales: Record<keyof typeof orderSummaryLocales, string>
  fractionDigits?: number
}

export const OrderSummaryContext = createContext<ContextProps>({
  categoriesPrice: {},
  currency: 'EUR',
  hideTimeUnit: false,
  items: [{ category: '', subCategories: [] }],
  localeFormat: 'en-US',
  locales: orderSummaryLocales,
  timePeriodAmount: 1,
  timePeriodUnit: 'hours',
})
