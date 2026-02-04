'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, JSX, ReactNode } from 'react'
import type { SIZES } from './constant'
import { logo } from './style.css'

export type IconProps = {
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
  style?: CSSProperties
  title: string
}

type IconType = (props: IconProps) => JSX.Element

/**
 * Logo component is used to render a set of logos. Their style cannot be changed
 */
export const Icon: IconType = ({
  size = 'small',
  className,
  children,
  style,
  title,
}: IconProps) => (
  <svg
    className={cn(className, logo[size])}
    height="20"
    style={style}
    viewBox="0 0 20 20"
    width="20"
  >
    <title>{title}</title>
    {children}
  </svg>
)
