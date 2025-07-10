import { createContext, useContext, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

type OfferListContextValue = {
  selectable?: 'radio' | 'checkbox'
  radioSelectedRow: string | undefined
  setRadioSelectedRow: Dispatch<SetStateAction<string | undefined>>
  expandable?: boolean
  disabled?: boolean
  loading?: boolean
  onChangeSelect?: (selected: string | string[]) => void
  autoCollapse?: boolean
}
const OfferListContext = createContext<OfferListContextValue | undefined>(
  undefined,
)

type OfferListProviderProps = {
  selectable?: 'radio' | 'checkbox'
  children: ReactNode
  expandable?: boolean
  disabled?: boolean
  loading?: boolean
  onChangeSelect?: (selected: string | string[]) => void
  autoCollapse?: boolean
}

export const OfferListProvider = ({
  selectable,
  children,
  expandable,
  disabled,
  loading,
  onChangeSelect,
  autoCollapse,
}: OfferListProviderProps) => {
  const [radioSelectedRow, setRadioSelectedRow] = useState<string>()

  return (
    <OfferListContext.Provider
      value={{
        selectable,
        radioSelectedRow,
        setRadioSelectedRow,
        expandable,
        disabled,
        loading,
        onChangeSelect,
        autoCollapse,
      }}
    >
      {children}
    </OfferListContext.Provider>
  )
}

export const useOfferListContext = () => {
  const context = useContext(OfferListContext)

  if (!context) {
    throw new Error(
      'useOfferListContext should be used inside a OfferList component',
    )
  }

  return context
}
