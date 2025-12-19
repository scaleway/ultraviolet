'use client'

import { cn } from '@ultraviolet/utils'
import type {
  ChangeEvent,
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from 'react'
import { createRef, useId, useMemo, useState } from 'react'
import { Label } from '../Label'
import { Text } from '../Text'
import { filedSetClass, inputClass, inputSizes } from './styles.css'

const DEFAULT_ON_FUNCTION = () => {}

const inputOnFocus: FocusEventHandler<HTMLInputElement> = event =>
  event.target.select()

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
  label?: string
  labelDescription?: ReactNode
  helper?: ReactNode
  success?: boolean | string
  style?: CSSProperties
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
  onChange = DEFAULT_ON_FUNCTION,
  onComplete = DEFAULT_ON_FUNCTION,
  placeholder = '',
  required = false,
  type = 'number',
  'data-testid': dataTestId,
  'aria-label': ariaLabel = 'Verification code',
  label,
  labelDescription,
  helper,
  success,
  style,
}: VerificationCodeProps) => {
  const uniqueId = useId()
  const id = inputId || uniqueId
  const valuesArray = Object.assign(new Array(fields).fill(''), [
    ...initialValue.substring(0, fields),
  ])
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
      newValues[index] = sanitizedValue ?? ''
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
      const last = inputRefs.at(-1)
      const prev = inputRefs[prevIndex]
      const next = inputRefs[nextIndex]
      const vals = [...values]

      switch (event.key) {
        case 'Backspace': {
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
        }

        case 'ArrowLeft': {
          event.preventDefault()
          prev?.current?.focus()
          break
        }

        case 'ArrowRight': {
          event.preventDefault()
          next?.current?.focus()
          break
        }

        case 'ArrowUp': {
          event.preventDefault()
          first?.current?.focus()
          break
        }

        case 'ArrowDown': {
          event.preventDefault()
          last?.current?.focus()

          break
        }

        default: {
          break
        }
      }
    }

  const inputOnPaste =
    (currentIndex: number): ClipboardEventHandler<HTMLInputElement> =>
    event => {
      event.preventDefault()
      const pastedValue = [...event.clipboardData.getData('Text')].map(
        (copiedValue: string) =>
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
        const newArray = structuredClone(vals)

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

  const sentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }

    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  return (
    <fieldset
      className={cn(className, filedSetClass)}
      data-testid={dataTestId}
      style={style}
    >
      {label || labelDescription ? (
        <Label
          htmlFor={`${id}-0`}
          id={`${id}-label`}
          labelDescription={labelDescription}
          required={required}
          size={size === 'xlarge' ? 'large' : size}
        >
          {label}
        </Label>
      ) : null}
      <div>
        {values.map((value: string, index: number) => (
          <input
            aria-invalid={!!error}
            aria-label={`${ariaLabel} ${index}`}
            autoComplete="off"
            className={cn(inputSizes[size], inputClass)}
            data-success={!!success}
            data-testid={index}
            disabled={disabled}
            id={`${id}-${index}`}
            key={`field-${index}`}
            onChange={inputOnChange(index)}
            onFocus={inputOnFocus}
            onKeyDown={inputOnKeyDown(index)}
            onPaste={inputOnPaste(index)}
            pattern={type === 'number' ? '[0-9]*' : undefined}
            placeholder={placeholder?.[index] ?? ''}
            ref={inputRefs[index]}
            required={required}
            type={type === 'number' ? 'tel' : type}
            value={value}
          />
        ))}
      </div>
      {error || typeof success === 'string' || typeof helper === 'string' ? (
        <Text
          as="p"
          disabled={disabled}
          prominence={!error && !success ? 'weak' : 'default'}
          sentiment={sentiment}
          variant="caption"
        >
          {error || success || helper}
        </Text>
      ) : null}
      {!error && !success && typeof helper !== 'string' && helper
        ? helper
        : null}
    </fieldset>
  )
}
