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

const StyledBorderedBox = styled(BorderedBox)`
  padding: ${({ theme }) => theme.space['0.5']};
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  position: relative;
  align-items: stretch;
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

const FocusOverlay = styled.div<{
  leftCardWidth: number
  rightCardWidth: number
  focusPosition: 'left' | 'right'
  hasMouseDown: boolean
}>`
  position: absolute;
  height: calc(100% - ${({ theme }) => theme.space['1']});
  width: ${({ leftCardWidth, rightCardWidth, focusPosition }) =>
    focusPosition === 'right' ? rightCardWidth : leftCardWidth}px;
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.primary.backgroundStrong};
  transform: translate3d(
      ${({ leftCardWidth, focusPosition }) =>
        focusPosition === 'left' ? 0 : leftCardWidth + 8}px,
      0,
      0
    )
    scale3d(
      ${({ hasMouseDown, leftCardWidth, rightCardWidth, focusPosition }) => {
        if (!hasMouseDown) return 1
        const offsetScale = 6
        const currentWidth =
          focusPosition === 'left' ? leftCardWidth : rightCardWidth

        return 1 + offsetScale / currentWidth
      }},
      1,
      1
    );
  transform-origin: ${({ focusPosition }) => focusPosition} center;
  transition: all 200ms ease-in-out;
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
  const leftButtonRef = useRef<HTMLLabelElement | null>(null)
  const rightButtonRef = useRef<HTMLLabelElement | null>(null)
  const [leftCardWidth, setLeftCardWidth] = useState(0)
  const [rightCardWidth, setRightCardWidth] = useState(0)
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
          <FocusOverlay
            leftCardWidth={leftCardWidth}
            rightCardWidth={rightCardWidth}
            focusPosition={localValue === leftButton.value ? 'left' : 'right'}
            hasMouseDown={hasMouseDown}
          />
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
