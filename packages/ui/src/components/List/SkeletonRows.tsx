'use client'

import { cn } from '@ultraviolet/utils'
import { Skeleton } from '../Skeleton'
import { Cell } from './Cell'
import { ColumnProvider } from './ColumnProvider'
import { useListContext } from './ListContext'
import { listLoadingRow, listRow, listSkeleton } from './styles.css'

type ListLoadingSkeletonProps = {
  selectable: boolean
  rows: number
  cols: number
}

export const SkeletonRows = ({
  selectable,
  rows,
  cols,
}: ListLoadingSkeletonProps) => {
  const rowArray = Array.from({ length: rows }, (_, index) => index)
  const colArray = Array.from({ length: cols }, (_, index) => index)
  const { columns } = useListContext()

  return (
    <>
      {rowArray.map(index => (
        <tr
          className={cn(listRow({ sentiment: 'neutral' }), listLoadingRow)}
          id={`skeleton-${index}`}
          key={index}
          role="row"
        >
          {selectable ? <td /> : null}
          {colArray.map(columnIndex => (
            <ColumnProvider
              key={columnIndex}
              maxWidth={columns[columnIndex].maxWidth}
              minWidth={columns[columnIndex].minWidth}
              width={columns[columnIndex].width}
            >
              <Cell>
                <Skeleton className={listSkeleton} variant="line" />
              </Cell>
            </ColumnProvider>
          ))}
        </tr>
      ))}
    </>
  )
}
