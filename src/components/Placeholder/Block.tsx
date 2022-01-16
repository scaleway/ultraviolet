import styled from '@emotion/styled'
import React, { VoidFunctionComponent } from 'react'
import Separator from '../Separator'
import IconPlaceholder from './IconPlaceholder'
import Line from './Line'

const StyledList = styled.ul`
  min-height: 200px;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space['2']};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: 4px;
  margin: 0;
`

const StyledLine = styled.li`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space['2']};
`

const Block: VoidFunctionComponent = ({ length = 3 }: { length?: number }) => (
  <StyledList>
    {Array.from({ length }, (_, i) => (
      <React.Fragment key={`placeholder-block-${i}`}>
        <StyledLine>
          <IconPlaceholder />
          <Line />
        </StyledLine>
        {i !== 2 && <Separator my={1} />}
      </React.Fragment>
    ))}
  </StyledList>
)

export default Block
