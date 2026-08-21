'use client'

import { cn } from '@ultraviolet/utils'
import { forwardRef } from 'react'
import type { ReactNode, SVGProps } from 'react'
import type { PROMINENCES, SENTIMENTS, SIZES } from './constants'
import { icon } from './styles.css'

type SizesProps = keyof typeof SIZES

type Color = (typeof SENTIMENTS)[number]

type ProminenceProps = keyof typeof PROMINENCES

export type IconProps = {
  size?: SizesProps
  prominence?: ProminenceProps
  sentiment?: Color
  'data-testid'?: string
  disabled?: boolean
  children: ReactNode
  /**
   * @deprecated use `accessibleLabel` instead
   */
  'aria-label'?: string
  accessibleLabel?: string
} & Pick<
  SVGProps<SVGSVGElement>,
  'className' | 'stroke' | 'cursor' | 'strokeWidth' | 'aria-hidden' | 'style' | 'aria-labelledby'
>

/**
 * Icon component is our set of system icons in the design system. All of them are SVGs.
 */

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      sentiment,
      size = 'small',
      prominence = 'default',
      className,
      'data-testid': dataTestId,
      stroke,
      cursor,
      strokeWidth,
      disabled,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      'aria-labelledby': ariaLabelledBy,
      accessibleLabel,
      children,
      style,
    },
    ref,
  ) => {
    const defaultHW = typeof size === 'string' && ['xsmall', 'small'].includes(size) ? '16' : '20'
    const informative = accessibleLabel || ariaLabel

    return (
      <svg
        aria-hidden={ariaHidden ?? !informative}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(className, icon({ disabled, prominence, sentiment, size }))}
        cursor={cursor}
        data-testid={dataTestId}
        focusable={false}
        height={defaultHW}
        ref={ref}
        role={informative ? 'img' : undefined}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={style}
        viewBox={typeof size === 'string' && ['xsmall', 'small'].includes(size) ? '0 0 16 16' : '0 0 20 20'}
        width={defaultHW}
      >
        {accessibleLabel || ariaLabel ? <title>{accessibleLabel ?? ariaLabel}</title> : null}
        {children}
      </svg>
    )
  },
)
