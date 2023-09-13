import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MutableRefObject,
} from 'react'
import { useId, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import {
  bounded,
  getMinusRoundedValue,
  getPlusRoundedValue,
  roundStep,
} from './helpers'

const containerSizes = {
  large: 48,
  medium: 40,
  small: 32,
}

type ContainerSizesType = keyof typeof containerSizes

const iconSizes = {
  large: 26,
  medium: 24,
  small: 22,
}

const BASE_INPUT_WIDTH = 34

const StyledSelectButton = styled(Button)`
  margin: 0 ${({ theme }) => theme.space['1']};
  width: 32px;
  height: 32px;
`

const StyledCenterBox = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: ContainerSizesType }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: ${({ size }) => (size === 'small' ? '24px' : '32px')};
  align-items: center;
  outline: none;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid transparent;
  max-width: 100%;
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.neutral.text};
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
  border: none;
  outline: none;
  position: relative;
  margin-right: ${({ theme }) => theme.space['0.5']};
  max-width: 100%;
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  -moz-appearance: textfield;

  &[disabled] {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    cursor: not-allowed;
  }
`

const StyledText = styled('span', {
  shouldForwardProp: prop => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral.textDisabled : theme.colors.neutral.text};
  user-select: none;
  margin-right: ${({ theme }) => theme.space['1']};
`

const StyledContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: ContainerSizesType }>`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  font-weight: 500;
  height: ${({ size }) => containerSizes[size]}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
  }

  &[aria-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }

  &:not([aria-disabled='true']) {
    ${StyledCenterBox}:hover,
    ${StyledCenterBox}:focus {
      border: 1px solid ${({ theme }) => theme.colors.primary.borderHover};
    }

    ${StyledCenterBox}:focus-within {
      box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
      border: 1px solid ${({ theme }) => theme.colors.primary.borderHover};
    }
  }
`

