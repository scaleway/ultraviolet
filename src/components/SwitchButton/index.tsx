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

  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(
      50% - ${({ theme }) => theme.space['1']} -
        ${({ theme }) => theme.space['0.5']}
    );
    height: calc(100% - ${({ theme }) => theme.space['1']});
    border-radius: ${({ theme }) => theme.radii.default};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
    transition: transform 300ms, width 300ms, left 300ms;
  }

  &[data-position='right']:before {
    left: calc(100% - 4px);
    width: 50%;
    transform: translateX(-100%);
  }

  &[data-position='right']:active:before {
    width: calc(50% + ${({ theme }) => theme.space['0.5']});
  }

  &[data-position='left']:active:before {
    width: calc(50% - ${({ theme }) => theme.space['0.5']} - 1px);
  }
`

const StyledSelectableCard = styled(SelectableCard)<{ checked: boolean }>`
  border: none;
  height: 40px;
  padding: ${({ theme }) => theme.space['1']} ${({ theme }) => theme.space['2']};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus-within,
  &:active {
    box-shadow: none;
    border: none;
  }

  ${({ checked, theme }) =>
    checked
      ? `
  color: ${theme.colors.primary.textStrong};
  `
      : `
        &:hover {
          color: ${theme.colors.primary.textWeak};
        }
      `}
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
      <div style={{ display: 'inline-flex', position: 'relative' }}>
        <StyledBorderedBox
          data-position={localValue === leftButton.value ? 'left' : 'right'}
        >
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
