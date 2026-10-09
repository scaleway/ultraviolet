'use client'
import { autoUpdate, flip, offset, shift, useDismiss, useFloating, useInteractions, useTransitionStatus } from '@floating-ui/react'
import type { Middleware, Placement } from '@floating-ui/react'
import { useCallback, useId, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { isHeadlessTestEnvironment } from '../../../../helpers/isHeadlessTestEnvironment'
import { PopupContext } from './context'
import type { PopupRole } from './context'
import { ANIMATION_DURATION } from './styles.css'

const DEFAULT_MIDDLEWARE = [offset(8), flip(), shift()]

type PopupRootProps = {
  children: ReactNode
  /**
   * Whether the popup is open (controlled). When set, trigger interactions
   * call `onOpenChange` but do not update the internal state.
   */
  visible?: boolean
  /**
   * Initial open state in uncontrolled mode.
   * @default false
   */
  defaultVisible?: boolean
  /**
   * Called whenever the open state changes (trigger interaction, Escape or
   * outside click).
   */
  onOpenChange?: (open: boolean) => void
}

/**
 * Owns the floating context, the controlled/uncontrolled open state and the
 * dismiss behavior (outside click + Escape). Renders no DOM element.
 */
export const Root = ({ children, defaultVisible = false, onOpenChange, visible }: PopupRootProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultVisible)
  const isControlled = visible !== undefined
  const open = isControlled ? visible : uncontrolledOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const [placement, setPlacement] = useState<Placement>('bottom')
  const [panelMiddleware, setPanelMiddleware] = useState<Middleware[]>([])
  const [role, setRole] = useState<PopupRole>('dialog')

  const middleware = useMemo(() => [...DEFAULT_MIDDLEWARE, ...panelMiddleware], [panelMiddleware])

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware,
    whileElementsMounted: autoUpdate,
  })

  const dismiss = useDismiss(floating.context)
  const { getFloatingProps } = useInteractions([dismiss])

  const { isMounted, status } = useTransitionStatus(floating.context, {
    duration: isHeadlessTestEnvironment ? 0 : ANIMATION_DURATION,
  })

  const id = useId()

  const value = useMemo(
    () => ({
      ...floating,
      open,
      id,
      role,
      placement,
      setRole,
      setPlacement,
      setPanelMiddleware,
      dismiss,
      getFloatingProps,
      isMounted,
      status,
    }),
    [floating, open, id, role, placement, setRole, setPlacement, setPanelMiddleware, dismiss, getFloatingProps, isMounted, status],
  )

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}

Root.displayName = 'PopupV2.Root'
