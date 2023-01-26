import { Toggle } from '@scaleway/ui'
import type { ComponentProps } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

type ToggleFieldProps<T = unknown, K = unknown> = BaseFieldProps<T, K> &
  Pick<
    ComponentProps<typeof Toggle>,
    | 'disabled'
    | 'label'
    | 'onChange'
    | 'size'
    | 'tooltip'
    | 'labelPosition'
    | 'className'
  > & {
    name: string
    required?: boolean
  }

export const ToggleField = ({
  afterSubmit,
  allowNull,
  beforeSubmit,
  className,
  data,
  defaultValue,
  disabled,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  label,
  multiple,
  name,
  onChange,
  parse,
  required,
  size,
  subscription,
  tooltip,
  validate,
  validateFields,
  value,
  labelPosition,
}: ToggleFieldProps) => {
  const { input } = useFormField(name, {
    afterSubmit,
    allowNull,
    beforeSubmit,
    data,
    defaultValue,
    disabled,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    required,
    subscription,
    type: 'checkbox',
    validate,
    validateFields,
    value,
  })

  return (
    <Toggle
      checked={input.checked}
      tooltip={tooltip}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      label={label}
      size={size}
      name={name}
      disabled={disabled}
      labelPosition={labelPosition}
      className={className}
      required={required}
    />
  )
}
