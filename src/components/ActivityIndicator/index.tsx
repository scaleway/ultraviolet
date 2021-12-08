import { css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, useMemo } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { CircularProgressbarProps } from 'react-circular-progressbar/dist/types'
import { ColorDeprecated as Color } from '../../theme/deprecated/colors'
import { getUUID } from '../../utils'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledProgressbar = styled(CircularProgressbar)<
  Partial<CircularProgressbarProps> & { size: number | string; active: boolean }
>`
  ${({ size }) => css`
    height: ${typeof size === 'string' ? size : `${size}px`};
    width: ${typeof size === 'string' ? size : `${size}px`};
  `}

  ${({ active }) =>
    active &&
    css`
      animation: ${spin} 0.75s linear infinite;
    `}
`

const HiddenDiv = styled.div`
  visibility: hidden;
  position: absolute;
`

type ActivityIndicatorProps = {
  active?: boolean
  color?: string
  percentage?: number
  size?: number | string
  strokeWidth?: number
  /**
   * Text is placed in center of ProgressCircle.
   */
  text?: string
  trailColor?: string
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label?: string
  id?: string
}

const ActivityIndicator: FunctionComponent<ActivityIndicatorProps> = ({
  id: idProp,
  percentage = 20,
  text,
  size = 40,
  strokeWidth = 16,
  color = 'primary',
  trailColor = 'gray350',
  active = false,
  label = 'Loading',
}) => {
  const theme = useTheme()
  const id = useMemo(() => idProp || getUUID('input'), [idProp])

  return (
    <>
      <div aria-hidden="true">
        <StyledProgressbar
          value={percentage}
          text={text}
          strokeWidth={strokeWidth}
          active={active}
          size={size}
          styles={{
            path: {
              stroke: theme.colorsDeprecated[color as Color] || color,
              strokeLinecap: 'round',
            },
            root: {},
            text: {
              dominantBaseline: 'middle',
              fill: theme.colorsDeprecated.primary,
              fontSize: '26px',
              textAnchor: 'middle',
            },
            trail: {
              stroke: theme.colorsDeprecated[trailColor as Color] || trailColor,
              strokeLinecap: 'round',
            },
          }}
        />
      </div>
      {/* This hidden div is for accessibility since CircularProgressbar didn't implement it */}
      <HiddenDiv>
        <label htmlFor={id}>{label}</label>
        <progress
          id={id}
          max={100}
          value={percentage}
          aria-valuemin={0}
          aria-valuenow={percentage}
          aria-valuemax={100}
          aria-valuetext={`${percentage}%`}
        >
          {percentage}%
        </progress>
      </HiddenDiv>
    </>
  )
}

ActivityIndicator.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  id: PropTypes.string,
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label: PropTypes.string,
  percentage: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.number,
  /**
   * Text is placed in center of ProgressCircle.
   */
  text: PropTypes.string,
  trailColor: PropTypes.string,
}

export default ActivityIndicator
