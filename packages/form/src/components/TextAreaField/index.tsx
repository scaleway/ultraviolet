import { TextArea } from '@ultraviolet/ui'
import type { ComponentProps, KeyboardEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

export type TextAreaFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof TextArea>,
    'value' | 'error' | 'name' | 'onChange'
  > & {
    regex?: (RegExp | RegExp[])[]
    submitOnEnter?: boolean
  }

/**
 * This component offers a form field based on Ultraviolet UI TextArea component
 */
export const TextAreaField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  autoFocus,
  clearable,
  className,
  tabIndex,
  control,
  'data-testid': dataTestId,
  disabled,
  helper,
  label,
  labelDescription,
  onChange,
  minLength,
  maxLength,
  name,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder,
  readOnly,
  required,
  rows,
  success,
  tooltip,
  regex: regexes,
  submitOnEnter,
  validate,
}: TextAreaFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    rules: {
      required,
      validate: {
        ...(regexes
          ? {
              pattern: value => validateRegex(value, regexes),
            }
          : {}),
        ...validate,
      },
      minLength,
      maxLength,
    },
  })

  const onKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (submitOnEnter && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      const { form } = event.currentTarget
      if (form) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true,
        })
        form.dispatchEvent(submitEvent)
      }
    } else {
      onKeyDown?.(event)
    }
  }

  return (
    <TextArea
      autoFocus={autoFocus}
      className={className}
      clearable={clearable}
      data-testid={dataTestId}
      disabled={disabled}
      error={getError(
        {
          regex: regexes,
          minLength,
          maxLength,
          label,
          value: field.value,
        },
        error,
      )}
      helper={helper}
      label={label}
      labelDescription={labelDescription}
      minLength={minLength}
      maxLength={maxLength}
      name={name}
      onBlur={event => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={event => {
        field.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onFocus={onFocus}
      onKeyDown={onKeyDownHandler}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rows={rows}
      success={success}
      tabIndex={tabIndex}
      tooltip={tooltip}
      value={field.value}
    />
  )
}
