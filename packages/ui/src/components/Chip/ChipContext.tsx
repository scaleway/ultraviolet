'use client'

import { createContext } from 'react'

import type { RefObject } from 'react'

type ContextType = {
  isActive: boolean
  disabled: boolean
  iconRef?: RefObject<HTMLDivElement | HTMLButtonElement | null>
}
export const ChipContext = createContext<ContextType | undefined>(undefined)
