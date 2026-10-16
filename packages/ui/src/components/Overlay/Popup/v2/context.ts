'use client'
import type { ElementProps, Middleware, Placement, UseFloatingReturn } from '@floating-ui/react'
import { createContext, useContext } from 'react'

export type PopupRole = 'dialog' | 'menu' | 'listbox'

export type PopupTransitionStatus = 'unmounted' | 'initial' | 'open' | 'close'

export type PopupContextValue = UseFloatingReturn & {
  open: boolean
  id: string
  role: PopupRole
  setRole: (role: PopupRole) => void
  setPlacement: (placement: Placement) => void
  setPanelMiddleware: (middleware: Middleware[]) => void
  isMounted: boolean
  status: PopupTransitionStatus
  dismiss: ElementProps
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
}

export const PopupContext = createContext<PopupContextValue | null>(null)

export const usePopupContext = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('Popup component must be used within <Popup.Root>')
  }

  return context
}
