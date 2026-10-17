// oxlint-disable typescript/no-unsafe-type-assertion
'use client'

import { useContext } from 'react'
import type { ReactNode, RefObject } from 'react'
import { ChipContext } from './ChipContext'
import { chipStyle } from './styles.css'

type ChipIconType = {
  /**
   * Add an icon in the chip
   */
  icon: ReactNode
  onClick?: () => void
  'data-testid'?: string
}

/**
 * @deprecated use an icon directly as the chil of `<Chip>`
 * For a close button, use prop `onClose` (and optional `closeAccesibleLabel`) directlty on `Chip`
 */
export const ChipIcon = ({ icon, onClick, 'data-testid': dataTestId }: ChipIconType) => {
  const context = useContext(ChipContext)

  if (!context) {
    throw new Error('Chip.Icon can only be used inside a Chip component')
  }

  const { disabled, isActive, iconRef } = context

  if (onClick) {
    return (
      // Use role button instead of type button to avoid nesting two <button>
      <div
        className={chipStyle.buttonContainer}
        data-active={isActive}
        aria-disabled={disabled}
        data-has-onclick={!disabled}
        data-testid={dataTestId}
        onClick={event => {
          if (!disabled) {
            event.stopPropagation()
            onClick()
          }
        }}
        onKeyDown={event => {
          if (!disabled && [' ', 'Enter'].includes(event.key)) {
            event.stopPropagation()
            onClick()
          }
        }}
        tabIndex={0}
        ref={iconRef as RefObject<HTMLDivElement | null>}
        role="button"
      >
        {icon}
      </div>
    )
  }

  return (
    <div
      className={chipStyle.buttonContainer}
      data-active={isActive}
      data-disabled={disabled}
      data-testid={dataTestId}
      ref={iconRef as RefObject<HTMLDivElement | null>}
    >
      {icon}
    </div>
  )
}

ChipIcon.displayName = 'Chip.Icon'
