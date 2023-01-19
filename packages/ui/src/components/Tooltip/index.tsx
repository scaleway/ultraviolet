import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode, Ref, RefObject } from 'react'
import {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import type { TooltipPlacement } from './helpers'
import { ARROW_WIDTH, DEFAULT_POSITIONS, computePositions } from './helpers'

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

const StyledChildrenContainer = styled.div`
  display: inherit;
`

type TooltipProps = {
  id?: string
  children:
    | ReactNode
    | ((renderProps: {
        className?: string
        onBlur: () => void
        onFocus: () => void
        onPointerEnter: () => void
        onPointerLeave: () => void
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

export const Tooltip = ({
  children,
  text = '',
  placement = 'auto',
  id,
  className,
  maxWidth = 232,
  visible,
  innerRef,
}: TooltipProps) => {
  const childrenRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(innerRef, () => childrenRef.current)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>()

  // Debounce timer will be used to prevent the tooltip from flickering when the user moves the mouse out and in the children element.
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>()
  const [visibleInDom, setVisibleInDom] = useState(false)
  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [positions, setPositions] = useState<PositionsType>({
    ...DEFAULT_POSITIONS,
  })
  const uniqueId = useId()
  const generatedId = id ?? uniqueId
  const isControlled = visible !== undefined

  const generatePositions = useCallback(() => {
    if (childrenRef.current && tooltipRef.current) {
      setPositions(
        computePositions({
          childrenRef,
          placement,
          tooltipRef,
        }),
      )
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
    timer.current = undefined

    window.removeEventListener('scroll', onScrollDetected, true)
  }, [onScrollDetected])

  /**
   * When mouse hover or stop hovering children this function display or hide tooltip. A timeout is set to allow animation
   * end, then remove tooltip from dom.
   */
  const onPointerEvent = useCallback(
    (isVisible: boolean) => () => {
      // This condition is for when we want to unmount the tooltip
      // There is debounce in order to avoid tooltip to flicker when we move the mouse from children to tooltip
      // Timer is used to follow the animation duration
      if (!isVisible && tooltipRef.current && !debounceTimer.current) {
        debounceTimer.current = setTimeout(() => {
          setReverseAnimation(true)
          timer.current = setTimeout(() => unmountTooltip(), ANIMATION_DURATION)
        }, 200)
      } else {
        // This condition is for when we want to mount the tooltip
        // If the timer exists it means the tooltip was about to umount, but we hovered the children again,
        // so we clear the timer and the tooltip will not be unmounted
        if (timer.current) {
          setReverseAnimation(false)
          clearTimeout(timer.current)
          timer.current = undefined
        }
        // And here is when we currently are in a debounce timer, it means tooltip was hovered during
        // that period, and so we can clear debounce timer
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current)
          debounceTimer.current = undefined
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

    return () => {
      window.removeEventListener('scroll', onScrollDetected, true)
    }
  }, [generatePositions, onScrollDetected, visibleInDom])

  /**
   * If tooltip has `visible` prop it means the tooltip is manually controlled through this prop.
   * In this cas we don't want to display tooltip on hover, but only when `visible` is true.
   */
  useEffect(() => {
    if (isControlled) {
      onPointerEvent(visible)()
    }
  }, [isControlled, onPointerEvent, visible])

  /**
   * Will render children conditionally if children is a function or not.
   */
  const renderChildren = useCallback(() => {
    if (typeof children === 'function') {
      return children({
        onBlur: !isControlled ? onPointerEvent(false) : () => {},
        onFocus: !isControlled ? onPointerEvent(true) : () => {},
        onPointerEnter: !isControlled ? onPointerEvent(true) : () => {},
        onPointerLeave: !isControlled ? onPointerEvent(false) : () => {},
        ref: childrenRef,
      })
    }

    return (
      <StyledChildrenContainer
        aria-describedby={generatedId}
        onBlur={!isControlled ? onPointerEvent(false) : () => {}}
        onFocus={!isControlled ? onPointerEvent(true) : () => {}}
        onPointerEnter={!isControlled ? onPointerEvent(true) : () => {}}
        onPointerLeave={!isControlled ? onPointerEvent(false) : () => {}}
        ref={childrenRef}
      >
        {children}
      </StyledChildrenContainer>
    )
  }, [children, generatedId, isControlled, onPointerEvent])

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
