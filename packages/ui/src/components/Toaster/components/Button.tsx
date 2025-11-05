'use client'

import type { ComponentProps } from 'react'
import { Button } from '../../Button'
import { toasterButton } from '../styles.css'

export const ToastButton = ({
  variant,
  className,
  ...props
}: ComponentProps<typeof Button>) => {
  if (variant === 'ghost') {
    return (
      <Button
        className={`${className ? `${className} ` : ''}${toasterButton}`}
        {...props}
        size="xsmall"
        variant={variant}
      />
    )
  }

  return <Button {...props} size="xsmall" variant={variant} />
}
