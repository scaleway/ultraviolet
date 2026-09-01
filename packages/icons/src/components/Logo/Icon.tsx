'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import type { SIZES } from './constant'
import { logo } from './style.css'

export type IconProps = {
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
  style?: CSSProperties
  accessibleLabel?: string
  'aria-hidden'?: boolean
}

/**
 * Logo component is used to render a set of logos. Their style cannot be changed
 */
export const Icon = ({
  size = 'small',
  className,
  children,
  style,
  accessibleLabel,
  'aria-hidden': ariaHidden,
}: IconProps) => (
  <svg
    aria-hidden={ariaHidden ?? !accessibleLabel}
    className={cn(className, logo[size])}
    height="20"
    style={style}
    role={accessibleLabel ? 'img' : undefined}
    viewBox="0 0 20 20"
    width="20"
  >
    {accessibleLabel ? <title>{accessibleLabel}</title> : null}
    {children}
  </svg>
)
