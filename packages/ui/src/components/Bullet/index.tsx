'use client'

import type { CSSProperties, ReactNode } from 'react'
import type { SENTIMENTS } from '../../theme'
import { Tooltip } from '../Tooltip'
import type { PROMINENCES, SIZES } from './constants'
import { bullet } from './styles.css'

type ProminenceType = keyof typeof PROMINENCES

type BulletProps = {
  className?: string
  size?: keyof typeof SIZES
  tooltip?: string
  tooltipBaseId?: string
  sentiment?: (typeof SENTIMENTS)[number]
  'data-testid'?: string
  prominence?: ProminenceType
  children?: ReactNode
  disabled?: boolean
  style?: CSSProperties
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
  disabled,
  style,
}: BulletProps) => (
  <Tooltip id={tooltipBaseId} text={tooltip}>
    <div
      className={`${className ? `${className} ` : ''}${bullet({ disabled, prominence, sentiment, size })}`}
      data-testid={dataTestId}
      style={style}
    >
      {children}
    </div>
  </Tooltip>
)
