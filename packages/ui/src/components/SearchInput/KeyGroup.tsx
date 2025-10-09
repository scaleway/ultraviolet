'use client'

import type { ComponentProps } from 'react'
import { Key } from '../Key'
import { Stack } from '../Stack'
import { clickableStack } from './styles.css'

type KeyGroupProps = {
  keys: ComponentProps<typeof Key>['children'][]
  disabled: ComponentProps<typeof Key>['disabled']
  onClick?: () => void
}

export const KeyGroup = ({ keys, disabled, onClick }: KeyGroupProps) => (
  <Stack className={clickableStack} direction="row" gap={0.5} onClick={onClick}>
    {keys.map(key => (
      <Key data-testid={`key-${key}`} disabled={disabled} key={key}>
        {key}
      </Key>
    ))}
  </Stack>
)
