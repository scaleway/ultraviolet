import { createContext, useContext, useMemo, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { DataType, OptionType } from './types'

type ContextProps = {
  options: DataType
  multiselect: boolean
  onSearch: Dispatch<SetStateAction<DataType>>
  selectedValues: OptionType[]
  setSelectedValues: Dispatch<SetStateAction<OptionType[]>>
  isDropdownVisible: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  setAllSelected: Dispatch<SetStateAction<boolean>>
  setSelectedGroups: Dispatch<SetStateAction<string[]>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  selectAll?: { label: ReactNode; description?: string }
  allSelected: boolean
  selectAllGroup?: boolean
  selectedGroups: string[]
  numberOfOptions: number
  displayedOptions: DataType
}

const SelectInputContext = createContext<ContextProps>({
  options: [],
  multiselect: false,
  onSearch: () => {},
  selectedValues: [],
  setSelectedValues: () => {},
  isDropdownVisible: false,
  setIsDropdownVisible: () => {},
  setAllSelected: () => {},
  setSelectedGroups: () => {},
  searchInput: '',
  setSearchInput: () => {},
  selectAll: { label: '' },
  allSelected: false,
  selectAllGroup: false,
  selectedGroups: [],
  numberOfOptions: 0,
  displayedOptions: [],
})

export const useSelectInput = () => useContext(SelectInputContext)

type SelectInputProviderProps = {
  options: DataType
  multiselect: boolean
  selectAll?: { label: ReactNode; description?: string }
  children: ReactNode
  value?: OptionType
  selectAllGroup: boolean
  numberOfOptions: number
}
export const SelectInputProvider = ({
  options,
  multiselect,
  selectAll,
  value,
  selectAllGroup,
  numberOfOptions,
  children,
}: SelectInputProviderProps) => {
  const defaultValue = value ? [value] : []
  const [selectedValues, setSelectedValues] =
    useState<OptionType[]>(defaultValue)
  const [displayedOptions, setDisplayedOptions] = useState(options)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [allSelected, setAllSelected] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])

  const providerValue = useMemo(
    () => ({
      onSearch: setDisplayedOptions,
      selectedValues,
      setSelectedValues,
      isDropdownVisible,
      setIsDropdownVisible,
      setAllSelected,
      setSelectedGroups,
      searchInput,
      setSearchInput,
      options,
      multiselect,
      selectAll,
      allSelected,
      selectAllGroup,
      selectedGroups,
      numberOfOptions,
      displayedOptions,
    }),
    [
      allSelected,
      displayedOptions,
      isDropdownVisible,
      multiselect,
      numberOfOptions,
      options,
      searchInput,
      selectAll,
      selectAllGroup,
      selectedGroups,
      selectedValues,
    ],
  )

  return (
    <SelectInputContext.Provider value={providerValue}>
      {children}
    </SelectInputContext.Provider>
  )
}
