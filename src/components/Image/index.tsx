import PropTypes from 'prop-types'
import React, { FunctionComponent, ImgHTMLAttributes } from 'react'
import Box, { XStyledProps } from '../Box'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & XStyledProps

const Image: FunctionComponent<ImageProps> = ({ src, ...props }) => (
  <Box as="img" src={src} {...props} />
)

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
