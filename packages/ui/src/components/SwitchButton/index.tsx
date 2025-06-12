'use client'

import styled from '@emotion/styled'
import type {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
} from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { FocusOverlay } from './FocusOverlay'
import { Option } from './Option'
import { RefOptionType, SwitchButtonContext } from './SwitchButtonContext'
import { FOCUS_OVERLAY_SCALE_RATIO } from './constant'

const SIZES = {
  small: '500', // sizing token from theme
  medium: '600',
} as const

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
  const containerRef = useRef<HTMLDivElement>(null)

  const [localValue, setLocalValue] = useState<string>(value)
  const [refOptions, setRefOptions] = useState<RefOptionType[]>([])
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)
  const [mouseDownSide, setMouseDownSide] = useState<'left' | 'right' | null>(
    null,
  )

  const getElement = useCallback(
    (referenceValue: string) =>
      refOptions.find(
        element => element.current && element.value === referenceValue,
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
        <Stack direction="row" className={className} data-testid={dataTestId}>
          <StyledBorderedBox
            onMouseDown={event => {
              const rect = event.currentTarget.getBoundingClientRect()
              const clickX = event.clientX - rect.left
              const clickInCurrentElement =
                clickX > position && clickX < position + width
              if (!clickInCurrentElement) {
                setMouseDownSide(
                  clickX < getPosition(getElement(localValue))
                    ? 'left'
                    : 'right',
                )
                setWidth(width + FOCUS_OVERLAY_SCALE_RATIO)
              } else {
                setMouseDownSide(null)
              }
            }}
            onMouseUp={() => {
              setMouseDownSide(null)
              if (mouseDownSide) setWidth(width - FOCUS_OVERLAY_SCALE_RATIO)
            }}
            onMouseLeave={() => {
              setMouseDownSide(null)
              if (mouseDownSide) setWidth(width - FOCUS_OVERLAY_SCALE_RATIO)
            }}
            data-size={size}
            ref={containerRef}
          >
            {width ? (
              <FocusOverlay
                cardWidth={width}
                position={position}
                mouseDownSide={mouseDownSide}
                sentiment={sentiment}
              />
            ) : null}
            {children}
          </StyledBorderedBox>
        </Stack>
      </Tooltip>
    </SwitchButtonContext.Provider>
  )
}

SwitchButton.Option = Option
