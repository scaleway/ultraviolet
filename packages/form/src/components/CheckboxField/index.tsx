import { Checkbox } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'value'> &
  Omit<ComponentProps<typeof Checkbox>, 'value' | 'onChange'> & {
    className?: string
    children?: ReactNode
  }

export const CheckboxField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  disabled,
  required,
  children,
  onChange,
  onBlur,
  shouldUnregister = false,
  validate,
  'aria-label': ariaLabel,
  ...props
}: CheckboxFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    disabled,
    shouldUnregister,
    control,
    rules: {
      required,
      validate,
    },
  })

  return (
    <Checkbox
      {...props}
      name={field.name}
      onChange={event => {
        field.onChange(event.target.checked)
        onChange?.(
          event.target.checked as PathValue<TFieldValues, Path<TFieldValues>>,
        )
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      disabled={field.disabled}
      checked={!!field.value}
      error={getError({ label: label ?? ariaLabel ?? name }, error)}
      ref={field.ref}
      {...(label
        ? { children: label, 'aria-label': undefined }
        : { 'aria-label': ariaLabel as string })}
    />
  )
}
