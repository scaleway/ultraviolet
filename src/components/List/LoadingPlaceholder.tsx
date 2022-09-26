import { ReactNode, useMemo } from 'react'
import Placeholder from '../Placeholder'
import { ListColumn } from './types'

type LoadingPlaceholderProps<DataType> = {
  totalRows: number
  columns: ListColumn<DataType>[]
  Cell: ({ children }: { children: ReactNode }) => JSX.Element | null
  Row: ({ id, children }: { id: string; children: ReactNode }) => JSX.Element
}

export const LoadingPlaceholder = <DataType,>({
  totalRows,
  columns,
  Cell,
  Row,
}: LoadingPlaceholderProps<DataType>) => {
  const rows = useMemo(() => Array.from({ length: totalRows }), [totalRows])

  return (
    <>
      {rows.map((_, index) => (
        <Row id={index.toString()}>
          {columns.map(column => (
            <Cell>{column.label ? <Placeholder variant="line" /> : null}</Cell>
          ))}
        </Row>
      ))}
    </>
  )
}
