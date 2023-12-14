import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import type {
  DefaultValues,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
} from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { FORM_ERROR } from '../../constants'
import { ErrorProvider } from '../../providers'
import type { FormErrors } from '../../types'
import { defaultErrors } from './defaultErrors'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type SingleXOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type XOR<T extends unknown[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
  ? XOR<[SingleXOR<A, B>, ...Rest]>
  : never

type FormStateReturn<TFormValues extends FieldValues> = {
  values: TFormValues
  hasValidationErrors: boolean
  errors: FieldErrors<TFormValues>
  submitting: boolean
  pristine: boolean
  handleSubmit: () => Promise<void>
  submitError: boolean
  valid: boolean
  form: {
    change: UseFormReturn<TFormValues>['setValue']
    reset: UseFormReturn<TFormValues>['reset']
    submit: () => Promise<void>
  }
}

type OnRawSubmitReturn =
  | { [FORM_ERROR]?: string }
  | undefined
  | null
  | string
  | void
  | boolean
  | number

type FormSubmitContextValue<TFieldValues extends FieldValues = FieldValues> = {
  handleSubmit: ReturnType<UseFormHandleSubmit<TFieldValues>>
}

export const FormSubmitContext = React.createContext<FormSubmitContextValue>(
  {} as FormSubmitContextValue,
)

export type FormProps<TFormValues extends FieldValues = FieldValues> = {
  children?: ((props: FormStateReturn<TFormValues>) => ReactNode) | ReactNode
  errors: FormErrors
  name?: string
  onRawSubmit: (
    data: TFormValues,
    formState: {
      reset: UseFormReturn<TFormValues>['reset']
      resetFieldState: UseFormReturn<TFormValues>['resetField']
      restart: () => void
      change: UseFormReturn<TFormValues>['setValue']
    },
  ) => Promise<OnRawSubmitReturn> | OnRawSubmitReturn
} & XOR<
  [
    {
      /**
       * @deprecated Use the `methods` prop with [useForm](https://www.react-hook-form.com/api/useform/) instead.
       *
       * @example
       * ```tsx
       *  const methods = useForm({
       *    defaultValues,
       *    mode: 'onChange'
       *  })
       *
       *  return (
       *    <Form methods={methods} onRawSubmit={handleSubmit} errors={formErrors}>
       *      // ...
       *    </Form>
       *  )
       * ```
       */
      initialValues?: DefaultValues<TFormValues>
    },
    { methods: UseFormReturn<TFormValues> },
  ]
>

export const Form = <TFormValues extends FieldValues>({
  children,
  methods: methodsProp,
  initialValues,
  errors,
  onRawSubmit,
  name,
}: FormProps<TFormValues>) => {
  const methodsHook = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
  })

  const methods = !methodsProp ? methodsHook : methodsProp

  const handleSubmit = methods.handleSubmit(async values => {
    const result = await onRawSubmit(values, {
      reset: methods.reset,
      resetFieldState: methods.resetField,
      restart: () => methods.reset(initialValues),
      change: methods.setValue,
    })

    if (result === null) {
      methods.setError('root.submit', {
        type: 'custom',
      })

      return
    }
    if (result && typeof result !== 'boolean' && typeof result !== 'number') {
      methods.setError('root.submit', {
        type: 'custom',
        message: typeof result === 'object' ? result[FORM_ERROR] : result,
      })
    }
  })

  const formSubmitContextValue = useMemo(
    () => ({ handleSubmit }),
    [handleSubmit],
  )

  return (
    <FormProvider {...methods}>
      <FormSubmitContext.Provider value={formSubmitContextValue}>
        <ErrorProvider errors={{ ...defaultErrors, ...errors }}>
          <form
            onSubmit={async e => {
              e.preventDefault()
              e.stopPropagation()
              await handleSubmit(e)
            }}
            name={name}
          >
            {typeof children === 'function'
              ? children({
                  values: methods.watch(),
                  hasValidationErrors: !methods.formState.isValid,
                  errors: methods.formState.errors,
                  submitting: methods.formState.isSubmitting,
                  pristine: !methods.formState.isDirty,
                  handleSubmit,
                  submitError: !!methods.formState.errors?.root?.['submit'],
                  valid: methods.formState.isValid,
                  form: {
                    change: methods.setValue,
                    reset: methods.reset,
                    submit: handleSubmit,
                  },
                })
              : children}
          </form>
        </ErrorProvider>
      </FormSubmitContext.Provider>
    </FormProvider>
  )
}
