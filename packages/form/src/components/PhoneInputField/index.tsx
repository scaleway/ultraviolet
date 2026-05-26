'use client'

import { parsePhoneNumber } from '@scaleway/phonenumber'
import type { BaseFieldProps, FieldPath, FieldValues } from '@ultraviolet/form'
import { PhoneInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'

type PhoneInputValue = NonNullable<ComponentProps<typeof PhoneInput>['value']>

type PhoneFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = BaseFieldProps<
  TFieldValues,
  TName
> &
  ComponentProps<typeof PhoneInput> & {
    /**
     * message show to the user when the number is not a correct phone number
     */
    parseNumberErrorMessage: string
  }

export const PhoneInputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  'aria-label': ariaLabel,
  className,
  control,
  defaultCountry,
  disabled,
  errorLabel,
  id,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  required,
  'data-testid': dataTestId,
  parseNumberErrorMessage = "This doesn't appear to be a valid phone number.",
  onParsingError,
  shouldUnregister,
  ...props
}: PhoneFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error: fieldError },
  } = useController<TFieldValues>({
    control,
    name,
    rules: {
      validate: (phoneNumber: PhoneInputValue) => {
        try {
          return !!phoneNumber && !parsePhoneNumber(phoneNumber).valid ? parseNumberErrorMessage : undefined
        } catch (error: unknown) {
          if (error instanceof Error) {
            onParsingError?.({
              error,
              inputValue: phoneNumber,
            })
          }

          return phoneNumber
        }
      },
      required,
    },
    shouldUnregister,
  })

  const internalError = getError(
    {
      label: errorLabel ?? label ?? ariaLabel ?? name,
      value: field.value,
    },
    fieldError,
  )
  return (
    <PhoneInput
      {...props}
      className={className}
      data-testid={dataTestId}
      defaultCountry={defaultCountry}
      disabled={disabled}
      error={internalError}
      id={id}
      label={label}
      name={field.name}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={event => {
        field.onChange(event)
        onChange?.(event)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      onParsingError={onParsingError}
      placeholder={placeholder}
      required={required}
      value={field.value}
    />
  )
}
