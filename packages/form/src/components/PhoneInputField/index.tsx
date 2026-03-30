'use client'

import { PhoneInput } from '@ultraviolet/ui'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { useController } from 'react-hook-form'

import { useErrors } from '../../providers'

import type { BaseFieldProps, FieldPath, FieldValues } from '@ultraviolet/form'
import type { ComponentProps } from 'react'

type PhoneInputValue = NonNullable<ComponentProps<typeof PhoneInput>['value']>

type PhoneFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  ComponentProps<typeof PhoneInput> & {
    /**
     * message show to the user when the number is not a correct phone number
     */
    parseNumberErrorMessage: string
  }

export const PhoneField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  disabled,
  id,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  defaultCountry,
  placeholder,
  'data-testid': dataTestId,
  parseNumberErrorMessage = "This doesn't appear to be a valid phone number.",
  onParsingError,
}: PhoneFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error: fieldError },
  } = useController<TFieldValues>({
    name,
    rules: {
      required,
      validate: (phoneNumber: PhoneInputValue) => {
        try {
          return !!phoneNumber && !parsePhoneNumber(phoneNumber).valid
            ? parseNumberErrorMessage
            : undefined
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
    },
  })

  return (
    <PhoneInput
      className={className}
      data-testid={dataTestId}
      defaultCountry={defaultCountry}
      disabled={disabled}
      error={getError({ label: label ?? '' }, fieldError)}
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
      ref={field.ref}
      required={required}
      value={field.value}
    />
  )
}
