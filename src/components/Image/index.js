import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'

const Image = ({ src, ...props }) => <Box as="img" src={src} {...props} />

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
