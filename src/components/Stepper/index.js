import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { onKeyOnlyNumbers } from '../../helpers/keycode'
import { parseIntOr } from '../../helpers/numbers'
import { colors } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Touchable } from '../Touchable'

const bounded = (value, min, max) => Math.max(min, Math.min(value, max))

const roundStep = (value, step) => Math.ceil(value / step) * step

const styles = {
  container: size => css`
    background-color: ${colors.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    font-weight: 500;
    height: ${{
      large: '48px',
      medium: '40px',
      small: '32px',
    }[size]};
  `,

  leftButton: size => css`
    border-right-width: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-radius: 4px 0 0 4px;
    padding: 0
      ${{
        large: '16px',
        medium: '10px',
        small: '4px',
      }[size]};
    border-right: ${size === 'large' ? '0' : '1px'} solid ${colors.gray350};
  `,

  rightButton: size => css`
    border-left-width: 0;
    border-radius: 0 4px 4px 0;
    padding: 0
      ${{
        large: '16px',
        medium: '10px',
        small: '4px',
      }[size]};
    border-left: ${size === 'large' ? '0' : '1px'} solid ${colors.gray350};
  `,

  separator: size => css`
    position: absolute;
    font-size: 30px;
    top: 7px;
    font-weight: 500;
    color: ${colors.gray350};
    ${size !== 'large' ? 'display: none' : ''};
  `,

  iconSize: size => (size === 'large' ? 28 : 18),

  center: css`
    flex: 1;
    flex-direction: row;
    height: 100%;
    align-items: center;
    outline: none;
    justify-content: center;
    border: 1px solid ${colors.gray350};

    border-left-width: 0;
    border-right-width: 0;
  `,
  input: css`
    pointer-events: none;
    color: ${colors.gray700};
    background-color: ${colors.white};
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
    border: 1px solid ${colors.gray350};

    justify-content: center;
    align-items: center;
    height: 100%;
    padding-right: 16px;
    padding-left: 16px;
    position: relative;

    :hover,
    :focus {
      > svg {
        fill: ${!isDisabled && colors.primary};
      }
    }
  `,
  disabled: css`
    background-color: ${colors.gray100};
    border: none;
    color: ${colors.gray550};
    opacity: 1;
    cursor: not-allowed;
  `,
}

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
    <Box {...props} css={styles.container(size)}>
      <Touchable
        css={[
          styles.button(isMinusDisabled),
          styles.leftButton(size),
          disabled && styles.disabled,
        ]}
        onClick={offsetFn(-1)}
        disabled={isMinusDisabled}
        aria-label="Minus"
      >
        <Icon name="minus" size={styles.iconSize(size)} color="gray300" />

        <span
          css={[
            styles.separator(size),
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
        px={1}
        aria-label="Input"
      >
        <input
          css={[styles.input, disabled && styles.disabled]}
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

        <span css={[styles.input, disabled && styles.disabled]}>{text}</span>
      </Touchable>

      <Touchable
        css={[
          styles.button(isPlusDisabled),
          styles.rightButton(size),
          disabled && styles.disabled,
        ]}
        onClick={offsetFn(1)}
        disabled={isPlusDisabled}
        aria-label="Plus"
      >
        <span
          css={[
            styles.separator(size),
            css`
              left: 0;
            `,
          ]}
        >
          |
        </span>
        <Icon name="plus" size={styles.iconSize(size)} color="gray300" />
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
