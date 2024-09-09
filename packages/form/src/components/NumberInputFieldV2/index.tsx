import { NumberInputV2 } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { isInteger } from '../../validators/isInteger'

type NumberInputV2Props<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
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
      | 'controls'
    >
  > & {
    className?: string
  }

export const NumberInputFieldV2 = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  disabled,
  control,
  max = Number.MAX_SAFE_INTEGER,
  min = 0,
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
  controls = true,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  required,
  autoFocus,
  readOnly,
  shouldUnregister = false,
  validate,
}: NumberInputV2Props<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      max,
      min,
      required,
      validate: {
        ...validate,
        isInteger: isInteger(step),
      },
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
        field.onChange(newValue)
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
      error={getError({ label: label ?? '', max, min, isInteger: step }, error)}
      success={success}
      helper={helper}
      tooltip={tooltip}
      unit={unit}
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      readOnly={readOnly}
      required={required}
      controls={controls}
    />
  )
}
