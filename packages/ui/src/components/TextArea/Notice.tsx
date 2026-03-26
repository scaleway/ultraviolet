'use client'

import { Row } from '../Row'
import { Text } from '../Text'

import type { ReactNode } from 'react'

export const Notice = ({
  maxLength,
  error,
  success,
  helper,
  disabled,
  sentiment,
  value,
}: {
  maxLength?: number
  error?: string | boolean
  success?: string | boolean
  helper?: ReactNode
  disabled?: boolean
  sentiment?: 'danger' | 'success' | 'neutral'
  value?: string
}) => (
  <Row gap="1" templateColumns="minmax(0, 1fr) min-content">
    <div>
      {error || success || typeof helper === 'string' ? (
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
    </div>
    {maxLength ? (
      <Text as="div" prominence="weak" sentiment="neutral" variant="caption">
        {value?.length ?? 0}/{maxLength}
      </Text>
    ) : null}
  </Row>
)
