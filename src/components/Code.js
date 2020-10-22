import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { theme } from 'theme'
import { Box } from './Box'

const styles = {
  input: css`
    border: solid 1px ${theme.gray300};
    font-size: 24px;
    color: ${theme.gray700};
    text-align: center;
    border-radius: 4px;
    margin-right: 8px;
    width: 56px;
    height: 64px;

    &:last-child {
      margin-right: 0;
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

export const Code = ({
  inputId,
  fields,
  initialValue,
  onChange,
  onComplete,
  type,
  fieldHeight,
  fieldWidth,
  autoFocus,
  disabled,
  required,
  placeholder,
  inputStyle,
  ...props
}) => {
  let vals
  if (initialValue && initialValue.length) {
    vals = []
    for (let i = 0; i < fields; i += 1) {
      vals.push(initialValue[i] || '')
    }
  } else {
    vals = Array(fields).fill('')
  }
  const [values, setValues] = useState(vals)
  const [handleKeys, setHandleKeys] = useState({})

  const iRefs = []
  for (let i = 0; i < fields; i += 1) {
    iRefs.push(React.createRef())
  }

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
    setHandleKeys({ ...handleKeys, [index]: false })
    if (
      e.target.value === '' ||
      (type === 'number' && !e.target.validity.valid)
    ) {
      return
    }
    let next
    const { value } = e.target
    const newValues = [...values]
    if (newValues.length > 1) {
      let nextIndex = index + 1
      if (nextIndex >= fields) {
        nextIndex = fields - 1
      }
      next = iRefs[nextIndex]
      const split = value.split('')
      split.forEach((item, i) => {
        const cursor = index + i
        if (cursor < fields) {
          newValues[cursor] = item
        }
      })
      setValues(newValues)
    } else {
      next = iRefs[index + 1]
      newValues[index] = value
      setValues(newValues)
    }

    if (next) {
      next.current.focus()
      next.current.select()
    }

    triggerChange(newValues)
  }

  const inputOnKeyDown = e => {
    const index = parseInt(e.target.dataset.id, 10)
    const prevIndex = index - 1
    const nextIndex = index + 1
    const prev = iRefs[prevIndex]
    const next = iRefs[nextIndex]
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
      case KEY_CODE.down:
        e.preventDefault()
        break
      default:
        setHandleKeys({ ...handleKeys, [index]: true })
        break
    }
  }

  const inputOnKeyUp = e => {
    const index = parseInt(e.target.dataset.id, 10)
    if (handleKeys[index]) {
      setHandleKeys({ ...handleKeys, [index]: false })
      const next = iRefs[index + 1]
      if (next) {
        next.current.focus()
      }
    }
  }

  const inputOnFocus = e => {
    e.target.select(e)
  }

  return (
    <Box {...props}>
      {values.map((value, index) => (
        <input
          css={[styles.input, inputStyle]}
          type={type === 'number' ? 'tel' : type}
          pattern={type === 'number' ? '[0-9]*' : null}
          key={`${inputId}-${index}`}
          data-id={index}
          value={value}
          id={inputId ? `${inputId}-${index}` : null}
          ref={iRefs[index]}
          onChange={inputOnChange}
          onKeyDown={inputOnKeyDown}
          onKeyUp={inputOnKeyUp}
          onFocus={inputOnFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder[index]}
        />
      ))}
    </Box>
  )
}

Code.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  fields: PropTypes.number,
  inputId: PropTypes.string,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
}

Code.defaultProps = {
  type: 'number',
  fields: 4,
  disabled: false,
  required: false,
  placeholder: '0000',
}
