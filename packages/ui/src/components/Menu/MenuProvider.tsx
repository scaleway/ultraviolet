'use client'

import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useRef, useState } from 'react'

type MenuContextProps = {
  hideOnClickItem: boolean
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  isNested: boolean
  disclosureRef: RefObject<HTMLButtonElement | null>
  menuRef: RefObject<HTMLDivElement | null>
  parentDisclosureRef?: RefObject<HTMLButtonElement | null>
  setShouldBeVisible: Dispatch<SetStateAction<boolean | undefined>>
  shouldBeVisible: boolean | undefined
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
  visible?: boolean
  parentDisclosureRef?: RefObject<HTMLButtonElement | null>
  triggerMethod?: 'hover' | 'click'
}

export const MenuProvider = ({
  hideOnClickItem = false,
  children,
  visible = false,
  parentDisclosureRef,
}: MenuProviderProps) => {
  const [isVisible, setIsVisible] = useState(visible)
  const [shouldBeVisible, setShouldBeVisible] = useState<boolean | undefined>(
    undefined,
  )
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const parentMenu = useContext(MenuContext)
  const isNested = !!parentMenu // If there is no parent Menu, then parentMenu is undefined (we do not use useMenu which will return an error)

  const values = useMemo(
    () => ({
      disclosureRef,
      hideOnClickItem,
      isNested,
      isVisible,
      menuRef,
      parentDisclosureRef: parentDisclosureRef ?? parentMenu?.disclosureRef,
      setIsVisible,
      setShouldBeVisible,
      shouldBeVisible,
    }),
    [
      hideOnClickItem,
      isVisible,
      isNested,
      parentDisclosureRef,
      parentMenu?.disclosureRef,
      shouldBeVisible,
      setShouldBeVisible,
    ],
  )

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
}

export const DisclosureContext = createContext(false)
export const useDisclosureContext = () => useContext(DisclosureContext)
