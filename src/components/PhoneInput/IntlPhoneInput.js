import styled from '@emotion/styled'
import intlTelInput from 'intl-tel-input'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import 'intl-tel-input/build/css/intlTelInput.css'
import 'intl-tel-input/build/js/utils'

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  border-radius: 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.gray350};
  padding: 0.8rem 0rem;
  cursor: ${({ disabled, disableDropdown }) =>
    disabled || disableDropdown ? 'not-allowed' : 'inherit'};
  pointer-events: ${({ disabled, disableDropdown }) =>
    disabled || disableDropdown ? 'none' : 'inherit'};

  &:focus-within {
    border: 1px solid ${({ theme: { colors } }) => colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme: { colors } }) => transparentize(0.75, colors.primary)};
  }

  & > span {
    position: absolute;
    top: -11px;
    left: 10px;
    font-size: 14px;
    padding: 0 10px;
    background-color: ${({ theme: { colors } }) => colors.white};
  }

  & .input__tel__container {
    border: none;
    width: calc(100%-2px);
    cursor: ${({ disabled, disableDropdown }) =>
      disabled || disableDropdown ? 'not-allowed' : 'inherit'};
    pointer-events: ${({ disabled, disableDropdown }) =>
      disabled || disableDropdown ? 'none' : 'inherit'};
    flex-grow: 1;

    .iti__selected-flag {
      background-color: white;
      outline: none;

      &:hover,
      &:focus {
        background-color: white;
      }
    }

    .iti__selected-dial-code {
      padding-left: 5px;
    }

    input {
      height: 100%;
      border: none;
      outline: none;
      width: 100%;
    }
  }
`

const PhoneInput = ({
  disabled,
  disableDropdown,
  inputProps: { name, id },
  onChange,
  value,
  label,
}) => {
  const [visited, setVisited] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    setVisited(visited || (!!value && value.length > 0))
  }, [value, visited])

  const handleFocus = () => {
    setVisited(true)
  }

  React.useEffect(() => {
    let keyUpEL
    let changeEL
    const inputElement = inputRef.current

    if (inputElement) {
      const iti = intlTelInput(inputElement, {
        customContainer: 'input__tel__container',
        initialCountry: 'US',
        autoPlaceholder: 'aggressive',
        formatOnDisplay: true,
        nationalMode: false,
        separateDialCode: true,
      })

      const formatIntlTelInput = () => {
        const { intlTelInputUtils } = window
        if (typeof intlTelInputUtils !== 'undefined') {
          // utils are lazy loaded, so must check
          const currentText = iti.getNumber(intlTelInputUtils.numberFormat.E164)
          if (typeof currentText === 'string') {
            // sometimes the currentText is an object :)
            iti.setNumber(currentText) // will autoformat because of formatOnDisplay=true
          }
        }
      }

      keyUpEL = inputElement.addEventListener('keyup', formatIntlTelInput)
      changeEL = inputElement.addEventListener('change', formatIntlTelInput)
    }

    return () => {
      if (inputElement) {
        if (keyUpEL) inputElement.removeEventListener('keyup', keyUpEL)
        if (changeEL) inputElement.removeEventListener('change', changeEL)
      }
    }
  }, [inputRef])

  return (
    <StyledLabel disableDropdown={disableDropdown} disabled={disabled}>
      <span>{label}</span>
      <input
        onChange={onChange}
        onFocus={handleFocus}
        type="tel"
        ref={inputRef}
        value={value}
        name={name}
        id={id}
        disabled={disabled}
      />
    </StyledLabel>
  )
}

PhoneInput.propTypes = {
  disabled: PropTypes.bool,
  disableDropdown: PropTypes.bool,
  inputProps: PropTypes.objectOf(PropTypes.bool),
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
}

PhoneInput.defaultProps = {
  disabled: false,
  disableDropdown: false,
  inputProps: {},
  onChange: () => {},
  value: '',
  label: 'Phone',
}

export default PhoneInput
