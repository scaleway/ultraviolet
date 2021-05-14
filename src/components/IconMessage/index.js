import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'

const IconMessage = ({ variant, icon, children, ...props }) => (
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    flex="1"
    mb={2}
    {...props}
  >
    <Box mr={2}>
      <Icon name={icon} size={40} color={variant} />
    </Box>
    <Box>
      <Typography as="div" color={variant} fontWeight={700}>
        {children}
      </Typography>
    </Box>
  </Box>
)

IconMessage.defaultProps = {
  children: null,
  icon: 'alert',
  variant: 'warning',
}

IconMessage.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  variant: PropTypes.string,
}

export default IconMessage
