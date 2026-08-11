import { useEffect, useRef } from 'react'
import type { TooltipProps } from '.'
import type { useTooltip } from './useTooltip'
import { tooltipStyle } from './styles.css'

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
  'details',
  'summary',
  'audio[controls]',
  'video[controls',
].join(',')

type TooltipChildrenProps = {
  tooltip: ReturnType<typeof useTooltip>
  tooltipId: string
} & Pick<TooltipProps, 'children' | 'tabIndex' | 'role' | 'containerFullHeight' | 'containerFullWidth'>

export function TooltipChildren({
  children,
  tooltip,
  tooltipId,
  tabIndex = 0,
  role,
  containerFullHeight,
  containerFullWidth,
}: TooltipChildrenProps) {
  const eventHandlers = tooltip.getReferenceProps()

  const ariaAttributeName = role === 'label' ? 'aria-labelledby' : 'aria-describedby'
  const ariaAttributeValue = tooltip.isMounted ? tooltipId : null

  const tooltipWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tooltipWrapperRef.current) {
      return
    }

    const focusableChild = tooltipWrapperRef.current.querySelector<HTMLElement>(FOCUSABLE_ELEMENTS)
    const reference = focusableChild || tooltipWrapperRef.current

    tooltip.refs.setReference(reference)

    if (ariaAttributeValue) {
      reference.setAttribute(ariaAttributeName, ariaAttributeValue)
    } else {
      reference.removeAttribute(ariaAttributeName)
    }

    if (reference === tooltipWrapperRef.current && tooltipWrapperRef.current.tabIndex !== tabIndex) {
      tooltipWrapperRef.current.tabIndex = tabIndex
    }
  }, [tooltip, tabIndex, ariaAttributeName, ariaAttributeValue])

  if (typeof children === 'function') {
    return children({
      ...eventHandlers,
      [ariaAttributeName]: ariaAttributeValue,
      ref: tooltip.refs.setReference,
    })
  }

  return (
    <div
      ref={tooltipWrapperRef}
      className={tooltipStyle.childrenContainer({
        fullHeight: containerFullHeight,
        fullWidth: containerFullWidth,
      })}
      {...eventHandlers}
    >
      {children}
    </div>
  )
}
