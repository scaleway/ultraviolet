import { createContext, useContext } from 'react'
import type {
  ChangeEvent,
  Dispatch,
  FocusEventHandler,
  RefObject,
  SetStateAction,
} from 'react'

type SwitchButtonContextValue = {
  localValue?: string
  name?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  size: 'small' | 'medium'
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void
  refOptions: RefObject<HTMLInputElement>[]
  setRefOptions: Dispatch<SetStateAction<RefObject<HTMLInputElement>[]>>
  sentiment: 'neutral' | 'primary'
}

export const SwitchButtonContext = createContext<SwitchButtonContextValue>(
  {} as SwitchButtonContextValue,
)

export const useSwitchButtonContext = () => useContext(SwitchButtonContext)
