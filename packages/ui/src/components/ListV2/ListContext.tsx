import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type ListContextValue = {
  template: string
  // Expandable logic
  autoClose: boolean
  expandedRowIds: Record<string, boolean>
  setExpandedRowIds: Dispatch<SetStateAction<Record<string, boolean>>>
  // Selectable logic
  selectedIds?: string[]
  setSelectedIds?: (selectedIds: string[]) => void
  selectableIds: Record<string, true>
  setSelectablesIds: Dispatch<SetStateAction<Record<string, true>>>
}

const ListContext = createContext<ListContextValue | undefined>(undefined)

type ListProviderProps = {
  template: string
  children: ReactNode
  onSelectedIdsChange?: (selectedIds: string[]) => void
  selectedIds?: string[]
  autoClose?: boolean
}

export const ListProvider = ({
  template,
  children,
  selectedIds,
  onSelectedIdsChange,
  autoClose = false,
}: ListProviderProps) => {
  // @note: Store row states
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>(
    {},
  )
  const [selectableIds, setSelectablesIds] = useState<Record<string, true>>({})

  useEffect(() => {
    if (!selectedIds || !onSelectedIdsChange) {
      return
    }

    // @note: avoid loop twice (one to check diff, one to rebuild if necessary)
    let diffFound = false
    // @note: Checking that selectedIds are still
    const filteredIds = selectedIds.filter(selectedId => {
      if (!selectableIds[selectedId]) {
        diffFound = true

        return false
      }

      return true
    })
    if (diffFound) {
      onSelectedIdsChange(filteredIds)
    }
  }, [selectableIds, selectedIds, onSelectedIdsChange])

  const value = useMemo<ListContextValue>(
    () => ({
      template,
      autoClose,
      selectedIds,
      setSelectedIds: onSelectedIdsChange,
      selectableIds,
      setSelectablesIds,
      expandedRowIds,
      setExpandedRowIds,
    }),
    [
      template,
      selectedIds,
      autoClose,
      setSelectablesIds,
      onSelectedIdsChange,
      selectableIds,
      expandedRowIds,
      setExpandedRowIds,
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
