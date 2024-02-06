import { TagInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

export type TagInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof TagInput>,
      | 'tags' // doubt
      | 'variant'
      | 'placeholder'
      | 'disabled'
      | 'className'
      | 'id'
      | 'data-testid'
      | 'clearable'
      | 'label'
      | 'labelDescription'
      | 'size'
      | 'success'
      | 'readOnly'
      | 'tooltip'
    >
  >

export const TagInputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  disabled,
  id,
  name,
  onChange,
  placeholder,
  required,
  rules,
  variant,
  shouldUnregister = false,
  'data-testid': dataTestId,
  clearable,
  label,
  labelDescription,
  size,
  success,
  readOnly,
  tooltip,
}: TagInputFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    rules: {
      required,
      shouldUnregister,
      ...rules,
    },
  })

  return (
    <TagInput
      name={field.name}
      className={className}
      disabled={disabled}
      id={id}
      onChange={newTags => {
        field.onChange(newTags)
        onChange?.(newTags as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      placeholder={placeholder}
      variant={variant}
      tags={field.value}
      data-testid={dataTestId}
      clearable={clearable}
      label={label}
      labelDescription={labelDescription}
      size={size}
      success={success}
      error={getError({ label: label ?? '' }, error)}
      readOnly={readOnly}
      tooltip={tooltip}
    />
  )
}
