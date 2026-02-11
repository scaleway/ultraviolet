'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Toggle } from '../Toggle'
import { fieldset } from './styles.css'

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
  style,
}: ToggleGroupToggleProps) => {
  const context = useContext(ToggleGroupContext)

  if (!context) {
    throw new Error('ToggleGroup.Toggle can only be used inside a ToggleGroup')
  }

  const { groupName, onChange, groupValues, error: contextError } = context

  const ToggleName = `${groupName}.${name}`
  const ToggleValue = value.toString()

  return (
    <Toggle
      checked={groupValues?.includes(ToggleValue)}
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      error={error || contextError}
      helper={helper}
      label={label}
      name={ToggleName}
      onChange={onChange}
      style={style}
      value={ToggleValue}
    />
  )
}

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
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required' | 'style'>

const ToggleGroupComponent = ({
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
  style,
}: ToggleGroupProps) => {
  const contextValue = useMemo(
    () => ({
      error: !!error,
      groupName: name,
      groupValues: value ?? [],
      onChange,
    }),
    [name, value, onChange, error],
  )

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <fieldset className={cn(className, fieldset)} style={style}>
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
            <Stack direction={direction} gap={2}>
              {children}
            </Stack>
          </Stack>
        </fieldset>
        {helper ? (
          <Text as="p" prominence="weak" sentiment="neutral" variant="caption">
            {helper}
          </Text>
        ) : null}
        {error ? (
          <Text as="p" prominence="weak" sentiment="danger" variant="bodySmall">
            {error}
          </Text>
        ) : null}
      </Stack>
    </ToggleGroupContext.Provider>
  )
}

type SelectableCardOptionGroupType = typeof ToggleGroupComponent & {
  Toggle: typeof ToggleGroupToggle
}

export const ToggleGroup: SelectableCardOptionGroupType = Object.assign(
  ToggleGroupComponent,
  {
    Toggle: ToggleGroupToggle,
  },
)
