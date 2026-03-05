'use client'

import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import {
  clearAllAction,
  resetAction,
  selectAllAction,
  selectGroupAction,
  selectOptionAction,
  updateAction,
} from './reducerFonctions'
import type { DataType, OptionType, ReducerAction, ReducerState } from './types'

type ContextProps = {
  options: DataType
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
  size: 'small' | 'medium' | 'large'
  setSelectedData: Dispatch<ReducerAction>
} & (
  | {
      multiselect: true
      onChange?: (value: string[]) => void
    }
  | {
      multiselect: false
      onChange?: (value: string) => void
    }
)

const SelectInputContext = createContext<ContextProps>({
  displayedOptions: [],
  isDropdownVisible: false,
  multiselect: false as true | false,
  numberOfOptions: 0,
  onChange: () => {},
  onSearch: () => {},
  options: [],
  searchInput: '',
  selectAll: { label: '' },
  selectAllGroup: false,
  selectedData: { allSelected: false, selectedGroups: [], selectedValues: [] },
  setIsDropdownVisible: () => {},
  setSearchInput: () => {},
  setSelectedData: () => {},
  size: 'large',
})

// oxlint-disable-next-line react/only-export-components
export const useSelectInput = () => useContext(SelectInputContext)

type SelectInputProviderProps<IsMulti extends boolean> = {
  options: DataType
  selectAll?: { label: ReactNode; description?: string }
  children: ReactNode
  value?: string | string[]
  size: 'small' | 'medium' | 'large'
  selectAllGroup: boolean
  numberOfOptions: number
  numberOfDisabledOptions: number
  multiselect: IsMulti
  refSelect?: RefObject<HTMLDivElement | null>
  onChange?: IsMulti extends true
    ? (value: string[]) => void
    : (value: string) => void
  onOpen?: () => void
}

export const SelectInputProvider = <T extends boolean>({
  options,
  multiselect,
  selectAll,
  value,
  selectAllGroup,
  numberOfOptions,
  numberOfDisabledOptions,
  children,
  onChange,
  refSelect,
  onOpen,
  size,
}: SelectInputProviderProps<T>) => {
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

  const handleDropDownVisible = useCallback(
    (newValue: boolean) => {
      setIsDropdownVisible(newValue)
      if (newValue) {
        onOpen?.()
      }
      if (!newValue && refSelect) {
        refSelect.current?.focus()
      }
    },
    [refSelect, onOpen],
  )

  const allValues: OptionType[] = useMemo(() => {
    if (!Array.isArray(options)) {
      return Object.keys(options).flatMap((group: string) =>
        options[group].filter(option => !option.disabled),
      )
    }

    return options.filter(option => !option.disabled)
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
      case 'selectAll': {
        return selectAllAction(state, allGroups, allValues)
      }

      case 'selectGroup': {
        return selectGroupAction(
          state,
          action.selectedGroup,
          options,
          numberOfOptions,
          numberOfDisabledOptions,
        )
      }

      case 'selectOption': {
        return selectOptionAction(
          state,
          options,
          numberOfOptions,
          numberOfDisabledOptions,
          multiselect,
          action.clickedOption,
          action.group,
        )
      }

      case 'clearAll': {
        return clearAllAction()
      }

      case 'update': {
        return updateAction(state, options)
      }

      case 'reset': {
        return resetAction(action.selectedGroups, action.selectedValues)
      }

      default: {
        return state
      }
    }
  }

  const [selectedData, setSelectedData] = useReducer(reducer, {
    allSelected: false,
    selectedGroups,
    selectedValues: currentValue,
  })

  useEffect(() => {
    setSelectedData({
      selectedGroups,
      selectedValues: currentValue,
      type: 'reset',
    })
  }, [currentValue, selectedGroups])

  const providerValue = useMemo(
    () =>
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      ({
        displayedOptions,
        isDropdownVisible,
        multiselect,
        numberOfOptions,
        numberOfDisabledOptions,
        onChange,
        onSearch: setDisplayedOptions,
        options,
        searchInput,
        selectAll,
        selectAllGroup,
        selectedData,
        setIsDropdownVisible: handleDropDownVisible,
        setSearchInput,
        setSelectedData,
        size,
      }) as ContextProps,
    [
      isDropdownVisible,
      handleDropDownVisible,
      searchInput,
      options,
      multiselect,
      selectAll,
      selectAllGroup,
      numberOfOptions,
      displayedOptions,
      selectedData,
      size,
      onChange,
      numberOfDisabledOptions,
    ],
  )

  return (
    <SelectInputContext.Provider value={providerValue}>
      {children}
    </SelectInputContext.Provider>
  )
}
