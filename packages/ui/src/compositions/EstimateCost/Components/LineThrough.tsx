'use client'

import { cn } from '@ultraviolet/utils'

import { estimateCostStyle } from '../styles.css'

import type { ComponentProps } from 'react'

type LineThroughProps = ComponentProps<'span'> & {
  isActive?: boolean
}

export const LineThrough = ({
  isActive,
  className,
  ...props
}: LineThroughProps) => (
  <span
    className={cn(className, isActive ? estimateCostStyle.lineThrough : '')}
    {...props}
  />
)
