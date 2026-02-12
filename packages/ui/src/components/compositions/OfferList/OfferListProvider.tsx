import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext } from 'react'

type OfferListContextValue = {
  selectable: 'radio' | 'checkbox'
  radioSelectedRow: string | undefined
  setRadioSelectedRow: Dispatch<SetStateAction<string | undefined>>
  expandable?: boolean
  disabled?: boolean
  loading?: boolean
  onChangeSelect?: (selected: string | string[]) => void
  autoCollapse?: boolean
  checkboxSelectedRows: string[]
  setCheckboxSelectedRows: Dispatch<SetStateAction<string[]>>
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
  radioSelectedRow: string | undefined
  setRadioSelectedRow: Dispatch<SetStateAction<string | undefined>>
  checkboxSelectedRows: string[]
  setCheckboxSelectedRows: Dispatch<SetStateAction<string[]>>
}

export const OfferListProvider = ({
  selectable,
  children,
  expandable,
  disabled,
  loading,
  onChangeSelect,
  autoCollapse,
  radioSelectedRow,
  setRadioSelectedRow,
  checkboxSelectedRows,
  setCheckboxSelectedRows,
}: OfferListProviderProps) => (
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

// oxlint-disable-next-line react/only-export-components
export const useOfferListContext = () => {
  const context = useContext(OfferListContext)

  if (!context) {
    throw new Error(
      'useOfferListContext should be used inside a OfferList component',
    )
  }

  return context
}
