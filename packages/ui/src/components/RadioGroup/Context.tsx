import { createContext } from 'react'
import type { InputHTMLAttributes } from 'react'

type RadioGroupContextType = {
  groupName?: string
  groupValue: string | number
  error: boolean
  size: 'small' | 'medium'
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required' | 'style'>

export const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined)
