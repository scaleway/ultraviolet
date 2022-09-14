import styled from '@emotion/styled'
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import BorderedBox from '../BorderedBox'
import SelectableCard from '../SelectableCard'
import Tooltip from '../Tooltip'
import { FocusOverlay } from './FocusOverlay'

const StyledBorderedBox = styled(BorderedBox)`
  padding: ${({ theme }) => theme.space['0.5']};
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  position: relative;
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
    disabled?: boolean
  }
  rightButton: {
    label: string
    value: string
    disabled?: boolean
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
  const leftButtonRef = useRef<HTMLLabelElement>(null)
  const rightButtonRef = useRef<HTMLLabelElement>(null)
  const [leftCardWidth, setLeftCardWidth] = useState<number>()
  const [rightCardWidth, setRightCardWidth] = useState<number>()
  const [hasMouseDown, setHasMouseDown] = useState(false)

  const [localValue, setLocalValue] = useState(
    value === leftButton.value ? leftButton.value : rightButton.value,
  )
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setLocalValue(event.target.value)
  }

  useEffect(() => {
    if (!leftButtonRef.current || !rightButtonRef.current) return
    setLeftCardWidth(leftButtonRef.current.getBoundingClientRect().width)
    setRightCardWidth(rightButtonRef.current.getBoundingClientRect().width)
  }, [leftButton.value, leftButtonRef, localValue, rightButtonRef])

  const setMouseDown = (isMouseDown: boolean) => () =>
    setHasMouseDown(isMouseDown)

  return (
    <Tooltip text={tooltip}>
      <div style={{ display: 'inline-flex' }}>
        <StyledBorderedBox
          onMouseDown={setMouseDown(true)}
          onMouseUp={setMouseDown(false)}
          onMouseLeave={setMouseDown(false)}
        >
          {rightCardWidth && leftCardWidth ? (
            <FocusOverlay
              focusPosition={localValue === leftButton.value ? 'left' : 'right'}
              rightCardWidth={rightCardWidth}
              leftCardWidth={leftCardWidth}
              hasMouseDown={hasMouseDown}
            />
          ) : null}
          <StyledSelectableCard
            ref={leftButtonRef}
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
            ref={rightButtonRef}
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
