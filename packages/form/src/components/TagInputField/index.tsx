'use client'

import { TagInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

export type TagInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof TagInput>, 'name' | 'onChange'> & {
    regex?: (RegExp | RegExp[])[]
  }

export const TagInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  regex: regexes,
  control,
  name,
  onChange,
  required,
  shouldUnregister = false,
  label,
  validate,
  'aria-label': ariaLabel,
  ...props
}: TagInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    rules: {
      required,
      shouldUnregister,
      validate: {
        ...(regexes
          ? {
              pattern: value =>
                (value as string[]).every(val => validateRegex(val, regexes)),
            }
          : {}),
        ...validate,
      },
    },
  })

  return (
    <TagInput
      {...props}
      name={field.name}
      onChange={newTags => {
        field.onChange(newTags)
        onChange?.(newTags as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      value={field.value}
      label={label}
      aria-label={ariaLabel}
      error={getError(
        { regex: regexes, label: label ?? ariaLabel ?? name },
        error,
      )}
    />
  )
}
