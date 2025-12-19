'use client'

import { cn } from '@ultraviolet/utils'
import { disabledImage } from '../styles.css'
import type { Sizes } from '../types'

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
  <img
    alt={alt}
    className={cn(className, disabled ? disabledImage : '')}
    data-disabled={disabled}
    height={IMAGE_SIZES[size]}
    src={src}
    width={IMAGE_SIZES[size]}
  />
)
