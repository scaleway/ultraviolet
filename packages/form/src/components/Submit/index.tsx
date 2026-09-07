'use client'

import { Button } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { useFormState } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type RHFBase<TFieldValues extends FieldValues> = Pick<BaseFieldProps<TFieldValues>, 'control'>
type SubmitButtonProps = {
  children?: ReactNode
  className?: string
} & Partial<
  Pick<
    ComponentProps<typeof Button>,
    | 'size'
    | 'sentiment'
    | 'variant'
    | 'tooltip'
    | 'accessibleLabel'
    | 'tooltipLabel'
    | 'tooltipDescription'
    | 'fullWidth'
    | 'onClick'
    | 'disabled'
    | 'className'
  >
>

type SubmitProps<TFieldValues extends FieldValues> = RHFBase<TFieldValues> & SubmitButtonProps

export const Submit = <TFieldValues extends FieldValues>({
  children,
  control,
  disabled = false,
  ...props
}: SubmitProps<TFieldValues>) => {
  const { isSubmitting, isValid } = useFormState({ control })

  const isDisabled = disabled || isSubmitting || !isValid

  return (
    <Button disabled={isDisabled} isLoading={isSubmitting} type="submit" {...props}>
      {children}
    </Button>
  )
}

Submit.displayName = 'Submit'
