'use client'

import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const OverlayContext = createContext({ isOverlay: false })
export const useOverlay = () => useContext(OverlayContext)

type OverlayContextProviderProps = {
  children: ReactNode
  value: { isOverlay: boolean }
}

export const OverlayContextProvider = ({
  children,
  value,
}: OverlayContextProviderProps) => (
  <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
)
