import type {
  ChangeEvent,
  Dispatch,
  FocusEventHandler,
  SetStateAction,
} from 'react'
import { createContext, useContext } from 'react'

export type RefOptionType = { value: string; current: HTMLInputElement }

type SwitchButtonContextValue = {
  localValue?: string
  name?: string
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  size: 'small' | 'medium'
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void
  refOptions: RefOptionType[]
  setRefOptions: Dispatch<SetStateAction<RefOptionType[]>>
  sentiment: 'neutral' | 'primary'
}

export const SwitchButtonContext = createContext<
  SwitchButtonContextValue | undefined
>(undefined)

export const useSwitchButton = () => {
  const context = useContext(SwitchButtonContext)

  if (context === undefined) {
    throw new Error('SwitchButton.Option should be used inside a SwitchButton')
  }

  return context
}
