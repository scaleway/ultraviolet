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
      onChangePeriod?: never
      onChangePeriodUnit?: never
      value?: never
      unit?: never
    }
  | {
      /**
       * Optional time input allowing the user to estimate their cost on different time horizon.
       * Pass the options to be displayed in the dropdown.
       */
      hideTimeUnit?: false
      periodOptions: TimeUnit[]
      onChangePeriod: ComponentProps<typeof UnitInput>['onChange']
      onChangePeriodUnit: ComponentProps<typeof UnitInput>['onChangeUnitValue']
      value: ComponentProps<typeof UnitInput>['value']
      unit: TimeUnit
    }

type CommitmentType =
  | {
      commitment: true
      commitmentChoice: 'false' | number
      onChangeCommitment: (value: string) => void
      commitmentOptions: { label: ReactNode; discount: number }[]
    }
  | {
      commitment?: false
      onChangeCommitment?: never
      commitmentOptions?: never
      commitmentChoice?: never
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
  overallDiscount?: { label: ReactNode; discount: number }
  footer: ReactNode
} & PeriodProps &
  CommitmentType
