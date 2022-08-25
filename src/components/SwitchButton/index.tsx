import styled from '@emotion/styled'
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import BorderedBox from '../BorderedBox'
import SelectableCard from '../SelectableCard'
import Tooltip from '../Tooltip'

const StyledBorderedBox = styled(BorderedBox)<{
  widthLeftSelectableCard: number
  widthRightSelectableCard: number
}>`
  padding: ${({ theme }) => theme.space['0.5']};
  display: inline-flex;
  gap: ${({ theme }) => theme.space['1']};

  &:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: ${({ widthLeftSelectableCard }) => widthLeftSelectableCard}px;
    height: calc(100% - ${({ theme }) => theme.space['1']});
    border-radius: ${({ theme }) => theme.radii.default};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
    transition: transform 300ms, width 300ms, left 300ms;
  }

  &[data-position='right']:before {
    left: calc(100% - 4px);
    width: ${({ widthRightSelectableCard }) => widthRightSelectableCard}px;
    transform: translateX(-100%);
  }

  &[data-position='right']:active:before {
    width: calc(
      ${({ widthRightSelectableCard }) => widthRightSelectableCard}px +
        ${({ theme }) => theme.space['1']}
    );
  }

  &[data-position='left']:active:before {
    width: calc(
      ${({ widthLeftSelectableCard }) => widthLeftSelectableCard}px +
        ${({ theme }) => theme.space['1']}
    );
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
  const refLeftButton = useRef<HTMLLabelElement>(null)
  const refRightButton = useRef<HTMLLabelElement>(null)

  const [widthLeftSelectableCard, setwidthLeftSelectableCard] = useState(0)
  const [widthRightSelectableCard, setwidthRightSelectableCard] = useState(0)

  const [localValue, setLocalValue] = useState(
    value === leftButton.value ? leftButton.value : rightButton.value,
  )
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setLocalValue(event.target.value)
  }

  useLayoutEffect(() => {
    setwidthLeftSelectableCard(refLeftButton?.current?.offsetWidth ?? 0)
    setwidthRightSelectableCard(refRightButton?.current?.offsetWidth ?? 0)
  }, [])

  return (
    <Tooltip text={tooltip}>
      <div style={{ display: 'inline-flex', position: 'relative' }}>
        <StyledBorderedBox
          data-position={localValue === leftButton.value ? 'left' : 'right'}
          widthLeftSelectableCard={widthLeftSelectableCard}
          widthRightSelectableCard={widthRightSelectableCard}
        >
          <StyledSelectableCard
            ref={refLeftButton}
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
            ref={refRightButton}
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
