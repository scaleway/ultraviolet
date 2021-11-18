import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Icon, { IconName, icons } from '../Icon'
import Tooltip from '../Tooltip'

export type TooltipIconProps = {
  baseId?: string
  color?: string
  name?: IconName
  size?: number
  tooltip: string
  verticalAlign?: string
}

const TooltipIcon: FunctionComponent<TooltipIconProps> = ({
  color = 'gray550',
  name = 'help-circle-outline',
  size = 20,
  verticalAlign = 'middle',
  tooltip,
  baseId,
}) => (
  <Tooltip text={tooltip} baseId={baseId}>
    <Icon color={color} name={name} size={size} verticalAlign={verticalAlign} />
  </Tooltip>
)

TooltipIcon.propTypes = {
  baseId: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.oneOf(icons),
  size: PropTypes.number,
  tooltip: PropTypes.string.isRequired,
  verticalAlign: PropTypes.string,
}

export default TooltipIcon
