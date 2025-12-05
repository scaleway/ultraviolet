'use client'

import { cn } from '@ultraviolet/themes'
import type { CSSProperties, ReactNode } from 'react'
import type { SIZES } from './constant'
import { logo } from './style.css'

export type IconProps = {
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
  style?: CSSProperties
}

/**
 * Logo component is used to render a set of logos. Their style cannot be changed
 */
export const Icon = ({
  size = 'small',
  className,
  children,
  style,
}: IconProps) => (
  <svg className={cn(className, logo[size])} style={style} viewBox="0 0 20 20">
    {children}
  </svg>
)
