import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

type ContextType =
  | {
      width: string
      maxWidth: string
      minWidth: string
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
      maxWidth: maxWidth ?? 'none',
      minWidth: minWidth ?? 'auto',
      width: width ?? 'auto',
    }}
  >
    {children}
  </ColumnContext.Provider>
)

// oxlint-disable-next-line react/only-export-components
export const useColumnProvider = () => {
  const context = useContext(ColumnContext)

  if (!context) {
    return {
      maxWidth: 'none',
      minWidth: 'auto',
      width: 'auto',
    }
  }

  return context
}
