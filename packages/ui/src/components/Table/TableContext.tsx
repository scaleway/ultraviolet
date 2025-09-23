'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import type { ListContextValue, ListProviderProps } from '../List/ListContext'
import { ListProvider, useListContext } from '../List/ListContext'
import type { ColumnProps } from './types'

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

const Provider = ({
  children,
  bordered,
  stripped,
  columns,
}: TableProviderProps) => {
  const { subscribeHandler, ...listContext } = useListContext()

  useEffect(subscribeHandler, [subscribeHandler])

  const value = useMemo<TableContextValue>(
    () => ({
      ...listContext,
      bordered,
      columns,
      stripped,
      subscribeHandler,
    }),
    [bordered, columns, stripped, subscribeHandler, listContext],
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export const TableProvider = ({
  children,
  bordered,
  stripped,
  columns,
  ...props
}: TableProviderProps) => (
  <ListProvider columns={[]} {...props}>
    <Provider
      bordered={bordered}
      columns={columns}
      stripped={stripped}
      {...props}
    >
      {children}
    </Provider>
  </ListProvider>
)

// oxlint-disable-next-line react/only-export-components
export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext should be used inside a Table component')
  }

  return context
}
