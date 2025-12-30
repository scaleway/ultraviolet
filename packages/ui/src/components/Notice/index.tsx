'use client'

import { InformationOutlineIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { Text } from '../Text'
import { notice } from './styles.css'

type NoticeProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * A Notice is used to display a short message to the user.
 */
export const Notice = ({
  children,
  className,
  'data-testid': dataTestId,
  style,
}: NoticeProps) => (
  <Text
    as="span"
    className={cn(className, notice)}
    data-testid={dataTestId}
    prominence="weak"
    sentiment="neutral"
    style={style}
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
