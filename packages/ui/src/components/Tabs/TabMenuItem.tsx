'use client'

import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { Menu } from '../Menu'
import { tabsTextSelected } from './styles.css'
import { useTabsContext } from './TabsContext'

type TabMenuItemProps = {
  value?: string | number
} & ComponentProps<typeof Menu.Item>

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
    <Menu.Item
      aria-selected={isSelected}
      className={tabsTextSelected[isSelected ? 'selected' : 'default']}
      onClick={event => {
        if (value !== undefined) {
          onChange(value)
        }
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </Menu.Item>
  )
}
