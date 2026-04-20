'use client'

import { Row } from '../../components/Row'
import { Text } from '../../components/Text'

import type { ReactNode } from 'react'

export const Notice = ({
  error,
  success,
  helper,
  disabled,
  sentiment,
  id,
}: {
  error?: string | boolean
  success?: string | boolean
  helper?: ReactNode
  disabled?: boolean
  sentiment?: 'danger' | 'success' | 'neutral'
  id?: string
}) => (
  <div aria-describedby={id} role="status">
    <Row gap="1" templateColumns="minmax(0, 1fr) min-content">
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
    </Row>
  </div>
)
