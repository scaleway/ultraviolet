'use client'
import {
  autoUpdate,
  flip,
  FloatingNode,
  FloatingTree,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFloatingParentNodeId,
  useFloatingTree,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react'
import type { Middleware, Placement } from '@floating-ui/react'
import { usePrefersReducedMotion } from '@ultraviolet/animations'
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useState } from 'react'
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
const PopupRoot = ({ children, defaultVisible = false, onOpenChange, visible }: PopupRootProps) => {
  const id = useId()
  const tree = useFloatingTree()
  const parentId = useFloatingParentNodeId()

  // Register the popup in the shared `FloatingTree` so that nested popups (see nested Menu) share the same tree.
  // in order for Floating UI keep parent popups open while a nested popup is open or focused.
  useLayoutEffect(() => {
    const node = { id, parentId }
    tree?.addNode(node)

    return () => tree?.removeNode(node)
  }, [id, parentId, tree])

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
    nodeId: id,
    open,
    onOpenChange: setOpen,
    placement,
    middleware,
    whileElementsMounted: autoUpdate,
  })

  const dismiss = useDismiss(floating.context)
  const { getFloatingProps } = useInteractions([dismiss])

  // Escape must close the popup and not an enclosing Modal, which reacts to Escape too.
  // We listen to keyboard events in the capture phase, before all other listeners that are in the bubble phase.
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open || event.key !== 'Escape') {
        return
      }

      // A Modal opened inside the popup is above it: let it handle Escape first.
      const activeDialog = document.activeElement?.closest('dialog')
      if (activeDialog?.open && !activeDialog.contains(floating.refs.floating.current)) {
        return
      }

      event.stopPropagation()
      setOpen(false)
      document.addEventListener('keyup', handleKeyUp, { capture: true, once: true })
    }

    document.addEventListener('keydown', handleKeyDown, { capture: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true })
    }
  }, [open, setOpen, floating.refs])

  const prefersReducedMotion = usePrefersReducedMotion()

  const { isMounted, status } = useTransitionStatus(floating.context, {
    duration: isHeadlessTestEnvironment || prefersReducedMotion ? 0 : ANIMATION_DURATION,
  })

  const value = useMemo(
    () => ({
      ...floating,
      open,
      setOpen,
      id,
      role,
      setRole,
      setPlacement,
      setPanelMiddleware,
      dismiss,
      getFloatingProps,
      isMounted,
      status,
    }),
    [
      floating,
      open,
      setOpen,
      id,
      role,
      setRole,
      setPlacement,
      setPanelMiddleware,
      dismiss,
      getFloatingProps,
      isMounted,
      status,
    ],
  )

  return (
    <FloatingNode id={id}>
      <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
    </FloatingNode>
  )
}

export const Root = (props: PopupRootProps) => {
  const tree = useFloatingTree()
  return tree ? (
    <PopupRoot {...props} />
  ) : (
    <FloatingTree>
      <PopupRoot {...props} />
    </FloatingTree>
  )
}

Root.displayName = 'Popup.Root'
