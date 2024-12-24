import type { ComponentProps } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Checkbox } from '../Checkbox'
import type { ListContextValue, ListProviderProps } from '../List/ListContext'
import type { ColumnProps } from './types'

type RowState = Record<string, boolean>

// TODO: useContext list and override to avoid duplicate code between context

type TableContextValue = Omit<ListContextValue, 'columns'> & {
  stripped: boolean
  columns: ColumnProps[]
}

const TableContext = createContext<TableContextValue | undefined>(undefined)

export type TableProviderProps = Omit<ListProviderProps, 'columns'> & {
  stripped: boolean
  bordered: boolean
  columns: ColumnProps[]
}

export const TableProvider = ({
  children,
  selectable,
  bordered,
  stripped,
  expandButton,
  autoCollapse,
  columns,
}: TableProviderProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})
  const [expandedRowIds, setExpandedRowIds] = useState<RowState>({})

  const refList = useRef<HTMLInputElement[]>([])

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

  const [lastCheckedIndex, setLastCheckedIndex] = useState<null | number>(null)
  const [inRange, setInRange] = useState<string[]>([])

  const checkboxAllHandler: ListContextValue['checkboxAllHandler'] =
    useCallback(() => {
      // we choose to unselect all when checkbox is in indeterminate state
      if (
        allRowSelectValue &&
        [true, 'indeterminate'].includes(allRowSelectValue)
      ) {
        unselectAll()
      }
      if (allRowSelectValue === false) {
        selectAll()
      }
    }, [allRowSelectValue, unselectAll, selectAll])

  // Multiselect with shift key
  useEffect(() => {
    const handlers: (() => void)[] = []

    if (refList.current) {
      const handleClick = (index: number, isShiftPressed: boolean) => {
        setLastCheckedIndex(index)

        // Only handle shift click event
        if (isShiftPressed && lastCheckedIndex !== null) {
          const start = Math.min(lastCheckedIndex, index)
          const end = Math.max(lastCheckedIndex, index)

          for (let i = start; i <= end; i += 1) {
            const checkbox = refList.current[i]

            if (!checkbox.disabled) {
              if (checkbox.checked) {
                unselectRow(checkbox.value)
              } else {
                selectRow(checkbox.value)
              }
            }
          }
        }
      }

      const handleOnChange = (index: number) => {
        const checkbox = refList.current[index]
        if (checkbox.checked) {
          unselectRow(checkbox.value)
        } else {
          selectRow(checkbox.value)
        }
      }

      const handleHover = (
        index: number,
        isShiftPressed: boolean,
        leaving: boolean,
      ) => {
        const newRange: string[] = []

        if (isShiftPressed && lastCheckedIndex !== null) {
          const start = Math.min(lastCheckedIndex, index)
          const end = Math.max(lastCheckedIndex, index)

          for (let i = start; i < end; i += 1) {
            const checkbox = refList.current[i]
            if (!checkbox.disabled && !leaving) {
              newRange.push(checkbox.value)
            }
          }
        }
        setInRange(newRange)
      }

      refList.current.forEach((checkbox, index) => {
        const clickHandler = (event: MouseEvent) => {
          handleClick(
            Number((event.target as HTMLInputElement).value),
            event.shiftKey,
          )
        }

        const changeHandler = () => {
          handleOnChange(index)
        }
        const hoverEnteringHandler = (event: MouseEvent) =>
          handleHover(index, event.shiftKey, false)

        const hoverLeavingHandler = (event: MouseEvent) =>
          handleHover(index, event.shiftKey, true)

        checkbox.addEventListener('click', clickHandler)
        checkbox.addEventListener('change', changeHandler)
        checkbox.addEventListener('mouseenter', hoverEnteringHandler)
        checkbox.addEventListener('mouseleave', hoverLeavingHandler)

        handlers.push(() => {
          checkbox.removeEventListener('click', clickHandler)
          checkbox.removeEventListener('change', changeHandler)
          checkbox.removeEventListener('mouseenter', hoverEnteringHandler)
          checkbox.removeEventListener('mouseleave', hoverLeavingHandler)
        })
      })
    }

    return () => {
      handlers.forEach(cleanup => cleanup())
    }
  }, [lastCheckedIndex, selectedRowIds, unselectRow, selectRow])

  const value = useMemo<TableContextValue>(
    () => ({
      allRowSelectValue,
      bordered,
      checkboxAllHandler,
      collapseRow,
      columns,
      expandButton,
      expandedRowIds,
      expandRow,
      inRange,
      refList,
      registerExpandableRow,
      registerSelectableRow,
      selectable,
      selectAll,
      selectedRowIds,
      selectRow,
      stripped,
      unselectAll,
      unselectRow,
    }),
    [
      allRowSelectValue,
      bordered,
      checkboxAllHandler,
      collapseRow,
      columns,
      expandButton,
      expandedRowIds,
      expandRow,
      inRange,
      refList,
      registerExpandableRow,
      registerSelectableRow,
      selectable,
      selectAll,
      selectedRowIds,
      selectRow,
      stripped,
      unselectAll,
      unselectRow,
    ],
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext should be used inside a Table component')
  }

  return context
}
