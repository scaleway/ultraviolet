// oxlint-disable typescript/no-unsafe-type-assertion
'use client'

import type { ReactNode, RefObject } from 'react'
import { useContext } from 'react'
import { ChipContext } from './ChipContext'
import { buttonContainer } from './styles.css'

type ChipIconType = {
  /**
   * Add an icon in the chip
   */
  icon: ReactNode
  onClick?: () => void
  'data-testid'?: string
}

export const ChipIcon = ({
  icon,
  onClick,
  'data-testid': dataTestId,
}: ChipIconType) => {
  const context = useContext(ChipContext)

  if (!context) {
    throw new Error('Chip.Icon can only be used inside a Chip component')
  }

  const { disabled, isActive, iconRef } = context

  if (onClick) {
    return (
      <button
        className={buttonContainer}
        data-active={isActive}
        data-disabled={disabled}
        data-has-onclick={!!onClick && !disabled}
        data-testid={dataTestId}
        onClick={event => {
          if (!disabled && onClick) {
            event.stopPropagation()
            onClick()
          }
        }}
        ref={iconRef as RefObject<HTMLButtonElement | null>}
        type="button"
      >
        {icon}
      </button>
    )
  }

  return (
    <div
      className={buttonContainer}
      data-active={isActive}
      data-disabled={disabled}
      data-testid={dataTestId}
      ref={iconRef as RefObject<HTMLDivElement | null>}
    >
      {icon}
    </div>
  )
}
