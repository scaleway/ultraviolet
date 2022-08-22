import styled from '@emotion/styled'
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useState,
} from 'react'
import BorderedBox from '../BorderedBox'
import SelectableCard from '../SelectableCard'
import Tooltip from '../Tooltip'

const StyledBorderedBox = styled(BorderedBox)`
  padding: ${({ theme }) => theme.space['0.5']};
  display: inline-flex;
  gap: ${({ theme }) => theme.space['1']};
`

type SwitchButtonProps = {
  name: string
  onBlur?: FocusEventHandler
  onChange: ChangeEventHandler
  onFocus?: FocusEventHandler
  tooltip?: string
  selected?: 'left' | 'right'
  leftValue: string | number
  rightValue: string | number
  leftText: string
  rightText: string
}

const StyledSelectableCard = styled(SelectableCard)<{ checked: boolean }>`
  border: none;
  color: ${({ theme }) => theme.colors.primary.textWeak};
  height: 40px;
  padding: ${({ theme }) => theme.space['1']} ${({ theme }) => theme.space['2']};
  justify-content: center;
  align-items: center;
  transition: all 200ms ease;

  &:hover,
  &:focus-within,
  &:active {
    background: ${({ theme }) => theme.colors.primary.backgroundWeakHover};
    border: none;
  }

  ${({ checked, theme }) =>
    checked
      ? `
  background: ${theme.colors.primary.backgroundStrong};
  color: ${theme.colors.primary.textStrong};

  &:hover,
  &:focus-within,
  &:active {
    background: ${theme.colors.primary.backgroundStrongHover};
        border: none;
  }
  `
      : null}
`

const SwitchButton = ({
  selected = 'left',
  onChange,
  onFocus,
  onBlur,
  name,
  leftValue,
  rightValue,
  leftText,
  rightText,
  tooltip,
}: SwitchButtonProps) => {
  const [localValue, setLocalValue] = useState(
    selected === 'left' ? leftValue : rightValue,
  )
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setLocalValue(event.target.value)
  }

  return (
    <Tooltip text={tooltip}>
      <StyledBorderedBox>
        <StyledSelectableCard
          name={name}
          value={leftValue}
          checked={localValue === leftValue}
          onChange={handleOnChange}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {leftText}
        </StyledSelectableCard>
        <StyledSelectableCard
          name={name}
          value={rightValue}
          checked={localValue === rightValue}
          onChange={handleOnChange}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {rightText}
        </StyledSelectableCard>
      </StyledBorderedBox>
    </Tooltip>
  )
}

export default SwitchButton
