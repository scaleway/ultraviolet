'use client'

import { cn } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  CSSProperties,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
  RefObject,
} from 'react'
import {
  forwardRef,
  startTransition,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { isClientSide } from '../../helpers/isClientSide'
import type { PopupAlign, PopupPlacement } from './helpers'
import { computePositions, DEFAULT_POSITIONS } from './helpers'
import {
  animationPopup,
  childrenContainerPopup,
  containerPopup,
  popup,
} from './styles.css'
import {
  animationDurationPopup,
  arrowLeft,
  arrowTop,
  arrowTransform,
  maxHeightPopup,
  maxWidthPopup,
  popupInitialPosition,
  popupPosition,
} from './variables.css'

const DEFAULT_ANIMATION_DURATION = 230 // in ms
const DEFAULT_DEBOUNCE_DURATION = 200 // in ms

const noop = () => {}

export type PositionsType = {
  arrowLeft: number
  arrowTop: number
  arrowTransform: string
  placement: string
  rotate: number
  popupInitialPosition: string
  popupPosition: string
}

/**
 * This event handle allow us to not bubble the event to document.body like this react-select works fine
 */
const stopClickPropagation: MouseEventHandler = event => {
  event.stopPropagation()
}

type PopupRole = 'dialog' | 'tooltip' | 'popup' | string

type PopupProps = {
  /**
   * Id is automatically generated if not set. It is used for associating popup wrapper with popup portal.
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
        ref: RefObject<HTMLDivElement | null>
      }) => ReactNode)
  maxWidth?: number | string
  /**
   * `auto` placement will change the position of the popup if it doesn't fit in the viewport.
   */
  placement?: PopupPlacement
  /**
   * Align the popup to the start or center of the children.
   */
  align?: PopupAlign
  /**
   * Content of the popup, preferably text inside.
   */
  text?: ReactNode
  className?: string
  /**
   * It will add `width: 100%` to the popup container.
   */
  containerFullWidth?: boolean
  /**
   * It will add `height: 100%` to the popup container.
   */
  containerFullHeight?: boolean
  /**
   * It will force display popup. This can be useful if you need to always display the popup without hover needed.
   */
  visible?: boolean
  innerRef?: Ref<HTMLDivElement | null>
  role?: PopupRole
  'data-testid'?: string
  hasArrow?: boolean
  onClose?: () => void
  tabIndex?: number
  onKeyDown?: KeyboardEventHandler
  'aria-haspopup'?: HTMLAttributes<HTMLDivElement>['aria-haspopup']
  hideOnClickOutside?: boolean
  /**
   * If you set debounceTime to false, the popup will not debounce the hover event and will be displayed instantly.
   * If set to 0 it will disable debounce.
   */
  debounceDelay?: number
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
  /**
   * If you set this to true, the popup will be rendered in the DOM only when it is visible.
   * When set to false, the popup will always be rendered in the DOM. By default this value is set to `true`, if for some
   * reason you need to disable it, you can set it to `false`.
   */
  dynamicDomRendering?: boolean
  style?: CSSProperties
}

const getPopupPortalTarget = ({
  node,
  role,
  portalTarget,
}: {
  node: HTMLElement | null
  role: PopupRole
  portalTarget?: HTMLElement
}) => {
  if (portalTarget) {
    return portalTarget
  }

  if (role === 'dialog') {
    if (node) {
      return node
    }
    if (isClientSide) {
      return document.body
    }

    return null
  }

  // We check if window exists for SSR
  if (typeof window !== 'undefined') {
    return document.body
  }

  return null
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
      align = 'center',
      id,
      className,
      containerFullWidth,
      containerFullHeight,
      maxWidth = '14.5rem',
      maxHeight,
      visible,
      innerRef,
      role = 'popup',
      'data-testid': dataTestId,
      hasArrow = true,
      onClose,
      tabIndex = 0,
      onKeyDown,
      'aria-haspopup': ariaHasPopup,
      hideOnClickOutside = false,
      debounceDelay = DEFAULT_DEBOUNCE_DURATION,
      disableAnimation = false,
      portalTarget,
      dynamicDomRendering = true,
      style,
    }: PopupProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const childrenRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(innerRef, () => childrenRef.current as HTMLDivElement)

    const innerPopupRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => innerPopupRef.current as HTMLDivElement)

    const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const popupPortalTarget = getPopupPortalTarget({
      node: childrenRef.current,
      portalTarget,
      role,
    })

    // There are some issue when mixing animation and maxHeight on some browsers, so we disable animation if maxHeight is set.
    const animationDuration =
      disableAnimation || maxHeight ? 0 : DEFAULT_ANIMATION_DURATION

    // Debounce timer will be used to prevent the popup from flickering when the user moves the mouse out and in the children element.
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const [visibleInDom, setVisibleInDom] = useState(false)
    const [reverseAnimation, setReverseAnimation] = useState(false)
    const [positions, setPositions] = useState<PositionsType>({
      ...DEFAULT_POSITIONS,
    })
    const uniqueId = useId()
    const generatedId = id ?? uniqueId
    const isControlled = visible !== undefined
    const isAnimated = useMemo(
      () => animationDuration > 0 && !maxHeight,
      [animationDuration, maxHeight],
    )

    const generatePopupPositions = useCallback(() => {
      if (childrenRef.current && innerPopupRef.current && popupPortalTarget) {
        setPositions(
          computePositions({
            align,
            childrenRef,
            hasArrow,
            placement,
            popupPortalTarget,
            popupRef: innerPopupRef,
          }),
        )
      }
    }, [hasArrow, placement, align, popupPortalTarget])

    /**
     * This function is called when we need to recompute positions of popup due to window scroll or resize.
     */
    const onWindowChangeDetected = useCallback(() => {
      // We remove animation on scroll or the animation will restart on every scroll
      if (innerPopupRef.current) {
        innerPopupRef.current.style.animation = 'none'
      }

      generatePopupPositions()
    }, [generatePopupPositions, innerPopupRef])

    /**
     * This function is called when we need to remove popup portal from DOM and remove event listener to it.
     */
    const unmountPopupFromDom = useCallback(() => {
      setVisibleInDom(false)
      setReverseAnimation(false)

      window.removeEventListener('scroll', onWindowChangeDetected, true)
    }, [onWindowChangeDetected])

    /**
     * This function is called when we need to hide popup. A timeout is set to allow animation end, then remove
     * popup from dom.
     */
    const closePopup = useCallback(() => {
      const closeFunction = () => {
        if (!disableAnimation) {
          setReverseAnimation(true)

          timer.current = setTimeout(() => {
            onClose?.()
            unmountPopupFromDom()
          }, animationDuration)
        } else {
          onClose?.()
          unmountPopupFromDom()
        }
      }

      if (!disableAnimation) {
        debounceTimer.current = setTimeout(
          () => {
            closeFunction()
          },
          debounceDelay && !disableAnimation ? debounceDelay : 0,
        )
      } else {
        closeFunction()
      }
    }, [
      animationDuration,
      disableAnimation,
      debounceDelay,
      onClose,
      unmountPopupFromDom,
    ])

    /**
     * When mouse hover or stop hovering children this function display or hide popup. A timeout is set to allow animation
     * end, then remove popup from dom.
     */
    const onPointerEvent = useCallback(
      (isVisible: boolean) => () => {
        // If there is a debounceDelay and the popup is not visible, we clear the debounce timer
        if (!visible && debounceDelay > 0 && debounceTimer.current) {
          clearTimeout(debounceTimer.current)
          debounceTimer.current = undefined
        }

        // This condition is for when we want to unmount the popup
        // There is debounce in order to avoid popup to flicker when we move the mouse from children to popup
        // Timer is used to follow the animation duration
        if (!isVisible && innerPopupRef.current && !debounceTimer.current) {
          closePopup()
        } else if (isVisible) {
          // This condition is for when we want to mount the popup
          // If the timer exists it means the popup was about to umount, but we hovered the children again,
          // so we clear the timer and the popup will not be unmounted
          if (timer.current) {
            setReverseAnimation(false)
            clearTimeout(timer.current)
            timer.current = undefined
          }
          // And here is when we currently are in a debounce timer, it means popup was hovered during
          // that period, and so we can clear debounce timer
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current)
            debounceTimer.current = undefined
          }
          if (debounceDelay > 0) {
            debounceTimer.current = setTimeout(() => {
              setVisibleInDom(true)
            }, debounceDelay)
          } else {
            startTransition(() => {
              setVisibleInDom(true)
            })
          }
        }
      },
      [closePopup, debounceDelay, visible],
    )

    useLayoutEffect(() => {
      const currentRef = childrenRef.current
      const mutationObserver = new MutationObserver(() => {
        generatePopupPositions()
      })
      const resizeObserver = new ResizeObserver(() => {
        generatePopupPositions()
      })

      if (currentRef) {
        resizeObserver.observe(currentRef)
        mutationObserver.observe(currentRef, { characterData: true })
      }

      return () => {
        if (currentRef) {
          resizeObserver.unobserve(currentRef)
          mutationObserver.disconnect()
        }
      }
    }, [visibleInDom, generatePopupPositions])

    /**
     * Once popup is visible in the dom we can compute positions, then set it visible on screen and add event to
     * recompute positions on scroll or screen resize.
     */
    useLayoutEffect(() => {
      if (visibleInDom) {
        generatePopupPositions()

        if (popupPortalTarget === document.body) {
          // We want to detect scroll and resize in order to recompute positions of popup
          // Adding true as third parameter to event listener will detect nested scrolls.
          window.addEventListener('scroll', onWindowChangeDetected, true)
        }
        window.addEventListener('resize', onWindowChangeDetected, true)
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
      generatePopupPositions,
      onWindowChangeDetected,
      visibleInDom,
      maxWidth,
      popupPortalTarget,
    ])

    // This will be triggered when positions are computed and popup is visible in the dom.
    useLayoutEffect(() => {
      if (visibleInDom && innerPopupRef.current) {
        innerPopupRef.current.style.opacity = '1'
      }
    }, [visibleInDom, positions])

    /**
     * If popup has `visible` prop it means the popup is manually controlled through this prop.
     * In this cas we don't want to display popup on hover, but only when `visible` is true.
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
          closePopup()
        }
      }

      const handleClickOutside = (event: MouseEvent) => {
        const popupCurrent = innerPopupRef.current
        const childrenCurrent = childrenRef.current

        if (
          popupCurrent &&
          hideOnClickOutside &&
          !event.defaultPrevented &&
          event.target &&
          event.target !== popupCurrent &&
          event.target !== childrenCurrent &&
          !childrenCurrent?.contains(event.target as Node) &&
          !popupCurrent.contains(event.target as Node)
        ) {
          event.preventDefault()
          event.stopPropagation()
          closePopup()
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
      closePopup,
      visibleInDom,
      innerPopupRef,
      childrenRef,
      hideOnClickOutside,
    ])

    /**
     * This event will occur only for dialog and will trap focus inside the dialog.
     */
    const handleFocusTrap: KeyboardEventHandler = useCallback(event => {
      const isTabPressed = event.key === 'Tab'
      if (!isTabPressed) {
        return
      }
      event.stopPropagation()

      const focusableEls = innerPopupRef.current?.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
      )

      // Handle case when no interactive element are within the modal (including close icon)
      if (focusableEls?.length === 0) {
        event.preventDefault()
      }

      if (focusableEls) {
        const elems = [...focusableEls]
        const firstFocusableEl = elems[0]
        const lastFocusableEl = elems.at(-1)

        if (event.shiftKey) {
          if (
            document.activeElement === firstFocusableEl ||
            document.activeElement === innerPopupRef.current
          ) {
            if (lastFocusableEl instanceof HTMLElement) {
              lastFocusableEl.focus()
            }
            event.preventDefault()
          }
        } else if (
          document.activeElement === lastFocusableEl ||
          document.activeElement === innerPopupRef.current
        ) {
          if (firstFocusableEl instanceof HTMLElement) {
            firstFocusableEl.focus()
          }
          event.preventDefault()
        }
      }
    }, [])

    /**
     * On unmount, clear all timers
     */
    useEffect(
      () => () => {
        if (timer.current) {
          clearTimeout(timer.current)
        }
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current)
        }
      },
      [],
    )

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
        <div
          aria-controls={generatedId}
          aria-describedby={generatedId}
          aria-haspopup={ariaHasPopup}
          className={childrenContainerPopup({
            fullHeight: containerFullHeight,
            fullWidth: containerFullWidth,
          })}
          onBlur={!isControlled ? onPointerEvent(false) : noop}
          onFocus={!isControlled ? onPointerEvent(true) : noop}
          onKeyDown={event => {
            onKeyDown?.(event)
          }}
          onPointerEnter={!isControlled ? onPointerEvent(true) : noop}
          onPointerLeave={!isControlled ? onPointerEvent(false) : noop}
          ref={childrenRef}
          tabIndex={tabIndex}
        >
          {children}
        </div>
      )
    }, [
      ariaHasPopup,
      children,
      containerFullHeight,
      containerFullWidth,
      generatedId,
      isControlled,
      onKeyDown,
      onPointerEvent,
      tabIndex,
    ])

    const shouldRender = useMemo(() => {
      if (!dynamicDomRendering) {
        return true
      }

      if (dynamicDomRendering && visibleInDom) {
        return true
      }

      return false
    }, [dynamicDomRendering, visibleInDom])

    if (!text) {
      if (typeof children === 'function') {
        return null
      }

      return children
    }

    return (
      <>
        {renderChildren()}
        {shouldRender
          ? createPortal(
              <div
                className={cn(
                  className,
                  popup({
                    hasArrow,
                    visibleInDom: !dynamicDomRendering
                      ? visibleInDom
                      : undefined,
                  }),
                  isAnimated
                    ? animationPopup[
                        reverseAnimation ? 'reverse' : 'notReverse'
                      ]
                    : '',
                )}
                data-testid={dataTestId}
                data-visible-in-dom={
                  !dynamicDomRendering ? visibleInDom : undefined
                }
                id={generatedId}
                onClick={stopClickPropagation}
                onKeyDown={role === 'dialog' ? handleFocusTrap : undefined}
                onPointerEnter={!isControlled ? onPointerEvent(true) : noop}
                onPointerLeave={!isControlled ? onPointerEvent(false) : noop}
                ref={innerPopupRef}
                role={role}
                style={{
                  ...assignInlineVars({
                    [arrowTop]: `${positions.arrowTop}px`,
                    [arrowLeft]: `${positions.arrowLeft}px`,
                    [arrowTransform]: `${positions.arrowTransform} rotate(${positions.rotate}deg)`,
                    [popupPosition]: positions.popupPosition,
                    [animationDurationPopup]: `${animationDuration}ms`,
                    [popupInitialPosition]: positions.popupInitialPosition,
                    [maxWidthPopup]: `${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth}`,
                    [maxHeightPopup]:
                      typeof maxHeight === 'number'
                        ? `${maxHeight}px`
                        : maxHeight,
                  }),
                  ...style,
                }}
              >
                <div
                  className={containerPopup({ hasMaxHeight: !!maxHeight })}
                  style={assignInlineVars({
                    [maxHeightPopup]:
                      typeof maxHeight === 'number'
                        ? `${maxHeight}px`
                        : maxHeight,
                  })}
                >
                  {text}
                </div>
              </div>,
              popupPortalTarget as HTMLElement,
            )
          : null}
      </>
    )
  },
)
