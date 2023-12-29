import { useContext } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { FormSubmitContext } from '../components/Form'

/**
 * @deprecated Use [useFormContext](https://www.react-hook-form.com/api/useformcontext/)
 *
 * @example
 * ```tsx
 * const Input = () {
 *   const { setValue } = useFormContext()
 *
 *   setValue('username', 'John Wick')
 * }
 * ```
 */
export const useFormDeprecated = <TFieldValues extends FieldValues>() => {
  const { setValue, resetField, getFieldState, reset } =
    useFormContext<TFieldValues>()

  const formSubmitContext = useContext(FormSubmitContext)

  return {
    change: setValue,
    resetFieldState: resetField,
    getFieldState,
    batch: (callback: () => void) => callback(),
    restart: reset,
    reset,
    submit: formSubmitContext.handleSubmit,
  }
}
