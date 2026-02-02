'use client'

import { useTheme } from '@ultraviolet/themes'
import type { ComponentProps } from 'react'
import { Link } from '../Link'

type GlobalAlertLinkProps = Omit<
  ComponentProps<typeof Link>,
  'sentiment' | 'prominence' | 'size' | 'render'
> &
  NonNullable<Pick<ComponentProps<typeof Link>, 'href'>>

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
  style,
}: GlobalAlertLinkProps) => {
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
      style={style}
      target={target}
      variant="inline"
    >
      {children}
    </Link>
  )
}
