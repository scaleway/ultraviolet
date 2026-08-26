'use client'

import type { ComponentProps } from 'react'
import { Stack } from '../../layout/Stack'
import { Key } from '../../other/Key'
import { searchInputStyle } from './styles.css'

type KeyGroupProps = {
  keys: ComponentProps<typeof Key>['children'][]
  disabled: ComponentProps<typeof Key>['disabled']
  onClick?: () => void
}

export const KeyGroup = ({ keys, disabled, onClick }: KeyGroupProps) => (
  <Stack className={searchInputStyle.clickableStack} direction="row" gap={0.5} onClick={onClick}>
    {keys.map(key => (
      <Key data-testid={`key-${key}`} disabled={disabled} key={key}>
        {key}
      </Key>
    ))}
  </Stack>
)
