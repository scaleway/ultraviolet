import type { ComponentProps, ReactNode } from 'react'
import { SelectableCard } from '../../SelectableCard'
import { Stack } from '../../Stack'
import styled from '@emotion/styled'
import { SelectInputV2 } from '../../SelectInputV2'
import { RadioStack } from '../../Radio'

const StyledSelectableCard = styled(SelectableCard)`
  ${RadioStack} {
    position: absolute;
  }
`

type OptionProps = ComponentProps<typeof SelectableCard> & {
  value: string
  className?: string
  children: ReactNode
  options: ComponentProps<typeof SelectInputV2>['options']
}

export const Option = ({
  value,
  label,
  'aria-label': ariaLabel,
  children,
  className,
  options,
}: OptionProps) => (
  <StyledSelectableCard
    value={value}
    onChange={() => {}}
    className={className}
    type="radio"
    showTick
    {...(label ? { label } : { 'aria-label': ariaLabel as string })}
  >
    <Stack alignItems="center" justifyContent="center" width="100%">
      {children}
    </Stack>
    <SelectInputV2
      value={value}
      onChange={() => {}}
      options={options}
      name="selectable-card-option"
    />
  </StyledSelectableCard>
)
