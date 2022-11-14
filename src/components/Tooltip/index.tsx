import { css, keyframes } from '@emotion/react'
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

const animation = (positions: PositionsType) => keyframes`
  0% {
    opacity: 0;
    transform: ${positions.tooltipInitialPosition};
  }
  100% {
    opacity: 1;
    transform: ${positions.tooltipPosition};
  }
`

const exitAnimation = (positions: PositionsType) => keyframes`
  0% {
    opacity: 1;
    transform: ${positions.tooltipPosition};
  }
  100% {
    opacity: 0;
    transform: ${positions.tooltipInitialPosition};
  }
`

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
  reverseAnimation: boolean
}

const StyledTooltip = styled.div<StyledTooltipProps>`
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  color: ${({ theme }) => theme.colors.neutral.textStronger};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  text-align: center;
  position: absolute;
  max-width: ${({ maxWidth }) => maxWidth}px;
  font-size: 0.8rem;
  inset: 0 auto auto 0;
  top: 0;
  left: 0;
  transform: ${({ positions }) => positions.tooltipPosition};
  animation: ${({ positions, reverseAnimation }) =>
    css`
      ${ANIMATION_DURATION}ms ${!reverseAnimation
        ? animation(positions)
        : exitAnimation(positions)}
    `};

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
  /**
   * Content of the tooltip, preferably text inside.
   */
  text?: ReactNode
  className?: string
  /**
   * It will force display tooltip. This can be useful if you need to always display the tooltip without hover needed.
   */
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
  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [positions, setPositions] = useState<PositionsType>({
    ...DEFAULT_POSITIONS,
  })
  const uniqueId = useId()
  const generatedId = id ?? uniqueId

  const generatePositions = useCallback(() => {
    if (childrenRef.current && tooltipRef.current) {
      setPositions(computePositions({ childrenRef, placement, tooltipRef }))
    }
  }, [placement])

  const onScrollDetected = useCallback(() => {
    // We remove animation on scroll or the animation will restart on every scroll
    if (tooltipRef.current) {
      tooltipRef.current.style.animation = 'none'
    }
    generatePositions()
  }, [generatePositions])

  /**
   * This function is called when we need to remove tooltip portal from DOM and remove event listener to it.
   */
  const unmountTooltip = useCallback(() => {
    setVisibleInDom(false)
    setReverseAnimation(false)

    window.removeEventListener('scroll', onScrollDetected, true)
  }, [onScrollDetected])

  /**
   * When mouse hover or stop hovering children this function display or hide tooltip. A timeout is set to allow animation
   * end, then remove tooltip from dom.
   */
  const onMouseEvent = useCallback(
    (isVisible: boolean) => () => {
      // This is when we hide the tooltip, we reverse animation then we set a timeout based on CSS animation duration
      // then we remove it from dom
      if (!isVisible && tooltipRef.current) {
        setReverseAnimation(true)
        timer.current = setTimeout(() => unmountTooltip(), ANIMATION_DURATION)
      } else {
        // If a timeout is already set it means tooltip didn't have time to close completely and be removed from dom,
        // so we clear timeout and set back opacity of tooltip to 1, so it can be visible on screen.
        if (timer.current) {
          setReverseAnimation(false)
          clearTimeout(timer.current)
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
      generatePositions()

      // We want to detect scroll in order to recompute positions of tooltip
      // Adding true as third parameter to event listener will detect nested scrolls.
      window.addEventListener('scroll', onScrollDetected, true)
    }
  }, [
    visibleInDom,
    positions.tooltipPosition,
    generatePositions,
    placement,
    text,
    onScrollDetected,
  ])

  /**
   * Will render children conditionally if children is a function or not.
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
              reverseAnimation={reverseAnimation}
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
