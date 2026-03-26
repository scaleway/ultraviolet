import type { Text } from '../Text'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

export type LabelProps = {
  /**
   * As can help you to define a label or a legend in case you are using it inside a fieldset
   */
  as?: 'label' | 'legend'
  children?: string
  labelDescription?: ReactNode
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  htmlFor?: string
  id?: string
  sentiment?: ComponentProps<typeof Text>['sentiment']
  disabled?: boolean
  style?: CSSProperties
  className?: string
}
