'use client'

import { Skeleton } from '../Skeleton'
import { Cell } from './Cell'
import { tableSkeleton, tableSkeletonRow } from './styles.css'

type SkeletonRowsProps = {
  selectable: boolean
  rows: number
  cols: number
}

export const SkeletonRows = ({ selectable, rows, cols }: SkeletonRowsProps) => {
  const rowArray = Array.from({ length: rows }, (_, index) => index)
  const colArray = Array.from({ length: cols }, (_, index) => index)

  return (
    <>
      {rowArray.map(index => (
        <tr
          className={tableSkeletonRow}
          id={`skeleton-${index}`}
          key={index}
          role="row"
        >
          {selectable ? <Cell /> : null}
          {colArray.map(columnIndex => (
            <Cell key={columnIndex}>
              <Skeleton className={tableSkeleton} variant="line" />
            </Cell>
          ))}
        </tr>
      ))}
    </>
  )
}
