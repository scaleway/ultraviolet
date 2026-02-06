'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { estimateCostLineThrough } from './components.css'

type LineThroughProps = ComponentProps<'span'> & {
  isActive?: boolean
}

export const LineThrough = ({
  isActive,
  className,
  ...props
}: LineThroughProps) => (
  <span
    className={cn(className, isActive ? estimateCostLineThrough : '')}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)
