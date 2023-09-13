import styled from '@emotion/styled'
import type { ChangeEvent, ChangeEventHandler, FocusEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'
import { SelectableCard } from '../SelectableCard'
import { Tooltip } from '../Tooltip'
import { FocusOverlay } from './FocusOverlay'

const StyledBorderedBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};
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
    &:not([data-error='true'][data-disabled='true']) {
      border: none;
    }
  }

  &[data-checked='true'] {
    border: none;
  }

  &[data-checked='true'] label {
    color: ${({ theme }) => theme.colors.primary.textStrong};
  }

  &:not([data-checked='true']) label {
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
  className?: string
  'data-testid'?: string
}

/**
 * SwitchButton is a component that allows the user to select between two options.
 */
export const SwitchButton = ({
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  leftButton,
  rightButton,
  tooltip,
  className,
  'data-testid': dataTestId,
}: SwitchButtonProps) => {
  const leftButtonRef = useRef<HTMLDivElement>(null)
  const rightButtonRef = useRef<HTMLDivElement>(null)
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
      <div
        style={{ display: 'inline-flex' }}
        className={className}
        data-testid={dataTestId}
      >
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
            label={leftButton.label}
          />
          <StyledSelectableCard
            ref={rightButtonRef}
            name={name}
            value={rightButton.value}
            checked={localValue === rightButton.value}
            onChange={handleOnChange}
            onBlur={onBlur}
            onFocus={onFocus}
            data-checked={localValue === rightButton.value}
            label={rightButton.label}
          />
        </StyledBorderedBox>
      </div>
    </Tooltip>
  )
}
