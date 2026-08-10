import { useEffect, useRef } from 'react'
import type { TooltipProps } from '.'
import type { useTooltip } from './useTooltip'
import { tooltipStyle } from './styles.css'

const FOCUSABLE_ELEMENTS = `
  :is(
    a[href],
    button,
    input:not([type="hidden"]),
    select,
    textarea,
    [tabindex],
    [contenteditable="true"],
    details,
    summary,
    audio[controls],
    video[controls]
  )
  :not([disabled])
  :not([tabindex="-1"])
`.replace(/\s+/g, '')

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
    const existingAriaValue = reference.getAttribute(ariaAttributeName)

    tooltip.refs.setReference(reference)

    const clearAriaAttribute = () => {
      if (existingAriaValue) {
        reference.setAttribute(ariaAttributeName, existingAriaValue)
      } else {
        reference.removeAttribute(ariaAttributeName)
      }
    }

    if (ariaAttributeValue) {
      reference.setAttribute(ariaAttributeName, [existingAriaValue, ariaAttributeValue].join(' ').trim())
    } else {
      clearAriaAttribute()
    }

    if (reference === tooltipWrapperRef.current && tooltipWrapperRef.current.tabIndex !== tabIndex) {
      tooltipWrapperRef.current.tabIndex = tabIndex
    }

    return clearAriaAttribute
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
