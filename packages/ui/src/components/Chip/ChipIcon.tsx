'use client'

import styled from '@emotion/styled'
import * as Icon from '@ultraviolet/icons'
import { useContext } from 'react'
import type { PascalToCamelCaseWithoutSuffix } from 'src/types'
import { ChipContext } from './ChipContext'

const Container = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.default};

  &[data-has-onclick="true"][data-active="false"]:hover{
      background-color: ${({ theme }) => theme.colors.neutral.backgroundStrongHover};
  }

  &[data-has-onclick="true"][data-active="true"]:hover{
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
  }

  &[data-disabled="true"]{
    cursor: not-allowed;
  }
`

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
    Icon[
      `${
        (name as string).charAt(0).toUpperCase() + (name as string).slice(1)
      }Icon` as keyof typeof Icon
    ]

  return (
    <Container
      as={onClick ? 'button' : 'div'}
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
      ref={iconRef}
    >
      <IconUsed
        disabled={disabled}
        prominence={isActive ? 'stronger' : 'default'}
        sentiment="neutral"
        size="small"
      />
    </Container>
  )
}
