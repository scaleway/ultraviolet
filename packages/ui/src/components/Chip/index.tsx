'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { ChipContext } from './ChipContext'
import { ChipIcon } from './ChipIcon'
import { container } from './styles.css'

type ChipType = {
  children: ReactNode
  size?: 'medium' | 'large'
  disabled?: boolean
  active?: boolean
  className?: string
  'data-testid'?: string
  onClick?: (active: boolean) => void
}

/**
 * Chip component is used to display a clickable status or a label in a small container
 */
export const Chip = ({
  children,
  size = 'medium',
  disabled = false,
  active = false,
  className,
  'data-testid': dataTestId,
  onClick,
}: ChipType) => {
  const [isActive, setIsActive] = useState(active)
  const [hasTrailingIcon, setTrailingIcon] = useState(false)
  const chipRef = useRef<HTMLDivElement>(null) // ref to the parent container
  const iconRef = useRef<HTMLButtonElement>(null)
  const prominence = useMemo(() => {
    if (isActive) {
      return 'stronger'
    }
    if (disabled) {
      return 'weak'
    }

    return 'default'
  }, [isActive, disabled])
  const value = useMemo(
    () => ({ disabled, iconRef, isActive }),
    [isActive, disabled, iconRef],
  )
  useEffect(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    if (chipRef.current && iconRef.current) {
      const lastChildNode = chipRef.current.lastChild

      // Compare the last child element with iconRef.current to check if the last element is an Icon
      // This will mean that there is a trailing icon
      if (lastChildNode === iconRef.current) {
        setTrailingIcon(true)
      } else {
        setTrailingIcon(false)
      }
    }
  }, [children, iconRef])

  return (
    <ChipContext.Provider value={value}>
      <Text as="div" variant={size === 'large' ? 'bodySmall' : 'caption'}>
        <Stack
          alignItems="center"
          className={`${className ? `${className} ` : ''}${container}`}
          data-active={isActive}
          data-disabled={disabled}
          data-prominence={prominence}
          data-size={size}
          data-testid={dataTestId}
          data-trailing-icon={hasTrailingIcon}
          direction="row"
          gap={1}
          justifyContent="center"
          onClick={() => {
            if (!disabled) {
              setIsActive(!isActive)
              onClick?.(!isActive)
            }
          }}
          ref={chipRef}
        >
          {children}
        </Stack>
      </Text>
    </ChipContext.Provider>
  )
}

Chip.Icon = ChipIcon
