import type { UnitInput } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type orderSummaryLocales from './locales/en'

export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'months'

type PeriodProps =
  | {
      hideTimeUnit: true
      periodOptions?: never
      valueUnitInput?: never
      unitUnitInput?: TimeUnit
      onChangeUnitInput?: never
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
      onChangeUnitInput?: ComponentProps<typeof UnitInput>['onChangeUnitValue']
    }
type NumberInputType = {
  /**
   * Display a number input instead of the price
   */
  numberInput?: boolean
  numberInputValue?: number | null
  numberInputUnit?: string
  numberInputControls?: boolean
  onChangeInput?: (value: number | null) => void
}

export type PriceTypeSingle = {
  maxPrice: number
  maxPriceWithDiscount: number
  totalPrice: number
  totalPriceWithDiscount: number
  timeUnit: TimeUnit
}

export type PriceType = Record<string, PriceTypeSingle>

export type SubCategoryType = {
  title?: string
  price?: number
  /**
   * List of elements to be displayed in the subcategory
   */
  details?: string[]
  discount?: number
  amount?: number[] | number
  amountFree?: number
  /**
   * Set to true if the price does not depend on the time
   */
  fixedPrice?: boolean
  /**
   * Suffix to be displayed after the price - this will trigger to not display the overall price taking into account the amount for the subcategory.
   */
  priceUnit?: string
  /**
   * Hide the price for the line (it will still be counted in the general price)
   */
  hidePrice?: boolean
  /**
   * Custom content to display next to the price
   */
  customContent?: ReactNode
} & NumberInputType

export type ItemsType = {
  category: string
  additionalInfo?: ReactNode
  subCategories?: SubCategoryType[]
  discount?: number
  /**
   * Hide the price of the category and display the custom content instead
   */
  customContent?: ReactNode
  /**
   * Whether the category price can be < 0 (e.g coupons)
   */
  allowNegative?: boolean
} & NumberInputType

export type CurrencyType = 'EUR'

export type LocalesFormatType = Intl.LocalesArgument

export type OrderSummaryProps = {
  items: ItemsType[]
  header?: string
  locales?: Record<keyof typeof orderSummaryLocales, string>
  currency?: CurrencyType
  /**
   * Locale to format the numbers (prices)
   */
  localeFormat?: LocalesFormatType
  /**
   *Total applied to the final cost (due to commitment, beta...)
   */
  discount?: number
  footer?: ReactNode
  children?: ReactNode
  totalPriceInfo?: ReactNode
  totalPriceDescription?: ReactNode
  additionalInfo?: string
  /**
   * Number of fraction digit to display in the price details
   */
  fractionDigits?: number
  /**
   * Get the computed price for each category.
   * `price.category = { before: [total, totalMax], after: [totalWithDiscount, totalMaxWithDiscount]}`
   */
  onChange?: (price: PriceType, totalPrice: PriceTypeSingle) => void
  hideDetails?: boolean
  className?: string
  ['data-testid']?: string
} & PeriodProps
