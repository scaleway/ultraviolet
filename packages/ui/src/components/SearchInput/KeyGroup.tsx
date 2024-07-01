import type { ComponentProps } from 'react'
import { Stack } from '../Stack'
import { Key } from './Key'

type KeyGroupProps = {
  keys: ComponentProps<typeof Key>['children'][]
  disabled: ComponentProps<typeof Key>['disabled']
}

export const KeyGroup = ({ keys, disabled }: KeyGroupProps) => (
  <Stack gap={0.5} direction="row">
    {keys.map(key => (
      <Key key={key} disabled={disabled}>
        {key}
      </Key>
    ))}
  </Stack>
)
