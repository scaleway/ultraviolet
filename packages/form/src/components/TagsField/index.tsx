import { Tags } from '@scaleway/ui'
import type { ComponentProps } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

type TagsProp = ComponentProps<typeof Tags>['tags']

export type TagsFieldProps<T = TagsProp, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Tags>,
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
  const { input } = useFormField<TagsProp>(name, {
    disabled,
    required,
    initialValue: tags,
    type: 'text',
    validate,
    value: tags,
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
      tags={input.value}
    />
  )
}
