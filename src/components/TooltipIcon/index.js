import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

export const TooltipIcon = ({ color, name, size, tooltip }) => (
  <Tooltip text={tooltip} width="max-content">
    <Icon color={color} name={name} size={size} />
  </Tooltip>
)

TooltipIcon.defaultProps = {
  color: 'gray550',
  name: 'help-circle-outline',
  size: 20,
}

TooltipIcon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  tooltip: PropTypes.string.isRequired,
}

export default TooltipIcon
