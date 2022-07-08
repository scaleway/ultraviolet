import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Color } from '../../theme'
import { ColorDeprecated } from '../../theme/deprecated/colors'
import { flash } from '../../utils/animations'
import Box, { XStyledProps } from '../Box'
import Tooltip from '../Tooltip'

const Dot = styled(Box, {
  shouldForwardProp: prop => !['color'].includes(prop),
})`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
`

const cssAnimation = css`
  animation: ${flash} linear 1s infinite;
`

type StatusIndicatorProps = XStyledProps & {
  animated?: boolean
  statuses?: Record<string, string>
  status?: string
  tooltip?: string
}

/**
 * @deprecated use Status component instead
 */
const StatusIndicator = ({
  tooltip,
  status = 'unavailable',
  statuses,
  animated = false,
  ...props
}: StatusIndicatorProps): JSX.Element => {
  const theme = useTheme()

  const defaultStatuses = {
    available: theme.colors.success.backgroundStrong,
    creating: theme.colors.info.backgroundStrong,
    deleting: theme.colors.info.backgroundStrong,
    deployed: theme.colors.success.backgroundStrong,
    disk_full: theme.colors.danger.backgroundStrong,
    error: theme.colors.danger.backgroundStrong,
    locked: theme.colors.danger.backgroundStrong,
    pending: theme.colors.info.backgroundStrong,
    ready: theme.colors.success.backgroundStrong,
    running: theme.colors.success.backgroundStrong,
    snapshotting: theme.colors.info.backgroundStrong,
    starting: theme.colors.info.backgroundStrong,
    stopped: theme.colors.neutral.backgroundStrong,
    stopped_in_place: theme.colors.warning.backgroundStrong,
    stopping: theme.colors.info.backgroundStrong,
    unavailable: theme.colors.danger.backgroundStrong,
    updating: theme.colors.info.backgroundStrong,
    warning: theme.colors.info.backgroundStrong,
  }

  return (
    <Tooltip text={tooltip}>
      <Dot
        color={
          ({ ...defaultStatuses, ...statuses }[status] as
            | ColorDeprecated
            | Color) || theme.colors.info.backgroundStrong
        }
        css={animated && cssAnimation}
        {...props}
      />
    </Tooltip>
  )
}

export default StatusIndicator
