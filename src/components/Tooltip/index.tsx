import styled from '@emotion/styled'
import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getUUID } from '../../utils'

const ARROW_WIDTH = 6 // in px
const SPACE = 4 // in px
const ANIMATION_DURATION = 230 // in ms
const DEFAULT_POSITIONS = {
  arrowLeft: 50,
  arrowTop: 99,
  left: 0,
  rotate: 135,
  top: 0,
  translate: 'translate(-50%, -50)',
}

type PositionsType = {
  arrowLeft: number
  arrowTop: number
  left: number
  rotate: number
  top: number
  translate: string
}

const StyledTooltip = styled.div<{
  maxWidth: number
  positions: PositionsType
}>`
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  color: ${({ theme }) => theme.colors.neutral.textStronger};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  text-align: center;
  position: fixed;
  max-width: ${({ maxWidth }) => maxWidth}px;
  left: ${({ positions }) => positions.left}px;
  top: ${({ positions }) => positions.top}px;
  opacity: 0;
  transition: ${ANIMATION_DURATION}ms opacity ease-in-out;
  font-size: 0.8rem;

  &::after {
    content: ' ';
    position: absolute;
    top: ${({ positions }) => positions.arrowTop}px;
    left: ${({ positions }) => positions.arrowLeft}px;
    transform: ${({ positions }) => positions.translate}
      rotate(${({ positions }) => positions.rotate}deg);
    margin-left: -${ARROW_WIDTH}px;
    border-width: ${ARROW_WIDTH}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.neutral.backgroundStronger}
      transparent transparent transparent;
  }
`

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

type ComputePositionsTypes = {
  placement: TooltipPlacement
  childrenRef: RefObject<HTMLDivElement>
  tooltipRef: RefObject<HTMLDivElement>
}

const computePositions = ({
  placement,
  childrenRef,
  tooltipRef,
}: ComputePositionsTypes) => {
  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = (childrenRef.current as HTMLDivElement).getBoundingClientRect()

  const { width: tooltipWidth, height: tooltipHeight } = (
    tooltipRef.current as HTMLDivElement
  ).getBoundingClientRect()

  switch (placement) {
    case 'bottom':
      return {
        arrowLeft: tooltipWidth / 2,
        arrowTop: -ARROW_WIDTH - 6,
        left: childrenLeft + childrenWidth / 2 - tooltipWidth / 2,
        rotate: 180,
        top: childrenTop + childrenHeight + ARROW_WIDTH + SPACE,
        translate: '',
      }
    case 'left':
      return {
        arrowLeft: tooltipWidth + ARROW_WIDTH + 6,
        arrowTop: tooltipHeight / 2,
        left: childrenLeft - tooltipWidth - ARROW_WIDTH - SPACE,
        rotate: -90,
        top: childrenTop - tooltipHeight / 2 + childrenHeight / 2,
        translate: 'translate(-50%, -50%)',
      }
    case 'right':
      return {
        arrowLeft: -ARROW_WIDTH - 6,
        arrowTop: tooltipHeight / 2,
        left: childrenRight + ARROW_WIDTH + SPACE,
        rotate: 90,
        top: childrenTop - tooltipHeight / 2 + childrenHeight / 2,
        translate: 'translate(50%, -50%)',
      }
    default: // top placement is default value
      return {
        arrowLeft: tooltipWidth / 2,
        arrowTop: tooltipHeight,
        left: childrenLeft + childrenWidth / 2 - tooltipWidth / 2,
        rotate: 0,
        top: childrenTop - tooltipHeight - ARROW_WIDTH - SPACE,
        translate: '',
      }
  }
}

type TooltipProps = {
  id?: string
  children: ReactNode
  maxWidth?: number
  placement?: TooltipPlacement
  text?: ReactNode
  className?: string
}

const Tooltip = ({
  children,
  text = '',
  placement = 'top',
  id,
  className,
  maxWidth = 232,
}: TooltipProps): JSX.Element => {
  const childrenRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval>>()
  const [visibleInDom, setVisibleInDom] = useState(false)
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)

  const computedId = useMemo(() => {
    if (!id) return getUUID('tooltip')

    return id
  }, [id])

  const getPositions = useCallback(() => {
    if (childrenRef.current && tooltipRef.current) {
      setPositions(computePositions({ childrenRef, placement, tooltipRef }))
    }
  }, [placement])

  /**
   * This function is called when we need to remove tooltip portal from DOM and remove event listener to it.
   */
  const unmountTooltip = useCallback(() => {
    setVisibleInDom(false)
    window.removeEventListener('resize', getPositions)
    window.removeEventListener('scroll', getPositions)
  }, [getPositions])

  /**
   * When mouse hover or stop hovering children this function display or hide tooltip. A timeout is set to allow animation
   * end, then remove tooltip from dom.
   */
  const onMouseEvent = useCallback(
    (isVisible: boolean) => () => {
      // This is when we hide the tooltip, first we set opacity to 0 then we set a timeout based on CSS animation duration
      // then we remove it from dom
      if (!isVisible && tooltipRef.current) {
        tooltipRef.current.style.opacity = '0'
        timer.current = setTimeout(() => unmountTooltip(), ANIMATION_DURATION)
      } else {
        // If a timeout is already set it means tooltip didn't have time to close completely and be removed from dom,
        // so we clear timeout and set back opacity of tooltip to 1, so it can be visible on screen.
        if (timer.current) {
          clearTimeout(timer.current)
          if (tooltipRef.current) {
            tooltipRef.current.style.opacity = '1'
          }
        }
        setVisibleInDom(isVisible)
      }
    },
    [unmountTooltip],
  )

  /**
   * Once tooltip is visible in the dom we can compute positions, then set it visible on screen and add event to
   * recompute positions on scroll or screen resize.
   */
  useEffect(() => {
    if (visibleInDom) {
      getPositions()

      window.addEventListener('resize', getPositions)
      window.addEventListener('scroll', getPositions)

      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = '1'
      }
    }
  }, [getPositions, unmountTooltip, visibleInDom])

  /**
   * WIll render children conditionally
   */
  const renderChildren = useCallback(() => {
    if (typeof children === 'function')
      return children({
        className,
        onBlur: onMouseEvent(false),
        onFocus: onMouseEvent(true),
        onMouseEnter: onMouseEvent(true),
        onMouseLeave: onMouseEvent(false),
        ref: childrenRef,
      }) as JSX.Element

    return (
      <div
        aria-describedby={id}
        onBlur={onMouseEvent(false)}
        onFocus={onMouseEvent(true)}
        onMouseEnter={onMouseEvent(true)}
        onMouseLeave={onMouseEvent(false)}
        ref={childrenRef}
      >
        {children}
      </div>
    )
  }, [children, className, id, onMouseEvent])

  if (!text) {
    return children as JSX.Element
  }

  return (
    <>
      {renderChildren()}
      {visibleInDom
        ? createPortal(
            <StyledTooltip
              ref={tooltipRef}
              positions={positions}
              maxWidth={maxWidth}
              role="tooltip"
              id={computedId}
            >
              {text}
            </StyledTooltip>,
            document.body,
          )
        : null}
    </>
  )
}

export default Tooltip
