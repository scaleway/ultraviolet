import { css } from '@emotion/react'
import React from 'react'
import { Box } from '../Box'
import { Separator } from '../Separator'
import Line from './Line'

const styles = {
  container: css`
    min-height: 200px;
  `,
  block: theme => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px 16px;
    margin-bottom: 16px;
    border-style: solid;
    border-width: 1px;
    border-color: ${theme.colors.gray300};
    border-radius: 4px;
  `,
  icon: theme => css`
    width: 32px;
    height: 32px;
    border-radius: 12px;
    background-color: ${theme.colors.gray300};
  `,
}

const Block = props => (
  <Box {...props} css={styles.container}>
    <Box css={styles.block}>
      {Array.from({ length: 3 }, (_, i) => (
        <React.Fragment key={i}>
          <Box display="flex" alignItems="center" p={2}>
            <Box css={styles.icon} mr={1} />
            <Line />
          </Box>
          {i !== 2 && <Separator my={1} />}
        </React.Fragment>
      ))}
    </Box>
  </Box>
)

export default Block
