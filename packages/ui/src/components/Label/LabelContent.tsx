import { cn } from '@ultraviolet/utils'
import { useMemo } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { labelStyle } from './styles.css'
import type { LabelProps } from './type'

export const LabelRequiredOrNot = ({
  children,
  required,
  id,
  size,
  htmlFor,
  as,
  sentiment,
  disabled,
  style,
  className,
}: LabelProps) => {
  const textPointerValue = useMemo(() => {
    if (disabled) {
      return 'disabled'
    }

    if (htmlFor) {
      return 'htmlFor'
    }

    return 'default'
  }, [disabled, htmlFor])

  if (required) {
    return (
      <Stack
        alignItems="flex-start"
        className={className}
        direction="row"
        gap="0.5"
        style={style}
      >
        <Text
          as={as === 'label' ? 'label' : 'legend'}
          className={labelStyle.textPointer[textPointerValue]}
          disabled={disabled}
          htmlFor={htmlFor}
          id={id}
          sentiment={sentiment}
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        >
          {children}
        </Text>
        <Text
          aria-label="required"
          as="span"
          disabled={disabled}
          sentiment="danger"
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        >
          *
        </Text>
      </Stack>
    )
  }

  return (
    <Text
      as={as === 'label' ? 'label' : 'legend'}
      className={cn(labelStyle.textPointer[textPointerValue], className)}
      disabled={disabled}
      htmlFor={htmlFor}
      id={id}
      sentiment={sentiment}
      style={style}
      variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
    >
      {children}
    </Text>
  )
}
