import { useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

const ProgressCircle = ({
  percentage,
  text,
  size,
  strokeWidth,
  pathColor,
  trailColor,
}) => {
  const theme = useTheme()

  return (
    <div style={{ height: size, width: size }}>
      <CircularProgressbar
        value={percentage}
        text={text}
        strokeWidth={strokeWidth}
        styles={{
          path: {
            stroke: theme.colors[pathColor] || pathColor,
            strokeLinecap: 'round',
          },
          root: {},
          text: {
            dominantBaseline: 'middle',
            fill: theme.colors.primary,
            fontSize: '26px',
            textAnchor: 'middle',
          },
          trail: {
            stroke: theme.colors[trailColor] || trailColor,
            strokeLinecap: 'round',
          },
        }}
      />
    </div>
  )
}

ProgressCircle.propTypes = {
  pathColor: PropTypes.string,
  percentage: PropTypes.number,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  /**
   * Text is placed in center of ProgressCircle.
   */
  text: PropTypes.string,
  trailColor: PropTypes.string,
}

ProgressCircle.defaultProps = {
  pathColor: 'primary',
  percentage: 0,
  size: 40,
  strokeWidth: 16,
  text: undefined,
  trailColor: 'gray350',
}

export default ProgressCircle
