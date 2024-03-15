import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

export const ValueInput = createContext<{
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
}>({
  searchInput: '',
  setSearchInput: () => {},
})
