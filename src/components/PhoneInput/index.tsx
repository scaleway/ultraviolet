import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import intlTelInput from 'intl-tel-input'
import style from 'intl-tel-input/build/css/intlTelInput.css'
import PropTypes from 'prop-types'
import {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'
import 'intl-tel-input/build/js/utils'
import flags from './flags.png'
import flags2x from './flags@2x.png'

const StyledSpan = styled.span`
  position: absolute;
  top: -11px;
  left: 10px;
  font-size: 14px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`

interface PhoneInputLabelProps {
  disabled?: boolean
  disableDropdown?: boolean
}

const StyledLabel = styled.label<PhoneInputLabelProps>`
  position: relative;
  display: flex;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: 0.8rem 0rem;

  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary.borderWeak};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  ul[role='listbox'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeakElevated};
    color: ${({ theme }) => theme.colors.neutral.text};
    box-shadow: ${({ theme }) => theme.shadows.menu};
    border: none;
  }

  .iti__divider {
    border-color: ${({ theme }) => theme.colors.neutral.border};
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

  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  color: ${({ theme }) => theme.colors.neutral.text};

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.neutral.textWeak};
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: inherit;
  }
`

type InputProps = Partial<
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'id' | 'placeholder'>
> & {
  'data-testid'?: string | null
}

type PhoneInputProps = PhoneInputLabelProps & {
  inputProps?: InputProps
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    iti: intlTelInput.Plugin,
  ) => void
  value?: string
  label?: string
}

const PhoneInput = ({
  disabled = false,
  disableDropdown = false,
  inputProps: { name, id, placeholder, 'data-testid': dataTestId } = {},
  onChange,
  value,
  label = 'Phone',
}: PhoneInputProps) => {
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>

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
        autoPlaceholder: 'aggressive',
        customContainer: 'input__tel__container',
        formatOnDisplay: true,
        initialCountry: 'US',
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
          data-testid={dataTestId}
        />
      </StyledLabel>
    </>
  )
}

PhoneInput.propTypes = {
  disabled: PropTypes.bool,
  /**
   * Will disable or not flag dropdown.
   */
  disableDropdown: PropTypes.bool,
  /**
   * You can set input properties trough this prop.
   */
  inputProps: PropTypes.shape({
    'data-testid': PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  }),
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default PhoneInput
