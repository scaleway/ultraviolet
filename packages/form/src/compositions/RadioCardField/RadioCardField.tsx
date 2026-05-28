import { RadioCard } from '@ultraviolet/ui/compositions/RadioCard'
import type { ComponentProps, ReactNode } from 'react'
import type { BaseFieldProps, FieldPath, FieldValues } from '../..'
import { useController, useErrors } from '../..'

type InternalProps = {
  children?: ReactNode
  label: string
  name: string
  required?: boolean
  parse?: (value: string) => string | number
}

type RadioCardFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseFieldProps<
  TFieldValues,
  TName
> &
  Partial<
    Pick<
      ComponentProps<typeof RadioCard>,
      | 'badgeSize'
      | 'badgeText'
      | 'badgeVariant'
      | 'disabled'
      | 'labelDescription'
      | 'value'
      | 'onChange'
      | 'onBlur'
      | 'onFocus'
      | 'data-testid'
    >
  > &
  InternalProps

export const RadioCardField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  badgeSize,
  badgeText,
  badgeVariant,
  children,
  disabled,
  label,
  labelDescription,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  value,
  parse,
  'data-testid': dataTestId,
}: RadioCardFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    rules: {
      required,
    },
  })

  return (
    <RadioCard
      badgeSize={badgeSize}
      badgeText={badgeText}
      badgeVariant={badgeVariant}
      checked={field.value === value}
      data-testid={dataTestId}
      disabled={disabled}
      error={getError({ label }, error)}
      label={label}
      labelDescription={labelDescription}
      name={field.name}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={event => {
        if (parse) {
          field.onChange(parse(event.target.value))
        } else {
          field.onChange(event)
        }
        onChange?.(event)
      }}
      onFocus={onFocus}
      value={value ?? ''}
    >
      {children}
    </RadioCard>
  )
}
