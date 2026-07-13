import { useState, useEffect, useMemo } from 'react'
import { FieldValues, FieldPath, useFormContext } from 'react-hook-form'
import { useErrors } from '../../providers'
import { BaseFieldProps, MetaField } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

/**
 * Hook to use in Field components to centralize the logic linked to React-Hook-Form and other common field props.
 */
export const useField = <
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
  regex,
}: BaseFieldProps<TFieldValues, TFieldName> & Omit<MetaField, 'label'> & { 'aria-label'?: string }) => {
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

  const fieldProps = {
    name: registeredField.name,
    onBlur: registeredField.onBlur,
    onChange: registeredField.onChange,
    ref: registeredField.ref,
    minLength,
    maxLength,
    min,
    max,
    required,
  }

  return { error, fieldProps }
}
