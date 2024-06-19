import styled from '@emotion/styled'
import type { HTMLAttributes, ReactNode } from 'react'
import { useId, useState } from 'react'
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
  /**
   * When a maximum value and a minimum value are needed
   */
  double?: boolean
  value: number[] | number
  labelTooltip?: boolean | string | string[]
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
  error: string | boolean
  /**
   * The labels/ticks to show
   */
  options?: { value: number; label?: string }[]
  onChange?: (value?: number | number[]) => void
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

export const Slider = ({
  name,
  label,
  helper,
  double = false,
  labelTooltip,
  direction = 'column',
  input,
  prefix,
  suffix,
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
  const [computedValue, setValues] = useState<number | number[] | undefined>(
    value,
  )

  const handleChange = (newValue: number | number[]) => {
    onChange?.(newValue)
    setValues(newValue)
  }
  const handleChangeInput = (val?: number, side?: 'left' | 'right') => {
    if (side === 'left' && typeof computedValue === 'object') {
      if (val) {
        const newComputedValue = [...computedValue]
        newComputedValue[0] = Math.max(
          min,
          Math.min(computedValue[1] + step, val),
        )
        setValues(newComputedValue)
        onChange?.(newComputedValue)
      } else {
        setValues([undefined, computedValue[1]])
        onChange?.([undefined, computedValue[1]])
      }
    } else if (side === 'right') {
      if (val) {
        const newComputedValue = [...computedValue]
        newComputedValue[1] = Math.min(
          max,
          Math.max(computedValue[0] - step, val),
        )
        setValues(newComputedValue)
        onChange?.(newComputedValue)
      } else {
        setValues([computedValue[0], undefined])
        onChange?.([computedValue[0], undefined])
      }
    } else if (val) {
      if (val > max) {
        onChange?.(max)
        setValues(max)
      } else {
        onChange?.(Math.max(val, min))
        setValues(Math.max(val, min))
      }
    } else {
      onChange?.(undefined)
      setValues(undefined)
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
        unit={typeof suffix === 'string' ? suffix : undefined}
        onChange={newVal =>
          double
            ? handleChangeInput(newVal ?? undefined, side)
            : handleChangeInput(newVal ?? undefined)
        }
      />
    ) : (
      <StyledText
        as="span"
        variant="bodySmall"
        sentiment="neutral"
        placement={!double && direction !== 'row' ? 'right' : 'center'}
        double={double}
        isColumn={direction === 'column'}
      >
        {prefix}
        {valueNumber}
        {suffix}
      </StyledText>
    )

  return (
    <SliderContainer aria-label={ariaLabel} data-options={!!options}>
      <Stack gap={1} direction={direction} justifyContent="left">
        {label ? (
          <Stack justifyContent="space-between" direction="row">
            <Text
              as="label"
              variant="bodyStrong"
              htmlFor={finalId}
              placement="left"
            >
              {label}
            </Text>

            {direction === 'column' &&
            !double &&
            typeof computedValue !== 'object'
              ? styledValue(computedValue)
              : null}
          </Stack>
        ) : null}
        {direction === 'column' &&
        !label &&
        !double &&
        typeof computedValue !== 'object'
          ? styledValue(computedValue)
          : null}
        {direction === 'column' && double ? (
          <Stack justifyContent="space-between" direction="row">
            {styledValue(
              typeof computedValue === 'object' ? computedValue[0] : undefined,
              'left',
            )}
            {styledValue(
              typeof computedValue === 'object' ? computedValue[1] : undefined,
              'right',
            )}
          </Stack>
        ) : null}

        {direction === 'row' && double
          ? styledValue(
              typeof computedValue === 'object' ? computedValue[0] : undefined,
              'left',
            )
          : null}
        {double && typeof value !== 'number' ? (
          <DoubleSlider
            name={name}
            min={min}
            max={max}
            step={step}
            value={computedValue}
            labelTooltip={labelTooltip}
            disabled={disabled}
            error={error}
            onChange={handleChange}
            data-testid={dataTestId}
            id={id}
            onBlur={onBlur}
            onFocus={onFocus}
            className={className}
            options={options}
            direction={direction}
            setValues={setValues}
          />
        ) : (
          <SingleSlider
            name={name}
            min={min}
            max={max}
            step={step}
            value={typeof computedValue === 'number' ? computedValue : min}
            labelTooltip={labelTooltip}
            disabled={disabled}
            error={error}
            onChange={handleChange}
            options={options}
            data-testid={dataTestId}
            id={id}
            onBlur={onBlur}
            onFocus={onFocus}
            className={className}
            direction={direction}
          />
        )}
        {direction === 'row' && double
          ? styledValue(
              typeof computedValue === 'object' ? computedValue[1] : undefined,
              'right',
            )
          : null}
        {direction === 'row' && !double && typeof computedValue !== 'object'
          ? styledValue(computedValue)
          : null}
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
