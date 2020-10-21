import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Box } from './Box'

const styles = {
  inputContainer: css`
    position: relative;
  `,

  input: css`
    > input {
      border: solid 1px #a8adb7;
      border-right: none;
      font-family: 'Lato';
      font-size: 20px;
      color: #525461;
      text-align: center;
      box-sizing: border-box;
      border-radius: 0;
      -webkit-appearance: initial;

      &:last-child {
        border-right: solid 1px #a8adb7;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }

      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      :focus + input {
        border-left: none;
      }
    }
  `,

  blur: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    opacity: 0.5;
    filter: blur(0.5px);
    transition: opacity 0.3s;
  `,

  title: css`
    margin: 0;
    height: 20px;
    padding-bottom: 10px;
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
  values: initialValues,
  onChange,
  onComplete,
  type,
  fieldHeight,
  fieldWidth,
  autoFocus,
  disabled,
  required,
  placeholder,
  ...props
}) => {
  let vals
  if (initialValues && initialValues.length) {
    vals = []
    for (let i = 0; i < fields; i += 1) {
      vals.push(initialValues[i] || '')
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

  const triggerChange = (values = values) => {
    const val = values.join('')
    if (onChange) {
      onChange(val)
    }
    if (onComplete && val.length >= fields) {
      onComplete(val)
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

  const INPUT_STYLE = {
    width: fieldWidth,
    height: fieldHeight,
  }

  return (
    <Box css={styles.inputContainer} {...props}>
      <Box css={styles.input}>
        {values.map((value, index) => (
          <input
            type={type === 'number' ? 'tel' : type}
            pattern={type === 'number' ? '[0-9]*' : null}
            // autoFocus={autoFocus && index === 0}
            style={INPUT_STYLE}
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
    </Box>
  )
}

Code.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  fields: PropTypes.number,
  fieldWidth: PropTypes.number,
  id: PropTypes.string,
  fieldHeight: PropTypes.number,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.arrayOf(PropTypes.string),
}

Code.defaultProps = {
  type: 'number',
  fields: 6,
  fieldWidth: 58,
  fieldHeight: 54,
  autoFocus: true,
  disabled: false,
  required: false,
  placeholder: [],
}
