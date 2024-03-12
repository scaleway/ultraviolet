import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'
import NavigationLocales from './locales/en'

type ContextProps = {
  expanded: boolean
  setExpanded: () => void
  pinnedFunctionality?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  pinItem: (item: string) => void
  pinnedItems: string[]
  unpinItem: (item: string) => void
  locales: typeof NavigationLocales
}

export const NavigationContext = createContext<ContextProps>({
  expanded: true,
  setExpanded: () => {},
  locales: NavigationLocales,
  pinItem: () => {},
  unpinItem: () => {},
  pinnedItems: [],
})

export const useNavigation = () => useContext(NavigationContext)

type NavigationProviderProps = {
  children: ReactNode
  pinnedFunctionality?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  initialPinned?: string[]
  locales: typeof NavigationLocales
}

export const NavigationProvider = ({
  children,
  pinnedFunctionality,
  onClickPinUnpin,
  initialPinned,
  locales,
}: NavigationProviderProps) => {
  const [expanded, setExpanded] = useReducer(state => !state, true)
  const [pinnedItems, setPinnedItems] = useState<string[]>(initialPinned ?? [])

  const pinItem = useCallback(
    (item: string) => {
      setPinnedItems([...pinnedItems, item])

      onClickPinUnpin?.(pinnedItems)
    },
    [onClickPinUnpin, pinnedItems],
  )

  const unpinItem = useCallback(
    (item: string) => {
      setPinnedItems(pinnedItems.filter(localItem => localItem !== item))

      onClickPinUnpin?.(pinnedItems)
    },
    [onClickPinUnpin, pinnedItems],
  )

  const value = useMemo(
    () => ({
      expanded,
      setExpanded,
      pinnedItems,
      pinItem,
      unpinItem,
      pinnedFunctionality,
      locales,
    }),
    [expanded, locales, pinItem, pinnedItems, pinnedFunctionality, unpinItem],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
