'use client'

import { cn } from '@ultraviolet/utils'

import { Button } from '../../Button'
import { toasterStyle } from '../styles.css'

import type { ComponentProps } from 'react'

export const ToastButton = ({
  variant,
  className,
  ...props
}: ComponentProps<typeof Button>) => {
  if (variant === 'ghost') {
    return (
      <Button
        className={cn(className, toasterStyle.button)}
        {...props}
        size="xsmall"
        variant={variant}
      />
    )
  }

  return <Button {...props} size="xsmall" variant={variant} />
}
