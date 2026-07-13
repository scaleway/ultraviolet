import { useState, useEffect, useMemo, FocusEvent, ChangeEvent } from 'react'
import { FieldValues, FieldPath, useFormContext, PathValue, Path } from 'react-hook-form'
import { useErrors } from '../providers'
import { validateRegex } from '../utils/validateRegex'
import { FieldProps, UseFieldProps } from './useField'

export function isChangeEvent(payload: unknown): payload is ChangeEvent<HTMLInputElement> {
  return typeof payload === 'object' && payload !== null && 'type' in payload && (payload as Event).type === 'change'
}

export const useRegisterField = <
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
  const { register, subscribe, getFieldState } = useFormContext<TFieldValues>()
  const { getError } = useErrors()
  const [error, setError] = useState<string>()

  const errorMeta = useMemo(
    () => ({
      label: errorLabel ?? label ?? ariaLabel ?? name,
      maxLength,
      minLength,
      min,
      max,
      regex,
    }),
    [errorLabel, label, ariaLabel, name, maxLength, minLength, min, max, regex],
  )

  useEffect(() => {
    const unsubscribe = subscribe({
      name: [name],
      formState: {
        errors: true,
      },
      callback: ({ values }) => {
        const error = getError({ ...errorMeta, value: values[name] }, getFieldState(name).error)
        setError(error)
      },
    })
    return unsubscribe
  }, [subscribe, getFieldState, name, errorMeta, getError])

  const registeredField = register(name, {
    maxLength,
    minLength,
    required,
    min,
    max,
    validate: {
      ...(regex ? { pattern: value => validateRegex(value, regex) } : {}),
      ...validate,
    },
    shouldUnregister,
  })

  const fieldProps: FieldProps<TFieldValues, TFieldName> = {
    onBlur: async (event: FocusEvent) => {
      await registeredField.onBlur(event)
      onBlur?.(event)
    },
    onChange: async (payload: unknown) => {
      // some components (SelectInput) send an event, others (TextInput) send a value
      const value = (isChangeEvent(payload) ? payload.target.value : payload) as PathValue<
        TFieldValues,
        Path<TFieldValues>
      >
      const event = isChangeEvent(payload) ? payload : { target: { value, name } }

      await registeredField.onChange(event)
      onChange?.(value)
    },
    ref: registeredField.ref,
    error,
  }

  return { fieldProps }
}
