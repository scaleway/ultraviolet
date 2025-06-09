'use client'

import styled from '@emotion/styled'
import type {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  RefObject,
} from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tooltip } from '../Tooltip'
import { FocusOverlay } from './FocusOverlay'
import { Option } from './Option'
import { SwitchButtonContext } from './SwitchButtonContext'

const SIZES = {
  small: '500', // sizing token from theme
  medium: '600',
} as const
const FOCUS_OVERLAY_SCALE_RATIO = 6

const StyledBorderedBox = styled.div<{ 'data-size': 'small' | 'medium' }>`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => theme.space['0.5']};
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  position: relative;

  &[data-size='small'] {
      height: ${({ theme }) => theme.sizing[SIZES.small]};
  
  }

  &[data-size='medium'] {
      height: ${({ theme }) => theme.sizing[SIZES.medium]};
  }

  
  input[type="radio"] {
  width: 100%;
}
`
type SwitchButtonProps = {
  name?: string
  children: ReactNode
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  tooltip?: string
  value: string
  className?: string
  'data-testid'?: string
  size?: 'small' | 'medium'
  sentiment?: 'primary' | 'neutral'
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
  size = 'small',
  sentiment = 'primary',
  tooltip,
  className,
  children,
  'data-testid': dataTestId,
}: SwitchButtonProps) => {
  const [localValue, setLocalValue] = useState<string>(value)
  const [refOptions, setRefOptions] = useState<RefObject<HTMLInputElement>[]>(
    [],
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)
  const [mouseDownSide, setMouseDownSide] = useState<'left' | 'right' | null>(
    null,
  )
  const getElement = useCallback(
    (referenceValue: string) =>
      refOptions.find(
        element => element.current && element.current.id === referenceValue,
      )?.current,
    [refOptions],
  )

  const getPosition = (curentElement?: HTMLInputElement) => {
    if (!curentElement) return 0
    const currentPosition = curentElement.getBoundingClientRect().left
    const containerPosition =
      containerRef.current?.getBoundingClientRect().left ?? 0

    return currentPosition - containerPosition
  }

  useEffect(() => {
    setLocalValue(value)
    setWidth(getElement(value)?.offsetWidth ?? 0)
    setPosition(getPosition(getElement(value)))
  }, [getElement, refOptions, value])

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      setLocalValue(event.target.value)

      const currentElement = getElement(event.target.value)

      if (currentElement && containerRef.current) {
        const currentWidth = currentElement.offsetWidth ?? 0
        setWidth(currentWidth)
        setPosition(getPosition(currentElement))
      }
    },
    [getElement, onChange],
  )

  const valueContext = useMemo(
    () => ({
      localValue,
      name,
      onBlur,
      onFocus,
      size,
      handleOnChange,
      refOptions,
      setRefOptions,
      sentiment,
    }),
    [
      handleOnChange,
      localValue,
      name,
      onBlur,
      onFocus,
      refOptions,
      size,
      sentiment,
    ],
  )

  return (
    <SwitchButtonContext.Provider value={valueContext}>
      <Tooltip text={tooltip}>
        <div
          style={{ display: 'inline-flex' }}
          className={className}
          data-testid={dataTestId}
        >
          <StyledBorderedBox
            onMouseDown={event => {
              const rect = event.currentTarget.getBoundingClientRect()
              const clickX = event.clientX - rect.left
              setMouseDownSide(
                clickX < getPosition(getElement(localValue)) ? 'left' : 'right',
              )
              setWidth(width + FOCUS_OVERLAY_SCALE_RATIO)
            }}
            onMouseUp={() => {
              setMouseDownSide(null)
              setWidth(width - FOCUS_OVERLAY_SCALE_RATIO)
            }}
            onMouseLeave={() => {
              setMouseDownSide(null)
              setWidth(width - FOCUS_OVERLAY_SCALE_RATIO)
            }}
            data-size={size}
            ref={containerRef}
          >
            <FocusOverlay
              cardWidth={width}
              position={position}
              mouseDownSide={mouseDownSide}
              sentiment={sentiment}
            />

            {children}
          </StyledBorderedBox>
        </div>
      </Tooltip>
    </SwitchButtonContext.Provider>
  )
}

SwitchButton.Option = Option
