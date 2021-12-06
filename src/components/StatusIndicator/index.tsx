import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { ColorDeprecated as Color } from '../../theme/deprecated/colors'
import { flash } from '../../utils/animations'
import { XStyledProps } from '../Box'
import Dot from '../Dot'
import Tooltip from '../Tooltip'

const defaultStatuses = {
  available: 'green',
  creating: 'blue',
  deleting: 'blue',
  deployed: 'green',
  disk_full: 'red',
  error: 'red',
  locked: 'red',
  pending: 'blue',
  ready: 'green',
  running: 'green',
  snapshotting: 'blue',
  starting: 'blue',
  stopped: 'gray550',
  stopped_in_place: 'orange',
  stopping: 'blue',
  unavailable: 'red',
  updating: 'blue',
  warning: 'blue',
}

const cssAnimation = css`
  animation: ${flash} linear 1s infinite;
`

type StatusIndicatorProps = XStyledProps & {
  animated?: boolean
  statuses?: Record<string, string>
  status?: string
  tooltip?: string
}

const StatusIndicator = ({
  tooltip,
  status = 'unavailable',
  statuses = defaultStatuses,
  animated = false,
  ...props
}: StatusIndicatorProps): JSX.Element => (
  <Tooltip text={tooltip}>
    <Dot
      color={({ ...defaultStatuses, ...statuses }[status] as Color) || 'blue'}
      css={animated && cssAnimation}
      {...props}
    />
  </Tooltip>
)

export const statuses = Object.keys(defaultStatuses)

StatusIndicator.propTypes = {
  animated: PropTypes.bool,
  status: (
    { statuses: propsStatuses, ...props }: { [key: string]: string },
    propName: string,
    componentName: string,
  ) => {
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
  statuses: PropTypes.shape({}),
  tooltip: PropTypes.string,
}

export default StatusIndicator
