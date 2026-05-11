'use client'

import { createContext, useMemo } from 'react'
import type { ReactNode } from 'react'

// Create the context with a default value
export const ItemContext = createContext(false)

type ItemProviderProps = {
  children: ReactNode
}

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const value = useMemo(() => true, [])

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
}
