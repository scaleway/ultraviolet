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

const FocusOverlay = styled.div`
  position: absolute;
  height: calc(100% - ${({ theme }) => theme.space['1']});
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.primary.backgroundStrong};
  transform-origin: left center;
  transition: all 200ms ease-in-out;

  &[data-focusposition='right'] {
    transform-origin: right center;
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

  const getScaleValue = () => {
    if (!hasMouseDown) return 1
    const offsetScaleRatio = 6
    const currentWidth =
      localValue === leftButton.value ? leftCardWidth : rightCardWidth

    return 1 + offsetScaleRatio / currentWidth
  }

  return (
    <Tooltip text={tooltip}>
      <div style={{ display: 'inline-flex' }}>
        <StyledBorderedBox
          onMouseDown={setMouseDown(true)}
          onMouseUp={setMouseDown(false)}
          onMouseLeave={setMouseDown(false)}
        >
          <FocusOverlay
            data-focusposition={
              localValue === leftButton.value ? 'left' : 'right'
            }
            style={{
              transform: `translate3d(${
                localValue === leftButton.value ? 0 : leftCardWidth + 8
              }px, 0, 0) scale3d(${getScaleValue()}, 1, 1)`,
              width: `${
                localValue === leftButton.value ? leftCardWidth : rightCardWidth
              }px`,
            }}
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
