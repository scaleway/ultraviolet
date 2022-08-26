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
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledSelectableCard = styled(SelectableCard)`
  border: none;
  height: 40px;
  padding: ${({ theme }) => theme.space['1']} ${({ theme }) => theme.space['2']};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;

  &:hover,
  &:focus-within,
  &:active {
    box-shadow: none;
    border: none;
  }

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.primary.textStrong};
    background: ${({ theme }) => theme.colors.primary.backgroundStrong};
  }

  &:not([data-checked='true']) {
    &:hover {
      color: ${({ theme }) => theme.colors.primary.textWeak};
    }
  }
`

type SwitchButtonProps = {
  name: string
  onBlur?: FocusEventHandler
  onChange: ChangeEventHandler
  onFocus?: FocusEventHandler
  tooltip?: string
  value?: string | number
  leftButton: {
    label: string
    value: string
  }
  rightButton: {
    label: string
    value: string
  }
}

const SwitchButton = ({
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  leftButton,
  rightButton,
  tooltip,
}: SwitchButtonProps) => {
  const [localValue, setLocalValue] = useState(
    value === leftButton.value ? leftButton.value : rightButton.value,
  )
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setLocalValue(event.target.value)
  }

  return (
    <Tooltip text={tooltip}>
      <div style={{ display: 'inline-flex' }}>
        <StyledBorderedBox>
          <StyledSelectableCard
            name={name}
            value={leftButton.value}
            checked={localValue === leftButton.value}
            onChange={handleOnChange}
            onBlur={onBlur}
            onFocus={onFocus}
            data-checked={localValue === leftButton.value}
          >
            {leftButton.label}
          </StyledSelectableCard>
          <StyledSelectableCard
            name={name}
            value={rightButton.value}
            checked={localValue === rightButton.value}
            onChange={handleOnChange}
            onBlur={onBlur}
            onFocus={onFocus}
            data-checked={localValue === rightButton.value}
          >
            {rightButton.label}
          </StyledSelectableCard>
        </StyledBorderedBox>
      </div>
    </Tooltip>
  )
}

export default SwitchButton
