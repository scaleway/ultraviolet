import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import parseIntOr from '../../helpers/numbers'
import Box from '../Box'
import Icon from '../Icon'
import Touchable from '../Touchable'

const bounded = (value, min, max) => Math.max(min, Math.min(value, max))

const roundStep = (value, step) => Math.ceil(value / step) * step

const disabledStyles = ({ disabled, theme }) =>
  disabled &&
  `
    background-color: ${theme.colors.gray100};
    border: none;
    color: ${theme.colors.gray550};
    opacity: 1;
    cursor: not-allowed;
  `

const containerSizes = {
  large: 48,
  medium: 40,
  small: 32,
}

const iconSizes = {
  large: 26,
  medium: 24,
  small: 22,
}

const StyledIcon = styled(Icon)``

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: prop => !['position', 'size'].includes(prop),
})`
  justify-content: center;
  align-items: center;
  height: calc(100% - 8px);
  position: relative;
  border-radius: 4px;
  width: ${({ size }) => containerSizes[size] - 10}px;

  > ${StyledIcon} {
    fill: ${({ disabled, theme }) => !disabled && theme.colors.primary};
  }

  :hover:not([disabled]) {
    background: ${({ theme }) => theme.colors.gray200};
  }

  margin: 0 4px;
`

const StyledCenterTouchable = styled(Touchable)`
  flex: 1;
  flex-direction: row;
  height: calc(100% - 8px);
  align-items: center;
  outline: none;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid transparent;
  :hover:not([disabled], :focus) {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  :focus-within:not([disabled]) {
    box-shadow: 0 0 2px 2px
      ${({ theme }) => transparentize(0.7, theme.colors.primary)};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  max-width: calc(100% - ${({ size }) => containerSizes[size] * 2}px);
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.gray700};
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

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray100 : theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  font-weight: 500;
  height: ${({ size }) => containerSizes[size]}px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  ${({ disabled, theme }) =>
    disabled &&
    `
    > ${StyledTouchable}, ${StyledInput}, ${StyledCenterTouchable} {
      ${disabledStyles({ disabled, theme })}
    }
  `}
`

const Stepper = ({
  disabled,
  maxValue,
  minValue,
  name,
  onBlur,
  onChange,
  onFocus,
  onMaxCrossed,
  onMinCrossed,
  size,
  step,
  text,
  value,
  ...props
}) => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState(parseIntOr(value, minValue))

  useEffect(() => {
    if (onChange) {
      onChange(inputValue)
    }
  }, [inputValue, onChange])

  const offsetFn = direction => () => {
    setInputValue(currentValue => {
      const newValue = currentValue + step * direction
      const boundedValue = bounded(
        newValue,
        parseInt(minValue, 10),
        parseInt(maxValue, 10),
      )

      return boundedValue
    })
  }

  const handleChange = event => {
    event.stopPropagation()
    setInputValue(parseIntOr(event.currentTarget.value, 0))
  }

  const handleOnFocus = event => {
    if (onFocus) onFocus(event)
  }

  const handleOnBlur = event => {
    setInputValue(currentValue => {
      const properVal = roundStep(currentValue, step)
      if (properVal < minValue) {
        if (onMinCrossed) onMinCrossed()

        return minValue
      }

      if (inputValue > maxValue) {
        if (onMaxCrossed) onMaxCrossed()

        return maxValue
      }

      return properVal
    })

    if (onBlur) onBlur(event)
  }

  const onKeyDown = e => {
    // Arrow Up
    if (e.keyCode === 38) {
      e.stopPropagation()
      e.preventDefault()
      if (inputValue + step <= maxValue) {
        setInputValue(inputValue + step)
      }
    }

    // Arrow Down
    if (e.keyCode === 40) {
      e.stopPropagation()
      e.preventDefault()
      if (inputValue - step >= minValue) {
        setInputValue(inputValue - step)
      }
    }
  }

  const isMinusDisabled = inputValue <= minValue || disabled
  const isPlusDisabled = inputValue >= maxValue || disabled

  return (
    <StyledContainer disabled={disabled} size={size} {...props}>
      <StyledTouchable
        onClick={offsetFn(-1)}
        size={size}
        position="left"
        disabled={isMinusDisabled}
        aria-label="Minus"
      >
        <StyledIcon name="minus" size={iconSizes[size]} color="gray300" />
      </StyledTouchable>

      <StyledCenterTouchable
        size={size}
        activeOpacity={0.5}
        disabled={disabled}
        onClick={() => {
          if (inputRef?.current) {
            inputRef.current.focus()
          }
        }}
        aria-label="Input"
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
        />

        <StyledInput disabled={disabled} as="span">
          {text}
        </StyledInput>
      </StyledCenterTouchable>

      <StyledTouchable
        position="right"
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
  size: PropTypes.string,
  step: PropTypes.number,
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Stepper.defaultProps = {
  disabled: false,
  maxValue: 100,
  minValue: 0,
  name: 'stepper',
  onBlur: null,
  onChange: null,
  onFocus: null,
  onMaxCrossed: null,
  onMinCrossed: null,
  size: 'large',
  step: 1,
  text: '',
  value: null,
}

export default Stepper
