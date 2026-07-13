import type { FocusEvent } from 'react'
import { FieldPath, FieldValues, Path, PathValue, useController } from 'react-hook-form'
import { useErrors } from '../providers'
import { validateRegex } from '../utils/validateRegex'
import type { UseFieldProps, FieldProps } from './useField'
import { isChangeEvent } from './useRegisterField'

export const useControlledField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  'aria-label': ariaLabel,
  required,
  minLength,
  maxLength,
  min,
  max,
  errorLabel,
  shouldUnregister,
  validate,
  onBlur,
  onChange,
  regex,
}: UseFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    rules: {
      maxLength,
      minLength,
      required,
      validate: {
        ...(regex ? { pattern: value => validateRegex(value, regex) } : {}),
        ...validate,
      },
    },
    shouldUnregister,
  })

  const fieldProps: FieldProps<TFieldValues, TFieldName> = {
    onBlur: async (event: FocusEvent) => {
      field.onBlur()
      onBlur?.(event)
    },
    onChange: async (payload: unknown) => {
      // some components (SelectInput) send an event, others (TextInput) send a value
      const value = (isChangeEvent(payload) ? payload.target.value : payload) as PathValue<
        TFieldValues,
        Path<TFieldValues>
      >
      const event = isChangeEvent(payload) ? payload : { target: { value, name } }

      field.onChange(event)
      onChange?.(value)
    },
    value: field.value,
    ref: field.ref,
    error: getError(
      {
        label: errorLabel ?? label ?? ariaLabel ?? name,
        maxLength,
        minLength,
        min,
        max,
        regex,
        value: field.value,
      },
      error,
    ),
  }

  return { fieldProps }
}
