'use client'

import { cn } from '@ultraviolet/utils'
import { forwardRef } from 'react'

import { icon } from './styles.css'

import type { PROMINENCES, SENTIMENTS, SIZES } from './constants'
import type { ReactNode, SVGProps } from 'react'

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
  title: string
} & Pick<
  SVGProps<SVGSVGElement>,
  | 'className'
  | 'stroke'
  | 'cursor'
  | 'strokeWidth'
  | 'aria-label'
  | 'aria-hidden'
  | 'style'
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
      children,
      style,
      title,
    },
    ref,
  ) => {
    const defaultHW =
      typeof size === 'string' && ['xsmall', 'small'].includes(size)
        ? '16'
        : '20'

    return (
      <svg
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        className={cn(
          className,
          icon({ disabled, prominence, sentiment, size }),
        )}
        cursor={cursor}
        data-testid={dataTestId}
        height={defaultHW}
        ref={ref}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={style}
        viewBox={
          typeof size === 'string' && ['xsmall', 'small'].includes(size)
            ? '0 0 16 16'
            : '0 0 20 20'
        }
        width={defaultHW}
      >
        <title>{title}</title>
        {children}
      </svg>
    )
  },
)
