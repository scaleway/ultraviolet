'use client'

import type { ReactNode } from 'react'
import type { SeparatorVariants } from './styles.css'
import { hr, iconWraperSeparator } from './styles.css'

type SeparatorProps = {
  thickness?: number
  className?: string
  'data-testid'?: string
  children?: ReactNode
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
}: SeparatorProps) =>
  children ? (
    <div
      aria-orientation={direction}
      className={`${className ? `${className} ` : ''}${iconWraperSeparator({ direction, sentiment })}`}
      data-testid={dataTestId}
      role="separator"
    >
      <hr
        className={hr({ direction, hasIcon: true, sentiment })}
        style={
          direction === 'vertical'
            ? { width: `${thickness}px` }
            : { height: `${thickness}px` }
        }
      />
      {children}
      <hr
        className={hr({ direction, hasIcon: true, sentiment })}
        style={
          direction === 'vertical'
            ? { width: `${thickness}px` }
            : { height: `${thickness}px` }
        }
      />
    </div>
  ) : (
    <hr
      aria-orientation={direction}
      className={`${className ? `${className} ` : ''}${hr({ direction, sentiment })}`}
      data-testid={dataTestId}
      role="separator"
      style={
        direction === 'vertical'
          ? { width: `${thickness}px` }
          : { height: `${thickness}px` }
      }
    />
  )
