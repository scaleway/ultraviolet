'use client'
import { safePolygon, useClick, useHover, useInteractions } from '@floating-ui/react'
import { useEffect, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { FOCUSABLE_ELEMENTS } from '../../constants'
import { usePopupContext } from './context'
import { popupV2Style } from './styles.css'

type PopupTriggerProps = {
  children: ReactNode
  /**
   * Which user interaction opens and closes the popup.
   * @default 'click'
   */
  triggerEvent?: 'click' | 'hover'
  /**
   * Container used as the floating reference, for cases where the popup must
   * be anchored and sized to a larger element around the trigger (e.g. an
   * input with prefix and suffix). ARIA attributes stay on the trigger's
   * focusable element.
   * @default the trigger's focusable element
   */
  triggerContainerRef?: RefObject<HTMLElement | null>
}

/**
 * Wraps the trigger element, wires the interaction hooks based on
 * `triggerEvent` and lands the ARIA attributes on the trigger's focusable
 * element (or on the wrapper when there is none).
 */
export const Trigger = ({ children, triggerEvent = 'click', triggerContainerRef }: PopupTriggerProps) => {
  const { context, dismiss, id, refs, open, role } = usePopupContext()
  const triggerRef = useRef<HTMLDivElement>(null)

  // With a container reference, Floating UI no longer sees the typeable element
  // inside it and would prevent Space/Enter input.
  const click = useClick(context, { keyboardHandlers: !triggerContainerRef })
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
    const ariaTarget = focusable ?? wrapper

    refs.setReference(triggerContainerRef?.current ?? ariaTarget)
    if (ariaTarget === wrapper) {
      wrapper.tabIndex = 0
      wrapper.setAttribute('role', 'button')
    }

    const setAttribute = (name: string, value: string | null) => {
      if (value === null) {
        ariaTarget.removeAttribute(name)
      } else {
        ariaTarget.setAttribute(name, value)
      }
    }
    setAttribute('aria-expanded', open ? 'true' : 'false')
    setAttribute('aria-controls', open ? id : null)
    setAttribute('aria-haspopup', role)
  }, [open, role, id, refs, triggerContainerRef])

  return (
    <div ref={triggerRef} className={popupV2Style.trigger} {...getReferenceProps()}>
      {children}
    </div>
  )
}

Trigger.displayName = 'Popup.Trigger'
