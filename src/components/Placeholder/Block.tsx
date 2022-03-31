import styled from '@emotion/styled'
import { Fragment, VoidFunctionComponent } from 'react'
import IconPlaceholder from './IconPlaceholder'
import Line from './Line'

const StyledLine = styled.li`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space['3']} ${theme.space['2']}`};
`

const StyledList = styled.ul`
  min-height: 200px;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space['2']};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: 4px;
  margin: 0;

  > ${StyledLine}:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }
`

const Block: VoidFunctionComponent = ({ length = 3 }: { length?: number }) => (
  <StyledList>
    {Array.from({ length }, (_, i) => (
      <Fragment key={`placeholder-block-${i}`}>
        <StyledLine>
          <IconPlaceholder />
          <Line />
        </StyledLine>
      </Fragment>
    ))}
  </StyledList>
)

export default Block
