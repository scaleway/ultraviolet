'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Label } from '../Label'
import { Row } from '../Row'
import { SelectableCard } from '../SelectableCard'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { selectableCardGroupFieldSet } from './styles.css'

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
  style,
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
      checked={
        typeof groupValue === 'object'
          ? groupValue.includes(value)
          : groupValue === value
      }
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      id={id}
      isError={isError || error}
      label={label}
      name={groupName}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      showTick={showTick}
      style={style}
      tooltip={tooltip}
      type={type}
      value={value}
    >
      {children}
    </SelectableCard>
  )
}

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
const SelectableCardGroupComponent = ({
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
      error: !!error,
      groupName: name,
      groupValue: value,
      onChange,
      required,
      showTick,
      type,
    }),
    [name, value, onChange, required, type, showTick, error],
  )

  return (
    <SelectableCardGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <fieldset className={cn(className, selectableCardGroupFieldSet)}>
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
    </SelectableCardGroupContext.Provider>
  )
}

type SelectableCardOptionGroupType = typeof SelectableCardGroupComponent & {
  Card: typeof CardSelectableCard
}

export const SelectableCardGroup: SelectableCardOptionGroupType = Object.assign(
  SelectableCardGroupComponent,
  {
    Card: CardSelectableCard,
  },
)
