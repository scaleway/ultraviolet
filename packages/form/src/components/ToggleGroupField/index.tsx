import { ToggleGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type ToggleGroupFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof ToggleGroup>,
      'className' | 'helper' | 'direction' | 'children' | 'error' | 'legend'
    >
  > &
  Required<Pick<ComponentProps<typeof ToggleGroup>, 'legend' | 'name'>>

export const ToggleGroupField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  legend,
  className,
  helper,
  direction,
  children,
  onChange,
  label,
  error: customError,
  name,
  required = false,
  shouldUnregister = false,
}: ToggleGroupFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      validate: required ? value => value.length > 0 : undefined,
    },
  })

  const value = field.value as string[]

  return (
    <ToggleGroup
      legend={legend}
      name={field.name}
      value={value}
      onChange={event => {
        if (value.includes(event.currentTarget.value)) {
          const newValue = value.filter(
            currentValue => currentValue !== event.currentTarget.value,
          )
          field.onChange(newValue)
          onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
        } else {
          const newValue = [...value, event.currentTarget.value]
          field.onChange(newValue)
          onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
        }
      }}
      error={customError ?? getError({ label: label ?? '' }, error)}
      className={className}
      direction={direction}
      helper={helper}
      required={required}
    >
      {children}
    </ToggleGroup>
  )
}

ToggleGroupField.Toggle = ToggleGroup.Toggle
