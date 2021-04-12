import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import intlTelInput from 'intl-tel-input'
import style from 'intl-tel-input/build/css/intlTelInput.css'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import 'intl-tel-input/build/js/utils'
import flags from './flags.png'
import flags2x from './flags@2x.png'

const StyledSpan = styled.span`
  position: absolute;
  top: -11px;
  left: 10px;
  font-size: 14px;
  padding: 0 10px;
  background-color: ${({ theme: { colors } }) => colors.white};
`

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

    .iti__flag {
      background-image: url(${flags});
    }

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      .iti__flag {
        background-image: url(${flags2x});
      }
    }
  }
`

const StyledInput = styled.input`
  height: 100%;
  border: none;
  outline: none;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: inherit;
  }
`

const PhoneInput = ({
  disabled,
  disableDropdown,
  inputProps: { name, id, placeholder, ...inputProps },
  onChange,
  value,
  label,
}) => {
  const inputRef = useRef()

  const formatIntlTelInput = () => {
    const { intlTelInputUtils, intlTelInputGlobals } = window
    const iti = intlTelInputGlobals.getInstance(inputRef.current)
    if (typeof intlTelInputUtils !== 'undefined' && iti) {
      const currentText = iti.getNumber(
        intlTelInputUtils.numberFormat.INTERNATIONAL,
      )
      if (typeof currentText === 'string') {
        iti.setNumber(currentText)
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
    <>
      <Global styles={style} />
      <StyledLabel
        disableDropdown={disableDropdown}
        disabled={disabled}
        aria-disabled={disabled}
      >
        <StyledSpan>{label}</StyledSpan>
        <StyledInput
          onKeyUp={formatIntlTelInput}
          onChange={event => {
            const { intlTelInputGlobals } = window
            const iti = intlTelInputGlobals.getInstance(inputRef.current)
            onChange?.(event, iti)
          }}
          type="tel"
          ref={inputRef}
          value={value}
          name={name}
          id={id}
          maxLength={50}
          disabled={disabled}
          placeholder={placeholder}
          data-testid={inputProps['data-testid']}
        />
      </StyledLabel>
    </>
  )
}

PhoneInput.propTypes = {
  disabled: PropTypes.bool,
  disableDropdown: PropTypes.bool,
  inputProps: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    'data-testid': PropTypes.string,
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
