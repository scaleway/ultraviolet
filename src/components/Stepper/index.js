import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import onKeyOnlyNumbers from '../../helpers/keycode'
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
  large: '48px',
  medium: '40px',
  small: '32px',
}

const buttonSizes = {
  large: '16px',
  medium: '10px',
  small: '4px',
}

const StyledTouchable = styled(Touchable, {
  shouldForwardProp: prop => !['position', 'size'].includes(prop),
})`
  border: 1px solid ${({ theme }) => theme.colors.gray350};

  justify-content: center;
  align-items: center;
  height: 100%;
  padding-right: 16px;
  padding-left: 16px;
  position: relative;

  :hover,
  :focus {
    > svg {
      fill: ${({ disabled, theme }) => !disabled && theme.colors.primary};
    }
  }

  ${({ position, size, theme }) =>
    position === 'left'
      ? `
      border-right-width: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-radius: 4px 0 0 4px;
      padding: 0 ${buttonSizes[size]};
      border-right: ${size === 'large' ? '0' : '1px'} solid ${
          theme.colors.gray350
        };
    `
      : `
          border-left-width: 0;
          border-radius: 0 4px 4px 0;
          padding: 0 ${buttonSizes[size]};
          border-left: ${size === 'large' ? '0' : '1px'} solid ${
          theme.colors.gray350
        };
    `}
`

const StyledSeparator = styled('span', {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  position: absolute;
  font-size: 30px;
  top: 7px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray350};
  ${({ size }) => (size !== 'large' ? 'display: none' : '')};
`

const StyledCenterTouchable = styled(Touchable)`
  flex: 1;
  flex-direction: row;
  height: 100%;
  align-items: center;
  outline: none;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray350};

  border-left-width: 0;
  border-right-width: 0;
`

const StyledInput = styled.input`
  pointer-events: none;
  color: ${({ theme }) => theme.colors.gray700};
  background-color: ${({ theme }) => theme.colors.white};
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
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  font-weight: 500;
  height: ${({ size }) => containerSizes[size]};

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
        <Icon name="minus" size={size === 'large' ? 28 : 18} color="gray300" />

        <StyledSeparator size={size} style={{ right: 0 }}>
          |
        </StyledSeparator>
      </StyledTouchable>

      <StyledCenterTouchable
        activeOpacity={0.5}
        disabled={disabled}
        onClick={() => {
          if (inputRef?.current) {
            inputRef.current.focus()
          }
        }}
        px={1}
        aria-label="Input"
      >
        <StyledInput
          disabled={disabled}
          name={name}
          onBlur={handleOnBlur}
          onChange={handleChange}
          onFocus={handleOnFocus}
          onKeyPress={onKeyOnlyNumbers}
          ref={inputRef}
          style={{ width: inputValue.toString().length * 10 + 15 }}
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
        <StyledSeparator size={size} style={{ left: 0 }}>
          |
        </StyledSeparator>
        <Icon name="plus" size={size === 'large' ? 28 : 18} color="gray300" />
      </StyledTouchable>
    </StyledContainer>
  )
}

Stepper.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  name: PropTypes.string,
  size: PropTypes.string,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMinCrossed: PropTypes.func,
  onMaxCrossed: PropTypes.func,
}

Stepper.defaultProps = {
  minValue: 0,
  maxValue: 100,
  name: 'stepper',
  size: 'large',
  text: '',
  value: null,
  step: 1,
  disabled: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onMinCrossed: null,
  onMaxCrossed: null,
}

export default Stepper
