import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { ListColumn, ListOrder, ListRowState } from './types'
import type { ListVariant } from './variants'

type ListContextType<DataType extends Record<string, unknown>> = {
  columns: ListColumn<DataType>[]
  customLoader?: ReactNode
  data: DataType[]
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
  selectedItems: DataType[]
  setRowState: (localIdKey: string, state: ListRowState) => void
  sortedIndex: number
  sortOrder: ListOrder
  unselectAll: () => void
  pageData: DataType[]
  variant: ListVariant
}

// @ts-expect-error Here we volontarily ignore generic, generic hint will be given through the consumer
const ListContext = createContext<ListContextType>({} as ListContextType)

export const useListContext = <
  DataType extends Record<string, unknown>,
>(): ListContextType<DataType> =>
  useContext(ListContext) as ListContextType<DataType>

export default ListContext
