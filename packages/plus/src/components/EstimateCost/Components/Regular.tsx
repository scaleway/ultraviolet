'use client'

import { cn } from '@ultraviolet/themes'
import type { CSSProperties, ReactNode } from 'react'
import { memo } from 'react'
import { useOverlay } from '../OverlayContext'
import { estimateCostRegular } from './components.css'

type RegularProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  isDisabledOnOverlay?: boolean
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const Regular = memo(
  ({
    variant = 'normal',
    isDisabledOnOverlay = false,
    children = null,
    className,
    style,
  }: RegularProps) => {
    const { isOverlay } = useOverlay()

    return !isDisabledOnOverlay || !isOverlay ? (
      <div
        className={cn(className, estimateCostRegular({ isOverlay, variant }))}
        style={style}
      >
        {children}
      </div>
    ) : null
  },
)
