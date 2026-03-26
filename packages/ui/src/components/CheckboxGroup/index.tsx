'use client'

import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'

import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'

import { CheckboxGroupContext } from './Context'
import { CheckboxGroupCheckbox } from './SingleCheckbox'
import { checkboxGroupStyle } from './styles.css'

import type { InputHTMLAttributes, ReactNode } from 'react'

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
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required' | 'style'>

/**
 * CheckboxGroup is a component that groups a set of checkboxes together with a legend and helper/error text.
 */
const CheckboxGroup = ({
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
        <fieldset
          className={cn(className, checkboxGroupStyle.fieldset)}
          style={style}
        >
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
        </fieldset>
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

export { CheckboxGroupCheckbox, CheckboxGroup }
