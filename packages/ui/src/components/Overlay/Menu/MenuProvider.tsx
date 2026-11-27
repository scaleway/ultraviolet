'use client'

import { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import type { HTMLProps, ReactNode, RefObject } from 'react'
import { usePopupContext } from '../Popup/v2/context'

type MenuContextProps = {
  hideOnClickItem: boolean
  isNested: boolean
  disclosureRef: RefObject<HTMLButtonElement | null>
  menuRef: RefObject<HTMLDivElement | null>
  closeMenu: () => boolean
  parentCloseMenu?: () => boolean
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined)

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used in MenuProvider')
  }

  return context
}

type MenuProviderProps = {
  hideOnClickItem?: boolean
  children: ReactNode
}

export const MenuProvider = ({ hideOnClickItem = false, children }: MenuProviderProps) => {
  const { setOpen } = usePopupContext()
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const parentMenu = useContext(MenuContext)
  const isNested = !!parentMenu // If there is no parent Menu, then parentMenu is undefined (we do not use useMenu which will return an error)

  const closeMenu = useCallback(() => {
    setOpen(false)
    return true
  }, [setOpen])

  const values = useMemo(
    () => ({
      closeMenu,
      disclosureRef,
      hideOnClickItem,
      isNested,
      menuRef,
      parentCloseMenu: parentMenu?.closeMenu,
    }),
    [closeMenu, hideOnClickItem, isNested, parentMenu?.closeMenu],
  )

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
}
export const DisclosureContext = createContext(false)
export const useDisclosureContext = () => useContext(DisclosureContext)

/**
 * Props returned by Floating UI's `useListNavigation` for each item. Spread on
 * the focusable element of a `Menu.Item` so that list navigation follows the
 * focused item.
 */
export const ListNavigationContext = createContext<HTMLProps<HTMLElement> | undefined>(undefined)
export const useListNavigationProps = () => useContext(ListNavigationContext)
