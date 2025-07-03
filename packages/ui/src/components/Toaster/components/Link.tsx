'use client'

import type { ComponentProps } from 'react'
import { Link } from '../../Link'

export const ToastLink = ({ ...props }: ComponentProps<typeof Link>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link {...props} prominence="strong" size="small" />
)
