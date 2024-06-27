import type { ReactNode } from 'react'
import { Text } from '../Text'
import { DoubleSlider } from './DoubleSlider'
import { SingleSlider } from './SingleSlider'
import { SliderContainer } from './SliderDecoration'
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
  optionsUnit,
  prefix,
  unit,
  suffix,
  required,
  possibleValues,
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
  const correctedBounds = possibleValues
    ? { min: 0, max: possibleValues.length - 1 }
    : { min, max }

  return (
    <SliderContainer
      aria-label={ariaLabel}
      data-options={!!options}
      gap={options ? 3 : 1}
    >
      {double ? (
        <DoubleSlider
          name={name}
          min={correctedBounds.min}
          max={correctedBounds.max}
          label={label}
          step={step}
          value={value as number[]}
          tooltip={tooltip as string[] | boolean | undefined}
          disabled={disabled}
          error={error}
          onChange={onChange as (value: number[]) => void}
          data-testid={dataTestId}
          id={id}
          optionsUnit={optionsUnit}
          onBlur={onBlur}
          tooltipPosition={tooltipPosition}
          onFocus={onFocus}
          className={className}
          options={options}
          input={input}
          unit={unit}
          prefix={prefix}
          suffix={suffix as ReactNode[]}
          required={required}
          possibleValues={possibleValues}
          direction={direction}
          aria-label={ariaLabel}
        />
      ) : (
        <SingleSlider
          name={name}
          min={correctedBounds.min}
          max={correctedBounds.max}
          step={step}
          value={value as number}
          tooltip={tooltip as string | boolean | undefined}
          disabled={disabled}
          error={error}
          onChange={onChange as (value: number) => void}
          options={options}
          data-testid={dataTestId}
          id={id}
          tooltipPosition={tooltipPosition}
          onBlur={onBlur}
          onFocus={onFocus}
          className={className}
          direction={direction}
          optionsUnit={optionsUnit}
          input={input}
          prefix={prefix}
          label={label}
          unit={unit}
          suffix={suffix as ReactNode}
          required={required}
          possibleValues={possibleValues}
          aria-label={ariaLabel}
        />
      )}
      {error || helper ? (
        <Text
          as="p"
          variant="caption"
          sentiment={error ? 'danger' : 'neutral'}
          prominence="default"
        >
          {typeof error === 'string' ? error : helper}
        </Text>
      ) : null}
    </SliderContainer>
  )
}
