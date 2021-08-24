import PropTypes from 'prop-types'
import React, { FunctionComponent, ImgHTMLAttributes } from 'react'
import Box, { XStyledProps } from '../Box'

const Image: FunctionComponent<
  ImgHTMLAttributes<HTMLImageElement> & XStyledProps
> = ({
  src,
  ...props
  // @ts-expect-error Box expose Element, not ImgElement
}) => <Box as="img" src={src} {...props} />

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
