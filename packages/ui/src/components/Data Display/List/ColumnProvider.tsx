import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

type ContextType =
  | {
      width?: string
      maxWidth?: string
      minWidth?: string
      highlightRow?: boolean
    }
  | undefined

type ColumnProviderProps = {
  width?: string
  maxWidth?: string
  minWidth?: string
  children?: ReactNode
  highlightRow?: boolean
}
const ColumnContext = createContext<ContextType>(undefined)

export const ColumnProvider = ({ width, minWidth, maxWidth, children, highlightRow }: ColumnProviderProps) => {
  const value = useMemo(
    () => ({
      maxWidth,
      minWidth,
      width,
      highlightRow,
    }),
    [maxWidth, minWidth, width, highlightRow],
  )
  return <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
}

export const useColumnProvider = () => useContext(ColumnContext)
