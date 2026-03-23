'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'

import { separatorStyle, thicknessSeparator } from './styles.css'

import type { SeparatorVariants } from './styles.css'
import type { CSSProperties, ReactNode } from 'react'

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
      className={cn(
        className,
        separatorStyle.iconWraper({ direction, sentiment }),
      )}
      data-testid={dataTestId}
      role="separator"
      style={style}
    >
      <hr
        className={separatorStyle.hr({ direction, hasIcon: true, sentiment })}
        style={assignInlineVars({
          [thicknessSeparator]: `${thickness}px`,
        })}
      />
      {children}
      <hr
        className={separatorStyle.hr({ direction, hasIcon: true, sentiment })}
        style={assignInlineVars({
          [thicknessSeparator]: `${thickness}px`,
        })}
      />
    </div>
  ) : (
    <hr
      aria-orientation={direction}
      className={cn(className, separatorStyle.hr({ direction, sentiment }))}
      data-testid={dataTestId}
      style={assignInlineVars({
        [thicknessSeparator]: `${thickness}px`,
      })}
    />
  )
