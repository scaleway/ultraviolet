import PropTypes from 'prop-types'
import React, { FunctionComponent, ImgHTMLAttributes } from 'react'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>

const Image: FunctionComponent<ImageProps> = ({ alt, src, ...props }) => (
  <img alt={alt} src={src} {...props} />
)

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default Image
