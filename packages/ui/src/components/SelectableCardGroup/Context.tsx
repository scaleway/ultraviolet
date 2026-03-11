'use client'

import type { InputHTMLAttributes } from 'react'
import { createContext } from 'react'

type SelectableCardGroupContextType = {
  groupName?: string
  groupValue: string | number | (string | number)[]
  type: 'radio' | 'checkbox'
  showTick: boolean
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

export const SelectableCardGroupContext = createContext<
  SelectableCardGroupContextType | undefined
>(undefined)
