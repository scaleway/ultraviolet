'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Text } from '../Text'
import { TEXT_VARIANT } from './constant'
import type { BadgeVariants } from './styles.css'
import { badge } from './styles.css'

type BadgeProps = {
  className?: string
  children: ReactNode
  'data-testid'?: string
} & BadgeVariants

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
}: BadgeProps) => {
  /**
   * Badge should display an aria-label if the status is not neutral or primary
   */
  const ariaLabel = useMemo(
    () =>
      ['neutral', 'primary'].some(baseSentiment => baseSentiment === sentiment)
        ? undefined
        : sentiment,
    [sentiment],
  )

  return (
    <Text
      aria-label={ariaLabel}
      as="span"
      className={`${className ? `${className} ` : ''}${badge({ disabled, prominence, sentiment, size })}`}
      data-testid={dataTestId}
      prominence={disabled ? 'weak' : 'default'}
      variant={TEXT_VARIANT[size]}
      whiteSpace="nowrap"
    >
      {children}
    </Text>
  )
}
