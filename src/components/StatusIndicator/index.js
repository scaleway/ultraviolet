import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Dot } from '../Dot'
import { Tooltip } from '../Tooltip'

const defaultStatuses = {
  ready: theme.green,
  available: theme.green,
  running: theme.green,
  error: theme.red,
  unavailable: theme.red,
  locked: theme.red,
  disk_full: theme.red,
  starting: theme.blue,
  stopping: theme.blue,
  snapshotting: theme.blue,
  stopped: theme.gray550,
  pending: theme.blue,
  deleting: theme.blue,
  creating: theme.blue,
  updating: theme.blue,
  warning: theme.blue,
  stopped_in_place: theme.orange,
  deployed: theme.green,
}

const cssAnimation = css`
  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  animation: flash linear 1s infinite;
`

const StatusIndicator = ({ tooltip, status, statuses, animated, ...props }) => (
  <Tooltip text={tooltip}>
    <Dot
      color={{ ...defaultStatuses, ...statuses }[status] || theme.blue}
      css={animated && cssAnimation}
      status={status}
      {...props}
    />
  </Tooltip>
)

export const statuses = Object.keys(defaultStatuses)

StatusIndicator.defaultProps = {
  animated: false,
  status: 'unavailable',
  statuses: {},
  tooltip: null,
}

StatusIndicator.propTypes = {
  animated: PropTypes.bool,
  status: (props, propName, componentName) => {
    const availableStatuses = [
      ...statuses,
      ...(props.statuses ? Object.keys(props.statuses) : []),
    ]

    if (!availableStatuses.includes(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`'${componentName}\`. Must be one of \`${JSON.stringify(
          availableStatuses,
        )}\` Validation failed.`,
      )
    }
    return null
  },
  tooltip: PropTypes.string,
  statuses: PropTypes.objectOf(PropTypes.string),
}

export { StatusIndicator }
