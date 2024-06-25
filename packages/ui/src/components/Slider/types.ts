import type { HTMLAttributes, ReactNode } from 'react'

type DefaultProps = {
  /**
   * Slider name
   */
  name: string
  label?: string
  helper?: string
  /**
   * Minimum possible value
   */
  min?: number
  /**
   * Maximum possible value
   */
  max?: number
  /**
   * Direction of the slider decorators (label, inputs, helper, error). Does not impact the direction of the slider itself (horizontal)
   */
  direction?: 'column' | 'row'
  /**
   * Step of the slider
   */
  step?: number
  required?: boolean
  /**
   * Whether to show a tooltip when hovering the handle
   */
  labelTooltip?: boolean | string[] | string
  /**
   * Whether user can change the value with an input
   */
  input?: boolean
  /**
   * Prefix of the value
   */
  prefix?: ReactNode
  /**
   * Suffix of the value
   */
  suffix?: ReactNode
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  /**
   * Whether an error occured
   */
  error?: string | boolean
  /**
   * The labels/ticks to show
   */
  options?: { value: number; label?: string }[]
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

type SingleProps = {
  /**
   * Slider value
   */
  value: number
  onChange?: (value: number) => void
}

type DoubleProps = {
  /**
   * Slider values
   */
  value: number[]
  onChange?: (value: number[]) => void
}

export type SliderProps = DefaultProps &
  (SingleProps | DoubleProps) & {
    /**
     * Whether the slider has 2 handles (range)
     */
    double?: boolean
  }

export type SingleSliderProps = DefaultProps & SingleProps

export type DoubleSliderProps = DefaultProps & DoubleProps
