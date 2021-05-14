import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

const TooltipIcon = ({ color, name, size, tooltip, baseId }) => (
  <Tooltip text={tooltip} baseId={baseId} width="max-content">
    <Icon color={color} name={name} size={size} />
  </Tooltip>
)

TooltipIcon.defaultProps = {
  baseId: undefined,
  color: 'gray550',
  name: 'help-circle-outline',
  size: 20,
}

TooltipIcon.propTypes = {
  baseId: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  tooltip: PropTypes.string.isRequired,
}

export default TooltipIcon
