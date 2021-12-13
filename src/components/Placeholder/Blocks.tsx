import { Theme, css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent } from 'react'
import Box from '../Box'
import { Col, Grid, Row } from '../Grid'
import Line from './Line'

const styles = {
  block: (theme: Theme) => css`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    margin-bottom: 16px;
    border-style: solid;
    border-width: 1px;
    border-color: ${theme.colors.neutral.borderWeak};
    border-radius: 4px;
  `,
  container: ({ length }: { length: number }) => css`
    min-height: ${length * 200} px;
  `,
  icon: (theme: Theme) => css`
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    background-color: ${theme.colors.neutral.background};
  `,
}

const Blocks: VoidFunctionComponent<{ col?: number; length?: number }> = ({
  col = 4,
  length = 8,
  ...props
}) => (
  <Box {...props} css={styles.container({ length })}>
    <Grid gutter={0}>
      <Row>
        {Array.from({ length }, (_, i) => (
          <Col xsmall={12 / col} key={`placeholder-block-${i}`}>
            <div css={styles.block}>
              <div css={styles.icon} />
              <Line />
            </div>
          </Col>
        ))}
      </Row>
    </Grid>
  </Box>
)

Blocks.propTypes = {
  col: PropTypes.number,
  length: PropTypes.number,
}

export default Blocks
