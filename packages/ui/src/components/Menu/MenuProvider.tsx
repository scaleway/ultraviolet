'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

type MenuContextProps = {
  hideOnClickItem: boolean
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextProps>({
  hideOnClickItem: false,
  isVisible: false,
  setIsVisible: () => {},
})

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
  const [isVisible, setIsVisible] = useState(visible)

  const values = useMemo(
    () => ({
      hideOnClickItem,
      isVisible,
      setIsVisible,
    }),
    [hideOnClickItem, isVisible],
  )

  return <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
}
