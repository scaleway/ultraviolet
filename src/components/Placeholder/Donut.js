import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'
import Line from './Line'

const styles = {
  container: css`
    display: flex;
  `,
  circleContainer: height => css`
    position: relative;
    height: ${height}px;
  `,
  linesContainer: css`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
  circle: theme => css`
    transform-origin: 50% 50%;
    stroke: ${theme.colors.gray300};
    stroke-width: 18;
    stroke-linecap: butt;
    fill: none;
  `,
  line: css`
    display: flex;
    margin-top: 16px;
    margin-left: 16px;
  `,
}

const Donut = ({ height, width, ...props }) => (
  <Box css={styles.container} {...props}>
    <div css={styles.circleContainer(height)}>
      <svg
        style={{
          minHeight: height,
          height,
          minWidth: width,
          width,
          transform: 'rotate(-90deg)',
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

Donut.defaultProps = {
  height: 206,
  width: 206,
}

export default Donut
