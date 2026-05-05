// oxlint-disable typescript/no-unsafe-type-assertion
'use client'

import { useId, useMemo } from 'react'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Helper } from '../Helper'
import { Stack } from '../Stack'

import { DoubleSlider } from './components/DoubleSlider'
import { SingleSlider } from './components/SingleSlider'
import { sliderStyle } from './styles.css'

import type { SliderProps } from './types'
import type { ReactNode } from 'react'

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
  style,
  customValueDisplay,
  labelDescription,
  'aria-label': ariaLabel,
  defaultScale = false,
  'aria-describedby': ariaDescribedBy,
}: SliderProps) => {
  // we check if options exists if so we set the bounds to the length of the options

  const correctedBounds =
    options && !defaultScale
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
  const helperId = useId()

  return (
    <Stack
      aria-label={ariaLabel}
      className={double && !!options ? sliderStyle.container : ''}
      data-double={double}
      data-options={!!options}
      gap={gap}
      style={style}
    >
      {double ? (
        <DoubleSlider
          aria-describedby={
            !ariaDescribedBy && hasHelperText(helper, error)
              ? helperId
              : ariaDescribedBy
          }
          aria-label={ariaLabel}
          className={className}
          customValueDisplay={customValueDisplay}
          data-testid={dataTestId}
          defaultScale={defaultScale}
          direction={direction}
          disabled={disabled}
          error={error}
          id={id}
          input={input}
          label={label}
          labelDescription={labelDescription}
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
          aria-describedby={
            !ariaDescribedBy && hasHelperText(helper, error)
              ? helperId
              : ariaDescribedBy
          }
          aria-label={ariaLabel}
          className={className}
          customValueDisplay={customValueDisplay}
          data-testid={dataTestId}
          defaultScale={defaultScale}
          direction={direction}
          disabled={disabled}
          error={error}
          id={id}
          input={input}
          label={label}
          labelDescription={labelDescription}
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
      <Helper
        helper={helper}
        error={error}
        id={ariaDescribedBy ?? helperId}
        disabled={disabled}
      />
    </Stack>
  )
}
