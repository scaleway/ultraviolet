import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext } from 'react'

export const ValueInput = createContext<{
  searchInput: string | undefined
  setSearchInput: Dispatch<SetStateAction<string>>
}>({
  searchInput: undefined,
  setSearchInput: () => {},
})

export type DataType = Record<
  string,
  {
    value: string
    label: ReactNode
    disabled: boolean
    description?: string
  }[]
>

type HandleChangeProps = {
  search: string
  options: DataType
  onSearch: Dispatch<SetStateAction<DataType>>
  setSearchInput: Dispatch<SetStateAction<string>>
}
export const handleChange = ({
  search,
  options,
  onSearch,
  setSearchInput,
}: HandleChangeProps) => {
  if (search.length > 0) {
    // case insensitive search
    const regex = RegExp(search, 'gi')
    const filteredOptions = { ...options }
    Object.keys(filteredOptions).map((key: string) => {
      filteredOptions[key] = filteredOptions[key].filter(option =>
        option.value.match(regex),
      )

      return null
    })
    onSearch(filteredOptions)
  } else {
    onSearch(options)
  }
  setSearchInput(search)
}

type HandelKeyDownProps = {
  key: string
  search: string | undefined
  setSelectedValues: Dispatch<SetStateAction<(string | undefined)[]>>
}

export const handleKeyDown = ({
  key,
  search,
  setSelectedValues,
}: HandelKeyDownProps) => {
  if (key === 'Enter' || key === ' ') {
    setSelectedValues([search])
  }
}

export const INPUT_SIZE_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
} as const
