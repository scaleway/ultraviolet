import type { BaseFieldProps, FieldPath, FieldValues } from '@ultraviolet/form'
import { useController, useErrors } from '@ultraviolet/form'
import { Stack, Text, VerificationCode } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'

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
    <Stack
      className={className}
      gap={1}
      justifyContent="center"
      alignItems="center"
      direction="column"
      aria-label="verification-code-field"
    >
      {label ? (
        <label
          id={`${id}-label`}
          htmlFor={`${id}-0`}
          style={{
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Text as="p" variant="body" prominence="strong">
            {label}
          </Text>
        </label>
      ) : null}

      <VerificationCode
        inputId={id}
        error={!!error}
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
      />
      {error ? (
        <Text as="small" variant="caption" sentiment="danger">
          {getError({ label: label || 'verification-code-field' }, error)}
        </Text>
      ) : null}
    </Stack>
  )
}
