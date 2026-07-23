'use client'

import { TextArea } from '@ultraviolet/ui'
import type { ComponentProps, KeyboardEvent } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useField } from '../../hooks/useField'
import type { BaseFieldProps } from '../../types'

export type TextAreaFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof TextArea>, 'value' | 'error' | 'name' | 'onChange'> & {
    regex?: (RegExp | RegExp[])[]
    submitOnEnter?: boolean
  }

/**
 * This component offers a form field based on Ultraviolet UI TextArea component
 */
export const TextAreaField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  submitOnEnter,
  onKeyDown,
  ...props
}: TextAreaFieldProps<TFieldValues, TFieldName>) => {
  const { fieldProps } = useField(props)

  const onKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (submitOnEnter && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      const { form } = event.currentTarget
      if (form) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true,
        })
        form.dispatchEvent(submitEvent)
      }
    } else {
      onKeyDown?.(event)
    }
  }

  return <TextArea {...props} {...fieldProps} onKeyDown={onKeyDownHandler} />
}

TextAreaField.displayName = 'TextAreaField'
