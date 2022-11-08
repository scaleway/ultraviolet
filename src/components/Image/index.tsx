type ImageProps = {
  alt?: string
  src: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
}

const Image = ({ alt, src, width, height, className, style }: ImageProps) => (
  <img
    alt={alt}
    src={src}
    width={width}
    height={height}
    className={className}
    style={style}
  />
)

export default Image
