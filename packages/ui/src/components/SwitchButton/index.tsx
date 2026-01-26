'use client'

import { cn } from '@ultraviolet/utils'
import type {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  ReactNode,
} from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { FOCUS_OVERLAY_SCALE_RATIO } from './constant'
import { FocusOverlay } from './FocusOverlay'
import { Option } from './Option'
import type { RefOptionType } from './SwitchButtonContext'
import { SwitchButtonContext } from './SwitchButtonContext'
import { switchButtonContainer } from './styles.css'

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
  style?: CSSProperties
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
  style,
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
    if (!curentElement) {
      return 0
    }
    const currentPosition = curentElement.getBoundingClientRect().left
    const containerPosition =
      containerRef.current?.getBoundingClientRect().left ?? 0

    return currentPosition - containerPosition
  }

  useEffect(() => {
    setLocalValue(value)
    setWidth(getElement(value)?.offsetWidth ?? 0)
    setPosition(getPosition(getElement(value)))
  }, [refOptions, value, getElement])

  useEffect(() => {
    const element = getElement(localValue)
    if (!element) {
      return undefined
    }

    const resizeObserver = new ResizeObserver(() => {
      if (
        element.offsetWidth &&
        (![
          width,
          width + FOCUS_OVERLAY_SCALE_RATIO,
          width - FOCUS_OVERLAY_SCALE_RATIO,
        ].includes(element.offsetWidth) ||
          getPosition(element) !== position)
      ) {
        setWidth(element.offsetWidth ?? 0)
        setPosition(getPosition(element))
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [getElement, width, position, localValue, children])

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
      handleOnChange,
      localValue,
      name,
      onBlur,
      onFocus,
      refOptions,
      sentiment,
      setRefOptions,
      size,
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
        <Stack
          className={cn(className, switchButtonContainer[size])}
          data-testid={dataTestId}
          direction="row"
          onMouseDown={event => {
            const rect = event.currentTarget.getBoundingClientRect()
            const clickX = event.clientX - rect.left
            const clickInCurrentElement =
              clickX > position && clickX < position + width
            if (clickInCurrentElement) {
              setMouseDownSide(null)
            } else {
              setMouseDownSide(
                clickX < getPosition(getElement(localValue)) ? 'left' : 'right',
              )
              setWidth(width + FOCUS_OVERLAY_SCALE_RATIO)
            }
          }}
          onMouseLeave={() => {
            setMouseDownSide(null)
            if (mouseDownSide) {
              setWidth(width - FOCUS_OVERLAY_SCALE_RATIO)
            }
          }}
          onMouseUp={() => {
            setMouseDownSide(null)
            if (mouseDownSide) {
              setWidth(width - FOCUS_OVERLAY_SCALE_RATIO)
            }
          }}
          ref={containerRef}
          style={style}
        >
          {width ? (
            <FocusOverlay
              cardWidth={width}
              mouseDownSide={mouseDownSide}
              position={position}
              sentiment={sentiment}
            />
          ) : null}
          {children}
        </Stack>
      </Tooltip>
    </SwitchButtonContext.Provider>
  )
}

SwitchButton.Option = Option
