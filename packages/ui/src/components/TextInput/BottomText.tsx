import { useMemo } from 'react'
import { Text } from '../Text'
import type { TextInputProps } from './type'

export const BottomText = ({
  error,
  success,
  helper,
  disabled,
}: Pick<TextInputProps, 'disabled' | 'error' | 'success' | 'helper'>) => {
  const sentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }

    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  return (
    <>
      {error || typeof success === 'string' || typeof helper === 'string' ? (
        <Text
          as="p"
          disabled={disabled}
          prominence={error || success ? 'default' : 'weak'}
          sentiment={sentiment}
          variant="caption"
        >
          {error || success || helper}
        </Text>
      ) : null}
      {!(error || success) && typeof helper !== 'string' && helper
        ? helper
        : null}
    </>
  )
}
