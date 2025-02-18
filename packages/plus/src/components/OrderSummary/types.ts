import type { UnitInput } from '@ultraviolet/ui'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'
import type EstimateCostLocales from './locales/en'

export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'months'
type PeriodProps =
  | {
      /**
       * Optional time input allowing the user to estimate their cost on different time horizon.
       * Pass the options to be displayed in the dropdown.
       */
      hideTimeUnit: true
      periodOptions?: never
      valueUnitInput?: never
      unitUnitInput?: never
    }
  | {
      /**
       * Optional time input allowing the user to estimate their cost on different time horizon.
       * Pass the options to be displayed in the dropdown.
       */
      hideTimeUnit?: false
      periodOptions: TimeUnit[]
      valueUnitInput: ComponentProps<typeof UnitInput>['value']
      unitUnitInput: TimeUnit
    }

export type DetailsType = {
  title?: string
  price?: number
  details?: string[]
  discount?: number
  info?: string
  amount?: number
  amountFree?: number
}

export type ItemsType = {
  category: string
  additionalInfo?: string
  subCategories: DetailsType[]
  discount?: number
}

export type OrderSummaryProps = {
  items: ItemsType[]
  validateButtonOnClick: MouseEventHandler<HTMLElement>
  locales?: Record<keyof typeof EstimateCostLocales, string>
  currency: string
  locale: string
  /**
   *Total applied to the final cost (due to commitment, beta...) in %
   */
  discount?: number
  footer: ReactNode
  children: ReactNode
  totalPriceInfo?: ReactNode
} & PeriodProps
