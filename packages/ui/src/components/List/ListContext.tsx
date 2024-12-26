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
  subscribeHandler: () => void
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
  const [isShiftEvent, setIsShiftEvent] = useState(false)
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

  const subscribeHandler = useCallback(() => {
    const handlers: (() => void)[] = []
    if (refList.current) {
      const handleClick = (index: number, isShiftPressed: boolean) => {
        if (index !== 0) {
          // Only handle shift click event, onChangeHandler will controle naturals events
          if (isShiftPressed && lastCheckedIndex !== null) {
            setIsShiftEvent(true)
            const start = Math.min(lastCheckedIndex, index)
            const end = Math.max(lastCheckedIndex, index)

            const newSelectedRowIds = structuredClone(selectedRowIds)

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
            setInRange([])

            if (onSelectedChange) {
              onSelectedChange(
                Object.keys(newSelectedRowIds).filter(
                  row => newSelectedRowIds[row],
                ),
              )
            }
          }
        } else setLastCheckedIndex(null)

        // clean up
        setIsShiftEvent(false)
      }

      const handleHover = (
        index: number,
        isShiftPressed: boolean,
        leaving: boolean,
      ) => {
        if (isShiftPressed && lastCheckedIndex !== null) {
          const start = Math.min(lastCheckedIndex, index)
          const end = Math.max(lastCheckedIndex, index + 1)

          const newRange: string[] = []

          for (let i = start; i < end; i += 1) {
            const checkbox = refList.current[i]
            if (!checkbox.disabled && !leaving) {
              newRange.push(checkbox.value)
            }
          }
          setInRange([...new Set(newRange)])
        }

        if (!lastCheckedIndex) {
          if (index < refList.current.length && index > 0) {
            setLastCheckedIndex(index)
          }
        }
      }

      const handleOnChange = (index: number) => {
        // if it's shiftEvent it's control by clickEvent
        if (!isShiftEvent) {
          const checkbox = refList.current[index]
          if (checkbox.checked) {
            unselectRow(checkbox.value)
          } else {
            selectRow(checkbox.value)
          }
          setLastCheckedIndex(index)
          setInRange([])
        }
      }

      refList.current.forEach((checkbox, index) => {
        const clickHandler = (event: MouseEvent) => {
          handleClick(index, event.shiftKey)
        }

        const mouseEnterHandler = (event: MouseEvent) =>
          handleHover(index, event.shiftKey, false)

        const mouseOutHandler = (event: MouseEvent) =>
          handleHover(index, event.shiftKey, true)

        const changeHandler = () => {
          handleOnChange(index)
        }

        checkbox.addEventListener('click', clickHandler)
        checkbox.addEventListener('change', changeHandler)
        checkbox.addEventListener('mouseenter', mouseEnterHandler)
        checkbox.addEventListener('mouseout', mouseOutHandler)

        handlers.push(() => {
          checkbox.removeEventListener('click', clickHandler)
          checkbox.removeEventListener('change', changeHandler)
          checkbox.removeEventListener('mouseenter', mouseEnterHandler)
          checkbox.removeEventListener('mouseout', mouseOutHandler)
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
    isShiftEvent,
  ])

  useEffect(subscribeHandler, [subscribeHandler])

  const value = useMemo<ListContextValue>(
    () => ({
      allRowSelectValue,
      checkboxAllHandler,
      subscribeHandler,
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
      subscribeHandler,
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
