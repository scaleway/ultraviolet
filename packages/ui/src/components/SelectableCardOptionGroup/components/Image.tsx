import styled from '@emotion/styled'
import { useSelectableCardOptionGroup } from '../Provider'
import type { Sizes } from '../types'

const StyledImage = styled.img`
  &[data-disabled='true'] {
    filter: grayscale(100%);
  }
`

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
      width={size === 'large' ? 56 : 40}
      data-disabled={disabled}
      className={className}
    />
  )
}
