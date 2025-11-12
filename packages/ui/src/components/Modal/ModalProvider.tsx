'use client'

import type { ReactNode, RefObject } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type ModalObject = {
  id: string
  ref: RefObject<HTMLDialogElement | null>
}

type ModalContextValues = {
  openedModals: ModalObject[]
  registerModal: (object: ModalObject) => void
  unregisterModal: (id: string) => void
  previsousOpenedModales: ModalObject[] // This will be usefull for animation, we will trigger when the modal appear but not when it's closing
}

export const ModalContext = createContext<ModalContextValues | undefined>(
  undefined,
)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

type ModalProviderProps = {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openedModals, setOpenedModals] = useState<ModalObject[]>([])
  const [previsousOpenedModales, setPreviousOpenedModales] = useState<
    ModalObject[]
  >([])

  const registerModal = useCallback((object: ModalObject) => {
    setOpenedModals(prev => {
      setPreviousOpenedModales(prev)

      return [...prev, object]
    })
  }, [])

  const unregisterModal = useCallback((id: string) => {
    setOpenedModals(prev => {
      setPreviousOpenedModales(prev)

      return prev.filter(modalId => modalId.id !== id)
    })
  }, [])

  const value = useMemo(
    () => ({
      openedModals,
      previsousOpenedModales,
      registerModal,
      unregisterModal,
    }),
    [openedModals, registerModal, unregisterModal, previsousOpenedModales],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
