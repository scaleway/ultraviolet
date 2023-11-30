import type { FieldValues } from 'react-hook-form'
import { useFormContext, useWatch } from 'react-hook-form'

type UseFormStateParams = {
  subscription?: Record<string, boolean>
}

/**
 * @deprecated Use [useForm](https://www.react-hook-form.com/api/useform/), [useFormContext](https://www.react-hook-form.com/api/useformcontext/) or [useWatch](https://www.react-hook-form.com/api/usewatch/) to get values. Use [useFormState](https://www.react-hook-form.com/api/useformstate/) to get form states.
 * @example
 * ```tsx
 * const Input = () {
 *   const username = useWatch({
 *    name: 'username'
 *   })
 *
 *   const { isValid } = useFormState()
 * }
 * ```

 */
export const useFormStateDeprecated = <TFieldValues extends FieldValues>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _params?: UseFormStateParams,
) => {
  const { formState } = useFormContext<TFieldValues>()

  return {
    dirtySinceLastSubmit: formState.isDirty,
    submitErrors: formState.errors.root,
    values: useWatch() as TFieldValues,
    hasValidationErrors: !formState.isValid,
    pristine: !formState.isDirty,
    errors: formState.errors,
    initialValues: formState.defaultValues,
    touched: formState.touchedFields,
    submitting: formState.isSubmitting,
    invalid: !formState.isValid,
    valid: formState.isValid,
  }
}
