'use client'

import { useMemo } from 'react'

import { canDisplay } from '../../helpers/hasHelperText'
import { Text } from '../Text'

import type { HTMLAttributes, ReactNode } from 'react'

type HelperProps = {
  helper?: ReactNode
  success?: string | boolean
  error?: ReactNode
  disabled?: boolean
  size?: 'small' | 'large' | 'medium'
  id: string
} & Pick<HTMLAttributes<HTMLParagraphElement>, 'className' | 'style'>
/**
 * Helper is used inside all of our input components, but it can be used outside for design purposes
 */
export const Helper = ({
  size = 'large',
  id,
  disabled,
  helper,
  success,
  error,
  style,
  className,
}: HelperProps) => {
  const hasTextError = typeof error === 'string' || canDisplay(error)
  const hasTextSuccess = typeof success === 'string'

  const computedSentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }

    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  const computedContent = useMemo(() => {
    if (hasTextError) {
      return error
    }
    // Do not return success text if there is an error (error = true)
    if (hasTextSuccess && !error) {
      return success
    }

    return helper
  }, [error, success, helper, hasTextError, hasTextSuccess])

  return helper || hasTextError || hasTextSuccess ? (
    <Text
      as="span"
      variant={size === 'small' ? 'captionSmall' : 'caption'}
      sentiment={computedSentiment}
      prominence={error || success ? 'default' : 'weak'}
      disabled={disabled}
      style={style}
      className={className}
      id={id}
    >
      {computedContent}
    </Text>
  ) : null
}
