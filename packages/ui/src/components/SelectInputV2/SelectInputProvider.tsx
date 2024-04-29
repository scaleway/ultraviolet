import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { DataType, OptionType, ReducerAction, ReducerState } from './types'

type ContextProps = {
  options: DataType
  multiselect: boolean
  onSearch: Dispatch<SetStateAction<DataType>>
  isDropdownVisible: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  selectAll?: { label: ReactNode; description?: string }
  selectAllGroup: boolean
  numberOfOptions: number
  displayedOptions: DataType
  selectedData: ReducerState
  setSelectedData: Dispatch<ReducerAction>
}

const SelectInputContext = createContext<ContextProps>({
  options: [],
  multiselect: false,
  onSearch: () => {},
  isDropdownVisible: false,
  setIsDropdownVisible: () => {},
  searchInput: '',
  setSearchInput: () => {},
  selectAll: { label: '' },
  selectAllGroup: false,
  numberOfOptions: 0,
  displayedOptions: [],
  selectedData: { allSelected: false, selectedGroups: [], selectedValues: [] },
  setSelectedData: () => {},
})

export const useSelectInput = () => useContext(SelectInputContext)

type SelectInputProviderProps = {
  options: DataType
  multiselect: boolean
  selectAll?: { label: ReactNode; description?: string }
  children: ReactNode
  value?: string | string[]
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
  const currentValue = useMemo(() => {
    if (value) {
      if (Array.isArray(value)) {
        return value
      }

      return [value]
    }

    return []
  }, [value])

  const selectedGroups = useMemo(() => {
    if (Array.isArray(options)) {
      return []
    }

    return Object.keys(options).filter(group =>
      options[group].every(groupOption =>
        currentValue.includes(groupOption.value),
      ),
    )
  }, [currentValue, options])

  const [displayedOptions, setDisplayedOptions] = useState(options)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const allValues: OptionType[] = useMemo(() => {
    if (!Array.isArray(options)) {
      return Object.keys(options)
        .map((group: string) =>
          options[group].filter(option => !option.disabled),
        )
        .flat()
    }

    return options
  }, [options])

  const allGroups: string[] = useMemo(() => {
    if (!Array.isArray(options)) {
      return Object.keys(options)
    }

    return []
  }, [options])

  const reducer = (
    state: ReducerState,
    action: ReducerAction,
  ): ReducerState => {
    switch (action.type) {
      case 'selectAll':
        if (state.allSelected) {
          return { selectedValues: [], allSelected: false, selectedGroups: [] }
        }

        return {
          selectedValues: allValues.map(option => option.value),
          allSelected: true,
          selectedGroups: allGroups,
        }

      case 'selectGroup':
        if (!Array.isArray(options)) {
          if (state.selectedGroups.includes(action.selectedGroup)) {
            return {
              selectedValues: [...state.selectedValues].filter(
                selectedValue =>
                  !options[action.selectedGroup].find(
                    option => option.value === selectedValue,
                  ),
              ),
              allSelected: false,
              selectedGroups: state.selectedGroups.filter(
                selectedGroup => selectedGroup !== action.selectedGroup,
              ),
            }
          }

          const newSelectedValues = [...state.selectedValues]
          options[action.selectedGroup].map(option =>
            newSelectedValues.find(aValue => aValue === option.value) ||
            option.disabled
              ? null
              : newSelectedValues.push(option.value),
          )

          return {
            selectedValues: newSelectedValues,
            allSelected: newSelectedValues.length === numberOfOptions,
            selectedGroups: [...state.selectedGroups, action.selectedGroup],
          }
        }

        return state

      case 'selectOption':
        if (multiselect) {
          if (state.selectedValues.includes(action.clickedOption.value)) {
            return {
              selectedValues: state.selectedValues.filter(
                val => val !== action.clickedOption.value,
              ),
              allSelected: false,
              selectedGroups:
                action.group && state.selectedGroups.includes(action.group)
                  ? state.selectedGroups.filter(
                      selectedGroup => selectedGroup !== action.group,
                    )
                  : [],
            }
          }

          return {
            selectedValues: [
              ...state.selectedValues,
              action.clickedOption.value,
            ],
            allSelected: state.selectedValues.length + 1 === numberOfOptions,
            selectedGroups:
              !Array.isArray(options) &&
              action.group &&
              options[action.group].every(
                option =>
                  [
                    ...state.selectedValues,
                    action.clickedOption.value,
                  ].includes(option.value) || option.disabled,
              )
                ? [...state.selectedGroups, action.group]
                : state.selectedGroups,
          }
        }

        return {
          selectedValues: [action.clickedOption.value],
          allSelected: false,
          selectedGroups: state.selectedGroups,
        }

      case 'clearAll':
        return { selectedGroups: [], selectedValues: [], allSelected: false }

      case 'update': // update the selected values to only keep non-disabled one
        return {
          selectedGroups: state.selectedGroups,
          allSelected: state.allSelected,
          selectedValues: state.selectedValues.filter(selectedValue => {
            if (!Array.isArray(options)) {
              return Object.keys(options).some(group =>
                options[group].some(
                  option => option.value === selectedValue && !option.disabled,
                ),
              )
            }

            return options.some(
              option => option.value === selectedValue && !option.disabled,
            )
          }),
        }
      default:
        return state
    }
  }

  const [selectedData, setSelectedData] = useReducer(reducer, {
    selectedValues: currentValue,
    allSelected: false,
    selectedGroups,
  })
  const providerValue = useMemo(
    () => ({
      onSearch: setDisplayedOptions,
      isDropdownVisible,
      setIsDropdownVisible,
      searchInput,
      setSearchInput,
      options,
      multiselect,
      selectAll,
      selectAllGroup,
      numberOfOptions,
      displayedOptions,
      selectedData,
      setSelectedData,
    }),
    [
      displayedOptions,
      isDropdownVisible,
      multiselect,
      numberOfOptions,
      options,
      searchInput,
      selectAll,
      selectAllGroup,
      selectedData,
    ],
  )

  return (
    <SelectInputContext.Provider value={providerValue}>
      {children}
    </SelectInputContext.Provider>
  )
}
