'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { SENTIMENTS } from '../../../theme'
import { Tooltip } from '../../Overlay/Tooltip'
import type { PROMINENCES, SIZES } from './constants'
import { bulletStyle } from './styles.css'

type ProminenceType = keyof typeof PROMINENCES

type BulletProps = {
  className?: string
  size?: keyof typeof SIZES
  /**
   * @deprecated use `tooltipLabel` instead.
   */
  tooltip?: string
  /**
   * Label of the bullet rendered inside a Tooltip.
   */
  tooltipLabel?: string
  tooltipBaseId?: string
  sentiment?: (typeof SENTIMENTS)[number]
  'data-testid'?: string
  prominence?: ProminenceType
  children?: ReactNode
  disabled?: boolean
  style?: CSSProperties
} & Pick<HTMLAttributes<HTMLDivElement>, 'aria-hidden'>

/**
 * Bullet component is used to display a small icon or text with a colored background in a circle.
 */
export const Bullet = ({
  className,
  sentiment = 'neutral',
  size = 'medium',
  tooltip,
  tooltipLabel,
  tooltipBaseId,
  'data-testid': dataTestId,
  prominence = 'default',
  children,
  disabled,
  style,
  'aria-hidden': ariaHidden,
}: BulletProps) => {
  const tooltipText = tooltipLabel || tooltip

  return (
    <Tooltip id={tooltipBaseId} relation="label" text={tooltipText}>
      <div
        className={cn(className, bulletStyle.bullet({ disabled, prominence, sentiment, size }))}
        data-testid={dataTestId}
        style={style}
        aria-hidden={ariaHidden}
      >
        {children}
      </div>
    </Tooltip>
  )
}

Bullet.displayName = 'Bullet'
