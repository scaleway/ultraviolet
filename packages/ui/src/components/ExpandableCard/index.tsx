'use client'

import { ArrowDownIcon, DragIcon } from '@ultraviolet/icons'
import { cn, useTheme } from '@ultraviolet/themes'
import type {
  CSSProperties,
  DetailsHTMLAttributes,
  DragEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactNode,
} from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'
import type { XOR } from '../../types'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { ExpandableCardTitle } from './components/Title'
import type { EXPANDABLE_CARD_SIZE } from './constants'
import {
  arrowIcon,
  content,
  detailsClass,
  dragIconContainer,
  dropableArea,
  stackClass,
  summaryClass,
} from './styles.css'

type DraggableListType = { value?: string }
type ExpandableCardSize = (typeof EXPANDABLE_CARD_SIZE)[number]

type DraggableProps =
  | {
      draggable: true
      value: string
      draggableTooltip?: string
      onDrop?: (newValue: string, oldValue: string) => void
      /**
       * Index of the card in the  of draggable cards
       */
      index: number
      /**
       * You this prop to handle drag and drop with the keyboard (accessibility)
       */
      onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void
    }
  | {
      draggable?: never
      value?: never
      draggableTooltip?: never
      onDrop?: never
      index?: never
      onKeyDown?: never
    }
type CommonProps = {
  header: ReactNode
  size?: ExpandableCardSize
  name?: string
  children: ReactNode
  disabled?: boolean
  'data-testid'?: string
  className?: string
  /** Uncontrolled but open by default */
  open?: DetailsHTMLAttributes<HTMLDetailsElement>['open']
  style?: CSSProperties
} & DraggableProps

type ExpandableCardProps = XOR<
  [CommonProps & { expanded: boolean; onToggleExpand: () => void }, CommonProps]
>
const BaseExpandableCard = forwardRef(
  (
    {
      header,
      name,
      size = 'medium',
      children,
      disabled,
      expanded,
      onToggleExpand,
      className,
      draggable,
      value,
      draggableTooltip = 'Click and drag to move',
      onDrop,
      index,
      onKeyDown,
      'data-testid': dataTestId,
      open,
      style,
    }: ExpandableCardProps,
    ref: ForwardedRef<HTMLDetailsElement>,
  ) => {
    const headerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const draggableRef = useRef<HTMLDivElement>(null)
    const draggableFirstRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [clicking, setClicking] = useState(false)

    const theme = useTheme()

    const handleMouseEnter = () => {
      setIsHovered(true)
    }
    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const onDragStart = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', JSON.stringify({ value }))
      },
      [value],
    )

    const onDragEnd = useCallback(() => setClicking(false), [])

    const onDrag = useCallback(
      (
        event: DragEvent<HTMLDivElement>,
        borderColor: string,
        isFirst?: boolean,
      ) => {
        const refElement = isFirst ? draggableFirstRef : draggableRef
        event.preventDefault()
        if (refElement.current) {
          refElement.current.style.borderColor = borderColor
        }
      },
      [],
    )

    const handleDrop = useCallback(
      (event: DragEvent<HTMLDivElement>, isFirst?: boolean) => {
        event.preventDefault()
        if (draggableRef.current) {
          draggableRef.current.style.borderColor = 'transparent'
        }

        if (event?.dataTransfer) {
          const data = JSON.parse(
            event.dataTransfer.getData('text'),
          ) as DraggableListType

          onDrop?.(isFirst ? '' : value, data.value ?? '')
        }
      },
      [onDrop, value],
    )

    return (
      <Stack
        className={stackClass}
        data-draggable={draggable}
        data-name={name}
        data-value={value}
        direction="row"
        draggable={draggable}
        gap={2}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        style={style}
        width="100%"
      >
        {draggable ? (
          <Stack
            className={dragIconContainer}
            data-testid={`draggable-icon-${value}`}
            data-visible={isHovered}
            justifyContent="center"
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                if (clicking && containerRef.current) {
                  setClicking(false)
                  setIsHovered(false)
                } else if (containerRef.current) {
                  setClicking(true)
                  setIsHovered(true)
                }
              }
              if (clicking) {
                onKeyDown?.(event)
              }
            }}
            onMouseDown={() => setClicking(true)}
            onMouseUp={() => setClicking(false)}
          >
            <Tooltip
              text={draggableTooltip}
              visible={clicking ? false : undefined} // Hide the tooltip when dragging the card
            >
              <DragIcon
                disabled={disabled}
                prominence={clicking ? 'strong' : 'weak'}
                sentiment="neutral"
                size="small"
              />
            </Tooltip>
          </Stack>
        ) : null}
        <details
          className={cn(className, detailsClass)}
          data-clicking={clicking}
          data-testid={dataTestId}
          key={clicking ? 'closed' : 'open'}
          name={name}
          open={open ?? expanded}
          ref={ref}
          tabIndex={disabled ? -1 : undefined}
        >
          <summary
            className={summaryClass}
            data-disabled={!!disabled}
            data-testid={dataTestId ? `${dataTestId}-summary` : undefined}
            onClick={event => {
              if (disabled || onToggleExpand) {
                onToggleExpand?.()
                event.preventDefault()
              }
            }}
            onKeyDown={
              onToggleExpand
                ? event => {
                    if (
                      event.key === ' ' &&
                      event.target === headerRef.current
                    ) {
                      onToggleExpand()
                      event.preventDefault()
                    }
                  }
                : undefined
            }
            ref={headerRef}
          >
            <ArrowDownIcon
              className={arrowIcon}
              disabled={disabled}
              sentiment="neutral"
            />
            {typeof header === 'string' ? (
              <ExpandableCardTitle disabled={disabled} size={size}>
                {header}
              </ExpandableCardTitle>
            ) : (
              header
            )}
          </summary>
          <div className={content}>{children}</div>
        </details>
        {draggable && index === 0 ? (
          <div
            className={dropableArea}
            data-first
            onDragLeave={event => onDrag(event, 'transparent', true)}
            onDragOver={event =>
              onDrag(event, theme.colors.primary.border, true)
            }
            onDrop={event => handleDrop(event, true)}
            ref={draggableFirstRef}
          />
        ) : null}
        {draggable ? (
          <div
            className={dropableArea}
            data-testid={`${value}-dropable-area`}
            onDragLeave={event => onDrag(event, 'transparent')}
            onDragOver={event => onDrag(event, theme.colors.primary.border)}
            onDrop={handleDrop}
            ref={draggableRef}
          />
        ) : null}
      </Stack>
    )
  },
)

// /**
//  * ExpandableCard is a card that can be collapsed and expanded to reveal more content.
//  */
export const ExpandableCard = Object.assign(BaseExpandableCard, {
  Title: ExpandableCardTitle,
})
