'use client'

import { useTheme } from '@emotion/react'
import type { ComponentProps } from 'react'
import { Link } from '../Link'

export const GlobalAlertLink = ({
  children,
  href,
  target,
  download,
  rel,
  className,
  onClick,
  'aria-label': ariaLabel,
  oneLine = false,
  'data-testid': dataTestId,
}: Omit<ComponentProps<typeof Link>, 'sentiment' | 'prominence' | 'size'>) => {
  const { theme } = useTheme()

  return (
    <Link
      href={href}
      target={target}
      download={download}
      sentiment="neutral"
      prominence={theme === 'light' ? 'stronger' : 'strong'}
      size="small"
      variant="inline"
      rel={rel}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      oneLine={oneLine}
      data-testid={dataTestId}
    >
      {children}
    </Link>
  )
}
