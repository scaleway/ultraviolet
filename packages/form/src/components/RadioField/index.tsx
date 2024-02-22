import { Radio } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TName>, 'label'> &
  Partial<
    Pick<
      ComponentProps<typeof Radio>,
      | 'disabled'
      | 'id'
      | 'onBlur'
      | 'onFocus'
      | 'data-testid'
      | 'tooltip'
      | 'label'
    >
  > & {
    className?: string
  }

/**
 * @deprecated This component is deprecated, use `RadioGroupField` instead.
 */
export const RadioField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  'data-testid': dataTestId,
  disabled,
  id,
  name,
  onBlur,
  label = '',
  onChange,
  onFocus,
  required,
  value,
  rules,
  tooltip,
  shouldUnregister = false,
}: RadioFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  return (
    <Radio
      name={field.name}
      checked={field.value === value}
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      error={getError({ label: typeof label === 'string' ? label : '' }, error)}
      id={id}
      onChange={() => {
        field.onChange(value)
        onChange?.(value)
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onFocus={onFocus}
      required={required}
      value={value ?? ''}
      label={label}
      tooltip={tooltip}
    />
  )
}
