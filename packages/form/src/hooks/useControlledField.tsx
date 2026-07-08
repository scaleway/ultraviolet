import type { FocusEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
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
      minLength,
      maxLength,
      min,
      max,
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
      const isEvent = isChangeEvent(payload)
      const value = (isEvent ? payload.target.value : payload) as PathValue<TFieldValues, Path<TFieldValues>>
      const event = isEvent ? payload : { target: { value, name } }

      field.onChange(event)
      onChange?.(value)
    },
    value: field.value,
    ref: field.ref,
    error: getError(
      {
        label: errorLabel ?? label ?? ariaLabel ?? name,
        minLength,
        maxLength,
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
