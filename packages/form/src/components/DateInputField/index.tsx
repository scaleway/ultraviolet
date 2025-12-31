'use client'

import { DateInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { maxDateValidator } from '../../validators/maxDate'
import { minDateValidator } from '../../validators/minDate'

type DateExtends = Date | [Date | null, Date | null]

type DateInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof DateInput>,
    'required' | 'name' | 'onChange' | 'value'
  >

const parseDate = (value: string | Date): Date =>
  typeof value === 'string' ? new Date(value) : value

const isEmpty = (value?: Date | string | null): boolean => !value

export const DateInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  required,
  name,
  control,
  label = '',
  format,
  minDate,
  maxDate,
  onChange,
  onBlur,
  validate,
  selectsRange,
  showMonthYearPicker,
  shouldUnregister = false,
  ...props
}: DateInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
      validate: {
        maxDate: maxDateValidator(maxDate),
        minDate: minDateValidator(minDate),
        ...validate,
      },
    },
    shouldUnregister,
  })

  return (
    <DateInput
      {...props}
      endDate={
        selectsRange && Array.isArray(field.value)
          ? (field.value as [Date | null, Date | null])[1]
          : undefined
      }
      error={getError({ label, maxDate, minDate }, error)}
      format={
        format ??
        (value => {
          if (!value) {
            return ''
          }
          const date = parseDate(value)

          return showMonthYearPicker
            ? date.toLocaleDateString(undefined, {
                month: 'numeric',
                year: 'numeric',
              })
            : date.toLocaleDateString()
        })
      }
      label={label}
      maxDate={maxDate}
      minDate={minDate}
      name={field.name}
      onBlur={(e: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(e)
      }}
      onChange={(val: DateExtends | null) => {
        if (val && val instanceof Date) {
          onChange?.(val as PathValue<TFieldValues, Path<TFieldValues>>)
          const newDate = parseDate(val)
          if (isEmpty(field.value)) {
            field.onChange(newDate)

            return
          }
          const currentDate = parseDate(field.value)
          newDate.setHours(currentDate.getHours(), currentDate.getMinutes())
          field.onChange(newDate)
        } else if (Array.isArray(val)) {
          onChange?.(val as PathValue<TFieldValues, Path<TFieldValues>>)
          field.onChange(val)
        } else if (val === null) {
          onChange?.(val as PathValue<TFieldValues, Path<TFieldValues>>)
          field.onChange(val)
        }
      }}
      required={required}
      selectsRange={selectsRange}
      showMonthYearPicker={showMonthYearPicker}
      startDate={
        selectsRange && Array.isArray(field.value)
          ? (field.value as [Date | null, Date | null])[0]
          : undefined
      }
      value={Array.isArray(field.value) ? undefined : field.value}
    />
  )
}
