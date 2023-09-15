import styled from '@emotion/styled'
import type {
  ChangeEvent,
  ClipboardEventHandler,
  FocusEventHandler,
  JSX,
  KeyboardEventHandler,
} from 'react'
import { createRef, useId, useState } from 'react'

const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.neutral.background};
  border: solid 1px
    ${({ 'aria-invalid': error, theme }) =>
      error ? theme.colors.danger.borderWeak : theme.colors.neutral.border};
  font-size: 24px;
  color: ${({ 'aria-invalid': error, theme }) =>
    error ? theme.colors.danger.textWeak : theme.colors.neutral.text};
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.default};
  margin-right: ${({ theme }) => theme.space['1']};
  width: 56px;
  height: 64px;
  outline-style: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus {
    border-color: ${({ 'aria-invalid': error, theme }) =>
      error
        ? theme.colors.danger.borderHover
        : theme.colors.primary.borderHover};
  }

  &:focus {
    box-shadow: ${({ 'aria-invalid': error, theme: { shadows } }) =>
      error ? shadows.focusDanger : shadows.focusPrimary};
  }

  &:last-child {
    margin-right: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }
`

type VerificationCodeProps = {
  disabled?: boolean
  error?: boolean
  className?: string
  /**
   * Amount of field you want
   */
  fields?: number
  initialValue?: string
  inputId?: string
  inputStyle?: string
  /**
   * Triggered when a field change
   */
  onChange?: (data: unknown) => void
  /**
   * Triggered when all fields are completed
   */
  onComplete?: (data: unknown) => void
  placeholder?: string
  required?: boolean
  /**
   * Type of the fields
   */
  type?: 'text' | 'number'
  'data-testid'?: string
  'aria-label'?: string
}

const DEFAULT_ON_FUNCTION = () => {}

/**
 * Verification code allows you to enter a code in multiple fields (4 by default).
 */
export const VerificationCode = ({
  disabled = false,
  className,
  error = false,
  fields = 4,
  initialValue = '',
  inputId,
  inputStyle = '',
  onChange = DEFAULT_ON_FUNCTION,
  onComplete = DEFAULT_ON_FUNCTION,
  placeholder = '',
  required = false,
  type = 'number',
  'data-testid': dataTestId,
  'aria-label': ariaLabel = 'Verification code',
}: VerificationCodeProps): JSX.Element => {
  const uniqueId = useId()
  const valuesArray = Object.assign(
    new Array(fields).fill(''),
    initialValue.substring(0, fields).split(''),
  )
  const [values, setValues] = useState<string[]>(valuesArray)

  const inputRefs = Array.from({ length: fields }, () =>
    createRef<HTMLInputElement>(),
  )

  const triggerChange = (inputValues: string[]) => {
    const stringValue = inputValues.join('')
    if (onChange) {
      onChange(stringValue)
    }
    if (onComplete && stringValue.length >= fields) {
      onComplete(stringValue)
    }
  }

  const inputOnChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      let { value } = event.target
      if (type === 'number') {
        value = event.target.value.replace(/[^\d]/gi, '')
      }
      const newValues = [...values]

      if (
        value === '' ||
        (type === 'number' && !new RegExp(event.target.pattern).test(value))
      ) {
        newValues[index] = ''
        setValues(newValues)

        return
      }

      const sanitizedValue = value[0] // in case more than 1 char, we just take the first one
      newValues[index] = sanitizedValue
      setValues(newValues)
      const nextIndex = Math.min(index + 1, fields - 1)
      const next = inputRefs[nextIndex]

      next?.current?.focus()

      triggerChange(newValues)
    }

  const inputOnKeyDown =
    (index: number): KeyboardEventHandler<HTMLInputElement> =>
    event => {
      const prevIndex = index - 1
      const nextIndex = index + 1
      const first = inputRefs[0]
      const last = inputRefs[inputRefs.length - 1]
      const prev = inputRefs[prevIndex]
      const next = inputRefs[nextIndex]
      const vals = [...values]

      switch (event.key) {
        case 'Backspace':
          event.preventDefault()
          if (values[index]) {
            vals[index] = ''
            setValues(vals)
            triggerChange(vals)
          } else if (prev) {
            vals[prevIndex] = ''
            prev?.current?.focus()
            setValues(vals)
            triggerChange(vals)
          }
          break
        case 'ArrowLeft':
          event.preventDefault()
          prev?.current?.focus()
          break
        case 'ArrowRight':
          event.preventDefault()
          next?.current?.focus()
          break
        case 'ArrowUp':
          event.preventDefault()
          first?.current?.focus()
          break
        case 'ArrowDown':
          event.preventDefault()
          last?.current?.focus()
          break
        default:
          break
      }
    }

  const inputOnFocus: FocusEventHandler<HTMLInputElement> = event =>
    event.target.select()

  const inputOnPaste =
    (currentIndex: number): ClipboardEventHandler<HTMLInputElement> =>
    event => {
      event.preventDefault()
      const pastedValue = [
        ...event.clipboardData.getData('Text').split(''),
      ].map((copiedValue: string) =>
        // Replace non number char with empty char when type is number
        type === 'number' ? copiedValue.replace(/[^\d]/gi, '') : copiedValue,
      )

      // Trim array to avoid array overflow
      pastedValue.splice(
        fields - currentIndex < pastedValue.length
          ? fields - currentIndex
          : pastedValue.length,
      )

      setValues((vals: string[]) => {
        const newArray = vals.slice()
        newArray.splice(currentIndex, pastedValue.length, ...pastedValue)

        return newArray
      })

      // we select min value between the end of inputs and valid pasted chars
      const nextIndex = Math.min(
        currentIndex + pastedValue.filter(item => item !== '').length,
        inputRefs.length - 1,
      )
      const next = inputRefs[nextIndex]
      next?.current?.focus()
      triggerChange(pastedValue)
    }

  return (
    <div className={className} data-testid={dataTestId}>
      {values.map((value: string, index: number) => (
        <StyledInput
          css={[inputStyle]}
          aria-invalid={error}
          type={type === 'number' ? 'tel' : type}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          data-testid={index}
          value={value}
          id={`${inputId || uniqueId}-${index}`}
          ref={inputRefs[index]}
          onChange={inputOnChange(index)}
          onKeyDown={inputOnKeyDown(index)}
          onPaste={inputOnPaste(index)}
          onFocus={inputOnFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder?.[index] ?? ''}
          aria-label={`${ariaLabel} ${index}`}
        />
      ))}
    </div>
  )
}
