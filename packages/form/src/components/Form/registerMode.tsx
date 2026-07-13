import { createContext, useContext } from 'react'

export const FormRegisterModeContext = createContext<boolean>(false)

export const useFormRegisterMode = () => {
  const context = useContext(FormRegisterModeContext)

  if (context === undefined) {
    throw new Error('useFormRegisterMode must be used within a FormRegisterModeContext.Provider ')
  }

  return context
}
