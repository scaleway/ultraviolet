import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
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
  registerExpandableRow: (rowId: string, expanded?: boolean) => () => void
  expandedRowIds: RowState
  expandRow: (rowId: string) => void
  collapseRow: (rowId: string) => void
  expandButton: boolean // Indicate if list has dedicated column for a CTA which expand row (in addition of expandable behavior)
  // ============ Selectable logic ============
  /**
   * @returns an unregister function
   * */
  registerSelectableRow: (rowId: string) => () => void
  selectedRowIds: RowState
  selectRow: (rowId: string) => void
  unselectRow: (rowId: string) => void
  selectable: boolean
  allRowSelectValue: ComponentProps<typeof Checkbox>['checked']
  selectAll: () => void
  unselectAll: () => void
}

const ListContext = createContext<ListContextValue | undefined>(undefined)

type ListProviderProps = {
  children: ReactNode
  autoCollapse: boolean
  selectable: boolean
  expandButton: boolean
  onSelectedChange?: Dispatch<SetStateAction<string[]>>
}

export const ListProvider = ({
  children,
  autoCollapse,
  selectable,
  expandButton,
  onSelectedChange,
}: ListProviderProps) => {
  const [expandedRowIds, setExpandedRowIds] = useState<RowState>({})
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})

  const registerExpandableRow = useCallback(
    (rowId: string, expanded = false) => {
      setExpandedRowIds(current => ({ ...current, [rowId]: expanded }))

      return () => {
        setExpandedRowIds(current => {
          const { [rowId]: relatedId, ...otherIds } = current

          return otherIds
        })
      }
    },
    [],
  )

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
    const newSelectedRowIds = Object.keys(selectedRowIds).reduce<
      typeof selectedRowIds
    >((acc, rowId) => ({ ...acc, [rowId]: true }), {})
    setSelectedRowIds(newSelectedRowIds)
    if (onSelectedChange) {
      onSelectedChange(
        Object.keys(newSelectedRowIds).filter(row => newSelectedRowIds[row]),
      )
    }
  }, [onSelectedChange, selectedRowIds])

  const unselectAll = useCallback(() => {
    const newSelectedRowIds = Object.keys(selectedRowIds).reduce<
      typeof selectedRowIds
    >((acc, rowId) => ({ ...acc, [rowId]: false }), {})
    setSelectedRowIds(newSelectedRowIds)
    if (onSelectedChange) {
      onSelectedChange(
        Object.keys(newSelectedRowIds).filter(row => newSelectedRowIds[row]),
      )
    }
  }, [onSelectedChange, selectedRowIds])

  const selectRow = useCallback(
    (rowId: string) => {
      const newSelectedRowIds = {
        ...selectedRowIds,
        [rowId]: true,
      }
      setSelectedRowIds(newSelectedRowIds)
      if (onSelectedChange) {
        onSelectedChange(
          Object.keys(newSelectedRowIds).filter(row => newSelectedRowIds[row]),
        )
      }
    },
    [onSelectedChange, selectedRowIds],
  )

  const unselectRow = useCallback(
    (rowId: string) => {
      const newSelectedRowIds = {
        ...selectedRowIds,
        [rowId]: false,
      }
      setSelectedRowIds(newSelectedRowIds)
      if (onSelectedChange) {
        onSelectedChange(
          Object.keys(newSelectedRowIds).filter(row => newSelectedRowIds[row]),
        )
      }
    },
    [onSelectedChange, selectedRowIds],
  )

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
      selectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
      expandButton,
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
      selectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
      expandButton,
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
