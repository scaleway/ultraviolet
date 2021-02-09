import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

export const TooltipIcon = ({ color, name, size, tooltip, baseId }) => (
  <Tooltip text={tooltip} baseId={baseId} w="max-content">
    <Icon color={color} name={name} size={size} />
  </Tooltip>
)

TooltipIcon.defaultProps = {
  color: 'gray550',
  name: 'help-circle-outline',
  size: 20,
  baseId: undefined,
}

TooltipIcon.propTypes = {
  baseId: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  tooltip: PropTypes.string.isRequired,
}

export default TooltipIcon
