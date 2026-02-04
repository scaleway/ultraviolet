'use client'

import { cn } from '@ultraviolet/utils'
import type { JSX, ReactNode } from 'react'
import type { SIZES } from './constant'
import { flag } from './style.css'

export type IconProps = {
  size?: keyof typeof SIZES
  title: string
  className?: string
  children: ReactNode
  disabled?: boolean
}

type IconType = (props: IconProps) => JSX.Element

/**
 * Logo component is used to render a set of flags. Their style cannot be changed
 */
export const Icon: IconType = ({
  size = 'medium',
  className,
  children,
  title,
}) => (
  <svg
    className={cn(className, flag[size])}
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>{title}</title>
    {children}
  </svg>
)
