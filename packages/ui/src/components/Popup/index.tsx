import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
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

const DEFAULT_ANIMATION_DURATION = 230 // in ms
const DEFAULT_DEBOUNCE_DURATION = 200

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
  maxWidth: number | string
  positions: PositionsType
  reverseAnimation: boolean
  maxHeight?: number | string
  animationDuration?: number
}

const StyledTooltip = styled('div', {
  shouldForwardProp: prop =>
    ![
      'maxWidth',
      'positions',
      'reverseAnimation',
      'maxHeight',
      'animationDuration',
    ].includes(prop),
})<StyledTooltipProps>`
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  color: ${({ theme }) => theme.colors.neutral.textStronger};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  text-align: center;
  position: absolute;
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight};
  overflow: ${({ maxHeight }) => (maxHeight ? 'auto' : undefined)};
  overflow-wrap: break-word;
  font-size: 0.8rem;
  inset: 0 auto auto 0;
  top: 0;
  left: 0;
  transform: ${({ positions }) => positions.tooltipPosition};
  animation: ${({
    positions,
    reverseAnimation,
    maxHeight,
    animationDuration,
  }) =>
    maxHeight || animationDuration === 0 || animationDuration === undefined
      ? undefined
      : css`
          ${animationDuration}ms ${!reverseAnimation
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

type PopupProps = {
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
  maxWidth?: number | string
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
  tabIndex?: number
  onKeyDown?: KeyboardEventHandler
  'aria-haspopup'?: HTMLAttributes<HTMLDivElement>['aria-haspopup']
  hideOnClickOutside?: boolean
  needDebounce?: boolean
  /**
   * If you set a max height keep in mind that the animation is disabled, or it will not work properly on some browsers.
   */
  maxHeight?: string | number
  /**
   * Will remove the animation on the popup if set to false.
   */
  disableAnimation?: boolean
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
}

/**
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
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
      maxHeight,
      visible,
      innerRef,
      role = 'tooltip',
      'data-testid': dataTestId,
      hasArrow = true,
      onClose,
      tabIndex = 0,
      onKeyDown,
      'aria-haspopup': ariaHasPopup,
      hideOnClickOutside = false,
      needDebounce = true,
      disableAnimation = false,
      portalTarget,
    }: PopupProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const childrenRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(innerRef, () => childrenRef.current)

    const innerTooltipRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => innerTooltipRef.current as HTMLDivElement)

    const timer = useRef<ReturnType<typeof setTimeout> | undefined>()
    const popupPortalTarget =
      portalTarget ?? childrenRef.current ?? document.body

    // There are some issue when mixing animation and maxHeight on some browsers, so we disable animation if maxHeight is set.
    const animationDuration =
      disableAnimation || maxHeight ? 0 : DEFAULT_ANIMATION_DURATION

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
            popupPortalTarget,
          }),
        )
      }
    }, [placement, popupPortalTarget])

    /**
     * This function is called when we need to recompute positions of tooltip due to window scroll or resize.
     */
    const onWindowChangeDetected = useCallback(() => {
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

      window.removeEventListener('scroll', onWindowChangeDetected, true)
    }, [onWindowChangeDetected])

    /**
     * This function is called when we need to hide tooltip. A timeout is set to allow animation end, then remove
     * tooltip from dom.
     */
    const hideTooltip = useCallback(() => {
      debounceTimer.current = setTimeout(
        () => {
          setReverseAnimation(true)
          timer.current = setTimeout(() => {
            unmountTooltip()
            onClose?.()
          }, animationDuration)
        },
        needDebounce && !disableAnimation ? DEFAULT_DEBOUNCE_DURATION : 0,
      )
    }, [
      animationDuration,
      disableAnimation,
      needDebounce,
      onClose,
      unmountTooltip,
    ])

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

        if (popupPortalTarget === document.body) {
          // We want to detect scroll and resize in order to recompute positions of tooltip
          // Adding true as third parameter to event listener will detect nested scrolls.
          window.addEventListener('scroll', onWindowChangeDetected, true)
          window.addEventListener('resize', onWindowChangeDetected, true)
        }
      }

      return () => {
        window.removeEventListener('scroll', onWindowChangeDetected, true)
        window.removeEventListener('resize', onWindowChangeDetected, true)
        if (timer.current) {
          clearTimeout(timer.current)
          timer.current = undefined
        }
      }
    }, [
      generatePositions,
      onWindowChangeDetected,
      visibleInDom,
      maxWidth,
      popupPortalTarget,
    ])

    /**
     * If tooltip has `visible` prop it means the tooltip is manually controlled through this prop.
     * In this cas we don't want to display tooltip on hover, but only when `visible` is true.
     */
    useEffect(() => {
      if (isControlled) {
        onPointerEvent(visible)()
      }
    }, [isControlled, onPointerEvent, visible])

    // Handle hide on esc press and hide on click outside
    useEffect(() => {
      const handleEscPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          hideTooltip()
        }
      }
      const handleClickOutside = (event: MouseEvent) => {
        const tooltipCurrent = innerTooltipRef.current
        const childrenCurrent = childrenRef.current

        if (tooltipCurrent && hideOnClickOutside && !event.defaultPrevented) {
          if (
            event.target &&
            event.target !== tooltipCurrent &&
            event.target !== childrenCurrent &&
            !childrenCurrent?.contains(event.target as Node) &&
            !tooltipCurrent.contains(event.target as Node)
          ) {
            event.preventDefault()
            event.stopPropagation()
            hideTooltip()
          }
        }
      }
      if (visibleInDom) {
        document.body.addEventListener('keyup', handleEscPress)
        document.body.addEventListener('click', handleClickOutside)
      }

      return () => {
        document.body.removeEventListener('keyup', handleEscPress)
        document.body.removeEventListener('click', handleClickOutside)
      }
    }, [
      hideTooltip,
      visibleInDom,
      innerTooltipRef,
      childrenRef,
      hideOnClickOutside,
    ])

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
          tabIndex={tabIndex}
          onKeyDown={event => {
            onKeyDown?.(event)
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
      onPointerEvent,
      tabIndex,
    ])

    if (!text) {
      if (typeof children === 'function') return null

      return <>{children}</>
    }

    /**
     * This event handle allow us to not bubble the event to document.body like this react-select works fine
     */
    const stopClickPropagation: MouseEventHandler = event => {
      event.nativeEvent.stopImmediatePropagation()
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
                maxHeight={maxHeight}
                role={role}
                id={generatedId}
                className={className}
                reverseAnimation={reverseAnimation}
                data-testid={dataTestId}
                data-has-arrow={hasArrow}
                onClick={stopClickPropagation}
                animationDuration={animationDuration}
              >
                {text}
              </StyledTooltip>,
              popupPortalTarget,
            )
          : null}
      </>
    )
  },
)
