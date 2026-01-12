'use client'

// oxlint-disable-next-line import/no-namespace
import * as Icon from '@ultraviolet/icons'
import type { RefObject } from 'react'
import { useContext } from 'react'
import type { PascalToCamelCaseWithoutSuffix } from '../../types'
import { ChipContext } from './ChipContext'
import { buttonContainer } from './styles.css'

type IconType = PascalToCamelCaseWithoutSuffix<keyof typeof Icon, 'Icon'>

type ChipIconType = {
  /**
   * Add an icon in the chip
   */
  name: IconType
  onClick?: () => void
  'data-testid'?: string
}

export const ChipIcon = ({
  name,
  onClick,
  'data-testid': dataTestId,
}: ChipIconType) => {
  const context = useContext(ChipContext)

  if (!context) {
    throw new Error('Chip.Icon can only be used inside a Chip component')
  }

  const { disabled, isActive, iconRef } = context

  const IconUsed =
    // biome-ignore lint/performance/noDynamicNamespaceImportAccess: to fix
    Icon[
      `${
        (name as string).charAt(0).toUpperCase() + (name as string).slice(1)
      }Icon` as keyof typeof Icon
    ]

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
        <IconUsed
          disabled={disabled}
          prominence={isActive ? 'stronger' : 'default'}
          sentiment="neutral"
          size="small"
        />
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
      <IconUsed
        disabled={disabled}
        prominence={isActive ? 'stronger' : 'default'}
        sentiment="neutral"
        size="small"
      />
    </div>
  )
}
