'use client'
import { safePolygon, useClick, useHover, useInteractions } from '@floating-ui/react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { FOCUSABLE_ELEMENTS } from '../../Tooltip/TooltipChildren'
import { usePopupContext } from './context'
import { popupV2Style } from './styles.css'

type PopupTriggerProps = {
  children: ReactNode
  /**
   * Which user interaction opens and closes the popup.
   * @default 'click'
   */
  triggerEvent?: 'click' | 'hover'
}

/**
 * Wraps the trigger element, wires the interaction hooks based on
 * `triggerEvent` and lands the ARIA attributes on the trigger's focusable
 * element (or on the wrapper when there is none).
 */
export const Trigger = ({ children, triggerEvent = 'click' }: PopupTriggerProps) => {
  const { context, dismiss, id, refs, open, role } = usePopupContext()
  const triggerRef = useRef<HTMLDivElement>(null)

  const click = useClick(context)
  const hover = useHover(context, {
    enabled: triggerEvent === 'hover',
    handleClose: safePolygon(),
    move: false,
  })
  const { getReferenceProps } = useInteractions([dismiss, click, hover])

  useEffect(() => {
    const wrapper = triggerRef.current
    if (!wrapper) {
      return
    }

    const focusable = wrapper.querySelector<HTMLElement>(FOCUSABLE_ELEMENTS)
    const reference = focusable ?? wrapper

    refs.setReference(reference)
    if (reference === wrapper) {
      wrapper.tabIndex = 0
      wrapper.setAttribute('role', 'button')
    }

    const setAttribute = (name: string, value: string | null) => {
      if (value === null) {
        reference.removeAttribute(name)
      } else {
        reference.setAttribute(name, value)
      }
    }
    setAttribute('aria-expanded', open ? 'true' : 'false')
    setAttribute('aria-controls', open ? id : null)
    setAttribute('aria-haspopup', role)
  }, [open, role, id, refs])

  return (
    <div ref={triggerRef} className={popupV2Style.trigger} {...getReferenceProps()}>
      {children}
    </div>
  )
}

Trigger.displayName = 'Popup.Trigger'
