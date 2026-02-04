import type { ComponentProps, ReactNode } from 'react'
import type { Text } from '../../Text'

export type Hint =
  | {
      type: 'tooltip'
      text: string
    }
  | {
      type: 'popover'
      title: string
      content: ReactNode
    }

export type PlanType<T extends string> = {
  value: string
  title: string
  titleHeader?: ReactNode
  sentiment?: ComponentProps<typeof Text>['sentiment']
  header: {
    description?: ReactNode
    price: string
    quotas?: string
    priceDescription?: string
    cta?: ReactNode
    separator?: ReactNode
  }
  outOfStock?: boolean
  disabled?: boolean
  data: Record<T, string | number | undefined | ReactNode>
}

export type Feature<T extends string> =
  | {
      key: T
      text: string
      description?: string
      spaceAfter?: boolean
      hint?: Hint
    }
  | { group: string; hint?: Hint }
