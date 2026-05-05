'use client'

import { cn } from '@ultraviolet/utils'
import { useId, useMemo } from 'react'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Helper } from '../Helper'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'

import { RadioGroupContext } from './Context'
import { RadioGroupRadio } from './SingleRadio'
import { radioGRoupStyle } from './styles.css'

import type { InputHTMLAttributes, ReactNode } from 'react'

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
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'required' | 'name' | 'aria-describedby'
  >

/**
 * RadioGroup is a component that allows users to select one option from a list of options using radio.
 */
const RadioGroupComponent = ({
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
  'aria-describedby': ariaDescribedBy,
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
  const helperId = useId()

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <fieldset
          className={cn(className, radioGRoupStyle.fieldset)}
          aria-describedby={
            !ariaDescribedBy && hasHelperText(helper, error)
              ? helperId
              : ariaDescribedBy
          }
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
            <Stack
              alignItems="flex-start"
              direction={direction}
              gap={direction === 'column' ? 1 : 2}
            >
              {children}
            </Stack>
          </Stack>
        </fieldset>
        <Helper
          helper={helper}
          error={error}
          id={ariaDescribedBy ?? helperId}
        />
      </Stack>
    </RadioGroupContext.Provider>
  )
}

type SelectableCardOptionGroupType = typeof RadioGroupComponent & {
  Radio: typeof RadioGroupRadio
}

export const RadioGroup: SelectableCardOptionGroupType = Object.assign(
  RadioGroupComponent,
  {
    Radio: RadioGroupRadio,
  },
)
