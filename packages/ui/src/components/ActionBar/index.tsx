'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Stack } from '../Stack'
import { actionBar, rankActionBar, stackActionBar } from './styles.css'

type ActionBarProps = {
  children: ReactNode
  /**
   * The position of the bar (start at 0)
   */
  rank?: number
  role?: string
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * The ActionBar is a floating bar that appears at the bottom of a page.
 * It can be used to display important actions or information to the user, and can be configured to display a variety of different content types.
 *
 * **Note:** ActionBar is added into a portal at the end of the body element. This means that it will always be on top of other elements without `z-index`,
 * and will not be affected by the layout of the page it is on.
 */
export const ActionBar = ({
  children,
  role = 'dialog',
  rank = 0,
  className,
  style,
  'data-testid': dataTestId,
}: ActionBarProps) =>
  createPortal(
    <div
      className={`${className ? `${className} ` : ''}${actionBar}`}
      data-testid={dataTestId}
      role={role}
      style={{
        ...style,
        ...assignInlineVars({
          [rankActionBar]: `${rank}`,
        }),
      }}
    >
      <Stack alignItems="center" className={stackActionBar}>
        {children}
      </Stack>
    </div>,
    document.body,
  )
