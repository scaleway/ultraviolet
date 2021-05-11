import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

const Box = forwardRef(({ width, height, ...props }, ref) => (
  <x.div ref={ref} w={width} h={height} {...props} />
))

Box.withComponent = element => props => <Box as={element} {...props} />

Box.defaultProps = {
  height: undefined,
  width: undefined,
}

Box.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
