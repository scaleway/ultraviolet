'use client'

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
    className={`${className ? `${className} ` : ''} ${isActive ? estimateCostLineThrough : ''}`}
    {...props}
  />
)
