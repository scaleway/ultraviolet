'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import type { VARIANTS } from './style.css'
import { categoryIcon } from './style.css'

export type IconProps = {
  variant?: (typeof VARIANTS)[number]
  disabled?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
  title: string
}

/**
 * CategoryIcon component is used to render category icons, those icons are more complex than system icons
 * as they involve multiple colors that changes depending on theme.
 */
export const Icon = ({
  variant = 'primary',
  disabled,
  children,
  className,
  style,
  title,
}: IconProps) => {
  const computedVariant = `${variant}${disabled ? 'Disabled' : ''}` as const

  return (
    <svg
      className={cn(className, categoryIcon[computedVariant])}
      height="20"
      style={style}
      viewBox="0 0 20 20"
      width="20"
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}
