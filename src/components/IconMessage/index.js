import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

export function IconMessage({
  variant = 'warning',
  icon = 'alert',
  children,
  ...props
}) {
  return (
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
}

IconMessage.propTypes = {
  variant: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
}
