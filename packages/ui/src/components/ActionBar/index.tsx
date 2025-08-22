'use client'

import { theme } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Stack } from '../Stack'
import { actionBar, stackActionBar } from './styles.css'

type ActionBarProps = {
  children: ReactNode
  /**
   * The position of the bar (start at 0)
   */
  rank?: number
  role?: string
  className?: string
  'data-testid'?: string
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
  'data-testid': dataTestId,
}: ActionBarProps) =>
  createPortal(
    <div
      className={`${className ? `${className} ` : ''}${actionBar}`}
      data-testid={dataTestId}
      role={role}
      style={{
        bottom: `calc(${theme.sizing['700']} * ${rank} + ${theme.space['2']})`,
      }}
    >
      <Stack alignItems="center" className={stackActionBar}>
        {children}
      </Stack>
    </div>,
    document.body,
  )
