import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useReducer } from 'react'

type ContextProps = {
  expanded: boolean
  setExpanded: () => void
}

export const NavigationContext = createContext<ContextProps>({
  expanded: true,
  setExpanded: () => {},
})

export const useNavigation = () => useContext(NavigationContext)

type NavigationProviderProps = {
  children: ReactNode
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [expanded, setExpanded] = useReducer(state => !state, true)

  const value = useMemo(
    () => ({ expanded, setExpanded }),
    [expanded, setExpanded],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
