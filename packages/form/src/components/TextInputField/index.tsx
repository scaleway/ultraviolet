import { TextInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
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
        | 'label'
        | 'multiline'
        | 'notice'
        | 'onBlur'
        | 'onChange'
        | 'onFocus'
        | 'onKeyDown'
        | 'onKeyUp'
        | 'placeholder'
        | 'random'
        | 'readOnly'
        | 'required'
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
  regex: regexes,
  min,
  max,
  minLength,
  maxLength,
  validate,
  defaultValue,
}: TextInputFieldProps<TFieldValues>) => {
  const { getError } = useErrors()

  return (
    <Controller<TFieldValues>
      name={name}
      rules={{
        required,
        pattern:
          regexes &&
          new RegExp(
            regexes
              .map(regex => {
                const newRegex = Array.isArray(regex)
                  ? regex.map(reg => reg.source).join('|')
                  : regex.source

                return `(?=${newRegex})`
              })
              .join(''),
          ),
        validate,
        minLength,
        maxLength,
        ...rules,
      }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const transformedValue = () => {
          if (format) {
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
            error={getError(
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
            )}
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
            }}
            onChange={event => {
              if (parse) {
                field.onChange(parse(event))
              } else {
                field.onChange(event)
              }
              onChange?.(event)
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
          />
        )
      }}
    />
  )
}
