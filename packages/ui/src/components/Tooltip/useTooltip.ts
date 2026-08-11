'use client'
import type { Placement } from '@floating-ui/react'
import {
  offset,
  flip,
  shift,
  arrow,
  useFloating,
  autoUpdate,
  useTransitionStatus,
  useHover,
  safePolygon,
  useFocus,
  useDismiss,
  useInteractions,
} from '@floating-ui/react'
import { usePrefersReducedMotion } from '@ultraviolet/animations'
import { useState, useRef, useCallback } from 'react'
import type { CSSProperties } from 'react'
import type { TooltipPlacement } from '.'
import { ANIMATION_DURATION } from './styles.css'

export type UseTooltipOptions = {
  visible?: boolean
  placement: TooltipPlacement
  delay?: { open?: number; close?: number }
  onOpenChange?: (open: boolean) => void
}

export const useTooltip = ({ visible, placement, delay, onOpenChange }: UseTooltipOptions) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = visible !== undefined
  const open = isControlled ? visible : uncontrolledOpen

  const arrowRef = useRef<HTMLDivElement | null>(null)

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const {
    refs,
    floatingStyles,
    context,
    middlewareData,
    placement: finalPlacement,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift(), arrow({ element: arrowRef, padding: 4 })],
    whileElementsMounted: autoUpdate,
    placement: (placement.replace(/auto-?/, '') || 'top') as Placement,
  })

  // remove the transition when prefers reduced motion, mostly to avoid waiting in tests
  const prefersReducedMotion = usePrefersReducedMotion()

  const { isMounted, status } = useTransitionStatus(context, {
    duration: prefersReducedMotion ? 0 : ANIMATION_DURATION,
  })

  const hover = useHover(context, {
    enabled: !isControlled,
    handleClose: safePolygon(),
    move: false,
    delay,
  })
  const focus = useFocus(context, { enabled: !isControlled })
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss])

  const arrowStyle: CSSProperties = {
    left: middlewareData.arrow?.x,
    top: middlewareData.arrow?.y,
  }

  return {
    refs,
    arrowRef,
    arrowStyle,
    finalPlacement,
    floatingStyles,
    getFloatingProps,
    getReferenceProps,
    isMounted,
    open,
    status,
  }
}
