'use client'

import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { cn } from '@ultraviolet/utils'

import { Text } from '../Text'

import { noticeStyle } from './styles.css'

import type { CSSProperties, ReactNode } from 'react'

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
    className={cn(className, noticeStyle.notice)}
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