type NumberInputProps = {
  disabled?: boolean
  maxValue?: number
  minValue?: number
  name?: string
  onChange?: (input: number | undefined) => void
  onMaxCrossed?(): void
  onMinCrossed?(): void
  size?: ContainerSizesType
  /**
   * Define how much will stepper increase / decrease each time you click on + / - button.
   */
  step?: number
  /**
   * Text displayed into component at the right of number value.
   */
  text?: string
  defaultValue?: number
  value?: number
  disabledTooltip?: string
  className?: string
  'data-testid'?: string
  label?: string
  'aria-label'?: string
  'aria-describedby'?: string
  id?: string
  placeholder?: string
  error?: string | boolean
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'defaultValue'
>

/**
 * NumberInput component is used to increment / decrement a number value by clicking on + / - buttons or
 * by typing into input.
 */
export const NumberInput = ({
  disabled = false,
  maxValue,
  minValue = 0,
  name = 'numberinput',
  onChange,
  onFocus,
  onBlur,
  onMaxCrossed,
  onMinCrossed,
  size = 'large',
  step = 1,
  text,
  defaultValue,
  value,
  disabledTooltip,
  className,
  label,
  id,
  placeholder,
  error,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'data-testid': dataTestId,
}: NumberInputProps) => {
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>

  const uniqueId = useId()

  // local state used if component is not controlled (no value prop provided)
  const [inputValue, setInputValue] = useState<number | undefined>(() => {
    if (defaultValue && minValue && defaultValue < minValue) {
      return minValue
    }
    if (defaultValue && maxValue && defaultValue > maxValue) {
      return maxValue
    }

    return defaultValue
  })

  const currentValue = value !== undefined ? value : inputValue

  const setValue = (
    newValue: number | undefined,
    /**
     * If true, will check if newValue is between minValue and maxValue and set it to minValue or maxValue if it's not.
     */
    hasMinMaxVerification = true,
  ) => {
    if (value === undefined) {
      if (hasMinMaxVerification) {
        if (newValue !== undefined && newValue < minValue) {
          setInputValue(minValue)

          return
        }

        if (
          newValue !== undefined &&
          maxValue !== undefined &&
          newValue > maxValue
        ) {
          setInputValue(maxValue)

          return
        }
      }

      setInputValue(newValue)
    }
    onChange?.(newValue)
  }

  const offsetFn = (direction: number) => () => {
    const localValue = currentValue ?? 0
    const newValue =
      localValue % step === 0 ? localValue + step * direction : localValue
    const roundedValue = roundStep(newValue, step, direction)

    setValue(roundedValue)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(
      event.currentTarget.value ? Number(event.currentTarget.value) : undefined,
      false,
    )
  }

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (onFocus) onFocus(event)
  }

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = event => {
    if (currentValue) {
      const boundedValue = bounded(
        currentValue,
        minValue ?? currentValue,
        maxValue ?? currentValue,
      )

      if (maxValue && currentValue > maxValue) onMaxCrossed?.()
      if (minValue && currentValue < minValue) onMinCrossed?.()

      setValue(boundedValue)

      onBlur?.(event)
    }
  }

  const onKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'ArrowUp') {
      event.stopPropagation()
      event.preventDefault()

      const direction = 1
      const localValue = currentValue ?? 0

      const newValue =
        localValue % step === 0 ? localValue + step * direction : localValue
      const roundedValue = roundStep(newValue, step, direction)

      if (maxValue === undefined) {
        setValue(roundedValue)

        return
      }

      setValue(Math.min(roundedValue, maxValue))
    }

    if (event.key === 'ArrowDown') {
      event.stopPropagation()
      event.preventDefault()

      const direction = -1
      const localValue = currentValue ?? 0

      const newValue =
        localValue % step === 0 ? localValue + step * direction : localValue
      const roundedValue = roundStep(newValue, step, direction)

      setValue(Math.max(roundedValue, minValue))
    }
  }

  const isMinusDisabled = useMemo(() => {
    if (disabled) return true
    if (currentValue === undefined) return false
    if (getMinusRoundedValue(currentValue, step) < minValue) {
      return true
    }

    return disabled
  }, [currentValue, disabled, minValue, step])

  const isPlusDisabled = useMemo(() => {
    if (disabled) return true
    if (currentValue === undefined) return false
    if (maxValue && getPlusRoundedValue(currentValue, step) > maxValue) {
      return true
    }

    return disabled
  }, [currentValue, disabled, maxValue, step])

  const inputWidth = useMemo(() => {
    if (placeholder && currentValue === undefined) {
      return placeholder.length * 12
    }

    if (currentValue !== undefined) {
      return currentValue.toString().length * 16
    }

    return BASE_INPUT_WIDTH
  }, [currentValue, placeholder])

  return (
    <Stack gap={1}>
      {label ? (
        <Text variant="bodyStrong" as="label" htmlFor={id || uniqueId}>
          {label}
        </Text>
      ) : null}
      <Stack gap={0.5}>
        <StyledContainer
          aria-disabled={disabled}
          data-error={!!error}
          size={size}
          className={className}
          data-testid={dataTestId}
        >
          <Tooltip text={isMinusDisabled && disabledTooltip}>
            <StyledSelectButton
              onClick={offsetFn(-1)}
              disabled={isMinusDisabled}
              aria-label="Minus"
              type="button"
              variant="ghost"
              sentiment="primary"
              size="small"
            >
              <Icon
                name="minus"
                size={iconSizes[size]}
                color="primary"
                disabled={isMinusDisabled}
              />
            </StyledSelectButton>
          </Tooltip>

          <StyledCenterBox
            size={size}
            onClick={() => {
              if (inputRef?.current) {
                inputRef.current.focus()
              }
            }}
            aria-live="assertive"
            role="status"
          >
            <StyledInput
              disabled={disabled}
              name={name}
              onBlur={handleOnBlur}
              onChange={handleChange}
              onFocus={handleOnFocus}
              onKeyDown={onKeyDown}
              ref={inputRef}
              style={{
                width: inputWidth,
              }}
              value={
                currentValue !== undefined ? currentValue.toString() : undefined
              } // A dom element can only have string attributes.
              type="number"
              id={id || uniqueId}
              aria-label={!label && !ariaLabel ? 'Number Input' : ariaLabel}
              aria-describedby={ariaDescribedBy}
              placeholder={placeholder}
            />
            {currentValue !== undefined ? (
              <StyledText disabled={disabled}>{text}</StyledText>
            ) : null}
          </StyledCenterBox>

          <Tooltip text={isPlusDisabled && disabledTooltip}>
            <StyledSelectButton
              onClick={offsetFn(1)}
              disabled={isPlusDisabled}
              aria-label="Plus"
              type="button"
              variant="ghost"
              sentiment="primary"
              size="small"
            >
              <Icon
                name="plus"
                size={iconSizes[size]}
                color="primary"
                disabled={isPlusDisabled}
              />
            </StyledSelectButton>
          </Tooltip>
        </StyledContainer>
        {typeof error === 'string' ? (
          <Text as="span" variant="bodySmall" color="danger" prominence="weak">
            {error}
          </Text>
        ) : null}
      </Stack>
    </Stack>
  )
}
