import { createContext, useContext } from 'react'

type TabsContextValue = {
  selected?: string | number
  onChange: (nameOrIndex: string | number) => void
}

export const TabsContext = createContext<TabsContextValue>(
  {} as TabsContextValue,
)

export const useTabsContext = () => useContext(TabsContext)
