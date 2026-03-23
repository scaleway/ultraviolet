'use client'

import { Key } from '../Key'
import { Stack } from '../Stack'

import { searchInputStyle } from './styles.css'

import type { ComponentProps } from 'react'

type KeyGroupProps = {
  keys: ComponentProps<typeof Key>['children'][]
  disabled: ComponentProps<typeof Key>['disabled']
  onClick?: () => void
}

export const KeyGroup = ({ keys, disabled, onClick }: KeyGroupProps) => (
  <Stack
    className={searchInputStyle.clickableStack}
    direction="row"
    gap={0.5}
    onClick={onClick}
  >
    {keys.map(key => (
      <Key data-testid={`key-${key}`} disabled={disabled} key={key}>
        {key}
      </Key>
    ))}
  </Stack>
)
