import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'

const styles = {
  input: error => css`
    border: solid 1px ${error ? theme.red : theme.gray300};
    font-size: 24px;
    color: ${error ? theme.red : theme.gray700};
    text-align: center;
    border-radius: 4px;
    margin-right: 8px;
    width: 56px;
    height: 64px;

    &:last-child {
      margin-right: 0;
    }

    &::placeholder {
      color: ${theme.gray300};
    }
  `,
}

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

export const VerificationCode = ({
  disabled,
  error,
  fields,
  initialValue,
  inputId,
  inputStyle,
  onChange,
  onComplete,
  placeholder,
  required,
  type,
  ...props
}) => {
  const valuesArray = Object.assign(
    new Array(fields).fill(''),
    initialValue.substring(0, fields).split(''),
  )
  const [values, setValues] = useState(valuesArray)

  const inputRefs = Array.from(Array(fields), React.createRef)

  const triggerChange = inputValues => {
    const stringValue = inputValues.join('')
    if (onChange) {
      onChange(stringValue)
    }
    if (onComplete && stringValue.length >= fields) {
      onComplete(stringValue)
    }
  }

  const inputOnChange = e => {
    const index = parseInt(e.target.dataset.id, 10)
    if (type === 'number') {
      e.target.value = e.target.value.replace(/[^\d]/gi, '')
    }
    const newValues = [...values]

    if (
      e.target.value === '' ||
      (type === 'number' && !e.target.validity.valid)
    ) {
      newValues[index] = ''
      setValues(newValues)
      return
    }

    const { value } = e.target
    const sanitizedValue = value[0] // in case more than 1 char, we just take the first one
    newValues[index] = sanitizedValue
    setValues(newValues)
    const nextIndex = Math.min(index + 1, fields - 1)
    const next = inputRefs[nextIndex]

    if (next) {
      next.current.focus()
    }

    triggerChange(newValues)
  }

  const inputOnKeyDown = e => {
    const index = parseInt(e.target.dataset.id, 10)
    const prevIndex = index - 1
    const nextIndex = index + 1
    const first = inputRefs[0]
    const last = inputRefs[inputRefs.length - 1]
    const prev = inputRefs[prevIndex]
    const next = inputRefs[nextIndex]
    const vals = [...values]
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault()
        if (values[index]) {
          vals[index] = ''
          setValues(vals)
          triggerChange(vals)
        } else if (prev) {
          vals[prevIndex] = ''
          prev.current.focus()
          setValues(vals)
          triggerChange(vals)
        }
        break
      case KEY_CODE.left:
        e.preventDefault()
        if (prev) {
          prev.current.focus()
        }
        break
      case KEY_CODE.right:
        e.preventDefault()
        if (next) {
          next.current.focus()
        }
        break
      case KEY_CODE.up:
        e.preventDefault()
        if (first) {
          first.current.focus()
        }
        break
      case KEY_CODE.down:
        e.preventDefault()
        if (last) {
          last.current.focus()
        }
        break
      default:
        break
    }
  }

  const inputOnFocus = e => {
    e.target.select(e)
  }

  return (
    <Box {...props}>
      {values.map((value, index) => (
        <input
          css={[styles.input(error), inputStyle]}
          type={type === 'number' ? 'tel' : type}
          pattern={type === 'number' ? '[0-9]*' : null}
          key={`${inputId}-${index}`}
          data-id={index}
          value={value}
          id={inputId ? `${inputId}-${index}` : null}
          ref={inputRefs[index]}
          onChange={inputOnChange}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder?.[index] ?? ''}
        />
      ))}
    </Box>
  )
}

VerificationCode.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fields: PropTypes.number,
  initialValue: PropTypes.string,
  inputId: PropTypes.string,
  inputStyle: PropTypes.string,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number']),
}

VerificationCode.defaultProps = {
  disabled: false,
  error: false,
  fields: 4,
  initialValue: '',
  inputId: 'verification-code',
  inputStyle: '',
  onChange: () => {},
  onComplete: () => {},
  placeholder: '',
  required: false,
  type: 'number',
}
