import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Color } from '../../theme'
import { ColorDeprecated } from '../../theme/deprecated/colors'
import { flash } from '../../utils/animations'
import Box, { XStyledProps } from '../Box'
import Tooltip from '../Tooltip'

const Dot = styled(Box, {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong ??
    theme.colorsDeprecated[color as ColorDeprecated] ??
    color};
`

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
      color={
        ({ ...defaultStatuses, ...statuses }[status] as
          | ColorDeprecated
          | Color) || 'blue'
      }
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
