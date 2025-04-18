'use client'

import styled from '@emotion/styled'
import { Skeleton } from '../Skeleton'
import { Cell } from './Cell'
import { useListContext } from './ListContext'
import { StyledRow } from './Row'

const StyledLoadingRow = styled(StyledRow)`
  cursor: progress;
`

const StyledSkeleton = styled(Skeleton)`
  width: 80%;
  max-width: 100%;
  align-items: start;
  justify-content: center;
`

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
        <StyledLoadingRow
          sentiment="neutral"
          role="row"
          id={`skeleton-${index}`}
          columns={columns}
          key={index}
        >
          {selectable ? <td /> : null}
          {colArray.map(columnIndex => (
            <Cell key={columnIndex}>
              <StyledSkeleton variant="line" />
            </Cell>
          ))}
        </StyledLoadingRow>
      ))}
    </>
  )
}
