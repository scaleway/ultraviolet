import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type ModalContextValues = {
  openedModals: string[]
  registerModal: (id: string) => void
  unregisterModal: (id: string) => void
  previsousOpenedModales: string[] // This will be usefull for animation, we will trigger when the modal appear but not when it's closing
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
  const [openedModals, setOpenedModals] = useState<string[]>([])
  const [previsousOpenedModales, setPreviousOpenedModales] = useState<string[]>(
    [],
  )

  const registerModal = useCallback((id: string) => {
    setOpenedModals(prev => {
      setPreviousOpenedModales(prev)

      return [...prev, id]
    })
  }, [])

  const unregisterModal = useCallback((id: string) => {
    setOpenedModals(prev => {
      setPreviousOpenedModales(prev)

      return prev.filter(modalId => modalId !== id)
    })
  }, [])

  const value = useMemo(
    () => ({
      openedModals,
      registerModal,
      unregisterModal,
      previsousOpenedModales,
    }),
    [openedModals, registerModal, unregisterModal, previsousOpenedModales],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
