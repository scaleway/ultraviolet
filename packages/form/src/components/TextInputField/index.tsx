import { TextInput } from '@ultraviolet/ui'
import type { ComponentProps, Ref } from 'react'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type TextInputFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof TextInput>,
        | 'autoCapitalize'
        | 'autoComplete'
        | 'autoCorrect'
        | 'autoFocus'
        | 'autoSave'
        | 'cols'
        | 'disabled'
        | 'fillAvailable'
        | 'generated'
        | 'id'
        | 'multiline'
        | 'notice'
        | 'onBlur'
        | 'onFocus'
        | 'onKeyDown'
        | 'onKeyUp'
        | 'placeholder'
        | 'random'
        | 'readOnly'
        | 'resizable'
        | 'rows'
        | 'type'
        | 'noTopLabel'
        | 'unit'
        | 'valid'
        | 'size'
        | 'maxLength'
        | 'minLength'
        | 'min'
        | 'max'
      >
    > & {
      className?: string
      /**
       * @deprecated Use rules instead
       */
      regex?: (RegExp | RegExp[])[]

      format?: (value: unknown) => PathValue<TFieldValues, Path<TFieldValues>>
      parse?: (value: string) => PathValue<TFieldValues, Path<TFieldValues>>

      customError?: string
      formatOnBlur?: boolean
      innerRef?: Ref<HTMLInputElement>
    }

export const TextInputField = <TFieldValues extends FieldValues>({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  autoFocus,
  autoSave,
  className,
  cols,
  disabled,
  fillAvailable,
  generated,
  id,
  label = '',
  multiline,
  name,
  noTopLabel,
  notice,
  onChange,
  onFocus,
  onKeyDown,
  onKeyUp,
  onBlur,
  placeholder,
  random,
  readOnly,
  required,
  resizable,
  rows,
  type,
  unit,
  size,
  rules,
  valid,
  parse,
  format,
  formatOnBlur = false,
  regex: regexes,
  min,
  max,
  minLength,
  maxLength,
  validate,
  defaultValue,
  customError,
  innerRef,
}: TextInputFieldProps<TFieldValues>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    defaultValue,
    rules: {
      required,
      validate: {
        ...(regexes
          ? {
              pattern: value =>
                regexes.every(
                  regex =>
                    value === undefined ||
                    value === '' ||
                    (Array.isArray(regex)
                      ? regex.some(regexOr => regexOr.test(value))
                      : regex.test(value)),
                ),
            }
          : {}),
        ...validate,
      },
      minLength,
      maxLength,
      max,
      min,
      ...rules,
    },
  })

  const transformedValue = () => {
    if (format && !formatOnBlur) {
      return format(field.value) as string
    }

    return field.value as string
  }

  return (
    <TextInput
      name={field.name}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
      autoFocus={autoFocus}
      autoSave={autoSave}
      className={className}
      cols={cols}
      disabled={disabled}
      error={
        customError ??
        getError(
          {
            regex: regexes,
            minLength,
            maxLength,
            label,
            min,
            max,
            value: field.value,
          },
          error,
        )
      }
      fillAvailable={fillAvailable}
      generated={generated}
      id={id}
      label={label}
      multiline={multiline}
      notice={notice}
      required={required}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
        if (formatOnBlur && format) {
          field.onChange(format(field.value))
        }
      }}
      onChange={event => {
        if (parse) {
          field.onChange(parse(event))
          onChange?.(parse(event))
        } else {
          field.onChange(event)
          onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
        }
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      random={random}
      readOnly={readOnly}
      resizable={resizable}
      rows={rows}
      type={type}
      noTopLabel={noTopLabel}
      unit={unit}
      valid={valid}
      size={size}
      value={transformedValue()}
      ref={innerRef}
    />
  )
}
