import type { ReactNode, RefObject } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { ANIMATION_DURATION } from './constants'
import NavigationLocales from './locales/en'

type ContextProps = {
  expanded: boolean
  toggleExpand: () => void
  animation: boolean | 'expand' | 'collapse'
  pinnedFeature?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  pinItem: (item: string) => void
  pinnedItems: string[]
  unpinItem: (item: string) => void
  pinLimit: number
  navigationRef: RefObject<HTMLDivElement>
  locales: typeof NavigationLocales
}

export const NavigationContext = createContext<ContextProps>({
  expanded: true,
  toggleExpand: () => {},
  animation: false,
  locales: NavigationLocales,
  pinItem: () => {},
  unpinItem: () => {},
  pinnedItems: [],
  pinLimit: 7,
  navigationRef: { current: null },
})

export const useNavigation = () => useContext(NavigationContext)

type NavigationProviderProps = {
  children: ReactNode
  pinnedFeature?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  initialPinned?: string[]
  initialExpanded: boolean
  locales: typeof NavigationLocales
  pinLimit: number
  onClickExpand?: (expanded: boolean) => void
}

export const NavigationProvider = ({
  children,
  pinnedFeature,
  onClickPinUnpin,
  initialPinned,
  initialExpanded,
  locales,
  pinLimit,
  onClickExpand,
}: NavigationProviderProps) => {
  const [expanded, setExpanded] = useReducer(state => !state, initialExpanded)
  const [pinnedItems, setPinnedItems] = useState<string[]>(initialPinned ?? [])
  const [animation, setAnimation] = useState<boolean | 'expand' | 'collapse'>(
    false,
  )
  const navigationRef = useRef<HTMLDivElement>(null)

  // This function will be triggered when expand/collapse button is clicked
  const toggleExpand = useCallback(() => {
    onClickExpand?.(!expanded)
    if (navigationRef.current) {
      navigationRef.current.style.width = ''
    }

    setAnimation(expanded ? 'collapse' : 'expand')

    setTimeout(() => {
      setExpanded()
      // setFooterHasOverflowStyle(isScrollAtBottom())
      setAnimation(false)
    }, ANIMATION_DURATION)
  }, [expanded, onClickExpand, setAnimation, setExpanded])

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
      toggleExpand,
      pinnedItems,
      pinItem,
      unpinItem,
      pinnedFeature,
      locales,
      pinLimit,
      animation,
      setAnimation,
      navigationRef,
    }),
    [
      expanded,
      pinnedItems,
      pinItem,
      unpinItem,
      pinnedFeature,
      locales,
      pinLimit,
      animation,
      navigationRef,
      toggleExpand,
    ],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
