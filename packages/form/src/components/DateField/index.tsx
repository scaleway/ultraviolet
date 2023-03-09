import { DateInput } from '@scaleway/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps, FocusEvent } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type DateFieldProps = BaseFieldProps<Date> &
  Omit<
    ComponentProps<typeof DateInput>,
    | 'maxDate'
    | 'minDate'
    | 'disabled'
    | 'required'
    | 'locale'
    | 'name'
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'autoFocus'
  > & {
    name: string
    maxDate?: Date
    minDate?: Date
    disabled?: boolean
    required?: boolean
    locale?: string
    onChange?: (value: Date | null) => void
    onBlur?: (event: FocusEvent<HTMLElement>) => void
    onFocus?: (value: FocusEvent<HTMLElement>) => void
    autoFocus?: boolean
  }

const parseDate = (value: string | Date): Date =>
  typeof value === 'string' ? new Date(value) : value

const isEmpty = (value?: Date | string): boolean =>
  typeof value === 'string' ? value === '' : value === undefined

export const DateField = ({
  required,
  name,
  label = '',
  validate,
  format,
  locale,
  maxDate,
  minDate,
  initialValue,
  disabled,
  value: inputVal,
  onChange,
  onBlur,
  onFocus,
  formatOnBlur,
  autoFocus = false,
}: DateFieldProps) => {
  const { getError } = useErrors()

  const { input, meta } = useFormField<Date>(name, {
    disabled,
    formatOnBlur,
    initialValue,
    maxDate,
    minDate,
    required,
    validate,
    value: inputVal,
  })

  const error = getError({
    label,
    maxDate,
    meta: meta as FieldState<unknown>,
    minDate,
    name,
    value: input.value,
  })

  return (
    <DateInput
      label={label}
      format={
        format ||
        (value => (value ? parseDate(value).toLocaleDateString() : ''))
      }
      locale={locale}
      required={required}
      value={input.value}
      onChange={(val: Date | null) => {
        if (val) {
          onChange?.(val)
          const newDate = parseDate(val)
          if (isEmpty(input.value)) {
            input.onChange(newDate)

            return
          }
          const currentDate = parseDate(input.value)
          newDate.setHours(currentDate.getHours(), currentDate.getMinutes())
          input.onChange(newDate)
        }
      }}
      onBlur={(e: FocusEvent<HTMLElement>) => {
        input.onBlur(e)
        onBlur?.(e)
      }}
      onFocus={(e: FocusEvent<HTMLElement>) => {
        input.onFocus(e)
        onFocus?.(e)
      }}
      maxDate={maxDate}
      minDate={minDate}
      error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      name={input.name}
    />
  )
}
