'use client'

import { cn } from '@ultraviolet/utils'
import { memo } from 'react'

import { estimateCostStyle } from '../styles.css'

import type { CSSProperties, ReactNode } from 'react'

type StrongProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  children?: ReactNode
  isDisabledOnOverlay?: boolean
  style?: CSSProperties
}
export const Strong = memo(
  ({ variant = 'normal', children = null, style }: StrongProps) => (
    <div
      className={cn(
        estimateCostStyle.regular({ variant }),
        estimateCostStyle.strong({ variant }),
      )}
      style={style}
    >
      {children}
    </div>
  ),
)
