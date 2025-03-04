import styled from '@emotion/styled'
import { useSelectableCardOptionGroup } from '../Provider'
import type { Sizes } from '../types'

const StyledImage = styled.img`
  &[data-disabled='true'] {
    filter: grayscale(100%);
  }
`

const IMAGE_SIZES = {
  large: 56,
  medium: 40,
} as const

type ImageType = {
  src: string
  alt?: string
  className?: string
  size: Sizes
}

export const Image = ({ src, alt, size, className }: ImageType) => {
  const { disabled } = useSelectableCardOptionGroup()

  return (
    <StyledImage
      src={src}
      alt={alt}
      width={IMAGE_SIZES[size]}
      data-disabled={disabled}
      className={className}
    />
  )
}
