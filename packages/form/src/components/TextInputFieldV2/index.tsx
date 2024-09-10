import { TextInputV2 } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

type TextInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof TextInputV2>, 'value' | 'error' | 'name'> & {
    regex?: (RegExp | RegExp[])[]
  }

/**
 * This component offers a form field based on Ultraviolet UI TextInputV2 component
 */
export const TextInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  regex: regexes,
  id,
  className,
  tabIndex,
  onChange,
  onChangeValue,
  placeholder,
  disabled = false,
  readOnly = false,
  success,
  helper,
  tooltip,
  label,
  autoFocus,
  required = false,
  'data-testid': dataTestId,
  name,
  onFocus,
  onBlur,
  clearable = false,
  labelDescription,
  type = 'text',
  prefix,
  suffix,
  size = 'large',
  loading,
  onRandomize,
  minLength,
  maxLength,
  'aria-labelledby': ariaLabelledBy,
  'aria-label': ariaLabel,
  autoComplete,
  shouldUnregister,
  validate,
  control,
  role,
  'aria-live': ariaLive,
  'aria-atomic': ariaAtomic,
}: TextInputFieldProps<TFieldValues, TFieldName>) => {
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
      validate: {
        ...(regexes
          ? {
              pattern: value => validateRegex(value, regexes),
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
          minLength,
          maxLength,
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
        onChange?.(event)
        onChangeValue?.(event.target.value)
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
      value={field.value === undefined ? '' : field.value}
      id={id}
      prefix={prefix}
      suffix={suffix}
      size={size}
      onRandomize={onRandomize}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      autoComplete={autoComplete}
      role={role}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
    />
  )
}
