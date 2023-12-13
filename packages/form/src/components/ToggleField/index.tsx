import { Toggle } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type ToggleFieldProps<TFieldValues extends FieldValues> = Omit<
  BaseFieldProps<TFieldValues>,
  'label'
> &
  Pick<
    ComponentProps<typeof Toggle>,
    | 'disabled'
    | 'label'
    | 'onChange'
    | 'size'
    | 'tooltip'
    | 'labelPosition'
    | 'className'
    | 'data-testid'
  > & {
    parse?: (value: boolean) => any
    format?: (value: any) => boolean
  }

export const ToggleField = <TFieldValues extends FieldValues>({
  className,
  disabled,
  label,
  name,
  onChange,
  required,
  size,
  tooltip,
  rules,
  labelPosition,
  parse,
  format,
  'data-testid': dataTestId,
  shouldUnregister = false,
}: ToggleFieldProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  const transformedValue = () => {
    if (format) {
      return format(field.value)
    }

    return field.value as boolean
  }

  return (
    <Toggle
      name={field.name}
      ref={field.ref}
      checked={transformedValue()}
      tooltip={tooltip}
      onChange={event => {
        if (parse) {
          field.onChange(parse(event.target.checked))
        } else {
          field.onChange(event)
        }
        onChange?.(event)
      }}
      label={label}
      size={size}
      disabled={disabled}
      labelPosition={labelPosition}
      className={className}
      required={required}
      data-testid={dataTestId}
    />
  )
}
