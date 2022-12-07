import styled from '@emotion/styled'
import Line from '../Placeholder/Line'
import { ListCell } from './ListCell'
import { ListRow } from './ListRow'

const StyledPlaceholder = styled(Line)`
  width: 80%;
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
}: ListLoadingPlaceholderProps) => (
  <>
    {Array.from({ length: rows }, (_, index) => index).map(index => (
      <ListRow
        className={className}
        checkboxRender={<div />}
        id={`placeholder-${index}`}
        key={index}
      >
        {Array.from({ length: cols }, (_, columnIndex) => columnIndex).map(
          columnIndex => (
            <ListCell key={columnIndex}>
              <StyledPlaceholder />
            </ListCell>
          ),
        )}
      </ListRow>
    ))}
  </>
)
