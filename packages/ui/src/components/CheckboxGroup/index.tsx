'use client'

import styled from '@emotion/styled'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Checkbox } from '../Checkbox'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'

type CheckboxGroupContextType = {
  groupName: string
  groupValues: string[]
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined)

const StyledCheckbox = styled(Checkbox)`
  label {
    width: fit-content;
  }
`

type CheckboxGroupCheckboxProps = Omit<
  ComponentProps<typeof Checkbox>,
  'onChange' | 'checked'
> & {
  value: string
}

export const CheckboxGroupCheckbox = ({
  onFocus,
  onBlur,
  disabled,
  error,
  name,
  value,
  children,
  helper,
  className,
  autoFocus,
  'data-testid': dataTestId,
  required,
  tooltip,
}: CheckboxGroupCheckboxProps) => {
  const context = useContext(CheckboxGroupContext)

  if (!context) {
    throw new Error(
      'CheckboxGroup.Checkbox can only be used inside a CheckboxGroup',
    )
  }

  const { groupName, onChange, groupValues, error: errorContext } = context

  const checkboxName = `${groupName}.${name ?? ''}`
  const checkboxValue = `${value}`

  return (
    <StyledCheckbox
      autoFocus={autoFocus}
      checked={groupValues?.includes(checkboxValue)}
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      error={error || errorContext}
      helper={helper}
      name={checkboxName}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      required={required}
      tooltip={tooltip}
      value={checkboxValue}
    >
      {children}
    </StyledCheckbox>
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

type CheckboxGroupProps = {
  legend?: string
  legendDescription?: ReactNode
  value?: string[]
  className?: string
  helper?: ReactNode
  error?: ReactNode
  direction?: 'row' | 'column'
  children: ReactNode
  required?: boolean
  description?: ReactNode
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

/**
 * CheckboxGroup is a component that groups a set of checkboxes together with a legend and helper/error text.
 */
export const CheckboxGroup = ({
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
}: CheckboxGroupProps) => {
  const contextValue = useMemo(
    () => ({
      error: !!error,
      groupName: name,
      groupValues: value ?? [],
      onChange,
      required,
    }),
    [name, value, onChange, required, error],
  )

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
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
            <Stack direction={direction} gap={direction === 'column' ? 1 : 2}>
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
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.Checkbox = CheckboxGroupCheckbox
