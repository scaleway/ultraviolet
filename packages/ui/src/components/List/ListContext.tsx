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
  SetStateAction,
} from 'react'
import type { Checkbox } from '../Checkbox'
import type { ColumnProps } from './types'

type RowState = Record<string | number, boolean>
type MapCheckbox = Map<string | number, HTMLInputElement>

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
  selectAllHandler: (event: ChangeEvent<HTMLInputElement>) => void
  subscribeHandler: () => void
  columns: ColumnProps[]
  inRange: Set<number | string>
  mapCheckbox: MapCheckbox
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

const checkStateOfCheckboxs = (ids: RowState) => {
  const selectableRowCount = Object.keys(ids).length
  const selectableValuesCount = new Set(Object.values(ids))

  if (!selectableRowCount) {
    return false
  }

  // if there is one value it's meant that all checkboxes are only true or false
  if (selectableValuesCount.size === 1) {
    return [...selectableValuesCount][0]
  }

  return 'indeterminate'
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
  const [lastCheckedIndex, setLastCheckedIndex] = useState<
    null | (number | string)
  >(null)
  const [inRange, setInRange] = useState<Set<number | string>>(new Set([]))
  const refList = useRef<MapCheckbox>(new Map())

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

  const allRowSelectValue = useMemo<ComponentProps<typeof Checkbox>['checked']>(
    () => checkStateOfCheckboxs(selectedRowIds),
    [selectedRowIds],
  )
  const selectRows = useCallback(
    (rowIds: string[], state: boolean) => {
      const newSelectedRowIds = rowIds.reduce<RowState>(
        (acc, rowId) => ({ ...acc, [rowId]: state }),
        selectedRowIds,
      )
      setSelectedRowIds(newSelectedRowIds)
      if (onSelectedChange) {
        onSelectedChange(
          Object.keys(newSelectedRowIds).filter(row => newSelectedRowIds[row]),
        )
      }
    },
    [onSelectedChange, selectedRowIds],
  )

  const selectAll = useCallback(() => {
    selectRows(Object.keys(selectedRowIds), true)
  }, [selectRows, selectedRowIds])

  const unselectAll = useCallback(() => {
    selectRows(Object.keys(selectedRowIds), false)
  }, [selectRows, selectedRowIds])

  const selectRow = useCallback(
    (rowId: string) => {
      selectRows([rowId], true)
    },
    [selectRows],
  )

  const unselectRow = useCallback(
    (rowId: string) => {
      selectRows([rowId], false)
    },
    [selectRows],
  )

  const selectAllHandler: ListContextValue['selectAllHandler'] =
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
      const handleHover = (checkbox: HTMLInputElement, event: MouseEvent) => {
        const isShiftPressed = event.shiftKey

        const isHoverActive =
          isShiftPressed && lastCheckedIndex !== null && !checkbox.disabled

        if (isHoverActive) {
          setInRange(prev => new Set([...prev, checkbox.value]))
        }

        if (!lastCheckedIndex && !checkbox.disabled) {
          setLastCheckedIndex(checkbox.value)
        }
      }

      const handleClickRange = (checkbox: HTMLInputElement) => {
        const shouldShiftEvent = inRange.size > 0
        const isClickInsideRange = inRange.has(checkbox.value)

        if (shouldShiftEvent && isClickInsideRange) {
          let checkboxRows: RowState = {}

          refList.current.forEach((value, key) => {
            if (inRange.has(key)) {
              checkboxRows = {
                ...checkboxRows,
                // handle the conflict event ( click and onChange in the same time on the last checkbox click)
                [key]: key === checkbox.value ? !value.checked : value.checked,
              }
            }
          })
          const state = checkStateOfCheckboxs(checkboxRows)
          const checkboxIds = Object.keys(checkboxRows)

          if (state === true) {
            selectRows(checkboxIds, false)
          }
          if ([false, 'indeterminate'].includes(state)) {
            selectRows(checkboxIds, true)
          }
        }

        /**
         * Handle the case when there is multiple selected value during a time, and the user click without shift event
         */
        setTimeout(() => {
          // clean up
          setInRange(new Set([]))
          setLastCheckedIndex(checkbox.value)
        }, 1)
      }

      const handleOnChange = (checkbox: HTMLInputElement) => {
        const shouldHandleEvent = inRange.size === 0

        if (shouldHandleEvent) {
          selectRows([checkbox.value], !checkbox.checked)
        }
        setLastCheckedIndex(checkbox.value)
      }

      refList.current.forEach(checkbox => {
        function clickHandler(this: HTMLInputElement) {
          handleClickRange(this)
        }

        function hoverHandler(this: HTMLInputElement, event: MouseEvent) {
          handleHover(this, event)
        }

        function changeHandler(this: HTMLInputElement) {
          handleOnChange(this)
        }

        checkbox.addEventListener('change', changeHandler)
        checkbox.addEventListener('click', clickHandler)
        checkbox.addEventListener('mouseover', hoverHandler)

        handlers.push(() => {
          checkbox.removeEventListener('change', changeHandler)
          checkbox.removeEventListener('click', clickHandler)
          checkbox.removeEventListener('mouseover', hoverHandler)
        })
      })
    }

    return () => {
      handlers.forEach(cleanup => cleanup())
    }
  }, [inRange, lastCheckedIndex, selectRows])

  useEffect(subscribeHandler, [subscribeHandler])

  const value = useMemo<ListContextValue>(
    () => ({
      allRowSelectValue,
      selectAllHandler,
      subscribeHandler,
      collapseRow,
      columns,
      expandButton,
      expandedRowIds,
      expandRow,
      inRange,
      mapCheckbox: refList.current,
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
      selectAllHandler,
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
