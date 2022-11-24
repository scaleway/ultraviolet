import { ReactNode, useMemo } from 'react'
import Placeholder from '../Placeholder'
import Stack from '../Stack'
import { ListColumn } from './types'

type LoadingPlaceholderProps<DataType> = {
  totalRows: number
  columns: ListColumn<DataType>[]
  Cell: ({ children }: { children: ReactNode }) => JSX.Element | null
  Row: ({ id, children }: { id: string; children: ReactNode }) => JSX.Element
}

export const DEFAULT_PLACEHOLDER_ROWS_COUNT = 3

export const LoadingPlaceholder = <DataType,>({
  totalRows,
  columns,
  Cell,
  Row,
}: LoadingPlaceholderProps<DataType>) => {
  const rows = useMemo(() => Array.from(Array(totalRows).keys()), [totalRows])

  return (
    <Stack>
      {rows.map(index => (
        <Row id={index.toString()} key={index.toString()}>
          {columns.map(column => (
            <Cell key={column.label}>
              {column.label ? <Placeholder variant="line" /> : null}
            </Cell>
          ))}
        </Row>
      ))}
    </Stack>
  )
}
