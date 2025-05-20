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
import { Row } from '../Row'
import { SelectableCard } from '../SelectableCard'
import { Stack } from '../Stack'
import { Text } from '../Text'

type SelectableCardGroupContextType = {
  groupName?: string
  groupValue: string | number | (string | number)[]
  type: 'radio' | 'checkbox'
  showTick: boolean
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

const SelectableCardGroupContext = createContext<
  SelectableCardGroupContextType | undefined
>(undefined)

export type CardSelectableCardProps = Omit<
  ComponentProps<typeof SelectableCard>,
  'onChange' | 'checked' | 'type' | 'showTick'
>

const CardSelectableCard = ({
  value,
  disabled,
  children,
  className,
  isError,
  onFocus,
  onBlur,
  tooltip,
  id,
  label,
  'data-testid': dataTestId,
}: CardSelectableCardProps) => {
  const context = useContext(SelectableCardGroupContext)

  if (!context) {
    throw new Error(
      'SelectableCardGroup.Card can only be used inside a SelectableCardGroup',
    )
  }

  const { groupName, onChange, groupValue, type, showTick, error } = context

  return (
    <SelectableCard
      name={groupName}
      value={value}
      showTick={showTick}
      type={type}
      disabled={disabled}
      className={className}
      isError={isError || error}
      onFocus={onFocus}
      onBlur={onBlur}
      tooltip={tooltip}
      id={id}
      label={label}
      onChange={onChange}
      checked={
        typeof groupValue === 'object'
          ? groupValue.includes(value)
          : groupValue === value
      }
      data-testid={dataTestId}
    >
      {children}
    </SelectableCard>
  )
}

const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`

type SelectableCardGroupProps = {
  legend?: string
  legendDescription?: ReactNode
  value: string | number | (string | number)[]
  className?: string
  helper?: ReactNode
  error?: ReactNode
  columns?: number
  children: ReactNode
  type: 'radio' | 'checkbox'
  required?: boolean
  showTick?: boolean
  name?: string
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>>

/**
 * SelectableCardGroup is a component that allows users to select cards from a list of cards using SelectableCard.
 */
export const SelectableCardGroup = ({
  legend,
  legendDescription,
  value,
  className,
  helper,
  error,
  columns = 1,
  children,
  onChange,
  name,
  required = false,
  type,
  showTick = false,
}: SelectableCardGroupProps) => {
  const contextValue = useMemo(
    () => ({
      groupName: name,
      groupValue: value,
      onChange,
      required,
      type,
      showTick,
      error: !!error,
    }),
    [name, value, onChange, required, type, showTick, error],
  )

  return (
    <SelectableCardGroupContext.Provider value={contextValue}>
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
        {helper ? (
          <Text
            as="span"
            variant="caption"
            prominence="weak"
            sentiment="neutral"
          >
            {helper}
          </Text>
        ) : null}
        {error ? (
          <Text as="span" variant="caption" sentiment="danger">
            {error}
          </Text>
        ) : null}
      </Stack>
    </SelectableCardGroupContext.Provider>
  )
}

SelectableCardGroup.Card = CardSelectableCard
