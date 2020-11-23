import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Dot } from '../Dot'
import { Tooltip } from '../Tooltip'

const defaultStatuses = {
  ready: theme.green,
  success: theme.green,
  available: theme.green,
  running: theme.green,
  error: theme.red,
  unavailable: theme.red,
  locked: theme.red,
  disf_full: theme.red,
  info: theme.gray550,
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

const getAnimatedStatuses = statuses =>
  Object.keys(statuses).filter(
    status =>
      statuses[status] === theme.blue && !['not_configured'].includes(status),
  )

const getAnimation = (statuses, status) =>
  getAnimatedStatuses(statuses).includes(status) &&
  css`
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

const StatusIndicator = ({ tooltip, status, statuses, ...props }) => (
  <Tooltip text={tooltip}>
    <Dot
      color={{ ...defaultStatuses, ...statuses }[status] || theme.blue}
      css={getAnimation({ ...defaultStatuses, ...statuses }, status)}
      status={status}
      {...props}
    />
  </Tooltip>
)

export const statuses = Object.keys(defaultStatuses)

StatusIndicator.defaultProps = {
  status: 'unavailable',
  statuses: {},
  tooltip: null,
}

StatusIndicator.propTypes = {
  status: PropTypes.oneOf(statuses),
  tooltip: PropTypes.string,
  statuses: PropTypes.objectOf(PropTypes.string),
}

export { StatusIndicator }
