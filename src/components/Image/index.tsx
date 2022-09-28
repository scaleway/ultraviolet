import { ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement>

const Image = ({ alt, src, ...props }: ImageProps) => (
  <img alt={alt} src={src} {...props} />
)

export default Image
