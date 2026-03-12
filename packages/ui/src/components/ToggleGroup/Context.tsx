'use client'

import type { InputHTMLAttributes } from 'react'
import { createContext } from 'react'

type ToggleGroupContextType = {
  groupName: string
  groupValues: string[]
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

export const ToggleGroupContext = createContext<
  ToggleGroupContextType | undefined
>(undefined)
