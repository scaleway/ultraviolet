'use client'

import { useId } from 'react'
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react'
import { createPortal } from 'react-dom'
import { TooltipChildren } from './TooltipChildren'
import { TooltipElement } from './TooltipElement'
import { useTooltip } from './useTooltip'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | LegacyTooltipPlacement

/**
 * @deprecated "auto" is not required since the Tooltip placement is always flipped if needed to remain visible.
 */
type LegacyTooltipPlacement = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right'

export type TooltipRenderProps = Pick<
  HTMLAttributes<HTMLElement>,
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
  // `Ref<HTMLElement>` causes a type error on children functions
  // oxlint-disable-next-line typescript/no-explicit-any
  ref?: Ref<any>
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
  /**
   * max-width of the tooltip element
   */
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
  /**
   * className added on the tooltip element
   */
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
  /**
   * tabindex attribute for the tooltip trigger container
   */
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
  /**
   * style added on the tooltip element
   */
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
  tabIndex = 0,
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

  return (
    <>
      <TooltipChildren
        tooltip={tooltip}
        containerFullHeight={containerFullHeight}
        containerFullWidth={containerFullWidth}
        tooltipId={tooltipId}
        role={role}
        tabIndex={tabIndex}
      >
        {children}
      </TooltipChildren>

      {tooltip.isMounted && portalTargetEl
        ? createPortal(
            <TooltipElement
              tooltip={tooltip}
              id={tooltipId}
              className={className}
              style={style}
              data-testid={dataTestId}
              maxWidth={maxWidth}
              text={text}
            />,
            portalTargetEl,
          )
        : null}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
