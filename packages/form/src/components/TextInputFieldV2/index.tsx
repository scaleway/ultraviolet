import { TextInputV2 } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type TextInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Omit<
    ComponentProps<typeof TextInputV2>,
    'value' | 'error' | 'name' | 'onChange'
  > & {
    regex?: (RegExp | RegExp[])[]
  }

/**
 * This component offers a form field based on Ultraviolet UI TextInputV2 component
 */
export const TextInputField = <
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
  loading,
  onChange,
  minLength,
  maxLength,
  name,
  onFocus,
  onBlur,
  placeholder,
  readOnly,
  required,
  success,
  tooltip,
  type,
  validate,
  regex: regexes,
  onRandomize,
  prefix,
  size,
  suffix,
  id,
}: TextInputFieldProps<TFieldValues, TName>) => {
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
    <TextInputV2
      autoFocus={autoFocus}
      className={className}
      clearable={clearable}
      data-testid={dataTestId}
      disabled={disabled}
      error={getError(
        {
          regex: regexes,
          // minLength,
          // maxLength,
          label: label ?? '',
          value: field.value,
        },
        error,
      )}
      helper={helper}
      label={label}
      loading={loading}
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
      success={success}
      tabIndex={tabIndex}
      tooltip={tooltip}
      type={type}
      value={field.value}
      onRandomize={onRandomize}
      prefix={prefix}
      suffix={suffix}
      size={size}
      id={id}
    />
  )
}
