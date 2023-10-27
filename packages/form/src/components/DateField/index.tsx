import { DateInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { maxDateValidator } from '../../validators/maxDate'
import { minDateValidator } from '../../validators/minDate'

type DateExtends = Date | [Date | null, Date | null]

type DateFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
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
      | 'stardDate'
      | 'endDate'
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

export const DateField = <TFieldValues extends FieldValues>({
  required,
  name,
  label = '',
  format,
  locale,
  maxDate,
  minDate,
  disabled,
  onChange,
  onBlur,
  onFocus,
  rules,
  autoFocus = false,
  excludeDates,
  selectsRange,
  'data-testid': dataTestId,
}: DateFieldProps<TFieldValues>) => {
  const { getError } = useErrors()

  return (
    <Controller
      name={name}
      rules={{
        ...rules,
        validate: {
          ...rules?.validate,
          minDate: minDateValidator(minDate),
          maxDate: maxDateValidator(maxDate),
        },
        required,
      }}
      render={({ field, fieldState: { error } }) => (
        <DateInput
          name={field.name}
          label={label}
          value={field.value}
          format={
            format ||
            (value => (value ? parseDate(value).toLocaleDateString() : ''))
          }
          locale={locale}
          required={required}
          onChange={(val: DateExtends | null) => {
            if (val && val instanceof Date) {
              onChange?.(val)
              const newDate = parseDate(val)
              if (isEmpty(field.value as Date)) {
                field.onChange(newDate)

                return
              }
              const currentDate = parseDate(field.value as Date)
              newDate.setHours(currentDate.getHours(), currentDate.getMinutes())
              field.onChange(newDate)
            }
          }}
          onBlur={(e: FocusEvent<HTMLElement>) => {
            field.onBlur()
            onBlur?.(e)
          }}
          onFocus={onFocus}
          maxDate={maxDate}
          minDate={minDate}
          error={getError({ minDate, maxDate, label }, error)}
          disabled={disabled}
          autoFocus={autoFocus}
          excludeDates={excludeDates}
          data-testid={dataTestId}
          startDate={
            selectsRange
              ? (field.value as [Date | null, Date | null])[0]
              : undefined
          }
          endDate={
            selectsRange
              ? (field.value as [Date | null, Date | null])[1]
              : undefined
          }
        />
      )}
    />
  )
}
