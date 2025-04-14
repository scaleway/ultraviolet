'use client'

import { useTheme } from '@emotion/react'
import type { ComponentProps } from 'react'
import { Link } from '../../Link'

export const ToastLink = ({ ...props }: ComponentProps<typeof Link>) => {
  const { theme } = useTheme()

  return (
    <Link
      {...props}
      prominence={theme === 'light' ? 'stronger' : 'strong'}
      size="small"
    />
  )
}
