import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const OverlayContext = createContext({ isOverlay: false })
export const useOverlay = () => useContext(OverlayContext)

type OverlayProviderProps = {
  children: ReactNode
  value: { isOverlay: boolean }
}

export const OverlayProvider = ({ children, value }: OverlayProviderProps) => (
  <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
)
