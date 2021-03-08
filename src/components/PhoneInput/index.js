import styled from '@emotion/styled'
import intlTelInput from 'intl-tel-input'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import 'intl-tel-input/build/css/intlTelInput.css'
import 'intl-tel-input/build/js/utils'

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  border-radius: 4px;
  border: 1px solid ${({ theme: { colors } }) => colors.gray350};
  padding: 0.8rem 0rem;

  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

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
    flex-grow: 1;

    .iti__selected-flag {
      background-color: inherit;
      outline: none;

      &:hover,
      &:focus {
        background-color: inherit;
      }
    }

    .iti__flag-container {
      cursor: ${({ disabled, disableDropdown }) =>
        disabled || disableDropdown ? 'not-allowed' : 'inherit'};
      pointer-events: ${({ disabled, disableDropdown }) =>
        disabled || disableDropdown ? 'none' : 'inherit'};
    }

    .iti__selected-dial-code {
      padding-left: 5px;
    }

    input {
      height: 100%;
      border: none;
      outline: none;
      width: 100%;

      &:disabled {
        cursor: not-allowed;
        pointer-events: none;
        background-color: inherit;
      }
    }
  }
`

const PhoneInput = ({
  disabled,
  disableDropdown,
  inputProps: { name, id, placeholder, dataTestid },
  onChange,
  value,
  label,
}) => {
  const inputRef = useRef()

  const formatIntlTelInput = () => {
    const { intlTelInputUtils, intlTelInputGlobals } = window
    const iti = intlTelInputGlobals.getInstance(inputRef.current)
    if (typeof intlTelInputUtils !== 'undefined') {
      // utils are lazy loaded, so must check
      const currentText = iti.getNumber(intlTelInputUtils.numberFormat.E164)
      if (typeof currentText === 'string') {
        // sometimes the currentText is an object :)
        iti.setNumber(currentText) // will autoformat because of formatOnDisplay=true
      }
    }
  }

  useEffect(() => {
    const inputElement = inputRef.current

    if (inputElement) {
      intlTelInput(inputElement, {
        customContainer: 'input__tel__container',
        initialCountry: 'US',
        autoPlaceholder: 'aggressive',
        formatOnDisplay: true,
        nationalMode: false,
        separateDialCode: false,
      })
    }
  }, [inputRef])

  return (
    <StyledLabel
      disableDropdown={disableDropdown}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <span>{label}</span>
      <input
        onKeyUp={formatIntlTelInput}
        onChange={event => {
          formatIntlTelInput()
          const { intlTelInputGlobals } = window
          const iti = intlTelInputGlobals.getInstance(inputRef.current)
          onChange?.(event, iti)
        }}
        type="tel"
        ref={inputRef}
        value={value}
        name={name}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={15}
        data-testid={dataTestid}
      />
    </StyledLabel>
  )
}

PhoneInput.propTypes = {
  disabled: PropTypes.bool,
  disableDropdown: PropTypes.bool,
  inputProps: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    dataTestid: PropTypes.string,
  }),
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
}

PhoneInput.defaultProps = {
  disabled: false,
  disableDropdown: false,
  inputProps: {},
  onChange: undefined,
  value: undefined,
  label: 'Phone',
}

export default PhoneInput
