import { VerificationCode } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type VerificationCodeFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof VerificationCode>,
      | 'disabled'
      | 'error'
      | 'fields'
      | 'initialValue'
      | 'onChange'
      | 'onComplete'
      | 'placeholder'
      | 'required'
      | 'type'
      | 'labelDescription'
      | 'success'
      | 'helper'
    >
  > & {
    className?: string
    id?: string
    name: string
    label?: string
  }

export const VerificationCodeField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  fields,
  id = 'verification-code-input',
  label,
  name,
  onChange,
  onComplete,
  placeholder,
  required,
  type = 'number',
  disabled,
  validate,
  labelDescription,
  success,
  helper,
}: VerificationCodeFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: {
      required,
      validate: {
        required: localValue => {
          if (required && localValue.length !== (fields ?? 4)) {
            return false
          }

          return true
        },
        ...validate,
      },
    },
  })

  return (
    <VerificationCode
      className={className}
      inputId={id}
      placeholder={placeholder}
      fields={fields}
      onChange={event => {
        onChange?.(event)
        field.onChange(event)
      }}
      onComplete={event => {
        onComplete?.(event)
      }}
      type={type}
      disabled={disabled}
      required={required}
      error={getError({ label: label || 'verification-code-field' }, error)}
      label={label}
      labelDescription={labelDescription}
      success={success}
      helper={helper}
    />
  )
}
