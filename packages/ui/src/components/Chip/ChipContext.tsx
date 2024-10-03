import { createContext } from 'react'

export const ChipContext = createContext<{
  isActive: boolean
  disabled: boolean
}>({ isActive: false, disabled: false })
