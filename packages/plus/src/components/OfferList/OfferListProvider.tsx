import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

type OfferListContextValue = {
  selectable: 'radio' | 'checkbox'
  radioSelectedRow: string | undefined
  setRadioSelectedRow: Dispatch<SetStateAction<string | undefined>>
  expandable?: boolean
  disabled?: boolean
  loading?: boolean
  onChangeSelect?: (selected: string | string[]) => void
  autoCollapse?: boolean
  checkboxSelectedRows: Record<string | number, boolean>
  setCheckboxSelectedRows: Dispatch<
    SetStateAction<Record<string | number, boolean>>
  >
}
const OfferListContext = createContext<OfferListContextValue | undefined>(
  undefined,
)

type OfferListProviderProps = {
  selectable: 'radio' | 'checkbox'
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
  const [checkboxSelectedRows, setCheckboxSelectedRows] = useState<
    Record<string | number, boolean>
  >({})

  return (
    <OfferListContext.Provider
      value={{
        autoCollapse,
        checkboxSelectedRows,
        disabled,
        expandable,
        loading,
        onChangeSelect,
        radioSelectedRow,
        selectable,
        setCheckboxSelectedRows,
        setRadioSelectedRow,
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
