'use client'

import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { Menu } from '../Menu'
import { useTabsContext } from './TabsContext'

const StyledMenuItem = styled(Menu.Item)`
  &[aria-selected='true'] {
    color: ${({ theme }) => theme.colors.primary.text};
  }
`

type TabMenuItemProps = {
  value?: string | number
} & ComponentProps<typeof StyledMenuItem>

export const TabMenuItem = ({
  value,
  children,
  onClick,
  ...props
}: TabMenuItemProps) => {
  const { selected, onChange } = useTabsContext()

  const isSelected = useMemo(
    () => value !== undefined && selected === value,
    [value, selected],
  )

  return (
    <StyledMenuItem
      aria-selected={isSelected}
      onClick={event => {
        if (value !== undefined) {
          onChange(value)
        }
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </StyledMenuItem>
  )
}
