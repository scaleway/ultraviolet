import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'
import type { Checkbox } from '../Checkbox'
import type { ColumnProps } from './types'

type RowState = Record<string, boolean>

export type ListContextValue = {
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
  allRowSelectValue: ComponentProps<typeof Checkbox>['checked']
  checkboxAllHandler: (event: ChangeEvent<HTMLInputElement>) => void
  columns: ColumnProps[]
  inRange: string[]
  refList: RefObject<HTMLInputElement[]>
  selectable: boolean
  selectAll: () => void
  selectedRowIds: RowState
  selectRow: (rowId: string) => void
  unselectAll: () => void
  unselectRow: (rowId: string) => void
}

const ListContext = createContext<ListContextValue | undefined>(undefined)

export type ListProviderProps = {
  children: ReactNode
  autoCollapse: boolean
  selectable: boolean
  expandButton: boolean
  onSelectedChange?: Dispatch<SetStateAction<string[]>>
  columns: ColumnProps[]
}

export const ListProvider = ({
  children,
  autoCollapse,
  selectable,
  expandButton,
  onSelectedChange,
  columns,
}: ListProviderProps) => {
  const [expandedRowIds, setExpandedRowIds] = useState<RowState>({})
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})
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

  useEffect(() => {
    const handlers: (() => void)[] = []
    if (refList.current) {
      const handleClick = (index: number, isShiftPressed: boolean) => {
        if (index !== 0) {
          setLastCheckedIndex(index)
          // Only handle shift click event
          if (isShiftPressed && lastCheckedIndex !== null) {
            const start = Math.min(lastCheckedIndex, index)
            const end = Math.max(lastCheckedIndex, index)

            const newSelectedRowIds = {
              ...selectedRowIds,
            }

            for (let i = start; i <= end; i += 1) {
              const checkbox = refList.current[i]

              if (!checkbox.disabled) {
                if (checkbox.checked) {
                  newSelectedRowIds[checkbox.value] = false
                } else {
                  newSelectedRowIds[checkbox.value] = true
                }
              }
            }
            setSelectedRowIds(newSelectedRowIds)
            if (onSelectedChange) {
              onSelectedChange(
                Object.keys(newSelectedRowIds).filter(
                  row => newSelectedRowIds[row],
                ),
              )
            }
          }
        } else setLastCheckedIndex(null)
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

      const handleOnChange = (index: number, checked: boolean) => {
        const checkbox = refList.current[index]
        const checkboxValue = checkbox.value
        if (checked) selectRow(checkboxValue)
        else unselectRow(checkboxValue)
      }

      refList.current.forEach((checkbox, index) => {
        const clickHandler = (event: MouseEvent) =>
          handleClick(index, event.shiftKey)

        const hoverEnteringHandler = (event: MouseEvent) =>
          handleHover(index, event.shiftKey, false)

        const hoverLeavingHandler = (event: MouseEvent) =>
          handleHover(index, event.shiftKey, true)

        const changeHandler = (event: Event) => {
          handleOnChange(index, (event.target as HTMLInputElement).checked)
        }

        checkbox.addEventListener('click', clickHandler)
        checkbox.addEventListener('change', changeHandler)
        checkbox.addEventListener('mousemove', hoverEnteringHandler)
        checkbox.addEventListener('mouseout', hoverLeavingHandler)

        handlers.push(() => {
          checkbox.removeEventListener('click', clickHandler)
          checkbox.removeEventListener('change', changeHandler)
          checkbox.removeEventListener('mousemove', hoverEnteringHandler)
          checkbox.removeEventListener('mouseout', hoverLeavingHandler)
        })
      })
    }

    return () => {
      handlers.forEach(cleanup => cleanup())
    }
  }, [
    lastCheckedIndex,
    onSelectedChange,
    selectedRowIds,
    unselectRow,
    selectRow,
  ])

  const value = useMemo<ListContextValue>(
    () => ({
      allRowSelectValue,
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
      unselectAll,
      unselectRow,
    }),
    [
      allRowSelectValue,
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
      unselectAll,
      unselectRow,
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
