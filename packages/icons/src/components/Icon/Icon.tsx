'use client'

import type { ReactNode, SVGProps } from 'react'
import { forwardRef } from 'react'
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
} & Pick<
  SVGProps<SVGSVGElement>,
  'className' | 'stroke' | 'cursor' | 'strokeWidth' | 'aria-label'
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
      children,
    },
    ref,
  ) => (
    <svg
      aria-label={ariaLabel}
      className={`${className ? `${className} ` : ''}${icon({ disabled, prominence, sentiment, size })}`}
      cursor={cursor}
      data-testid={dataTestId}
      ref={ref}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={
        typeof size === 'string' && ['xsmall', 'small'].includes(size)
          ? '0 0 16 16'
          : '0 0 20 20'
      }
    >
      {children}
    </svg>
  ),
)
