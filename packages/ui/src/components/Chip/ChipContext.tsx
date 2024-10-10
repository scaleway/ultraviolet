import { createContext } from 'react'

export const ChipContext = createContext<{
  isActive: boolean
  disabled: boolean
  /**
   * Set to true when the context is correctly defined
   */
  chipContext: boolean
}>({ isActive: false, disabled: false, chipContext: false })
