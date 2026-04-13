import { createContext, useContext } from 'react'

type TabsContextValue = {
  selected?: string | number
  onChange: (nameOrIndex: string | number) => void
}

export const TabsContext = createContext({} as TabsContextValue)

export const useTabsContext = () => useContext(TabsContext)
