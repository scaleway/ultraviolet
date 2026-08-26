'use client'

import type { ComponentProps } from 'react'
import { Link } from '../../../action/Link'

export const ToastLink = ({ ...props }: ComponentProps<typeof Link>) => (
  <Link {...props} prominence="strong" size="small" />
)
