import { Button } from '@ultraviolet/ui'
import type { ComponentProps, JSX, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-final-form'

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
}

export const Submit = ({
  children,
  className,
  disabled = false,
  icon,
  iconPosition,
  size,
  variant = 'filled',
  sentiment = 'success',
  tooltip,
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
      className={className}
      disabled={isDisabled}
      icon={icon}
      iconPosition={iconPosition}
      isLoading={submitting}
      size={size}
      type="submit"
      variant={variant}
      sentiment={sentiment}
      tooltip={tooltip}
    >
      {children}
    </Button>
  )
}
