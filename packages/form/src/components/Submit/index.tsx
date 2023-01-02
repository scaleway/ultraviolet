import { Button } from '@scaleway/ui'
import type { ComponentProps, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-final-form'

type SubmitProps = {
  action?: ComponentProps<typeof Button>['action']
  children?: ReactNode
  className?: string
  disabled?: boolean
  icon?: ComponentProps<typeof Button>['icon']
  iconSize?: ComponentProps<typeof Button>['iconSize']
  iconPosition?: ComponentProps<typeof Button>['iconPosition']
  size?: ComponentProps<typeof Button>['size']
  tooltip?: ComponentProps<typeof Button>['tooltip']
  tooltipBaseId?: ComponentProps<typeof Button>['tooltipBaseId']
  variant?: ComponentProps<typeof Button>['variant']
}

export const Submit = ({
  action,
  children,
  className,
  disabled = false,
  icon,
  iconSize,
  iconPosition,
  size,
  tooltip,
  tooltipBaseId,
  variant = 'success',
}: SubmitProps): JSX.Element => {
  const { invalid, submitting, hasValidationErrors, dirtySinceLastSubmit } =
    useFormState({
      subscription: {
        dirtySinceLastSubmit: true,
        hasValidationErrors: true,
        invalid: true,
        submitting: true,
      },
    })
  const [isLoading, setIsLoading] = useState(true)
  const isDisabled =
    disabled ||
    submitting ||
    isLoading ||
    (invalid && hasValidationErrors && !dirtySinceLastSubmit)

  useEffect(() => setIsLoading(false), [])

  return (
    <Button
      action={action}
      className={className}
      disabled={isDisabled}
      icon={icon}
      iconSize={iconSize}
      iconPosition={iconPosition}
      progress={submitting}
      size={size}
      tooltip={tooltip}
      tooltipBaseId={tooltipBaseId}
      type="submit"
      variant={variant}
    >
      {children}
    </Button>
  )
}
