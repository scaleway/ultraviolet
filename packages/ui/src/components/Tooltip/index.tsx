'use client'

import { cn } from '@ultraviolet/utils'
import { isValidElement, useId } from 'react'
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react'
import { createPortal } from 'react-dom'
import { useTooltip } from './useTooltip'
import { tooltipStyle } from './styles.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | LegacyTooltipPlacement

/**
 * @deprecated "auto" is not required since the Tooltip placement is always flipped if needed to remain visible.
 */
type LegacyTooltipPlacement = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right'

const FOCUSABLE_TAGS = new Set([
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'audio',
  'video',
  'iframe',
  'details',
  'summary',
])

const isFocusableElement = (child: ReactNode): boolean => {
  if (!isValidElement(child)) {
    return false
  }

  return typeof child.type === 'string' && FOCUSABLE_TAGS.has(child.type)
}

export type TooltipRenderProps = Pick<
  HTMLAttributes<HTMLElement>,
  | 'className'
  | 'onBlur'
  | 'onFocus'
  | 'onKeyDown'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onPointerDown'
  | 'onPointerEnter'
  | 'aria-describedby'
  | 'aria-labelledby'
> & {
  ref?: Ref<HTMLDivElement | null>
}

export type TooltipProps = {
  /**
   * id of the tooltip element
   */
  id?: string
  /**
   * The trigger element of the tooltip. If a function is provided, it receives
   * the props (including `aria-describedby`, event handlers and `ref`) to spread
   * on the trigger element.
   */
  children: ReactNode | ((renderProps: TooltipRenderProps) => ReactNode)
  maxWidth?: number | string
  /**
   * Content of the tooltip, preferably text inside. When omitted, no tooltip is rendered.
   */
  text?: ReactNode
  /**
   * Preferred placement for the Tooltip.
   * If there is not enough space, the direction will be flipped so that the Tooltip stays visible.
   * @default top
   */
  placement?: TooltipPlacement
  /**
   * Force the tooltip to be visible. When set, the tooltip is controlled and won't react to hover/focus.
   */
  visible?: boolean
  className?: string
  /**
   *
   */
  role?: 'tooltip' | 'label'
  'data-testid'?: string
  /**
   * It will add `width: 100%` to the tooltip trigger container.
   */
  containerFullWidth?: boolean
  /**
   * It will add `height: 100%` to the tooltip trigger container.
   */
  containerFullHeight?: boolean
  portalTarget?: HTMLElement
  tabIndex?: number
  /**
   * Delay (in ms) before the tooltip opens and closes.
   * @deprecated Use `delay` instead to have more control over opening and closing delays.
   */
  debounceDelay?: number
  /**
   * Open and close delay (in ms) for the tooltip.
   */
  delay?: { open?: number; close?: number }
  /**
   * @deprecated The animation cannot be disabled
   */
  disableAnimation?: boolean
  style?: CSSProperties
  /**
   * Called when the tooltip visibility changes (open/close, including Escape dismiss).
   */
  onOpenChange?: (open: boolean) => void
}

export const DEFAULT_DELAY = { close: 0, open: 200 }

/**
 * Tooltip component is used to display additional information on hover or focus.
 * It is used to explain the purpose of the element it is attached to.
 */
export const Tooltip = ({
  children,
  text = '',
  placement = 'top',
  id,
  className,
  containerFullWidth,
  containerFullHeight,
  maxWidth = 232,
  visible,
  'data-testid': dataTestId,
  portalTarget,
  role,
  debounceDelay,
  delay,
  tabIndex,
  style,
  onOpenChange,
}: TooltipProps) => {
  const tooltip = useTooltip({
    delay: delay ?? (debounceDelay ? { open: debounceDelay, close: debounceDelay } : DEFAULT_DELAY),
    onOpenChange,
    placement,
    visible,
  })
  const uniqueId = useId()
  const tooltipId = id ?? uniqueId

  if (!text) {
    return typeof children === 'function' ? children({}) : children
  }

  const portalTargetEl = portalTarget ?? (typeof window !== 'undefined' ? document.body : null)

  const renderProps: TooltipRenderProps = {
    ...tooltip.getReferenceProps(),
    className: tooltipStyle.childrenContainer({
      fullHeight: containerFullHeight,
      fullWidth: containerFullWidth,
    }),
    ref: tooltip.refs.setReference,
  }

  if (tooltip.isMounted) {
    renderProps[role === 'label' ? 'aria-labelledby' : 'aria-describedby'] = tooltipId
  }

  return (
    <>
      {typeof children === 'function' ? (
        children(renderProps)
      ) : (
        <div {...renderProps} tabIndex={tabIndex ?? (isFocusableElement(children) ? -1 : 0)}>
          {children}
        </div>
      )}
      {tooltip.isMounted && portalTargetEl
        ? createPortal(
            <div
              {...tooltip.getFloatingProps()}
              id={tooltipId}
              className={cn(
                className,
                tooltipStyle.tooltip,
                tooltip.status === 'close' ? tooltipStyle.animation.exit : tooltipStyle.animation.enter,
              )}
              data-placement={tooltip.finalPlacement}
              data-testid={dataTestId}
              ref={tooltip.refs.setFloating}
              role="tooltip"
              style={{
                ...tooltip.floatingStyles,
                maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
                ...style,
              }}
            >
              <div className={tooltipStyle.arrow} ref={tooltip.arrowRef} style={tooltip.arrowStyle} />
              <div className={tooltipStyle.content}>{text}</div>
            </div>,
            portalTargetEl,
          )
        : null}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
