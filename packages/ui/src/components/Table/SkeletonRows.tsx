'use client'

import styled from '@emotion/styled'
import { Skeleton } from '../Skeleton'
import { Cell } from './Cell'

const StyledLoadingRow = styled('tr')`
  cursor: progress;
`

const StyledSkeleton = styled(Skeleton)`
  width: 80%;
  max-width: 100%;
`

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
        <StyledLoadingRow id={`skeleton-${index}`} key={index} role="row">
          {selectable ? <Cell /> : null}
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
