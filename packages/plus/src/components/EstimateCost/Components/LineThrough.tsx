'use client'

import type { ComponentProps } from 'react'
import { estimateCostLineThrough } from './components.css'

type LineThroughProps = ComponentProps<'span'> & {
  isActive?: boolean
}

export const LineThrough = ({ isActive, ...props }: LineThroughProps) => (
  <span
    className={`${props.className ? `${props.className} ` : ''} ${isActive ? estimateCostLineThrough : ''}`}
    {...props}
  />
)
