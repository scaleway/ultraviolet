'use client'

import type { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { ErrorProvider } from '../../providers'
import type { FormErrors } from '../../types'
import { defaultErrors } from './defaultErrors'
import { FormRegisterModeContext } from './registerMode'

type OnSubmitReturn = string | null | undefined | void

type FormProps<TFieldValues extends FieldValues> = {
  children?: ReactNode
  errors: FormErrors
  name?: string
  onSubmit: (data: TFieldValues) => Promise<OnSubmitReturn> | OnSubmitReturn
  methods: UseFormReturn<TFieldValues>
  'aria-label'?: string
  /**
   * If `true`, the fields in the form will use the [register](https://react-hook-form.com/docs/useform/register) API from react-hook-form
   * and the fields will be uncontrolled, which triggers less re-renders. BUT in order to have correct `isDirty` state, you need to provide
   * either `defaultValues` or `values` for all fields when initializing the form with `useForm`.
   *
   * If `false`, the fields will use the [useController](https://react-hook-form.com/docs/usecontroller) API
   * and will be controlled with the `value` prop, which leads to more re-renders. `defaultValues` and `values` are not necessary
   * to have correct `isDirty` state.
   *
   * @default false
   */
  _experimentalRegisterMode?: boolean
}

export const Form = <TFieldValues extends FieldValues>({
  children,
  methods,
  errors,
  onSubmit,
  name,
  _experimentalRegisterMode = false,
  'aria-label': ariaLabel,
}: FormProps<TFieldValues>) => {
  const handleSubmit = methods.handleSubmit(async values => {
    const result = await onSubmit(values)

    if (result) {
      methods.setError('root.submit', {
        message: result,
        type: 'custom',
      })
    }
  })

  return (
    <FormProvider {...methods}>
      <FormRegisterModeContext.Provider value={_experimentalRegisterMode}>
        <ErrorProvider errors={{ ...defaultErrors, ...errors }}>
          <form
            aria-label={ariaLabel}
            name={name}
            noValidate
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit(e).catch(() => null)
            }}
            style={{ display: 'contents' }}
          >
            {children}
          </form>
        </ErrorProvider>
      </FormRegisterModeContext.Provider>
    </FormProvider>
  )
}

Form.displayName = 'Form'
