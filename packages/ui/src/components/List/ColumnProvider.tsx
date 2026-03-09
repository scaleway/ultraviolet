import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

type ContextType =
  | {
      width?: string
      maxWidth?: string
      minWidth?: string
    }
  | undefined

type ColumnProviderProps = {
  width?: string
  maxWidth?: string
  minWidth?: string
  children?: ReactNode
}
const ColumnContext = createContext<ContextType>(undefined)

export const ColumnProvider = ({
  width,
  minWidth,
  maxWidth,
  children,
}: ColumnProviderProps) => {
  const value = useMemo(
    () => ({
      maxWidth,
      minWidth,
      width,
    }),
    [maxWidth, minWidth, width],
  )
  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export const useColumnProvider = () => useContext(ColumnContext)
