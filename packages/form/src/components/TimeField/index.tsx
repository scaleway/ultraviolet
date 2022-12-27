import { TimeInput } from '@scaleway/ui'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

const parseTime = (date?: Date | string): { label: string; value: string } => {
  const timeStr =
    date && typeof date !== 'string'
      ? date.toLocaleTimeString().slice(0, -3)
      : ''

  return {
    label: timeStr,
    value: timeStr,
  }
}

type TimeFieldProps = BaseFieldProps<Date> &
  ComponentProps<typeof TimeInput> & {
    name: string
  }

export const TimeField = ({
  required,
  name,
  schedule,
  placeholder,
  disabled,
  initialValue,
  validate,
  readOnly,
  value,
  onChange,
  onBlur,
  onFocus,
  isLoading,
  isClearable,
  inputId,
  id,
  formatOnBlur,
  animation,
  animationDuration,
  animationOnChange,
  className,
  isSearchable,
  options,
}: TimeFieldProps) => {
  const { input, meta } = useFormField<Date>(name, {
    disabled,
    formatOnBlur,
    initialValue,
    required,
    validate,
    value,
  })

  const error = useMemo(
    () => (input.value && meta.error ? (meta.error as string) : undefined),
    [input.value, meta.error],
  )

  return (
    <TimeInput
      placeholder={placeholder}
      schedule={schedule}
      required={required}
      value={parseTime(input.value)}
      onChange={(val, action) => {
        if (!val) return
        onChange?.(val, action)
        const [hours, minutes] = (
          val as { value: string; label: string }
        ).value.split(':')
        const date = input.value ? new Date(input.value) : new Date()
        date.setHours(Number(hours), Number(minutes), 0)
        input.onChange(date)
      }}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      error={error}
      disabled={disabled}
      readOnly={readOnly}
      animation={animation}
      animationDuration={animationDuration}
      animationOnChange={animationOnChange}
      className={className}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      inputId={inputId}
      id={id}
      options={options}
    />
  )
}
