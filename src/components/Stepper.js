import React, { useRef, useCallback, useState } from 'react'
import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import { white, gray100, gray350, gray550, gray700 } from 'theming'
import { cx } from 'utils'
import { Icon } from './Icon'
import { Touchable } from './Touchable'

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
  text = '',
  disabled,
  minValue,
  maxValue,
  name,
  step = 1,
  value,
  onChange,
  onFocus,
  onBlur,
  minusDisabled,
  plusDisabled,
  ...props
}) {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState(String(value))
  const handleEditClick = useCallback(() => inputRef.current.focus(), [])
  const handleInputChange = useCallback(
    event => setInputValue(event.target.value),
    [],
  )
  const handleInputBlur = useCallback(
    event => {
      const boundedValue = bounded(
        parseIntOr(inputValue, 0),
        minValue,
        maxValue,
      )
      const validValue = Math.round(boundedValue / step) * step
      setInputValue(String(validValue))

      if (value !== validValue) {
        onChange(validValue)
      }

      if (onBlur) {
        onBlur(event)
      }
    },
    [step, minValue, maxValue, onChange, value, inputValue, onBlur],
  )

  const changeValue = useCallback(
    value => {
      onChange(value)
      setInputValue(String(value))
    },
    [onChange],
  )

  const decrement = useCallback(() => {
    const newValue = value - step
    changeValue(newValue)
  }, [value, step, changeValue])

  const increment = useCallback(() => {
    const newValue = value + step
    changeValue(newValue)
  }, [value, step, changeValue])

  return (
    <Box {...props} css={cx(styles.container)}>
      <Touchable
        css={cx([
          styles.button,
          styles.leftButton,
          disabled && styles.disabled,
        ])}
        onClick={decrement}
        disabled={value <= minValue || disabled || minusDisabled}
        aria-label="minus"
      >
        <Icon
          name="minus"
          size={28}
          color={
            value <= minValue || disabled || minusDisabled
              ? 'gray550'
              : 'primary'
          }
        />
      </Touchable>

      <Touchable
        css={cx([styles.center, disabled && styles.disabled])}
        onClick={handleEditClick}
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
          {text}
        </span>
      </Touchable>

      <Touchable
        css={cx([
          styles.button,
          styles.rightButton,
          disabled && styles.disabled,
        ])}
        onClick={increment}
        disabled={value >= maxValue || disabled || plusDisabled}
        aria-label="plus"
      >
        <Icon
          name="plus"
          size={28}
          color={
            value >= maxValue || disabled || plusDisabled
              ? 'gray550'
              : 'primary'
          }
        />
      </Touchable>
    </Box>
  )
}
