import { createContext, useContext } from 'react'

import type { FilesType } from './types'
import type { Dispatch, RefObject, SetStateAction } from 'react'

type FileInputContextType =
  | {
      disabled?: boolean
      inputRef: RefObject<HTMLInputElement | null>
      files: FilesType[]
      setFiles: Dispatch<SetStateAction<FilesType[]>>
      onChangeFiles?: (files: FilesType[]) => void
      error: boolean
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
