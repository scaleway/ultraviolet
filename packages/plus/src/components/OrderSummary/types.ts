import type { UnitInput } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type orderSummaryLocales from './locales/en'

export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'months'

type PeriodProps =
  | {
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
      periodOptions?: TimeUnit[]
      valueUnitInput?: ComponentProps<typeof UnitInput>['value']
      unitUnitInput?: TimeUnit
    }

export type SubCategoryType = {
  title?: string
  price?: number
  /**
   * List of elements to be displayed in the subcategory
   */
  details?: string[]
  discount?: number
  /**
   * Custom content to display next to the price
   */
  customContent?: ReactNode
  amount?: number
  amountFree?: number
  /**
   * Set to true if the price does not depend on the time
   */
  fixedPrice?: boolean
  /**
   * Suffix to be displayed after the price (generally, the unit) - this will trigger to not display the overall price taking into account the amount for the subcategory.
   */
  priceUnit?: string
}

export type ItemsType = {
  category: string
  additionalInfo?: ReactNode
  subCategories?: SubCategoryType[]
  discount?: number
  /**
   * Hide the price of the category and display the custom content instead
   */
  customContent?: ReactNode
}

export type OrderSummaryProps = {
  items: ItemsType[]
  header: string
  locales?: Record<keyof typeof orderSummaryLocales, string>
  currency: string
  /**
   * Locale to format the numbers (prices)
   */
  localeFormat: string
  /**
   *Total applied to the final cost (due to commitment, beta...) in %
   */
  discount?: number
  footer?: ReactNode
  children?: ReactNode
  totalPriceInfo?: ReactNode
  /**
   * Number of fraction digit to display in the price details
   */
  fractionDigits?: number
} & PeriodProps
