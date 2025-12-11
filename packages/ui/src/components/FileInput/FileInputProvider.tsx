import { createContext, useContext } from 'react'

type FileInputContextType =
  | {
      disabled?: boolean
      inputId: string
    }
  | undefined
export const FileInputContext = createContext<FileInputContextType>(undefined)

export const useFileInput = () => {
  const context = useContext(FileInputContext)

  if (!context) {
    throw new Error(
      'FileInputContext should be inside FileInput to work properly.',
    )
  }

  return context
}
