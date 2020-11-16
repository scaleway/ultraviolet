import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect } from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Touchable } from '../Touchable'

const bounded = (value, min, max) => Math.max(min, Math.min(value, max))

const parseIntOr = (str, fallback) => {
  const value = Number.parseInt(str, 10)
  return !Number.isNaN(value) ? value : fallback
}

const preventNonDigitsKey = event => {
  // `event.which` and `event.keyCode` are deprecated
  // see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
  const keyCode = event.key.charCodeAt(0)
  if (keyCode < 48 || keyCode > 57) {
    event.preventDefault()
  }
}

const roundStep = (value, step) => Math.ceil(value / step) * step

const styles = {
  container: css({
    height: 48,
    backgroundColor: theme.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    fontWeight: 500,
  }),
  center: css`
    flex: 1;
    flex-direction: row;
    height: 100%;
    align-items: center;
    outline: none;
    justify-content: center;
    border: 1px solid ${theme.gray350};

    border-left-width: 0;
    border-right-width: 0;
  `,
  input: css`
    pointer-events: none;
    color: ${theme.gray700};
    background-color: ${theme.white};
    font-size: 16;
    border: none;
    text-align: right;
    outline: none;
    position: relative;
    margin-right: 4;
    max-width: 100%;
    font-weight: 500;
    text-align: center;
  `,
  button: isDisabled => css`
    border: 1px solid ${theme.gray350};

    justify-content: center;
    align-items: center;
    height: 100%;
    padding-right: 16px;
    padding-left: 16px;
    position: relative;

    :hover,
    :focus {
      > svg {
        fill: ${!isDisabled && theme.primary};
      }
    }
  `,
  leftButton: css`
    border-right-width: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  `,
  rightButton: css`
    border-left-width: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  `,
  disabled: css`
    background-color: ${theme.gray100};
    border: none;
    color: ${theme.gray550};
    opacity: 1;
    cursor: not-allowed;
  `,
  separator: css`
    position: absolute;
    font-size: 30px;
    top: 5px;
    font-weight: 500;
    color: ${theme.gray350};
  `,
}

const Stepper = ({
  text,
  disabled,
  minValue,
  maxValue,
  name,
  step,
  value,
  onChange,
  onFocus,
  onBlur,
  onMinCrossed,
  onMaxCrossed,
  ...props
}) => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState(parseIntOr(value, minValue))

  useEffect(() => {
    if (onChange) {
      onChange(inputValue)
    }
  }, [inputValue])

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
    <Box {...props} css={styles.container}>
      <Touchable
        css={[
          styles.button(isMinusDisabled),
          styles.leftButton,
          disabled && styles.disabled,
        ]}
        onClick={offsetFn(-1)}
        disabled={isMinusDisabled}
        aria-label="Minus"
      >
        <Icon name="minus" size={28} color="lightGrey" />

        <span
          css={[
            styles.separator,
            css`
              right: 0;
            `,
          ]}
        >
          |
        </span>
      </Touchable>

      <Touchable
        css={[styles.center, disabled && styles.disabled]}
        activeOpacity={0.5}
        onClick={() => {
          if (inputRef?.current) {
            inputRef.current.focus()
          }
        }}
      >
        <input
          ref={inputRef}
          css={[styles.input, disabled && styles.disabled]}
          name={name}
          onChange={handleChange}
          onFocus={handleOnFocus}
          onKeyPress={preventNonDigitsKey}
          onBlur={handleOnBlur}
          value={inputValue.toString()} // A dom element can only have string attributes.
          disabled={disabled}
          style={{ width: inputValue.toString().length * 10 + 15 }}
        />

        <span css={[styles.input, disabled && styles.disabled]}>{text}</span>
      </Touchable>

      <Touchable
        css={[
          styles.button(isPlusDisabled),
          styles.rightButton,
          disabled && styles.disabled,
        ]}
        onClick={offsetFn(1)}
        disabled={isPlusDisabled}
        aria-label="Plus"
      >
        <span
          css={[
            styles.separator,
            css`
              left: 0;
            `,
          ]}
        >
          |
        </span>
        <Icon name="plus" size={28} color="lightGrey" />
      </Touchable>
    </Box>
  )
}

Stepper.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  name: PropTypes.string,
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

export { Stepper }
