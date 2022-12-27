import { TextBox } from '@scaleway/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps, FocusEvent, Ref } from 'react'
import { forwardRef } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers/ErrorContext'
import type { BaseFieldProps } from '../../types'

type TextBoxValue = NonNullable<ComponentProps<typeof TextBox>['value']>

type TextBoxFieldProps<T = TextBoxValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof TextBox>,
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
      | 'maxLength'
      | 'minLength'
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
      | 'value'
      | 'noTopLabel'
      | 'unit'
      | 'unitAlignment'
    >
  > & {
    name: string
    className?: string
    max?: number
    min?: number
    regex?: (RegExp | RegExp[])[]
  }

export const TextBoxField = forwardRef(
  (
    {
      afterSubmit,
      allowNull,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      autoSave,
      beforeSubmit,
      className,
      cols,
      defaultValue,
      disabled,
      fillAvailable,
      format,
      formatOnBlur,
      generated,
      id,
      initialValue,
      isEqual,
      label = '',
      max,
      maxLength,
      min,
      minLength,
      multiline,
      multiple,
      name,
      noTopLabel,
      notice,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp,
      parse,
      placeholder,
      random,
      readOnly,
      regex,
      required,
      resizable,
      rows,
      subscription,
      type,
      unit,
      unitAlignment,
      validate,
      validateFields,
      value,
    }: TextBoxFieldProps,
    ref: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const { getError } = useErrors()

    const { input, meta } = useFormField(name, {
      afterSubmit,
      allowNull,
      beforeSubmit,
      defaultValue,
      disabled,
      format,
      formatOnBlur,
      initialValue,
      isEqual,
      max,
      maxLength,
      min,
      minLength,
      multiple,
      parse,
      regex,
      required,
      subscription,
      type,
      validate,
      validateFields,
      value,
    })

    const error = getError({
      label,
      max,
      maxLength,
      meta: meta as FieldState<unknown>,
      min,
      minLength,
      name,
      regex,
      value: input.value,
    })

    return (
      <TextBox
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        autoSave={autoSave}
        className={className}
        cols={cols}
        disabled={disabled}
        error={error}
        fillAvailable={fillAvailable}
        generated={generated}
        id={id}
        label={label}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        multiline={multiline}
        name={input.name}
        notice={notice}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          input.onBlur(event)
          onBlur?.(event)
        }}
        onChange={event => {
          input.onChange(event)
          onChange?.(event)
        }}
        onFocus={(event: FocusEvent<HTMLInputElement>) => {
          input.onFocus(event)
          onFocus?.(event)
        }}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        random={random}
        readOnly={readOnly}
        ref={ref}
        required={required}
        resizable={resizable}
        rows={rows}
        type={input.type}
        value={input.value}
        noTopLabel={noTopLabel}
        unit={unit}
        unitAlignment={unitAlignment}
      />
    )
  },
)
