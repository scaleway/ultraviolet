import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

export const Box = forwardRef(({ width, height, ...props }, ref) => (
  <x.div ref={ref} w={width} h={height} {...props} />
))

Box.withComponent = element => props => <Box as={element} {...props} />

Box.defaultProps = {
  width: undefined,
  height: undefined,
}

Box.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
