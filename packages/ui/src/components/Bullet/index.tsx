'use client'

import type { ReactNode } from 'react'
import { Tooltip } from '../Tooltip'
import type { BULLET_SENTIMENTS, PROMINENCES, SIZES } from './constants'
import { bullet } from './styles.css'

type ProminenceType = keyof typeof PROMINENCES

type BulletSentiment = (typeof BULLET_SENTIMENTS)[number]

type BulletProps = {
  className?: string
  size?: keyof typeof SIZES
  tooltip?: string
  tooltipBaseId?: string
  sentiment?: BulletSentiment
  'data-testid'?: string
  prominence?: ProminenceType
  children?: ReactNode
}

/**
 * Bullet component is used to display a small icon or text with a colored background in a circle.
 */
export const Bullet = ({
  className,
  sentiment = 'neutral',
  size = 'medium',
  tooltip,
  tooltipBaseId,
  'data-testid': dataTestId,
  prominence = 'default',
  children,
}: BulletProps) => (
  <Tooltip id={tooltipBaseId} text={tooltip}>
    <div
      className={`${className ? `${className} ` : ''}${bullet({ prominence, sentiment, size })}`}
      data-testid={dataTestId}
    >
      {children}
    </div>
  </Tooltip>
)
