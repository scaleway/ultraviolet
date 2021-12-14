import { Theme, css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent } from 'react'
import Box from '../Box'
import Line from './Line'

const styles = {
  circle: (theme: Theme) => css`
    transform-origin: 50% 50%;
    stroke: ${theme.colors.neutral.background};
    stroke-width: 18;
    stroke-linecap: butt;
    fill: none;
  `,
  circleContainer: (height: number) => css`
    position: relative;
    height: ${height}px;
  `,
  container: css`
    display: flex;
  `,
  line: css`
    display: flex;
    margin-top: 16px;
    margin-left: 16px;
  `,
  linesContainer: css`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
}

const Donut: VoidFunctionComponent<{ height?: number; width?: number }> = ({
  height = 206,
  width = 206,
  ...props
}) => (
  <Box css={styles.container} {...props}>
    <div css={styles.circleContainer(height)}>
      <svg
        style={{
          height,
          minHeight: height,
          minWidth: width,
          transform: 'rotate(-90deg)',
          width,
        }}
      >
        <circle css={styles.circle} cx={width / 2} cy={height / 2} r="90" />
      </svg>
    </div>
    <ul css={styles.linesContainer}>
      <li css={styles.line}>
        <Line />
      </li>
      <li css={styles.line}>
        <Line />
      </li>
      <li css={styles.line}>
        <Line />
      </li>
      <li css={styles.line}>
        <Line />
      </li>
    </ul>
  </Box>
)

Donut.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

export default Donut
