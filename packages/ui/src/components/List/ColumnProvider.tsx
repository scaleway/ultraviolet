import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

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
}: ColumnProviderProps) => (
  <ColumnContext.Provider
    value={{
      maxWidth,
      minWidth,
      width,
    }}
  >
    {children}
  </ColumnContext.Provider>
)

// oxlint-disable-next-line react/only-export-components
export const useColumnProvider = () => useContext(ColumnContext)
