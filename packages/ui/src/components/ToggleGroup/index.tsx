'use client'

import styled from '@emotion/styled'
import {
  type ComponentProps,
  type InputHTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Toggle } from '../Toggle'

type ToggleGroupContextType = {
  groupName: string
  groupValues: string[]
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const ToggleGroupContext = createContext<ToggleGroupContextType | undefined>(
  undefined,
)

type ToggleGroupToggleProps = Omit<
  ComponentProps<typeof Toggle>,
  'onChange' | 'checked' | 'required'
> & {
  value: string
}

/**
 * ToggleGroup is a component that allows you to group a set of Toggle components together under the same legend.
 */
export const ToggleGroupToggle = ({
  disabled,
  name,
  value,
  label,
  helper,
  error,
  className,
  'data-testid': dataTestId,
}: ToggleGroupToggleProps) => {
  const context = useContext(ToggleGroupContext)

  if (!context) {
    throw new Error('ToggleGroup.Toggle can only be used inside a ToggleGroup')
  }

  const { groupName, onChange, groupValues, error: contextError } = context

  const ToggleName = `${groupName}.${name}`
  const ToggleValue = `${value}`

  return (
    <Toggle
      onChange={onChange}
      checked={groupValues?.includes(ToggleValue)}
      disabled={disabled}
      name={ToggleName}
      value={ToggleValue}
      helper={helper}
      className={className}
      data-testid={dataTestId}
      label={label}
      error={error || contextError}
    />
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

type ToggleGroupProps = {
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

export const ToggleGroup = ({
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
}: ToggleGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValues: value ?? [],
      onChange,
      error: !!error,
    }),
    [name, value, onChange, error],
  )

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            {legend || description ? (
              <Stack gap={0.5}>
                {legend ? (
                  <Label
                    as="legend"
                    required={required}
                    labelDescription={legendDescription}
                  >
                    {legend}
                  </Label>
                ) : null}
                {description ? (
                  <Text
                    variant="bodySmall"
                    as={typeof description === 'string' ? 'p' : 'div'}
                    prominence="weak"
                    sentiment="neutral"
                  >
                    {description}
                  </Text>
                ) : null}
              </Stack>
            ) : null}
            <Stack gap={2} direction={direction}>
              {children}
            </Stack>
          </Stack>
        </FieldSet>
        {helper ? (
          <Text as="p" sentiment="neutral" variant="caption" prominence="weak">
            {helper}
          </Text>
        ) : null}
        {error ? (
          <Text as="p" variant="bodySmall" sentiment="danger" prominence="weak">
            {error}
          </Text>
        ) : null}
      </Stack>
    </ToggleGroupContext.Provider>
  )
}

ToggleGroup.Toggle = ToggleGroupToggle
