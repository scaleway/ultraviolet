'use client'

import type { ReactNode } from 'react'
import { memo } from 'react'
import { useOverlay } from '../OverlayContext'
import { estimateCostRegular } from './components.css'

type RegularProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  isDisabledOnOverlay?: boolean
  children?: ReactNode
  className?: string
}

export const Regular = memo(
  ({
    variant = 'normal',
    isDisabledOnOverlay = false,
    children = null,
    className,
  }: RegularProps) => {
    const { isOverlay } = useOverlay()

    return !isDisabledOnOverlay || !isOverlay ? (
      <div
        className={`${className ? `${className} ` : ''}${estimateCostRegular({ isOverlay, variant })}`}
      >
        {children}
      </div>
    ) : null
  },
)
