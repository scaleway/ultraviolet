import { TagInput } from '@scaleway/ui'
import type { ComponentProps } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

type TagInputProp = ComponentProps<typeof TagInput>['tags']

export type TagInputFieldProps<T = TagInputProp, K = string> = BaseFieldProps<
  T,
  K
> &
  Partial<
    Pick<
      ComponentProps<typeof TagInput>,
      | 'tags'
      | 'variant'
      | 'onChange'
      | 'placeholder'
      | 'disabled'
      | 'className'
      | 'id'
    >
  > & {
    name: string
    required?: boolean
  }

export const TagInputField = ({
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
}: TagInputFieldProps): JSX.Element => {
  const { input } = useFormField<TagInputProp>(name, {
    disabled,
    required,
    initialValue: tags,
    type: 'text',
    validate,
    value: tags,
  })

  return (
    <TagInput
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
      tags={input.value}
    />
  )
}
