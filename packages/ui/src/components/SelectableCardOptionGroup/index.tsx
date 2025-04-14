'use client'

import styled from '@emotion/styled'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { useMemo } from 'react'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { SelectableCardOptionGroupContext } from './Provider'
import { Option } from './components/Option'
import type { Sizes } from './types'

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

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
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>

/**
 * SelectableCardOptionGroup gives you a group of SelectInput within a SelectableCard component.
 * It's an input that provide the choice of one value and sub options to choose from.
 *
 * **Be aware that once you click on the component, the first value of options will be selected by default.**
 */
export const SelectableCardOptionGroup = ({
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
}: SelectableCardOptionGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValue: value,
      onChange,
      onChangeOption,
      optionValue,
      required,
      disabled,
      error: !!error,
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
      <Stack gap={1}>
        <FieldSet className={className}>
          <Stack gap={1.5}>
            {legend ? (
              <Label
                as="legend"
                required={required}
                labelDescription={legendDescription}
              >
                {legend}
              </Label>
            ) : null}
            <Row gap={2} templateColumns={`repeat(${columns}, minmax(0, 1fr))`}>
              {children}
            </Row>
          </Stack>
        </FieldSet>
        {(error && typeof error === 'string') || helper ? (
          <Text
            as="span"
            variant="caption"
            prominence="weak"
            sentiment={error ? 'danger' : 'neutral'}
          >
            {helper || error}
          </Text>
        ) : null}
      </Stack>
    </SelectableCardOptionGroupContext.Provider>
  )
}

SelectableCardOptionGroup.Option = Option
