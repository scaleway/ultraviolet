'use client'

import { createContext } from 'react'

import type { InputHTMLAttributes } from 'react'

type CheckboxGroupContextType = {
  groupName: string
  groupValues: string[]
  error: boolean
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined)
