'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { ErrorProvider } from '../../providers'
import type { FormErrors } from '../../types'
import { defaultErrors } from './defaultErrors'

type OnSubmitReturn = string | null | undefined | void

type FormProps<TFieldValues extends FieldValues> = {
  children?: ReactNode
  errors: FormErrors
  name?: string
  onSubmit: (data: TFieldValues) => Promise<OnSubmitReturn> | OnSubmitReturn
  methods: UseFormReturn<TFieldValues>
}

const StyledForm = styled.form`
  display: contents;
`

export const Form = <TFieldValues extends FieldValues>({
  children,
  methods,
  errors,
  onSubmit,
  name,
}: FormProps<TFieldValues>) => {
  const handleSubmit = methods.handleSubmit(async values => {
    const result = await onSubmit(values)

    if (result) {
      methods.setError('root.submit', {
        type: 'custom',
        message: result,
      })
    }
  })

  return (
    <FormProvider {...methods}>
      <ErrorProvider errors={{ ...defaultErrors, ...errors }}>
        <StyledForm
          onSubmit={async e => {
            e.preventDefault()
            e.stopPropagation()
            await handleSubmit(e)
          }}
          name={name}
          noValidate
        >
          {children}
        </StyledForm>
      </ErrorProvider>
    </FormProvider>
  )
}
