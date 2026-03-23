'use client'

import { Link } from '../../Link'

import type { ComponentProps } from 'react'

export const ToastLink = ({ ...props }: ComponentProps<typeof Link>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link {...props} prominence="strong" size="small" />
)
