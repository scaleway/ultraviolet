import styled from '@emotion/styled'
import { Skeleton } from '../Skeleton'
import { Cell } from './Cell'
import { StyledRow } from './Row'

const StyledLoadingRow = styled(StyledRow)`
  cursor: progress;
`

const StyledSkeleton = styled(Skeleton)`
  width: 80%;
  max-width: 100%;
`

type ListLoadingSkeletonProps = {
  areRowSelectable: boolean
  rows: number
  cols: number
}

export const SkeletonRows = ({
  areRowSelectable,
  rows,
  cols,
}: ListLoadingSkeletonProps) => {
  const rowArray = Array.from({ length: rows }, (_, index) => index)
  const colArray = Array.from({ length: cols }, (_, index) => index)

  return (
    <>
      {rowArray.map(index => (
        <StyledLoadingRow
          sentiment="neutral"
          role="row"
          id={`skeleton-${index}`}
          key={index}
        >
          {areRowSelectable ? <div /> : null}
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
