import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React, { useRef, useCallback, useState } from 'react'
import { white, gray100, gray350, gray550, gray700 } from 'theming'
import { cx } from 'utils'
import { Icon } from 'components/Icon'
import { Touchable } from 'components/Touchable'

function bounded(value, min, max) {
  return value > max ? max : value < min ? min : value
}

function parseIntOr(str, fallback) {
  const value = Number.parseInt(str, 10)
  return !Number.isNaN(value) ? value : fallback
}

function preventNonDigitsKey(event) {
  // `event.which` and `event.keyCode` are deprecated
  // see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
  const keyCode = event.key.charCodeAt(0)
  if (keyCode < 48 || keyCode > 57) {
    event.preventDefault()
  }
}

const styles = {
  container: p => css`
    height: 48px;
    background-color: ${white(p)};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 500;
  `,
  center: p => css`
    flex: 1;
    flex-direction: row;
    height: 100%;
    border-width: 1px;
    align-items: center;
    justify-content: center;
    border-color: ${gray350(p)};
    border-style: solid;
  `,
  input: p => css`
    pointer-events: none;
    color: ${gray700(p)};
    background-color: ${white(p)};
    border: 0;
    font-size: 16px;
    font-weight: 500;
    text-align: right;
    outline: none;
    position: relative;
    margin-right: 4px;
    max-width: 100%;
  `,
  button: p => css`
    border: 1px solid ${gray350(p)};
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-right: 16px;
    padding-left: 16px;
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
  disabled: p => css`
    background-color: ${gray100(p)};
    cursor: default;
    border: 0;
    color: ${gray550(p)};
    opacity: 1;
  `,
}

export function Stepper({
  unit = '',
  disabled,
  minValue = 0,
  maxValue = 100,
  name,
  step = 1,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) {
  const instance = useRef({})
  const [inputValue, setInputValue] = useState(String(value))
  Object.assign(instance.current, {
    minValue,
    maxValue,
    step,
    value,
    onChange,
    onBlur,
    inputValue,
  })
  const inputRef = useRef()
  const handleEdit = useCallback(() => inputRef.current.focus(), [])
  const handleInputChange = useCallback(
    event => setInputValue(event.target.value),
    [],
  )
  const handleInputBlur = useCallback(event => {
    const {
      value,
      minValue,
      maxValue,
      step,
      inputValue,
      onChange,
      onBlur,
    } = instance.current
    const boundedValue = bounded(parseIntOr(inputValue, 0), minValue, maxValue)
    const validValue = Math.round(boundedValue / step) * step
    setInputValue(String(validValue))

    if (value !== validValue) {
      onChange(validValue)
    }

    if (onBlur) {
      onBlur(event)
    }
  }, [])

  const changeValue = useCallback(value => {
    const { onChange } = instance.current
    onChange(value)
    setInputValue(String(value))
  }, [])

  const decrement = useCallback(() => {
    const { value, step } = instance.current
    const newValue = value - step
    changeValue(newValue)
  }, [changeValue])

  const increment = useCallback(() => {
    const { value, step } = instance.current
    const newValue = value + step
    changeValue(newValue)
  }, [changeValue])

  return (
    <Box {...props} css={cx(styles.container)}>
      <Touchable
        css={cx([
          styles.button,
          styles.leftButton,
          disabled && styles.disabled,
        ])}
        onClick={decrement}
        disabled={value <= minValue || disabled}
        aria-label="minus"
      >
        <Icon
          name="minus"
          size={28}
          color={value <= minValue || disabled ? 'gray550' : 'primary'}
        />
      </Touchable>

      <Touchable
        css={cx([styles.center, disabled && styles.disabled])}
        onClick={handleEdit}
        onFocus={handleEdit}
      >
        <input
          ref={inputRef}
          css={cx([styles.input, disabled && styles.disabled])}
          name={name}
          onChange={handleInputChange}
          onFocus={onFocus}
          onKeyPress={preventNonDigitsKey}
          onBlur={handleInputBlur}
          value={inputValue} // A dom element can only have string attributes.
          disabled={disabled}
          style={{ width: inputValue.length * 10 + 15 }}
        />

        <span css={cx([styles.input, disabled && styles.disabled])}>
          {unit}
        </span>
      </Touchable>

      <Touchable
        css={cx([
          styles.button,
          styles.rightButton,
          disabled && styles.disabled,
        ])}
        onClick={increment}
        disabled={value >= maxValue || disabled}
        aria-label="plus"
      >
        <Icon
          name="plus"
          size={28}
          color={value >= maxValue || disabled ? 'gray550' : 'primary'}
        />
      </Touchable>
    </Box>
  )
}

Stepper.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  unit: PropTypes.node,
  disabled: PropTypes.bool,
  step: PropTypes.number,
}
