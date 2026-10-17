'use client'

import { CloseIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../../Layout/Stack'
import { VisuallyHidden } from '../../Other/VisuallyHidden'
import { ChipContent } from './ChipContent'
import { ChipContext } from './ChipContext'
import { ChipIcon } from './ChipIcon'
import type { ChipType } from './type'
import { chipStyle } from './styles.css'

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
  onClose,
  closeAccessibleLabel,
  style,
}: ChipType) => {
  const [isActive, setIsActive] = useState(active)
  const [hasTrailingIcon, setHasTrailingIcon] = useState(false)
  const chipRef = useRef<HTMLButtonElement>(null) // ref to the parent container
  const iconRef = useRef<HTMLButtonElement | HTMLDivElement>(null)

  const value = useMemo(() => ({ disabled, iconRef, isActive }), [isActive, disabled, iconRef])

  useEffect(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    if (chipRef.current && iconRef.current) {
      const lastChildNode = chipRef.current.lastChild

      // Compare the last child element with iconRef.current to check if the last element is an Icon
      // This will mean that there is a trailing icon
      if (lastChildNode === iconRef.current) {
        setHasTrailingIcon(true)
      } else {
        setHasTrailingIcon(false)
      }
    }
  }, [children, iconRef])

  const chipContentProps = (closable: boolean) => ({
    'data-testid': dataTestId,
    'aria-pressed': isActive,
    onClick: () => {
      if (!disabled) {
        setIsActive(!isActive)
        onClick?.(!isActive)
      }
    },
    chipRef,
    disabled,
    className: cn(
      className,
      closable
        ? chipStyle.content({ size })
        : chipStyle.container({
            size,
            hasTrailingIcon,
            disabled,
            isActive,
          }),
    ),
  })

  return (
    <ChipContext.Provider value={value}>
      {onClose ? (
        <Stack
          style={style}
          direction="row"
          className={chipStyle.container({
            size,
            hasTrailingIcon,
            disabled,
            isActive,
            closable: true,
          })}
          gap={0.5}
        >
          <ChipContent {...chipContentProps(true)}>{children}</ChipContent>
          <ChipContent
            className={cn(className, chipStyle.closeButton({ isActive, size }))}
            onClick={() => {
              if (!disabled) {
                onClose()
              }
            }}
            disabled={disabled}
          >
            <CloseIcon />
            <VisuallyHidden>{closeAccessibleLabel ?? 'Close'}</VisuallyHidden>
          </ChipContent>
        </Stack>
      ) : (
        <ChipContent style={style} {...chipContentProps(false)}>
          {children}
        </ChipContent>
      )}
    </ChipContext.Provider>
  )
}

Chip.displayName = 'Chip'

/**
 * @deprecated use an icon directly as the chil of `<Chip>`
 * For a close button, use prop `onClose` (and optional `closeAccesibleLabel`) directlty on `Chip`
 */
Chip.Icon = ChipIcon
