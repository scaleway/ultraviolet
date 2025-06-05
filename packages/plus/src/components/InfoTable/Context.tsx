'use client'

import { createContext } from 'react'

type ContextType = {
  ellipsis?: boolean
}
export const Context = createContext<ContextType>({})
