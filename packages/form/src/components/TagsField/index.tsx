import { Tags } from '@scaleway/ui'
import type { ComponentProps } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

export type TagsFieldProps<T = unknown, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<ComponentProps<typeof Tags>, 'tags' | 'variant' | 'onChange'>
  > & {
    className?: string
    disabled?: boolean
    id?: string
    name: string
    placeholder: string
    required?: boolean
  }

export const TagsField = ({
  className,
  disabled,
  id,
  name,
  onChange,
  placeholder,
  required,
  tags,
  validate,
  variant,
}: TagsFieldProps): JSX.Element => {
  const { input } = useFormField(name, {
    disabled,
    required,
    type: 'text',
    validate,
  })

  return (
    <Tags
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      onChange={event => {
        onChange?.(event)
        input.onChange(event)
      }}
      placeholder={placeholder}
      variant={variant}
      tags={tags}
    />
  )
}
