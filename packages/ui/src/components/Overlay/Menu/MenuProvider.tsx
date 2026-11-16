'use client'

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

type MenuContextProps = {
  hideOnClickItem: boolean
  isNested: boolean
  disclosureRef: RefObject<HTMLButtonElement | null>
  menuRef: RefObject<HTMLDivElement | null>
  closeMenu: () => boolean
  hasNestedMenu: boolean
  parentCloseMenu?: () => boolean
  registerCloseMenu: (closeMenu: () => void) => () => void
  registerNestedMenu: (id: string) => () => void
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
  triggerMethod?: 'hover' | 'click'
}

export const MenuProvider = ({ hideOnClickItem = false, children }: MenuProviderProps) => {
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeMenuRef = useRef<(() => void) | undefined>(undefined)
  const nestedMenuIds = useRef(new Set<string>())
  const nestedMenuId = useId()
  const [hasNestedMenu, setHasNestedMenu] = useState(false)
  const parentMenu = useContext(MenuContext)
  const registerParentNestedMenu = parentMenu?.registerNestedMenu
  const isNested = !!parentMenu // If there is no parent Menu, then parentMenu is undefined (we do not use useMenu which will return an error)

  useEffect(() => registerParentNestedMenu?.(nestedMenuId), [nestedMenuId, registerParentNestedMenu])

  const closeMenu = useCallback(() => {
    const close = closeMenuRef.current
    if (!close) {
      return false
    }

    close()
    return true
  }, [])
  const registerCloseMenu = useCallback((close: () => void) => {
    closeMenuRef.current = close

    return () => {
      if (closeMenuRef.current === close) {
        closeMenuRef.current = undefined
      }
    }
  }, [])
  const registerNestedMenu = useCallback((id: string) => {
    nestedMenuIds.current.add(id)
    setHasNestedMenu(true)

    return () => {
      nestedMenuIds.current.delete(id)
      setHasNestedMenu(nestedMenuIds.current.size > 0)
    }
  }, [])

  const values = useMemo(
    () => ({
      closeMenu,
      disclosureRef,
      hasNestedMenu,
      hideOnClickItem,
      isNested,
      menuRef,
      parentCloseMenu: parentMenu?.closeMenu,
      registerCloseMenu,
      registerNestedMenu,
    }),
    [closeMenu, hasNestedMenu, hideOnClickItem, isNested, parentMenu?.closeMenu, registerCloseMenu, registerNestedMenu],
  )

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
}
export const DisclosureContext = createContext(false)
export const useDisclosureContext = () => useContext(DisclosureContext)
