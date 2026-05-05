'use client'

import { cn } from '@ultraviolet/utils'
import { useId, useMemo } from 'react'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Helper } from '../Helper'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'

import { ToggleGroupContext } from './Context'
import { ToggleGroupToggle } from './SingleToggle'
import { toggleGroupStyle } from './styles.css'

import type { InputHTMLAttributes, ReactNode } from 'react'

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
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'required' | 'style' | 'aria-describedby'
  >

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
  'aria-describedby': ariaDescribedBy,
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
  const helperId = useId()

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <fieldset
          className={cn(className, toggleGroupStyle.fieldset)}
          style={style}
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
            <Stack direction={direction} gap={2}>
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
