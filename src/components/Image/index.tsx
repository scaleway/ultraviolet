import PropTypes from 'prop-types'
import { FunctionComponent, ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

const Image: FunctionComponent<ImageProps> = ({ alt, src, ...props }) => (
  <img alt={alt} src={src} {...props} />
)

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default Image
