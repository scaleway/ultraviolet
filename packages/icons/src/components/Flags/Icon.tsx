// biome-ignore-all lint/a11y/noSvgWithoutTitle: to check

'use client'

import { cn } from '@ultraviolet/utils'
import type { ReactNode } from 'react'
import type { SIZES } from './constant'
import { flag } from './style.css'

export type IconProps = {
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
  disabled?: boolean
}

/**
 * Logo component is used to render a set of flags. Their style cannot be changed
 */
export const Icon = ({ size = 'medium', className, children }: IconProps) => (
  <svg
    className={cn(className, flag[size])}
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    {children}
  </svg>
)
