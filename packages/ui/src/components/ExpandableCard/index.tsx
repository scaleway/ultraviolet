'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ArrowDownIcon, DragIcon } from '@ultraviolet/icons'
import type { DragEvent, ForwardedRef, KeyboardEvent, ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'
import type { XOR } from '../../types'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { ExpandableCardTitle } from './components/Title'

const StyledArrowIcon = styled(ArrowDownIcon)``

const DropableArea = styled.div`
  height: ${({ theme }) => theme.space['3']};
  border-bottom: 2px solid;
  border-color: transparent;
  padding: ${({ theme }) => theme.space['0.5']} 0;
  width: 100%;
  bottom: -5px;
  position: absolute;

  &[data-first="true"] {
    top: -${({ theme }) => theme.space['3']};
  }
  
  &::after {
    content: '';
    left: 0;
    bottom: -4px;
    height: 0px;
    width: 0px;
    border: 3px solid;
    border-color: inherit;
    border-radius: ${({ theme }) => theme.radii.circle};
    display: flex;
    margin-top:  -${({ theme }) => theme.space['1']};
    margin-left: -${({ theme }) => theme.space['0.25']};
    position: absolute;
  }
`

const StyledSummary = styled.summary`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap:  ${({ theme }) => theme.space['2']};
  padding: ${({ theme }) => theme.space['3']};
  list-style-type: none;

  cursor: pointer;
  &[data-disabled="true"] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-radius: ${({ theme }) => theme.radii.default};
    cursor: not-allowed;
  }
`

const StyledContent = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.space['3']};

`

const StyledDetails = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};
  width: 100%;
  transition: border-color 0.2s ease-in-out;

  &[open] {
    border-color: ${({ theme }) => theme.colors.primary.border};

    & > ${StyledContent} {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

   ${StyledArrowIcon} {
      transform: rotate(180deg);
    }
  }

  &[data-clicking="true"] {
    box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
    border-color: ${({ theme }) => theme.colors.primary.border};

  }
`
const StyledStack = styled(Stack)`
  position: relative;
    &:hover > ${StyledDetails} {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }
  `

const DragIconContainer = styled(Stack)`
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: grab;
  padding-top: calc(${({ theme }) => theme.space['3']} + 2px);

  &[data-visible="true"] {
    opacity: 1;
  }
  &:focus-within {
    opacity: 1;
  }

  &:active {
    cursor: grabbing;
    opacity: 1;
  }
`

export const EXPANDABLE_CARD_SIZE = ['medium', 'large'] as const

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
      <StyledStack
        direction="row"
        gap={2}
        ref={containerRef}
        width="100%"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable={draggable}
        data-name={name}
        data-draggable={draggable}
        data-value={value}
      >
        {draggable ? (
          <DragIconContainer
            data-visible={isHovered}
            justifyContent="center"
            onMouseDown={() => setClicking(true)}
            onMouseUp={() => setClicking(false)}
            data-testid={`draggable-icon-${value}`}
            onKeyDown={event => {
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
          >
            <Tooltip
              text={draggableTooltip}
              visible={clicking ? false : undefined} // Hide the tooltip when dragging the card
            >
              <DragIcon
                sentiment="neutral"
                prominence={clicking ? 'strong' : 'weak'}
                size="small"
                disabled={disabled}
              />
            </Tooltip>
          </DragIconContainer>
        ) : null}
        <StyledDetails
          className={className}
          data-testid={dataTestId}
          tabIndex={disabled ? -1 : undefined}
          name={name}
          open={expanded}
          ref={ref}
          data-clicking={clicking}
          key={clicking ? 'closed' : 'open'}
        >
          <StyledSummary
            data-disabled={!!disabled}
            data-testid={dataTestId ? `${dataTestId}-summary` : undefined}
            ref={headerRef}
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
          >
            <StyledArrowIcon sentiment="neutral" disabled={disabled} />
            {typeof header === 'string' ? (
              <ExpandableCardTitle size={size} disabled={disabled}>
                {header}
              </ExpandableCardTitle>
            ) : (
              header
            )}
          </StyledSummary>
          <StyledContent>{children}</StyledContent>
        </StyledDetails>
        {draggable && index === 0 ? (
          <DropableArea
            ref={draggableFirstRef}
            data-first
            onDragOver={event =>
              onDrag(event, theme.colors.primary.border, true)
            }
            onDragLeave={event => onDrag(event, 'transparent', true)}
            onDrop={event => handleDrop(event, true)}
          />
        ) : null}
        {draggable ? (
          <DropableArea
            ref={draggableRef}
            onDragOver={event => onDrag(event, theme.colors.primary.border)}
            onDragLeave={event => onDrag(event, 'transparent')}
            onDrop={handleDrop}
            data-testid={`${value}-dropable-area`}
          />
        ) : null}
      </StyledStack>
    )
  },
)

// /**
//  * ExpandableCard is a card that can be collapsed and expanded to reveal more content.
//  */
export const ExpandableCard = Object.assign(BaseExpandableCard, {
  Title: ExpandableCardTitle,
})
