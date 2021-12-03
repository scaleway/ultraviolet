import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { VoidFunctionComponent } from 'react'
import Box from '../Box'
import Separator from '../Separator'
import Line from './Line'

const styles = {
  block: (theme: Theme) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px 16px;
    margin-bottom: 16px;
    border-style: solid;
    border-width: 1px;
    border-color: ${theme.colorsDeprecated.gray300};
    border-radius: 4px;
  `,
  container: css`
    min-height: 200px;
  `,
  icon: (theme: Theme) => css`
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    background-color: ${theme.colorsDeprecated.gray300};
  `,
}

const StyledLineContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space['2']};
`

const Block: VoidFunctionComponent = props => (
  <Box {...props} css={styles.container}>
    <div css={styles.block}>
      {Array.from({ length: 3 }, (_, i) => (
        <React.Fragment key={i}>
          <StyledLineContainer>
            <div css={styles.icon} />
            <Line />
          </StyledLineContainer>
          {i !== 2 && <Separator my={1} />}
        </React.Fragment>
      ))}
    </div>
  </Box>
)

export default Block
