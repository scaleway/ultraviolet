import { TextInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent, Ref } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

type TextInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
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
      | 'data-testid'
    >
  > & {
    className?: string
    regex?: (RegExp | RegExp[])[]

    format?: (value: unknown) => PathValue<TFieldValues, Path<TFieldValues>>
    parse?: (value: string) => PathValue<TFieldValues, Path<TFieldValues>>

    customError?: string
    formatOnBlur?: boolean
    innerRef?: Ref<HTMLInputElement>
  }

/**
 * @deprecated This component is deprecated, please use `TextInputFieldV2` instead
 */
export const TextInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
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
  valid,
  parse,
  format,
  formatOnBlur = false,
  regex: regexes,
  defaultValue,
  customError,
  innerRef,
  shouldUnregister = false,
  'data-testid': dataTestId,
  validate,
  min,
  max,
  minLength,
  maxLength,
  control,
}: TextInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    defaultValue,
    shouldUnregister,
    control,
    rules: {
      required,
      minLength,
      maxLength,
      min,
      max,
      validate: {
        ...(regexes
          ? {
              pattern: value => validateRegex(value, regexes),
            }
          : {}),
        ...validate,
      },
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
      onBlur={(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        field.onBlur()
        onBlur?.(event)
        if (formatOnBlur && format) {
          field.onChange(format(field.value))
        }
      }}
      onChange={(event: string) => {
        if (parse) {
          field.onChange(parse(event))
          onChange?.(parse(event))
        } else {
          field.onChange(event)
          onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
        }
      }}
      onFocus={(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      data-testid={dataTestId}
    />
  )
}
