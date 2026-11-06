'use client'

import { createContext, useContext, useMemo, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'

type MenuContextProps = {
  hideOnClickItem: boolean
  isNested: boolean
  disclosureRef: RefObject<HTMLButtonElement | null>
  menuRef: RefObject<HTMLDivElement | null>
  parentDisclosureRef?: RefObject<HTMLButtonElement | null>
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
  parentDisclosureRef?: RefObject<HTMLButtonElement | null>
  triggerMethod?: 'hover' | 'click'
}

export const MenuProvider = ({ hideOnClickItem = false, children, parentDisclosureRef }: MenuProviderProps) => {
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const parentMenu = useContext(MenuContext)
  const isNested = !!parentMenu // If there is no parent Menu, then parentMenu is undefined (we do not use useMenu which will return an error)

  const values = useMemo(
    () => ({
      disclosureRef,
      hideOnClickItem,
      isNested,
      menuRef,
      parentDisclosureRef: parentDisclosureRef ?? parentMenu?.disclosureRef,
    }),
    [hideOnClickItem, isNested, parentDisclosureRef, parentMenu?.disclosureRef],
  )

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
}
export const DisclosureContext = createContext(false)
export const useDisclosureContext = () => useContext(DisclosureContext)
