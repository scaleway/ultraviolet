'use client'

import type { ComponentProps } from 'react'
import { Link } from '../../Link'

export const ToastLink = ({ ...props }: ComponentProps<typeof Link>) => (
  <Link {...props} prominence="strong" size="small" />
)
