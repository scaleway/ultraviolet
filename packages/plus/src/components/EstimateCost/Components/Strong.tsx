'use client'

import type { ReactNode } from 'react'
import { memo } from 'react'
import { estimateCostRegular, estimateCostStrong } from './components.css'

type StrongProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  children?: ReactNode
  isDisabledOnOverlay?: boolean
}
export const Strong = memo(
  ({ variant = 'normal', children = null }: StrongProps) => (
    <div
      className={`${estimateCostRegular({ variant })} ${estimateCostStrong({ variant })}`}
    >
      {children}
    </div>
  ),
)
