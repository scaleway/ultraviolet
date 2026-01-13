'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { ActionBar } from '../ActionBar'
import { Stack } from '../Stack'
import { useListContext } from './ListContext'

type SelectBarProps<T> = {
  className?: string
  children: (p: { selectedItems: T[]; unselectAll: () => void }) => ReactNode
  data: T[]
  /**
   * The idKey of each data entry
   */
  idKey: keyof T
}

export const SelectBar = <T,>({
  children,
  data,
  idKey,
  className,
}: SelectBarProps<T>) => {
  const { selectedRowIds, unselectAll } = useListContext()

  const selectedItems = useMemo(
    () => data.filter(item => selectedRowIds[item[idKey] as string]),
    [data, idKey, selectedRowIds],
  )

  if (selectedItems.length === 0) {
    return null
  }

  return (
    <ActionBar className={className}>
      <Stack
        alignItems="center"
        direction="row"
        flex="1 1 auto"
        justifyContent="space-between"
        width="100%"
      >
        {children({
          selectedItems,
          unselectAll,
        })}
      </Stack>
    </ActionBar>
  )
}
