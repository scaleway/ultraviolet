import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React from 'react'

export const Box = ({ width, height, ...props }) => (
  <x.div w={width} h={height} {...props} />
)

Box.defaultProps = {
  width: undefined,
  height: undefined,
}

Box.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
