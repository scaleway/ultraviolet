import styled from '@emotion/styled'
<<<<<<< HEAD
import React, { VoidFunctionComponent } from 'react'
import IconPlaceholder from './IconPlaceholder'
=======
import { Fragment, VoidFunctionComponent } from 'react'
import Box from '../Box'
import Separator from '../Separator'
>>>>>>> chore(react):react17 new jsx transform
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

<<<<<<< HEAD
const Block: VoidFunctionComponent = ({ length = 3 }: { length?: number }) => (
  <StyledList>
    {Array.from({ length }, (_, i) => (
      <React.Fragment key={`placeholder-block-${i}`}>
        <StyledLine>
          <IconPlaceholder />
          <Line />
        </StyledLine>
      </React.Fragment>
    ))}
  </StyledList>
=======
const Block: VoidFunctionComponent = props => (
  <Box {...props} css={styles.container}>
    <div css={styles.block}>
      {Array.from({ length: 3 }, (_, i) => (
        <Fragment key={i}>
          <StyledLineContainer>
            <div css={styles.icon} />
            <Line />
          </StyledLineContainer>
          {i !== 2 && <Separator my={1} />}
        </Fragment>
      ))}
    </div>
  </Box>
>>>>>>> chore(react):react17 new jsx transform
)

export default Block
