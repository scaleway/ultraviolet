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
  labelTooltip,
  direction = 'column',
  input,
  prefix,
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
  'aria-label': ariaLabel,
}: SliderProps) => (
  <SliderContainer
    aria-label={ariaLabel}
    data-options={!!options}
    gap={options ? 3 : 1}
  >
    {double ? (
      <DoubleSlider
        name={name}
        min={min}
        max={max}
        label={label}
        step={step}
        value={value as number[]}
        labelTooltip={labelTooltip as string[] | boolean | undefined}
        disabled={disabled}
        error={error}
        onChange={onChange as (value: number[]) => void}
        data-testid={dataTestId}
        id={id}
        onBlur={onBlur}
        onFocus={onFocus}
        className={className}
        options={options}
        input={input}
        prefix={prefix}
        suffix={suffix}
        required={required}
        direction={direction}
        aria-label={ariaLabel}
      />
    ) : (
      <SingleSlider
        name={name}
        min={min}
        max={max}
        step={step}
        value={value as number}
        labelTooltip={labelTooltip as string | boolean | undefined}
        disabled={disabled}
        error={error}
        onChange={onChange as (value: number) => void}
        options={options}
        data-testid={dataTestId}
        id={id}
        onBlur={onBlur}
        onFocus={onFocus}
        className={className}
        direction={direction}
        input={input}
        prefix={prefix}
        label={label}
        suffix={suffix}
        required={required}
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
