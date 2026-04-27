'use client'

import { Link } from '../../Link'

import type { ComponentProps } from 'react'

export const ToastLink = ({ ...props }: ComponentProps<typeof Link>) => (
  <Link {...props} prominence="strong" size="small" />
)
