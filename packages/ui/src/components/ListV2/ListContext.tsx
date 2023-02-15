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

type ListContextValue = {
  // ============ Expandable logic ============
  /**
   * @returns an unregister function
   * */
  registerExpandableRow: (rowId: string) => () => void
  expandedRowIds: RowState
  expandRow: (rowId: string) => void
  collapseRow: (rowId: string) => void
  // ============ Selectable logic ============
  /**
   * @returns an unregister function
   * */
  registerSelectableRow: (rowId: string) => () => void
  selectedRowIds: RowState
  selectRow: (rowId: string) => void
  unselectRow: (rowId: string) => void
  areRowSelectable: boolean
  allRowSelectValue: ComponentProps<typeof Checkbox>['checked']
  selectAll: () => void
  unselectAll: () => void
}

const ListContext = createContext<ListContextValue | undefined>(undefined)

type ListProviderProps = {
  children: ReactNode
  autoCollapse: boolean
  areRowSelectable: boolean
}

export const ListProvider = ({
  children,
  autoCollapse,
  areRowSelectable,
}: ListProviderProps) => {
  const [expandedRowIds, setExpandedRowIds] = useState<RowState>({})
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})

  const registerExpandableRow = useCallback((rowId: string) => {
    setExpandedRowIds(current => ({ ...current, [rowId]: false }))

    return () => {
      setExpandedRowIds(current => {
        const { [rowId]: relatedId, ...otherIds } = current

        return otherIds
      })
    }
  }, [])

  const registerSelectableRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({ ...current, [rowId]: false }))

    return () => {
      setSelectedRowIds(current => {
        const { [rowId]: relatedId, ...otherIds } = current

        return otherIds
      })
    }
  }, [])

  const expandRow = useCallback(
    (rowId: string) => {
      setExpandedRowIds(current => ({
        ...(autoCollapse ? {} : current),
        [rowId]: true,
      }))
    },
    [autoCollapse],
  )

  const collapseRow = useCallback((rowId: string) => {
    setExpandedRowIds(current => ({
      ...current,
      [rowId]: false,
    }))
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

  const value = useMemo<ListContextValue>(
    () => ({
      registerExpandableRow,
      expandedRowIds,
      expandRow,
      collapseRow,
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
      areRowSelectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
    }),
    [
      registerExpandableRow,
      expandedRowIds,
      expandRow,
      collapseRow,
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
      areRowSelectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
    ],
  )

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export const useListContext = () => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useListContext should be used inside a List component')
  }

  return context
}
