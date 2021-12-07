import React, { ReactNode } from 'react'
import { ListColumn, ListOrder, ListRowState } from './types'

type ListContextType<T = Record<string, unknown>> = {
  columns: ListColumn[]
  customLoader?: ReactNode
  data: T[]
  emptyListComponent?: ReactNode
  hasAllSelected: boolean
  hasSelectedItems: boolean
  idKey: string
  isLoading: boolean
  multiselect: boolean
  notSelectableText?: string
  onSort: (columnIndex: number) => void
  page: number
  pageCount: number
  perPage?: number
  rowsState: { [x: string]: ListRowState }
  selectableItems: { [x: string]: boolean }
  selectAll: () => void
  selectedItems: Record<string, unknown>[]
  setRowState: (localIdKey: string, state: ListRowState) => void
  sortedIndex: number
  sortOrder: ListOrder
  unselectAll: () => void
  pageData: T[]
}

const ListContext = React.createContext<ListContextType>({} as ListContextType)

export const useListContext = <
  T = Record<string, unknown>,
>(): ListContextType<T> => React.useContext(ListContext) as ListContextType<T>

export default ListContext
