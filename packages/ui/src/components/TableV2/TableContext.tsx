import type { ComponentProps, ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { Checkbox } from '../Checkbox'

type RowState = Record<string, boolean>

type TableContextValue = {
  separated: boolean
  stripped: boolean
  // ============ Selectable logic ============
  selectedRowIds: RowState
  selectRow: (rowId: string) => void
  unselectRow: (rowId: string) => void
  areRowSelectable: boolean
  allRowSelectValue: ComponentProps<typeof Checkbox>['checked']
  selectAll: () => void
  unselectAll: () => void
  /**
   * @returns an unregister function
   * */
  registerSelectableRow: (rowId: string) => () => void
}

const TableContext = createContext<TableContextValue | undefined>(undefined)

type TableProviderProps = {
  children: ReactNode
  areRowSelectable: boolean
  separated: boolean
  stripped: boolean
}

export const TableProvider = ({
  children,
  areRowSelectable,
  separated,
  stripped,
}: TableProviderProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})

  const registerSelectableRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({ ...current, [rowId]: false }))

    return () => {
      setSelectedRowIds(current => {
        const { [rowId]: relatedId, ...otherIds } = current

        return otherIds
      })
    }
  }, [])

  const allRowSelectValue = useMemo<
    ComponentProps<typeof Checkbox>['checked']
  >(() => {
    const selectableRowCount = Object.keys(selectedRowIds).length
    if (!selectableRowCount) {
      return false
    }

    const selectedRowCount = Object.values(selectedRowIds).reduce<number>(
      (acc, isSelected) => acc + (isSelected ? 1 : 0),
      0,
    )
    if (selectedRowCount === 0) {
      return false
    }
    if (selectableRowCount === selectedRowCount) {
      return true
    }

    return 'indeterminate'
  }, [selectedRowIds])

  const selectAll = useCallback(() => {
    setSelectedRowIds(current =>
      Object.keys(current).reduce<typeof selectedRowIds>(
        (acc, rowId) => ({ ...acc, [rowId]: true }),
        {},
      ),
    )
  }, [])

  const unselectAll = useCallback(() => {
    setSelectedRowIds(current =>
      Object.keys(current).reduce<typeof selectedRowIds>(
        (acc, rowId) => ({ ...acc, [rowId]: false }),
        {},
      ),
    )
  }, [])

  const selectRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({
      ...current,
      [rowId]: true,
    }))
  }, [])

  const unselectRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({
      ...current,
      [rowId]: false,
    }))
  }, [])

  const value = useMemo<TableContextValue>(
    () => ({
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
      areRowSelectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
      separated,
      stripped,
    }),
    [
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
      areRowSelectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
      separated,
      stripped,
    ],
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext should be used inside a TableV2 component')
  }

  return context
}
