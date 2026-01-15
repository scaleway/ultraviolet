'use client'

import type { Dispatch, ReactNode, RefObject } from 'react'
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
import type { PinUnPinType } from './types'

type Item = {
  label: string
  active?: boolean
  onToggle?: (toggle: boolean) => void
  onClickPinUnpin?: (parameters: PinUnPinType) => void
}

type Items = Record<string, Item>

type AnimationType = 'simple' | 'complex'

type ContextProps = {
  expanded: boolean
  toggleExpand: (toggle?: boolean) => void
  animation: boolean | 'expand' | 'collapse'
  pinnedFeature?: boolean
  onClickPinUnpin?: (pinned: string[]) => void
  pinItem: (item: string) => string[]
  unpinItem: (item: string) => string[]
  pinnedItems: string[]
  pinLimit: number
  navigationRef: RefObject<HTMLDivElement | null>
  locales: Record<keyof typeof NavigationLocales, string>
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
  ) => string[]
  items: Items
  registerItem: Dispatch<Items>
  setPinnedItems: (value: string[]) => void
  allowNavigationResize: boolean
  setAllowNavigationResize: (value: boolean) => void
  shouldAnimate?: boolean
  animationType?: AnimationType
  showHide?: 'show' | 'hide'
}

// oxlint-disable-next-line react/only-export-components
export const NavigationContext = createContext<ContextProps>({
  allowNavigationResize: true,
  animation: false,
  animationType: 'simple',
  expanded: true,
  items: {},
  locales: NavigationLocales,
  navigationRef: { current: null },
  pinItem: () => [],
  pinLimit: 7,
  pinnedItems: [],
  registerItem: () => {},
  reorderItems: () => [],
  setAllowNavigationResize: () => {},
  setPinnedItems: () => {},
  setWidth: () => {},
  shouldAnimate: true,
  /**
   * This function will trigger the expand/collapse of the navigation and
   * will also trigger the animation
   */
  toggleExpand: () => {},
  unpinItem: () => [],
  width: NAVIGATION_WIDTH,
})

// oxlint-disable-next-line react/only-export-components
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
  locales?: Record<keyof typeof NavigationLocales, string>
  /**
   * You can get the expanded state of the navigation with this function
   */
  onExpandChange?: (expanded: boolean) => void
  /**
   * This boolean will define if the navigation can be resized or not.
   */
  initialAllowNavigationResize?: boolean
  /**
   * Enable or disable the animation of the navigation
   */
  animation?: boolean
  /**
   * type of animation
   */
  animationType?: AnimationType
  showHide?: 'show' | 'hide'
}

export const NavigationProvider = ({
  children,
  pinnedFeature = false,
  initialPinned,
  initialExpanded = true,
  locales = NavigationLocales,
  pinLimit = 7,
  onExpandChange,
  initialWidth = NAVIGATION_WIDTH,
  initialAllowNavigationResize = true,
  animation: shouldAnimate = true,
  animationType,
  showHide,
}: NavigationProviderProps) => {
  const [expanded, setExpanded] = useState(initialExpanded)
  const [pinnedItems, setPinnedItems] = useState<string[]>(initialPinned ?? [])

  const [animation, setAnimation] = useState<boolean | 'expand' | 'collapse'>(
    false,
  )
  const [width, setWidth] = useState<number>(initialWidth)
  const [allowNavigationResize, setAllowNavigationResize] = useState(
    initialAllowNavigationResize,
  )

  // This is used to store the items that are registered in the navigation
  // This way we can retrieve items with their active state in pinned feature
  const [items, registerItem] = useReducer(
    (oldState: Items, newState: Items) => ({
      ...oldState,
      ...newState,
    }),
    {},
  )
  const navigationRef = useRef<HTMLDivElement | null>(null)

  // This function will be triggered when expand/collapse button is clicked
  const toggleExpand = useCallback(
    (toggle?: boolean) => {
      if (typeof toggle !== 'boolean' && toggle !== undefined) {
        throw new Error(
          'toggleExpand only accepts boolean or undefined as parameter. You most likely did <button onClick={toggleExpand}> instead of <button onClick={() => toggleExpand()}>',
        )
      }

      if (toggle !== undefined && toggle === expanded) {
        return
      }

      onExpandChange?.(!expanded)
      if (navigationRef.current) {
        navigationRef.current.style.width = ''
      }

      if (shouldAnimate) {
        setAnimation(expanded ? 'collapse' : 'expand')

        setTimeout(() => {
          setExpanded(toggle !== undefined ? toggle : !expanded)
          setAnimation(false)
        }, ANIMATION_DURATION)
      } else {
        setExpanded(toggle !== undefined ? toggle : !expanded)
      }
    },
    [expanded, onExpandChange, shouldAnimate],
  )

  const pinItem = useCallback(
    (item: string) => {
      const newValue = [...pinnedItems, item]
      setPinnedItems(newValue)

      return newValue
    },
    [pinnedItems],
  )

  const unpinItem = useCallback(
    (item: string) => {
      const newValue = pinnedItems.filter(localItem => localItem !== item)
      setPinnedItems(newValue)

      return newValue
    },
    [pinnedItems],
  )

  const reorderItems = useCallback(
    (initialIndex: number, endIndex: number) => {
      const newPinnedItems = [...pinnedItems]
      const [removed] = newPinnedItems.splice(initialIndex, 1)
      newPinnedItems.splice(endIndex, 0, removed)
      setPinnedItems(newPinnedItems)

      return newPinnedItems
    },
    [pinnedItems],
  )

  const value = useMemo(
    () => ({
      allowNavigationResize,
      animation,
      animationType,
      expanded,
      items,
      locales,
      navigationRef,
      pinItem,
      pinLimit,
      pinnedFeature,
      pinnedItems,
      registerItem,
      reorderItems,
      setAllowNavigationResize,
      setAnimation,
      setPinnedItems,
      setWidth,
      shouldAnimate,
      toggleExpand,
      unpinItem,
      width,
      showHide,
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
      allowNavigationResize,
      shouldAnimate,
      animationType,
      showHide,
    ],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
