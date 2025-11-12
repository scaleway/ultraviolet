import type { HTMLAttributes, ReactNode } from 'react'

type DefaultProps = {
  /**
   * Slider name
   */
  name?: string
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
   * Where to position the tooltip
   */
  tooltipPosition?: 'bottom' | 'top'
  /**
   * Whether user can change the value with an input
   */
  input?: boolean
  /**
   * Prefix of the value - only visible when prop `input = false`
   */
  prefix?: ReactNode

  /**
   * Unit of the value
   */
  unit?: string
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  /**
   * Whether an error occured
   */
  error?: string | boolean
  /**
   * Options for a non-linear scale, overrides `min`, `max`. This is usefull if step is not enough to get the desired granularity.
   */
  options?: { value: number; label?: string }[]

  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className' | 'style'
>

type SingleProps = {
  /**
   * Slider value
   */
  value: number
  onChange?: (value: number) => void
  tooltip?: boolean | string
  /**
   * Suffix of the value - only visible when prop `input = false` and overrides prop `unit` when visible
   */
  suffix?: ReactNode
}

type DoubleProps = {
  /**
   * Slider values
   */
  value: number[]
  onChange?: (value: number[]) => void
  tooltip?: boolean | string[] | string
  /**
   * Suffix of the value - only visible when prop `input = false` and overrides prop `unit` when visible
   */
  suffix?: string | ReactNode[]
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

export type LabelProps = {
  direction?: 'row' | 'column'
  input?: boolean
  required?: boolean
  label?: string
  finalId: string
}
