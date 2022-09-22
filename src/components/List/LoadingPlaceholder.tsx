import { useMemo } from 'react'
import Placeholder from '../Placeholder'
import { ListColumn } from './types'
import { Cell, Row } from './variantProduct'

type LoadingPlaceholderProps<DataType> = {
  totalRows: number
  columns: ListColumn<DataType>[]
}

export const LoadingPlaceholder = <DataType,>({
  totalRows,
  columns,
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
