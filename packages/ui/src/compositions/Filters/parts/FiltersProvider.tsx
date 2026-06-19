import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AnyObject } from '../types'
import { useFilters } from './useFilters'
import type { UseFiltersParams, UseFiltersReturn } from './useFilters'

export type FiltersProviderProps<V extends AnyObject = AnyObject> = UseFiltersParams<V> & {
  onDrawerOpen?: (values: V) => void
}

export type FiltersContextValue<V extends AnyObject = AnyObject> = {
  filters: UseFiltersReturn<V>
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const FiltersContext = createContext<FiltersContextValue | null>(null)

export const FiltersProvider = <V extends AnyObject = AnyObject>({
  children,
  defaultValues: initialDefaultValues,
  initialValues,
  onChange,
  onSubmit,
  onDrawerOpen,
}: FiltersProviderProps<V> & { children: ReactNode | ((ctx: FiltersContextValue<V>) => ReactNode) }) => {
  const filters = useFilters({ initialValues, defaultValues: initialDefaultValues, onChange, onSubmit })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true)
    onDrawerOpen?.(filters.values)
  }, [onDrawerOpen, setIsDrawerOpen, filters.values])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
  }, [setIsDrawerOpen])

  const value: FiltersContextValue<V> = useMemo(
    () => ({
      filters,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [filters, isDrawerOpen, openDrawer, closeDrawer],
  )

  return (
    <FiltersContext.Provider value={value as FiltersContextValue}>
      {typeof children === 'function' ? children(value) : children}
    </FiltersContext.Provider>
  )
}

export const useFiltersContext = <V extends AnyObject>(): FiltersContextValue<V> => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider')
  }
  return context as FiltersContextValue<V>
}
