'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DoubleSlider } from './components/DoubleSlider'
import { SingleSlider } from './components/SingleSlider'
import { sliderContainer } from './styles.css'
import type { SliderProps } from './types'

/**
 * You can define simple or double sliders with the slider component.
 * - For a simple slider (one handle) : prop `value` must be number.
 * - For a double slider (two handles):  prop `value` must be an array of numbers (of length 2) and prop `double` must be set to `true`. **Make sure that others props have the correct type.**
 */
export const Slider = ({
  name,
  label,
  helper,
  tooltip,
  direction = 'column',
  input,
  prefix,
  unit,
  suffix,
  required,
  disabled,
  error,
  options,
  'data-testid': dataTestId,
  value,
  onChange,
  min = 0,
  double,
  max = 100,
  step = 1,
  id,
  onBlur,
  onFocus,
  className,
  tooltipPosition = 'top',
  'aria-label': ariaLabel,
}: SliderProps) => {
  // we check if options exists if so we set the bounds to the length of the options
  const correctedBounds = options
    ? { max: Array.isArray(options) ? options.length - 1 : max, min: 0 }
    : { max, min }
  const gap = useMemo(() => {
    if (options) {
      return 3
    }
    if (input && double && !helper) {
      return 0
    }

    return 1
  }, [options, input, double, helper])

  return (
    <Stack
      aria-label={ariaLabel}
      className={double && !!options ? sliderContainer : ''}
      data-double={double}
      data-options={!!options}
      gap={gap}
    >
      {double ? (
        <DoubleSlider
          aria-label={ariaLabel}
          className={className}
          data-testid={dataTestId}
          direction={direction}
          disabled={disabled}
          error={error}
          id={id}
          input={input}
          label={label}
          max={correctedBounds.max}
          min={correctedBounds.min}
          name={name}
          onBlur={onBlur}
          onChange={onChange as (value: number[]) => void}
          onFocus={onFocus}
          options={options}
          prefix={prefix}
          required={required}
          step={step}
          suffix={suffix as ReactNode[]}
          tooltip={tooltip as string[] | boolean | undefined}
          tooltipPosition={tooltipPosition}
          unit={unit}
          value={value as number[]}
        />
      ) : (
        <SingleSlider
          aria-label={ariaLabel}
          className={className}
          data-testid={dataTestId}
          direction={direction}
          disabled={disabled}
          error={error}
          id={id}
          input={input}
          label={label}
          max={correctedBounds.max}
          min={correctedBounds.min}
          name={name}
          onBlur={onBlur}
          onChange={onChange as (value: number) => void}
          onFocus={onFocus}
          options={options}
          prefix={prefix}
          required={required}
          step={step}
          suffix={suffix as ReactNode}
          tooltip={tooltip as string | boolean | undefined}
          tooltipPosition={tooltipPosition}
          unit={unit}
          value={value as number}
        />
      )}
      {error || helper ? (
        <Text
          as="p"
          prominence="weak"
          sentiment={error ? 'danger' : 'neutral'}
          variant="caption"
        >
          {typeof error === 'string' ? error : helper}
        </Text>
      ) : null}
    </Stack>
  )
}
