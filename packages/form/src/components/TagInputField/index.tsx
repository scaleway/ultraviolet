import { TagInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

export type TagInputFieldProps<TFieldValues extends FieldValues = FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof TagInput>,
        'tags' | 'variant' | 'placeholder' | 'disabled' | 'className' | 'id'
      >
    >

export const TagInputField = <TFieldValues extends FieldValues>({
  className,
  disabled,
  id,
  name,
  onChange,
  placeholder,
  required,
  rules,
  variant,
}: TagInputFieldProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({
    name,
    rules: {
      required,
      ...rules,
    },
  })

  return (
    <TagInput
      name={field.name}
      className={className}
      disabled={disabled}
      id={id}
      onChange={event => {
        field.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      placeholder={placeholder}
      variant={variant}
      tags={field.value}
    />
  )
}
