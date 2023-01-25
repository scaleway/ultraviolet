import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Skeleton } from '../Skeleton'
import { Stack } from '../Stack'
import type { ListColumn } from './types'

type LoadingSkeletonProps<DataType> = {
  totalRows: number
  columns: ListColumn<DataType>[]
  Cell: ({ children }: { children: ReactNode }) => JSX.Element | null
  Row: ({ id, children }: { id: string; children: ReactNode }) => JSX.Element
}

export const DEFAULT_PLACEHOLDER_ROWS_COUNT = 3

export const LoadingSkeleton = <DataType,>({
  totalRows,
  columns,
  Cell,
  Row,
}: LoadingSkeletonProps<DataType>) => {
  const rows = useMemo(() => Array.from(Array(totalRows).keys()), [totalRows])

  return (
    <Stack>
      {rows.map(index => (
        <Row id={index.toString()} key={index.toString()}>
          {columns.map(column => (
            <Cell key={column.label}>
              {column.label ? <Skeleton variant="line" /> : null}
            </Cell>
          ))}
        </Row>
      ))}
    </Stack>
  )
}
