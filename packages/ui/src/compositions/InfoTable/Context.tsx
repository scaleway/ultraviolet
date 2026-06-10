import { createContext } from 'react'

export const InfoTableContext = createContext<{ width?: string; size: 'small' | 'large' }>({ size: 'large' })
