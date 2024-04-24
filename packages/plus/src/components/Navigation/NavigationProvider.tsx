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
import { ANIMATION_DURATION, NAVIGATION_WIDTH } from './constants'
import NavigationLocales from './locales/en'

type ContextProps = {
  expanded: boolean
  toggleExpand: () => void
  animation: boolean | 'expand' | 'collapse'
  pinnedFeature?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  pinItem: (item: string) => void
  unpinItem: (item: string) => void
  pinnedItems: string[]
  pinLimit: number
  navigationRef: RefObject<HTMLDivElement>
  locales: typeof NavigationLocales
  width: number
  setWidth: (width: number) => void
}

export const NavigationContext = createContext<ContextProps>({
  expanded: true,
  /**
   * This function will trigger the expand/collapse of the navigation and
   * will also trigger the animation
   */
  toggleExpand: () => {},
  animation: false,
  locales: NavigationLocales,
  pinItem: () => {},
  unpinItem: () => {},
  pinnedItems: [],
  pinLimit: 7,
  navigationRef: { current: null },
  width: NAVIGATION_WIDTH,
  setWidth: () => {},
})

export const useNavigation = () => useContext(NavigationContext)

type NavigationProviderProps = {
  children: ReactNode
  initialWidth?: number
  /**
   * This enable / disable the pinned feature of the navigation
   * Pinned allows the use to pin (or favorite) some items in the navigation
   */
  pinnedFeature?: boolean
  /**
   * This define how many items can be pinned at the same time.
   * If you want to disable the limit just set `Infinity` to this prop
   */
  pinLimit?: number
  /**
   * The initial pinned items. This should be an array of labels you've set on
   * your `<Navigation.Item>`
   */
  initialPinned?: string[]
  /**
   * The initial expanded state of the navigation. If set to true the
   * navigation will be expanded by default otherwise it will be collapsed
   */
  initialExpanded?: boolean
  /**
   * This function is triggered when the user click on the pin/unpin button
   * of an item
   */
  onClickPinUnpin?: (pinned: string[]) => void
  locales?: typeof NavigationLocales
  /**
   * This function is triggered when user click on expand button on the footer
   * of the navigation. This is not triggered when the user resize the navigation
   * and it automatically collapse / expand.
   */
  onClickExpand?: (expanded: boolean) => void
}

export const NavigationProvider = ({
  children,
  pinnedFeature = false,
  onClickPinUnpin,
  initialPinned,
  initialExpanded = true,
  locales = NavigationLocales,
  pinLimit = 7,
  onClickExpand,
  initialWidth = NAVIGATION_WIDTH,
}: NavigationProviderProps) => {
  const [expanded, setExpanded] = useReducer(state => !state, initialExpanded)
  const [pinnedItems, setPinnedItems] = useState<string[]>(initialPinned ?? [])
  const [animation, setAnimation] = useState<boolean | 'expand' | 'collapse'>(
    false,
  )
  const [width, setWidth] = useState<number>(initialWidth)
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
      width,
      setWidth,
    }),
    [
      expanded,
      toggleExpand,
      pinnedItems,
      pinItem,
      unpinItem,
      pinnedFeature,
      locales,
      pinLimit,
      animation,
      width,
    ],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
