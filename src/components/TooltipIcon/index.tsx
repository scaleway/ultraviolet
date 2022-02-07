import PropTypes from 'prop-types'
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react'
import Icon, { icons } from '../Icon'
import Tooltip from '../Tooltip'

type TooltipIconProps = {
  baseId?: string
  color?: string
  name?: ComponentProps<typeof Icon>['name']
  size?: number
  tooltip: ReactNode
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
    <Icon
      color={color}
      name={name}
      size={size}
      verticalAlign={verticalAlign}
      aria-label={name}
    />
  </Tooltip>
)

TooltipIcon.propTypes = {
  baseId: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.oneOf(icons),
  size: PropTypes.number,
  tooltip: PropTypes.node.isRequired,
  verticalAlign: PropTypes.string,
}

export default TooltipIcon
