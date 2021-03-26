import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { flash } from '../../utils/animations'
import Dot from '../Dot'
import Tooltip from '../Tooltip'

const defaultStatuses = {
  ready: colors.green,
  available: colors.green,
  running: colors.green,
  error: colors.red,
  unavailable: colors.red,
  locked: colors.red,
  disk_full: colors.red,
  starting: colors.blue,
  stopping: colors.blue,
  snapshotting: colors.blue,
  stopped: colors.gray550,
  pending: colors.blue,
  deleting: colors.blue,
  creating: colors.blue,
  updating: colors.blue,
  warning: colors.blue,
  stopped_in_place: colors.orange,
  deployed: colors.green,
}

const cssAnimation = css`
  animation: ${flash} linear 1s infinite;
`

const StatusIndicator = ({ tooltip, status, statuses, animated, ...props }) => (
  <Tooltip text={tooltip}>
    <Dot
      color={{ ...defaultStatuses, ...statuses }[status] || colors.blue}
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
