import type { RefObject } from 'react'
import { createContext } from 'react'

type ContextType = {
  isActive: boolean
  disabled: boolean
  iconRef?: RefObject<HTMLButtonElement | null>
}
export const ChipContext = createContext<ContextType | undefined>(undefined)
