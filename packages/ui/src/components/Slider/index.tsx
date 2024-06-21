import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { HTMLAttributes, ReactNode } from 'react'
import { useCallback, useEffect, useId, useState } from 'react'
import { NumberInputV2 } from '../NumberInputV2'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DoubleSlider } from './DoubleSlider'
import { SingleSlider } from './SingleSlider'
import { SLIDER_WIDTH } from './constant'

const SliderContainer = styled(Stack)<{ 'data-options': boolean }>`
    min-width: ${SLIDER_WIDTH.min}px;
    max-width: ${SLIDER_WIDTH.max}px;

    &[data-options="true"]{ 
      margin-bottom: ${({ theme }) => theme.space[2]}
      }
`
const StyledNumberInput = styled(NumberInputV2)`
  min-width: ${({ theme }) => theme.space[5]};
`
const StyledText = styled(Text)<{ double: boolean; isColumn: boolean }>`
  min-width: ${({ theme, double, isColumn }) => (double && isColumn ? null : theme.space[5])};
  align-self: ${({ double }) => (double ? 'auto' : 'end')};
`

type SliderProps = {
  /**
   * Slider name
   */
  name: string
  label?: string
  helper?: string
  min?: number
  max?: number
  direction?: 'column' | 'row'
  /**
   * Step of the slider
   */
  step?: number
  required?: boolean
  value: number | number[]
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
  onChange?: (newValue?: number[] | number) => void
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

/**
 * You can define simple or double sliders with the slider component.
 * - For a simple slider (one handle) : prop `value` must be number.
 * - For a double slider (two handles):  prop `value` must be an array of numbers (of length two). **Make sure that others props have the correct type.**
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
  max = 100,
  step = 1,
  id,
  onBlur,
  onFocus,
  className,
  'aria-label': ariaLabel,
}: SliderProps) => {
  const localId = useId()
  const finalId = id ?? localId
  const [computedValue, setValues] = useState(value)
  const isDouble = Array.isArray(computedValue)

  useEffect(() => {
    if (isDouble) {
      const newValues = [computedValue[0], computedValue[1]]
      // Update maxValue and minValue so that maxValue > minValue
      if (newValues[1] < newValues[0]) {
        ;[newValues[0], newValues[1]] = [newValues[1], newValues[0]]
      }

      // Update maxValue to always have minValue < maxValue <= max
      if (!newValues[1] || newValues[1] > max) {
        newValues[1] = max
      } else if (newValues[1] <= newValues[0] + step) {
        newValues[1] = newValues[0] + step
      }

      // Update minValue to always have min <= maxValue <= min
      if (!newValues[0] || newValues[0] < min) {
        newValues[0] = min
      } else if (newValues[0] >= newValues[1] - step) {
        newValues[0] = newValues[1] - step
      }

      // Update minValue, maxValue and call onChange only if values were changed
      if (
        newValues[0] !== computedValue[0] ||
        newValues[1] !== computedValue[1]
      ) {
        setValues(newValues)
      }
    }

    // For single slider make sure that min <= value <= max
    if (typeof computedValue === 'number') {
      if (computedValue < min) {
        setValues(min)
      }
      if (computedValue > max) {
        setValues(max)
      }
    }
  }, [computedValue, isDouble, max, min, onChange, step, value])

  const handleChange = useCallback(
    (newValue: typeof computedValue) => {
      onChange?.(newValue)
      setValues(newValue)
    },
    [onChange],
  )
  const handleChangeInput = (val: number, side?: 'left' | 'right') => {
    if (isDouble) {
      if (side === 'left') {
        const newComputedValue = [...computedValue]
        newComputedValue[0] = Math.max(
          min,
          Math.min(computedValue[1] - step, val),
        )
        setValues(newComputedValue)
        onChange?.(newComputedValue)
      } else if (side === 'right') {
        const newComputedValue = [...computedValue]
        newComputedValue[1] = Math.min(
          max,
          Math.max(computedValue[0] - step, val),
        )
        setValues(newComputedValue)
        onChange?.(newComputedValue)
      }
    } else if (val > max) {
      onChange?.(max)
      setValues(max)
    } else {
      onChange?.(Math.max(val, min))
      setValues(Math.max(val, min))
    }
  }

  const styledValue = (valueNumber?: number, side?: 'left' | 'right') =>
    input ? (
      <StyledNumberInput
        value={valueNumber}
        size="small"
        min={min}
        max={max}
        step={step}
        controls={false}
        data-testid={side ? `slider-input-${side}` : 'slider-input'}
        unit={typeof suffix === 'string' ? suffix : undefined}
        onChange={newVal => {
          if (newVal) {
            if (isDouble) handleChangeInput(newVal, side)
            else handleChangeInput(newVal)
          }
        }}
      />
    ) : (
      <StyledText
        as="span"
        variant="bodySmall"
        sentiment="neutral"
        placement={!isDouble && direction !== 'row' ? 'right' : 'center'}
        double={isDouble}
        isColumn={direction === 'column'}
      >
        {prefix}
        {valueNumber}
        {suffix}
      </StyledText>
    )

  return (
    <SliderContainer
      aria-label={ariaLabel}
      data-options={!!options}
      gap={options ? 3 : 1}
    >
      <Stack gap={1} direction={direction} justifyContent="left">
        {label ? (
          <Stack justifyContent="space-between" direction="row">
            <Stack gap={0.5} direction="row">
              <Text
                as="label"
                variant="bodyStrong"
                htmlFor={finalId}
                placement="left"
              >
                {label}
              </Text>
              {required ? (
                <Icon name="asterisk" sentiment="danger" size={8} />
              ) : null}
            </Stack>

            {direction === 'column' && !isDouble
              ? styledValue(computedValue)
              : null}
          </Stack>
        ) : null}
        {direction === 'column' && !label && !isDouble
          ? styledValue(computedValue)
          : null}
        {direction === 'column' && isDouble ? (
          <Stack justifyContent="space-between" direction="row">
            {styledValue(computedValue[0], 'left')}
            {styledValue(computedValue[1], 'right')}
          </Stack>
        ) : null}

        {direction === 'row' && isDouble
          ? styledValue(computedValue[0], 'left')
          : null}
        {isDouble ? (
          <DoubleSlider
            name={name}
            min={min}
            max={max}
            step={step}
            value={computedValue}
            labelTooltip={labelTooltip as string[] | boolean | undefined}
            disabled={disabled}
            error={error}
            onChange={handleChange}
            data-testid={dataTestId}
            id={finalId}
            onBlur={onBlur}
            onFocus={onFocus}
            className={className}
            options={options}
            direction={direction}
          />
        ) : (
          <SingleSlider
            name={name}
            min={min}
            max={max}
            step={step}
            value={computedValue}
            labelTooltip={labelTooltip as string | boolean | undefined}
            disabled={disabled}
            error={error}
            onChange={handleChange}
            options={options}
            data-testid={dataTestId}
            id={finalId}
            onBlur={onBlur}
            onFocus={onFocus}
            className={className}
            direction={direction}
          />
        )}
        {direction === 'row' && isDouble
          ? styledValue(computedValue[1], 'right')
          : null}
        {direction === 'row' && !isDouble ? styledValue(computedValue) : null}
      </Stack>
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
