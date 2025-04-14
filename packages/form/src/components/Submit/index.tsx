'use client'

import { Button } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { useFormState } from 'react-hook-form'

type SubmitProps = {
  children?: ReactNode
  className?: string
  disabled?: boolean
  icon?: ComponentProps<typeof Button>['icon']
  iconPosition?: ComponentProps<typeof Button>['iconPosition']
  size?: ComponentProps<typeof Button>['size']
  variant?: ComponentProps<typeof Button>['variant']
  sentiment?: ComponentProps<typeof Button>['sentiment']
  tooltip?: ComponentProps<typeof Button>['tooltip']
  fullWidth?: ComponentProps<typeof Button>['fullWidth']
  onClick?: ComponentProps<typeof Button>['onClick']
}

export const Submit = ({
  children,
  className,
  disabled = false,
  icon,
  iconPosition,
  size,
  variant = 'filled',
  sentiment = 'primary',
  tooltip,
  fullWidth,
  onClick,
}: SubmitProps) => {
  const { isSubmitting, isValid } = useFormState()

  const isDisabled = disabled || isSubmitting || !isValid

  return (
    <Button
      className={className}
      disabled={isDisabled}
      icon={icon}
      iconPosition={iconPosition}
      isLoading={isSubmitting}
      size={size}
      type="submit"
      variant={variant}
      sentiment={sentiment}
      tooltip={tooltip}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
