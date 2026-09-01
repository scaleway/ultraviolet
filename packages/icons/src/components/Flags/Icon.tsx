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
  accessibleLabel?: boolean
  'aria-hidden'?: boolean
}

/**
 * Logo component is used to render a set of flags. Their style cannot be changed
 */
export const Icon = ({
  size = 'medium',
  className,
  children,
  accessibleLabel,
  'aria-hidden': ariaHidden,
}: IconProps) => (
  <svg
    aria-hidden={ariaHidden ?? !accessibleLabel}
    className={cn(className, flag[size])}
    height="24"
    role={accessibleLabel ? 'img' : undefined}
    viewBox="0 0 16 16"
    width="24"
  >
    {accessibleLabel ? <title>{accessibleLabel}</title> : null}
    {children}
  </svg>
)
