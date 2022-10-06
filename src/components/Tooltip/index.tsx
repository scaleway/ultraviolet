import styled from '@emotion/styled'
import {
  ReactNode,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import {
  ARROW_WIDTH,
  DEFAULT_POSITIONS,
  TooltipPlacement,
  computePositions,
} from './helpers'

const ANIMATION_DURATION = 230 // in ms

type PositionsType = {
  arrowLeft: number
  arrowTop: number
  arrowTransform: string
  placement: string
  rotate: number
  tooltipInitialPosition: string
  tooltipPosition: string
}

type StyledTooltipProps = {
  maxWidth: number
  positions: PositionsType
}

const StyledTooltip = styled.div<StyledTooltipProps>`
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  color: ${({ theme }) => theme.colors.neutral.textStronger};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  text-align: center;
  position: absolute;
  max-width: ${({ maxWidth }) => maxWidth}px;
  opacity: 0;
  font-size: 0.8rem;
  inset: 0 auto auto 0;
  transition: none;
  transform: ${({ positions }) => positions.tooltipInitialPosition};

  &::after {
    content: ' ';
    position: absolute;
    top: ${({ positions }) => positions.arrowTop}px;
    left: ${({ positions }) => positions.arrowLeft}px;
    transform: ${({ positions }) => positions.arrowTransform}
      rotate(${({ positions }) => positions.rotate}deg);
    margin-left: -${ARROW_WIDTH}px;
    border-width: ${ARROW_WIDTH}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.neutral.backgroundStronger}
      transparent transparent transparent;
    pointer-events: none;
  }
`

type TooltipProps = {
  id?: string
  children:
    | ReactNode
    | ((renderProps: {
        className?: string
        onBlur: () => void
        onFocus: () => void
        onMouseEnter: () => void
        onMouseLeave: () => void
        ref: RefObject<HTMLDivElement>
      }) => ReactNode)
  maxWidth?: number
  /**
   * `auto` placement will change the position of the tooltip if it doesn't fit in the viewport.
   */
  placement?: TooltipPlacement
  text?: ReactNode
  className?: string
  visible?: boolean
  innerRef?: Ref<HTMLDivElement | null>
}

const Tooltip = ({
  children,
  text = '',
  placement = 'auto',
  id,
  className,
  maxWidth = 232,
  visible = false,
  innerRef,
}: TooltipProps) => {
  const childrenRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(innerRef, () => childrenRef.current)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval>>()
  const [visibleInDom, setVisibleInDom] = useState(visible)
  const [positions, setPositions] = useState<PositionsType>({
    ...DEFAULT_POSITIONS,
  })
  const uniqueId = useId()
  const generatedId = id ?? uniqueId

  /**
   * Will compute the positions of the tooltip and the arrow
   */
  const generatePositions = useCallback(() => {
    if (childrenRef.current && tooltipRef.current) {
      setPositions(computePositions({ childrenRef, placement, tooltipRef }))
    }
  }, [placement])

  /**
   * This function is called when we need to remove tooltip portal from DOM and remove event listener to it.
   */
  const unmountTooltip = useCallback(() => {
    setVisibleInDom(false)

    window.removeEventListener('scroll', generatePositions)
  }, [generatePositions])

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
            tooltipRef.current.style.transform = positions.tooltipPosition
            tooltipRef.current.focus()
          }
        }
        setVisibleInDom(isVisible)
      }
    },
    [positions.tooltipPosition, unmountTooltip],
  )

  /**
   * Once tooltip is visible in the dom we can compute positions, then set it visible on screen and add event to
   * recompute positions on scroll or screen resize.
   */
  useEffect(() => {
    if (visibleInDom) {
      generatePositions()

      // if placement is auto we want to recompute positions on scroll only when placement changes
      if (placement === 'auto') {
        window.addEventListener('scroll', generatePositions)
      }

      if (
        tooltipRef.current &&
        positions.tooltipPosition !== DEFAULT_POSITIONS.tooltipInitialPosition
      ) {
        tooltipRef.current.style.transition = `${ANIMATION_DURATION}ms opacity ease-in-out, ${ANIMATION_DURATION}ms transform ease-in-out`
        tooltipRef.current.style.opacity = '1'
        tooltipRef.current.style.transform = positions.tooltipPosition
        tooltipRef.current.focus()
      }
    }
  }, [visibleInDom, positions.tooltipPosition, generatePositions, placement])

  /**
   * WIll render children conditionally if children is a function or not.
   */
  const renderChildren = useCallback(() => {
    if (typeof children === 'function')
      return children({
        onBlur: onMouseEvent(false),
        onFocus: onMouseEvent(true),
        onMouseEnter: onMouseEvent(true),
        onMouseLeave: onMouseEvent(false),
        ref: childrenRef,
      })

    return (
      <div
        aria-describedby={generatedId}
        onBlur={onMouseEvent(false)}
        onFocus={onMouseEvent(true)}
        onMouseEnter={onMouseEvent(true)}
        onMouseLeave={onMouseEvent(false)}
        ref={childrenRef}
      >
        {children}
      </div>
    )
  }, [children, generatedId, onMouseEvent])

  if (!text) {
    if (typeof children === 'function') return null

    return <>{children}</>
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
              id={generatedId}
              className={className}
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
