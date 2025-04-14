'use client'

import { createContext, useContext } from 'react'
import type { DialogSentiment } from './constants'

export type DialogContextType = {
  sentiment: DialogSentiment
}
export const DialogContext = createContext<DialogContextType | undefined>(
  undefined,
)

export const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('Dialog context can only be used inside a Dialog component')
  }

  return context
}
