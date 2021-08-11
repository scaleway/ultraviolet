import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Box from '../Box'

// @ts-expect-error Box expose Element, not ImgElement
const Image: FunctionComponent<HTMLImageElement & XStyledProps> = ({
  src,
  ...props
}) => <Box as="img" src={src} {...props} />

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
