import styled from '@emotion/styled'
import { Skeleton } from '../Skeleton'
import { ListCell } from './ListCell'
import { ListRow } from './ListRow'

const StyledListRow = styled(ListRow)`
  cursor: progress;
`

const StyledSkeleton = styled(Skeleton)`
  width: 80%;
  max-width: 100%;
`

type ListLoadingSkeletonProps = {
  rows?: number
  cols?: number
  className?: string
}

export const ListLoadingSkeleton = ({
  cols = 1,
  rows = 5,
  className,
}: ListLoadingSkeletonProps) => {
  const rowArray = Array.from({ length: rows }, (_, index) => index)
  const colArray = Array.from({ length: cols }, (_, index) => index)

  return (
    <>
      {rowArray.map(index => (
        <StyledListRow
          className={className}
          id={`skeleton-${index}`}
          key={index}
          checkboxDisabled
        >
          {colArray.map(columnIndex => (
            <ListCell key={columnIndex}>
              <StyledSkeleton variant="line" />
            </ListCell>
          ))}
        </StyledListRow>
      ))}
    </>
  )
}
