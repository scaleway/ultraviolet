import { TextArea } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

export type TextAreaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Omit<
    ComponentProps<typeof TextArea>,
    'value' | 'error' | 'name' | 'onChange'
  > & {
    regex?: (RegExp | RegExp[])[]
  }

/**
 * This component offers a form field based on Ultraviolet UI TextArea component
 */
export const TextAreaField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  autoFocus,
  clearable,
  className,
  tabIndex,
  'data-testid': dataTestId,
  disabled,
  helper,
  label,
  labelDescription,
  onChange,
  minLength,
  maxLength,
  name,
  onFocus,
  onBlur,
  placeholder,
  readOnly,
  required,
  rows,
  success,
  tooltip,
  validate,
  regex: regexes,
}: TextAreaFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    rules: {
      required,
      validate: {
        ...(regexes
          ? {
              pattern: value =>
                regexes.every(
                  regex =>
                    value === undefined ||
                    value === '' ||
                    (Array.isArray(regex)
                      ? regex.some(regexOr => regexOr.test(value))
                      : regex.test(value)),
                ),
            }
          : {}),
        ...validate,
      },
      minLength,
      maxLength,
    },
  })

  return (
    <TextArea
      autoFocus={autoFocus}
      className={className}
      clearable={clearable}
      data-testid={dataTestId}
      disabled={disabled}
      error={getError(
        {
          regex: regexes,
          minLength,
          maxLength,
          label,
          value: field.value,
        },
        error,
      )}
      helper={helper}
      label={label}
      labelDescription={labelDescription}
      minLength={minLength}
      maxLength={maxLength}
      name={name}
      onBlur={event => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={event => {
        field.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rows={rows}
      success={success}
      tabIndex={tabIndex}
      tooltip={tooltip}
      value={field.value}
    />
  )
}
