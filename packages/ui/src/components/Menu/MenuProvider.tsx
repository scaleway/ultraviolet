'use client'

import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

type MenuContextProps = {
  hideOnClickItem: boolean
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  itemsList: RefObject<HTMLButtonElement>[]
  isNested: boolean
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined)

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenu must be used in MenuProvider')

  return context
}

type MenuProviderProps = {
  hideOnClickItem?: boolean
  children: ReactNode
  visible?: boolean
}

export const MenuProvider = ({
  hideOnClickItem = false,
  children,
  visible = false,
}: MenuProviderProps) => {
  const isNested = !!useContext(MenuContext) // If there is no parent Menu, then parentMenu is undefined (we do not use useMenu which will return an error)
  const [isVisible, setIsVisible] = useState(visible)
  const values = useMemo(
    () => ({
      hideOnClickItem,
      isVisible,
      setIsVisible,
      isNested,
      itemsList: [],
    }),
    [hideOnClickItem, isVisible, isNested],
  )

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
}

export const DisclosureContext = createContext(false)
export const useDisclosureContext = () => useContext(DisclosureContext)
