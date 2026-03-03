'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { estimateCostStyle } from '../styles.css'

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
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)
