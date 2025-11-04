'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import type { SeparatorVariants } from './styles.css'
import { hr, iconWraperSeparator, thicknessSeparator } from './styles.css'

type SeparatorProps = {
  thickness?: number
  className?: string
  'data-testid'?: string
  children?: ReactNode
  style?: CSSProperties
} & SeparatorVariants

/**
 * Separator component used to separate content with a horizontal or vertical line.
 */
export const Separator = ({
  direction = 'horizontal',
  thickness = 1,
  sentiment = 'neutral',
  className,
  'data-testid': dataTestId,
  children,
  style,
}: SeparatorProps) =>
  children ? (
    <div
      aria-orientation={direction}
      className={`${className ? `${className} ` : ''}${iconWraperSeparator({ direction, sentiment })}`}
      data-testid={dataTestId}
      role="separator"
      style={style}
    >
      <hr
        className={hr({ direction, hasIcon: true, sentiment })}
        style={assignInlineVars({
          [thicknessSeparator]: `${thickness}px`,
        })}
      />
      {children}
      <hr
        className={hr({ direction, hasIcon: true, sentiment })}
        style={assignInlineVars({
          [thicknessSeparator]: `${thickness}px`,
        })}
      />
    </div>
  ) : (
    <hr
      aria-orientation={direction}
      className={`${className ? `${className} ` : ''}${hr({ direction, sentiment })}`}
      data-testid={dataTestId}
      role="separator"
      style={assignInlineVars({
        [thicknessSeparator]: `${thickness}px`,
      })}
    />
  )
