'use client'

import type { CSSProperties, ReactNode } from 'react'
import { memo } from 'react'
import { estimateCostRegular, estimateCostStrong } from './components.css'

type StrongProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  children?: ReactNode
  isDisabledOnOverlay?: boolean
  style?: CSSProperties
}
export const Strong = memo(
  ({ variant = 'normal', children = null, style }: StrongProps) => (
    <div
      className={`${estimateCostRegular({ variant })} ${estimateCostStrong({ variant })}`}
      style={style}
    >
      {children}
    </div>
  ),
)
