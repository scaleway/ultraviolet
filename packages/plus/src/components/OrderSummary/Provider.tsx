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
  currency: 'EUR',
  localeFormat: 'en-US',
  items: [{ category: '', subCategories: [] }],
  hideTimeUnit: false,
  timePeriodUnit: 'hours',
  timePeriodAmount: 1,
  locales: orderSummaryLocales,
  categoriesPrice: {},
})
