import styled from '@emotion/styled'
import type { HTMLAttributes, ReactNode } from 'react'
import { useId, useState } from 'react'
import { NumberInputV2 } from '../NumberInputV2'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DoubleSlider } from './DoubleSlider'
import { SingleSlider } from './SingleSlider'

const SliderContainer = styled(Stack)`
    min-width: 220px;
    max-width: 640px;
`
const StyledNumberInput = styled(NumberInputV2)`
  width: ${({ theme }) => theme.space[5]};
`
const StyledText = styled(Text)`
  width: ${({ theme }) => theme.space[5]};
  align-self: end;
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
  value: [string, string] | string
  labelTooltip?: boolean
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
  onChange?: (value: string | string[]) => void
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
  const [computedValue, setValues] = useState<string | string[]>(value)

  const handleChange = (newValue: string | string[]) => {
    onChange?.(newValue)
    setValues(newValue)
  }

  const handleChangeInput = (val?: string, side?: 'left' | 'right') => {
    if (val) {
      if (side === 'left') {
        const newComputedValue = [...computedValue]
        newComputedValue[0] = val
        setValues(newComputedValue)
        onChange?.(newComputedValue)
      }
      if (side === 'right') {
        const newComputedValue = [...computedValue]
        newComputedValue[1] = val
        setValues(newComputedValue)
        onChange?.(newComputedValue)
      } else {
        onChange?.(val)
        setValues(val)
      }
    }
  }
  const styledValue = (valueNumber: string, side?: 'left' | 'right') =>
    input ? (
      <StyledNumberInput
        value={Number(valueNumber)}
        size="small"
        min={min}
        max={max}
        unit={typeof suffix === 'string' ? suffix : undefined}
        onChange={newVal =>
          double
            ? handleChangeInput(String(newVal), side)
            : handleChangeInput(String(newVal))
        }
      />
    ) : (
      <StyledText
        as="p"
        variant="bodySmall"
        sentiment="neutral"
        placement={!double && direction !== 'row' ? 'right' : 'center'}
      >
        {prefix}
        {valueNumber}
        {suffix}
      </StyledText>
    )

  return (
    <SliderContainer aria-label={ariaLabel}>
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
            typeof computedValue === 'string'
              ? styledValue(computedValue)
              : null}
          </Stack>
        ) : null}
        {direction === 'column' &&
        !label &&
        !double &&
        typeof computedValue === 'string'
          ? styledValue(computedValue)
          : null}
        {direction === 'column' && double ? (
          <Stack justifyContent="space-between" direction="row">
            {styledValue(computedValue[0], 'left')}
            {styledValue(computedValue[1], 'right')}
          </Stack>
        ) : null}

        {direction === 'row' && double
          ? styledValue(computedValue[0], 'left')
          : null}
        {double ? (
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
            direction={direction}
          />
        ) : (
          <SingleSlider
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
            direction={direction}
          />
        )}
        {direction === 'row' && double
          ? styledValue(computedValue[1], 'right')
          : null}
        {direction === 'row' && !double && typeof computedValue === 'string'
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
