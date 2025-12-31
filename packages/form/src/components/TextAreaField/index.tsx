'use client'

import { TextArea } from '@ultraviolet/ui'
import type { ComponentProps, KeyboardEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

export type TextAreaFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof TextArea>,
    'value' | 'error' | 'name' | 'onChange'
  > & {
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
  label,
  onChange,
  minLength,
  maxLength,
  name,
  onBlur,
  onKeyDown,
  required,
  regex: regexes,
  submitOnEnter,
  validate,
  'aria-label': ariaLabel,
  ...props
}: TextAreaFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      maxLength,
      minLength,
      required,
      validate: {
        ...(regexes
          ? {
              pattern: value => validateRegex(value, regexes),
            }
          : {}),
        ...validate,
      },
    },
  })

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

  return (
    <TextArea
      {...props}
      error={getError(
        {
          label: label ?? ariaLabel ?? name,
          maxLength,
          minLength,
          regex: regexes,
          value: field.value,
        },
        error,
      )}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      onBlur={event => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={event => {
        field.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onKeyDown={onKeyDownHandler}
      required={required}
      value={field.value}
      {...(label ? { label } : { 'aria-label': ariaLabel! })}
    />
  )
}
