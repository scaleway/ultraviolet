import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
} from 'react'
import parseIntOr from '../../helpers/numbers'
import Box from '../Box'
import Icon from '../Icon'
import Touchable from '../Touchable'

const bounded = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max))

const roundStep = (value: number, step: number, direction: number) =>
  direction === -1
    ? Math.floor(value / step) * step
    : Math.ceil(value / step) * step

const disabledStyles = ({
  disabled,
  theme,
}: {
  disabled: boolean
  theme: Theme
}) =>
  disabled &&
  `
    background-color: ${theme.colors.neutral.backgroundWeakDisabled};
    border: none;
    color: ${theme.colors.neutral.textWeakDisabled};
    opacity: 1;
    cursor: not-allowed;
  `

const containerSizes = {
  large: 48,
  medium: 40,
  small: 32,
}

type ContainerSizesType = keyof typeof containerSizes
export const containerSizesKeys = Object.keys(
  containerSizes,
) as ContainerSizesType[]

const iconSizes = {
  large: 26,
  medium: 24,
  small: 22,
}

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary.text};
`

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: prop => !['position', 'size'].includes(prop.toString()),
})<{ size: ContainerSizesType }>`
  justify-content: center;
  align-items: center;
  height: calc(100% - 8px);
  position: relative;
  border-radius: 4px;
  width: ${({ size }) => containerSizes[size] - 10}px;

  :hover:not([disabled]) {
    background: ${({ theme }) => theme.colors.primary.background};
  }

  margin: 0 4px;
`

const StyledCenterBox = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})<{ size: ContainerSizesType }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: calc(100% - 8px);
  align-items: center;
  outline: none;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid transparent;
  :hover:not([disabled], :focus) {
    border: 1px solid ${({ theme }) => theme.colors.primary.borderWeakHover};
  }
  :focus-within:not([disabled]) {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    border: 1px solid ${({ theme }) => theme.colors.primary.borderWeakHover};
  }
  max-width: calc(100% - ${({ size }) => containerSizes[size] * 2}px);
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.neutral.text};
  background-color: transparent;
  font-size: 16;
  border: none;
  text-align: right;
  outline: none;
  position: relative;
  margin-right: 4;
  max-width: 100%;
  font-weight: 500;
  text-align: center;
`

const StyledText = styled('span', {
  shouldForwardProp: prop => !['disabled'].includes(prop.toString()),
})<{ disabled: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.neutral.textWeakDisabled
      : theme.colors.neutral.text};
  user-select: none;
`

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})<{ disabled: boolean; size: ContainerSizesType }>`
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.neutral.backgroundWeakDisabled
      : theme.colors.neutral.backgroundWeak};
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  font-weight: 500;
  height: ${({ size }) => containerSizes[size]}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: 4px;
  ${({ disabled, theme }) =>
    disabled
      ? css`
          > ${StyledTouchable}, ${StyledInput}, ${StyledCenterBox} {
            ${disabledStyles({ disabled, theme })}
          }
        `
      : ''}
`

type StepperProps = {
  disabled?: boolean
  maxValue?: number
  minValue?: number
  name?: string
  onChange?(input: number): void
  onMaxCrossed?(): void
  onMinCrossed?(): void
  size?: ContainerSizesType
  step?: number
  text?: string | ReactNode
  value?: string | number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

const Stepper = ({
  disabled = false,
  maxValue = 100,
  minValue = 0,
  name = 'stepper',
  onChange,
  onFocus,
  onBlur,
  onMaxCrossed,
  onMinCrossed,
  size = 'large',
  step = 1,
  text,
  value,
  ...props
}: StepperProps) => {
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>
  const [inputValue, setInputValue] = useState(
    typeof value === 'number' ? value : parseIntOr(value, minValue),
  )

  const setValue = (newValue: number) => {
    setInputValue(newValue)
    onChange?.(newValue)
  }

  const offsetFn = (direction: number) => () => {
    const newValue =
      inputValue % step === 0 ? inputValue + step * direction : inputValue
    const roundedValue = roundStep(newValue, step, direction)
    setValue(roundedValue)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    event.stopPropagation()
    const parsedValue = parseIntOr(event.currentTarget.value, 0)
    setValue(parsedValue)
  }

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (onFocus) onFocus(event)
  }

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = event => {
    const boundedValue = bounded(inputValue, minValue, maxValue)

    if (inputValue > maxValue) onMaxCrossed?.()
    if (inputValue < minValue) onMinCrossed?.()

    setValue(boundedValue)

    if (onBlur) onBlur(event)
  }

  const onKeyDown: KeyboardEventHandler = e => {
    // Arrow Up
    if (e.keyCode === 38) {
      e.stopPropagation()
      e.preventDefault()

      const direction = 1
      const newValue =
        inputValue % step === 0 ? inputValue + step * direction : inputValue
      const roundedValue = roundStep(newValue, step, direction)

      if (roundedValue <= maxValue) {
        setValue(roundedValue)
      }
    }

    // Arrow Down
    if (e.keyCode === 40) {
      e.stopPropagation()
      e.preventDefault()

      const direction = -1

      const newValue =
        inputValue % step === 0 ? inputValue + step * direction : inputValue
      const roundedValue = roundStep(newValue, step, direction)

      if (roundedValue >= minValue) {
        setValue(roundedValue)
      }
    }
  }

  const minusRoundedValue =
    inputValue % step === 0
      ? roundStep(inputValue - step, step, -1)
      : roundStep(inputValue, step, -1)
  const plusRoundedValue =
    inputValue % step === 0
      ? roundStep(inputValue + step, step, 1)
      : roundStep(inputValue, step, 1)
  const isMinusDisabled = minusRoundedValue < minValue || disabled
  const isPlusDisabled = plusRoundedValue > maxValue || disabled

  return (
    <StyledContainer disabled={disabled} size={size} {...props}>
      <StyledTouchable
        onClick={offsetFn(-1)}
        size={size}
        disabled={isMinusDisabled}
        aria-label="Minus"
      >
        <StyledIcon name="minus" size={iconSizes[size]} />
      </StyledTouchable>

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
            width: inputValue.toString().length * 10 + 15,
          }}
          value={inputValue.toString()} // A dom element can only have string attributes.
          aria-label="Input"
        />
        {typeof text === 'string' ? (
          <StyledText disabled={disabled}>{text}</StyledText>
        ) : (
          text
        )}
      </StyledCenterBox>

      <StyledTouchable
        size={size}
        onClick={offsetFn(1)}
        disabled={isPlusDisabled}
        aria-label="Plus"
      >
        <StyledIcon name="plus" size={iconSizes[size]} />
      </StyledTouchable>
    </StyledContainer>
  )
}

Stepper.propTypes = {
  disabled: PropTypes.bool,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMaxCrossed: PropTypes.func,
  onMinCrossed: PropTypes.func,
  size: PropTypes.oneOf(containerSizesKeys),
  /**
   * Define how much will stepper increase / decrease each time you click on + / - button.
   */
  step: PropTypes.number,
  /**
   * Text displayed into component at the right of number value.
   */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Stepper
