'use client'

import { InformationOutlineIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { Text } from '../Text'
import { notice } from './styles.css'

type NoticeProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
}

/**
 * A Notice is used to display a short message to the user.
 */
export const Notice = ({
  children,
  className,
  'data-testid': dataTestId,
}: NoticeProps) => (
  <Text
    as="span"
    className={`${className ? `${className} ` : ''}${notice}`}
    data-testid={dataTestId}
    prominence="weak"
    sentiment="neutral"
    variant="caption"
  >
    <InformationOutlineIcon
      prominence="weak"
      sentiment="neutral"
      size="small"
    />
    {children}
  </Text>
)
