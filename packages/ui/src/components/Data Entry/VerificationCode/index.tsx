// oxlint-disable unicorn/prefer-spread
// oxlint wants `[...value]` instead of Array.from(value) but it triggers typescript/no-misused-spread
// which advises to use "`Array.from` for non-iterables if needed"
'use client'

import { cn } from '@ultraviolet/utils'
import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, CSSProperties, FocusEventHandler, KeyboardEvent, ReactNode } from 'react'
import { hasHelperText } from '../../../helpers/hasHelperText'
import { Stack } from '../../Layout/Stack'
import { VisuallyHidden } from '../../Other/VisuallyHidden'
import { Description } from '../../Typography/Description'
import { Label } from '../../Typography/Label'
import { Text } from '../../Typography/Text'
import { verificationCodeStyle } from './styles.css'

type VerificationCodeProps = {
  disabled?: boolean
  error?: boolean | string
  className?: string
  /**
   * Amount of field you want
   */
  fields?: number
  initialValue?: string
  inputId?: string
  inputStyle?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * Triggered when a field change
   */
  onChange?: (value: string) => void
  /**
   * Triggered when all fields are completed
   */
  onComplete?: (value: string) => void
  placeholder?: string
  required?: boolean
  /**
   * Type of the field
   */
  type?: 'text' | 'number'
  'data-testid'?: string
  /**
   * @deprecated Use `accessibleLabel` instead.
   */
  'aria-label'?: string
  accessibleLabel?: string
  label?: string
  labelDescription?: ReactNode
  helper?: ReactNode
  success?: boolean | string
  style?: CSSProperties
  'aria-describedby'?: string
}

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
  size = 'large',
  onChange,
  onComplete,
  placeholder = '',
  required = false,
  type = 'number',
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  accessibleLabel,
  label,
  labelDescription,
  helper,
  success,
  style,
  'aria-describedby': ariaDescribedBy,
}: VerificationCodeProps) => {
  const uniqueId = useId()
  const id = inputId ?? uniqueId
  const helperId = useId()

  const [value, setValue] = useState(initialValue.substring(0, fields))
  const [caretIndex, setCaretIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const computedSentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }
    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [success, error])

  // Keep the hidden input's selection in sync with the highlighted box
  useLayoutEffect(() => {
    inputRef.current?.setSelectionRange(caretIndex, caretIndex)
    // `value` is required  so a deletion (where caretIndex is unchanged) also re-syncs the selection
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [caretIndex, value])

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    let nextValue = event.target.value

    if (type === 'number') {
      nextValue = nextValue.replaceAll(/[^\d]/gv, '')
    }

    const boxUnderCaretIsFull = caretIndex < value.length
    const isTypingAtEndOfFullField = caretIndex >= value.length && value.length >= fields

    const removeChar = nextValue.length < value.length
    const addedChars = nextValue.length - value.length

    if (nextValue.length > value.length && (boxUnderCaretIsFull || isTypingAtEndOfFullField)) {
      const chars = Array.from(value)
      if (boxUnderCaretIsFull) {
        chars[caretIndex] = nextValue[caretIndex] // replace instead of inserting
      } else {
        chars[fields - 1] = nextValue[fields] // add last digit
      }
      nextValue = chars.join('')
    } else {
      nextValue = nextValue.substring(0, fields)
    }

    const nextCaretIndex = removeChar || nextValue === value ? caretIndex : caretIndex + addedChars
    setValue(nextValue)
    setCaretIndex(Math.min(nextCaretIndex, fields - 1))
    onChange?.(nextValue)

    if (nextValue.length >= fields) {
      onComplete?.(nextValue)
    }
  }

  const updateCaretIndex = () => {
    const position = inputRef.current?.selectionStart ?? value.length
    setCaretIndex(Math.min(position, fields - 1))
  }

  const inputOnFocus: FocusEventHandler<HTMLInputElement> = event => {
    const { length } = event.target.value
    event.target.setSelectionRange(length, length)
    setCaretIndex(length)
  }

  const inputOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Backspace should delete the character in the current box, not the previous one
    if (event.key === 'Backspace' && caretIndex < value.length) {
      event.preventDefault()
      const chars = Array.from(value)
      chars.splice(caretIndex, 1)
      const nextValue = chars.join('')
      setValue(nextValue)
      setCaretIndex(Math.min(caretIndex, fields - 1))
      onChange?.(nextValue)
    }
  }

  return (
    <Stack className={className} data-testid={dataTestId} gap={0.5} style={style}>
      {label ? (
        <Label
          htmlFor={id}
          labelDescription={labelDescription}
          required={required}
          size={size === 'xlarge' ? 'large' : size}
        >
          {label}
        </Label>
      ) : (
        <VisuallyHidden as="label" htmlFor={id}>
          {accessibleLabel ?? ariaLabel}
        </VisuallyHidden>
      )}
      <div className={verificationCodeStyle.boxesWrapper}>
        <input
          aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
          aria-invalid={Boolean(error)}
          autoComplete="one-time-code"
          className={verificationCodeStyle.overlayInput}
          disabled={disabled}
          id={id}
          inputMode={type === 'number' ? 'numeric' : undefined}
          onChange={inputOnChange}
          onClick={updateCaretIndex}
          onFocus={inputOnFocus}
          onKeyDown={inputOnKeyDown}
          onKeyUp={updateCaretIndex}
          onSelect={updateCaretIndex}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          ref={inputRef}
          required={required}
          type={type === 'number' ? 'text' : type}
          value={value}
        />
        {Array.from({ length: fields }, (_, index) => {
          const current = caretIndex === index

          return (
            <Text
              as="span"
              variant={size === 'small' ? 'caption' : 'body'}
              sentiment={computedSentiment}
              disabled={disabled}
              prominence={value[index] ? 'default' : 'weak'}
              aria-hidden
              className={cn(
                verificationCodeStyle.boxSizes[size],
                verificationCodeStyle.box({
                  current,
                  error: Boolean(error),
                  success: Boolean(success),
                }),
              )}
              data-testid={`box-${index}`}
              key={`field-${index}`}
            >
              {/* oxlint-disable-next-line typescript/no-unnecessary-condition */}
              {value[index] ?? placeholder?.[index] ?? ''}
              {current && !value[index] ? <span aria-hidden className={verificationCodeStyle.caret} /> : null}
            </Text>
          )
        })}
      </div>
      <Description
        error={error}
        success={success}
        helper={helper}
        disabled={disabled}
        id={ariaDescribedBy ?? helperId}
      />
    </Stack>
  )
}

VerificationCode.displayName = 'VerificationCode'
