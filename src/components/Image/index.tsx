import PropTypes from 'prop-types'
import { ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

const Image = ({ alt, src, ...props }: ImageProps) => (
  <img alt={alt} src={src} {...props} />
)

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default Image
