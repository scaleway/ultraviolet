'use client'

import type { ComponentProps } from 'react'
import { Link } from '../../Action/Link'

type GlobalAlertLinkProps = Omit<ComponentProps<typeof Link>, 'sentiment' | 'prominence' | 'size' | 'render'> &
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
}: GlobalAlertLinkProps) => (
  <Link
    aria-label={ariaLabel}
    className={className}
    data-testid={dataTestId}
    download={download}
    href={href}
    onClick={onClick}
    oneLine={oneLine}
    prominence="strong"
    rel={rel}
    size="small"
    style={style}
    target={target}
  >
    {children}
  </Link>
)
