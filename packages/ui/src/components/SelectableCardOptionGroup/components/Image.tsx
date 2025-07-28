'use client'

import styled from '@emotion/styled'
import type { Sizes } from '../types'

const StyledImage = styled.img`
  &[data-disabled='true'] {
    filter: grayscale(1) opacity(25%);
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
  disabled?: boolean
}

export const Image = ({ src, alt, size, disabled, className }: ImageType) => (
  <StyledImage
    alt={alt}
    className={className}
    data-disabled={disabled}
    height={IMAGE_SIZES[size]}
    src={src}
    width={IMAGE_SIZES[size]}
  />
)
