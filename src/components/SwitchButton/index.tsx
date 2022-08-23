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
  color: ${({ theme }) => theme.colors.primary.textWeak};
  height: 40px;
  padding: ${({ theme }) => theme.space['1']} ${({ theme }) => theme.space['2']};
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
    background: ${theme.colors.primary.backgroundWeakHover};
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
  leftValue: string | number
  rightValue: string | number
  leftText: string
  rightText: string
}

const SwitchButton = ({
  value,
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
    value === 'left' ? leftValue : rightValue,
  )
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setLocalValue(event.target.value)
  }

  return (
    <Tooltip text={tooltip}>
      <div style={{ display: 'inline-flex', position: 'relative' }}>
        <StyledBorderedBox
          data-position={localValue === leftValue ? 'left' : 'right'}
        >
          <StyledSelectableCard
            name={name}
            value={leftValue}
            checked={localValue === leftValue}
            onChange={handleOnChange}
            onBlur={onBlur}
            onFocus={onFocus}
            data-checked={localValue === leftValue}
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
            data-checked={localValue === rightValue}
          >
            {rightText}
          </StyledSelectableCard>
        </StyledBorderedBox>
      </div>
    </Tooltip>
  )
}

export default SwitchButton
