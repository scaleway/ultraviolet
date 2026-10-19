'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { Text } from '../../Typography/Text'
import { TEXT_VARIANT } from './constant'
import { badgeStyle } from './styles.css'

type BadgeProps = {
  disabled?: boolean
  prominence?: 'default' | 'strong'
  sentiment?: 'danger' | 'info' | 'success' | 'warning' | 'neutral' | 'black' | 'white' | 'primary' | 'secondary'
  size?: 'medium' | 'small' | 'large' | 'xsmall'
  className?: string
  role?: 'status' | 'alert'
  children: ReactNode
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * Badge component is used to display a status or a label in a small container.
 */
export const Badge = ({
  sentiment = 'neutral',
  size = 'medium',
  prominence = 'default',
  disabled = false,
  className,
  children,
  'data-testid': dataTestId,
  role,
  style,
}: BadgeProps) => (
  <Text
    as="span"
    className={cn(className, badgeStyle.badge({ disabled, prominence, sentiment, size }))}
    data-testid={dataTestId}
    prominence={disabled ? 'weak' : 'default'}
    role={role}
    style={style}
    variant={TEXT_VARIANT[size]}
    whiteSpace="nowrap"
  >
    {children}
  </Text>
)

Badge.displayName = 'Badge'
