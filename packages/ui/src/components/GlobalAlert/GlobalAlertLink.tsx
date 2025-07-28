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
      aria-label={ariaLabel}
      className={className}
      data-testid={dataTestId}
      download={download}
      href={href}
      onClick={onClick}
      oneLine={oneLine}
      prominence={theme === 'light' ? 'strong' : 'stronger'}
      rel={rel}
      size="small"
      target={target}
      variant="inline"
    >
      {children}
    </Link>
  )
}
