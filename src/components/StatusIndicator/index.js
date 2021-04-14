import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { flash } from '../../utils/animations'
import Dot from '../Dot'
import Tooltip from '../Tooltip'

const defaultStatuses = {
  ready: 'green',
  available: 'green',
  running: 'green',
  error: 'red',
  unavailable: 'red',
  locked: 'red',
  disk_full: 'red',
  starting: 'blue',
  stopping: 'blue',
  snapshotting: 'blue',
  stopped: 'gray550',
  pending: 'blue',
  deleting: 'blue',
  creating: 'blue',
  updating: 'blue',
  warning: 'blue',
  stopped_in_place: 'orange',
  deployed: 'green',
}

const cssAnimation = css`
  animation: ${flash} linear 1s infinite;
`

const StatusIndicator = ({ tooltip, status, statuses, animated, ...props }) => (
  <Tooltip text={tooltip}>
    <Dot
      color={{ ...defaultStatuses, ...statuses }[status] || 'blue'}
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
  status: ({ statuses: propsStatuses, ...props }, propName, componentName) => {
    const { [propName]: propsPropName } = props
    const availableStatuses = [
      ...statuses,
      ...(propsStatuses ? Object.keys(propsStatuses) : []),
    ]

    if (!availableStatuses.includes(propsPropName)) {
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

export default StatusIndicator
