import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
  Ref,
  RefObject,
} from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import type { PopupPlacement } from './helpers'
import { ARROW_WIDTH, DEFAULT_POSITIONS, computePositions } from './helpers'

const ANIMATION_DURATION = 230 // in ms

function noop() {}

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

const StyledTooltip = styled('div', {
  shouldForwardProp: prop =>
    !['maxWidth', 'positions', 'reverseAnimation'].includes(prop),
})<StyledTooltipProps>`
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  color: ${({ theme }) => theme.colors.neutral.textStronger};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  text-align: center;
  position: absolute;
  max-width: ${({ maxWidth }) => maxWidth}px;
  word-break: break-all;
  font-size: 0.8rem;
  inset: 0 auto auto 0;
  top: 0;
  left: 0;
  transform: ${({ positions }) => positions.tooltipPosition};
  animation: ${({ positions, reverseAnimation }) => css`
    ${ANIMATION_DURATION}ms ${!reverseAnimation
      ? animation(positions)
      : exitAnimation(positions)} forwards
  `};

  &[data-has-arrow='true'] {
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
  }
`

const StyledChildrenContainer = styled.div`
  display: inherit;

  &[data-container-full-width='true'] {
    width: 100%;
  }
`

type TooltipProps = {
  /**
   * Id is automatically generated if not set. It is used for associating tooltip wrapper with tooltip portal.
   */
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
  placement?: PopupPlacement
  /**
   * Content of the tooltip, preferably text inside.
   */
  text?: ReactNode
  className?: string
  /**
   * It will add `width: 100%` to the tooltip container.
   */
  containerFullWidth?: boolean
  /**
   * It will force display tooltip. This can be useful if you need to always display the tooltip without hover needed.
   */
  visible?: boolean
  innerRef?: Ref<HTMLDivElement | null>
  role?: string
  'data-testid'?: string
  hasArrow?: boolean
  onClose?: () => void
  onKeyDown?: KeyboardEventHandler
  'aria-haspopup'?: HTMLAttributes<HTMLDivElement>['aria-haspopup']
}

export const Popup = forwardRef(
  (
    {
      children,
      text = '',
      placement = 'auto',
      id,
      className,
      containerFullWidth,
      maxWidth = 232,
      visible,
      innerRef,
      role = 'tooltip',
      'data-testid': dataTestId,
      hasArrow = true,
      onClose,
      onKeyDown,
      'aria-haspopup': ariaHasPopup,
    }: TooltipProps,
    tooltipRef: Ref<HTMLDivElement>,
  ) => {
    const childrenRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(innerRef, () => childrenRef.current)

    const tempTooltipRef = useRef<HTMLDivElement>(null)
    const innerTooltipRef =
      (tooltipRef as RefObject<HTMLDivElement>) || tempTooltipRef

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
      if (childrenRef.current && innerTooltipRef.current) {
        setPositions(
          computePositions({
            childrenRef,
            placement,
            tooltipRef: innerTooltipRef,
          }),
        )
      }
    }, [innerTooltipRef, placement])

    const onScrollDetected = useCallback(() => {
      // We remove animation on scroll or the animation will restart on every scroll
      if (innerTooltipRef.current) {
        innerTooltipRef.current.style.animation = 'none'
      }
      generatePositions()
    }, [generatePositions, innerTooltipRef])

    /**
     * This function is called when we need to remove tooltip portal from DOM and remove event listener to it.
     */
    const unmountTooltip = useCallback(() => {
      setVisibleInDom(false)
      setReverseAnimation(false)

      window.removeEventListener('scroll', onScrollDetected, true)
    }, [onScrollDetected])

    /**
     * This function is called when we need to hide tooltip. A timeout is set to allow animation end, then remove
     * tooltip from dom.
     */
    const hideTooltip = useCallback(() => {
      debounceTimer.current = setTimeout(() => {
        setReverseAnimation(true)
        timer.current = setTimeout(() => {
          unmountTooltip()
          onClose?.()
        }, ANIMATION_DURATION)
      }, 200)
    }, [onClose, unmountTooltip])

    /**
     * When mouse hover or stop hovering children this function display or hide tooltip. A timeout is set to allow animation
     * end, then remove tooltip from dom.
     */
    const onPointerEvent = useCallback(
      (isVisible: boolean) => () => {
        // This condition is for when we want to unmount the tooltip
        // There is debounce in order to avoid tooltip to flicker when we move the mouse from children to tooltip
        // Timer is used to follow the animation duration
        if (!isVisible && innerTooltipRef.current && !debounceTimer.current) {
          hideTooltip()
        } else if (isVisible) {
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
          setVisibleInDom(true)
        }
      },
      [hideTooltip, innerTooltipRef],
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
        if (timer.current) {
          clearTimeout(timer.current)
          timer.current = undefined
        }
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

    const onLocalKeyDown: KeyboardEventHandler = useCallback(
      event => {
        if (event.code === 'Escape') {
          unmountTooltip()
        }
      },
      [unmountTooltip],
    )

    // Handle hide on esc press
    useEffect(() => {
      const handleEscPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          hideTooltip()
        }
      }
      if (visibleInDom) {
        document.body.addEventListener('keyup', handleEscPress, {
          capture: true,
        })
        document.body.addEventListener('keydown', handleEscPress, {
          capture: true,
        })
      }

      return () => {
        document.body.removeEventListener('keyup', handleEscPress, {
          capture: true,
        })
        document.body.addEventListener('keydown', handleEscPress, {
          capture: true,
        })
      }
    }, [hideTooltip, onClose, unmountTooltip, visibleInDom])

    /**
     * Will render children conditionally if children is a function or not.
     */
    const renderChildren = useCallback(() => {
      if (typeof children === 'function') {
        return children({
          onBlur: !isControlled ? onPointerEvent(false) : noop,
          onFocus: !isControlled ? onPointerEvent(true) : noop,
          onPointerEnter: !isControlled ? onPointerEvent(true) : noop,
          onPointerLeave: !isControlled ? onPointerEvent(false) : noop,
          ref: childrenRef,
        })
      }

      return (
        <StyledChildrenContainer
          aria-describedby={generatedId}
          aria-controls={generatedId}
          onBlur={!isControlled ? onPointerEvent(false) : noop}
          onFocus={!isControlled ? onPointerEvent(true) : noop}
          onPointerEnter={!isControlled ? onPointerEvent(true) : noop}
          onPointerLeave={!isControlled ? onPointerEvent(false) : noop}
          ref={childrenRef}
          tabIndex={0}
          onKeyDown={event => {
            onKeyDown?.(event)
            onLocalKeyDown(event)
          }}
          data-container-full-width={containerFullWidth}
          aria-haspopup={ariaHasPopup}
        >
          {children}
        </StyledChildrenContainer>
      )
    }, [
      ariaHasPopup,
      children,
      containerFullWidth,
      generatedId,
      isControlled,
      onKeyDown,
      onLocalKeyDown,
      onPointerEvent,
    ])

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
                ref={innerTooltipRef}
                positions={positions}
                maxWidth={maxWidth}
                role={role}
                id={generatedId}
                className={className}
                reverseAnimation={reverseAnimation}
                data-testid={dataTestId}
                data-has-arrow={hasArrow}
              >
                {text}
              </StyledTooltip>,
              document.body,
            )
          : null}
      </>
    )
  },
)
