'use client'

import type { ReactNode } from 'react'
import type { SIZES } from './constant'
import { logo } from './style.css'

export type IconProps = {
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}

/**
 * Logo component is used to render a set of logos. Their style cannot be changed
 */
export const Icon = ({ size = 'small', className, children }: IconProps) => (
  <svg
    className={`${className ? `${className} ` : ''}${logo[size]}`}
    viewBox="0 0 20 20"
  >
    {children}
  </svg>
)
