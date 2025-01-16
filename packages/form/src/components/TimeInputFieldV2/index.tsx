import { TimeInputV2 } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type TimeInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof TimeInputV2>,
    'value' | 'error' | 'name' | 'onChange'
  >

/**
 * This component offers a form field based on Ultraviolet UI TimeInputV2 component
 *  @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const TimeInputFieldV2 = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  className,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  helper,
  label,
  autoFocus,
  required = false,
  'data-testid': dataTestId,
  name,
  onFocus,
  onBlur,
  clearable = false,
  labelDescription,
  size = 'medium',
  'aria-label': ariaLabel,
  shouldUnregister,
  control,
  timeFormat,
}: TimeInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    shouldUnregister,
    control,
    rules: {
      required,
    },
  })

  return (
    <TimeInputV2
      autoFocus={autoFocus}
      className={className}
      clearable={clearable}
      data-testid={dataTestId}
      timeFormat={timeFormat}
      disabled={disabled}
      error={getError(
        {
          label: label ?? ariaLabel ?? name,
          value: field.value,
        },
        error,
      )}
      helper={helper}
      label={label}
      labelDescription={labelDescription}
      onBlur={event => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={value => {
        field.onChange(value)
        onChange?.(value as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      value={field.value}
      id={id}
      size={size}
    />
  )
}
