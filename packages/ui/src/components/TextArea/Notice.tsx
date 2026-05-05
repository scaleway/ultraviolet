'use client'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Helper } from '../Helper'
import { Row } from '../Row'
import { Text } from '../Text'

import type { ReactNode } from 'react'

export const Notice = ({
  maxLength,
  error,
  success,
  helper,
  disabled,
  value,
  id,
}: {
  maxLength?: number
  error?: string | boolean
  success?: string | boolean
  helper?: ReactNode
  disabled?: boolean
  value?: string
  id: string
}) => (
  <Row gap="1" templateColumns="minmax(0, 1fr) min-content">
    {hasHelperText(helper, error, success) ? (
      <Helper
        id={id}
        error={error}
        success={success}
        disabled={disabled}
        helper={helper}
      />
    ) : (
      <div /> // Used to place the maxLength content on the right
    )}

    {maxLength ? (
      <Text as="div" prominence="weak" sentiment="neutral" variant="caption">
        {value?.length ?? 0}/{maxLength}
      </Text>
    ) : null}
  </Row>
)
