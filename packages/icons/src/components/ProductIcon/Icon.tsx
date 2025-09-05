'use client'

import type { ReactNode } from 'react'
import type { SIZES, VARIANTS } from './constants'
import { productIconSizes, productIconVariants } from './styles.css'

type Variants = (typeof VARIANTS)[number]

export type IconProps = {
  variant?: Variants
  disabled?: boolean
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}

/**
 * ProductIcon component is used to render a set of icons that are linked to a product or service.
 * Those icons are made of multiple colors that changes automatically based on the current theme.
 */
export const Icon = ({
  variant = 'primary',
  disabled,
  size = 'small',
  className,
  children,
}: IconProps) => (
  <svg
    className={`${className ? `${className} ` : ''}${productIconSizes[size]} ${productIconVariants[`${variant}${disabled ? 'Disabled' : ''}`]}`}
    viewBox="0 0 64 64"
  >
    {children}
  </svg>
)
