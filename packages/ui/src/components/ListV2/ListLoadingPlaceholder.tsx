import styled from '@emotion/styled'
import { Placeholder } from '../Placeholder'
import { ListCell } from './ListCell'
import { ListRow } from './ListRow'

const StyledListRow = styled(ListRow)`
  cursor: progress;
`

const StyledPlaceholder = styled(Placeholder)`
  width: 80%;
  max-width: 100%;
`

type ListLoadingPlaceholderProps = {
  rows?: number
  cols?: number
  className?: string
}

export const ListLoadingPlaceholder = ({
  cols = 1,
  rows = 5,
  className,
}: ListLoadingPlaceholderProps) => {
  const rowArray = Array.from({ length: rows }, (_, index) => index)
  const colArray = Array.from({ length: cols }, (_, index) => index)

  return (
    <>
      {rowArray.map(index => (
        <StyledListRow
          className={className}
          checkboxRender={<div />}
          id={`placeholder-${index}`}
          key={index}
          isHoverable={false}
        >
          {colArray.map(columnIndex => (
            <ListCell key={columnIndex}>
              <StyledPlaceholder variant="line" />
            </ListCell>
          ))}
        </StyledListRow>
      ))}
    </>
  )
}
