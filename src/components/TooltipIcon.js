import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'components/Icon'
import { Tooltip } from 'components/Tooltip'

export const TooltipIcon = ({ color, name, size, tooltip }) => (
  <Tooltip tooltip={tooltip}>
    <Icon color={color} name={name} size={size} />
  </Tooltip>
)

TooltipIcon.defaultProps = {
  color: 'darkGrey',
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
