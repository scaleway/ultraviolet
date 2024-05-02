import type { Dispatch, ReactNode, Reducer, RefObject } from 'react'
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

type Item = {
  label: string
  active?: boolean
  onClick?: (toggle?: true | false) => void
}

type Items = Record<string, Item>

type ContextProps = {
  expanded: boolean
  toggleExpand: (toggle?: boolean) => void
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
  /**
   * This function will reorder the pinned items based on the initial index and
   * the end index.
   */
  reorderItems: (
    /**
     * The initial index of the item
     */
    initialIndex: number,
    /**
     * The end index of the item
     */
    endIndex: number,
  ) => void
  items: Items
  registerItem: Dispatch<Items>
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
  reorderItems: () => {},
  items: {},
  registerItem: () => {},
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
  locales?: typeof NavigationLocales
  /**
   * This function is triggered when user click on expand button on the footer
   * of the navigation. This is not triggered when the user resize the navigation
   * and it automatically collapse / expand.
   */
  onClickExpand?: (expanded: boolean) => void
  /**
   * This function is triggered when the user click on the pin/unpin button
   * of an item. To access all pinned item you can use the `useNavigation` hook
   * and access the `pinnedItems` property.
   */
  onClickPinUnpin?: (
    /**
     * The state of the item after the click
     */
    state: 'pin' | 'unpin',
    /**
     * The current items that has been pinned on click
     */
    pinned: string,
  ) => void
}

export const NavigationProvider = ({
  children,
  pinnedFeature = false,
  initialPinned,
  initialExpanded = true,
  locales = NavigationLocales,
  pinLimit = 7,
  onClickExpand,
  initialWidth = NAVIGATION_WIDTH,
  onClickPinUnpin,
}: NavigationProviderProps) => {
  const [expanded, setExpanded] = useState(initialExpanded)
  const [pinnedItems, setPinnedItems] = useState<string[]>(initialPinned ?? [])
  const [animation, setAnimation] = useState<boolean | 'expand' | 'collapse'>(
    false,
  )
  const [width, setWidth] = useState<number>(initialWidth)

  // This is used to store the items that are registered in the navigation
  // This way we can retrieve items with their active state in pinned feature
  const [items, registerItem] = useReducer<Reducer<Items, Items>>(
    (oldState: Items, newState: Items) => ({
      ...oldState,
      ...newState,
    }),
    {},
  )
  const navigationRef = useRef<HTMLDivElement>(null)

  // This function will be triggered when expand/collapse button is clicked
  const toggleExpand = useCallback(
    (toggle?: boolean) => {
      if (typeof toggle !== 'boolean' && toggle !== undefined) {
        throw new Error(
          `toggleExpand only accepts boolean or undefined as parameter. You most likely did <button onClick={toggleExpand}> instead of <button onClick={() => toggleExpand()}>`,
        )
      }

      if (toggle !== undefined && toggle === expanded) {
        return
      }

      onClickExpand?.(!expanded)
      if (navigationRef.current) {
        navigationRef.current.style.width = ''
      }

      setAnimation(expanded ? 'collapse' : 'expand')

      setTimeout(() => {
        setExpanded(toggle !== undefined ? toggle : !expanded)
        setAnimation(false)
      }, ANIMATION_DURATION)
    },
    [expanded, onClickExpand, setAnimation, setExpanded],
  )

  const pinItem = useCallback(
    (item: string) => {
      setPinnedItems([...pinnedItems, item])
      onClickPinUnpin?.('pin', item)
    },
    [onClickPinUnpin, pinnedItems],
  )

  const unpinItem = useCallback(
    (item: string) => {
      setPinnedItems(pinnedItems.filter(localItem => localItem !== item))
      onClickPinUnpin?.('unpin', item)
    },
    [onClickPinUnpin, pinnedItems],
  )

  const reorderItems = useCallback(
    (initialIndex: number, endIndex: number) => {
      const newPinnedItems = [...pinnedItems]
      const [removed] = newPinnedItems.splice(initialIndex, 1)
      newPinnedItems.splice(endIndex, 0, removed)
      setPinnedItems(newPinnedItems)
    },
    [pinnedItems],
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
      reorderItems,
      registerItem,
      items,
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
      reorderItems,
      items,
    ],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
