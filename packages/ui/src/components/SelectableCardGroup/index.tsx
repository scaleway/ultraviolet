'use client'

import { cn } from '@ultraviolet/utils'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId, useMemo } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import { Description } from '../Description'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { SelectableCardGroupContext } from './Context'
import { SelectableCardGroupLabel } from './Label'
import { CardSelectableCard } from './SingleCard'
import { selectableCardGroupStyle } from './styles.css'

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
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'aria-describedby'>

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
  'aria-describedby': ariaDescribedBy,
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
  const helperId = useId()

  return (
    <SelectableCardGroupContext.Provider value={contextValue}>
      <Stack gap={1}>
        <fieldset
          className={cn(className, selectableCardGroupStyle.fieldset)}
          aria-describedby={ariaDescribedBy || (hasHelperText(helper, error) ? helperId : undefined)}
        >
          <Stack gap={1.5}>
            {legend ? (
              <Label as="legend" labelDescription={legendDescription} required={required}>
                {legend}
              </Label>
            ) : null}
            <Row gap={2} templateColumns={`repeat(${columns}, minmax(0, 1fr))`}>
              {children}
            </Row>
          </Stack>
        </fieldset>
        <Description helper={helper} error={error} id={ariaDescribedBy ?? helperId} />
      </Stack>
    </SelectableCardGroupContext.Provider>
  )
}

type SelectableCardOptionGroupType = typeof SelectableCardGroupComponent & {
  Card: typeof CardSelectableCard
  Label: typeof SelectableCardGroupLabel
}

SelectableCardGroupComponent.displayName = 'SelectableCardGroup'

export const SelectableCardGroup: SelectableCardOptionGroupType = Object.assign(SelectableCardGroupComponent, {
  Card: CardSelectableCard,
  Label: SelectableCardGroupLabel,
})
