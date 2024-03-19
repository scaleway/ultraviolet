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
  animation: boolean | 'expand' | 'collapse'
  setAnimation: (animation: boolean | 'expand' | 'collapse') => void
  pinnedFunctionality?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  pinItem: (item: string) => void
  pinnedItems: string[]
  unpinItem: (item: string) => void
  locales: typeof NavigationLocales
  pinLimit: number
}

export const NavigationContext = createContext<ContextProps>({
  expanded: true,
  setExpanded: () => {},
  animation: false,
  setAnimation: () => {},
  locales: NavigationLocales,
  pinItem: () => {},
  unpinItem: () => {},
  pinnedItems: [],
  pinLimit: 7,
})

export const useNavigation = () => useContext(NavigationContext)

type NavigationProviderProps = {
  children: ReactNode
  pinnedFunctionality?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  initialPinned?: string[]
  initialExpanded: boolean
  locales: typeof NavigationLocales
  pinLimit: number
}

export const NavigationProvider = ({
  children,
  pinnedFunctionality,
  onClickPinUnpin,
  initialPinned,
  initialExpanded,
  locales,
  pinLimit,
}: NavigationProviderProps) => {
  const [expanded, setExpanded] = useReducer(state => !state, initialExpanded)
  const [pinnedItems, setPinnedItems] = useState<string[]>(initialPinned ?? [])
  const [animation, setAnimation] = useState<boolean | 'expand' | 'collapse'>(
    false,
  )

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
      pinLimit,
      animation,
      setAnimation,
    }),
    [
      expanded,
      pinnedItems,
      pinItem,
      unpinItem,
      pinnedFunctionality,
      locales,
      pinLimit,
      animation,
    ],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
