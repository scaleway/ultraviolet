import { NumberInputV2 } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type NumberInputV2Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof NumberInputV2>,
      | 'disabled'
      | 'id'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'value'
      | 'data-testid'
      | 'label'
      | 'tooltip'
      | 'unit'
      | 'size'
      | 'step'
      | 'className'
      | 'placeholder'
      | 'error'
      | 'success'
      | 'helper'
      | 'labelDescription'
      | 'aria-label'
      | 'autoFocus'
      | 'readOnly'
      | 'min'
      | 'max'
    >
  > & {
    className?: string
    name: string
    required?: boolean
  }

export const NumberInputFieldV2 = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  disabled,
  max,
  min,
  name,
  onChange,
  onBlur,
  size,
  step,
  unit,
  tooltip,
  className,
  label,
  labelDescription,
  id,
  placeholder,
  success,
  helper,
  rules,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  required,
  autoFocus,
  readOnly,
  shouldUnregister = false,
}: NumberInputV2Props<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      max,
      min,
      required,
      ...rules,
    },
  })

  return (
    <NumberInputV2
      name={field.name}
      value={field.value}
      disabled={disabled}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={newValue => {
        // React hook form doesnt allow undefined values after definition https://react-hook-form.com/docs/usecontroller/controller (that make sense)
        field.onChange(newValue ?? null)
        onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      max={max}
      min={min}
      size={size}
      step={step}
      className={className}
      data-testid={dataTestId}
      id={id}
      label={label}
      labelDescription={labelDescription}
      placeholder={placeholder}
      error={getError({ label: label ?? '', max, min }, error)}
      success={success}
      helper={helper}
      tooltip={tooltip}
      unit={unit}
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  )
}
