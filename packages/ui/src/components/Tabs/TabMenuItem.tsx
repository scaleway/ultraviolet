'use client'

import { useMemo } from 'react'
import type { ComponentProps } from 'react'
import { Menu } from '../Menu'
import { useTabsContext } from './TabsContext'
import { tabsStyle } from './styles.css'

type TabMenuItemProps = {
  value?: string | number
} & ComponentProps<typeof Menu.Item>

export const TabMenuItem = ({ value, children, onClick, ...props }: TabMenuItemProps) => {
  const { selected, onChange } = useTabsContext()

  const isSelected = useMemo(() => value !== undefined && selected === value, [value, selected])

  return (
    <Menu.Item
      aria-selected={isSelected}
      className={tabsStyle.textSelected[isSelected ? 'selected' : 'default']}
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
