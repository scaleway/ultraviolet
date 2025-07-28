'use client'

import styled from '@emotion/styled'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Label } from '../Label'
import { Radio } from '../Radio'
import { Stack } from '../Stack'
import { Text } from '../Text'

type RadioGroupContextType = {
  groupName?: string
  groupValue: string | number
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined,
)

type RadioGroupRadioProps = Omit<
  ComponentProps<typeof Radio>,
  'onChange' | 'checked' | 'required' | 'name'
>
const RadioGroupRadio = ({
  onFocus,
  onBlur,
  disabled,
  error,
  value,
  label,
  helper,
  className,
  autoFocus,
  onKeyDown,
  tooltip,
  'data-testid': dataTestId,
}: RadioGroupRadioProps) => {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error('RadioGroup.Radio can only be used inside a RadioGroup')
  }

  const { groupName, onChange, groupValue, error: errorContext } = context

  return (
    <Radio
      autoFocus={autoFocus}
      checked={groupValue === value}
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      error={error || errorContext}
      helper={helper}
      label={label}
      name={groupName}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      tooltip={tooltip}
      value={value}
    />
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

type RadioGroupProps = {
  legend?: string
  legendDescription?: ReactNode
  value: string | number
  className?: string
  helper?: ReactNode
  error?: ReactNode
  direction?: 'row' | 'column'
  children: ReactNode
  description?: ReactNode
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required' | 'name'>

/**
 * RadioGroup is a component that allows users to select one option from a list of options using radio.
 */
export const RadioGroup = ({
  legend,
  legendDescription,
  value,
  className,
  helper,
  error,
  direction = 'column',
  children,
  onChange,
  name,
  description,
  required = false,
}: RadioGroupProps) => {
  const contextValue = useMemo(
    () => ({
      error: !!error,
      groupName: name,
      groupValue: value,
      onChange,
      required,
    }),
    [name, value, onChange, required, error],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            {legend || description ? (
              <Stack gap={0.5}>
                {legend ? (
                  <Label
                    as="legend"
                    labelDescription={legendDescription}
                    required={required}
                  >
                    {legend}
                  </Label>
                ) : null}
                {description ? (
                  <Text
                    as={typeof description === 'string' ? 'p' : 'div'}
                    prominence="weak"
                    sentiment="neutral"
                    variant="bodySmall"
                  >
                    {description}
                  </Text>
                ) : null}
              </Stack>
            ) : null}
            <Stack
              alignItems="start"
              direction={direction}
              gap={direction === 'column' ? 1 : 2}
            >
              {children}
            </Stack>
          </Stack>
        </FieldSet>
        {helper ? (
          <Text
            as="span"
            prominence="weak"
            sentiment="neutral"
            variant="caption"
          >
            {helper}
          </Text>
        ) : null}
        {error ? (
          <Text as="span" sentiment="danger" variant="caption">
            {error}
          </Text>
        ) : null}
      </Stack>
    </RadioGroupContext.Provider>
  )
}

RadioGroup.Radio = RadioGroupRadio
