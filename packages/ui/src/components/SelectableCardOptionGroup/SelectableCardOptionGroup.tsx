'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { useMemo } from 'react'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Option } from './components/Option'
import { SelectableCardOptionGroupContext } from './Provider'
import { selectableCardOptionFieldSet } from './styles.css'
import type { Sizes } from './types'

type SelectableCardOptionGroupProps = {
  legend?: string
  legendDescription?: ReactNode
  className?: string
  required?: boolean
  columns?: number
  children: ReactNode
  helper?: ReactNode
  error?: ReactNode
  /**
   * The value that is selected among selectable card options.
   */
  value?: ComponentProps<typeof Option>['value']
  /**
   * The value that is selected among select input options.
   */
  optionValue?: ComponentProps<typeof Option>['optionValue']
  onChangeOption: (value: string) => void
  disabled?: boolean
  size?: Sizes
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'style'>

/**
 * SelectableCardOptionGroup gives you a group of SelectInput within a SelectableCard component.
 * It's an input that provide the choice of one value and sub options to choose from.
 *
 * **Be aware that once you click on the component, the first value of options will be selected by default.**
 */
const SelectableCardOptionGroupComponent = ({
  legend,
  legendDescription,
  className,
  required,
  columns = 3,
  children,
  helper,
  error,
  onChange,
  value,
  optionValue,
  onChangeOption,
  name,
  disabled,
  size = 'large',
  style,
}: SelectableCardOptionGroupProps) => {
  const contextValue = useMemo(
    () => ({
      disabled,
      error: !!error,
      groupName: name,
      groupValue: value,
      onChange,
      onChangeOption,
      optionValue,
      required,
      size,
    }),
    [
      disabled,
      error,
      name,
      onChange,
      onChangeOption,
      optionValue,
      required,
      value,
      size,
    ],
  )

  return (
    <SelectableCardOptionGroupContext.Provider value={contextValue}>
      <Stack gap={1} style={style}>
        <fieldset className={cn(className, selectableCardOptionFieldSet)}>
          <Stack gap={1.5}>
            {legend ? (
              <Label
                as="legend"
                labelDescription={legendDescription}
                required={required}
              >
                {legend}
              </Label>
            ) : null}
            <Row gap={2} templateColumns={`repeat(${columns}, minmax(0, 1fr))`}>
              {children}
            </Row>
          </Stack>
        </fieldset>
        {(error && typeof error === 'string') || helper ? (
          <Text
            as="span"
            prominence="weak"
            sentiment={error ? 'danger' : 'neutral'}
            variant="caption"
          >
            {helper || error}
          </Text>
        ) : null}
      </Stack>
    </SelectableCardOptionGroupContext.Provider>
  )
}

type SelectableCardOptionGroupType =
  typeof SelectableCardOptionGroupComponent & {
    Option: typeof Option
  }

export const SelectableCardOptionGroup: SelectableCardOptionGroupType =
  Object.assign(SelectableCardOptionGroupComponent, {
    Option,
  })
