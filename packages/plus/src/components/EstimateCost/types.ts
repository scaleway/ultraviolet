import type { Alert } from '@ultraviolet/ui'
import type { ComponentProps, CSSProperties, JSX, ReactNode } from 'react'
import type EstimateCostLocales from './locales/en'

export type EstimateCostProps = {
  /**
   * Text to display into an alert on the top of the EstimateCost component.
   */
  alert?: ReactNode
  alertTitle?: string
  /**
   * Type of the alert defined by the Scaleway UI Alert component.
   */
  alertVariant?: ComponentProps<typeof Alert>['sentiment']
  children: ReactNode
  /**
   * Individual fees to display at the bottom of the EstimateCost component.
   */
  commitmentFees?: number
  /**
   * Content to display into the fees part, it can be any component but in order to have a consistent design, it is recommended to use `<EstimateCost.Regular>` and `<EstimateCost.Strong>` components.
   */
  commitmentFeesContent?: ReactNode
  /**
   * When set to true, only the estimated final cost is displayed
   */
  compact?: boolean
  /**
   * By default, a description exists but if you need you can customize it with this prop.
   */
  description?: ReactNode
  /**
   * Hide the floating estimate cost overlay shown in the bottom of the page.
   */
  hideOverlay?: boolean
  /**
   * Disable left button on the overlay.
   */
  disableOverlayLeft?: boolean
  /**
   * Disable right button (submit) on the overlay.
   */
  disableOverlayRight?: boolean
  /**
   * This is a global discount for all estimate cost, all sub items will be impacted by this discount.
   * The discount is a percentage, so 0.1 means 10% discount. Discount = 1 means 100% so it means free.
   * This is usually associate with beta products and prop `isBeta`.
   */
  discount?: number
  /**
   * The default time unit to select.
   */
  defaultTimeUnit?: Units
  /**
   * List of time unit the price can be calculated with. Can only be an array of `seconds`, `minutes`, `hours`, `days` or `months`.
   */
  timeUnits?: Units[]
  /**
   * Hide the selectable time unit on the top of the component.
   */
  hideTimeUnit?: boolean
  /**
   * Hide the total price at the bottom of the component.
   */
  hideTotal?: boolean
  /**
   * Hide the hourly price in total section at the bottom of the component.
   */
  hideHourlyPriceOnTotal?: boolean
  /**
   * Show a badge beta on the total price with how much discount is applied.
   */
  isBeta?: boolean
  /**
   * It will display another individual line at the bottom of the component with a monthly price. It can be used when you display hourly price, but you have one or many items that are billed monthly.
   */
  monthlyFees?: number
  /**
   * Content to display into monthly fees part, it can be any component but in order to have a consistent design, it is recommended to use `<EstimateCost.Regular>` and `<EstimateCost.Strong>` components.
   */
  monthlyFeesContent?: ReactNode
  /**
   * Label of the item, it describes what kind of fees is related to. (ex: "Installation fee")
   */
  monthlyFeesLabel?: string
  /**
   * Content that will be shown on the left side of the overlay.
   */
  OverlayLeft?: (props: {
    children: ReactNode
    disabled?: boolean
  }) => JSX.Element
  /**
   * Content that will be shown on the left side of the overlay.
   */
  OverlayRight?: (props: {
    children?: ReactNode
    disabled?: boolean
  }) => JSX.Element
  /**
   * Time unit to use on the overlay. It can be different from estimate cost.
   */
  overlayUnit?: Units
  /**
   * Locales for the component. By default, it will use the english locales.
   */
  locales?: Record<keyof typeof EstimateCostLocales, string>
  /**
   * Defines the currency to be shown in the component.
   * To find out all currencies checkout https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes section "Code" of the table.
   */
  currency?: string
  style?: CSSProperties
  /**
   * Defines the way we display numbers depending on locale (ex: 1,000.00 or 1 000,00).
   * To understand better please read https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales
   */
  numberLocales?: string
  overlayMargin?: string
  onTotalPriceChange?: ({
    total,
    totalMax,
  }: {
    /**
     * The total price of the estimate cost.
     */
    total: number
    /**
     * If the price has a range (ex: 10-20), this is the maximum value.
     */
    totalMax?: number
  }) => void
}

export type Units = 'seconds' | 'minutes' | 'hours' | 'days' | 'months'

export type Iteration = {
  unit: Units
  value: number
}

export type BareEstimateProduct = {
  id: string
}

export type EstimateProduct = BareEstimateProduct & {
  amount: number
  price: number
  amountFree: number
  isVariant: boolean
  maxAmount: number
  noIteration: boolean
  longFractionDigits: boolean
  discount: number
}
