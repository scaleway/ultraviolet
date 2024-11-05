import styled from '@emotion/styled'
import { Line } from './Line'

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizing['600']};
  padding: ${({ theme }) => theme.space['0.5']} ${({ theme }) => theme.space['1']};
`

const StyledLine = styled.div`
  flex: 1;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  > ${StyledItem}:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  }
`

const Item = ({ col = 3 }: { col: number }) => (
  <StyledItem>
    {Array.from({ length: col }, (_, i) => (
      <StyledLine key={`skeleton-list-col-${i}`}>
        <Line />
      </StyledLine>
    ))}
  </StyledItem>
)

export const List = ({
  length = 3,
  col = 3,
}: {
  length?: number
  col?: number
}) => (
  <StyledList>
    {Array.from({ length }, (_, i) => (
      <Item col={col} key={`skeleton-list-${i}`} />
    ))}
  </StyledList>
)
